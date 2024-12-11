  <template>
    <div class="cart">
      <h1>장바구니</h1>
      <button class="clear-button" @click="allClear">전체 삭제</button>
    
      <div class="carts">
        <div class="mealkit-cart">
          <h2>밀키트</h2>
          <div class="cart-list">
            <li v-for="item in mealKitCartItem" :key="item.id" class="cart-item">
              <div class="item-info">
                <span>{{ item.mealKitName }}</span>
                <div class="quantity-control">
                  <button @click="() => decreaseQuantity(item.id, true)">-</button>
                  <span>{{ mealKitQuantities[item.id] || 1 }}</span>
                  <button @click="() => increaseQuantity(item.id, true)">+</button>
                </div>
              </div>
              <div class="setting">
                <button class="delete-button" @click="() => outMealKitCart(item.id)">×</button>
                <span>{{ (item.mealKitPrice * (mealKitQuantities[item.id] || 1)).toLocaleString() }}원</span>
              </div>
            </li>
          </div>
        </div>
      
        <div class="laundry-cart">
          <h2>세탁용품</h2>
          <div class="cart-list">
            <li v-for="item in laundryCartItem" :key="item.id" class="cart-item">
              <div class="item-info">
                <span>{{ item.laundrySuppliesName }}</span>
                <div class="quantity-control">
                  <button @click="() => decreaseQuantity(item.id, false)">-</button>
                  <span>{{ laundryQuantities[item.id] || 1 }}</span>
                  <button @click="() => increaseQuantity(item.id, false)">+</button>
                </div>
              </div>
              <div class="setting">
                <button class="delete-button" @click="() => outLaundryCart(item.id)">×</button>
                <span>{{ (item.laundrySuppliesPrice * (laundryQuantities[item.id] || 1)).toLocaleString() }}원</span>
              </div>
            </li>
          </div>
        </div>
      </div>
    
      <div class="summary">
        <span style="padding: 0 20px 0 10px; font-size: 18px;">{{ totalPrice.toLocaleString() }}원</span>
        <button class="checkout-button" @click="checkout">
          구매하기
        </button>
      </div>
    </div>
  </template>
  
<script setup>
import { useCartStore as useMealKitStore } from "@/store/MealKit"; // MealKit 스토어
import { useCartStore as useLaundryStore } from "@/store/Laundry"; // Laundry 스토어
import { reactive, computed } from "vue";

// MealKit 스토어
const mealKitStore = useMealKitStore();
// Laundry 스토어
const laundryStore = useLaundryStore();

// MealKit과 Laundry 장바구니 수량 저장 (id: 수량 형태)
const mealKitQuantities = reactive({});
const laundryQuantities = reactive({});

// 전체 장바구니 비우기
const allClear = () => {
  mealKitStore.cartItem = [];
  laundryStore.cartItem = [];
  Object.keys(mealKitQuantities).forEach((key) => delete mealKitQuantities[key]);
  Object.keys(laundryQuantities).forEach((key) => delete laundryQuantities[key]);
};

// MealKit 장바구니 아이템
const mealKitCartItem = computed(() => {
  return mealKitStore.item.filter((v) => mealKitStore.cartItem.includes(v.id));
});

// Laundry 장바구니 아이템
const laundryCartItem = computed(() => {
  return laundryStore.item.filter((v) => laundryStore.cartItem.includes(v.id));
});

// MealKit 아이템 장바구니에서 제거
const outMealKitCart = (id) => {
  mealKitStore.cartItem = mealKitStore.cartItem.filter((v) => v !== id);
  delete mealKitQuantities[id];
};

// Laundry 아이템 장바구니에서 제거
const outLaundryCart = (id) => {
  laundryStore.cartItem = laundryStore.cartItem.filter((v) => v !== id);
  delete laundryQuantities[id];
};

// 수량 증가
const increaseQuantity = (id, isMealKit) => {
  if (isMealKit) {
    mealKitQuantities[id] = (mealKitQuantities[id] || 1) + 1;
  } else {
    laundryQuantities[id] = (laundryQuantities[id] || 1) + 1;
  }
};

// 수량 감소
const decreaseQuantity = (id, isMealKit) => {
  if (isMealKit) {
    if (mealKitQuantities[id] > 1) mealKitQuantities[id] -= 1;
  } else {
    if (laundryQuantities[id] > 1) laundryQuantities[id] -= 1;
  }
};

// 총 구매 금액 계산
const totalPrice = computed(() => {
  const mealKitPrice = mealKitCartItem.value.reduce(
    (prev, cur) => prev + cur.mealKitPrice * (mealKitQuantities[cur.id] || 1),
    0
  );
  const laundryPrice = laundryCartItem.value.reduce(
    (prev, cur) => prev + cur.laundrySuppliesPrice * (laundryQuantities[cur.id] || 1),
    0
  );
  return mealKitPrice + laundryPrice;
});

const checkout = () => {
  alert(`총 결제 금액: ${totalPrice.value.toLocaleString()}원을 결제하시겠습니까?`);
};
</script>


<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  width: 530px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
}

.carts {
  background-color: white;
  border-radius: 8px;
  margin: 20px 20px 0px 20px;
  border: 1px solid #ddd;
}
.mealkit-cart {
  background-color: white;
  /* border: 1px solid #ddd; */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  /* border-radius: 10px; */
  box-sizing: border-box;
  padding: 20px;
  margin: 20px;
  border-bottom: 1px solid #ddd;
}

.laundry-cart {
  background-color: white;
  /* border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  margin: 20px;
}

h1 {
  padding: 20px;
  margin: 0;
}

h2 {
  margin: 0 0 15px;
}

ul {
  list-style: none;
  padding: 0;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
}

.item-info {
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 10px;
  font-size: 14px;
}

.setting {
  display: flex;
  flex-direction: column;
  flex: 2;
  text-align: right;
  justify-content: right;
  font-size: 16 px;
  gap: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-control button {
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  cursor: pointer;
}

.quantity-control button:hover {
  background: #eee;
}

.delete-button {
  text-align: right;
  font-size: 20px;
  color: #898989;
  background: none;
  border: none;
  cursor: pointer;
}

.delete-button:hover {
  color: #FF5E23;
}

.summary {
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-top: 20px;
  font-size: 16px;
}

.checkout-button {
  width: 200px;
  padding: 10px 20px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin: 20px;
  margin-left: auto;
}

.checkout-button:hover {
  background: #333;
}

.clear-button {
  width: 100px;
  padding: 10px 20px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 20px;
  margin-left: auto;
  border: 1px solid #ddd;
}

.clear-button:hover {
  background: #eee;
}
</style>
