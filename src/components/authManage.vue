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
                        <el-input  v-if="scope.row.newColumnEditor" v-model="scope.row.name" clearable placeholder="管理员名">

                        </el-input>
                        <span v-else>{{ scope.row.name}}</span>
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
                            <el-checkbox v-for="auth in authOptions" :label="auth" :key="auth">{{auth}}</el-checkbox>
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

    export default {
        name: "authManage",
        data() {
            return{
                tableData: [],
                searchResult: [],
                tableHeight: 0,
                nameFilterValue: "",
                idFilterValue:"",
                classLoading: false,
                majorLoading: false,
                departLoading: false,
                pageMess: {
                    total:  0,
                    currentPage: 0,
                    pageSize: 10,
                },
                authOptions: ['上传成绩', '修改、删除成绩', '课程管理', '管理员管理'],
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
                this.tableData.splice(index, 1)
            },
            search() {
                this.searchResult = [{
                    name: '11',
                    auth: ['上传成绩', '修改、删除成绩'],
                    newColumnEditor:false,
                }];
                this.tableData = this.searchResult.slice(0, this.pageMess.pageSize);
                this.pageMess.total = 100

            },
            addColumn() {
                this.tableData.unshift( {
                    name: "",
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
                    row.gradeEditor = false;
                    row.newColumnEditor = false;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
            },
            idFilter(value) {
                let filterTable = this.searchResult.filter(function (row) {
                    return row.sId.search(value) !== -1;
                })
                this.tableData = filterTable;
            },
            nameFilter(value) {
                let filterTable = this.searchResult.filter(function (row) {
                    return row.sName.search(value) !== -1;
                })
                this.tableData = filterTable;
            },
            loadingDepart() {
                this.departLoading = true;
                this.departLoading = false;
            },
            loadingMajor() {
                this.majorLoading = true;
                this.majorLoading = false;
            },
            loadingClass() {
                this.classLoading = true;
                this.classLoading = false;
            },

            printTable() {
                document.execCommand("print");
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
