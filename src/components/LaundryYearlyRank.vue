<template>
  <div class="yearly-rank-wrapper">
    <div class="header">
      <h3>{{ selectedYear }}년 판매량 순위</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>순위</th>
          <th>이름</th>
          <th>총 판매량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kit, index) in rankedlaundryProducts" :key="index" class="row">
          <td>{{ index + 1 }}</td>
          <td>{{ kit.name }}</td>
          <td>{{ kit.totalSales.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { laundryProducts } from '../assets/laundryProducts.js';  // 데이터 불러오기

export default {
  name: "YearlyLaundryRank",
  data() {
    return {
      selectedYear: new Date().getFullYear(),  // 현재 연도로 초기화
    };
  },
  computed: {
    rankedlaundryProducts() {
      // 밀키트 데이터에서 총 판매량 계산 및 상위 5개만 반환
      return laundryProducts
        .map(kit => ({
          name: kit.laundrySuppliesName,
          totalSales: kit["월별 판매량"].reduce((sum, sale) => sum + sale, 0),
        }))
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 5);
    },
  },
};
</script>

<style scoped>
.yearly-rank-wrapper {
  width: 600px;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  border-radius: 8px;
  background-color: #FFD1A7;
  padding: 20px;
  margin-top: 0px;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  
  th {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    text-align: center;
    border-bottom: 2px solid #eee;
    padding: 10px;
  }
  
  td {
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding: 15px;
  }
  
  .row:hover {
  transform: scale(1.02);
  }

  .row {
  transition: transform 0.2s ease-in-out;
  cursor: default;
  }
</style>
