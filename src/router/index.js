import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/view/Main.vue';
import MealKit from '@/view/MealKit.vue';
import LaundrySupplies from '@/view/LaundrySupplies.vue';
import User from '@/view/User.vue';
import HomeAppliance from '@/view/HomeAppliance.vue';
import Order from '@/view/Order.vue'

const routes = [
  { path: '/', 
    name: 'Main', 
    component: Main
  },
  { path: '/mealkit', 
    name: 'MealKit', 
    component: MealKit
  },
  { path: '/laundrySupplies', 
    name: 'LaundrySupplies', 
    component: LaundrySupplies
  },
  { path: '/user', 
    name: 'User', 
    component: User
  },
  { path: '/homeappliance', 
    name: 'HomeAppliance', 
    component: HomeAppliance
  },
  { path: '/order',
    name: 'Order',
    component: Order
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
