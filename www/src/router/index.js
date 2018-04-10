import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import home from '../views/home'
import detail from '../views/detail'
import list from '../views/list'
Vue.use(Router)
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
                    component: home,
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
