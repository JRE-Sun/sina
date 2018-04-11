<template>
    <div>
        <header-tpl></header-tpl>
        <tab active-color='#fc378c' v-model="headerSelectIndex.headerSelectIndex">
            <tab-item v-for="(item,index) in headerList" v-bind:key="index" @on-item-click="onItemClick">{{ item }}
            </tab-item>
        </tab>
        <loading :show="isAjax"></loading>
        <swiper @on-index-change="swiperChange" v-model="headerSelectIndex.headerSelectIndex" :show-dots="false"
                height="575px">
            <swiper-item class="swiper-demo-img" v-for="(item,index) in headerList.length" v-bind:key="index">
                <time-line :list-item="item" v-for="(item,index) in dataList[index]" v-bind:key="index"></time-line>
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
                'setHeaderTitle'
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
            }
        },
        created() {
            let self          = this;
            self.setHeaderTitle('首页页');
            self.isAjax       = true;
            // 获取屏幕的高,设置下面swiper高度
            let screenHeight  = window.innerHeight;
            // 获取顶部header和nav的高
            self.swiperHeight = screenHeight - 46 - 44 - 2 + 'px';
            this.$axios.get(this.api + 'News/new_list?type=0&page=10').then(function (res) {
                setTimeout(function () {
                    self.setTimeLine({
                        index: 0,
                        data : res.data.data
                    });
                    self.isAjax = false;
                }, 400);
            }).catch(function () {
            });
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
