<template>
    <div>
        <header-tpl></header-tpl>
        <tab style="position:fixed;top:46px;left:0;width:100%;" active-color='#fc378c' v-model="headerSelectIndex">
            <tab-item v-for="(item,index) in headerList" v-bind:key="index" @on-item-click="onItemClick">{{ item }}
            </tab-item>
        </tab>
        <loading :show="isAjax"></loading>
        <div class="time-line-wrap">
            <time-line :list-item="item" v-for="(item,index) in dataList[headerSelectIndex]"
                       v-bind:key="index"></time-line>
        </div>
    </div>
</template>

<script>
    import headerTpl from './header/header';
    import timeLine from './timeline/timeline';
    import {mapState, mapMutations} from 'vuex';
    import {Tab, TabItem, Loading} from 'vux'
    import BottomLoad from '../assets/js/bottom-load'
    import API from '../assets/js/API'

    export default {
        name      : 'home',
        data() {
            return {
                bottomLoadObject : '',
                page             : [],
                type             : 0,
                isAjax           : false,
                headerSelectIndex: 0,
                headerList       : ['头条', '军事', '娱乐', '体育', '科技', '艺术', '教育', '要闻'],
            }
        },
        computed  : {
            ...mapState({
                dataList     : state => state.dataList,
                api          : state => state.api,
                homeScrollTop: state => state.homeScrollTop,
            }),
        },
        components: {
            headerTpl,
            timeLine,
            Tab,
            TabItem,
            Loading
        },
        methods   : {
            ...mapMutations([
                'setTimeLine',
                'setHeaderTitle',
                'setHomeScrollTop',
            ]),
            onItemClick: function (index) {
                let self  = this;
                self.type = index;
                self.getDataFromAjax(self.getPageIndex(index) + 1, self.type);
            },
            /**
             * 获取ajax数据
             * @param page
             * @param type
             */
            getDataFromAjax(page, type) {
                let self = this;
                if (self.isAjax) {
                    return;
                }
                self.isAjax = true;
                console.log(page, type);
                API.get(`News/new_list?type=${type}&page=${page * 5}`, (res) => {
                    setTimeout(function () {
                        self.setTimeLine({
                            index: type,
                            data : res.data.data
                        });
                        self.isAjax     = false;
                        self.page[type] = page;
                    }, 400);
                });
            },
            getPageIndex(index = this.type) {
                if (typeof this.page[index] == 'undefined') {
                    this.page[index] = 0;
                }
                return this.page[index];
            },

        },
        created() {
            let self = this;
            self.setHeaderTitle('首页');
            this.getDataFromAjax(self.getPageIndex() + 1, self.type);
        },
        deactivated() {
            setTimeout(() => {
                document.querySelector('body').scrollTop = 0;
            }, 200);
            this.bottomLoadObject.remove();
        },
        activated() {
            let self    = this;
            let options = {
                eleClientHeight: '.time-line-wrap',
                isScrolling(e) {
                    // 存储list的top
                    self.setHomeScrollTop({
                        index    : self.type,
                        scrollTop: e.srcElement.scrollTop
                    });
                },
                callback() {
                    console.log('到达底部');
                    // 加载下一页数据
                    self.getDataFromAjax(self.getPageIndex() + 1, self.type);
                }
            };
            console.log('上次的位置', this.homeScrollTop[this.type]);
            self.bottomLoadObject                    = new BottomLoad(options);
            document.querySelector('body').scrollTop = this.homeScrollTop[this.type];
        }
    }
</script>

<style>
</style>
