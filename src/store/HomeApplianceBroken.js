import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useHomeApplianceBrokenStore = defineStore("homeApplianceBroken", {
  state: () => ({
    brokenAppliances: [], // 고장난 가전 리스트
    isLoading: false,
    error: null,
  }),

  actions: {
    // '고장' 상태의 가전 리스트 가져오기
    async fetchBrokenAppliances(storeId) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`homeAppliances/get/state`, {
          params: { storeId, homeAppliancesState: "고장" },
        });

        // API 응답 데이터를 상태에 저장
        this.brokenAppliances = response.data.map((appliance) => ({
          id: appliance.homeAppliancesId,
          name: appliance.homeAppliancesName,
          model: appliance.homeAppliancesModelName,
          category: appliance.homeAppliancesClassification,
          status: "고장", // 상태는 항상 '고장'
        }));
      } catch (err) {
        this.error = "고장난 가전 리스트를 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
