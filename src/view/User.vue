<template>
    <div class="container">
      <div class="main-content">
        <CustomerList />
        <div class="sub-content">
          <div class="top-row">
            <GenderChart />
            <AgeChart />
          </div>
          <div class="bottom-row">
            <GenderRank />
            <AgeRank />
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import AgeChart from '@/components/UserAgeChart.vue';
import AgeRank from '@/components/UserAgeRank.vue';
import CustomerList from '@/components/UserList.vue';
import GenderChart from '@/components/UserGenderChart.vue';
import GenderRank from '@/components/UserGenderRank.vue';

  export default {
    name: 'User',
    components: {
      CustomerList,
      GenderChart,
      AgeChart,
      GenderRank,
      AgeRank,
    }
  }
  </script>
  
  <style scoped>
  .main-content {
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
  }

  .sub-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .top-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .bottom-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  </style>
  