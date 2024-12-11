// stores/UserGenderRank.js
import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useUserGenderRankStore = defineStore('userGenderRank', {
  state: () => ({
    malePreferences: [],
    femalePreferences: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchGenderPreferences(storeId) {
      try {
        this.isLoading = true;
        
        const maleResponse = await axios.get(`user/get/list/gender`, {
          params: { storeId, userGender: '남' }
        });
        const femaleResponse = await axios.get(`user/get/list/gender`, {
          params: { storeId, userGender: '여' }
        });

        // 서버에서 받은 데이터 콘솔 출력
        console.log("Male preferences data:", maleResponse.data);
        console.log("Female preferences data:", femaleResponse.data);

        // 데이터를 판매량 높은 순서로 정렬하고 상위 5개만 추출
        this.malePreferences = maleResponse.data
          .sort((a, b) => b.totalSales - a.totalSales)
          .slice(0, 5);
        this.femalePreferences = femaleResponse.data
          .sort((a, b) => b.totalSales - a.totalSales)
          .slice(0, 5);

        this.error = null;
      } catch (error) {
        this.error = error;
        console.error("Error fetching gender preferences:", error);
      } finally {
        this.isLoading = false;
      }
    }
  },
});
