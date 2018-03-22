// 这个文件是vuex的主文件,引入了vuex所需要的配置
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 用来存放数据,或者状态
const state = {
    userName: false, // 用来存储判断视乎是否已经登陆
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});