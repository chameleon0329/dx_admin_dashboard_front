// stores/UserAgeRank.js
import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';

export const useUserAgeRankStore = defineStore('userAgeRank', {
  state: () => ({
    topMealKitsByAge: {
      '20대': null,
      '30대': null,
      '40대': null,
      '50대': null,
    },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchTopMealKitsByAge(storeId) {
      try {
        this.isLoading = true;
        const ageGroups = [20, 30, 40, 50]; // age groups to query
        const mealKitData = {};

        // Loop through each age group (20, 30, 40, 50)
        for (let age of ageGroups) {
          const response = await axios.get('user/get/list/age', {
            params: { storeId, userAge: age },
          });
          
          // Sort the meal kits by totalSales (descending) and get the one with the highest sales
          const topMealKit = response.data.length > 0
            ? response.data.sort((a, b) => b.totalSales - a.totalSales)[0]
            : null;

          mealKitData[`${age}대`] = topMealKit;
        }

        // Store the fetched data for each age group
        this.topMealKitsByAge = mealKitData;
        this.error = null;
      } catch (error) {
        this.error = error;
        console.error("Error fetching top meal kits by age:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
