<template>
    <div class="workDetail">
        <div class="content">
            <div class='wrap'>
                <div class="innner">
                    <h3 class="h3">维修信息</h3>
                    <table class="table1 tableBorder" width="1000">
                        <tr>
                            <td width="120">车牌号码：</td>
                            <td width="380">{{obj.vehicleLicensePlate}}</td>
                            <td width="120">车牌颜色：</td>
                            <td width="380">{{obj.vehicleLicensePlateColor}}</td>
                        </tr>
                        <tr><td for="">VIN码：</td>
                            <td>{{obj.vehicleVin}}</td>
                            <td for="">送修日期：</td>
                            <td>{{vehicleFix.vehicleFixDate}}</td>
                        </tr>
                        <tr>
                            <td for="">送修里程：</td>
                            <td>{{vehicleFix.vehicleFixMileage}}</td>
                            <td for="">结算日期：</td>
                            <td>{{vehicleFix.vehicleFixBalanceDate | filterTime('yyyy-mm-dd')}}</td>
                        </tr>
                        <tr><td for="">结算清单编号：</td>
                            <td>{{vehicleFix.vehicleFixBalanceNumber}}</td>
                            <td for="">故障信息：</td>
                            <td>{{vehicleFix.vehicleFixDescription}}</td>
                        </tr>
                        <tr>
                            <td for="">维修企业名称：</td>
                            <td>{{cobj.enterpriseName}}</td>
                            <td for="">企业联系人：</td>
                            <td>{{cobj.enterpriseLinkName}}</td>
                        </tr>
                        <tr><td for="">企业联系电话：</td>
                            <td>{{cobj.enterpriseLinkMobile}}</td>
                            <td for="">维修企业地址：</td>
                            <td>{{cobj.enterpriseAddr}}</td>
                        </tr>
                    </table>
                    <h3 class="h3">维修项目</h3>
                    <el-table
                        :data="fixProjectList"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 1000px">
                        <el-table-column
                            prop="vehicleFixProjectName"
                            label="维修项目"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixWorkingHours"
                            label="工时"
                            >
                        </el-table-column>
                    </el-table>
                    <h3 class="h3">使用配件</h3>
                    <el-table
                        :data="partList"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 1000px">
                        <el-table-column
                            prop="vehiclePartsName"
                            label="配件名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsNumber"
                            label="配件编号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsNum"
                            label="使用数量"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
            <el-button class="react_btn" @click="$router.push('/detailSearch')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import { plateColor } from '@/utils/type.js'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'workDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '维修记录查询', path: '' }, { title: '维修记录详情', path: '' }
            ],
            fixProjectList: [],
            partList: [],
            obj: '', // 详情
            carColorList: plateColor, // 车牌颜色列表
            aobj: {},
            cobj: {}, // 企业信息
            vehicleFix: {},
            activeName: 'first',
            pageNum: 1,
            pageSize: 10
        }
    },
    created () {
        this.$post('/bas/vehicle/fix/vehiclefixdetail', {
            'data': {
                'vehicleFixId': this.$route.query.vehicleId
            }
        }).then(res => {
            if (res.status === 200) {
                if (res.data.vehicle) {
                    this.carColorList.forEach(item => {
                        if (res.data.vehicle.vehicleLicensePlateColor === item.value) {
                            res.data.vehicle.vehicleLicensePlateColor = item.label
                        }
                    })
                    this.obj = res.data.vehicle
                }
                if (res.data.enterprise) {
                    try {
                        var user = JSON.parse(getCookie('user'))
                        if (!user.roleExtEnterpriseLinkpersonIsview) {
                            res.data.enterprise.enterpriseLinkName = '******'
                            res.data.enterprise.enterpriseLinkMobile = '******'
                        }
                    } catch (e) {
                        res.data.enterprise.enterpriseLinkName = '******'
                        res.data.enterprise.enterpriseLinkMobile = '******'
                    }
                    this.cobj = res.data.enterprise
                }
                this.vehicleFix = res.data.vehicleFix
                this.fixProjectList = res.data.fixProjectList
                this.partList = res.data.partList
            }
        }).catch(err => {
            console.log(err)
        })
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
    watch: {},
    methods: {
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.workDetail {
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
    }
    .wrap {
        min-height: 700px;
        padding-bottom: 100px;
    }
}
.innner {
    padding: 0 20px 20px 20px;
    .h3 {
        font-size: 14px;
        color: #000000;
        text-align: left;
        padding: 12px;
    }
}
.table1 {
    font-size: 14px;
    line-height: 40px;
    td:nth-child(2n-1) {
        color: #000000;
        text-align: right;
    }
    td:nth-child(2n) {
        padding-left: 20px;
        text-align: left;
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
.workDetail {
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
    .toolBar .el-button{
        width: 98px;
        height: 34px;
        line-height: 30px;
        padding: 0;
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
}
</style>
