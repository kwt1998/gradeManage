<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="searchValue.season" clearable placeholder="学年">
                    <el-option
                            v-for="item in seasonOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.depart" clearable placeholder="系" @click.native="loadingDepart" :loading="departLoading">
                    <el-option
                            v-for="item in departOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.major" clearable placeholder="专业" @click.native="loadingMajor()" :loading="majorLoading">
                    <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.class" clearable placeholder="班级" @click.native="loadingClass()" :loading="classLoading">
                    <el-option
                            v-for="item in classOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                        prop="sId"
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
                        <el-input v-if="scope.row.newColumnEditor" v-model="scope.row.sId"  @blur="save()"></el-input>
                        <span v-else>{{ scope.row.sId}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="姓名"
                        prop="sName"
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
                        <el-input v-if="scope.row.newColumnEditor" v-model="scope.row.sName"></el-input>
                        <span v-else>{{ scope.row.sName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="系"
                        prop="depart"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.depart" clearable placeholder="系">
                            <el-option
                                    v-for="item in departOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
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
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.major" clearable placeholder="专业">
                            <el-option
                                    v-for="item in majorOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
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
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.class" clearable placeholder="班级">
                            <el-option
                                    v-for="item in classOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-else>{{ scope.row.class}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="课程"
                        prop="course"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.course" clearable placeholder="课程">
                            <el-option
                                    v-for="item in courseOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
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
                        <el-select  v-if="scope.row.newColumnEditor" v-model="scope.row.season" clearable placeholder="学年">
                            <el-option
                                    v-for="item in seasonOptions"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
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
                    value: '2020夏季',
                }],
                majorOptions:[{
                    value: "软件工程"
                }],
                classOptions: [{
                    value: "1601"
                }],
                departOptions: [{
                    value: "计算机"
                }],
                courseOptions: [{
                    value: "数据库课程设计"
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
                this.tableData.splice(index, 1)
            },
            search() {
                this.searchResult = [{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "90",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "91",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "92",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "93",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "94",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "95",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "96",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "97",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "98",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "99",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "100",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "101",
                    gradeEditor: false,
                    newColumnEditor: false
                },{
                    sId: "161310719",
                    sName: "柯文涛",
                    depart: "计算机",
                    major: "软件工程",
                    class: "1601",
                    course: "数据库课程设计",
                    season: "2020年夏",
                    grade: "102",
                    gradeEditor: false,
                    newColumnEditor: false
                }];
                this.tableData = this.searchResult.slice(0, this.pageMess.pageSize);
                this.pageMess.total = 100
            },
            addColumn() {
                this.tableData.unshift( {
                    sId: "",
                    sName: "",
                    depart: "",
                    major: "",
                    class: "",
                    course: "",
                    season: "",
                    grade: "",
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
