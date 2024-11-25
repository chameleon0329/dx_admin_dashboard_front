<template>
  <div class="container">
    <div class="main-content">
      <div class="top-row">
          <MealKitList /> 
          <MealKitChart />
      </div>
      <div class="bottom-row">
          <YearlyMealKitRank />
          <MonthlyMealKitRank />
      </div>
    </div>
  </div>
</template>

<script>

import MealKitChart from '@/components/MealKitChart.vue';
import MealKitList from '@/components/MealKitList.vue';
import MonthlyMealKitRank from '@/components/MealKitMonthlyRank.vue';
import YearlyMealKitRank from '@/components/MealKitYearlyRank.vue';

export default {
    name: 'MealKit',
    components: {
      MealKitList,
      MealKitChart,
      MonthlyMealKitRank,
      YearlyMealKitRank,
  },
};
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
  
  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    border: 1px dashed #ccc;
    border-radius: 10px;
  }
</style>
