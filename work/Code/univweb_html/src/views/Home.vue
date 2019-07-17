<template>
    <div class="home">
        <div class="content">
            <div class="bos-row clearfix">
                <div class="bos-col-sm">
                    <div class="bos-card">
                        <div class="card-body">
                            <div class="chart-card-header">
                                <div class="meta">
                                    <span class="chart-card-title">维修电子健康档案上传数</span>
                                </div>
                                <div class="total">
                                    <span>{{uploadFixDataNumber | thousands}}</span>
                                </div>
                            </div>
                            <div class="chart-card-content">
                                <div class="content-fix">
                                    <div>
                                        <div class="chart-trend">
                                            <span>周同比</span>
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-0.png" alt="" srcset="" v-if="fixDataWeekRate===0">
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-1.png" alt="" srcset="" v-if="fixDataWeekRate>0">
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-2.png" alt="" srcset="" v-if="fixDataWeekRate<0">
                                            <span>{{fixDataWeekRate}}%</span>
                                        </div>
                                        <div class="chart-trend">
                                            <span>日环比</span>
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-0.png" alt="" srcset="" v-if="fixDataDayRate===0">
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-1.png" alt="" srcset="" v-if="fixDataDayRate>0">
                                            <img class="icon-prompt-s" src="../assets/images/tips-s-2.png" alt="" srcset="" v-if="fixDataDayRate<0">
                                            <span>{{fixDataDayRate}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-card-footer">
                                <div>日均上传数
                                    <span>{{fixDataAverageValue | thousands}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bos-col-sm">
                    <div class="bos-card">
                        <div class="card-body">
                            <div class="chart-card-header">
                                <div class="meta">
                                    <span class="chart-card-title">维修服务投诉量</span>
                                </div>
                                <div class="total">
                                    <span>126660</span>
                                </div>
                            </div>
                            <div class="chart-card-content">
                                <div class="content-fix">
                                    <div>
                                        <div id="bosChart1" style="height:50px;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-card-footer">
                                <div>月投诉事件
                                    <span>450</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bos-col-sm">
                    <div class="bos-card">
                        <div class="card-body">
                            <div class="chart-card-header">
                                <div class="meta">
                                    <span class="chart-card-title">协会服务网站访问量</span>
                                </div>
                                <div class="total">
                                    <span>126660</span>
                                </div>
                            </div>
                            <div class="chart-card-content">
                                <div class="content-fix">
                                    <div>
                                        <div id="bosChart2" style="height:50px;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-card-footer">
                                <div>日访问量
                                    <span>45550</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bos-col-sm">
                    <div class="bos-card">
                        <div class="card-body-top">
                            <span class="chart-card-title">通告信息</span>
                            <span class="chart-card-action" @click="toNotoMore" v-if="noticeList.length">更多></span>
                        </div>
                        <div class="card-body-con">
                            <ul v-if="noticeList.length">
                                <li class="noto-li" @click="toNotoDetail" v-for="item in noticeList" :key='item.id'>
                                    <p class="noto-text">● {{item.noticeTitle}}</p>
                                    <span class="noto-time">{{item.noticePublishTime | filterTime('yyyy-mm-dd')}}</span>
                                </li>
                            </ul>
                            <div v-if="!noticeList.length" class="no-notice">暂无信息</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bos-card boxs-tab">
                <div class="tabs-bar clearfix">
                    <div class="fl tabs-tit">汽车维修电子健康档案</div>
                    <div class="fr">
                        <div class="extra-wrap">
                            <!-- <span :class="{'active': activeTime==='day'}" @click="chooseTime('day')">今日</span> -->
                            <span :class="{'active': activeTime==='week'}" @click="chooseTime('week')">本周</span>
                            <span :class="{'active': activeTime==='month'}" @click="chooseTime('month')">本月</span>
                            <span :class="{'active': activeTime==='year'}" @click="chooseTime('year')">全年</span>
                        </div>
                        <el-date-picker
                            class="extra-time"
                            v-model="daterange"
                            type="daterange"
                            align="right"
                            value-format="yyyy-MM-dd"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @blur="extraTimeBlur"
                            >
                        </el-date-picker>
                    </div>
                </div>
                <div class="tabs-content clearfix">
                    <div class="bos-col-m col-fl">
                        <div class="title pd30">
                            <h4>数据增长趋势</h4>
                        </div>
                        <div id="bosTabChart" style="width: 100%; height: 300px;"></div>
                    </div>
                    <div class="bos-col-m col-fr">
                        <div class="rank">
                            <div class="title">
                                <h4>企业数据上传排名</h4>
                                <!-- <span>详细></span> -->
                            </div>
                            <ul class="list">
                                <li>
                                    <span class="active">1</span>
                                    <span>桃源村0号店</span>
                                    <span>1234.56</span>
                                </li>
                                <li>
                                    <span class="active">2</span>
                                    <span>桃源村0号店</span>
                                    <span>1234.56</span>
                                </li>
                                <li>
                                    <span>3</span>
                                    <span>桃源村0号店</span>
                                    <span>1234.56</span>
                                </li>
                                <li>
                                    <span>4</span>
                                    <span>桃源村0号店</span>
                                    <span>1234.56</span>
                                </li>
                                <li>
                                    <span>5</span>
                                    <span>桃源村0号店</span>
                                    <span>1234.56</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tabs-footer">
                    <div class="card-box-wrap">
                        <span class="card-box-prev" @click="toPrev" v-if="showCardnp">
                            <i class="el-icon-arrow-left"></i>
                        </span>
                        <span class="card-box-next" @click="toNext" v-if="showCardnp">
                            <i class="el-icon-arrow-right"></i>
                        </span>
                        <div class="card-box-scroll" ref="cardScroll">
                            <div class="card-box-lis" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                                <div class="card-box-li" :class="{ 'active': activeItem === index }" v-for="(item,index) in editableTabs" :key="index" @click="toActiveItem(index)">
                                    <div class="tit">{{item.name}}</div>
                                    <div class="cons clearfix">
                                        <div class="li-left fl">
                                            <p>对接率</p>
                                            <p>{{item.value}}</p>
                                        </div>
                                        <div class="li-right fl">
                                            <div :ref="item.name + index" style="height: 80px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'home',
    components: {
    },
    data () {
        return {
            bosOption1: {
                grid: {
                    left: 0,
                    bottom: 0,
                    top: 5
                },
                tooltip: {
                    formatter: '{b0}: {c0}<br />{b1}: {c1}',
                    backgroundColor: '#ccc',
                    borderColor: '#111',
                    textStyle: {
                        color: '#222'
                    },
                    padding: 2
                },
                xAxis: {
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'bar',
                    itemStyle: {
                        color: '#33ABFB'
                    },
                    data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
                }]
            },
            bosOption2: {
                grid: {
                    left: 0,
                    bottom: 0,
                    top: 5
                },
                tooltip: {
                    show: true,
                    formatter: '{b0}: {c0}<br />{b1}: {c1}',
                    backgroundColor: '#ccc',
                    borderColor: '#111',
                    textStyle: {
                        color: '#222'
                    },
                    padding: 2
                },
                xAxis: {
                    type: 'category',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                },
                yAxis: {
                    show: false,
                    position: 'left'
                },
                series: [{
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    showSymbol: false,
                    itemStyle: {
                        color: '#8543E0'
                    },
                    areaStyle: {},
                    data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
                }]
            },
            // 中间表单
            bosTabOption: {
                tooltip: {
                    formatter: '{b0}: {c0}<br />{b1}: {c1}',
                    backgroundColor: '#ccc',
                    borderColor: '#111',
                    textStyle: {
                        color: '#222'
                    },
                    padding: 2
                },
                grid: {
                    left: 50,
                    bottom: 50
                },
                xAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#595959'
                        }
                    },
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#E8E8E8',
                            type: 'dashed'
                        }
                    }
                },
                series: [{
                    type: 'bar',
                    itemStyle: {
                        color: '#33ABFB'
                    },
                    data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
                }]
            },
            // 底下列表
            editableTabs: [
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' },
                { name: '南山区', value: '88%' }
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }],
                onPick: ({ maxDate, minDate }) => {
                    this.choiceDate = minDate.getTime()
                    if (maxDate) {
                        this.choiceDate = ''
                    }
                },
                disabledDate: (time) => {
                    if (this.choiceDate) {
                        const one = 30 * 24 * 3600 * 1000
                        const minTime = this.choiceDate - one
                        const maxTime = this.choiceDate + one
                        return time.getTime() < minTime || time.getTime() > maxTime
                    }
                }
            },
            noticeList: '', // 通告列表
            activeTime: 'week', // 健康档案时间选择
            daterange: '', // 健康档案时间选择
            currentOffset: 0,
            windowSize: 5,
            paginationFactor: 218,
            cardScrollwidth: 0,
            activeItem: 0, // 底下列表选择
            uploadFixDataNumber: 1000000, // 总数
            fixDataWeekRate: -15.22,
            fixDataDayRate: 15.33,
            fixDataAverageValue: 0
        }
    },
    methods: {
        // 获取 维修电子健康档案上传数
        getDataNumber () {
            this.$post('bas/vehicle/fix/uploadFixDataNumber')
                .then(res => {
                    if (res.status === 200) {
                        this.uploadFixDataNumber = res.data
                    }
                })
        },
        // 周同比
        getDataWeekRate () {
            this.$post('bas/vehicle/fix/getFixDataWeekRate')
                .then(res => {
                    if (res.status === 200) {
                        this.fixDataWeekRate = res.data
                    }
                })
        },
        // 日环比
        getDataDayRate () {
            this.$post('bas/vehicle/fix/getFixDataDayRate')
                .then(res => {
                    if (res.status === 200) {
                        this.fixDataDayRate = res.data
                    }
                })
        },
        // 日均上传数
        getDataAverageValue () {
            this.$post('bas/vehicle/fix/getfixDataAverageValue')
                .then(res => {
                    if (res.status === 200) {
                        this.fixDataAverageValue = res.data
                    }
                })
        },
        // 获取通知
        quertNotice () {
            this.$post('external/notice/list', {
                pageNum: 1,
                pageSize: 4
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
        timeFormat (date) {
            // if (!date || typeof(date) === 'string') {
            //     return
            // }
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            if (m < 10) {
                m = '0' + m
            }
            let d = date.getDate()
            if (d < 10) {
                d = '0' + d
            }
            return y + '-' + m + '-' + d
        },
        // 获取这周的周一
        getFirstDayOfWeek (date) {
            let weekday = date.getDay() || 7 // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
            date.setDate(date.getDate() - weekday + 1) // 往前算（weekday-1）天，年份、月份会自动变化
            return this.timeFormat(date)
        },
        // 获取当月第一天
        getFirstDayOfMonth (date) {
            date.setDate(1)
            return this.timeFormat(date)
        },
        // 获取当年第一天
        getFirstDayOfYear (date) {
            date.setDate(1)
            date.setMonth(0)
            return this.timeFormat(date)
        },
        // 选择
        chooseTime (val) {
            this.activeTime = val
            if (val === 'week') {
                console.log(this.getFirstDayOfWeek(new Date('2019-7-8')))
                // this.getFirstDayOfWeek(new Date())
                console.log(this.timeFormat(new Date()))
            } else if (val === 'month') {
                console.log(val)
                console.log(this.getFirstDayOfMonth(new Date('2011-1-18')))
            } else if (val === 'year') {
                console.log(val)
            }
        },
        // 时间选择
        extraTimeBlur (val) {
            console.log(val)
            console.log(this.daterange, 'daterange')
        },
        // 通告更多
        toNotoMore () {
            this.$router.push('/notice')
        },
        // 通告详情
        toNotoDetail (id) {
            this.$router.push('/checkNotice?noticeId=' + id)
        },
        // footer
        // 画圆
        drawRound () {
            let rounds = this.editableTabs
            let label1 = {
                normal: {
                    color: 'rgba(0,150,250,0.3)'
                }
            }
            let label2 = {
                normal: {
                    color: 'rgba(211,211,211,0.8)'
                }
            }
            let optionss = {
                // title: {
                //     x: 'center',
                //     y: 'center',
                //     textStyle: {
                //         fontWeight: 'normal',
                //         color: '#0580f2',
                //         fontSize: '12'
                //     }
                // },
                color: 'rgba(0,150,250,0.6)',
                legend: {
                    show: false
                },
                series: [
                    {
                        name: '上传数',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        label: {
                            show: false
                        },
                        data: [
                            { value: 80, name: '01', itemStyle: label1 },
                            { value: 20, name: '02', itemStyle: label2 }
                        ]
                    }
                ]
            }
            for (let i = 0; i < rounds.length; i++) {
                if (this.activeItem === i) {
                }
                let names = rounds[i].name + [i]
                let dom = this.$refs[names][0]
                let chartss = echarts.init(dom)
                chartss.setOption(optionss)
            }
        },
        // 切换
        toActiveItem (index) {
            this.activeItem = index
        },
        // 向左移动--
        toPrev () {
            this.moveCarousel(-1)
        },
        // 向右移动
        toNext () {
            this.moveCarousel(1)
        },
        moveCarousel (direction) {
            if (direction === 1 && !this.atEndOfList) {
                this.currentOffset -= this.paginationFactor
            } else if (direction === -1 && !this.atHeadOfList) {
                this.currentOffset += this.paginationFactor
            }
        },
        //  ----------------------
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
        }
    },
    computed: {
        atEndOfList () {
            return this.currentOffset <= (this.paginationFactor * -1) * (this.editableTabs.length - this.windowSize)
        },
        atHeadOfList () {
            return this.currentOffset === 0
        },
        showCardnp () {
            return 2 * (this.paginationFactor - 24) + (this.editableTabs.length - 2) * this.paginationFactor >= this.cardScrollwidth
        }
    },
    created () {
        // this.getDataNumber()
        // this.getDataWeekRate()
        // this.getDataDayRate()
        // this.getDataAverageValue()
        //  -----------
        // this.getCount()
        // this.quertNotice()
        // this.getFixCountByVehicle()
        // this.getFixCountByEnterprise()
        // this.$post('bas/city/findRegionByDomainCity', {}).then(res => {
        //     if (res.status === 200) {
        //         localStorage.regionList = JSON.stringify(res.datas)
        //     } else {
        //         this.$alert(res.message, '提示')
        //     }
        // })
    },
    mounted () {
        this.drawRound()
        // this.queryData('all', 'enterpriseRegion')
        // this.queryData2('all', 'enterpriseRegion')
        let bosechart1 = echarts.init(document.getElementById('bosChart1'))
        bosechart1.setOption(this.bosOption1)
        let bosechart2 = echarts.init(document.getElementById('bosChart2'))
        bosechart2.setOption(this.bosOption2)
        let bosTabChart = echarts.init(document.getElementById('bosTabChart'))
        bosTabChart.setOption(this.bosTabOption)
        this.cardScrollwidth = this.$refs.cardScroll.offsetWidth
        this.windowSize = (this.$refs.cardScroll.offsetWidth - 2 * 194) / this.paginationFactor + 2
        window.onresize = () => {
            this.windowSize = (this.$refs.cardScroll.offsetWidth - 2 * 194) / this.paginationFactor + 2
            bosechart1.resize()
            bosechart2.resize()
            bosTabChart.resize()
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    height: 100%;
    background: #EDF0F5;
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        .bos-row {
            position: relative;
            margin-right: 0;
            height: auto;
            zoom: 1;
            display: block;
            box-sizing: border-box;
            .bos-col-sm {
                padding: 12px 12px 24px;
            }
        }
    }
}
.bos-card {
    font-family:'微软雅黑', 'Microsoft Yahei', sans-serif;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border-radius: 2px;
    position: relative;
    transition: all .3s;
    text-align: left;
    .card-body {
        padding: 20px 24px 8px;
        .chart-card-header {
            position: relative;
            overflow: hidden;
            width: 100%;
            .meta {
                color: rgba(0,0,0,.45);
                font-size: 14px;
                line-height: 22px;
            }
            .total {
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
                color: #000;
                margin-top: 4px;
                margin-bottom: 0;
                font-size: 30px;
                line-height: 38px;
                height: 38px;
            }
        }
        .chart-card-content {
            margin-bottom: 12px;
            position: relative;
            height: 46px;
            width: 100%;
            .content-fix {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                .chart-trend {
                    margin-right: 16px;
                    display: inline-block;
                    font-size: 14px;
                    line-height: 22px;
                    .chart-trend-icon {
                        font-size: 12px;
                    }
                    .up {
                        color: #f5222d;
                    }
                    .down {
                        color: #52c41a;
                    }
                }
            }
            .icon-prompt-s {
                width: 10px;
                height: 10px;
                margin: 0 5px;
            }
        }
        .chart-card-footer{
            border-top: 1px solid #e8e8e8;
            padding-top: 9px;
            margin-top: 8px;
        }
    }
    .card-body-top {
        line-height: 33px;
        padding: 0 10px;
        border-bottom: 1px solid #E8E8E8;
        .chart-card-title {
            font-size: 14px;
            color: #000;
        }
        .chart-card-action {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 10px;
        }
    }
    .card-body-con {
        height: 147px;
        padding: 0 10px;
        .noto-li {
            height: 36px;
            line-height: 36px;
            position: relative;
            cursor: pointer;
            .noto-text {
                width: 100%;
                display: inline-block;
                color: #323B4E;
                padding-right: 60px;
                box-sizing: border-box;
                word-break:keep-all;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .noto-time {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 12px;
                color: #8A9CC2;
            }
        }
        .no-notice {
            text-align: center;
            padding-top: 50px;
        }
    }
}
.boxs-tab {
    margin: 0 10px;
}
.bos-card {
    .tabs-bar {
        padding: 0 20px;
        border-bottom: 1px solid #E8E8E8;
        margin-bottom: 24px;
        .tabs-tit {
            font-weight: 600;
            line-height: 50px;
            font-size: 16px;
            color: rgba(0,0,0,0.65);
        }
        .extra-wrap {
            line-height: 50px;
            display: inline-block;
            margin-right: 24px;
            span {
                margin-left: 24px;
                color: rgba(0,0,0,0.65);
                background-color: transparent;
                text-decoration: none;
                outline: none;
                cursor: pointer;
                transition: color .3s;
                &.active {
                    color: #1890FF;
                }
            }
        }
        .extra-time {
            width: 280px;
            display: inline-block;
        }
    }
    .tabs-content {
        .bos-col-m {
            float: left;
            box-sizing: border-box;
            .title {
                position: relative;
                margin-bottom: 10px;
                h4 {
                    display: inline-block;
                    color: #000000;
                    font-size: 14px;
                }
                span {
                    position: absolute;
                    right: 0;
                    color: #8C8C8C;
                    font-size: 12px;
                }
            }
            .pd30 {
                padding-left: 30px;
            }
            .rank {
                padding: 0 32px 32px 72px;
                .list {
                    margin: 25px 0 0;
                    overflow: hidden;
                    padding: 0;
                    list-style: none;
                    li {
                        margin-top: 16px;
                        span:first-child{
                            background-color: #F0F2F5;
                            color: rgba(0,0,0,0.65);
                            border-radius: 20px;
                            display: inline-block;
                            font-size: 12px;
                            font-weight: 600;
                            margin-right: 24px;
                            height: 20px;
                            line-height: 20px;
                            width: 20px;
                            text-align: center;
                        }
                        span:last-child{
                            float: right;
                        }
                        span {
                            &.active {
                                background-color: #1890FF;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
    .tabs-footer {
        padding: 20px;
        box-sizing: border-box;
    }
}

.card-box-wrap {
    box-sizing: border-box;
    position: relative;
    padding: 0 20px;
    .card-box-prev, .card-box-next {
        position: absolute;
        cursor: pointer;
        line-height: 120px;
        font-size: 16px;
        color: #909399;
        border-radius: 4px;
        &:hover {
            background: #d3d3d3;
        }
    }
    .card-box-prev {
        left: 0;
    }
    .card-box-next {
        right: 0;
    }
    .card-box-scroll {
        overflow: hidden;
        .card-box-lis {
            position: relative;
            transition: transform .3s;
            float: left;
            z-index: 2;
            white-space: nowrap;
            .card-box-li {
                display: inline-block;
                background:#fff;
                width: 170px;
                margin: 0 24px;
                &.active {
                    border-top: 2px solid #1890FF;
                    .tit {
                        color:#1890FF;
                    }
                    .cons {
                        p:last-child {
                            color: #000000;
                        }
                    }
                }
                .tit {
                    line-height: 40px;
                    padding-left: 16px;
                    font-size: 16px;
                    color:rgba(0,0,0,0.65);
                }
                .cons {
                    .li-left {
                        width: 50%;
                        padding: 10px 0 15px 16px;
                        box-sizing: border-box;
                        color:rgba(0,0,0,0.45);
                        p:first-child {
                            font-size: 14px;
                        }
                        p:last-child {
                            font-size: 24px;
                        }
                    }
                    .li-right {
                        width: 80px;
                        height: 80px;
                    }
                }
                &:first-child {
                    margin-left: 0;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
@media (min-width: 1200px) {
    .bos-col-sm {
        display: block;
        box-sizing: border-box;
        width: 25%;
        float: left;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }
    .col-fl {
        display: block;
        width: 66%;
    }
    .col-fr {
        display: block;
        width: 33%;
    }
}
@media (min-width: 768px) and (max-width: 1200px) {
    .bos-col-sm {
        display: block;
        box-sizing: border-box;
        width: 50%;
        float: left;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }
    .col-fl {
        display: block;
        width: 50%;
    }
    .col-fr {
        display: block;
        width: 50%;
    }
}
</style>
