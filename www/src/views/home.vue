<template>
    <div>
        <header-tpl></header-tpl>
        <tab active-color='#fc378c' v-model="headerSelectIndex.headerSelectIndex">
            <tab-item v-for="(item,index) in headerList" v-bind:key="index" @on-item-click="onItemClick">{{ item }}
            </tab-item>
        </tab>
        <loading :show="isAjax"></loading>
        <swiper @on-index-change="swiperChange" v-model="headerSelectIndex.headerSelectIndex" :show-dots="false"
                :height="swiperHeight+'px'">
            <swiper-item class="swiper-demo-img" v-for="(item,index) in headerList.length" v-bind:key="index">
                <div class="time-line-wrap">
                    <time-line :list-item="item" v-for="(item,index) in dataList[index]" v-bind:key="index"></time-line>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import headerTpl from './header/header';
    import timeLine from './timeline/timeline';
    import {mapState, mapMutations} from 'vuex';
    import {Swiper, SwiperItem, Tab, TabItem, Loading} from 'vux'
    import BottomLoad from '../assets/js/bottom-load'
    import API from '../assets/js/API'

    export default {
        name      : 'home',
        data() {
            return {
                page        : [],
                type        : 0,
                isAjax      : false,
                swiperHeight: 0,
                headerList  : ['头条', '军事', '娱乐', '体育', '科技', '艺术', '教育', '要闻'],
            }
        },
        computed  : {
            ...mapState({
                dataList         : state => state.dataList,
                api              : state => state.api,
                headerSelectIndex: state => state,
                homeScrollTop    : state => state.homeScrollTop,
            }),
        },
        components: {
            headerTpl,
            timeLine,
            Swiper,
            SwiperItem,
            Tab,
            TabItem,
            Loading
        },
        methods   : {
            ...mapMutations([
                'setTimeLine',
                'setHeaderSelectIndex',
                'setHeaderTitle',
                'setHomeScrollTop',
            ]),
            onItemClick: function (index) {
                let self = this;
                self.setHeaderSelectIndex(index);
                self.type = index;
                self.getDataFromAjax(self.getPageIndex(index) + 1, self.type);
            },
            swiperChange(index) {
                this.onItemClick(index);
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
            }
        },
        created() {
            let self = this;
            self.setHeaderTitle('首页');
            // 获取屏幕的高,设置下面swiper高度
            let screenHeight  = window.innerHeight;
            // 获取顶部header和nav的高
            self.swiperHeight = screenHeight - 46 - 44 - 2;
            this.getDataFromAjax(self.getPageIndex() + 1, self.type);
        },
        mounted() {
            document.querySelector('.vux-swiper').addEventListener('scroll', (e) => {
                // 存储list的top
                this.setHomeScrollTop(e.srcElement.scrollTop);
            });
            let self    = this;
            let options = {
                ele            : '.vux-swiper',
                eleClientHeight: '.time-line-wrap',
                screenHeight   : self.swiperHeight,
                callback() {
                    console.log('到达底部');
                    // 加载下一页数据
                    self.getDataFromAjax(self.getPageIndex() + 1, self.type);
                }
            };
            new BottomLoad(options);
        },
        activated() {
            document.querySelector('.vux-swiper').scrollTop = this.homeScrollTop;
        }
    }
</script>

<style>
    .vux-tab-warp {
        margin-top: 46px;
    }

    .vux-swiper {
        overflow-y: scroll !important;
    }
</style>
