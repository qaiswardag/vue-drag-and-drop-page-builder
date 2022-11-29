import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import vuex from './store';

createApp(App) //
  .use(router) //
  .use(vuex) //
  .mount('#app');
