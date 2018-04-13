<template>
    <div>
        <header-tpl></header-tpl>
        <tab style="position:fixed;top:46px;left:0;width:100%;" active-color='#fc378c' v-model="headerSelectIndex">
            <tab-item v-for="(item,index) in headerList" v-bind:key="index" @on-item-click="onItemClick">{{ item }}
            </tab-item>
        </tab>
        <div class="time-line-wrap">
            <time-line-joke v-if="type==8" :list-item="item" v-for="(item,index) in dataList[headerSelectIndex]"
                            v-bind:key="index"></time-line-joke>
            <time-line v-if="type!=8" :list-item="item" v-for="(item,index) in dataList[headerSelectIndex]"
                       v-bind:key="index"></time-line>
        </div>
        <load-more v-show="isLoadMore" tip="加载中..."></load-more>
        <loading :show="isAjax"></loading>
        <toast type="warn" :time="1000">加载失败,您可以尝试刷新一下页</toast>
        <toast v-model="isShowToast" type="warn" :time="2000" text="加载失败,请刷新页面!"></toast>
        <scroll-to-top :is-show-to-top="isShowToTop"></scroll-to-top>
    </div>
</template>

<script>
    import headerTpl from './header/header';
    import timeLine from './timeline/timeline';
    import timeLineJoke from './timeline/timelint-joke';
    import {mapState, mapMutations} from 'vuex';
    import {Tab, TabItem, Loading, AlertModule, LoadMore, Toast} from 'vux'
    import BottomLoad from '../assets/js/bottom-load'
    import LazyLoad from '../assets/js/lazyload'
    import API from '../assets/js/API'
    import scrollToTop from '../components/scrollToTop'

    export default {
        name      : 'home',
        data() {
            return {
                bottomLoadObject : '',
                lazyLoadObject   : '',
                page             : [],
                type             : 0,
                activePage       : 0,
                isLoadMore       : false,
                isAjax           : false,
                isShowToast      : false,
                isShowToTop      : false,
                headerSelectIndex: 0,
                headerList       :
                    ['头条', '军事', '娱乐', '体育', '科技', '艺术', '教育', '要闻', '段子'],
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
            Loading,
            AlertModule,
            timeLineJoke,
            LoadMore,
            Toast,
            scrollToTop,
        },
        methods   : {
            ...mapMutations([
                'setTimeLine',
                'setHeaderTitle',
                'setHomeScrollTop',
            ]),
            onItemClick: function (index) {
                let self                                 = this;
                self.type                                = index;
                let page                                 = self.getPageIndex(index) + 1;
                // 切换类目后,需要把body切换到之前浏览该类目的位置
                document.querySelector('body').scrollTop = self.homeScrollTop[this.type];
                // 只有首次切换类目,该类目才加载数据.
                if (page == 1) {
                    self.getDataFromAjax(self.getPageIndex(index) + 1, self.type);
                }
            },
            /**
             * 获取ajax数据
             * @param page
             * @param type
             */
            getDataFromAjax(page, type) {
                let self = this;
                if (self.isAjax || self.isLoadMore) {
                    return;
                }
                // 当前页面是否初始化过了
                let ajaxStatus   = page > 1 ? 'isLoadMore' : 'isAjax';
                self[ajaxStatus] = true;
                let url          = `News/new_list?type=${type}&page=${page * 5}`;
                if (type == 8) {
                    url = `/joke/index?page=${page}`;
                }
                console.log(page, type);
                self.isShowToast = false;
                API.get(url, (res) => {
                    setTimeout(function () {
                        if (res.data.data == null) {
                            self.isShowToast = true;
                            self[ajaxStatus] = false;
                            return;
                        }
                        self.setTimeLine({
                            index: type,
                            data : res.data.data
                        });
                        self.isShowToast = false;
                        self[ajaxStatus] = false;
                        self.page[type]  = page;
                        self.activePage  = page;
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
            this.lazyLoadObject.remove();
        },
        activated() {
            let self    = this;
            let options = {
                eleClientHeight: '.time-line-wrap',
                isScrolling({screenHeight, scrollTop} = {}) {
                    // 向下滚动超过一瓶,出现回到顶部按钮
                    self.isShowToTop = scrollTop > screenHeight ? true : false;
                    // 存储list的top
                    self.setHomeScrollTop({
                        index    : self.type,
                        scrollTop: scrollTop
                    });
                },
                callback() {
                    console.log('到达底部');
                    // 加载下一页数据
                    self.getDataFromAjax(self.getPageIndex() + 1, self.type);
                }
            };
            self.setHeaderTitle('首页');
            console.log('上次的位置', this.homeScrollTop[this.type]);
            self.bottomLoadObject = new BottomLoad(options);

            let timer = setInterval(() => {
                if (self.activePage < 1) {
                    return;
                }
                clearInterval(timer);
                self.lazyLoadObject = new LazyLoad({
                    eleClientHeight: '.time-line-wrap',
                    selector       : 'data-src'
                });
            }, 1);

            document.querySelector('body').scrollTop = this.homeScrollTop[this.type];
        }
    }
</script>

<style>
    .time-line-wrap {
        margin-top: 90px;
    }
</style>
