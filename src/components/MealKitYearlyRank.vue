<template>
  <div class="yearly-rank-wrapper">
    <div class="header">
      <h3>{{ selectedYear }}년 밀키트 판매량 순위</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>순위</th>
          <th>이름</th>
          <th>총 판매량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kit, index) in rankedMealKits" :key="index" class="row">
          <td>{{ index + 1 }}</td>
          <td>{{ kit.mealKitName }}</td>
          <td>{{ kit.totalSales.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useMealKiYearlyRankStore } from "@/store/MealKitYearlyRank";

export default {
  name: "Test",
  setup() {
    const storeId = 1; // 예시 Store ID
    const selectedYear = ref(2023); // 예시로 2023년 설정
    
    // 스토어 상태 가져오기
    const mealKitMonthlyRankStore = useMealKiYearlyRankStore();
    const rankedMealKits = computed(() => mealKitMonthlyRankStore.rankedMealKits);
    const isLoading = computed(() => mealKitMonthlyRankStore.isLoading);
    const error = computed(() => mealKitMonthlyRankStore.error);

    // 데이터를 가져오는 함수
    const fetchRankings = async () => {
      await mealKitMonthlyRankStore.fetchMealKitSalesRank(
        storeId, 
        selectedYear.value
      );

      // 데이터 확인용 콘솔 출력
      // console.log("Ranked Meal Kits in Component:", rankedMealKits.value);
    };

    // 컴포넌트 마운트 시 데이터 가져오기
    onMounted(fetchRankings);

    return {
      selectedYear,
      rankedMealKits,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.yearly-rank-wrapper {
  width: 600px;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  border-radius: 8px;
  background-color: #FFD1A7;
  padding: 20px;
  margin-top: 0px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #eee;
  padding: 10px;
}

td {
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding: 15px;
}

.row:hover {
  transform: scale(1.02);
}

.row {
  transition: transform 0.2s ease-in-out;
  cursor: default;
}
</style>