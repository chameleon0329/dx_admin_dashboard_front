<template>
  <div class="meal-kit-container">
    <!-- 밀키트 선택 Select Box -->
    <div class="meal-kit-select">
      <label for="mealKitSelect">밀키트를 선택하세요:</label>
      <select id="mealKitSelect" v-model="selectedMealKitId">
        <option
          v-for="mealKit in mealKits"
          :key="mealKit.mealKitId"
          :value="mealKit.mealKitId"
        >
          {{ mealKit.mealKitName }}
        </option>
      </select>
    </div>

    <!-- 차트 -->
    <div class="meal-kit-chart">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { Chart } from "chart.js";
import { useMealKitStore } from "@/store/MealKit"; // Pinia 스토어 import

export default {
  name: "MealKitChart",
  setup() {
    const mealKitStore = useMealKitStore(); // Pinia 스토어 인스턴스

    // 현재 선택된 매장의 밀키트 리스트
    const mealKits = computed(() => mealKitStore.selectedMealKits);

    // 초기 선택된 밀키트 (첫 번째 밀키트)
    const selectedMealKitId = ref(mealKits.value[0]?.mealKitId || null);

    // 선택된 밀키트 데이터를 가져오기
    const selectedMealKit = computed(() =>
      mealKits.value.find((mealKit) => mealKit.mealKitId === selectedMealKitId.value)
    );

    const chartInstance = ref(null); // Chart.js 인스턴스
    const chartCanvas = ref(null); // canvas 요소 참조

    // Y축 최댓값 계산: 기본 매장의 밀키트 리스트 중 월별 판매량의 가장 큰 값
    const maxSalesValue = computed(() => {
      return Math.max(
        ...mealKits.value.flatMap((mealKit) => mealKit.mealKitMonthlySalesVolume)
      );
    });

    // 차트 생성 및 업데이트
    const renderChart = (mealKit) => {
      if (chartInstance.value) {
        chartInstance.value.destroy(); // 기존 차트를 삭제
      }

      if (!chartCanvas.value) {
        console.warn("Chart canvas is not available for rendering.");
        return;
      }

      const ctx = chartCanvas.value.getContext("2d");

      // 차트 생성
      chartInstance.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ],
          datasets: [
            {
              label: `${mealKit.mealKitName} 월별 판매량`,
              data: mealKit.mealKitMonthlySalesVolume, // 선택된 밀키트의 월별 판매량
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Y축 최솟값 고정
              suggestedMax: maxSalesValue.value, // Y축 최댓값을 계산된 값으로 설정
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });
    };

    // 선택된 밀키트가 바뀔 때마다 차트 업데이트
    watch(selectedMealKit, (newMealKit) => {
      if (newMealKit) {
        renderChart(newMealKit);
      }
    });

    // 초기 차트 렌더링
    onMounted(() => {
      if (selectedMealKit.value) {
        renderChart(selectedMealKit.value);
      }
    });

    return {
      mealKits,
      selectedMealKitId,
      chartCanvas,
      maxSalesValue, // Y축 최댓값 계산된 값
    };
  },
};
</script>

<style scoped>
.meal-kit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 600px;
  height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
}

.meal-kit-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.meal-kit-select label {
  font-size: 16px;
  font-weight: bold;
}

.meal-kit-select select {
  padding: 5px 10px;
  font-size: 14px;
}

.meal-kit-chart {
  width: 100%;
  max-width: 600px;
}

canvas {
  max-width: 550px;
  width: 100%;
  height: auto;
}
</style>
