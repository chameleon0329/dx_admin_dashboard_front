<template>
    <div class="container">
      <div class="main-content">
        <HomeApplianceList />
        <HomeApplianceBrokenList />
      </div>
    </div>
  </template>
  
  <script>
import HomeApplianceBrokenList from '@/components/HomeApplianceBrokenList.vue';
import HomeApplianceList from '@/components/HomeApplianceList.vue';

  export default {
    name: 'HomeAppliance',
    components: {
      HomeApplianceList,
      HomeApplianceBrokenList,
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
    flex-direction: row;
    padding: 20px;
    gap: 20px;
  }
  </style>
  