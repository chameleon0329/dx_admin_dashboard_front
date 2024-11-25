<template>
    <div class="broken-appliance-list">
      <h1>고장난 가전 리스트</h1>
      <div class="appliance-list-table">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>모델명</th>
              <th>분류</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appliance in brokenAppliances" :key="appliance.id" class="row">
              <td>{{ appliance.name }}</td>
              <td>{{ appliance.model }}</td>
              <td>{{ appliance.category }}</td>
              <td>{{ appliance.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import HomeApplianceList from './HomeApplianceList.vue'; // 기존 가전 리스트 컴포넌트를 가져옴
  
  export default {
    name: "BrokenApplianceList",
    components: { HomeApplianceList },
    data() {
      return {
        // 기존 HomeApplianceList 데이터를 가져옴
        appliances: HomeApplianceList.data().appliances,
      };
    },
    computed: {
      brokenAppliances() {
        // '상태'가 '고장'인 항목만 필터링
        return this.appliances.filter(appliance => appliance.status === "고장");
      },
    },
  };
  </script>
  
  <style scoped>
  .broken-appliance-list {
    width: 600px;
    height: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 20px;
    overflow: hidden;
  }
  
  .appliance-list-table {
    max-height: 80%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  h1 {
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
    font-size: 16px;
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
  }
  </style>
  