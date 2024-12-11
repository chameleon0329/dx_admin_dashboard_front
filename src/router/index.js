import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/view/MainView.vue';
import MealKit from '@/view/MealKitView.vue';
import LaundrySupplies from '@/view/LaundrySuppliesView.vue';
import User from '@/view/UserView.vue';
import HomeAppliance from '@/view/HomeApplianceView.vue';
import Order from '@/view/OrderView.vue'
import Test from '@/view/Test.vue';

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
  { path: '/test',
    name: 'Test',
    component: Test
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
