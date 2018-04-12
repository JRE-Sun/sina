import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import home from '../views/home'
import detail from '../views/detail'
import list from '../views/list'

Vue.use(Router)
// 这个是监听应用里面跳转
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
export default new Router({
    routes: [
        {
            path     : '/',
            component: App,
            children : [
                {
                    path     : '/',
                    component: (resolve) => require(['../views/home'], resolve),
                    meta     : {
                        keepAlive: true // 需要被缓存
                    }
                },
                {
                    path     : '/detail',
                    name     : 'detail',
                    component: detail,
                },
                {
                    path     : '/list',
                    name     : 'list',
                    component: list,
                }
            ]
        }
    ]
})
