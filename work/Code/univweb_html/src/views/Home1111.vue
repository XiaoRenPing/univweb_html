<template>
    <div class="home">
        <div class="content">
            <Sidebar class="sidebar" @selectABC="select"></Sidebar>
            <div class="wrap">
                <div class="row1 clearfix">
                    <div class="row11 row-item">
                        <h3>备案企业开通数据上传<router-link to="/companyData">查看详情>></router-link>
                        </h3>
                        <div id="pieCharts" class="chart-box"></div>
                    </div>
                    <div class="row12 row-item">
                        <h3>车辆健康档案上传走势(10日)<router-link to="/detailSearch">查看详情>></router-link></h3>
                        <div id="Charts2" class="chart-box"></div>
                    </div>
                    <div class="row13 row-item">
                        <h3>通告信息</h3>
                        <ul v-if="noticeList.length">
                            <li v-for="i in noticeList" :key='i.id' @click="goNoticeDetail(i.noticeId)">
                                <p>发布时间：{{i.noticePublishTime | filterTime('yyyy-mm-dd')}}</p>
                                <div>● {{i.noticeTitle}}</div>
                            </li>
                        </ul>
                        <div v-if="!noticeList.length" class="no-notice">暂无信息</div>
                    </div>
                </div>
                <div class="row2 clearfix">
                    <div class="row21 row-item">
                        <h3>企业经营红榜</h3>
                        <el-table class="tab" :data="tableData" :header-cell-style="{background:'#EDF0F5',color:'#666666','text-align':'center'}" :cell-style="{'text-align':'center'}" :stripe="false" height="300" style="width: 100%">
                            <el-table-column prop="date" label="信用等级" width="">
                            </el-table-column>
                            <el-table-column prop="name" label="等级描述" width="">
                            </el-table-column>
                            <el-table-column prop="address" label="操作">
                            </el-table-column>
                        </el-table>
                        <div class="page_box">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15, 25, 30]" :page-size="pageSize2" layout="total, sizes, prev, pager, next" :total="total2">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="row22 row-item">
                        <h3>企业经营黑榜</h3>
                        <el-table class="tab" :data="tableData" height="300" :header-cell-style="{background:'#EDF0F5',color:'#666666','text-align':'center'}" :cell-style="{'text-align':'center'}" :stripe="false" style="width: 100%">
                            <el-table-column prop="date" label="信用等级" width="">
                            </el-table-column>
                            <el-table-column prop="name" label="等级描述" width="">
                            </el-table-column>
                            <el-table-column prop="address" label="操作">
                            </el-table-column>
                        </el-table>
                        <div class="page_box">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15, 25, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="row23 row-item">
                        <h3>今日实时数据统计</h3>
                        <ul>
                            <li>
                                <img src="@/assets/images/icon_maintenance.png" height="52">
                                <p class="p-count1">{{num1}}</p>
                                <p class="p-flag">维修业务量<br>(辆次)</p>
                            </li>
                            <li>
                                <img src="@/assets/images/icon_company.png" height="52">
                                <p class="p-count2">{{num2}}</p>
                                <p class="p-flag">上传企业数<br>(家)</p>
                            </li>
                            <li>
                                <img src="@/assets/images/icon_evaluate.png" height="52">
                                <p class="p-count3">{{fixCommentCount}}</p>
                                <p class="p-flag">企业评价次数<br>(次)</p>
                            </li>
                            <li>
                                <img src="@/assets/images/icon_complain.png" height="52">
                                <p class="p-count4">{{complaintCount}}</p>
                                <p class="p-flag">车主投诉次数<br>(次)</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'home',
    components: {
        Header,
        Sidebar
    },
    data () {
        return {
            fixCommentCount: 0, // 企业评价次数
            complaintCount: 0, // 企业投诉次数
            tableData: [],
            lineData: [],
            lineXData: [],
            pieData: [],
            carCharts: '',
            pieCharts: '',
            num1: 0,
            num2: 0,
            noticeList: '', // 通知列表
            currentPage: 1,
            total: 0,
            pageSize: 10,
            total2: 0,
            pageSize2: 10
        }
    },
    methods: {
        getCount (id, param) {
            var obj = {}
            if (id && param && param !== 'enterpriseRegion') {
                obj[param] = id
            }
            this.$post('fix/comment/count', obj)
                .then(res => {
                    if (res.status === 200) {
                        this.fixCommentCount = res.fixCommentCount
                        this.complaintCount = res.complaintCount
                    }
                })
        },
        goNoticeDetail (id) {
            this.$router.push('/checkNotice?noticeId=' + id)
        },
        // 获取通知
        quertNotice () {
            this.$post('external/notice/list', {
                pageNum: 1,
                pageSize: 5
            })
                .then(res => {
                    if (res.status === 200) {
                        this.noticeList = res.data.list
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        select (id, param) {
            this.queryData(id, param)
            this.queryData2(id, param)
            this.getCount(id, param)
            this.getFixCountByVehicle(id, param)
            this.getFixCountByEnterprise(id, param)
        },
        queryData (id, param) {
            this.$post('/bas/enterprise/register/findBaseEnterpriseOpen', {
                [param]: id
            }).then(res => {
                if (res.status === 200) {
                    var val = {
                        no: res.data ? res.data.open_no : 0,
                        ok: res.data ? res.data.open_ok : 0,
                        total: function () {
                            return this.ok + this.no
                        },
                        okPercent: function () {
                            return this.total() && (this.ok / this.total() * 100).toFixed(2)
                        },
                        noPercent: function () {
                            return this.total() && (this.no / this.total() * 100).toFixed(2)
                        }
                    }
                    var labelLine = {
                        normal: {
                            length: 30,
                            length2: 70,
                            lineStyle: {
                                color: '#a0a0a0'
                            }
                        }
                    }
                    this.pieData = [
                        {
                            value: val.no,
                            name: '未开通',
                            labelLine,
                            label: {
                                normal: {
                                    formatter: data => {
                                        return `${data.name}企业\n\n{a|${val.noPercent()}%}`
                                    },
                                    padding: [0, -70],
                                    color: '#333',
                                    fontSize: 14,
                                    rich: {
                                        a: {
                                            color: '#F9A673',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            value: val.ok,
                            name: '已开通',
                            labelLine,
                            label: {
                                normal: {
                                    formatter: data => {
                                        return `{a|${val.okPercent()}%}\n\n${data.name}企业`
                                    },
                                    padding: [0, -70],
                                    color: '#333',
                                    fontSize: 14,
                                    rich: {
                                        a: {
                                            color: '#5AD6EC',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                    this.drawPie()
                }
            })
        },
        queryData2 (id, param) {
            this.$post('/bas/enterprise/register/findFixUploadCount', {
                [param]: id
            }).then(res => {
                let list = res.data.fixs
                let arr1 = []
                let arr2 = []
                list.forEach((v, i) => {
                    Object.keys(v).forEach(v => {
                        arr1.push(v)
                        arr2.push(list[i][v])
                    })
                })
                this.lineXData = arr1
                this.lineData = arr2
                this.drawLine()
            })
        },
        // 折线图
        drawLine () {
            this.carCharts = echarts.init(document.getElementById('Charts2'))
            var option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    data: this.lineXData,
                    name: ''
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    name: '车次/天'
                },
                series: [
                    {
                        data: this.lineData,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#00B7EE',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                label: { show: true },
                                lineStyle: {
                                    color: '#00b7ee'
                                }
                            }
                        }
                    }
                ]
            }
            this.carCharts.setOption(option)
        },
        // 饼图
        drawPie () {
            this.pieCharts = echarts.init(document.getElementById('pieCharts'))
            var option1 = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                color: ['#FFDC70', '#77DDFF', 'yellow', 'blueviolet'],
                legend: {
                    itemWidth: 32,
                    itemHeight: 10,
                    itemGap: 40,
                    orient: 'horizontal',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                        color: '#666'
                    },
                    formatter: ' {name}',
                    data: [
                        {
                            name: '未开通',
                            icon: 'rect'
                        },
                        {
                            name: '已开通',
                            icon: 'rect'
                        }
                    ]
                },
                series: [
                    {
                        radius: '55%',
                        center: ['50%', '60%'],
                        name: '备案开通情况',
                        type: 'pie',
                        data: this.pieData
                    }
                ]
            }
            this.pieCharts.setOption(option1)
        },
        getFixCountByVehicle (id, param) {
            var obj = {}
            if (id && param && param !== 'enterpriseRegion') {
                obj[param] = id
            }
            this.$post('/bas/vehicle/fix/findFixCountByVehicle', obj)
                .then(res => {
                    if (isNaN(res - 0)) {
                        this.num1 = 0
                    } else {
                        this.num1 = res
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        getFixCountByEnterprise (id, param) {
            var obj = {}
            if (id && param && param !== 'enterpriseRegion') {
                obj[param] = id
            }
            this.$post('/bas/vehicle/fix/findFixCountByEnterprise', obj)
                .then(res => {
                    if (isNaN(res - 0)) {
                        this.num2 = 0
                    } else {
                        this.num2 = res
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        handleCurrentChange () {},
        handleSizeChange () {}
    },
    created () {
        this.getCount()
        this.quertNotice()
        this.getFixCountByVehicle()
        this.getFixCountByEnterprise()
        this.$post('bas/city/findRegionByDomainCity', {}).then(res => {
            if (res.status === 200) {
                localStorage.regionList = JSON.stringify(res.datas)
            } else {
                this.$alert(res.message, '提示')
            }
        })
    },
    mounted () {
        this.queryData('all', 'enterpriseRegion')
        this.queryData2('all', 'enterpriseRegion')
        window.onresize = () => {
            this.carCharts.resize()
            this.pieCharts.resize()
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    height: 100%;
    background: #F4F6F8;
    padding: 20px;
    padding-right: 0;
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        .sidebar {
            position: absolute;
            border: none;
            background: #ffffff;
        }
        .wrap {
            position: relative;
            top: 0px;
            bottom: 0;
            margin-left: 250px;
            right: 0;
            //padding-bottom: 20px;
            .row-item {
                background: #ffffff;
                // border: 1px solid #dddddd;
                // box-sizing: border-box;
                margin-left: 20px;
                margin-top: 20px;
                padding: 20px;
                float: left;
                .page_box {
                    background: #ffffff;
                    height: 40px;
                    line-height: 40px;
                }
                h3 {
                    position: relative;
                    color: #359dff;
                    font-size: 14px;
                    text-align: left;
                    span {
                        position: absolute;
                        right: 5px;
                        font-size: 14px;
                        color: #999999;
                    }
                    a {
                        position: absolute;
                        right: 5px;
                        font-size: 14px;
                        color: #999999;
                        text-decoration: none;
                    }
                }
                .chart-box {
                    height: 330px;
                    width: 100%;
                    margin-top: 20px;
                    margin-left: 0px;
                }
                .tab {
                    margin-top: 10px;
                }
            }
            .row11 {
                width: 33%;
                height: 366px;
                margin-top: 0;
            }
            .row12 {
                width: 33%;
                height: 366px;
                margin-top: 0;
            }
            .row13 {
                width: 16%;
                height: 366px;
                margin-top: 0;
                li {
                    margin-top: 15px;
                    text-align: left;
                    cursor: pointer;
                    p {
                        font-size: 12px;
                        color: #999999;
                    }
                    div {
                        margin-top: 5px;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #666666;
                        &:hover {
                            color: #359dff;
                        }
                    }
                }
                .no-notice {
                    font-size: 14px;
                    color: #999999;
                    // margin-top: 5px;
                    text-align: center;
                    margin-top: 160px;
                    // text-align: left;
                }
            }
            .row21 {
                width: 33%;
                height: 400px;
            }
            .row22 {
                width: 33%;
                height: 400px;
            }
            .row23 {
                width: 16%;
                height: 400px;
                ul {
                    margin-top: 10px;
                    li {
                        border: 1px solid #e6e6e6;
                        height: 170px;
                        font-size: 14px;
                        color: #666666;
                        float: left;
                        width: 40%;
                        margin-left: 6.66%;
                        margin-top: 10px;
                        img {
                            margin-top: 10px;
                        }
                        .p-flag {
                            margin-top: 8px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .p-count1 {
                            margin-top: 10px;
                            font-size: 30px;
                            color: #24bdb3;
                        }
                        .p-count2 {
                            margin-top: 10px;
                            font-size: 30px;
                            color: #30a9e0;
                        }
                        .p-count3 {
                            margin-top: 10px;
                            font-size: 30px;
                            color: #f6612e;
                        }
                        .p-count4 {
                            margin-top: 10px;
                            font-size: 30px;
                            color: #885bf4;
                        }
                    }
                }
            }
        }
    }
}
</style>
