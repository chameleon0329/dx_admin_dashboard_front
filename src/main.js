import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // 라우터 임포트

const pinia = createPinia();
const app = createApp(App);

app.use(router); // Vue Router 사용
app.use(pinia);

app.mount('#app');
