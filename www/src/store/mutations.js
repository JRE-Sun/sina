export default {
    setTimeLine(state, data) {
        const index    = data.index;
        const dataList = data.data;
        if (typeof state.dataList[index] == 'undefined') {
            state.dataList[index] = [];
        }
        for (const i in dataList) {
            state.dataList[index].push({
                src  : dataList[i].imgsrc,
                title: dataList[i].title,
                desc : dataList[i].digest,
                url  : state.api + 'News/new_detail?' + dataList[i].postid,
            });
        }
    },
    setHeaderSelectIndex(state, data) {
        state.headerSelectIndex = data;
    },

}