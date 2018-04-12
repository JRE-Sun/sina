import store from '../../store/index';
import axios from 'axios'

class API {
    constructor() {
        this.api = store.state.api;
    }

    post() {
        console.log('get.............');
        self.$axios.get(self.api + 'News/new_list?type=0&page=10').then(function (res) {
            setTimeout(function () {
                self.setTimeLine({
                    index: 0,
                    data : res.data.data
                });
                self.isAjax = false;
            }, 400);
        });
    }

    get(url, callback = null) {
        if (typeof url == 'undefined') {
            console.log('url必填');
            return;
        }
        axios.get(this.api + url).then(function (res) {
            typeof callback == 'function' && callback(res);
        });
    }
}

export default new API();