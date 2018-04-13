<template>
    <div class="joke-timeline">
        <p class="content">{{ listItem.content }}</p>
        <p class="source">来源: {{ listItem.source }}</p>
    </div>
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
    body {
        background-color: #F9F9F9;
    }

    .joke-timeline {
        background-color: #FFF;
        padding: 10px;
        margin: 8px;
        letter-spacing: .25px;
        line-height: 1.6;
    }
</style>