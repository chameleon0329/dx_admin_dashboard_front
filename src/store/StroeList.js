import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useStoreListStore = defineStore("storeList", {
  state: () => ({
    stores: [], // 매장 리스트
    selectedStore: null, // 현재 선택된 매장
    isLoading: false,
    error: null,
  }),

  actions: {
    // 매장 리스트 가져오기
    async fetchStoreList() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`store/get/list`);
        this.stores = response.data.map((store) => ({
          storeId: store.storeId,
          storeName: store.storeName,
        }));
      } catch (err) {
        this.error = "매장 리스트를 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // 매장 선택하기
    selectStore(storeId) {
      this.selectedStore = this.stores.find((store) => store.storeId === storeId) || null;
    },
  },
});
