import { defineStore } from "pinia";
import axios from "axios";

export const useMonthlyCustomerChartStore = defineStore("monthlyCustomerChart", {
  state: () => ({
    monthlyData: [], // { month: 0, visitorCount: 0, storeId: 0 }
    error: null, // 오류 메시지 저장
  }),
  actions: {
    async fetchMonthlyData(storeId, year) {
      this.error = null; // 오류 상태 초기화
      try {
        console.log(`Fetching data for storeId: ${storeId}, year: ${year}`);
        const response = await axios.get("order/get/list/month/visitorCount", {
          params: { storeId, year },
        });
        this.monthlyData = response.data;
        console.log("Server Response Data:", this.monthlyData);

        if (!this.monthlyData.length) {
          this.error = `${year}년 월별 방문 고객 데이터가 없습니다.`; // 데이터가 비어있으면 오류 메시지 설정
        }
      } catch (error) {
        this.error = `데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`;
        console.error("Error fetching data:", error);
        this.monthlyData = [];
      }
    },
  },
});
