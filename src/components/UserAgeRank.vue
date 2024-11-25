<template>
    <div class="preference-table-wrapper">
      <h3>연령별 선호 밀키트</h3>
      <table>
        <thead>
          <tr>
            <th>연령</th>
            <th>선호 밀키트</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rank in 5" :key="rank" class="row">
            <td>{{ malePreference[rank - 1] }}</td>
            <td>{{ femalePreference[rank - 1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "AgeRank",
    data() {
      return {
        // 남성 선호 밀키트 리스트
        malePreference: [
          "10대",
          "20대",
          "30대",
          "40대",
          "50대",
        ],
        // 여성 선호 밀키트 리스트
        femalePreference: [
          "스테이크 밀키트",
          "된장찌개 밀키트",
          "스파게티 밀키트",
          "부대찌개 밀키트",
          "짜장면 밀키트",
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .preference-table-wrapper {
    width: 390px;
    height: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 20px;
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
  