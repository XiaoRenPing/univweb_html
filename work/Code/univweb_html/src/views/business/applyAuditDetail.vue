<!-- 投诉申请受理详情 -->
<template>
    <div class="complainApplyDetail">
        <!-- <tool-bar :title="'业务操作>企业信用评价>企业参评审核>详情'">
            <el-button class="confirm" type="primary" @click="adopt">
                <img src="../../assets/images/pass.png" alt="">
                <span>同意参评</span>
            </el-button>
            <el-button class="confirm" type="primary" @click="refuse">
                <img src="../../assets/images/refuse.png" alt="">
                <span>拒绝参评</span>
            </el-button>
            <button class="back_btn"  @click="$router.push('/applyAudit')">返回</button>
        </tool-bar> -->
        <div class="content">
            <table class="table tableBorder">
                <tr>
                    <td width="120">企业名称：</td>
                    <td width="380">{{complainInfo.enterpriseName}}</td>
                    <td width="120">企业类型：</td>
                    <td width="380">{{complainInfo.enterpriseTypeId === '1' ? '维修企业' : ''}}</td>
                </tr>
                <tr>
                    <td>所在区域：</td>
                    <td>{{complainInfo.enterpriseRegion}}</td>
                    <td>企业备案号：</td>
                    <td>{{complainInfo.enterpriseCoding}}</td>
                </tr>
                <tr>
                    <td>企业经营状态：</td>
                    <td>{{complainInfo.enterpriseOperatingState | filterCommon(operateState)}}</td>
                    <td>经营类别：</td>
                    <td>{{complainInfo.enterpriseBusinessCategory | filterCommon(bussinessCategory)}}</td>
                </tr>
                <tr>
                    <td>社会信用代码：</td>
                    <td>{{complainInfo.enterpriseCreditIdentifier}}</td>
                    <td>经济类型：</td>
                    <td>{{complainInfo.enterpriseEconomicCategory | filterCommon(economicsList)}}</td>
                </tr>
                <tr>
                    <td>企业负责人：</td>
                    <td>{{complainInfo.enterpriseOwner}}</td>
                    <td>企业联系人：</td>
                    <td>{{complainInfo.enterpriseLinkName}}</td>
                </tr>
                <tr>
                    <td>负责人电话：</td>
                    <td>{{complainInfo.enterpriseOwnerPhone}}</td>
                    <td>联系人电话：</td>
                    <td>{{complainInfo.enterpriseLinkMobile}}</td>
                </tr>
                <tr>
                    <td>负责人身份证：</td>
                    <td>{{complainInfo.enterpriseOwnerIdcardnumber}}</td>
                    <td>联系人身份证：</td>
                    <td>{{complainInfo.enterpriseLinkIdcardnumber}}</td>
                </tr>
                <tr>
                    <td>企业业务电话：</td>
                    <td>{{complainInfo.enterpriseBusinessPhone}}</td>
                    <td>企业邮政编码：</td>
                    <td>{{complainInfo.enterprisePostalcode}}</td>
                </tr>
                <tr>
                    <td>经营许可证：</td>
                    <td>{{complainInfo.enterpriseBusinessCertificate}}</td>
                    <td>许可证有效期：</td>
                    <td>{{complainInfo.enterpriseCertificateS}}&nbsp;至&nbsp;{{complainInfo.enterpriseCertificateE}}</td>
                </tr>
                <tr>
                    <td>经营地址：</td>
                    <td colspan="3" class="text">{{complainInfo.enterpriseOperatingAddress}}</td>
                </tr>
                <tr>
                    <td>经营范围：</td>
                    <td colspan="3" class="text">{{complainInfo.enterpriseOperationArea}}</td>
                </tr>
                <tr>
                    <td>企业概况：</td>
                    <td colspan="3" class="text">{{complainInfo.enterprise_introduction}}</td>
                </tr>
                <tr>
                    <td>参评日期：</td>
                    <td>{{complainInfo.enterpriseEvaluateApplyDate | formatTimeS}}</td>
                    <td>参评申请描述：</td>
                    <td>{{complainInfo.enterpriseEvaluateApplyDesc}}</td>
                </tr>
            </table>
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
            <el-button type="primary" @click="adopt">同意参评</el-button>
            <el-button type="primary" @click="refuse">拒绝参评</el-button>
            <el-button class="react_btn" @click="$router.push('/creditEva/applyAudit')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import BreadFoot from '@/components/BreadFoot.vue'
// import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import { plateColor, complaintCategory, bussinessCategory, economicsList, operateState } from '@/utils/type.js'
import { getCookie } from '@/utils/cookie.js'
import { filterStrTime, filterTime } from '@/utils/filterTime.js'
export default {
    name: 'complainApplyDetail',
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业诚信评价', path: '' }, { title: '企业参评审核', path: '' }, { title: '企业参评审核详情', path: '' }
            ],
            regionList: [], // 区域列表
            viewer: '',
            operateState,
            bussinessCategory,
            economicsList,
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
        this.findLoginRegion()
        // this.queryData()
        // this.$post('bas/enterprise/complaint/findEnterpriseComplaintById', {
        //     data: {
        //         enterpriseComplaintId: this.$route.query.id
        //     }
        // })
        //     .then(res => {
        //         if (res.status === 200) {
        //             res.owner && (this.ownerInfo = res.owner)
        //             res.data && (this.complainInfo = res.data)
        //             res.vehicle && (this.vehicleInfo = res.vehicle)
        //             res.vehicleFixs && res.vehicleFixs.length && (this.vehicleFixs = res.vehicleFixs[0])
        //             res.enterprise && (this.enterpriseInfo = res.enterprise)
        //             res.busVehicleFixProjects && (this.fixProjectList = setNum(res.busVehicleFixProjects, 1, 10))
        //             res.baseVehicleChangeParts && (this.FixPartList = setNum(res.baseVehicleChangeParts, 1, 10))
        //         }
        //     }).catch(err => {
        //         this.$alert('网络错误，请刷新试试！', '提示')
        //         console.log(err)
        //     })
    },
    filters: {
        filterStrTime,
        formatTimeS (val) {
            let str = new Date(val) - 0
            return filterTime('yyyy-mm-dd', str - 0)
        }
    },
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    methods: {
        findLoginRegion () {
            this.$post('bas/city/findRegionByDomainCity', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 查询详情
        queryData () {
            this.$post('bas/enterprise/evaluateApply/findEnterpriseByDetail', {
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.id
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data) {
                        try {
                            var user = JSON.parse(getCookie('user'))
                            if (user.roleExtEnterpriseOwnerIsview) {
                                res.data.enterpriseOwner = res.data.enterpriseOwner // 企业负责人
                                res.data.enterpriseOwnerPhone = res.data.enterpriseOwnerPhone // 负责人电话
                            } else {
                                res.data.enterpriseOwner = '******'
                                res.data.enterpriseOwnerPhone = '******'
                            }
                            if (user.roleExtEnterpriseLinkpersonIsview) {
                                res.data.enterpriseLinkName = res.data.enterpriseLinkName // 企业联系人
                                res.data.enterpriseLinkMobile = res.data.enterpriseLinkMobile // 联系人电话
                            } else {
                                res.data.enterpriseLinkName = '******'
                                res.data.enterpriseLinkMobile = '******'
                            }
                        } catch (e) {
                            res.data.enterpriseOwner = '******'
                            res.data.enterpriseOwnerPhone = '******'
                            res.data.enterpriseLinkName = '******'
                            res.data.enterpriseLinkMobile = '******'
                        }
                        this.complainInfo = res.data
                        this.regionList.forEach(element => {
                            if (element.regionId === this.complainInfo.enterpriseRegion) {
                                this.complainInfo.enterpriseRegion = element.regionName
                            }
                        })
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 投诉受理
        adopt () {
            if (this.adoptSend) {
                return
            }
            this.adoptSend = true
            this.$post('bas/enterprise/evaluateApply/updateEnterpriseEvaluateApplyStatus', {
                data: {
                    enterpriseEvaluateApplyAuditIs: 1,
                    enterpriseEvaluateApplyId: this.$route.query.id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '受理成功',
                        callback: () => {
                            this.$router.push('/applyAudit')
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
            if (this.enterpriseComplaintRejectionBak.length > 250) {
                this.$alert('拒绝理由长度不能大于250', '提示')
                return
            }
            if (this.refuseSend) {
                return
            }
            this.refuseSend = true
            this.$post('bas/enterprise/evaluateApply/updateEnterpriseEvaluateApplyStatus', {
                data: {
                    enterpriseEvaluateApplyAuditIs: -1,
                    enterpriseEvaluateApplyId: this.$route.query.id,
                    enterpriseEvaluateApplyAuditDesc: this.enterpriseComplaintRejectionBak
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/applyAudit')
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
        padding: 50px 30px 100px 30px;
        h3 {
            width: 300px;
            text-align: left;
            line-height: 50px;
            font-size: 14px;
            text-indent: 20px;
            color: #666666;
        }
        .table {
            width: 1000px;
            td {
                height: 40px;
                &:nth-child(2n-1) {
                    text-align: right;
                    padding-right: 10px;
                    width: 142px;
                    color: #666666;
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
            width: 100px;
            text-align: right;
            font-size: 14px;
            line-height: 34px;
            color: #333;
            .red {
                color: #ff0000;
            }
        }
        .textarea {
            float: left;
            width: 300px;
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
