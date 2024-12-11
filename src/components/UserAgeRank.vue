<template>
  <div class="preference-table-wrapper" v-if="!isLoading">
    <h3>연령별 선호 밀키트</h3>
    <table>
      <thead>
        <tr>
          <th>연령</th>
          <th>선호 밀키트</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through the topMealKitsByAge object to display each age group -->
        <tr v-for="(mealKit, age) in topMealKitsByAge" :key="age" class="row">
          <td>{{ age }}</td>
          <td>{{ mealKit ? mealKit.mealKitName : '없음' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>로딩 중...</p>
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue';
import { useUserAgeRankStore } from '@/store/UserAgeRank';

export default {
  name: 'AgeRank',
  setup() {
    // Pinia store 가져오기
    const userAgeRankStore = useUserAgeRankStore();

    // 상태 변수
    const storeId = 1; // 매장 ID (하드코딩, 필요에 따라 변경 가능)

    // 컴포저블 API에서 가져오는 computed 변수들
    const topMealKitsByAge = computed(() => userAgeRankStore.topMealKitsByAge);
    const isLoading = computed(() => userAgeRankStore.isLoading);

    // 데이터 로드 함수
    const fetchPreferences = async () => {
      await userAgeRankStore.fetchTopMealKitsByAge(storeId);
    };

    // 컴포넌트 마운트 시 데이터 로드
    onMounted(fetchPreferences);

    return {
      topMealKitsByAge,
      isLoading,
    };
  },
};
</script>
  
<style scoped>
.preference-table-wrapper {
  width: 330px;
  height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
}

h3 {
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
  