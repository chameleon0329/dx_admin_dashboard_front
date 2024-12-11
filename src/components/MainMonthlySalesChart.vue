<template>
  <div>
    <div class="monthly-rank-wrapper">
      <div class="header">
        <h3>{{ selectedYear }}년 월별 총 매출액
          <button class="calendar-btn" @click="togglePopup">
            <img src="./calendar-icon1.png" alt="달력 아이콘" />
          </button>
        </h3>
      </div>

      <!-- Chart.js Bar Chart -->
      <div v-if="!isLoading" class="chart-container">
        <canvas id="revenueChart" v-if="hasRevenueData && !error"></canvas>
        <p v-if="!hasRevenueData && !error" class="no-data">해당 연도의 월별 총 매출액 데이터가 없습니다.</p>
        <p v-if="error" class="error" style="margin-bottom: 0;">{{ selectedYear }}년 월별 총 매출액 데이터가 없습니다.</p>
      </div>

      <p v-if="isLoading">데이터를 로드 중입니다...</p>

      <!-- Popup for Year selection -->
      <div v-if="isPopupOpen" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <div class="popup-body">
            <div class="year-grid">
              <button 
                v-for="year in availableYears" 
                :key="year" 
                @click="selectYear(year)"
                class="year-btn"
              >
                {{ year }}년
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useMainMonthlySalesChartStore } from "@/store/MainMonthlySalesChart";
import { Chart } from "chart.js";

export default {
  name: "MainMonthlyMealKitSalesRank",
  setup() {
    const storeId = 1;

    // 기본 설정 연도 및 범위
    const baseYear = 2023; // 기본 연도
    const availableYears = ref([baseYear + 1, baseYear, baseYear - 1]); // 기본 연도와 1년 전 연도만 선택 가능
    const selectedYear = ref(baseYear); // 기본 선택 연도 설정
    const popupYear = ref(baseYear);
    const isPopupOpen = ref(false);

    // Pinia Store
    const mealKitSalesStore = useMainMonthlySalesChartStore();
    const mealKitMonthlySales = computed(() => mealKitSalesStore.mealKitMonthlySales);
    const isLoading = computed(() => mealKitSalesStore.isLoading);
    const error = computed(() => mealKitSalesStore.error);

    // 차트 인스턴스
    let chartInstance = null;

    // 총 매출 데이터가 있는지 확인
    const hasRevenueData = computed(() => {
      return mealKitMonthlySales.value.some((item) => item.totalRevenue > 0);
    });

    // 데이터가 없는 달은 0으로 채우기
    const getProcessedMonthlySales = () => {
      const monthlySales = Array.from({ length: 12 }, () => 0); // 초기값 0으로 채운 배열
      mealKitMonthlySales.value.forEach((item) => {
        if (item.month >= 1 && item.month <= 12) {
          monthlySales[item.month - 1] = item.totalRevenue;
        }
      });
      return monthlySales;
    };

    // Fetch Data from API
    const fetchRevenueData = async () => {
      try {
        await mealKitSalesStore.fetchTotalRevenueList(storeId, selectedYear.value);
        if (error.value) {
          destroyChart();
        } else if (hasRevenueData.value) {
          renderChart();
        } else {
          destroyChart();
        }
      } catch {
        destroyChart();
      }
    };

    // Bar Chart Rendering
    const renderChart = () => {
      destroyChart(); // 기존 차트 제거
      const ctx = document.getElementById("revenueChart").getContext("2d");
      const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
      const revenues = getProcessedMonthlySales();

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "월별 총 매출액(단위: 원)",
              data: revenues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value.toLocaleString();
                },
              },
            },
          },
        },
      });
    };

    // 차트 제거
    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    // Popup Controls for Year
    const togglePopup = () => {
      isPopupOpen.value = !isPopupOpen.value;
    };

    const closePopup = () => {
      isPopupOpen.value = false;
    };

    const prevYear = () => {
      popupYear.value--;
    };

    const nextYear = () => {
      popupYear.value++;
    };

    // Select a year and fetch data
    const selectYear = (year) => {
      selectedYear.value = year;
      popupYear.value = year; // Update the popup year
      closePopup();
      fetchRevenueData(); // Fetch new data for the selected year
    };

    // Load data on mount
    onMounted(fetchRevenueData);

    return {
      selectedYear,
      popupYear,
      isPopupOpen,
      availableYears,
      mealKitMonthlySales,
      isLoading,
      error,
      hasRevenueData,
      togglePopup,
      closePopup,
      prevYear,
      nextYear,
      selectYear,
    };
  },
};
</script>

<style scoped>
.monthly-rank-wrapper {
  width: 600px;
  height: 395px;
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
  width: 20px;
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
  width: 30px;
  height: 30px;
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

.chart-container {
  position: relative;
  height: 280px;
  width: 100%;
}

.no-data {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.error {
  text-align: center;
  font-size: 16px;
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

.year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.year-btn {
  background: #f5f5f5;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
</style>
