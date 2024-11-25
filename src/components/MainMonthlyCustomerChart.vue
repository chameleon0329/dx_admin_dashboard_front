<template>
    <div class="chart-container">
      <h2>월별 매장 방문 고객 수</h2>
      <canvas id="customerChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    name: "MonthlyCustomerChart",
    data() {
      return {
        customerData: [500, 800, 750, 900, 1200, 1100, 1500, 1400, 1300, 1250, 1000, 950],
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById("customerChart").getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            datasets: [
              {
                label: "월별 매장 방문 고객 수 (단위: 명)",
                data: this.customerData,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 0.5)",
                borderWidth: 4,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  stepSize: 200
                }
              }
            },
          },
        });
      },
    },
  };
  </script>
  
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
  