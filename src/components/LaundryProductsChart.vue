<template>
  <div class="laundry-container">
    <!-- 세탁용품 선택 Select Box -->
    <div class="laundry-select">
      <label for="laundrySelect">세탁용품을 선택하세요:</label>
      <select id="laundrySelect" v-model="selectedLaundryId" @change="onLaundryChange">
        <option
          v-for="laundry in laundryProducts"
          :key="laundry.laundrySuppliesId"
          :value="laundry.laundrySuppliesId"
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
import { ref, onMounted, watch, computed } from "vue";
import { Chart } from "chart.js";
import { useLaundryStore } from "@/store/LaundryList.js"; // 상태 관리 스토어 import

export default {
  name: "LaundryProductChart",
  setup() {
    const laundryStore = useLaundryStore(); // Pinia 상태 관리 스토어 인스턴스
    const laundryProducts = computed(() => laundryStore.selectedLaundrySupplies); // 선택된 매장의 세탁용품 리스트

    const selectedLaundryId = ref(laundryProducts.value[0]?.laundrySuppliesId || null); // 기본 선택 세탁용품
    const selectedLaundry = computed(() =>
      laundryProducts.value.find(
        (product) => product.laundrySuppliesId === selectedLaundryId.value
      )
    );

    const chartInstance = ref(null); // Chart.js 인스턴스
    const chartCanvas = ref(null); // canvas 요소 참조

    // 세탁용품 변경 처리
    const onLaundryChange = () => {
      if (selectedLaundry.value) {
        renderChart(selectedLaundry.value); // 차트 업데이트
      }
    };

    // 차트 생성 및 업데이트
    const renderChart = (data) => {
      if (chartInstance.value) {
        chartInstance.value.destroy(); // 기존 차트 제거
        chartInstance.value = null;
      }

      if (!chartCanvas.value) {
        console.warn("Chart canvas is not available for rendering.");
        return;
      }

      const ctx = chartCanvas.value.getContext("2d");

      const maxSales = Math.max(...data.laundrySuppliesMonthlySalesVolume); // 월별 판매량 중 최대값
      const stepSize = Math.ceil(maxSales / 10) || 1; // 적절한 stepSize 계산

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
              label: `${data.laundrySuppliesName}별 월별 판매량`,
              data: data.laundrySuppliesMonthlySalesVolume,
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
              ticks: {
                stepSize,
              },
              min: 0,
              max: Math.ceil(maxSales / stepSize) * stepSize, // 최대값 설정
            },
          },
        },
      });
    };

    // Watch: 세탁용품이 바뀔 때 차트 렌더링
    watch(selectedLaundry, (newVal) => {
      if (newVal) renderChart(newVal);
    });

    // 초기 차트 렌더링
    onMounted(() => {
      if (laundryProducts.value.length > 0 && selectedLaundry.value) {
        renderChart(selectedLaundry.value);
      }
    });

    return {
      laundryProducts,
      selectedLaundryId,
      selectedLaundry,
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
  max-width: 550px;
  width: 100%;
  height: auto;
}
</style>
