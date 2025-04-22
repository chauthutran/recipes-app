import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './assets/main.css';
import router from './router'; // Make sure this path is correct

createApp(App).use(router).mount('#app');
