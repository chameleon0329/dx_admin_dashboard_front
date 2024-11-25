<template>
  <div class="meal-kit-container">
    <!-- 밀키트 선택 Select Box -->
    <div class="meal-kit-select">
      <label for="mealKitSelect">밀키트를 선택하세요:</label>
      <select id="mealKitSelect" v-model="selectedMealKitId" @change="onMealKitChange">
        <option
          v-for="mealKit in mealKitData"
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
import { ref, onMounted, watch } from "vue";
import { Chart } from "chart.js";
import { mealKitData } from "../assets/MealKitData";

export default {
  name: "MealKitChart",
  setup() {
    const mealKitDataRef = ref(mealKitData);
    const selectedMealKitId = ref(mealKitData[0]?.mealKitId || null); // 첫 번째 밀키트를 기본 선택
    const selectedMealKit = ref(mealKitData[0] || null);
    const chartInstance = ref(null);
    const chartCanvas = ref(null);

    // 밀키트 변경 시 처리
    const onMealKitChange = () => {
      selectedMealKit.value = mealKitDataRef.value.find(
        (mealKit) => mealKit.mealKitId === selectedMealKitId.value
      );
    };

    // 차트 생성 및 업데이트
    const renderChart = (data) => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
      const ctx = chartCanvas.value.getContext("2d");

      // 동적으로 범례 텍스트 설정
      const legendText = `${data.mealKitName}별 월별 판매량`;

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
              label: legendText,
              data: data["월별 판매량"],
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
              beginAtZero: true,
              min: 0, // 최소값
              max: 150, // 최대값 (데이터셋 기준)
              ticks: {
                stepSize: 10, // 스텝 크기
              },
            },
          },
        },
      });
    };

    // 선택된 밀키트가 바뀔 때마다 차트 렌더링
    watch(selectedMealKit, (newVal) => {
      if (newVal) renderChart(newVal);
    });

    // 초기 차트 렌더링 (첫 번째 밀키트)
    onMounted(() => {
      if (mealKitDataRef.value.length > 0) {
        selectedMealKit.value = mealKitDataRef.value[0];
        renderChart(selectedMealKit.value);
      }
    });

    return {
      mealKitData: mealKitDataRef,
      selectedMealKitId,
      selectedMealKit,
      onMealKitChange,
      chartCanvas,
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
  border-radius: 8px;
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
  max-width: 550px; /* 차트 너비를 500px로 설정 */
  width: 100%;
  height: auto;
}
</style>
