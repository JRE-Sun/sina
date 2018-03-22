// 路由的详细配置文件
import App from '../App'

// 引入首页组件
import home from '../page/index'
import login from '../tpl/login'
// 这里是嵌套路由
export default [{
    path     : '/',
    component: App,
    children : [{
        path     : '',
        meta     : {requiresAuth: true},
        component: home,
    },{
        path     : '/login',
        component: login,
    }],
}];