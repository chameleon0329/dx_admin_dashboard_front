<template>
  <div>
    <div class="monthly-rank-wrapper">
      <div class="header">
        <h3>
          {{ selectedYear }}년 월별 매장 방문 고객 수
          <button class="calendar-btn" @click="togglePopup">
            <img src="./calendar-icon1.png" alt="달력 아이콘" />
          </button>
        </h3>
      </div>

      <div class="chart-container">
        <!-- 그래프 영역 -->
        <canvas id="customerChart" v-if="!error"></canvas>

        <!-- 오류 메시지 -->
        <p v-if="error" class="error">{{ selectedYear }}년 월별 매장 방문 고객 수 데이터가 없습니다.</p>
      </div>

      <!-- 연도 선택 팝업 -->
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
import { Chart, registerables } from "chart.js";
import { useMonthlyCustomerChartStore } from "@/store/MainMonthlyCustomerChart";
import { ref, computed, onMounted } from "vue";

Chart.register(...registerables);

export default {
  name: "MonthlyCustomerChart",
  setup() {
    const baseYear = 2023; // 기본 연도
    const availableYears = ref([baseYear + 1, baseYear, baseYear - 1]); // 기본 연도와 ±1년
    const selectedYear = ref(baseYear); // 현재 선택된 연도
    const popupYear = ref(baseYear);
    const isPopupOpen = ref(false);

    const store = useMonthlyCustomerChartStore();
    const chartInstance = ref(null);

    // Pinia에서 error 상태 가져오기
    const error = computed(() => store.error);

    // 차트 렌더링
    const renderChart = (data) => {
      const canvas = document.getElementById("customerChart");
      if (!canvas) {
        console.error("Canvas element not found!");
        return;
      }

      const ctx = canvas.getContext("2d");

      // 기존 차트 제거
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      chartInstance.value = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
          datasets: [
            {
              label: "월별 매장 방문 고객 수 (단위: 명)",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 4,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 200,
              },
            },
          },
        },
      });
    };

    // 서버 데이터 가져오고 차트 렌더링
    const fetchAndRenderData = async () => {
      await store.fetchMonthlyData(1, selectedYear.value); // storeId = 1
      if (!error.value) {
        const visitorCounts = Array(12).fill(0);
        store.monthlyData.forEach((item) => {
          visitorCounts[item.month - 1] = item.visitorCount;
        });
        renderChart(visitorCounts);
      } else {
        console.warn("Error detected:", error.value);
        if (chartInstance.value) {
          chartInstance.value.destroy(); // 오류가 있으면 차트 제거
          chartInstance.value = null;
        }
      }
    };

    // 팝업 열기/닫기
    const togglePopup = () => {
      isPopupOpen.value = !isPopupOpen.value;
    };

    const closePopup = () => {
      isPopupOpen.value = false;
    };

    // 연도 선택
    const selectYear = (year) => {
      selectedYear.value = year;
      popupYear.value = year;
      closePopup();
      fetchAndRenderData();
    };

    onMounted(fetchAndRenderData);

    return {
      availableYears,
      selectedYear,
      popupYear,
      isPopupOpen,
      togglePopup,
      closePopup,
      selectYear,
      error,
    };
  },
};
</script>

<style scoped>
.monthly-rank-wrapper {
  width: 600px;
  max-width: 600px;
  height: 395px;
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
