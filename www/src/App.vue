<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="router-view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name   : 'App',
        data() {
            return {
                isShow        : false,
                transitionName: 'vux-pop-in'
            }
        },
        beforeRouteUpdate(to, from, next) {
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'vux-pop-out'
                console.log(1);
            } else {
                this.transitionName = 'vux-pop-in'
                console.log(2);
            }
            this.$router.isBack = false
            next()
        },
        methods: {
            aa() {
                this.isShow         = !this.isShow;
                this.transitionName = this.transitionName == 'vux-pop-in' ? 'vux-pop-out' :
                    'vux-pop-in';
            }
        }
    }
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .router-view {
        /*position: absolute;*/
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
