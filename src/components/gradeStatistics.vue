<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="searchValue.season" clearable placeholder="学年" @click.native="loadingSeason" :loading="seasonLoading">
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
                <el-button type="primary" icon="el-icon-search" style="margin-left: 200px" @click="search()">查询</el-button>
            </div>
        </div>
        <div class="searchContent">
            <el-row>
                <el-col :span="17">
                    <div id="chart" class="chart"></div>
                    <h3 style="text-align: center">0~60:{{searchResult}} 60~75:{{searchResult}} 75~85:{{searchResult}} 85~100:{{searchResult}}</h3>
                </el-col>
                <el-col :span="7">
                    <h2>不及格人数: {{ searchResult }}</h2>
                    <h2>最高分: {{ searchResult }}</h2>
                    <h2>平均分: {{ searchResult }}</h2>
                </el-col>
            </el-row>
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
                searchResult: [],
                classLoading: false,
                majorLoading: false,
                departLoading: false,
                seasonLoading: false,
                chartHeight: 0,

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.chartHeight = window.innerHeight - 120;
            })
            window.onresize = () => {
                this.$nextTick(() => {
                    this.chartHeight = window.innerHeight - 120;
                })
            }
            this.drawChart();
        },
        methods: {

            search() {
                this.$axios.post('/api/gradeStatisticSearch', this.searchValue).then(response=>{
                    this.searchResult = response;
                }).catch()
                this.searchResult = [];
            },


            loadingSeason() {
                this.seasonLoading = true;
                this.$axios.post(
                    '/api/getSeasonOptions',
                ).then(response=>{
                    this.seasonOptions = response;
                    this.seasonLoading = false;
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
                    this.departOptions = response;
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
                    '/api/getDepartOptions',
                    {
                        depart: this.searchValue.depart
                    }
                ).then(response=>{
                    this.majorOptions = response;
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
                    {
                        depart: this.searchValue.depart,
                        major: this.searchValue.major,
                    }
                ).then(response=>{
                    this.classOptions = response;
                    this.classLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.classLoading = false;
                    },5000)}
                )
            },





            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("chart"));

                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '成绩统计',
                        left: 'center'
                    },
                    tooltip: {

                    },
                    series: [{
                        name: '成绩',
                        type: 'pie',
                        selectedMode: 'single',
                        selectedOffset: 30,
                        clockwise: true,
                        label: {
                            fontSize: 18,
                            color: '#235894'
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#235894'
                            }
                        },
                        data: [
                            {value: 335, name: '0-60分'},
                            {value: 310, name: '60-70分'},
                            {value: 234, name: '70-85分'},
                            {value: 135, name: '85-100分'},
                        ],
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
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

    .chart {
        height: 500px;
        width: 1000px;
    }

    .searchContent h2 {
        margin-top: 60px;
    }

</style>
