<template>
  <div class="charts-container">
    <h3>성별 방문 고객 수</h3>
    <div class="chart-wrapper">
      <canvas ref="genderDoughnutChart"></canvas>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="!isLoading && users.length === 0">고객 데이터가 없습니다.</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { Chart } from "chart.js";
import { useUserListStore } from "@/store/User";

export default {
  name: "UserGenderChart",
  setup() {
    const storeId = 1; // 예시 매장 ID
    const userListStore = useUserListStore();

    // Pinia 상태
    const users = computed(() => userListStore.users);
    const isLoading = computed(() => userListStore.isLoading);
    const error = computed(() => userListStore.error);

    // 차트 참조 및 인스턴스
    const genderDoughnutChart = ref(null);
    let chartInstance = null;

    // 성별 비율 계산 (필터와 데이터 변환을 분리)
    const genderCounts = computed(() => {
      const counts = { male: 0, female: 0 };
      users.value.forEach((user) => {
        if (user.userGender === "남") counts.male++;
        if (user.userGender === "여") counts.female++;
      });
      return [counts.male, counts.female];
    });

    // 차트 초기화 및 렌더링
    const initializeChart = () => {
      const ctx = genderDoughnutChart.value.getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["남성", "여성"],
          datasets: [
            {
              data: genderCounts.value,
              backgroundColor: ["#36A2EB", "#FF6384"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 500, // 렌더링 애니메이션 시간 단축
          },
          plugins: {
            legend: {
              position: "right",
              labels: {
                generateLabels: (chart) => {
                  const dataset = chart.data.datasets[0];
                  return chart.data.labels.map((label, i) => ({
                    text: `${label} (${dataset.data[i]}명)`, // 범례에 고객 수 추가
                    fillStyle: dataset.backgroundColor[i],
                    index: i,
                  }));
                },
                boxWidth: 12,
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const dataset = tooltipItem.dataset;
                  const total = dataset.data.reduce((acc, val) => acc + val, 0);
                  const currentValue = dataset.data[tooltipItem.dataIndex];
                  const percentage = ((currentValue / total) * 100).toFixed(2);
                  return `${tooltipItem.label}: ${percentage}%`;
                },
              },
            },
          },
        },
      });
    };

    // 차트 업데이트
    const updateChart = () => {
      if (chartInstance) {
        chartInstance.data.datasets[0].data = genderCounts.value; // 데이터만 갱신
        chartInstance.update();
      }
    };

    // 데이터 로드 후 초기화
    const fetchUsers = async () => {
      await userListStore.fetchUsers(storeId);
      if (!chartInstance) {
        initializeChart();
      } else {
        updateChart();
      }
    };

    // 초기 로드
    onMounted(fetchUsers);

    return {
      genderDoughnutChart,
      users,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.charts-container {
  width: 510px;
  height: 340px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
}

.chart-wrapper {
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 290px;
  margin-top: -20px;
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
</style>
