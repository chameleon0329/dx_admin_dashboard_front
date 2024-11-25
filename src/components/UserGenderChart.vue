<template>
    <div class="charts-container">
      <h3>성별 방문 고객 수</h3>
      <div class="chart-wrapper">
        <canvas id="genderDoughnutChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
import { Chart } from 'chart.js';

export default {
    name: "GenderChart",
  data() {
    return {
      customers: [
        { name: "김철수", gender: "남성", age: 25, subscription: "구독" },
        { name: "이영희", gender: "여성", age: 30, subscription: "비구독" },
        { name: "박지훈", gender: "남성", age: 40, subscription: "구독" },
        { name: "최미라", gender: "여성", age: 35, subscription: "구독" },
        { name: "정성훈", gender: "남성", age: 29, subscription: "비구독" },
        { name: "김하나", gender: "여성", age: 22, subscription: "비구독" },
        { name: "이준혁", gender: "남성", age: 34, subscription: "구독" },
        { name: "문수진", gender: "여성", age: 27, subscription: "구독" },
        { name: "강민수", gender: "남성", age: 45, subscription: "비구독" },
        { name: "오지영", gender: "여성", age: 19, subscription: "비구독" },
        { name: "박상훈", gender: "남성", age: 32, subscription: "구독" },
        { name: "이수진", gender: "여성", age: 28, subscription: "비구독" },
        { name: "김진우", gender: "남성", age: 38, subscription: "구독" },
        { name: "양지은", gender: "여성", age: 42, subscription: "구독" },
        { name: "장민호", gender: "남성", age: 27, subscription: "비구독" },
        { name: "송혜진", gender: "여성", age: 24, subscription: "구독" },
        { name: "강민지", gender: "남성", age: 33, subscription: "비구독" },
        { name: "김석규", gender: "남성", age: 50, subscription: "구독" },
        { name: "한지우", gender: "남성", age: 22, subscription: "비구독" },
        { name: "이대훈", gender: "남성", age: 26, subscription: "구독" }
      ],
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      // 성별 데이터 분석
      const genderCounts = this.getGenderCounts();

      // Doughnut Chart (성별 분포)
      const ctxDoughnut = document.getElementById('genderDoughnutChart').getContext('2d');
      new Chart(ctxDoughnut, {
        type: 'pie',
        data: {
          labels: ['남성', '여성'],
          datasets: [{
            data: [genderCounts.male, genderCounts.female],
            backgroundColor: ['#36A2EB', '#FF6384'],
            borderWidth: 0,
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,  // 범례 박스의 너비
                  padding: 15,   // 범례 항목 간의 간격
                  font: {
                    size: 12,   // 폰트 크기
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
          layout :{
            padding: {
                left: 10,
            }
          }
        },
      });
    },
    getGenderCounts() {
      const counts = { male: 0, female: 0 };

      this.customers.forEach(customer => {
        if (customer.gender === '남성') {
          counts.male++;
        } else if (customer.gender === '여성') {
          counts.female++;
        }
      });

      return counts;
    },
  },
};
</script>

<style scoped>
.charts-container {
  width: 400px;
  height: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
}

.chart-wrapper {
    height: 210px;
    display: flex;
    align-items: center;
    justify-content: center;
}

canvas {
  max-width: 220px;
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
