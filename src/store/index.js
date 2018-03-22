// 这个文件是vuex的主文件,引入了vuex所需要的配置
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 用来存放数据,或者状态
const state = {
    level     : '第一周', //活动周数
    itemNum   : 0, // 第几题
    itemDetail: [
        {
            id   : 0,
            title: '1+1=?',
            item : ['1', '2', '3', '4']
        },
        {
            id   : 1,
            title: '1+2=?',
            item : ['1', '2', '3', '4']
        },
        {
            id   : 2,
            title: '1+3=?',
            item : ['1', '2', '3', '4']
        },
        {
            id   : 3,
            title: '1+4=?',
            item : ['1', '2', '3', '4']
        }
    ],
    answerid  : [], //答案id
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});