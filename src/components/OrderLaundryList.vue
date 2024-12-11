<template>
  <div class="meal-kit-table-wrapper">
    <h3>재고 부족 세탁용품 리스트 (30개 미만)</h3>
    <div class="meal-kit-table">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>
              <select v-model="selectedClassification">
                <option value="">분류</option>
                <option
                  v-for="classification in classifications"
                  :key="classification"
                  :value="classification"
                >
                  {{ classification }}
                </option>
              </select>
            </th>
            <th>가격</th>
            <th @click="toggleSortOrder" style="cursor: pointer;">
              재고
              <span v-if="sortOrder === 'asc'">▲</span>
              <span v-else>▼</span>
            </th>
            <th>장바구니</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supply in sortedItems" :key="supply.laundrySuppliesId">
            <td>{{ supply.laundrySuppliesName }}</td>
            <td>{{ supply.laundrySuppliesClassification }}</td>
            <td>{{ supply.laundrySuppliesPrice.toLocaleString() }}원</td>
            <td>{{ supply.storeCount }}</td>
            <td>
              <button @click="addToCart(supply.laundrySuppliesId)" class="button">담기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useLaundryStore } from "@/store/Laundry";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

const laundryStore = useLaundryStore();
const { lowStockLaundrySupplies } = storeToRefs(laundryStore);

// 필터 상태
const selectedClassification = ref("");
const sortOrder = ref("asc");

// 필터링된 아이템
const filteredItems = computed(() =>
  lowStockLaundrySupplies.value.filter((supply) => {
    return !selectedClassification.value || supply.laundrySuppliesClassification === selectedClassification.value;
  })
);

// 정렬된 아이템
const sortedItems = computed(() =>
  [...filteredItems.value].sort((a, b) => {
    return sortOrder.value === "asc"
      ? a.storeCount - b.storeCount
      : b.storeCount - a.storeCount;
  })
);

// 정렬 순서 변경
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

// 장바구니에 추가
const addToCart = (id) => {
  laundryStore.addToCart(id);
};

// 분류 옵션
const classifications = computed(() => [
  ...new Set(lowStockLaundrySupplies.value.map((supply) => supply.laundrySuppliesClassification)),
]);

// 데이터 로드
onMounted(async () => {
  const storeId = 1; // Example Store ID
  await laundryStore.fetchLaundrySupplies(storeId);
});
</script>

<style scoped>
/* 기존 스타일 유지 */
.meal-kit-table-wrapper {
  width: 700px;
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

.button {
  color: #FFD1A7;
  background-color: #FF5E23;
  font-size: 15px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: center;
}

.button:hover {
  transform: scale(1.1);
  background-color: #ededed;
  color: #FF5E23;
  cursor: pointer;
}
</style>
