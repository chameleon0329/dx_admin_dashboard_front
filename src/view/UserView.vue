<template>
    <div class="container">
      <div class="main-content">
        <UserList />
        <div class="sub-content">
          <div class="top-row">
            <UserGenderChart />
            <UserAgeChart />
          </div>
          <div class="bottom-row">
            <UserGenderRank />
            <UserAgeRank />
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import UserAgeChart from '@/components/UserAgeChart.vue';
import UserAgeRank from '@/components/UserAgeRank.vue';
import UserList from '@/components/UserList.vue';
import UserGenderChart from '@/components/UserGenderChart.vue';
import UserGenderRank from '@/components/UserGenderRank.vue';

  export default {
    name: 'User',
    components: {
      UserList,
      UserGenderChart,
      UserAgeChart,
      UserGenderRank,
      UserAgeRank,
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
  