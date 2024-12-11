import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useMainMonthlyVisitorChartStore = defineStore(
  "mainMonthlyVisitorChartStore",
  {
    state: () => ({
      monthlyVisitorCount: Array(12).fill(0), // 월별 방문자 수
      availableYears: [], // 서버에 있는 연도 리스트
      isLoading: false, // 로딩 상태
      error: null, // 에러 메시지
    }),

    actions: {
      // 월별 방문자 수 데이터 가져오기
      async fetchVisitorCount(storeId, year) {
        this.isLoading = true;
        this.error = null;

        try {
          const response = await axios.get(`/get/list/month/visitorCount`, {
            params: { storeId, year },
          });

          if (!response.data || response.data.length === 0) {
            this.monthlyVisitorCount = Array(12).fill(0);
            this.error = `${year}년의 방문 고객 수 데이터가 없습니다.`;
          } else {
            const dataMap = response.data.reduce((acc, { month, visitorCount }) => {
              acc[month - 1] = visitorCount;
              return acc;
            }, Array(12).fill(0));

            this.monthlyVisitorCount = dataMap;
            this.error = null;
          }
        } catch (err) {
          this.error =
            err.response?.data?.message ||
            "방문자 데이터를 불러오는 데 실패했습니다.";
          this.monthlyVisitorCount = Array(12).fill(0);
        } finally {
          this.isLoading = false;
        }
      },

      // 사용 가능한 연도 리스트 가져오기
      async fetchAvailableYears(storeId) {
        this.isLoading = true;
        this.error = null;

        try {
          const response = await axios.get(`/get/list/years`, {
            params: { storeId },
          });

          if (response.data && response.data.length > 0) {
            this.availableYears = response.data.sort((a, b) => b - a); // 연도를 내림차순으로 정렬
          } else {
            this.availableYears = [];
            this.error = "사용 가능한 연도가 없습니다.";
          }
        } catch (err) {
          this.error =
            err.response?.data?.message ||
            "연도 데이터를 불러오는 데 실패했습니다.";
          this.availableYears = [];
        } finally {
          this.isLoading = false;
        }
      },
    },
  }
);
