<template>
    <div class="meal-kit-table-wrapper">
        <h3>재고 부족 세탁용품 리스트 (60개 미만)</h3>
        <div class="meal-kit-table">
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>
                            <select v-model="selectedClassification">
                                <option value="">분류</option>
                                <option v-for="classification in classifications" :key="classification" :value="classification">
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
                    <tr v-for="it in sortedItems" :key="it.id">
                        <td>{{ it.laundrySuppliesName }}</td>
                        <td>{{ it.laundrySuppliesClassification }}</td>
                        <td>{{ it.laundrySuppliesPrice.toLocaleString() }}원</td>
                        <td>{{ it.laundrySuppliesCount }}</td>
                        <td>
                            <button @click="inCart(it.id)" class="button">담기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/store/Laundry.js';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const cartStore = useCartStore();
const { item } = storeToRefs(cartStore);

// 필터 상태
const selectedClassification = ref('');
const selectedFoodClassification = ref('');
const sortOrder = ref('asc'); // 정렬 상태 ('asc' or 'desc')

// 분류 필터를 적용한 아이템
const filteredItems = computed(() => {
    return item.value.filter(it => {
        const matchesClassification = !selectedClassification.value || it.laundrySuppliesClassification === selectedClassification.value;
        const matchesFoodClassification = !selectedFoodClassification.value || it.mealKitFoodClassificaion === selectedFoodClassification.value;
        return matchesClassification && matchesFoodClassification && it.laundrySuppliesCount < 60;
    });
});

// 정렬된 아이템
const sortedItems = computed(() => {
    return [...filteredItems.value].sort((a, b) => {
        if (sortOrder.value === 'asc') {
            return a.laundrySuppliesCount - b.laundrySuppliesCount;
        } else {
            return b.laundrySuppliesCount - a.laundrySuppliesCount;
        }
    });
});

// 정렬 순서 변경 함수
const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// 장바구니에 아이템 추가
const inCart = (id) => {
    cartStore.cartItem.push(id);
};

// 분류 및 음식 분류 옵션 추출
const classifications = computed(() => [...new Set(item.value.map(it => it.laundrySuppliesClassification))]);
</script>


<style>
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

  .button {
    color: #FFD1A7;
    background-color: #FF5E23;
    font-size: 15px;
    display: block;
    margin: 10px 0;
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
