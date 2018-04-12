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

    export default {
        name      : 'home',
        data() {
            return {
                isAjax      : true,
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
                self.isAjax = true;
                this.$axios.get(this.api + 'News/new_list?type=' + index + '&page=10').then(function (res) {
                    setTimeout(function () {
                        self.setTimeLine({
                            index: index,
                            data : res.data.data
                        });
                        self.isAjax = false;
                    }, 400);
                }).catch(function () {

                });
            },
            swiperChange(index) {
                this.onItemClick(index);
            },
        },
        created() {
            let self = this;
            self.setHeaderTitle('首页');
            self.isAjax       = true;
            // 获取屏幕的高,设置下面swiper高度
            let screenHeight  = window.innerHeight;
            // 获取顶部header和nav的高
            self.swiperHeight = screenHeight - 46 - 44 - 2;
            this.$axios.get(this.api + 'News/new_list?type=0&page=10').then(function (res) {
                setTimeout(function () {
                    self.setTimeLine({
                        index: 0,
                        data : res.data.data
                    });
                    self.isAjax = false;
                }, 400);
            });
        },
        mounted() {
            let swiperItem = document.querySelectorAll('.vux-swiper');
            let self       = this;
            for (let i = 0; i < swiperItem.length; i++) {
                swiperItem[i].addEventListener('scroll', (e) => {
                    // 存储list的top
                    this.setHomeScrollTop(e.srcElement.scrollTop);
                    console.log(e.srcElement.scrollTop);
                    // swiper总长度 = 屏幕高 + 滚上去的高度
                    if (document.querySelector('.time-line-wrap').clientHeight - 200 <= this.swiperHeight + e.srcElement.scrollTop) {
                        if (self.isAjax) {
                            return;
                        }
                        // 加载下一页数据
                        self.isAjax = true;
                        this.$axios.get(this.api + 'News/new_list?type=0&page=10').then(function (res) {
                            setTimeout(function () {
                                self.setTimeLine({
                                    index: 0,
                                    data : res.data.data
                                });
                                self.isAjax = false;
                            }, 400);
                        });
                    }
                });
            }
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
