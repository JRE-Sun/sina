<template>
    <div>
        <header-tpl></header-tpl>
        <loading :show="isAjax"></loading>
        <div style="width: 100%;margin-top:50px;" v-on:click="go">
            <div v-html="data.body"></div>
        </div>
    </div>
</template>


<script>
    import headerTpl from './header/header';
    import {mapState, mapMutations} from 'vuex';
    import {Loading} from 'vux';

    export default {
        name      : 'home',
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
            go: function () {
                this.$router.goBack();
            }
        },
        activated() {
            let self = this;
            self.setHeaderTitle('详情页');
            setTimeout(() => {
                self.$axios.get(self.api + 'News/new_detail?postid=' + self.$route.params.detailId).then(function (res) {
                    self.data   = res.data.data;
                    self.isAjax = false;
                    console.log(res.data.data);
                }).catch(function () {
                });
            }, 400);
        },
        created   : function () {

        }
    }
</script>

<style>

</style>
