<template>
    <x-header class="header" style="position:absolute;top:0;left:0;right:0;z-index:1000;"
              :left-options="{showBack:showBack}">{{ headerTitle }}
    </x-header>
</template>

<script>
    import {XHeader} from 'vux'
    import {mapState} from 'vuex';

    export default {
        name      : 'headerTpl',
        props     : ['showBack'],
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
