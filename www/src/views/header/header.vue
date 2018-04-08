<template>
    <x-header style="position:fixed;top:0;left:0;right:0;z-index:1000;" :left-options="{showBack:false}">首页</x-header>
</template>

<script>
    import {XHeader} from 'vux'
    import {mapState} from 'vuex';

    export default {
        name      : 'headerTpl',
        data() {
            return {}
        },
        components: {
            XHeader
        },
        methods   : {},
    }
</script>

<style>

</style>
