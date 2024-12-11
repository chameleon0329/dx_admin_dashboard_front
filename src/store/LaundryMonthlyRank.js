import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8081";

export const useLaundrySuppliesMonthlyRankStore = defineStore('laundrySuppliesMonthlyRank', {
  state: () => ({
    rankedLaundrySupplies: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchLaundrySuppliesSalesRank(storeId, year, month) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`laundrySupplies/get/top5/month/count`, {
          params: {
            storeId,
            year,
            month,
          },
        });

        if (response.status === 204 || response.data.length === 0) {
          this.rankedLaundrySupplies = [];
          this.error = `${year}년 ${month}월의 밀키트 판매량 데이터가 없습니다.`;
        } else {
          this.rankedLaundrySupplies = response.data
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 5);
          this.error = null;
        }

        console.log("Fetched Ranked Laundry Supplies:", this.rankedLaundrySupplies);
      } catch (err) {
        this.error = '데이터를 가져오는 데 실패했습니다.';
        this.rankedLaundrySupplies = [];
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
