<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-button type="primary"  style="margin-left: 20px" @click="addColumn()">添加课程</el-button>
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
                        label="课程"
                        prop="course"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-input  v-if="scope.row.newColumnEditor" v-model="scope.row.course" clearable placeholder="课程">

                        </el-input>
                        <span v-else>{{ scope.row.course}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.gradeEditor"
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
    import qs from 'qs'
    export default {
        name: "courseManage",
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
                }
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
            };
            this.search()
        },
        methods: {
            handleEdit(index, row) {
                this.tableData[index].gradeEditor = true;
            },
            handleDelete(index, row) {
                this.$confirm('确认删除课程？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(
                        '/api/deleteCourse',
                        qs.stringify({
                            course: row.course
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
                    '/api/getAllCourse',
                    null,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    // console.log("success")
                    this.searchResult = response.data;
                    this.tableData = this.searchResult.slice(0, this.pageMess.pageSize);
                    this.pageMess.total = response.data.length;
                });
            },
            addColumn() {
                this.tableData.unshift( {
                    course: "",
                    newColumnEditor: true,
                    gradeEditor: true,
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
                    this.$axios.post(
                        '/api/courseManageSave',
                        qs.stringify({
                            course: row.course
                        }),
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    ).then(()=>{
                        row.gradeEditor = false;
                        row.newColumnEditor = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }).catch(()=>{
                        this.$message.error("保存失败");
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
