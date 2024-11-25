<template>
    <div class="container">
      <div class="main-content">
        <div class="top-row">
          <MonthlySalesChart />
          <MonthlySalesRank />
        </div>
        <div class="bottom-row">
          <MonthlyCustomerChart />
          <MainMonthlyLaundrySalesRank />
        </div>
      </div>
    </div>
  </template>
  
  <script>
import MonthlySalesRank from '@/components/MainMonthlyMealKitSalesRank.vue';
import MonthlySalesChart from '@/components/MainMonthlySalesChart.vue';
import MonthlyCustomerChart from '@/components/MainMonthlyCustomerChart.vue';
import MainMonthlyLaundrySalesRank from '@/components/MainMonthlyLaundrySalesRank.vue';


  export default {
    name: 'Main',
    components: {
      MonthlySalesChart,
      MonthlySalesRank,
      MonthlyCustomerChart,
      MainMonthlyLaundrySalesRank,
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-columns: auto auto;
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
  
  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  </style>
  