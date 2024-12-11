<template>
  <div class="meal-kit-table-wrapper">
    <h3>{{ selectedStoreName }}의 밀키트 리스트</h3>
    <div class="meal-kit-table">
      <table>
        <thead>
          <tr>
            <th style="width: 140px; text-align: center;">이름</th>
            <th>
              <div class="filter">
                <select v-model="filters.category" @change="filterMealKits">
                  <option value="all">분류</option>
                  <option v-for="category in uniqueCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </th>
            <th>
              <div class="filter">
                <select v-model="filters.foodType" @change="filterMealKits">
                  <option value="all">음식 분류</option>
                  <option v-for="type in uniqueFoodTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
            </th>
            <th>가격</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mealKit in filteredMealKits" :key="mealKit.mealKitId" class="row">
            <td>{{ mealKit.mealKitName }}</td>
            <td>{{ mealKit.mealKitClassification }}</td>
            <td>{{ mealKit.mealKitFoodClassification }}</td>
            <td>{{ mealKit.mealKitPrice.toLocaleString() }} 원</td>
            <td>{{ mealKit.mealKitCount }}</td>
          </tr>
          <tr v-if="filteredMealKits.length === 0">
            <td colspan="5">밀키트 데이터가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useMealKitStore } from "@/store/MealKitStore";
import { computed, onMounted, ref } from "vue";

export default {
  name: "MealKitList",
  setup() {
    const mealKitStore = useMealKitStore();

    // 필터 상태 관리
    const filters = ref({
      category: "all",
      foodType: "all",
    });

    // 현재 선택된 매장
    const selectedStoreName = computed(() => mealKitStore.selectedStoreName || "매장");

    // 밀키트 목록
    const mealKits = computed(() => mealKitStore.items);

    // 필터링된 밀키트
    const filteredMealKits = computed(() => {
      return mealKits.value.filter((kit) => {
        const matchesCategory =
          filters.value.category === "all" || kit.mealKitClassification === filters.value.category;
        const matchesFoodType =
          filters.value.foodType === "all" || kit.mealKitFoodClassification === filters.value.foodType;
        return matchesCategory && matchesFoodType;
      });
    });

    // 고유 카테고리
    const uniqueCategories = computed(() =>
      Array.from(new Set(mealKits.value.map((kit) => kit.mealKitClassification)))
    );

    // 고유 음식 분류
    const uniqueFoodTypes = computed(() =>
      Array.from(new Set(mealKits.value.map((kit) => kit.mealKitFoodClassification)))
    );

    // 컴포넌트 마운트 후 밀키트 데이터 로드
    onMounted(async () => {
      const storeId = 1; // 예시로 storeId 1을 사용
      await mealKitStore.fetchMealKits(storeId); // 밀키트 데이터 로드
    });

    // 필터 변경 시 호출되는 함수
    const filterMealKits = () => {
      // 필터링 로직은 computed 속성에서 처리되므로 이 곳에 따로 로직을 추가하지 않음
    };

    return {
      filters,
      filteredMealKits,
      uniqueCategories,
      uniqueFoodTypes,
      selectedStoreName,
      filterMealKits,
    };
  },
};
</script>

<style scoped>
.meal-kit-table-wrapper {
  width: 600px;
  height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
  overflow: hidden;
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

.meal-kit-table {
  max-height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
}

select {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-color: #FFF7EF;
  background-color: #FFF7EF;
  padding: 0;
}

option {
  background-color: white;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

option:hover {
  transform: scale(1.02);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #FFF7EF;
}

thead th {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-align: left;
  border-bottom: 2px solid #eee;
  padding: 15px;
}

tbody td {
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
