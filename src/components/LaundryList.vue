<template>
  <div class="laundry-table-wrapper">
    <h3>세탁용품 리스트</h3>
    <div class="laundry-table">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>
              <div class="filter">
                <select id="category-filter" v-model="filters.category" @change="filterLaundryProducts">
                  <option value="all">분류</option>
                  <option v-for="(category, index) in uniqueCategories" :key="index" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </th>
            <th>가격</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredLaundryProducts" :key="index" class="row">
            <td>{{ product.laundrySuppliesName }}</td>
            <td>{{ product.laundrySuppliesClassification }}</td>
            <td>{{ product.laundrySuppliesPrice.toLocaleString() }} 원</td>
            <td>{{ product.laundrySuppliesCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { laundryProducts } from "@/assets/laundryProducts.js";

export default {
  name: "LaundryProductTable",
  data() {
    return {
      laundryProducts: laundryProducts,
      filters: {
        category: "all"
      },
      filteredLaundryProducts: []
    };
  },
  computed: {
    uniqueCategories() {
      // '분류' 목록 (중복 제거)
      return [...new Set(this.laundryProducts.map((product) => product.laundrySuppliesClassification))];
    }
  },
  methods: {
    filterLaundryProducts() {
      const { category } = this.filters;
      if (category === "all") {
        this.filteredLaundryProducts = this.laundryProducts;
      } else {
        this.filteredLaundryProducts = this.laundryProducts.filter((product) => product.laundrySuppliesClassification === category);
      }
      console.log(this.filteredLaundryProducts); // 필터링된 결과 확인
    }
  },
  created() {
    this.filteredLaundryProducts = this.laundryProducts; // 초기값 설정
  }
};
</script>

<style scoped>
.laundry-table-wrapper {
  width: 600px;
  height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
  overflow: hidden;
}

.laundry-table {
  max-height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
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

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #FFF7EF;
}

thead th {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-align: left;
  border-bottom: 2px solid #eee;
  padding: 15px;
}

tbody td {
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
  cursor: pointer;
}

select {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-color: #FFF7EF;
  background-color: #FFF7EF;
  padding: 0;
}

option {
  background-color: white;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}
</style>
