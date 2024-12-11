import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useHomeApplianceStore = defineStore("homeAppliance", {
  state: () => ({
    appliances: [], // 가전 리스트 데이터
    isLoading: false,
    error: null,
  }),

  actions: {
    // 매장별 가전 리스트 가져오기
    async fetchAppliances(storeId) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`homeAppliances/get/list/${storeId}`);
        // 데이터 변환 및 저장
        this.appliances = response.data.map((appliance) => ({
          id: appliance.homeAppliancesId,
          name: appliance.homeAppliancesName,
          model: appliance.homeAppliancesModelName,
          category: appliance.homeAppliancesClassification,
          status: "정상", // 예제: 상태는 기본값으로 설정
        }));
      } catch (err) {
        this.error = "가전 리스트를 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
