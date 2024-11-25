<template>
    <div class="appliance-list">
      <h1>가전 리스트</h1>
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
                <tr v-for="appliance in appliances" :key="appliance.id" class="row">
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
  export default {
    name: "HomeApplianceList",
    data() {
      return {
        appliances: [
          { id: 1, name: "냉장고", model: "RF1234", category: "주방", status: "정상" },
          { id: 2, name: "세탁기", model: "WM5678", category: "가전", status: "고장" },
          { id: 3, name: "전자레인지", model: "MW9101", category: "주방", status: "정상" },
          { id: 4, name: "청소기", model: "VC1122", category: "생활", status: "수리 중" },
          { id: 5, name: "TV", model: "TV3344", category: "가전", status: "정상" },
          { id: 6, name: "에어컨", model: "AC5566", category: "가전", status: "고장" },
          { id: 7, name: "히터", model: "HT7788", category: "가전", status: "정상" },
          { id: 8, name: "가습기", model: "HM9900", category: "생활", status: "고장" },
          { id: 9, name: "공기청정기", model: "AP1234", category: "생활", status: "정상" },
          { id: 10, name: "스피커", model: "SP5678", category: "가전", status: "정상" },
        ],
      };
    },
  };

</script>

<style scoped>
.appliance-list {
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
  cursor: pointer;
}

.row {
  transition: transform 0.2s ease-in-out;
}
</style>
  