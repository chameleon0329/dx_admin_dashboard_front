<template>
  <div class="customer-table-wrapper">
    <h3>매장 방문 고객 리스트</h3>
    <div class="customer-table">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>
              <div class="filter">
                <!-- <label for="gender-filter">성별</label> -->
                <select id="gender-filter" v-model="filters.gender" @change="filterCustomers">
                  <option value="all">성별</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </div>
            </th>
            <th>나이</th>
            <th>
              <div class="filter">
                <select id="subscription-filter" v-model="filters.subscription" @change="filterCustomers">
                  <option value="all">구독 여부</option>
                  <option value="구독">구독</option>
                  <option value="미구독">미구독</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in filteredCustomers" :key="index" class="row">
            <td>{{ customer.name }}</td>
            <td>{{ customer.gender }}</td>
            <td>{{ customer.age }}</td>
            <td>{{ customer.subscription }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerTable",
  data() {
    return {
      customers: [
        { name: "김철수", gender: "남성", age: 25, subscription: "구독" },
        { name: "이영희", gender: "여성", age: 30, subscription: "미구독" },
        { name: "박지훈", gender: "남성", age: 40, subscription: "구독" },
        { name: "최미라", gender: "여성", age: 35, subscription: "구독" },
        { name: "정성훈", gender: "남성", age: 29, subscription: "미구독" },
        { name: "김하나", gender: "여성", age: 22, subscription: "미구독" },
        { name: "이준혁", gender: "남성", age: 34, subscription: "구독" },
        { name: "문수진", gender: "여성", age: 27, subscription: "구독" },
        { name: "강민수", gender: "남성", age: 45, subscription: "미구독" },
        { name: "오지영", gender: "여성", age: 19, subscription: "미구독" },
        { name: "박상훈", gender: "남성", age: 32, subscription: "구독" },
        { name: "이수진", gender: "여성", age: 28, subscription: "미구독" },
        { name: "김진우", gender: "남성", age: 38, subscription: "구독" },
        { name: "양지은", gender: "여성", age: 42, subscription: "구독" },
        { name: "장민호", gender: "남성", age: 27, subscription: "미구독" },
        { name: "송혜진", gender: "여성", age: 24, subscription: "구독" },
        { name: "강민지", gender: "여성", age: 33, subscription: "미구독" },
        { name: "김석규", gender: "남성", age: 50, subscription: "구독" },
        { name: "한지우", gender: "여성", age: 22, subscription: "미구독" },
        { name: "이대훈", gender: "남성", age: 26, subscription: "구독" }
      ],
      filters: {
        gender: "all",
        subscription: "all",
      },
      filteredCustomers: [],
    };
  },
  methods: {
    filterCustomers() {
      const { gender, subscription } = this.filters;
      this.filteredCustomers = this.customers.filter((customer) => {
        return (
          (gender === "all" || customer.gender === gender) &&
          (subscription === "all" || customer.subscription === subscription)
        );
      });
    },
  },
  created() {
    this.filteredCustomers = this.customers; // 초기값
  },
};
</script>

<style scoped>
.customer-table-wrapper {
  width: 400px;
  height: 710px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
  overflow: hidden;
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
}
.customer-table {
  max-height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
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
  cursor: default;
}
</style>
