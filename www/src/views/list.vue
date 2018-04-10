<template>
    <div>

        <div style="width: 100%;height: 500px;background-color: #2CA02C;" v-on:click="go">
            list
        </div>
    </div>
</template>

<script>
    import headerTpl from './header/header';

    export default {
        name      : 'list',
        data() {
            return {}
        },
        components: {},
        methods   : {
            go:function () {
                this.$router.goBack();
            }
        },
        created   : function () {

        }
    }
</script>

<style>

</style>
