import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMainMonthlySalesChartStore = defineStore("mainMonthlySalesChart", {
  state: () => ({
    mealKitMonthlySales: [], // 월별 매출 데이터
    availableYears: [], // 데이터가 존재하는 연도
    isLoading: false,
    error: null,
    latestYear: null, // 가장 최신 데이터가 있는 연도
  }),
  actions: {
    async fetchTotalRevenueList(storeId, year) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`order/get/list/month/revenue`, {
          params: { storeId, year },
        });

        // 서버에서 가져온 월별 매출 데이터 저장
        this.mealKitMonthlySales = response.data;

        // 데이터 확인용 로그
        console.log("Fetched Monthly Sales:", this.mealKitMonthlySales);

        // 연도별 데이터가 하나라도 존재하면 availableYears에 추가
        const hasValidRevenue = this.mealKitMonthlySales.some((item) => item.totalRevenue > 0);
        if (hasValidRevenue && !this.availableYears.includes(year)) {
          this.availableYears.push(year);
          this.availableYears.sort((a, b) => b - a); // 오름차순 정렬
        }

        // 최신 연도 설정
        this.latestYear = Math.max(...this.availableYears);
      } catch (err) {
        this.error = "데이터를 가져오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // 초기화 시 연도별 데이터 확인
    async initializeAvailableYears(storeId, years) {
      this.isLoading = true;
      this.error = null;
      try {
        for (const year of years) {
          await this.fetchTotalRevenueList(storeId, year);
        }
      } catch (err) {
        this.error = "연도별 데이터를 가져오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
