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
    import qs from 'qs'
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
                let userId = this.$store.getters.userName;
                let newPwd = this.newPwd;
                let oldPwd = this.oldPwd;
                this.$axios.post(
                    "/api/resetPwd",
                    qs.stringify({
                        oldPwd:oldPwd,
                        newPwd:newPwd,
                        userId: userId,
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(()=>{
                        this.$store.commit('user/SET_PASSWORD', newPwd);
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
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
