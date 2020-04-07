<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="searchValue.season" clearable placeholder="学年" @click.native="loadingSeason" :loading="seasonLoading">
                    <el-option
                            v-for="item in seasonOptions"
                            :key="item.season"
                            :label="item.label"
                            :value="item.season"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.depart" clearable placeholder="系" @click.native="loadingDepart" :loading="departLoading">
                    <el-option
                            v-for="item in departOptions"
                            :key="item.depart"
                            :label="item.label"
                            :value="item.depart"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.major" clearable placeholder="专业" @click.native="loadingMajor()" :loading="majorLoading">
                    <el-option
                            v-for="item in majorOptions"
                            :key="item.major"
                            :label="item.label"
                            :value="item.major">
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.classid" clearable placeholder="班级" @click.native="loadingClass()" :loading="classLoading">
                    <el-option
                            v-for="item in classOptions"
                            :key="item.classid"
                            :label="item.label"
                            :value="item.classid">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="search()">查询</el-button>
                <el-button type="primary"  style="margin-left: 20px" @click="addColumn()">新增</el-button>
                <el-button type="info"  style="margin-left: 20px" @click="leadingIn()">批量导入</el-button>
                <el-button type="info"  style="margin-left: 20px"  v-print="'#print'">打印</el-button>
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
                        label="学号"
                        prop="sid"
                        align="center"
                >
                    <template slot="header" slot-scope="scope">
                        <el-row >
                            <el-col :span="7">
                                学号
                            </el-col>
                            <el-col :span="17">
                                <el-input
                                        v-model="idFilterValue"
                                        size="mini"
                                        @keyup.enter.native="idFilter(idFilterValue)"
                                        @blur="idFilter(idFilterValue)"
                                        placeholder="筛选"/>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot-scope="scope" >
                        <el-input v-if="scope.row.newColumnEditor" v-model="scope.row.sid"  @blur="save()"></el-input>
                        <span v-else>{{ scope.row.sid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="姓名"
                        prop="sname"
                        align="center">
                    <template slot="header" slot-scope="scope">
                        <el-row >
                            <el-col :span="7">
                                姓名
                            </el-col>
                            <el-col :span="17">
                                <el-input
                                        v-model="nameFilterValue"
                                        size="mini"
                                        @keyup.enter.native="nameFilter(nameFilterValue)"
                                        @blur="nameFilter(nameFilterValue)"
                                        placeholder="筛选"/>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot-scope="scope" >
                        <el-input v-if="scope.row.newColumnEditor" v-model="scope.row.sname"></el-input>
                        <span v-else>{{ scope.row.sname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="系"
                        prop="depart"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.depart" clearable placeholder="系" @click.native="loadingDepart" :loading="departLoading">
                            <el-option
                                    v-for="item in departOptions"
                                    :key="item.depart"
                                    :label="item.depart"
                                    :value="item.depart">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.depart}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="专业"
                        prop="major"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.major" clearable placeholder="专业" @click.native="loadingRowMajor(scope.row)" :loading="majorLoading">
                            <el-option
                                    v-for="item in majorOptions"
                                    :key="item.major"
                                    :label="item.major"
                                    :value="item.major">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.major}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="班级"
                        prop="class"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.classid" clearable placeholder="班级" @click.native="loadingRowClass(scope.row)" :loading="classLoading">
                            <el-option
                                    v-for="item in classOptions"
                                    :key="item.classid"
                                    :label="item.classid"
                                    :value="item.classid">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.classid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="课程"
                        prop="course"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.course" clearable placeholder="课程" @click.native="loadingCourse" :loading="couseLoading">
                            <el-option
                                    v-for="item in courseOptions"
                                    :key="item.course"
                                    :label="item.course"
                                    :value="item.course">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.course}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="学年"
                        prop="season"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.season" clearable placeholder="学年" @click.native="loadingSeason" :loading="SeasonLoading">
                            <el-option
                                    v-for="item in seasonOptions"
                                    :key="item.season"
                                    :label="item.season"
                                    :value="item.season">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.season}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="得分"
                        prop="grade"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-input v-if="scope.row.gradeEditor" v-model="scope.row.grade"></el-input>
                        <span v-else>{{ scope.row.grade}}</span>
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
                                v-else
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        name: "gradeManage",
        data() {
            return{
                seasonOptions: [{

                }],
                majorOptions:[{

                }],
                classOptions: [{

                }],
                departOptions: [{

                }],
                courseOptions: [{

                }],

                searchValue: {
                    season: "",
                    major: "",
                    class: "",
                    depart: "",
                },
                tableData: [],
                searchResult: [],
                tableHeight: 0,
                nameFilterValue: "",
                idFilterValue:"",
                classLoading: false,
                majorLoading: false,
                departLoading: false,
                seasonLoading: false,
                courseLoading: false,
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
            }
        },
        methods: {
            handleEdit(index, row) {
                this.tableData[index].gradeEditor = true;
            },
            handleDelete(index, row) {
                if(this.$store.getters.changeOrDelGradeAuth === 'false'){
                    this.$message.error('当前用户没有删除成绩权限')
                    return;
                }
                this.$confirm('确认删除此条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(
                        '/api/deleteGrade',
                        row,
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
                this.tableData.splice(index, 1);
                this.searchResult = this.tableData;
            },
            search() {
                this.$axios.post(
                    '/api/gradeManageSearch',
                    this.qs.stringify(this.searchValue),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                   this.searchResult = response.data;
                    this.tableData = this.searchResult.slice(0, this.pageMess.pageSize);
                    this.pageMess.total = response.data.length;
                });
            },
            addColumn() {
                if(this.$store.getters.updateGradeAuth === 'false'){
                    this.$message.error('当前用户没有上传成绩权限')
                    return;
                }
                this.tableData.unshift( {
                    sid: "",
                    sname: "",
                    depart: "",
                    major: "",
                    classid: "",
                    course: "",
                    season: "",
                    grade: "",
                    level: "A",
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
                    if(this.$store.getters.changeOrDelGradeAuth === 'false'){
                        this.$message.error('当前用户没有修改成绩权限')
                        return;
                    }
                    this.$axios.post(
                        '/api/gradeManageSave',
                        this.qs.stringify(row),
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    ).then(()=>{
                        row.gradeEditor = false;
                        row.newColumnEditor = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }).catch(()=>{
                        this.$message.error('保存失败')
                    });
                }
            },
            idFilter(value) {
                let filterTable = this.searchResult.filter(function (row) {
                    return row.sid.search(value) !== -1;
                })
                this.tableData = filterTable;
            },
            nameFilter(value) {
                let filterTable = this.searchResult.filter(function (row) {
                    return row.sname.search(value) !== -1;
                })
                this.tableData = filterTable;
            },

            loadingSeason() {
                this.seasonLoading = true;
                this.$axios.post(
                    '/api/getSeasonOptions',
                ).then(response=>{
                    this.seasonOptions = response.data;
                    this.seasonLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.seasonLoading = false;
                    },5000)}
                )
            },

            loadingCourse() {
                this.classLoading = true;
                this.$axios.post(
                    '/api/getAllCourse',
                ).then(response=>{
                    this.courseOptions = response.data;
                    this.courseLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.seasonLoading = false;
                    },5000)}
                )
            },

            loadingDepart() {
                this.departLoading = true;
                this.$axios.post(
                    '/api/getDepartOptions',
                ).then(response=>{
                    this.departOptions = response.data;
                    this.departLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.departLoading = false;
                    },5000)}
                )
            },
            loadingMajor() {
                this.majorLoading = true;
                this.$axios.post(
                    '/api/getMajorOptions',
                    this.qs.stringify({
                        depart: this.searchValue.depart
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    this.majorOptions = response.data;
                    this.majorLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.majorLoading = false;
                    },5000)}
                )
            },

            loadingRowMajor(row) {
                this.majorLoading = true;
                this.$axios.post(
                    '/api/getMajorOptions',
                    this.qs.stringify({
                        depart: row.depart
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    this.majorOptions = response.data;
                    this.majorLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.majorLoading = false;
                    },5000)}
                )
            },

            loadingClass() {
                this.classLoading = true;
                this.$axios.post(
                    '/api/getClassOptions',
                    this.qs.stringify({
                        depart: this.searchValue.depart,
                        major: this.searchValue.major,
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    this.classOptions = response.data;
                    this.classLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.classLoading = false;
                    },5000)}
                )
            },

            loadingRowClass(row) {
                this.classLoading = true;
                this.$axios.post(
                    '/api/getClassOptions',
                    this.qs.stringify({
                        depart: row.depart,
                        major: row.major,
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    this.classOptions = response.data;
                    this.classLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.classLoading = false;
                    },5000)}
                )
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
