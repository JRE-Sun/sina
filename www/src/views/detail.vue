<template>
    <div>
        <header-tpl :showBack="true"></header-tpl>
        <loading :show="isAjax"></loading>
        <div class="detail-content">
            <div v-html="data.body"></div>
        </div>
    </div>
</template>

<script>
    import headerTpl from './header/header';
    import {mapState, mapMutations} from 'vuex';
    import {Loading} from 'vux';

    export default {
        name      : 'detail',
        data() {
            return {
                isAjax: true,
                data  : '',
            }
        },
        computed  : {
            ...mapState(['api']),
        },
        components: {
            headerTpl,
            Loading
        },
        methods   : {
            ...mapMutations([
                'setHeaderTitle'
            ]),
        },
        activated() {
            let self = this;
            self.setHeaderTitle('详情页');
            setTimeout(() => {
                self.isAjax = true;
                self.$axios.get(self.api + 'News/new_detail?postid=' + self.$route.params.detailId).then(function (res) {
                    if (!res.data.data) {
                        self.$router.push({name: 'home'})
                    }
                    self.data   = res.data.data;
                    self.isAjax = false;
                });
            }, 400);
        },
        deactivated() {
            this.data = {};
        }
    }
</script>

<style>
    .detail-content {
        width: 100%;
        margin-top: 50px;
        box-sizing: border-box;
        padding: 0 10px 10px;
        letter-spacing: .25px;
        line-height: 1.6;
        word-break: break-all;
    }
</style>
