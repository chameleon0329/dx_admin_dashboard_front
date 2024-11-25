<template>
  <div class="laundry-container">
    <!-- 세탁용품 선택 Select Box -->
    <div class="laundry-select">
      <label for="laundrySelect">세탁용품을 선택하세요:</label>
      <select id="laundrySelect" v-model="selectedLaundryId" @change="onLaundryChange">
        <option
          v-for="laundry in laundryProducts"
          :key="laundry.laundryId"
          :value="laundry.laundryId"
        >
          {{ laundry.laundrySuppliesName }}
        </option>
      </select>
    </div>

    <!-- 차트 -->
    <div class="laundry-chart">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Chart } from "chart.js";
import { laundryProducts } from "../assets/laundryProducts"; // 데이터셋 가져오기

export default {
  name: "LaundryProductsChart",
  setup() {
    const laundryProductsRef = ref(laundryProducts);
    const selectedLaundryId = ref(laundryProducts[0]?.laundryId || null); // 첫 번째 세탁용품을 기본 선택
    const selectedLaundry = ref(laundryProducts[0] || null);
    const chartInstance = ref(null);
    const chartCanvas = ref(null);

    // 세탁용품 변경 시 처리
    const onLaundryChange = () => {
      selectedLaundry.value = laundryProductsRef.value.find(
        (laundry) => laundry.laundryId === selectedLaundryId.value
      );
    };

    // 차트 생성 및 업데이트
    const renderChart = (data) => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
      const ctx = chartCanvas.value.getContext("2d");

      // 동적으로 범례 텍스트 설정
      const legendText = `${data.laundrySuppliesName}별 월별 판매량`;

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
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
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
              max: 500, // 최대값 (데이터셋에 따라 조정 가능)
              ticks: {
                stepSize: 50, // 스텝 크기
              },
            },
          },
        },
      });
    };

    // 선택된 세탁용품이 바뀔 때마다 차트 렌더링
    watch(selectedLaundry, (newVal) => {
      if (newVal) renderChart(newVal);
    });

    // 초기 차트 렌더링 (첫 번째 세탁용품)
    onMounted(() => {
      if (laundryProductsRef.value.length > 0) {
        selectedLaundry.value = laundryProductsRef.value[0];
        renderChart(selectedLaundry.value);
      }
    });

    return {
      laundryProducts: laundryProductsRef,
      selectedLaundryId,
      selectedLaundry,
      onLaundryChange,
      chartCanvas,
    };
  },
};
</script>

<style scoped>
.laundry-container {
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

.laundry-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
}

.laundry-select label {
  font-size: 16px;
  font-weight: bold;
}

.laundry-select select {
  padding: 5px 10px;
  font-size: 14px;
}

.laundry-chart {
  width: 100%;
  max-width: 600px;
}

canvas {
  max-width: 550px; /* 차트 너비를 설정 */
  width: 100%;
  height: auto;
}
</style>
