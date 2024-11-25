<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js"; // 수정된 import
import { mealKitData } from "../assets/MealKitData.js";
import { laundryProducts } from "../assets/laundryProducts.js";

Chart.register(...registerables); // Chart.js 플러그인과 차트 타입 등록

export default {
  name: "MonthlySalesChart",
  setup() {
    const chartRef = ref(null);
    const monthlyTotalSales = ref([]);

    const calculateMonthlySales = () => {
      const monthlyMealKitSales = Array(12).fill(0);
      const monthlyLaundrySales = Array(12).fill(0);

      // 밀키트 월별 총매출액 합산
      mealKitData.forEach((item) => {
        item["월별 총매출액"].forEach((value, month) => {
          monthlyMealKitSales[month] += value;
        });
      });

      // 세탁용품 월별 총매출액 합산
      laundryProducts.forEach((item) => {
        item["월별 총매출액"].forEach((value, month) => {
          monthlyLaundrySales[month] += value;
        });
      });

      // 전체 매출액 합산
      return monthlyMealKitSales.map(
        (mealKit, month) => mealKit + monthlyLaundrySales[month]
      );
    };

    const renderChart = () => {
      const ctx = chartRef.value.getContext("2d");
      new Chart(ctx, {
        type: "bar", // 차트 타입 설정
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
              label: "월별 총 매출액 (단위: 원)",
              data: monthlyTotalSales.value,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    };

    onMounted(() => {
      monthlyTotalSales.value = calculateMonthlySales();
      renderChart();
    });

    return {
      chartRef,
    };
  },
};
</script>

<template>
  <div class="chart-container">
    <h2>2024년 월별 총 매출액</h2>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 600px;
  height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
}

h2 {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  border-radius: 8px;
  background-color: #FFD1A7;
  padding: 20px;
  margin-top: 0px;
}

canvas {
  max-width: 100%;
}
</style>
