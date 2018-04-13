<template>
    <router-link :to="{name:'detail',params:{'detailId':listItem.url},query: {key:key}}">
        <img :src="listItem.src" alt="">
        <div>
            <h4 class="title">{{ listItem.title }}</h4>
            <p class="desc">{{ listItem.desc }}</p>
        </div>
    </router-link>
</template>
<script>
    export default {
        name    : 'timeLine',
        props   : ['listItem'],
        data() {
            return {}
        },
        computed: {
            key() {
                return (new Date()).valueOf()
            }
        },
        created(){

        }
    }
</script>
<style>

</style>