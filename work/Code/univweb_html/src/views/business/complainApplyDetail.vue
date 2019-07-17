<!-- 投诉申请受理详情 -->
<template>
    <div class="complainApplyDetail">
        <!-- <tool-bar :title="'业务操作>投诉受理>详情'">
            <el-button type="primary" @click="adopt" :disabled="!$checkAuth('bas:enterprise:complaint:updateEnterpriseComplaint')">
                <img src="../../assets/images/pass.png" alt="">
                <span>受理</span>
            </el-button>
            <el-button type="primary" @click="refuse" :disabled="!$checkAuth('bas:enterprise:complaint:updateEnterpriseComplaint')">
                <img src="../../assets/images/refuse.png" alt="">
                <span>拒绝</span>
            </el-button>
            <button class="back_btn"  @click="$router.push('/complainApply')">返回</button>
        </tool-bar> -->
        <div class="content">
            <h3>投诉详情</h3>
            <table class="table tableBorder">
                <tr>
                    <td width="120">投诉企业名称：</td>
                    <td width="380">{{enterpriseInfo.enterpriseName}}</td>
                    <td width="120">企业联系人：</td>
                    <td width="380">{{enterpriseInfo.enterpriseLinkName}}</td>
                </tr>
                <tr>
                    <td>企业联系电话：</td>
                    <td>{{enterpriseInfo.enterpriseLinkMobile}}</td>
                    <td>企业地址：</td>
                    <td>{{enterpriseInfo.enterpriseAddr}}</td>
                </tr>
                <tr>
                    <td>投诉人姓名：</td>
                    <td>{{complainInfo.ownerName}}</td>
                    <td>手机号码：</td>
                    <td>{{ownerInfo.ownerMobile}}</td>
                </tr>
                <tr>
                    <td>投诉标题：</td>
                    <td>{{complainInfo.enterpriseComplaintTitle}}</td>
                    <td>诉讼请求：</td>
                    <td>{{complainInfo.enterpriseComplaintRequest}}</td>
                </tr>
                <tr>
                    <td>投诉类别：</td>
                    <!-- <td>{{complainInfo.enterpriseComplaintCategory | filterCommon(complaintCategory)}}</td> -->
                    <td>
                        <span v-for="(type,index) in complainInfo.typeList" :key="index">
                            {{type | filterCommon(complaintCategory)}}
                        </span>
                    </td>
                    <td>投诉日期：</td>
                    <td>{{complainInfo.enterpriseComplaintTime | filterTime('yyyy-mm-dd')}}</td>
                </tr>
                <tr>
                    <td>投诉内容：</td>
                    <td colspan="3" class="text">{{complainInfo.enterpriseComplaintBak}}</td>
                </tr>
                <tr>
                    <td>投诉图片：</td>
                    <td colspan="3" id="complainPic">
                        <div class="complain-pic" @click="setViewer(1)" v-if="complainInfo.pic1">
                            <img :src="complainInfo.pic1" alt="">
                        </div>
                        <div class="complain-pic" @click="setViewer(2)" v-if="complainInfo.pic2">
                            <img :src="complainInfo.pic2" alt="">
                        </div>
                        <div class="complain-pic" @click="setViewer(3)" v-if="complainInfo.pic3">
                            <img :src="complainInfo.pic3" alt="">
                        </div>
                    </td>
                </tr>
            </table>
            <h3 v-if="vehicleInfo">关联维修信息</h3>
            <table v-if="vehicleInfo" class="table tableBorder">
                <tr>
                    <td width="120">车牌号码：</td>
                    <td width="380">{{vehicleInfo.vehicleLicensePlate}}</td>
                    <td width="120">车牌颜色：</td>
                    <td width="380">{{vehicleInfo.vehicleLicensePlateColor | filterCommon(plateColor)}}</td>
                </tr>
                <tr>
                    <td>VIN码：</td>
                    <td>{{vehicleInfo.vehicleVin}}</td>
                    <td>送修日期：</td>
                    <td>{{vehicleFixs.vehicleFixDate | filterStrTime}}</td>
                </tr>
                <tr>
                    <td>送修里程：</td>
                    <td>{{vehicleFixs.vehicleFixMileage}}</td>
                    <td>结算日期：</td>
                    <td>{{vehicleFixs.vehicleFixBalanceDate | filterTime('yyyy-mm-dd')}}</td>
                </tr>
                <tr>
                    <td>结算清单编号：</td>
                    <td>{{vehicleFixs.vehicleFixBalanceNumber}}</td>
                    <td>故障信息：</td>
                    <td>{{vehicleFixs.vehicleFixDescription}}</td>
                </tr>
            </table>
            <h3 v-show="fixProjectList.length">维修项目</h3>
            <div v-show="fixProjectList.length" class="table_box">
                <el-table
                    class="tab"
                    :data="fixProjectList"
                    :header-cell-style="{background:'#F5F5F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    stripe
                    style="width: 1000px">
                    <el-table-column
                        prop="num"
                        width="100"
                        label="序号"
                        >
                    </el-table-column>
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
            </div>
            <h3 v-show="FixPartList.length">配件项目</h3>
            <div v-show="FixPartList.length" class="table_box">
                <el-table
                    class="tab"
                    :data="FixPartList"
                    :header-cell-style="{background:'#F5F5F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    stripe
                    style="width: 1000px">
                    <el-table-column
                        prop="num"
                        width="100"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="vehiclePartsName"
                        label="配件名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="vehiclePartsNumber"
                        label="配件编码"
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
        <modal :alert="alert" :title="alertTitle" :width="450" :height="242" @alertCancel="alertCancel">
            <div class="alert-content clearfix">
                <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                <el-input
                    type="textarea"
                    :rows="3"
                    resize="none"
                    placeholder="请说明受理拒绝理由，字数限制在250字以内。"
                    v-model="enterpriseComplaintRejectionBak"
                    maxlength="250"
                    class="textarea">
                </el-input>
            </div>
            <div class="btn">
                <el-button class="search_btn" type="primary" @click="alertConfirm" v-text="'确定'"></el-button>
                <el-button class="search_btn" @click="alertCancel" v-text="'取消'"></el-button>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button type="primary" @click="adopt" :disabled="!$checkAuth('bas:enterprise:complaint:updateEnterpriseComplaint')">受理</el-button>
            <el-button type="primary" @click="refuse" :disabled="!$checkAuth('bas:enterprise:complaint:updateEnterpriseComplaint')">拒绝</el-button>
            <el-button class="react_btn" @click="$router.push('/complainApply')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
// import Header from '@/components/Header.vue'
import BreadFoot from '@/components/BreadFoot.vue'
import { plateColor, complaintCategory } from '@/utils/type.js'
import { setNum } from '@/utils/tools.js'
// import ToolBar from '@/components/ToolBar.vue'
import { filterStrTime } from '@/utils/filterTime.js'
import Viewer from 'viewerjs'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'complainApplyDetail',
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '服务投诉处理', path: '' }, { title: '投诉受理详情', path: '' }
            ],
            viewer: '',
            plateColor,
            enterpriseComplaintRejectionBak: '',
            fixProjectList: [], // 项目列表
            FixPartList: [], // 配件表
            enterpriseInfo: {}, // 企业信息
            complainInfo: {}, // 投诉信息
            vehicleInfo: '', // 车辆信息
            vehicleFixs: {
                vehicleFixDate: '',
                vehicleFixMileage: '',
                vehicleFixBalanceDate: '',
                vehicleFixDescription: '',
                vehicleFixBalanceNumber: ''
            }, // 送修信息
            ownerInfo: {
                vehicleOwner: '',
                vehicleTelphone: '',
                vehicleVin: '',
                vehicleLicensePlate: ''
            }, // 车辆信息
            value2: 2,
            complaintCategory,
            uploadURL: window.uploadURL,
            carImg1: '', // 行驶证照片
            carImg2: '', // 车辆照片
            alert: false,
            alertTitle: '投诉拒绝',
            companyName: '',
            adoptSend: false, // 是否已点击受理
            refuseSend: false, // 是否已点击受理
            input: '',
            value: '',
            tableData3: []
        }
    },
    created () {
        this.$post('bas/enterprise/complaint/findEnterpriseComplaintById', {
            data: {
                enterpriseComplaintId: this.$route.query.id
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.owner && (this.ownerInfo = res.owner)
                    res.data && (this.complainInfo = res.data)
                    this.complainInfo.typeList = this.complainInfo.enterpriseComplaintCategory.split(',')
                    res.vehicle && (this.vehicleInfo = res.vehicle)
                    res.vehicleFixs && res.vehicleFixs.length && (this.vehicleFixs = res.vehicleFixs[0])
                    if (res.enterprise) {
                        try {
                            var user = JSON.parse(getCookie('user'))
                            if (user.roleExtEnterpriseOwnerIsview) {
                                res.enterprise.enterpriseOwner = res.enterprise.enterpriseOwner // 企业负责人
                                res.enterprise.enterpriseOwnerPhone = res.enterprise.enterpriseOwnerPhone // 负责人电话
                            } else {
                                res.enterprise.enterpriseOwner = '******'
                                res.enterprise.enterpriseOwnerPhone = '******'
                            }
                            if (user.roleExtEnterpriseLinkpersonIsview) {
                                res.enterprise.enterpriseLinkName = res.enterprise.enterpriseLinkName // 企业联系人
                                res.enterprise.enterpriseLinkMobile = res.enterprise.enterpriseLinkMobile // 联系人电话
                            } else {
                                res.enterprise.enterpriseLinkName = '******'
                                res.enterprise.enterpriseLinkMobile = '******'
                            }
                            // data.typeList = e.enterpriseComplaintCategory.split(',')
                        } catch (e) {
                            res.enterprise.enterpriseOwner = '******'
                            res.enterprise.enterpriseOwnerPhone = '******'
                            res.enterprise.enterpriseLinkName = '******'
                            res.enterprise.enterpriseLinkMobile = '******'
                        }
                        this.enterpriseInfo = res.enterprise
                    }
                    res.busVehicleFixProjects && (this.fixProjectList = setNum(res.busVehicleFixProjects, 1, 10))
                    res.baseVehicleChangeParts && (this.FixPartList = setNum(res.baseVehicleChangeParts, 1, 10))
                }
            }).catch(err => {
                this.$alert('网络错误，请刷新试试！', '提示')
                console.log(err)
            })
    },
    filters: {
        filterStrTime
    },
    components: {
        BreadFoot,
        Modal
    },
    methods: {
        // 创建照片查看器
        setViewer (index) {
            if (this.viewer) this.viewer.destroy()
            this.viewer = new Viewer(document.querySelector('#complainPic'))
            this.viewer.view(index)
        },
        uploadSuccess1 (res) {
            this.carImg1 = res.data
            this.$message({
                message: '图片上传成功！',
                type: 'success'
            })
        },
        uploadSuccess2 (res) {
            this.carImg2 = res.data
            this.$message({
                message: '图片上传成功！',
                type: 'success'
            })
        },
        // 投诉受理
        adopt () {
            if (this.adoptSend) {
                return
            }
            this.adoptSend = true
            this.$post('bas/enterprise/complaint/updateEnterpriseComplaint', {
                data: {
                    enterpriseComplaintStatus: 1,
                    enterpriseComplaintId: this.$route.query.id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '受理成功',
                        callback: () => {
                            this.$router.push('/complainApply')
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
                this.adoptSend = false
            }).catch(() => {
                this.adoptSend = false
                this.$alert('网络错误，请刷新试试！', '提示')
            })
        },
        refuse () {
            this.alert = true
        },
        // 弹窗
        alertCancel (val) {
            this.alert = false
        },
        // 投诉拒绝
        alertConfirm (val) {
            if (!this.enterpriseComplaintRejectionBak) {
                this.$alert('请输入拒绝理由！', '提示')
                return
            }
            if (this.refuseSend) {
                return
            }
            this.refuseSend = true
            this.$post('bas/enterprise/complaint/updateEnterpriseComplaint', {
                data: {
                    enterpriseComplaintStatus: 2,
                    enterpriseComplaintId: this.$route.query.id,
                    enterpriseComplaintRejectionBak: this.enterpriseComplaintRejectionBak
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/complainApply')
                        }
                    })
                    this.alert = false
                } else {
                    this.$alert(res.message, '提示')
                }
                this.refuseSend = false
            }).catch(() => {
                this.refuseSend = false
                this.$alert('网络错误，请刷新试试！', '提示')
            })
        }
    }
}
</script>

<style lang='less' scoped>
.complainApplyDetail {
    background: #fff;
    .wrap {
        padding: 0 20px;
    }
    .content {
        font-size: 14px;
        color: #333333;
        min-height: 700px;
        padding: 30px 30px 100px 30px;
        h3 {
            width: 300px;
            text-align: left;
            line-height: 50px;
            font-size: 14px;
            text-indent: 20px;
            color: #000;
        }
        .table {
            width: 1000px;
            td {
                height: 40px;
                &:nth-child(2n-1) {
                    text-align: right;
                    padding-right: 10px;
                    width: 142px;
                    color: #000;
                }
                &:nth-child(2n) {
                    text-align: left;
                    color: #333333;
                    padding-left: 10px;
                }
                &.text {
                    line-height: 24px;
                    padding: 6px 12px;
                }
            }
            .complain-pic {
                width: 92px;
                height: 72px;
                padding: 4px;
                border: 1px solid #ddd;
                margin: 8px;
                display: inline-block;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .table2 {
            .text {
                line-height: 30px;
            }
            li {
                line-height: 23px;
            }
            img {
                margin-right: 5px;
            }
        }
    }
    .alert-content {
        padding: 30px 0;
        .name {
            float:left;
            width: 134px;
            text-align: right;
            font-size: 14px;
            color: #333;
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
}
</style>
<style lang="less">
.complainApplyDetail {
    .el-input__inner {
        height: 34px;
        line-height: 34px;
    }
}
</style>
