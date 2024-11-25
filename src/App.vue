<template>
  <div class="app">
    <Sidebar />
    <div class="main">
      <AppHeader></AppHeader>
      <div class="content">
        <router-view></router-view>
      </div>
      <AppFooter></AppFooter>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Sidebar,
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: row;
  background-color: #FFF7EF;
  border-radius: 10px;
}

.main {
  margin-left: 220px;
  height: 100%;
  background-color: #FFF7EF;
}
</style>