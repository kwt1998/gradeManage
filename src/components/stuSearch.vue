<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                            v-for="item in seasonOptions"
                            :key="item.season"
                            :label="item.season"
                            :value="item.season">
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
                        prop="course"
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
                seasonOptions: [],
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
                let userId = this.$store.getters.userName;
                this.$axios.post(
                    '/api/gradeSearch',
                    this.qs.stringify({
                        season: season,
                        userId: userId
                    }),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(response=>{
                    this.tableData = response.data;
                });
                this.tableData = []
            },

            getSeasonOptions() {
                this.$axios.post(
                    '/api/getSeasonOptions',
                ).then(response=>{
                    this.seasonOptions = response.data;
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
