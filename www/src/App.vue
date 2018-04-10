<template>
    <transition :name="transitionName">
        <router-view class="child-view"></router-view>
    </transition>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        beforeRouteUpdate(to, from, next) {
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'slide-right'
                console.log(1);
            } else {
                this.transitionName = 'slide-left'
                console.log(2);
            }
            this.$router.isBack = false
            next()
        }
    }
</script>

<style>
    .child-view {
        position: absolute;
        width: 100%;
        transition: all .8s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(50px, 0);
        transform: translate(50px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-50px, 0);
        transform: translate(-50px, 0);
    }

    .header {
        position: absolute;
        height: 44px;
        background: #0058F1;
        width: 100%
    }
</style>
