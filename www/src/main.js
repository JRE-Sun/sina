// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入store
import store from './store/index'
import axios from 'axios'

Vue.prototype.$axios = axios
import style from './assets/css/style.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el        : '#app',
    router,
    store,
    components: {App},
    template  : '<App/>'
})
