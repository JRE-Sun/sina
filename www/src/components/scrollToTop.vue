<template>
    <div v-show="isShowToTop" class="scroll-to-top" v-on:click="clickScrollToTop">
        <icon class="icon-up" name="up"></icon>
    </div>
</template>

<script>
    export default {
        name   : 'scrollToTop',
        props  : ['isShowToTop'],
        methods: {
            clickScrollToTop() {
                document.querySelector('body').scrollTop = 0;
            },
        },
    }
</script>

<style scoped>
    .scroll-to-top {
        position: fixed;
        right: 15px;
        /*background-color: #E4E4E4;*/
        bottom: 15px;
        border-radius: 100%;
        overflow: hidden;
        width: 36px;
        height: 36px;
    }

    .scroll-to-top .icon-up {
        width: 100%;
        height: 100%;
    }
</style>