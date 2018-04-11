<template>
    <x-header style="position:fixed;top:0;left:0;right:0;z-index:1000;" :left-options="{showBack:false}">{{
        headerTitle}}
    </x-header>
</template>

<script>
    import {XHeader} from 'vux'
    import {mapState} from 'vuex';

    export default {
        name      : 'headerTpl',
        data() {
            return {}
        },
        computed  : {
            ...mapState({
                headerTitle: state => state.headerTitle,
            }),
        },
        components: {
            XHeader
        },
        methods   : {},
    }
</script>

<style>

</style>
