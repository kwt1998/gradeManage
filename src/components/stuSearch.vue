<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                            v-for="item in seasonOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="search()">查询
                </el-button>
            </div>
        </div>
        <div class="searchTable">
            <el-table
                    :data="tableData"
                    class="table"
                    :max-height="tableHeight">

                <el-table-column
                        label="课程名"
                        prop="courseName"
                        width="400px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="得分"
                        prop="grade"
                        width="400px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="等级"
                        prop="level"
                        align="center"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "stuSearch",
        data() {
            return {
                seasonOptions: [{
                    value: '2020夏季'
                }],
                value: '',
                tableData: [],
                tableHeight: 0
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.tableHeight = window.innerHeight - 120;
            });
            window.onresize = () => {
                this.$nextTick(() => {
                    this.tableHeight = window.innerHeight - 120;
                })
            }
            this.getSeasonOptions()
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            search() {
                let season = this.value;
                let userId = this.$store.getters.userId;
                this.$axios.post(
                    '/api/gradeSearch',
                    {
                        season: season,
                        userId: userId
                    }
                ).then(response=>{
                    this.tableData = response;
                });
                this.tableData = [{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                },{
                    courseName: '数据库课程设计',
                    grade: '90',
                    level: 'A'
                }]
            },

            getSeasonOptions() {
                this.$axios.post(
                    '/api/getSeasonOptions',
                ).then(response=>{
                    this.seasonOptions = response;
                })
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

    .table {
        text-align: center;
    }

    /*.searchTable {*/
    /*    height:calc(100% - 120px);*/
    /*}*/


</style>
