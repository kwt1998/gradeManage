<template>
    <div>
        <div class="searchHeader">
            <div class="searchLabel">
                <el-select v-model="searchValue.season" clearable placeholder="学年" @click.native="loadingSeason" :loading="seasonLoading">
                    <el-option
                            v-for="item in seasonOptions"
                            :key="item.season"
                            :label="item.season"
                            :value="item.season"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.depart" clearable placeholder="系" @click.native="loadingDepart" :loading="departLoading">
                    <el-option
                            v-for="item in departOptions"
                            :key="item.depart"
                            :label="item.depart"
                            :value="item.depart"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.major" clearable placeholder="专业" @click.native="loadingMajor()" :loading="majorLoading">
                    <el-option
                            v-for="item in majorOptions"
                            :key="item.major"
                            :label="item.major"
                            :value="item.major">
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.classid" clearable placeholder="班级" @click.native="loadingClass()" :loading="classLoading">
                    <el-option
                            v-for="item in classOptions"
                            :key="item.classid"
                            :label="item.classid"
                            :value="item.classid">
                    </el-option>
                </el-select>
                <el-select v-model="searchValue.course" clearable placeholder="课程" @click.native="loadingCourse()" :loading="classLoading">
                    <el-option
                            v-for="item in courseOptions"
                            :key="item.course"
                            :label="item.course"
                            :value="item.course">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 100px" @click="search()">查询</el-button>
            </div>
        </div>
        <div class="searchContent">
            <el-row>
                <el-col :span="17">
                    <div id="chart" class="chart"></div>
                    <h3 style="text-align: center">0~59:{{searchResult.to59}} 60~69:{{searchResult.to69}} 70~79:{{searchResult.to79}} 80~89:{{searchResult.to89}} 90~100:{{searchResult.to100}}</h3>
                </el-col>
                <el-col :span="7">
                    <h2>不及格人数: {{ searchResult.to59 }}</h2>
                    <h2>最高分: {{ maxGrade }}</h2>
                    <h2>平均分: {{ avgGrade }}</h2>
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
                seasonOptions: [],
                majorOptions:[],
                classOptions: [],
                departOptions: [],
                courseOptions: [],

                searchValue: {
                    season: "",
                    major: "",
                    classid: "",
                    depart: "",
                },
                searchResult: [],
                maxGrade: 0,
                avgGrade: 0,
                under: 0,
                classLoading: false,
                majorLoading: false,
                departLoading: false,
                seasonLoading: false,
                courseLoading: false,
                chartHeight: 0,

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.chartHeight = window.innerHeight - 120;
            });
            window.onresize = () => {
                this.$nextTick(() => {
                    this.chartHeight = window.innerHeight - 120;
                })
            };
        },
        methods: {

            search() {
                this.$axios.post('/api/gradeStatisticSearch', this.qs.stringify(this.searchValue)).then(response=>{
                    this.searchResult = response.data[0];
                    this.maxGrade = this.searchResult.maxGrade;
                    this.avgGrade = this.searchResult.avgGrade;

                    this.drawChart();
                }).catch(()=>{

                })
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
                this.seasonLoading = true;
                this.$axios.post(
                    '/api/getAllCourse',
                ).then(response=>{
                    this.courseOptions = response.data;
                    this.courseLoading = false;
                }).catch( error=> {
                    setTimeout(()=>{
                        this.courseLoading = false;
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





            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("chart"));
                let data = [
                    {value: this.searchResult.to59, name: '0-59分'},
                    {value: this.searchResult.to69, name: '60-69分'},
                    {value: this.searchResult.to79, name: '70-79分'},
                    {value: this.searchResult.to89, name: '80-89分'},
                    {value: this.searchResult.to100, name: '90-100分'},
                ];

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
                        data: data,
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
