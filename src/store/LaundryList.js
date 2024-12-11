import { defineStore } from "pinia";

export const useLaundryStore = defineStore("Laundry", {
  state: () => ({
    selectedStoreId: "S001", // 기본값: 홍대 매장 (storeId: S001)
    stores: [
      {
        storeId: "S001",
        name: "홍대 매장",
        laundrySupplies: [
          {
            laundrySuppliesId: "L001",
            laundrySuppliesName: "액체 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 12000,
            laundrySuppliesCount: 25,
            laundrySuppliesMonthlySalesVolume: [50, 45, 60, 55, 70, 75, 80, 85, 90, 95, 85, 70],
          },
          {
            laundrySuppliesId: "L002",
            laundrySuppliesName: "분말 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 10000,
            laundrySuppliesCount: 40,
            laundrySuppliesMonthlySalesVolume: [30, 25, 35, 40, 45, 50, 55, 60, 65, 70, 65, 50],
          },
          {
            laundrySuppliesId: "L003",
            laundrySuppliesName: "섬유 유연제",
            laundrySuppliesClassification: "섬유유연제",
            laundrySuppliesPrice: 15000,
            laundrySuppliesCount: 15,
            laundrySuppliesMonthlySalesVolume: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
          },
          {
            laundrySuppliesId: "L004",
            laundrySuppliesName: "건조기 시트",
            laundrySuppliesClassification: "건조기시트",
            laundrySuppliesPrice: 8000,
            laundrySuppliesCount: 20,
            laundrySuppliesMonthlySalesVolume: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          },
          {
            laundrySuppliesId: "L005", // 추가된 세탁용품
            laundrySuppliesName: "얼룩 제거제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 14000,
            laundrySuppliesCount: 10,
            laundrySuppliesMonthlySalesVolume: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
          },
        ],
      },
      {
        storeId: "S002",
        name: "강남역 매장",
        laundrySupplies: [
          {
            laundrySuppliesId: "L001",
            laundrySuppliesName: "액체 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 12000,
            laundrySuppliesCount: 30,
            laundrySuppliesMonthlySalesVolume: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
          },
          {
            laundrySuppliesId: "L002",
            laundrySuppliesName: "분말 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 10000,
            laundrySuppliesCount: 50,
            laundrySuppliesMonthlySalesVolume: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
          },
          {
            laundrySuppliesId: "L003",
            laundrySuppliesName: "섬유 유연제",
            laundrySuppliesClassification: "섬유유연제",
            laundrySuppliesPrice: 15000,
            laundrySuppliesCount: 10,
            laundrySuppliesMonthlySalesVolume: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
          },
          {
            laundrySuppliesId: "L004",
            laundrySuppliesName: "건조기 시트",
            laundrySuppliesClassification: "건조기시트",
            laundrySuppliesPrice: 8000,
            laundrySuppliesCount: 35,
            laundrySuppliesMonthlySalesVolume: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
          },
          {
            laundrySuppliesId: "L005", // 추가된 세탁용품
            laundrySuppliesName: "얼룩 제거제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 14000,
            laundrySuppliesCount: 5,
            laundrySuppliesMonthlySalesVolume: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          },
        ],
      },
      {
        storeId: "S003",
        name: "이태원 매장",
        laundrySupplies: [
          {
            laundrySuppliesId: "L001",
            laundrySuppliesName: "액체 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 12000,
            laundrySuppliesCount: 20,
            laundrySuppliesMonthlySalesVolume: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
          },
          {
            laundrySuppliesId: "L002",
            laundrySuppliesName: "분말 세제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 10000,
            laundrySuppliesCount: 15,
            laundrySuppliesMonthlySalesVolume: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
          },
          {
            laundrySuppliesId: "L003",
            laundrySuppliesName: "섬유 유연제",
            laundrySuppliesClassification: "섬유유연제",
            laundrySuppliesPrice: 15000,
            laundrySuppliesCount: 25,
            laundrySuppliesMonthlySalesVolume: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
          },
          {
            laundrySuppliesId: "L004",
            laundrySuppliesName: "건조기 시트",
            laundrySuppliesClassification: "건조기시트",
            laundrySuppliesPrice: 8000,
            laundrySuppliesCount: 5,
            laundrySuppliesMonthlySalesVolume: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          },
          {
            laundrySuppliesId: "L005", // 추가된 세탁용품
            laundrySuppliesName: "얼룩 제거제",
            laundrySuppliesClassification: "세제",
            laundrySuppliesPrice: 14000,
            laundrySuppliesCount: 12,
            laundrySuppliesMonthlySalesVolume: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
          },
        ],
      },
    ],
    cart: [],
  }),
  getters: {
    selectedStore(state) {
      return state.stores.find((store) => store.storeId === state.selectedStoreId);
    },
    lowStockLaundrySupplies(state) {
      const selectedStore = this.selectedStore;
      return selectedStore ? selectedStore.laundrySupplies.filter((supply) => supply.laundrySuppliesCount < 50) : [];
    },
    selectedLaundrySupplies(state) {
      const store = this.selectedStore;
      return store ? store.laundrySupplies : []; // 선택된 매장의 세탁용품 리스트 반환
    },
    cartItems(state) {
      return state.cart;
    },
  },
  actions: {
    selectStore(storeId) {
      this.selectedStoreId = storeId; // 선택된 매장 업데이트
    },
    addToCart(id) {
      const supply = this.selectedLaundrySupplies.find((item) => item.laundrySuppliesId === id);
      if (supply) {
        const cartItem = this.cart.find((item) => item.id === id);
        if (cartItem) {
          cartItem.quantity += 1; // 이미 장바구니에 있으면 수량 증가
        } else {
          this.cart.push({
            id: supply.laundrySuppliesId,
            name: supply.laundrySuppliesName,
            price: supply.laundrySuppliesPrice,
            stock: supply.laundrySuppliesCount,
            quantity: 1,
          });
        }
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
  },
});

// selectStore(storeId) {
//   this.selectedStoreId = storeId;
// }