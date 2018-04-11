<template>
    <div>
        <header-tpl></header-tpl>
        <tab active-color='#fc378c' v-model="headerSelectIndex.headerSelectIndex">
            <tab-item v-for="(item,index) in headerList" v-bind:key="index" @on-item-click="onItemClick">{{ item }}
            </tab-item>
        </tab>
        <router-link to="/list">
            <div>
                <p>llll</p>
            </div>
        </router-link>
        <swiper v-model="headerSelectIndex.headerSelectIndex" :show-dots="false" height="575px">
            <swiper-item class="swiper-demo-img" v-for="index in headerList.length" v-bind:key="index">
                <time-line v-for="(item,index) in dataList[headerSelectIndex]" v-bind:key="index"></time-line>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import headerTpl from './header/header';
    import timeLine from './timeline/timeline';
    import {mapState, mapMutations} from 'vuex';
    import {Swiper, SwiperItem, Tab, TabItem,} from 'vux'

    export default {
        name      : 'home',
        data() {
            return {
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
            TabItem
        },
        methods   : {
            ...mapMutations([
                'setTimeLine',
                'setHeaderSelectIndex'
            ]),
            onItemClick: function (index) {
                const self = this;
                self.setHeaderSelectIndex(index);
                this.$axios.get(this.api + 'News/new_list?type=' + index + '&page=10').then(function (res) {
                    setTimeout(function () {
                        self.setTimeLine({
                            index: index,
                            data : res.data.data
                        });
                    }, 400);
                }).catch(function () {

                });
            }
        },
        created   : function () {
            const self         = this;
            // 获取屏幕的高,设置下面swiper高度
            const screenHeight = window.innerHeight;
            // 获取顶部header和nav的高
            self.swiperHeight  = screenHeight - 46 - 44 - 2 + 'px';
            this.$axios.get(this.api + 'News/new_list?type=0&page=10').then(function (res) {
                self.setTimeLine({
                    index: 0,
                    data : res.data.data
                });
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
