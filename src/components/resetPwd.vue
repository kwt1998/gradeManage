<template>
    <div class="form">
        <el-row :gutter="10">
            <el-col :span="4">当前密码:</el-col>
            <el-col :span="6">
                <div class="oldInput">
                    <el-input  placeholder="请输入密码" v-model="oldPwd" show-password></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="4">新密码:</el-col>
            <el-col :span="6">
                <div class="newInput">
                    <el-input  placeholder="请输入密码" v-model="newPwd" show-password></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-button @click="resetPwd" class="button" type="primary" >修改</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "resetPwd",
        data() {
            return{
                oldPwd: "",
                newPwd: ""
            }
        },
        methods: {
            resetPwd() {
                let userId = this.$store.getters.username;
                let newPwd = this.newPwd;
                this.$axios.post(
                    "resetPwd",
                    {
                        userId:userId,
                        newPwd:newPwd
                    }).then(()=>{
                        this.$store.commit('SET_PASSWORD', newPwd);
                    }).catch(()=>{

                })
            }
        }

    }
</script>

<style scoped>
    .form {
        width: 500px;
        height: 400px;
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 250px);
        line-height: 40px;
        /*margin: auto;*/
        /*margin-top: calc(50% - 200px);*/
    }
    .oldInput, .newInput{
        width: 400px;
    }
    .button {
        width: 200px;
        margin-left: calc(50% - 100px);
    }

    .el-row {
        margin-bottom: 50px;
    }
</style>
