import { createStore } from 'vuex';
import user from './modules/user';
import designer from './modules/designer';
import unsplash from './modules/unsplash';

const store = createStore({
  modules: {
    user: user,
    designer: designer,
    unsplash: unsplash,
  },
});

export default store;
