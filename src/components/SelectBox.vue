<template>
  <div class="store-select">
    <!-- Select Box -->
    <div
      class="dropdown"
      @click="toggleDropdown"
      @mouseover="hoverDropdown(true)"
      @mouseleave="hoverDropdown(false)"
    >
      <span class="selected-store">{{ selectedStore?.name || "홍대 선택" }}</span>
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

<script>
export default {
  name: "SelectBox",
  data() {
    return {
      // 더미 데이터
      stores: [
        { id: 1, name: "홍대 매장" },
        { id: 2, name: "강남역 매장" },
        { id: 3, name: "이태원 매장" },
        { id: 4, name: "신촌 매장" },
        { id: 5, name: "명동 매장" },
        { id: 6, name: "건대 매장" },
        { id: 7, name: "동대문 매장" },
        { id: 8, name: "삼청동 매장" },
        { id: 9, name: "한남동 매장" },
        { id: 10, name: "성수 매장" },
      ],
      selectedStore: null, // 선택된 매장 정보
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
  color: #FFD1A7;
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
  color: #FF5E23;
  cursor: pointer;
}

.dropdown-icon {
  font-size: 12px;
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
  color: #FFD1A7;
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
  background-color: #FFD1A7; /* 배경 색 변경 */
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
