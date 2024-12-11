// src/store/User.js
import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

export const useUserListStore = defineStore("userListStore", {
  state: () => ({
    users: [], // 전체 고객 데이터
    isLoading: false, // 로딩 상태
    error: null, // 에러 상태
  }),
  actions: {
    async fetchUsers(storeId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`user/get/list/${storeId}`);
        this.users = response.data;
        console.log("Fetched Users:", this.users);
      } catch (err) {
        this.error = err.message || "Failed to fetch users.";
        console.error("Error:", this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
