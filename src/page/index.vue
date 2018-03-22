<template>
    <div>
        <login-tpl></login-tpl>
    </div>
</template>

<script>
    import loginTpl from '../tpl/login';

    export default {
        name      : 'indexPage',
        components: {
            loginTpl
        }
    }
</script>

<style lang="scss">
    @function rem($px) {
        @return $px/37.5+rem;
    }

    div {
        font-size: rem(30) !important;
    }
</style>