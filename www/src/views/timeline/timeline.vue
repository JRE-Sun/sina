<template>
    <router-link :to="{name:'detail',params:{'detailId':listItem.url},query: {key:key}}">
        <img :src="listItem.src" alt="">
        <div>
            <h4 class="title">{{ listItem.title }}</h4>
            <p class="desc">{{ listItem.desc }}</p>
        </div>
    </router-link>
    <!--<panel  type="1" :list="dataList[headerSelectIndex]"></panel>-->
    <!--<p v-for="item in dataList">{{ item.ltitle }}</p>-->
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import {Panel} from 'vux'

    export default {
        name      : 'timeLine',
        props     : ['listItem'],
        data() {
            return {}
        },
        components: {
            Panel
        },
        computed  : {
            ...mapState(['dataList', 'headerSelectIndex']),
            key() {
                return (new Date()).valueOf()
            }
        },
        mounted   : function () {

        }
    }
</script>
<style>

</style>