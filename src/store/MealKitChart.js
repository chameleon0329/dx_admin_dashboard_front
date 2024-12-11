import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMealKitChartStore = defineStore("mealKitChart", {
  state: () => ({
    mealKitSalesData: [], // 밀키트 월별 판매량 리스트 [{ mealKitId, mealKitName, monthlyMealKitSales }]
    isLoading: false,
    error: null,
  }),

  actions: {
    // 밀키트 리스트와 월별 판매량 가져오기
    async fetchMealKitData(storeId, year) {
      this.isLoading = true;
      this.error = null;
      try {
        // 1. 밀키트 리스트 가져오기
        const mealKitResponse = await axios.get(`mealKit/get/list/${storeId}`);
        const mealKits = mealKitResponse.data.map((kit) => ({
          mealKitId: kit.mealKitId,
          mealKitName: kit.mealKitName,
          monthlyMealKitSales: Array(12).fill(0), // 월별 판매량 초기화
        }));

        // 2. 각 밀키트별 월별 판매량 가져오기
        for (const mealKit of mealKits) {
          const salesResponse = await axios.get(`mealKit/get/one/month/count`, {
            params: { mealKitId: mealKit.mealKitId, storeId, year },
          });

          // 월별 판매량 매핑
          salesResponse.data.forEach((item) => {
            mealKit.monthlyMealKitSales[item.month - 1] = item.salesCount;
          });
        }

        // 3. 상태 업데이트
        this.mealKitSalesData = mealKits;
      } catch (err) {
        this.error = "데이터를 가져오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
