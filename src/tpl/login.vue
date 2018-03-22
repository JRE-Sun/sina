<template>
    <div class="login-register">
        <div class="login-register__content display-flex">
            <div class="display-flex login-register__tab">
                <p v-on:click="switchTab(0)" class="flex-1" :class="isActive==0 ? 'active' : ''">登陆</p>
                <p v-on:click="switchTab(1)" class="flex-1" :class="isActive==1 ? 'active' : ''">注册</p>
            </div>
            <div class="flex-1 login-register__main">
                <div class="login-register__login flex-1" :class="isActive==0 ? 'rotateY-0' : 'rotateY-180'">
                    <p>登陆名(邮箱)</p>
                    <input type="text">
                    <p>密码</p>
                    <input id="password" type="text">
                    <button v-on:click="sendInfo">登陆</button>
                </div>
                <div class="login-register__register" :class="isActive==1 ? 'rotateY-0' : 'rotateY-180'">
                    这里是注册页面...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name    : 'loginTpl',
        data    : function () {
            return {
                isActive: 0,
            }
        },
        computed: mapState(['userName']),
        methods : {
            ...mapMutations([
                'setUserName',
            ]),
            sendInfo() {
                this.$axios.post('http://www.php.cc/api.php', {
                    c: "sina/user-get"
                }).then(function (res) {
                    console.log(res.data    )
                });
                // this.setUserName('1');
                // this.$router.push('/');
            },
            switchTab(index) {
                console.log(index);
                this.isActive = index;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @function rem($px) {
        @return $px/37.5+rem;
    }

    input {
        display: block;
    }

    .login-register {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #FFF;
    }

    .login-register__content {
        width: 100%;
        height: 100%;
        position: relative;
        flex-direction: column;
    }

    .login-register__tab {
        text-align: center;
        border-bottom: 1px solid #EDEDED;
    }

    .login-register__tab p {
        padding: rem(12);
    }

    .login-register__tab p.active {
        color: #FFFF;
        background-color: #4EA8EC;
    }

    .login-register__main {
        position: relative;
    }

    .login-register__login, .login-register__register {
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: .8s;
    }

    .login-register__login {
        background-color: #F2F2F2;
    }

</style>