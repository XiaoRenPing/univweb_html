<template>
    <div class="detailSearch">
        <div class="content">
            <!-- <tool-bar>
                <span slot="center">
                    <el-radio v-model="activeName" label="first" class="radioo f16">区域数据查询</el-radio>
                    <el-radio v-model="activeName" label="second" class="radioo f16">车辆归档查询</el-radio>
                </span>
            </tool-bar> -->
            <div class="sec-level clearfix">
                <div class="level-lis fl" :class="{'active': activeName==='first'}" @click="toChooseLis('first')" to="/creditEva/applyAudit">
                    <div>区域数据查询</div>
                </div>
                <div class="level-lis fl" :class="{'active': activeName==='second'}" @click="toChooseLis('second')" to="/creditEva/process">
                    <div>车辆归档查询</div>
                </div>
            </div>
            <div class='wrap'>
                <div class="pane">
                    <div label="区域数据查询" name="first" class="pane1" v-show="activeName==='first'">
                        <div class="pane-left">
                            <div class="side_item" @click="select(index, i.regionId)" :class="{active: index == chooseId}" v-for="(i,index) in sideList" :key="i.id">{{i.regionName}}</div>
                        </div>
                        <div class="pane-right">
                            <!-- <tool-bar :title="''">
                                <label>企业名称：</label>
                                <el-input class="tool_ipt" v-model="companyName" placeholder="请输入内容"></el-input>
                                <label>&nbsp;&nbsp;VIN码：</label>
                                <el-input class="tool_ipt" v-model="vinCode" placeholder="请输入内容"></el-input>
                                <label>上传时间：&nbsp;</label>
                                <el-date-picker
                                v-model="uploadDate"
                                class="w240"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="search"></el-button>
                            </tool-bar> -->
                            <div class="table_top table_top_m">
                                <div class="table_top_l clearfix">
                                    <div class="table_top_ls table_one_line">
                                        <label>企业名称：</label>
                                        <el-input class="tool_ipt" v-model="companyName" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="table_top_ls table_one_line">
                                        <label>VIN码：</label>
                                        <el-input class="tool_ipt" v-model="vinCode" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="table_top_ls table_one_line">
                                        <label>上传时间：</label>
                                        <el-date-picker
                                        v-model="uploadDate"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                    <div class="table_top_lr fr table_one_line">
                                        <el-button class="query_btn slects_btn" @click="search">查询</el-button>
                                        <el-button class="react_btn" @click="toReact">重置</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-box">
                                <el-table
                                    :data="dataList"
                                    v-loading="loading"
                                    height="550"
                                    :header-cell-style="{'text-align':'center'}"
                                    :cell-style="{'text-align':'center'}"
                                    :stripe="false"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="num"
                                        label="序号"
                                        width="60"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="uploadTime"
                                        label="上传时间"
                                        width="100"
                                        >
                                        <template slot-scope="scope">
                                            {{scope.row.uploadTime | filterTime('yyyy-mm-dd')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="companyName"
                                        label="上传企业"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="plateNumber"
                                        label="车牌号码"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleLicensePlateColor"
                                        label="车牌颜色"
                                        width="80"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vin"
                                        label="VIN码"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="repairMileage"
                                        label="送修里程"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="repairDate"
                                        label="送修日期"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="settleDate"
                                        label="结算日期"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="faultDescription"
                                        label="故障描述"
                                        width="120"
                                        show-overflow-tooltip
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="操作"
                                        width="">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="editNotice(scope.row.FixId)">详情</el-button>
                                            <!-- <el-button type="text" size="small" @click="deleteNotice(1)">删除</el-button> -->
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="page_box">
                                <el-pagination
                                    @size-change="regionSizeChange"
                                    @current-change="regionCurrentChange"
                                    :current-page="regionPageNum"
                                    :page-sizes="[10, 15, 20, 25]"
                                    :page-size="regionPageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="regionTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div label="车辆归档查询" name="second" class="pane2" v-show="activeName==='second'">
                        <div class="pane-right2">
                            <!-- <tool-bar :title="'车辆归档查询'">
                                <label for="">车牌号码</label>
                                <el-input class="tool_ipt" v-model="plateNumber" placeholder="请输入内容"></el-input>
                                <label for="">VIN码</label>
                                <el-input class="tool_ipt" v-model="vin" placeholder="请输入内容"></el-input>
                                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="search2"></el-button>
                            </tool-bar> -->
                            <div class="table_top table_tap_pad">
                                <div class="table_top_l clearfix">
                                    <div class="table_top_ls table_two_line">
                                        <label for="">车牌号码：</label>
                                        <el-input class="tool_ipt" v-model="plateNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="table_top_ls table_two_line">
                                        <label for="">VIN码：</label>
                                        <el-input class="tool_ipt" v-model="vin" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="table_top_lr fr table_two_line">
                                        <el-button class="query_btn slects_btn" @click="search2">查询</el-button>
                                        <el-button class="react_btn" @click="toReact">重置</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-box">
                                <el-table
                                    :data="dataList2"
                                    v-loading="loading2"
                                    height="550"
                                    :header-cell-style="{'text-align':'center'}"
                                    :cell-style="{'text-align':'center'}"
                                    :stripe="false"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="num"
                                        label="序号"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="companyName"
                                        label="维修企业"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleLicensePlate"
                                        label="车牌号码"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleVin"
                                        label="VIN码"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleFixMileage"
                                        label="送修里程"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleFixDate"
                                        label="送修日期"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleFixBalanceDate"
                                        label="结算日期"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleFixDescription"
                                        label="故障描述"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="操作"
                                        width="">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="editNotice(scope.row.vehicleFixId)">详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="page_box">
                                <el-pagination
                                    @size-change="carSizeChange"
                                    @current-change="carCurrentChange"
                                    :current-page="carPageNum"
                                    :page-sizes="[10, 15, 20, 25]"
                                    :page-size="carPageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="carTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal :alert="alert" :title="alertTitle" :width="450" :height="242" @alertConfirm="alertConfirm" @alertCancel="alertCancel">
            <div class="alert-content clearfix">
                <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="refuseMsg"
                    class="textarea">
                </el-input>
            </div>
            <div class="btn">
                <el-button class="search_btn" type="primary" @click="alertConfirm" v-text="'确定'"></el-button>
                <el-button class="search_btn" @click="alertCancel" v-text="'取消'"></el-button>
                <!-- <img src="." alt=""> -->
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
            <!-- <el-button type="primary" @click="addRecord" :disabled="!$checkAuth('manage:enterprise:addentrecord')">保存</el-button>
            <button class="back_btn" @click="goBack">返回</button> -->
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import ToolBar from '@/components/ToolBar.vue'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
import { plateColor } from '@/utils/type.js'
export default {
    name: 'detailSearch',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '维修记录查询', path: '' }
            ],
            companyName: '', // 企业名称
            vinCode: '', // vin码
            plateNumber: '', // 车牌号码 tab2
            vin: '', // vin tab2
            total: 0,
            pageSize: 10,
            pageNum: 1,
            radio2: '',
            radio: 1,
            uploadDate: [],
            currentPage: 1,
            dataList: [],
            dataList2: [],
            loading: false,
            loading2: false,
            tableData3: [1],
            chooseId: '', // 选中区域
            sideList: [],
            carColorList: plateColor, // 车牌颜色列表
            dataObj: '', // 全部信息
            input: '',
            value: '',
            businessHours: '',
            validityTime: '',
            enterpriseRegion: '',
            regionId: 'all', // 选中的区域id
            textarea: '',
            activeName: 'first',
            alert: false,
            alertTitle: '企业备案拒绝',
            refuseMsg: '',
            regionPageNum: 1,
            regionPageSize: 10,
            regionTotal: 0,
            carPageNum: 1,
            carPageSize: 10,
            carTotal: 0
        }
    },
    created () {
        this.queryData()
        this.findLoginRegion()
    },
    watch: {
        activeName (val) {
            this.dataList = []
            this.pageNum = 1
            if (val === 'second') {
                this.queryData2()
                setTimeout(() => {
                    this.radio = '1'
                }, 100)
            } else {
                this.queryData()
            }
        }
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar,
        ToolBar,
        Modal
    },
    // 方法
    methods: {
        search () {
            this.pageNum = 1
            this.queryData()
        },
        search2 () {
            this.pageNum = 1
            this.queryData2()
        },
        // 查看详情
        editNotice (id) {
            this.$router.push('/workDetail?vehicleId=' + id)
        },
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findLoginRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        res.datas.unshift({
                            regionId: '',
                            regionName: '全部区域'
                        })
                        this.sideList = res.datas
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 区域数据查询
        queryData () {
            this.loading = true
            this.$post('/bas/vehicle/fix/fixlist', {
                'uploadStartDate': (this.uploadDate && this.uploadDate.length && this.uploadDate[0]) || '',
                'uploadEndDate': (this.uploadDate && this.uploadDate.length && this.uploadDate[1]) || '',
                'pageNum': this.regionPageNum,
                'pageSize': this.regionPageSize,
                'enterpriseRegion': this.enterpriseRegion,
                'permissions': '',
                'vin': this.vinCode,
                'companyName': this.companyName,
                'plateNumber': ''
            }).then(res => {
                if (res.status === 200) {
                    res.data.forEach(item => {
                        this.carColorList.forEach(itemB => {
                            if (item.vehicleLicensePlateColor === itemB.value) {
                                item.vehicleLicensePlateColor = itemB.label
                            }
                        })
                    })
                    this.dataList = setNum(res.data, this.regionPageNum, this.regionPageSize)
                    this.regionTotal = res.total
                } else {
                    this.$alert(res.message, '提示')
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
                this.$alert('网络错误，请重试！', '提示')
                console.log(err)
            })
        },
        // 车辆归档查询
        queryData2 () {
            this.loading2 = true
            this.$post('/bas/vehicle/fix/fixrecordlist', {
                'plateNumber': this.plateNumber,
                'vin': this.vin,
                pageSize: this.carPageSize,
                pageNum: this.carPageNum
            }).then(res => {
                if (res.status === 200) {
                    this.dataList2 = setNum(res.data, this.carPageNum, this.carPageSize)
                    this.carTotal = res.total
                } else {
                    this.$alert(res.message, '提示')
                }
                this.loading2 = false
            }).catch(err => {
                this.$alert('网络错误，请重试', '提示')
                this.loading2 = false
                console.log(err)
            })
        },
        alertConfirm () {
            this.alert = false
        },
        alertCancel () {
            this.alert = false
        },
        adopt () {},
        handleClick () {},
        refuse () {
            this.alert = true
        },
        // 车辆数据选择页面条数
        carSizeChange (val) {
            this.carPageSize = val
            this.carPageNum = 1
            this.queryData2()
        },
        // 车辆数据选择页数
        carCurrentChange (val) {
            this.carPageNum = val
            this.queryData2()
        },
        // 区域数据选择页面条数
        regionSizeChange (val) {
            this.regionPageSize = val
            this.regionPageNum = 1
            this.queryData()
        },
        // 区域数据选择页数
        regionCurrentChange (val) {
            this.regionPageNum = val
            this.queryData()
        },
        handleSizeChange (val) {
            this.pageNum = 1
            this.pageSize = val
            if (this.activeName === 'second') {
                this.queryData2()
            } else {
                this.queryData()
            }
        },
        handleCurrentChange (val) {
            this.pageNum = val
            if (this.activeName === 'second') {
                this.queryData2()
            } else {
                this.queryData()
            }
        },
        // 选区域
        select (index, id) {
            this.chooseId = index
            this.enterpriseRegion = id
            this.queryData()
        },
        toChooseLis (val) {
            this.activeName = val
        },
        // 重置
        toReact () {
            this.companyName = ''
            this.vinCode = ''
            this.uploadDate = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.detailSearch {
    background-color: #fff;
    .tab-box {
        border: 1px solid #dddddd;
    }
    .page_box {
        background: #f7f8f9;
        padding-top: 10px;
        height: 53px;
        border: 1px solid #dddddd;
        border-top: none;
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        .sec-level {
            height: 44px;
            background-color: #EDF0F5;
            .level-lis {
                cursor:pointer;
                background: #ffffff;
                box-sizing: border-box;
                line-height: 38px;
                font-size: 14px;
                margin-right: 10px;
                color: #595959;
                padding: 0 25px;
                border-radius:3px 3px 0px 0px;
                border-top: 3px solid #ffffff;
                border-bottom: 3px solid #ffffff;
                &.active {
                    border-top: 3px solid #3E94FE;
                    color: #3E94FE;
                }
            }
        }
    }
}
.search_btn {
    margin-left: 10px;
}
.wrap {
    padding-bottom: 100px;
}
.table_one_line {
    width: 25%;
}
.table_two_line {
    // width: 33%;
}
.pane {
    top: 66px;
    width: 100%;
    bottom: 0;
    overflow: auto;
    .pane-left {
        width: 220px;
        border-right: 1px solid #E8E8E8;
        position: absolute;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
    }
    .pane-right {
        top: 0;
        bottom: 0;
        margin-left: 220px;
        right: 0;
        .table_top_m {
            padding: 25px 30px;
        }
        .tab-box {
            padding: 0 30px;
        }
    }
    .pane-right2 {
        padding: 0 30px;
        .tab-bar {
            height: 75px;
            line-height: 75px;
            text-align: right;
            label {
                margin: 0 10px 0 20px;
            }
            .tool_ipt {
                width: 140px;
            }
        }
        .table_tap_pad {
            padding: 25px 0;
        }
    }
    .pane1 {
        overflow: auto;
        position: relative;
        left: 0;
        width: 100%;
        top: 0;
        bottom: 0;
        .pane-left {
            padding-top: 20px;
            .side_item {
                width: 160px;
                height: 30px;
                border-radius: 4px;
                margin: 10px auto 0;
                line-height: 32px;
                border: 1px solid #dddddd;
                color: #595959;
                font-size: 14px;
                cursor: pointer;
                &:nth-child(1) {
                    margin-top: 0;
                }
                &.active {
                    background: #1790FF;
                    border: 1px solid #1790FF;
                    color: #ffffff;
                }
            }
        }
        .pane-right {
            padding: 0 5px;
            .tab-bar {
                padding-right: 15px;
                height: 74px;
                line-height: 74px;
                text-align: right;
                .tool_ipt {
                    width: 120px;
                    margin: 0 15px;
                }
            }
        }
    }
    .pane2 {
        // position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        bottom: 0;
        overflow: auto;
        .pane-left {
            label {
                display: block;
                width: 200px;
                margin: 0 auto;
                text-align: left;
                margin-bottom: 10px;
                font-size: 14px;
                color: #666666;
            }
            .tool_ipt {
                width: 200px;
            }
            .search-btn {
                cursor: pointer;
                margin-top: 20px;
                width: 200px;
                height: 40px;
                border: none;
                border-radius: 4px;
                background: #359dff;
                color: #ffffff;
            }
            .radioo {
                color: #333333;
                font-weight: bold;
                font-size: 16px;
                margin-top: 10px;
                margin-bottom: 10px;
                text-align: center;
            }
        }
        .pane-right {
            .tab-bar {
                padding-right: 15px;
                height: 74px;
                line-height: 74px;
                // float: right;
                text-align: right;
            }
            padding: 0 5px;
        }
    }
}
.table_box {
    padding: 30px 20px;
    .table {
        border-collapse:collapse;
        tr {
            td {
                border: 1px solid #ddd;
                font-size: 14px;
                font-weight: normal;
                height: 40px;
            }
            .title {
                color: #666;
                text-align: right;
                width: 126px;
            }
            .msg {
                color: #333;
                text-align: left;
                width: 376px;
                padding-left: 10px;
            }
        }
        .info {
            .title {
                width: 190px;
            }
            .msg {
                width: 298px;
            }
        }
    }
}
.more-img {
    padding-left: 20px;
    .item {
        float: left;
        margin-right: 66px;
        .title {
            text-align: center;
            font-size: 14px;
            color: #666;
            font-weight: bold;
            margin-bottom: 14px;
        }
        .img {
            width: 186px;
            height: 226px;
            border: 1px solid #ddd;
            padding: 6px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.brand {
    padding: 30px 20px;
    li {
        width: 186px;
        height: 164px;
        padding-top: 12px;
        float: left;
        margin-right: 30px;
        border: 1px solid #ddd;
        img {
            width: 162px;
            height: 120px;
        }
        h6 {
            height: 30px;
            line-height: 30px;
            font-weight: normal;
            font-size: 14px;
            color: #666;
        }
    }
}
.alert-content {
    padding: 30px 0;
    .name {
        float:left;
        width: 134px;
        text-align: right;
        .red {
            color: #ff0000;
        }
    }
    .textarea {
        float: left;
        width: 250px;
        height: 68px;
    }
    .btn {
        padding-left: 82px;
        .el-button{
            width: 98px;
            height: 34px;
            line-height: 34px;
            padding: 0;
            margin-right: 30px;
        }
    }
}
</style>
<style lang="less">
.detailSearch {
    .el-tabs--border-card{
        border: none;
        box-shadow: none;
        width: 100%;
    }
    .el-tabs__header{
        background-color: #fff;
        margin: 0px;
    }
    .car-info .el-input {
        width: 345px;
    }
    .car-info .el-input__inner {
        height: 34px;
    }
    .el-table .blue {
        background: #F0F5F8;
    }
    .audit-btn .el-textarea {
        width: 500px;
    }
    .audit-btn .el-textarea__inner {
        width: 500px;
        height: 78px;
        resize: none;
    }
    .el-tabs--card >.el-tabs__header .el-tabs__nav {
        border: none;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        margin-left: 20px;
        border-radius: 0;
    }
    .el-tabs__item {
        width: 128px;
        height: 52px;
        line-height: 52px;
        padding: 0 30px;
    }
    .el-textarea__inner {
        resize: none;
        height: 68px;
    }
    .el-tabs__content {
        position: absolute;
        top:0;
        bottom: 0;
        width: 100%;
        left: 0;
    }
    .el-date-editor {
        overflow: hidden;
    }
    .el-date-editor .el-range-input {
        width: 30%;
    }
}
</style>
