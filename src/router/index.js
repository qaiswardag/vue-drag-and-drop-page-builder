import Home from '../views/home/Home.vue';
import Designer from '../views/designer/Designer.vue';
import Preview from '../views/designer/Preview.vue';

import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/designer',
      name: 'Designer',
      component: Designer,
    },
    {
      path: '/designer/preview',
      name: 'Preview',
      component: Preview,
    },
  ],
});
