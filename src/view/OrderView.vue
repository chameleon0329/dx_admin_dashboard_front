<template>
    <div class="container">
      <div class="main-content">
        <div class="left-column">
          <OrderMealKitList />
          <OrderLaundryList />
        </div>
        <div class="right-column">
          <OrderProdct />
        </div>
      </div>
    </div>
</template>
  
<script>
import OrderMealKitList from '@/components/OrderMealKitList.vue';
import OrderLaundryList from '@/components/OrderLaundryList.vue';
import OrderProdct from '@/components/OrderProdct.vue';

export default {
  name: 'Order',
  components: {
    OrderMealKitList,
    OrderLaundryList,
    OrderProdct,
  }
}
</script>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-columns: auto auto;
  }
  
  .main-content {
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
  }
  
  .left-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  