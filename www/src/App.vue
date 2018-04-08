<template>
    <div id="app">
        <img src="./assets/logo.png">
        <loading v-model="showLoading" :text="loadText"></loading>
        <router-view/>
    </div>
</template>

<script>
    import {Loading} from 'vux'
    import {AlertModule} from 'vux'

    export default {
        name      : 'App',
        data() {
            return {
                showLoading: true,
                loadText   : 'Loading',
            }
        },
        components: {
            Loading
        },
        mounted   : function () {
            AlertModule.show({
                title  : 'VUX is Cool',
                content: 'Do you agree?',
                onShow() {
                    console.log('Module: I\'m showing')
                },
                onHide() {
                    console.log('Module: I\'m hiding now')
                }
            })
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2C3E50;
        margin-top: 60px;
    }
</style>
