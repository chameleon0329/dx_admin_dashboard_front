<template>
  <div class="store-select">
    <!-- Select Box -->
    <div
      class="dropdown"
      @click="toggleDropdown"
      @mouseover="hoverDropdown(true)"
      @mouseleave="hoverDropdown(false)"
    >
      <span class="selected-store">{{ selectedStore?.name || "역삼점" }}</span>
      <div class="dropdown-icon">
        <!-- <span>▼</span> -->
      </div>
    </div>

    <!-- Dropdown List -->
    <transition name="fade">
      <ul v-if="isOpen" class="store-list">
        <li
          v-for="store in stores"
          :key="store.id"
          class="store-item"
          @click="selectStore(store)"
        >
          {{ store.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<!-- <script>
import { ref, computed } from "vue"; // ref를 import
import { useMealKitStore } from "@/store/MealKit.js";
import { useLaundryStore } from "@/store/LaundryList.js";

export default {
  name: "SelectBox",
  setup() {
    // Pinia 스토어
    const mealKitStore = useMealKitStore();
    const laundryStore = useLaundryStore();

    // 스토어에서 stores 데이터 가져오기
    const stores = computed(() =>
      mealKitStore.stores.map((store) => ({
        storeId: store.storeId,
        name: store.name,
      }))
    );

    // 현재 선택된 매장 이름
    const selectedStoreName = computed(() => {
      const selectedStore = mealKitStore.selectedStore;
      return selectedStore ? selectedStore.name : "매장 선택";
    });

    // 드롭다운 상태
    const isOpen = ref(false);

    // 드롭다운 토글
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    // 드롭다운 hover 상태
    const hoverDropdown = (hover) => {
      if (!isOpen.value) isOpen.value = hover;
    };

    // 매장 선택 처리
    const handleStoreSelection = (storeId, storeName) => {
      mealKitStore.selectStore(storeId); // MealKit 매장 변경
      laundryStore.selectStore(storeId); // Laundry 매장 변경
      isOpen.value = false; // 드롭다운 닫기
    };

    return {
      stores,
      selectedStoreName,
      isOpen,
      toggleDropdown,
      hoverDropdown,
      handleStoreSelection,
    };
  },
};
</script> -->
<script>
export default {
  name: "SelectBox",
  data() {
    return {
      // 더미 데이터
      stores: [
        { id: 1, name: "역삼점" },
      ],
      selectedStore: "역삼점", // 선택된 매장 정보
      isOpen: false, // 드롭다운 열림 여부
      isHovered: false, // 드롭다운 hover 상태
    };
  },
  methods: {
    // 드롭다운 열고 닫기
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    // hover 상태 변경
    hoverDropdown(hover) {
      this.isHovered = hover;
    },
    // 매장 선택
    selectStore(store) {
      this.selectedStore = store; // 선택된 매장 설정
      this.isOpen = false; // 드롭다운 닫기
    },
  },
};
</script>

<style scoped>
.store-select {
  width: 100%;
  border: none;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
}

.dropdown {
  color: white;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: center;
}

.dropdown:hover {
  transform: scale(1.1);
  background-color: #ededed;
  color: #ff5e23;
  cursor: pointer;
}

.store-list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  justify-content: center;
}

.store-item {
  color: #ffd1a7;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: center;
}

.store-item:hover {
  background-color: #ffd1a7;
  color: #ff4d4d;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
