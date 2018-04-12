import Vue from 'vue'

export default {
    setTimeLine(state, data) {
        const index    = data.index;
        const dataList = data.data;
        if (typeof state.dataList[index] == 'undefined') {
            Vue.set(state.dataList, index, [])
        }
        for (const i in dataList) {
            state.dataList[index].push({
                src  : dataList[i].imgsrc,
                title: dataList[i].title,
                desc : dataList[i].digest,
                url  : dataList[i].postid,
            });
        }
    },
    setHeaderSelectIndex(state, data) {
        state.headerSelectIndex = data;
    },
    /**
     *
     * @param state
     * @param data
     */
    setHeaderTitle(state, data) {
        state.headerTitle = data;
    },
    setHomeScrollTop(state, data) {
        state.homeScrollTop = data;
    }
}