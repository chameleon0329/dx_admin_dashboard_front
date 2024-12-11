<template>
  <div class="container">
    <div class="main-content">
      <div class="top-row">
        <LaundryList />
        <LaundryProductsChart />
      </div>
      <div class="bottom-row">
        <LaundryYearlyRank />
        <LaundryMonthlyRank />
      </div>
    </div>
  </div>
</template>

<script>
import LaundryList from '@/components/LaundryList.vue';
import LaundryMonthlyRank from '@/components/LaundryMonthlyRank.vue';
import LaundryProductsChart from '@/components/LaundryProductsChart.vue';
import LaundryYearlyRank from '@/components/LaundryYearlyRank.vue';

export default {
  name: 'LaundrySupplies',
  components: {
    LaundryList,
    LaundryProductsChart,
    LaundryYearlyRank,
    LaundryMonthlyRank,
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
