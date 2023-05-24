import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuex from './store';

createApp(App) //
  .use(vuex) //
  .mount('#app');
