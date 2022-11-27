import {createStore} from 'vuex';
import user from "./modules/user";
import routes from "./modules/routes"
import product from "./modules/product";
import customers from "./modules/customers";
import createProduct from "./modules/create-product";
import productImages from './modules/product-images'
import orders from "./modules/orders";
import designer from './modules/designer'
import notifications from './modules/notifications'
import unsplash from "./modules/unsplash";
import media from "./modules/media";


const store = createStore({
    modules: {
        user: user,
        routes: routes,
        product: product,
        customers: customers,
        createProduct: createProduct,
        productImages: productImages,
        orders: orders,
        Designer: designer,
        notifications: notifications,
        unsplash: unsplash,
        media: media
    },
});

export default store;
