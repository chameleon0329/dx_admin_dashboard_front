import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMainMonthlyMealKitSalesRankStore = defineStore(
  "mainMonthlyMealKitSalesRankStore",
  {
    state: () => ({
      rankedMealKits: [], // 상위 5개의 밀키트 매출 데이터
      isLoading: false, // 로딩 상태
      error: null, // 에러 메시지
    }),

    actions: {
      async fetchTop5MealKits(storeId, year, month) {
        this.isLoading = true;
        this.error = null;

        try {
          const response = await axios.get(`mealKit/get/top5/month/revenue`, {
            params: { storeId, year, month },
          });

          // 데이터가 없거나 성공적이지 않은 경우 처리
          if (!response.data || response.data.length === 0) {
            this.rankedMealKits = [];
            this.error = `${year}년 ${month}월에 대한 데이터가 없습니다.`;
          } else {
            // 데이터를 내림차순 정렬 후 상위 5개로 제한
            this.rankedMealKits = response.data
              .sort((a, b) => b.monthlyTotalRevenue - a.monthlyTotalRevenue)
              .slice(0, 5);
            this.error = null;
          }
        } catch (err) {
          this.error =
            err.response?.data?.message ||
            "매출 데이터를 불러오는 데 실패했습니다.";
          this.rankedMealKits = [];
        } finally {
          this.isLoading = false;
        }
      },
    },
  }
);
