<template>
    <router-link class="timeline" :to="{name:'detail',params:{'detailId':listItem.url},query: {key:key}}">
        <img :src="listItem.src" alt="">
        <div class="right-content">
            <h4 class="title">{{ listItem.title }}</h4>
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
        created() {

        }
    }
</script>
<style>
    .timeline {
        display: flex;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid rgba(221, 221, 221, 0.6);
    }

    .timeline img {
        width: 33%;
    }

    .timeline .right-content {
        width: 67%;
        box-sizing: border-box;
        padding-left: 16px;
    }

    .timeline .title {
        font-weight: normal;
        line-height: 1.6;
        letter-spacing: .25px;
    }
</style>