// src/store/MealKitMonthlyRank.js
import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMealKiYearlyRankStore = defineStore("mealKitYearlyRankStore", {
  state: () => ({
    rankedMealKits: [], // Top 5 ranked meal kits
    isLoading: false,   // Loading state
    error: null,        // Error state
  }),
  actions: {
    async fetchMealKitSalesRank(storeId, year) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`mealKit/get/top5/year/count`, {
          params: { storeId, year },
        });

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
        this.error = err.message || "Failed to fetch ranked meal kits.";
        console.error("Error:", this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
