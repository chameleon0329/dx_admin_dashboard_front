<template>
  <div class="preference-table-wrapper" v-if="!isLoading">
    <h3>성별 선호 밀키트</h3>
    <table>
      <thead>
        <tr>
          <th>순위</th>
          <th>👨‍💼 남성</th>
          <th>👩‍💼 여성</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rank, index) in 5" :key="index" class="row">
          <td>{{ index + 1 }}</td>
          <td>{{ malePreferences[index]?.mealKitName || '없음' }}</td>
          <td>{{ femalePreferences[index]?.mealKitName || '없음' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>로딩 중...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useUserGenderRankStore } from "@/store/UserGenderRank";

export default {
  name: "UserGenderRank",
  setup() {
    // Pinia store 가져오기
    const userGenderRankStore = useUserGenderRankStore();

    // 데이터 상태 변수
    const storeId = 1; // 매장 ID (하드코딩, 필요에 따라 변경 가능)

    // 컴포저블 API에서 가져오는 computed 변수들
    const malePreferences = computed(() => userGenderRankStore.malePreferences);
    const femalePreferences = computed(() => userGenderRankStore.femalePreferences);
    const isLoading = computed(() => userGenderRankStore.isLoading);

    // 성별 선호 밀키트 리스트 가져오기 함수
    const fetchPreferences = async () => {
      await userGenderRankStore.fetchGenderPreferences(storeId);
    };

    // 컴포넌트 마운트 시 데이터 로드
    onMounted(fetchPreferences);

    // 반환 값
    return {
      malePreferences,
      femalePreferences,
      isLoading,
    };
  },
};
</script>
  
<style scoped>
.preference-table-wrapper {
  width: 510px;
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
