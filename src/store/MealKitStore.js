import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMealKitStore = defineStore("mealKitStore", {
  state: () => ({
    items: [], // 전체 밀키트 데이터
    lowStockMealKits: [], // 재고가 20개 미만인 밀키트
    cart: [], // 장바구니
    selectedStoreId: null, // 선택된 매장 ID
    isLoading: false,
    error: null,
  }),

  getters: {
    // 선택된 매장의 밀키트
    selectedMealKits(state) {
      return state.items.filter((kit) => kit.storeId === state.selectedStoreId);
    },

    // 장바구니 아이템
    cartItems(state) {
      return state.cart;
    },
  },

  actions: {
    // 밀키트 데이터 가져오기
    async fetchMealKits(storeId) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`mealKit/get/list/${storeId}`);
        this.items = response.data;

        // 재고가 20개 미만인 밀키트 필터링
        this.lowStockMealKits = this.items.filter((kit) => kit.mealKitCount < 20);
        console.log("Fetched Meal Kits:", this.items);
        console.log("Low Stock Meal Kits:", this.lowStockMealKits);
      } catch (err) {
        this.error = err.message || "Failed to fetch data";
        console.error("Error fetching meal kits:", this.error);
      } finally {
        this.isLoading = false;
      }
    },

    // 장바구니 추가
    addToCart(mealKitId) {
      const mealKit = this.items.find((kit) => kit.mealKitId === mealKitId);
      if (mealKit) {
        const existingItem = this.cart.find((item) => item.id === mealKitId);
        if (existingItem) {
          existingItem.quantity += 1; // 수량 증가
        } else {
          this.cart.push({
            id: mealKit.mealKitId,
            name: mealKit.mealKitName,
            price: mealKit.mealKitPrice,
            stock: mealKit.mealKitCount,
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
