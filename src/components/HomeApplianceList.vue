<template>
  <div class="appliance-list">
    <h1>가전 리스트</h1>
    <div class="appliance-list-table">
      <table>
        <thead>
          <tr>
            <th style="width: 260px;">이름</th>
            <th>모델명</th>
            <th>분류</th>
            <!-- <th>상태</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="appliance in appliances"
            :key="appliance.id"
            class="row"
          >
            <td>{{ appliance.name }}</td>
            <td>{{ appliance.model }}</td>
            <td>{{ appliance.category }}</td>
            <!-- <td>{{ appliance.status }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="isLoading" class="loading-text">데이터를 로드 중입니다...</p>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useHomeApplianceStore } from "@/store/HomeAppliance";

export default {
  name: "HomeApplianceList",
  setup() {
    const storeId = 1; // 예제 매장 ID
    const homeApplianceStore = useHomeApplianceStore();

    // 상태 가져오기
    const appliances = computed(() => homeApplianceStore.appliances);
    const isLoading = computed(() => homeApplianceStore.isLoading);
    const error = computed(() => homeApplianceStore.error);

    // 데이터 로드
    onMounted(async () => {
      await homeApplianceStore.fetchAppliances(storeId);
    });

    return {
      appliances,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.appliance-list {
  width: 600px;
  height: 680px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 20px;
  overflow: hidden;
}

.appliance-list-table {
  max-height: 85%;
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

.loading-text,
.error-text {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}

.error-text {
  color: red;
}
</style>
