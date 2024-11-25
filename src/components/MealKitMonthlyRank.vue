<template>
  <div>
    <div class="monthly-rank-wrapper">
      <div class="header">
        <h3>{{ selectedYear }}년 {{ selectedMonth }}월 판매량 순위
          <button class="calendar-btn" @click="togglePopup">
            <img src="./calendar-icon1.png" alt="달력 아이콘" />
          </button>
        </h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>판매량</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kit, index) in rankedMealKits" :key="index" class="row">
            <td>{{ index + 1 }}</td>
            <td>{{ kit.name }}</td>
            <td>{{ kit.sales.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isPopupOpen" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <button @click="prevYear">&lt;</button>
          <span>{{ popupYear }}</span>
          <button @click="nextYear">&gt;</button>
        </div>
        <div class="popup-body">
          <div class="month-grid">
            <button v-for="month in months" :key="month" @click="selectMonth(month)">
              {{ month }}월
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mealKitData } from "../assets/MealKitData.js"; // 데이터 가져오기

export default {
  name: "MonthlyMealKitRank",
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      popupYear: new Date().getFullYear(),
      isPopupOpen: false,
      months: Array.from({ length: 12 }, (_, i) => i + 1),
      mealKits: mealKitData, // 데이터셋
    };
  },
  computed: {
    rankedMealKits() {
      // 선택된 월에 대한 판매량을 기준으로 밀키트 리스트를 내림차순 정렬하고 상위 5개만 반환
      return this.mealKits
        .map(kit => ({
          name: kit["mealKitName"],
          sales: kit["월별 판매량"][this.selectedMonth - 1] // 선택된 월의 판매량
        }))
        .sort((a, b) => b.sales - a.sales) // 판매량 내림차순 정렬
        .slice(0, 5); // 상위 5개
    },
  },
  methods: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    prevYear() {
      this.popupYear--;
    },
    nextYear() {
      this.popupYear++;
    },
    selectMonth(month) {
      this.selectedMonth = month; // 선택한 월 업데이트
      this.isPopupOpen = false; // 팝업 닫기
    },
  },
};
</script>

<style scoped>
.monthly-rank-wrapper {
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

.calendar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  transition: all 0.3s ease;
  margin: 0;
  margin-left: 10px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
}

.calendar-btn img {
  width: 20px;
  height: 20px;
}

.calendar-btn:hover {
  transform: scale(1.5);
  background-color: #f7f7f7;
  cursor: pointer;
}

h3 {
  display: flex;
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.popup-header span {
  padding: 20px;
}

.popup-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #949494;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.month-grid button {
  background: #f5f5f5;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
</style>
