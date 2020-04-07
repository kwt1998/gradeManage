<template>
    <div style="background-color: #d6dae3;">
        <h1>登录</h1>
        <div class="login">
            <el-form class="form" ref="form" :model="form" >
                <h4>用户名</h4>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <h4>密码</h4>
                <el-form-item>
                    <el-input v-model="form.password"  placeholder="请输入密码"  show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {name: "", password: ""}
            }
        },
        methods: {
            onSubmit(){
                // this.$store.dispatch("user/login", this.form).then(()=>{
                // }).catch((e)=>{
                // });
                this.$axios.post(
                    '/api/login',
                    this.qs.stringify({
                        username: this.form.name,
                        password: this.form.password,
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response => {
                    this.$store.commit('user/SET_USERNAME', response.data[0].aname);
                    this.$store.commit('user/SET_PASSWORD', response.data[0].password);
                    this.$store.commit('user/SET_USERTYPE', response.data[0].usertype);
                    this.$store.commit('auth/SET_updateGradeAuth', response.data[0].updateGradeAuth)
                    this.$store.commit('auth/SET_changeOrDelGradeAuth', response.data[0].changeOrDelGradeAuth)
                    this.$store.commit('auth/SET_courseManageAuth', response.data[0].courseManageAuth)
                    this.$store.commit('auth/SET_adminManageAuth', response.data[0].adminManageAuth)
                    sessionStorage.setItem("token", "qwqwqw");

                    // this.$store.dispatch("auth/getAuth", userInfo).then(() => {
                    //     resolve();
                    // }).catch((e)=>{
                    //
                    // });
                    this.$router.push("/content")
                }).catch(error => {

                });
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -170px 0 0 -245px;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    h1{
        text-align: center;
        color: gray;
    }
    .login h4 {
        color: gray;
        padding: 10px;
    }
    .form {
        width: 450px;
        height: 300px;
    }
</style>
