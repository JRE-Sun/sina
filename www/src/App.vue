<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="router-view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    export default {
        name : 'App',
        data() {
            return {
                isShow        : false,
                transitionName: 'vux-pop-in'
            }
        },
        beforeRouteUpdate(to, from, next) {
            console.log(this.$router.isBack);
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'vux-pop-out'
            } else {
                this.transitionName = 'vux-pop-in'
            }
            this.$router.isBack = false
            next()
        },
        watch: {
            '$route'(to, from) {
                console.log('前一页 from = ' + from.query.key)
                console.log('准备进入的页面是  to = ' + to.query.key)
                if (from.query.key) {
                    if (to.query.key > from.query.key) {
                        this.transitionName = 'vux-pop-in'
                    } else {
                        this.transitionName = 'vux-pop-out'
                    }
                } else {
                    this.transitionName = 'vux-pop-in'
                }
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
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 400ms;
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
