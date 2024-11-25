<template>
  <div class="meal-kit-table-wrapper">
    <h3>밀키트 리스트</h3>
    <div class="meal-kit-table">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>
              <div class="filter">
                <select id="category-filter" v-model="filters.category" @change="filterMealKits">
                  <option value="all">분류</option>
                  <option v-for="(category, index) in uniqueCategories" :key="index" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </th>
            <th>
              <div class="filter">
                <select id="type-filter" v-model="filters.foodType" @change="filterMealKits">
                  <option value="all">음식 분류</option>
                  <option v-for="(type, index) in uniqueFoodTypes" :key="index" :value="type">
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
          <tr v-for="(mealKit, index) in filteredMealKits" :key="index" class="row">
            <td>{{ mealKit.mealKitName }}</td>
            <td>{{ mealKit.mealKitClassificaion }}</td>
            <td>{{ mealKit.mealKitFoodClassificaion }}</td>
            <td>{{ mealKit.mealKitPrice.toLocaleString() }} 원</td>
            <td>{{ mealKit.mealKitCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mealKitData } from "@/assets/MealKitData.js";

export default {
  name: "MealKitList",
  data() {
    return {
      mealKits: mealKitData, // 데이터셋
      filters: {
        category: "all",
        foodType: "all",
      },
      filteredMealKits: [],
    };
  },
  computed: {
    uniqueCategories() {
      // 분류 목록 (중복 제거)
      return [...new Set(this.mealKits.map((kit) => kit.mealKitClassificaion))];
    },
    uniqueFoodTypes() {
      // 음식 분류 목록 (중복 제거)
      return [...new Set(this.mealKits.map((kit) => kit.mealKitFoodClassificaion))];
    },
  },
  methods: {
    filterMealKits() {
      const { category, foodType } = this.filters;
      this.filteredMealKits = this.mealKits.filter((kit) => {
        return (
          (category === "all" || kit.mealKitClassificaion === category) &&
          (foodType === "all" || kit.mealKitFoodClassificaion === foodType)
        );
      });
    },
  },
  created() {
    this.filteredMealKits = this.mealKits; // 초기값 설정
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
  cursor: pointer;
}
</style>
