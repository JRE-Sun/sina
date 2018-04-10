<template>
    <router-link to="/detail">
        <div>
            <p>1</p>
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
        data() {
            return {}
        },
        components: {
            Panel
        },
        computed  : mapState(['dataList', 'headerSelectIndex']),
        mounted   : function () {

        }
    }
</script>
<style>

</style>