<template>
    <div >
        <aside class="aside">
            <div class="asideTop">
                <div class ="user">
                    <div class="userHead"> <img style="width: 80%; height: 80%" src="../assets/user.svg"></div>
                    {{username}}
                </div>
            </div>
            <div class="menu">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        router
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item v-for="(item,index) in asideMenu" :index=index>
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{item}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </aside>
        <body class="body">
        <router-view></router-view>
        </body>
    </div>
</template>

<script>

    export default {
        name: 'content',
        data() {
            return {
                asideMenu: {
                },
                username: this.$store.getters.userName,
            }
        },
        methods: {

        },
        mounted() {
            let userType = this.$store.getters.userType;
            if(userType === 1 ){
                this.asideMenu = {
                    stuSearch: "成绩查询",
                    resetPwd: "重置密码",
                }
            }else if(userType === 2){
                this.asideMenu = {
                    gradeManage: "成绩管理",
                    courseManage: "课程管理",
                    gradeStatistics: "成绩统计",
                    authManage: "权限管理",
                    resetPwd: "重置密码",
                }
            }
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
        width: 100px;
        height: 150px;
        position: absolute;
        top: 30px;
        left: calc(50% - 50px);
        text-align: center;
    }

    .userHead {
        width: 100px;
        height: 100px;
        background-color: white;
        border: 1px solid #3a8ee6;
        border-radius: 100%;
        overflow: hidden;
    }
</style>
