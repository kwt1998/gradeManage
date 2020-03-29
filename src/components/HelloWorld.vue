<template>
    <div >
        <div class="nav">

        </div>
        <div class="content">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: ['msg'],
        data() {
            return {};
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    * {
        margin: 0;
        padding: 0;
    }

    .nav {
        margin: 20px 20px 20px 0;
        width: 200px;
        background-color: #d6dae3;
    }

</style>
