<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-button type="primary"  style="margin-left: 20px" @click="addColumn()">添加管理员</el-button>
            </div>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="pageMess.total"
                :page-size.sync="pageMess.pageSize"
                :current-page.sync="pageMess.currentPage"
                @current-change="pageChange">
        </el-pagination>
        <div class="searchTable" id="print">
            <el-table
                    :data="tableData"
                    class="table"
                    :max-height="tableHeight"
            >
                <el-table-column
                        label="管理员名"
                        prop="course"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-input  v-if="scope.row.newColumnEditor" v-model="scope.row.aname" clearable placeholder="管理员名">

                        </el-input>
                        <span v-else>{{ scope.row.aname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="管理员权限"
                        prop="course"
                        align="center"
                        width="700"
                >
                    <template slot-scope="scope" >
                        <el-checkbox-group   v-model="scope.row.auth">
                            <el-checkbox v-for="auth in authOptions" :label="auth.label" :key="auth.value">{{auth.label}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="save(scope.$index, scope.row)">保存</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import qs from "qs"
    export default {
        name: "authManage",
        data() {
            return{
                tableData: [],
                searchResult: [],
                tableHeight: 0,
                pageMess: {
                    total:  0,
                    currentPage: 0,
                    pageSize: 10,
                },
                authOptions: [
                    {
                        label: '上传成绩',
                        value: 'updateGradeAuth'
                    }, {
                        label: '修改、删除成绩',
                        value: 'changeOrDelGradeAuth'
                    }, {
                        label: '课程管理',
                        value: 'courseManageAuth'
                    }, {
                        label: '管理员管理',
                        value: 'adminManageAuth'
                    }],
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.tableHeight = window.innerHeight - 152;
            })
            window.onresize = () => {
                this.$nextTick(() => {
                    this.tableHeight = window.innerHeight - 152;
                })
            }
            this.search();
        },
        methods: {
            handleEdit(index, row) {
                this.tableData[index].gradeEditor = true;
            },
            handleDelete(index, row) {
                this.$confirm('确认删除此条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(
                        '/api/deleteAuth',
                        this.qs.stringify({
                            name: row.aname
                        }),
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    ).then(()=>{
                        this.tableData.splice(index, 1);
                        this.searchResult = this.tableData;
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(()=>{
                        this.$message.error("删除失败");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            search() {
                this.$axios.post(
                    '/api/authSearch',
                ).then(response=>{
                    response.data.forEach((item ,index) => {
                        let auth = [];
                        item.updateGradeAuth === 'true' ? auth.push('上传成绩') : null;
                        item.changeOrDelGradeAuth === 'true' ? auth.push('修改、删除成绩') : null;
                        item.courseManageAuth === 'true' ? auth.push('课程管理') : null;
                        item.adminManageAuth === 'true' ? auth.push('管理员管理') : null;
                        this.searchResult.push({
                            aname: item.aname,
                            auth: auth
                        })
                    });
                    // console.log(this.searchResult);
                    this.tableData = this.searchResult.slice(0, this.pageMess.pageSize);
                    this.pageMess.total = response.data.length;
                }).catch()

            },
            addColumn() {
                this.tableData.unshift( {
                    aname: "",
                    auth: [],
                    newColumnEditor: true,
                })
            },
            save(index, row) {
                let isSave = true;
                for(let key in row){
                    if(row[key] === ""){
                        this.$message.error('请输入完整信息');
                        isSave = false;
                        break;
                    }
                }
                if(isSave){
                    let tableData = this.tableData;
                    this.$axios.post(
                        '/api/authManageSave',
                        qs.stringify({
                            name: row.aname,
                            updateGradeAuth: row.auth.indexOf('上传成绩') !== -1,
                            changeOrDelGradeAuth: row.auth.indexOf('修改、删除成绩') !== -1,
                            courseManageAuth: row.auth.indexOf('课程管理') !== -1,
                            adminManageAuth: row.auth.indexOf('管理员管理') !== -1,
                        }),
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    ).then(()=>{
                        row.gradeEditor = false;
                        row.newColumnEditor = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.searchResult = tableData;
                    }).catch(()=>{
                        this.$message.error("保存失败");
                    });
                }
            },


            pageChange(index) {
                this.tableData = this.searchResult.slice((index-1)*this.pageMess.pageSize, index*this.pageMess.pageSize);
            }
        }
    }
</script>

<style scoped>
    .searchHeader {
        height: 120px;
        position: relative;
    }

    .searchLabel {
        position: absolute;
        left: 40px;
        top: calc(50% - 20px)
    }

    .searchLabel > .el-select{
        width: 150px;
        margin-right: 20px;
    }
    .table {
        text-align: center;
    }
</style>
