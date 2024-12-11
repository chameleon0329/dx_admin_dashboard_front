import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMealKitMonthlyRankStore = defineStore("mealKitMonthlyRankStore", {
  state: () => ({
    rankedMealKits: [], // Top 5 ranked meal kits for the selected month
    isLoading: false,   // Loading state
    error: null,        // Error state
  }),

  actions: {
    async fetchMealKitSalesRank(storeId, year, month) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`mealKit/get/top5/month/count`, {
          params: { storeId, year, month },
        });

        // 데이터가 없는 경우
        if (response.status === 204 || response.data.length === 0) {
          this.rankedMealKits = [];
          this.error = `${year}년 ${month}월의 밀키트 판매량 데이터가 없습니다.`;
        } else {
          this.rankedMealKits = response.data
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 5);
          this.error = null;
        }

        console.log("Fetched Ranked Meal Kits:", this.rankedMealKits);
      } catch (err) {
        // 네트워크 또는 서버 오류 처리
        this.error = err.message || "Failed to fetch ranked meal kits.";
        this.rankedMealKits = [];
        console.error("Error:", this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
