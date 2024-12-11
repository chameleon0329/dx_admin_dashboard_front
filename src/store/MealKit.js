import { defineStore } from "pinia";

export const useMealKitStore = defineStore("MealKit", {
  state: () => ({
    selectedStoreId: 'S001', // 기본값: 홍대 매장 (storeId: S001)
    stores: [
      {
        storeId: 'S001',
        name: "역삼점",
        mealKits: [
          {
            mealKitId: 'MK001',
            mealKitName: "부산맛집 돼지국밥",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "고기",
            mealKitPrice: 15000,
            mealKitCount: 10,
            mealKitMonthlySalesVolume: [50, 60, 55, 48, 62, 58, 70, 65, 55, 60, 50, 58],
          },
          {
            mealKitId: 'MK002',
            mealKitName: "면사랑 직화크림불닭면",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 12000,
            mealKitCount: 35,
            mealKitMonthlySalesVolume: [30, 25, 28, 40, 35, 38, 42, 50, 45, 32, 28, 25],
          },
          {
            mealKitId: 'MK003',
            mealKitName: "홍익쭈꾸미 S",
            mealKitClassificaion: "중식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 10000,
            mealKitCount: 50,
            mealKitMonthlySalesVolume: [40, 45, 50, 55, 60, 65, 50, 55, 40, 45, 50, 55],
          },
          {
            mealKitId: 'MK004',
            mealKitName: "머쉬룸크림파스타",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "찌개",
            mealKitPrice: 14000,
            mealKitCount: 20,
            mealKitMonthlySalesVolume: [25, 30, 35, 28, 22, 18, 15, 20, 25, 30, 35, 28],
          },
          {
            mealKitId: 'MK005',
            mealKitName: "티엔미미 총유면",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "밥",
            mealKitPrice: 8000,
            mealKitCount: 60,
            mealKitMonthlySalesVolume: [80, 85, 90, 95, 100, 105, 100, 80, 70, 80, 85, 75],
          },
        ],
      },
      {
        storeId: 'S002',
        name: "서초점",
        mealKits: [
          {
            mealKitId: 'MK001',
            mealKitName: "불고기 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "고기",
            mealKitPrice: 15000,
            mealKitCount: 50,
            mealKitMonthlySalesVolume: [30, 40, 35, 25, 45, 50, 60, 55, 35, 45, 30, 40],
          },
          {
            mealKitId: 'MK002',
            mealKitName: "파스타 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 12000,
            mealKitCount: 25,
            mealKitMonthlySalesVolume: [20, 25, 30, 28, 24, 22, 26, 30, 28, 25, 20, 22],
          },
          {
            mealKitId: 'MK003',
            mealKitName: "짜장면 밀키트",
            mealKitClassificaion: "중식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 10000,
            mealKitCount: 45,
            mealKitMonthlySalesVolume: [50, 55, 48, 52, 58, 60, 62, 65, 55, 50, 48, 58],
          },
          {
            mealKitId: 'MK004',
            mealKitName: "김치찌개 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "찌개",
            mealKitPrice: 14000,
            mealKitCount: 15,
            mealKitMonthlySalesVolume: [10, 12, 15, 18, 20, 25, 22, 20, 15, 12, 10, 12],
          },
          {
            mealKitId: 'MK005',
            mealKitName: "햄버거 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "밥",
            mealKitPrice: 8000,
            mealKitCount: 55,
            mealKitMonthlySalesVolume: [70, 75, 80, 85, 90, 95, 85, 80, 75, 70, 65, 60],
          },
        ],
      },
      {
        storeId: 'S003',
        name: "광진원룸촌점",
        mealKits: [
          {
            mealKitId: 'MK001',
            mealKitName: "불고기 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "고기",
            mealKitPrice: 15000,
            mealKitCount: 30,
            mealKitMonthlySalesVolume: [40, 35, 30, 28, 25, 20, 18, 22, 25, 30, 35, 40],
          },
          {
            mealKitId: 'MK002',
            mealKitName: "파스타 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 12000,
            mealKitCount: 20,
            mealKitMonthlySalesVolume: [18, 22, 24, 26, 30, 28, 25, 22, 18, 20, 22, 24],
          },
          {
            mealKitId: 'MK003',
            mealKitName: "짜장면 밀키트",
            mealKitClassificaion: "중식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 10000,
            mealKitCount: 35,
            mealKitMonthlySalesVolume: [25, 30, 35, 40, 45, 48, 42, 38, 35, 30, 25, 28],
          },
          {
            mealKitId: 'MK004',
            mealKitName: "김치찌개 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "찌개",
            mealKitPrice: 14000,
            mealKitCount: 10,
            mealKitMonthlySalesVolume: [8, 10, 12, 15, 18, 20, 22, 18, 15, 12, 10, 8],
          },
          {
            mealKitId: 'MK005',
            mealKitName: "햄버거 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "밥",
            mealKitPrice: 8000,
            mealKitCount: 40,
            mealKitMonthlySalesVolume: [60, 65, 70, 75, 80, 85, 75, 70, 65, 60, 55, 50],
          },
        ],
      },
      {
        storeId: 'S004',
        name: "건대동문회관점",
        mealKits: [
          {
            mealKitId: 'MK001',
            mealKitName: "불고기 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "고기",
            mealKitPrice: 15000,
            mealKitCount: 30,
            mealKitMonthlySalesVolume: [40, 35, 30, 28, 25, 20, 18, 22, 25, 30, 35, 40],
          },
          {
            mealKitId: 'MK002',
            mealKitName: "파스타 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 12000,
            mealKitCount: 20,
            mealKitMonthlySalesVolume: [18, 22, 24, 26, 30, 28, 25, 22, 18, 20, 22, 24],
          },
          {
            mealKitId: 'MK003',
            mealKitName: "짜장면 밀키트",
            mealKitClassificaion: "중식",
            mealKitFoodClassificaion: "면",
            mealKitPrice: 10000,
            mealKitCount: 35,
            mealKitMonthlySalesVolume: [25, 30, 35, 40, 45, 48, 42, 38, 35, 30, 25, 28],
          },
          {
            mealKitId: 'MK004',
            mealKitName: "김치찌개 밀키트",
            mealKitClassificaion: "한식",
            mealKitFoodClassificaion: "찌개",
            mealKitPrice: 14000,
            mealKitCount: 10,
            mealKitMonthlySalesVolume: [8, 10, 12, 15, 18, 20, 22, 18, 15, 12, 10, 8],
          },
          {
            mealKitId: 'MK005',
            mealKitName: "햄버거 밀키트",
            mealKitClassificaion: "양식",
            mealKitFoodClassificaion: "밥",
            mealKitPrice: 8000,
            mealKitCount: 40,
            mealKitMonthlySalesVolume: [60, 65, 70, 75, 80, 85, 75, 70, 65, 60, 55, 50],
          },
        ],
      },
      // {
      //   storeId: 'S004',
      //   name: 건대동문회관점,
      // },
      // {
      //   storeId: 'S005',
      //   name: 관악한빛점,
      // },
      // {
      //   storeId: 'S006',
      //   name: 성신여대입구점,
      // },
      // {
      //   storeId: 'S007',
      //   name: 을지로점,
      // },
      // {
      //   storeId: 'S008',
      //   name: 명동점,
      // },
      // {
      //   storeId: 'S009',
      //   name: 신림점,
      // },
      // {
      //   storeId: 'S010',
      //   name: 신촌점,
      // },
    ],
    cart: [],
  }),
  getters: {
    selectedStore(state) {
      return state.stores.find(store => store.storeId === state.selectedStoreId);
    },
    lowStockMealKits(state) {
      const selectedStore = this.selectedStore;
      return selectedStore ? selectedStore.mealKits.filter(mealKit => mealKit.mealKitCount < 20) : [];
    },
    selectedMealKits(state) {
      const selectedStore = state.stores.find((store) => store.storeId === state.selectedStoreId);
      return selectedStore ? selectedStore.mealKits : [];
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
      const mealKit = this.selectedMealKits.find((kit) => kit.mealKitId === id);
      if (mealKit) {
        const cartItem = this.cart.find((item) => item.id === id);
        if (cartItem) {
          cartItem.quantity += 1; // 이미 장바구니에 있으면 수량 증가
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
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
  },
});

// import { defineStore } from "pinia";
// import axios from "axios"; // 데이터 요청을 위해 axios 사용

// export const useMealKitStore = defineStore("MealKit", {
//   state: () => ({
//     selectedStoreId: null, // 기본값: null (초기 선택된 매장이 없을 수 있음)
//     stores: [], // 초기에는 비어 있고 서버에서 데이터를 받아 채움
//     isLoading: false, // 데이터 로딩 상태 관리
//     error: null, // 에러 상태 관리
//   }),
//   actions: {
//     /**
//      * 서버에서 매장 데이터를 불러오는 함수
//      */
//     async fetchStores() {
//       this.isLoading = true;
//       this.error = null;

//       try {
//         // 백엔드 서버에서 데이터 가져오기 (예제 URL 사용)
//         const response = await axios.get("/api/stores");
//         this.stores = response.data; // 서버에서 받은 데이터를 상태에 저장

//         // 기본 매장 선택 (첫 번째 매장 또는 다른 로직에 따라)
//         if (this.stores.length > 0) {
//           this.selectedStoreId = this.stores[0].storeId;
//         }
//       } catch (err) {
//         this.error = err.message || "데이터를 가져오는 중 오류가 발생했습니다.";
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     /**
//      * 매장 선택 업데이트
//      * @param {string} storeId 선택된 매장의 ID
//      */
//     selectStore(storeId) {
//       this.selectedStoreId = storeId;
//     },
//   },
//   getters: {
//     /**
//      * 선택된 매장 데이터 반환
//      */
//     selectedStore(state) {
//       return state.stores.find((store) => store.storeId === state.selectedStoreId) || null;
//     },
//   },
// });
