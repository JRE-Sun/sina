<template>
    <panel type="1" :list="dataList[headerSelectIndex]"></panel>
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
            console.log(this.dataList[this.headerSelectIndex]);
        }
    }
</script>
<style>

</style>