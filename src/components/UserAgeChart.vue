<template>
    <div class="charts-container">
      <h3>연령별 방문 고객 수</h3>
      <div class="chart-wrapper">
        <canvas id="agePolarChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    data() {
      return {
        customers: [
          { name: "김철수", gender: "남성", age: 25, subscription: "구독" },
          { name: "이영희", gender: "여성", age: 30, subscription: "비구독" },
          { name: "박지훈", gender: "남성", age: 40, subscription: "구독" },
          { name: "최미라", gender: "여성", age: 18, subscription: "구독" },
          { name: "정성훈", gender: "남성", age: 29, subscription: "비구독" },
          { name: "김하나", gender: "여성", age: 22, subscription: "비구독" },
          { name: "이준혁", gender: "남성", age: 34, subscription: "구독" },
          { name: "문수진", gender: "여성", age: 29, subscription: "구독" },
          { name: "강민수", gender: "남성", age: 33, subscription: "비구독" },
          { name: "오지영", gender: "여성", age: 19, subscription: "비구독" },
          { name: "박상훈", gender: "남성", age: 32, subscription: "구독" },
          { name: "이수진", gender: "여성", age: 28, subscription: "비구독" },
          { name: "김진우", gender: "남성", age: 17, subscription: "구독" },
          { name: "양지은", gender: "여성", age: 42, subscription: "구독" },
          { name: "장민호", gender: "남성", age: 27, subscription: "비구독" },
          { name: "송혜진", gender: "여성", age: 24, subscription: "구독" },
          { name: "강민지", gender: "여성", age: 18, subscription: "비구독" },
          { name: "김석규", gender: "남성", age: 50, subscription: "구독" },
          { name: "한지우", gender: "여성", age: 22, subscription: "비구독" },
          { name: "이대훈", gender: "남성", age: 26, subscription: "구독" }
        ],
      };
    },
    mounted() {
      this.renderCharts();
    },
    methods: {
      renderCharts() {
        // 연령대별 고객 수 분석
        const ageGroupCounts = this.getAgeGroupCounts();
  
        // Polar Area Chart (연령대별 고객 수)
        const ctxPolar = document.getElementById('agePolarChart').getContext('2d');
        new Chart(ctxPolar, {
          type: 'pie',
          data: {
            labels: ['10-19세', '20-29세', '30-39세', '40-49세', '50세 이상'],
            datasets: [{
                data: [
                ageGroupCounts["10-19"], 
                ageGroupCounts["20-29"], 
                ageGroupCounts["30-39"], 
                ageGroupCounts["40-49"], 
                ageGroupCounts["50+"]
                ],
                backgroundColor: [
                "rgba(244, 162, 97, 0.8)", // 부드러운 주황색
                "rgba(231, 111, 81, 0.8)",  // 밝은 빨강
                "rgba(233, 196, 106, 0.8)",// 밝은 황토색
                "rgba(42, 157, 143, 0.8)", // 청록
                "rgba(38, 70, 83, 0.8)",   // 어두운 청록
                ],
                borderColor: [
                "rgba(244, 162, 97, 1)", // 부드러운 주황색
                "rgba(231, 111, 81, 1)",  // 밝은 빨강
                "rgba(233, 196, 106, 1)",// 밝은 황토색
                "rgba(42, 157, 143, 1)", // 청록
                "rgba(38, 70, 83, 1)",   // 어두운 청록
                ],
                borderWidth: 0,
                borderAlign: "inner",
                borderColor: '#FFFFFF',
                hoverBackgroundColor: [
                "rgba(244, 162, 97, 1)", // 부드러운 주황색
                "rgba(231, 111, 81, 1)",  // 밝은 빨강
                "rgba(233, 196, 106, 1)",// 밝은 황토색
                "rgba(42, 157, 143, 1)", // 청록
                "rgba(38, 70, 83, 1)",   // 어두운 청록
                ],
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',  // 범례를 오른쪽에 위치시킴
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
            layout: {
                padding: {
                }
            }
          },
        });
      },
      getAgeGroupCounts() {
        const counts = {
          "10-19": 0,
          "20-29": 0,
          "30-39": 0,
          "40-49": 0,
          "50+": 0,
        };
  
        this.customers.forEach(customer => {
          if (customer.age >= 10 && customer.age <= 19) {
            counts["10-19"]++;
          } else if (customer.age >= 20 && customer.age <= 29) {
            counts["20-29"]++;
          } else if (customer.age >= 30 && customer.age <= 39) {
            counts["30-39"]++;
          } else if (customer.age >= 40 && customer.age <= 49) {
            counts["40-49"]++;
          } else if (customer.age >= 50) {
            counts["50+"]++;
          }
        });
  
        return counts;
      },
    },
  };
  </script>
  

<style>
.charts-container {
  width: 390px;
  height: 300px;
  font-family: Arial, sans-serif;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
}

.chart-wrapper {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
}

canvas {
    max-width: 250px;
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