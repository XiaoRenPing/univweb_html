<!-- 档案详情 -->
<template>
    <div class="synthesizeWorkDetail">
        <div class="content">
            <el-tabs type="card" v-model="tabIndex" @tab-click="changeTabs">
                <el-tab-pane label="检查报告详情" name="tab1" class="basic-info clearfix">
                    <div class="table_box">
                        <h3>车辆信息</h3>
                        <table class="table">
                            <tr>
                                <td>车牌号码：</td>
                                <td>{{infoObj.vehicleno}}</td>
                                <td>车牌颜色：</td>
                                <td>{{infoObj.platecolor|filterCommon(plateColor)}}</td>
                            </tr>
                            <tr>
                                <td>车辆类别：</td>
                                <td>{{infoObj.vehicletype}}</td>
                                <td>车主单位：</td>
                                <td>{{infoObj.client}}</td>
                            </tr>
                            <tr>
                                <td>车架号：</td>
                                <td>{{infoObj.vinno}}</td>
                                <td>名称内容：</td>
                                <td>{{infoObj.dsname}}</td>
                            </tr>
                        </table>
                        <h3>检测作业信息</h3>
                        <table class="table">
                            <tr>
                                <td>检测类别：</td>
                                <td>{{infoObj.detecttype | detecttypeFilter}}</td>
                                <td>检测编号：</td>
                                <td>{{infoObj.detectsn}}</td>
                            </tr>
                            <tr>
                                <td>检测结果：</td>
                                <td>{{detectResult}}</td>
                                <td>工位：</td>
                                <td>{{infoObj.stationno}}</td>
                            </tr>
                            <tr>
                                <td>检测日期：</td>
                                <td>{{infoObj.registdate|formatTimeS}}</td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="人工检测记录单" name="tab2" class="basic-info clearfix">
                    <embed :src="pdfUrl1" type="application/pdf" width="100%" height="720"/>
                </el-tab-pane>
                <el-tab-pane label="性能检测记录单" name="tab3" class="basic-info clearfix">
                    <embed :src="pdfUrl2" type="application/pdf" width="100%" height="720"/>
                </el-tab-pane>
                <el-tab-pane label="综合性能检测报告单" name="tab5" class="basic-info clearfix">
                    <embed :src="pdfUrl3" type="application/pdf" width="100%" height="720"/>
                </el-tab-pane>
                <el-tab-pane label="检测记录照片" name="tab6" class="basic-info clearfix">
                    <div class="table_box">
                        <h3>安检记录照片</h3>
                        <div class="img_box">
                            <div class="item">
                                <p>安检合格标识</p>
                                <img v-if="securityAuditMark" :src="securityAuditMark" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                            <div class="item">
                                <p>安检报告单</p>
                                <img v-if="securityReportForm" :src="securityReportForm" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                            <div class="item">
                                <p>行驶证</p>
                                <img v-if="drivingCertificate" :src="drivingCertificate" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                        </div>
                        <h3>检测记录照片</h3>
                        <div class="img_box">
                            <div class="item">
                                <p>环检检验记录单</p>
                                <img v-if="environmentRecordPic" :src="environmentRecordPic" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                        </div>
                        <h3>企业工位照片</h3>
                        <div class="img_box">
                            <div class="item">
                                <p>动力图片</p>
                                <img v-if="powerPicture" :src="powerPicture" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                            <div class="item">
                                <p>灯光图片</p>
                                <img v-if="lightPicture" :src="lightPicture" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                            <div class="item">
                                <p>制动图片</p>
                                <img v-if="breakingPicture" :src="breakingPicture" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                        </div>
                        <h3>道路运输经营许可证</h3>
                        <div class="img_box">
                            <div class="item">
                                <p>道路运输经营许可证</p>
                                <img v-if="carriageCard" :src="carriageCard" alt="">
                                <img v-else src="../../assets/images/img_photo.png" alt="">
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
            <!-- <el-button type="primary" @click="addRecord" :disabled="!$checkAuth('manage:enterprise:addentrecord')">保存</el-button> -->
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import BreadFoot from '@/components/BreadFoot.vue'
import { filterTime } from '@/utils/filterTime.js'
import { plateColor } from '@/utils/type.js'
import Modal from '../../components/Modal'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'synthesizeWorkDetail',
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '检测记录查询', path: '' }, { title: '检测记录详情', path: '' }
            ],
            detectResult: '', // 检查结果
            breakingPicture: '',
            drivingCertificate: '',
            environmentRecordPic: '',
            lightPicture: '',
            carriageCard: '',
            powerPicture: '',
            securityAuditMark: '',
            securityReportForm: '',
            plateColor,
            infoObj: {},
            imgList: {},
            tabIndex: 'tab1',
            pdfUrl1: window.uploadURL + 'report/inspect/findInspect1?detectSn=' + this.$route.query.id, // pdf预览地址
            pdfUrl2: window.uploadURL + 'report/inspect/findInspect2?detectSn=' + this.$route.query.id, // pdf预览地址
            pdfUrl3: window.uploadURL + 'report/inspect/findInspect3?detectSn=' + this.$route.query.id // pdf预览地址
        }
    },
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    computed: {
    },
    filters: {
        formatTimeS (val) {
            let str = new Date(val) - 0
            return filterTime('yyyy-mm-dd', str - 0)
        },
        detecttypeFilter (val) {
            if (val === 1) {
                return '技术等级评定'
            } else if (val === 4) {
                return '二级维护竣工质量检验'
            } else if (val === 5) {
                return '汽车大修竣工质量检验'
            } else {
                return '其他检测'
            }
        }
    },
    created () {
        this.$post('jc/detect/viewPerformanceDetectRecord', {
            jcPerformanceDetectRecord: {
                detectsn: this.$route.query.id
            }
        }).then(res => {
            if (res.status === 200) {
                this.detectResult = res.data.detectResult
                this.infoObj = res.data.jcPerformanceDetectRecord
                this.imgList = res.data.securityDetectImgList
                this.breakingPicture = res.data.breakingPicture
                this.drivingCertificate = res.data.drivingCertificate
                this.environmentRecordPic = res.data.environmentRecordPic
                this.lightPicture = res.data.lightPicture
                this.powerPicture = res.data.powerPicture
                this.securityAuditMark = res.data.securityAuditMark
                this.securityReportForm = res.data.securityReportForm
                this.carriageCard = res.data.carriageCard
            } else {
                this.$alert(res.message, '提示')
            }
        })
    },
    watch: {
    },
    methods: {
        goBack () {
            this.$router.push('/synthesizeWork')
        },
        changeTabs () {
            if (this.tabIndex === 'tab2') {
                this.pdfUrl = window.uploadURL + 'report/inspect/findInspect1' + '?detectSn=' + this.$route.query.id
            }
        }
    }
}
</script>

<style lang='less' scoped>
.synthesizeWorkDetail{
    .content {
        padding-bottom: 100px;
    }
    .table_box {
        min-height: 700px;
        .img_box {
            text-align: left;
            margin-bottom: 30px;
            .item {
                display: inline-block;
                margin-left: 80px;
                p {
                    text-align: center;
                    font-size: 14px;
                    color: #666666;
                    line-height: 30px;
                }
                img {
                    box-sizing: border-box;
                    width: 210px;
                    height: 210px;
                    padding: 8px;
                    border: 1px solid #DDDDDD;
                }
            }
        }
        h3 {
            color: #666666;
            font-size: 14px;
            text-align: left;
            line-height: 40px;
        }
        padding: 0 20px 30px;
        .table {
            border-collapse:collapse;
            width: 1200px;
            table-layout: fixed;
            word-wrap: break-word;
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
}
</style>
<style lang="less">
.synthesizeWorkDetail {
    background: #FFF;
    .el-tabs--card>.el-tabs__header {
        background: #EDF0F5;
        border: none;
        .el-tabs__nav {
            border: none;
        }
        .el-tabs__item {
            box-sizing: border-box;
            border: none;
            border-radius:3px 3px 0px 0px;
            background: #FFF;
            margin-right: 10px;
            border-top: 3px solid #FFF;
            &.is-active {
                color: #1890FF;
                border-top: 3px solid #3E94FE;
            }
        }
    }
}
</style>
