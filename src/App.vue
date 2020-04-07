<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import login from './components/login.vue'

    export default {
        name: 'App',
        components: {
            login
        },
        data() {
            return {
                asideMenu: {
                    stuSearch: "成绩查询",
                    resetPwd: "重置密码",
                    gradeManage: "成绩管理",
                    courseManage: "课程管理",
                    gradeStatistics: "成绩统计",
                    authManage: "权限管理"
                },
                username: "161310719",
            }
        },
        methods: {

        },
        mounted() {
            // this.$router.push("/login")
        },
        created () {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload",()=>{
                sessionStorage.setItem("store",JSON.stringify(this.$store.state))
            })
        }
    }
</script>

<style>
    #app {
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .aside {
        height: 100%; width: 220px; position: absolute; left: 0; top: 0;
        background-color: rgb(84, 92, 100);
    }

    .body {
        background-color: #eef2fc; height: 100%; position: absolute; right: 0; top: 0; width: calc(100% - 220px)
    }

    .asideTop {
        height: 220px;
        background-color: #d6dae3;
        position: relative;
    }

    .user {
        width: 120px;
        height: 150px;
        position: absolute;
        top: 30px;
        left: calc(50% - 60px);
        text-align: center;
    }

    .userHead {
        width: 120px;
        height: 120px;
        background-color: white;
        border: 1px solid #3a8ee6;
        border-radius: 100%;
        overflow: hidden;
    }
</style>
