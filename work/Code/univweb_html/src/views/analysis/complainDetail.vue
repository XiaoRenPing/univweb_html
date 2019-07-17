<template>
    <div class="complainDetail">
        <div class="content">
            <div class='wrap'>
                <div class="inner">
                    <h3 class="h3">基本信息</h3>
                    <div class="table">
                        <table class="table-inner tableBorder" width="1000">
                            <tr>
                                <td width="120">车主姓名：</td>
                                <td width="380">{{allData.ownerPersonName||allData.ownerNickName}}</td>
                                <td width="120">手机号码：</td>
                                <td width="380">{{allData.ownerMoile}}</td>
                            </tr>
                            <tr>
                                <td>车牌号码：</td>
                                <td>{{allData.vehicleLicensePlate}}</td>
                                <td>VIN码：</td>
                                <td>{{allData.vehicleVin}}</td>
                            </tr>
                            <tr>
                                <td>评价星级：</td>
                                <td>{{allData.grade}}星</td>
                                <td>评价等级：</td>
                                <td>{{allData.grade | filterCommon(evaluateLevel)}}</td>
                            </tr>
                            <tr>
                                <td>评价日期：</td>
                                <td>{{allData.createTime | filterTime('yyyy-mm-dd')}}</td>
                                <td>企业名称：</td>
                                <td>{{allData.enterpriseName}}</td>
                            </tr>
                            <tr>
                                <td>结算清单编号：</td>
                                <td colspan="3">{{allData.vehicleFixBalanceNumber}}</td>
                            </tr>
                            <tr>
                                <td>
                                    <ul>
                                        <li>维修质量：</li>
                                        <li>维修效率：</li>
                                        <li>价格透明度：</li>
                                        <li>店面环境：</li>
                                        <li>综合评分：</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>
                                            <el-rate
                                                class="rate"
                                                style="display:inline-block;"
                                                v-model="allData.quality"
                                                disabled
                                                :disabled-void-color="'#cccccc'"
                                                :colors="['#E83648', '#E83648', '#E83648']">
                                            </el-rate>
                                        </li>
                                        <li>
                                            <el-rate
                                                class="rate"
                                                style="display:inline-block;"
                                                v-model="allData.efficiency"
                                                disabled
                                                :disabled-void-color="'#cccccc'"
                                                :colors="['#E83648', '#E83648', '#E83648']">
                                            </el-rate>
                                        </li>
                                        <li>
                                            <el-rate
                                                class="rate"
                                                style="display:inline-block;"
                                                v-model="allData.price"
                                                disabled
                                                :disabled-void-color="'#cccccc'"
                                                :colors="['#E83648', '#E83648', '#E83648']">
                                            </el-rate>
                                        </li>
                                        <li>
                                            <el-rate
                                                class="rate"
                                                style="display:inline-block;"
                                                v-model="allData.environment"
                                                disabled
                                                :disabled-void-color="'#cccccc'"
                                                :colors="['#E83648', '#E83648', '#E83648']">
                                            </el-rate>
                                        </li>
                                        <li>
                                            <el-rate
                                                class="rate"
                                                style="display:inline-block;"
                                                v-model="allData.grade"
                                                disabled
                                                :disabled-void-color="'#cccccc'"
                                                :colors="['#E83648', '#E83648', '#E83648']">
                                            </el-rate>
                                        </li>
                                    </ul>
                                </td>
                                <td>上传图片：</td>
                                <td id="Box">
                                    <div class="img-wrap" v-if="allData.img1" @click="setViewer(0)">
                                        <img :src="allData.img1">
                                    </div>
                                    <div class="img-wrap" v-if="allData.img2" @click="setViewer(1)">
                                        <img :src="allData.img2">
                                    </div>
                                    <div class="img-wrap" v-if="allData.img3" @click="setViewer(2)">
                                        <img :src="allData.img3">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>车主评价内容：</td>
                                <td colspan="3" class="td-text">{{allData.comment}}</td>
                            </tr>
                            <tr>
                                <td>企业回复内容：</td>
                                <td colspan="3"  class="td-text">{{allData.enterpriseComment}}</td>
                            </tr>
                        </table>
                    </div>
                    <h3 class="h3">车辆维修记录</h3>
                    <el-table
                        :data="tab1"
                        style="width: 1000px"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}">
                        <el-table-column
                            prop="vehicleFixBalanceDate"
                            label="送修日期"
                            width="100">
                            <template slot-scope="scope">
                                {{scope.row.vehicleFixBalanceDate | filterTime('yyyy-mm-dd')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixCategory"
                            label="维修类别"
                            width="80">
                            <template slot-scope="scope">
                                {{scope.row.vehicleFixCategory | filterCommon(repairType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixMileage"
                            label="送修里程(公里)">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixDescription"
                            label="故障描述"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixUnit"
                            label="维修单位"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixCertificateNumber"
                            label="竣工合格证编号">
                        </el-table-column>
                    </el-table>
                    <h3 class="h3">部件更换记录</h3>
                    <el-table
                        :data="tab2"
                        style="width: 1000px;margin-bottom:30px;"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}">
                        <el-table-column
                            prop="num"
                            label="序号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleChangePartsDate"
                            label="更换日期"
                            width="100">
                                <template slot-scope="scope">
                                    {{scope.row.vehicleChangePartsDate | filterTime('yyyy-mm-dd')}}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsName"
                            label="部件名称">
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsModel"
                            label="型号规格"
                            width="100">
                            <template slot-scope="scope">
                                {{scope.row.vehiclePartsModel}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsNum"
                            label="配件数量"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="vehiclePartsNumber"
                            label="配件编号"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleFixUnit"
                            label="承修单位">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import Viewer from 'viewerjs'
import ToolBar from '@/components/ToolBar.vue'
import Modal from '@/components/Modal.vue'
import { evaluateLevel, repairType } from '@/utils/type.js'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'complainDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '服务评价查询', path: '' }, { title: '服务评价详情', path: '' }
            ],
            tab1: [],
            tab2: [],
            pageSize2: 10,
            pageNum2: 1,
            total2: 0,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            tabIndex: 'tab1',
            viewer: '',
            allData: {},
            value2: 1,
            evaluateLevel,
            repairType,
            showAlert: false,
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            tableData3: [
                { name: '1' }
            ]
        }
    },
    created () {
        this.getCommentDetail(this.$route.query.id)
        this.queryData()
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        ToolBar,
        Sidebar,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        handlePartSizeChange () {

        },
        handlePartSizeChange2 () {

        },
        handlePartCurrentChange2 () {

        },
        handlePartCurrentChange () {

        },
        // 创建照片查看器
        setViewer (index) {
            if (this.viewer) this.viewer.destroy()
            this.viewer = new Viewer(document.querySelector('#Box'))
            this.viewer.view(index)
        },
        queryData () {
            this.$post('fix/comment/findFixRecordByFixId', {
                'data': {
                    'vehicleFixId': this.$route.query.fixId
                }
            }).then(res => {
                if (res.status === 200) {
                    this.tab1.push(res.baseVehicleFix)
                    setNum(res.baseVehicleChangeParts, 1, 50)
                    this.tab2 = res.baseVehicleChangeParts
                }
            })
        },
        // 我的车辆档案
        getCommentDetail (id) {
            this.$post('fix/comment/detail', {
                vehicleFixCommentId: id
            })
                .then(res => {
                    if (res.status === 200) {
                        this.allData = res.data
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$alert('网络错误，请重试！', '提示')
                })
        },
        goBack () {
            // this.$router.go(-1)
            this.$router.push('/complainManage')
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.complainDetail {
    .h3 {
        font-size: 14px;
        text-align: left;
        color: #000000;
        padding: 30px 10px 20px 10px;
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background: #FFF;
        top: 0;
        .wrap {
            padding-bottom: 100px;
            .inner {
                padding: 0 20px;
            }
        }
    }
    .table {
        width: 1000px;
        td {
            line-height: 40px;
            font-size: 14px;
            color: #333;
            &:nth-child(2n-1) {
                text-align: right;
                color: #000000;
                font-size: 14px;
                // width: 330px\9\0!important;
            }
            &:nth-child(2n) {
                text-align: left;
                padding-left: 10px;
                padding-right: 10px;
                color: #333333;
            }
            .img-wrap {
                display: inline-block;
                width: 92px;
                height: 72px;
                padding: 4px;
                border: 1px solid #ddd;
                margin-right: 20px;
                text-align: center;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            li {
                line-height: 30px;
            }
        }
        .td-text {
            line-height: 30px;
        }
        .evaluate {
            padding: 12px;
            line-height: 24px;
        }
    }
}
</style>
