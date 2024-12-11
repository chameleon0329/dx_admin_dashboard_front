// src/store/LaundryStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8081"; // Base URL

export const useLaundryStore = defineStore('laundryStore', {
  state: () => ({
    items: [], // 전체 세탁용품 데이터
    lowStockLaundrySupplies: [], // 재고가 30개 미만인 세탁용품
    cart: [], // 장바구니
    selectedStoreId: null, // 선택된 매장 ID
    isLoading: false,
    error: null,
  }),

  getters: {
    // 선택된 매장의 세탁용품
    selectedLaundrySupplies(state) {
      return state.items.filter((supply) => supply.storeId === state.selectedStoreId);
    },

    // 장바구니 아이템
    cartItems(state) {
      return state.cart;
    },
  },

  actions: {
    // 세탁용품 데이터 가져오기
    async fetchLaundrySupplies(storeId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`laundrySupplies/get/list/${storeId}`);
        this.items = response.data;

        // 재고가 30개 미만인 세탁용품 필터링
        this.lowStockLaundrySupplies = this.items.filter((supply) => supply.storeCount < 30);
        console.log("Fetched Laundry Supplies:", this.items);
        console.log("Low Stock Laundry Supplies:", this.lowStockLaundrySupplies);
      } catch (err) {
        this.error = err.message || "Failed to fetch data";
        console.error("Error fetching laundry supplies:", this.error);
      } finally {
        this.isLoading = false;
      }
    },

    // 장바구니 추가
    addToCart(supplyId) {
      const supply = this.items.find((supply) => supply.laundrySuppliesId === supplyId);
      if (supply) {
        const existingItem = this.cart.find((item) => item.id === supplyId);
        if (existingItem) {
          existingItem.quantity += 1; // 수량 증가
        } else {
          this.cart.push({
            id: supply.laundrySuppliesId,
            name: supply.laundrySuppliesName,
            price: supply.laundrySuppliesPrice,
            stock: supply.storeCount,
            quantity: 1,
          });
        }
      }
    },

    // 장바구니에서 제거
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },

    // 장바구니 비우기
    clearCart() {
      this.cart = [];
    },

    // 매장 선택
    selectStore(storeId) {
      this.selectedStoreId = storeId;
    },
  },
});
