import Vue from 'vue'
// 在引入路由之前,当然是安装路由
// npm install vue-router
// 引入路由
import VueRouter from 'vue-router'
// 引入写好的路由配置
import routes from './router/router'
// 明确使用路由
Vue.use(VueRouter)
// 引入store
import store from './store/index'

// 创建路由实例
const router = new VueRouter({
    routes
});

router.beforeEach(function (to, from, next) {
    // 当传过来的是login页面=>requiresAuth为false或假
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.userName) {
            console.log('aa');
            next({
                path: '/login',
            });
            return;
        }
        next();
    }
    next();
});

import rem from './assets/lib/rem'

import axios from 'axios'

Vue.prototype.$axios = axios;

// 注入路由,绑定在#app上
new Vue({
    router,
    store
}).$mount('#app')