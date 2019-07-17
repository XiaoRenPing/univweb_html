<!-- 检测企业档案详情 -->
<template>
    <div class="testingArchDetail">
        <div class="content">
            <div class="table_box">
                <el-tabs type="card" v-model="tabIndex" @tab-click="changeTabs">
                    <el-tab-pane label="基本信息" name="basicInfo" class="basic-info clearfix">
                        <div class="left">
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业名称：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseName"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>经济性质：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseEconomicCategory" @change="resetRecordNum" filterable placeholder="请选择">
                                        <el-option
                                            v-for="item in economicsList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>所在区域：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseRegion" @change="resetRecordNum" placeholder="请选择">
                                        <el-option
                                            v-for="item in regionList"
                                            :key="item.regionId"
                                            :label="item.regionName"
                                            :value="item.regionId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>经营许可证号：
                                </div>
                                <div class="msg">
                                    <el-input maxlength="12" v-model="enterpriseBusinessCertificate"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>社会信用代码：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseCreditIdentifier" maxlength="18" ></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>计量认证号：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseJcMetrologicalAuthentication" maxlength="11"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>证号有效日期：
                                </div>
                                <div class="msg">
                                    <el-date-picker
                                    v-model="authenticationTime"
                                    type="daterange"
                                    unlink-panels
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>营业状态：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseOperatingState" placeholder="请选择">
                                        <el-option
                                            v-for="item in operateStateList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业负责人：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseOwner" :type="roleExtEnterpriseOwnerIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业联系人：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseLinkName" :type="roleExtEnterpriseLinkpersonIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业业务电话：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseBusinessPhone"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业简称：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseJcShortName"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>作业范围：
                                </div>
                                <div class="msg">
                                    <el-checkbox-group v-model="enterpriseJcScope">
                                        <el-checkbox label="1">综合性能检验</el-checkbox>
                                        <el-checkbox label="2">二级维护竣工检验</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业等级：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseJcGrade" placeholder="请选择">
                                        <el-option
                                            v-for="item in enterpriseJcGradeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>许可证有效期：
                                </div>
                                <div class="msg">
                                    <el-date-picker
                                    v-model="validityTime"
                                    type="daterange"
                                    unlink-panels
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="info-item record" :class="{detail:$route.query.id && recordNumber && !/^Q/i.test(recordNumber)}">
                                <div class="name">
                                    企业备案号：
                                </div>
                                <div class="msg">
                                    <el-input disabled v-model="recordNumber"></el-input>
                                    <el-button type="primary" v-if="!$route.query.id || ($route.query.id && /^Q/i.test(recordNumber)) || ($route.query.id && !recordNumber)" @click="getRecordNumber">生成</el-button>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>发证单位：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseJcAuthenticationUnit"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>建站时间：
                                </div>
                                <div class="msg">
                                    <el-date-picker
                                    v-model="enterpriseCreateSiteTime"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>营业时间：
                                </div>
                                <div class="msg">
                                    <el-time-picker
                                        is-range
                                        v-model="businessTime"
                                        value-format="HH:mm:ss"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                                    </el-time-picker>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>负责人电话：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseOwnerPhone" :type="roleExtEnterpriseOwnerIsview ? 'text' : 'password'" maxlength="11"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>联系人电话：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseLinkMobile" :type="roleExtEnterpriseLinkpersonIsview ? 'text' : 'password'" maxlength="11"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业邮政编码：
                                </div>
                                <div class="msg">
                                    <el-input maxlength="6" v-model="enterprisePostalcode"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="info-item clearfix">
                                <div class="name fl">
                                    <span class="name-red">*&nbsp;</span>经营范围：
                                </div>
                                <div class="msg height fr">
                                    <el-input type="textarea" v-model="enterpriseOperationArea"></el-input>
                                </div>
                            </div>
                            <div class="info-item clearfix">
                                <div class="name fl">
                                    <span class="name-red">*&nbsp;</span>企业概况：
                                </div>
                                <div class="msg height fr">
                                    <el-input type="textarea" v-model.trim="enterpriseIntroduction"></el-input>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="拓展信息" name="moreInfo" class="more-info">
                        <div class="picture">
                            <ul>
                                <li class="clearfix">
                                    <div class="name fl"><span class="red">*&nbsp;</span><b>营业执照：</b></div>
                                    <div class="img fr">
                                        <el-upload
                                            class="upload-demo"
                                            ref="licenseWrap"
                                            :action="uploadURL + 'attachment/file/upload'"
                                            :on-success="uploadSuccess"
                                            multiple
                                            :limit="1"
                                            :on-remove="handleRemove"
                                            :before-upload="beforeAvatarUpload"
                                            :file-list="fileList">
                                            <img class="empty" v-show="!enterpriseBusinessLicense" src="../../assets/images/img_photo.png" alt="营业执照">
                                            <img v-show="enterpriseBusinessLicense" ref="licenseImg" :src="enterpriseBusinessLicense" alt="营业执照">
                                            <p>上传营业执照</p>
                                        </el-upload>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="name fl"><span class="red">*&nbsp;</span><b>企业门店：</b></div>
                                    <div class="img fr">
                                        <el-upload
                                            class="upload-demo"
                                            ref="picWrap"
                                            :action="uploadURL + 'attachment/file/upload'"
                                            :on-success="uploadSuccess2"
                                            multiple
                                            :limit="1"
                                            :on-remove="handleRemove2"
                                            :before-upload="beforeAvatarUpload"
                                            :file-list="fileList">
                                            <img class="empty" v-show="!enterprisePicUrl" src="../../assets/images/img_photo.png" alt="企业门店">
                                            <img v-show="enterprisePicUrl" ref="picImg" :src="enterprisePicUrl" alt="企业门店">
                                            <p>上传企业门店</p>
                                        </el-upload>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="name fl"><span class="red">*&nbsp;</span><b>经营许可证：</b></div>
                                    <div class="img fr">
                                        <el-upload
                                            class="upload-demo"
                                            ref="permitWrap"
                                            :action="uploadURL + 'attachment/file/upload'"
                                            :on-success="uploadSuccess3"
                                            multiple
                                            :limit="1"
                                            :on-remove="handleRemove3"
                                            :before-upload="beforeAvatarUpload"
                                            :file-list="fileList">
                                            <img class="empty" v-show="!enterpriseBusinessPermit" src="../../assets/images/img_photo.png" alt="经营许可证">
                                            <img v-show="enterpriseBusinessPermit" ref="permitImg" :src="enterpriseBusinessPermit" alt="经营许可证">
                                            <p>上传经营许可证</p>
                                        </el-upload>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="map">
                            <h6>地图位置设置</h6>
                            <div class="info-item">
                                <div class="name"><span class="red">*&nbsp;</span>企业地址：</div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseAddr"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>经度：
                                </div>
                                <div class="msg">
                                    <el-input step="0.000001" type="number" v-model.number="center.lng"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>纬度：
                                </div>
                                <div class="msg">
                                    <el-input step="0.000001" type="number" v-model.number="center.lat"></el-input>
                                </div>
                            </div>
                            <h6 class="other-info">其他信息</h6>
                            <div class="info-item">
                                <div class="name">
                                    企业网址：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseSiteUrl"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    企业邮箱：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseRegisterEmail"></el-input>
                                </div>
                            </div>
                            <div class="localtion-search">
                                <el-button type="primary" @click="mapSearch">获取经纬度</el-button>
                            </div>
                            <baidu-map :center="center" :scroll-wheel-zoom="true" :double-click-zoom="true" :zoom="zoom" @click="changeLocation">
                                <bm-view class="bm-view"></bm-view>
                                <bm-local-search :keyword="BMkeyword" :panel="false" :selectFirstResult="true" :auto-viewport="true" :location="BMlocation" @searchcomplete="searchcomplete"></bm-local-search>
                            </baidu-map>
                        </div>
                        <div class="input clearfix">
                            <div class="left">
                                <div class="info-item">
                                    <div class="name">
                                        占地面积(㎡)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseJcAreaCovered"></el-input>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        辅助面积(㎡)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseJcAuxiliaryArea"></el-input>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        试车道大小：
                                    </div>
                                    <div class="msg">
                                        <el-input v-model="enterpriseJcTestLaneSize"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="info-item">
                                    <div class="name">
                                        主检测面积(㎡)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseJcMainCheckArea"></el-input>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        停车场面积(㎡)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseJcParkingArea"></el-input>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        设备总台数：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseJcEquipmentTotal"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-archives-normal">
            <el-button type="primary" @click="addRecord">保存</el-button>
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import BreadFoot from '@/components/BreadFoot.vue'
import Modal from '../../components/Modal'
import ToolBar from '@/components/ToolBar.vue'
import { jcGradeList, economicsList } from '@/utils/type.js'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'testingArchDetail',
    data () {
        return {
            breadArr: [
                { title: '档案管理', path: '' }, { title: '企业档案', path: '' }, { title: '检测企业档案详情', path: '' }
            ],
            uploadURL: window.uploadURL,
            fileList: [],
            businessLicenseImg: '',
            enterprisePicUrl: '',
            permitImg: '',
            allBrandList: [],
            brandList: [],
            transferBrand: [],
            selectBrand: {},
            transBrand: {},
            brandSearch: '',
            addBrandBtn: false,
            deleteBrandBtn: false,
            alert: false, // 弹框开关
            enterpriseName: '', // 企业名称
            validityTime: [],
            BMkeyword: '', // 百度搜索关键词
            BMlocation: '', // 百度搜索城市名称
            province: '', // 省
            city: '', // 市
            region: '', // 区
            enterpriseAddr: '',
            center: { // 坐标经纬度
                lng: 116.403847,
                lat: 39.915526
            },
            zoom: 15, // 缩放等级
            radio: '0', // 是否尾气治理站
            selectedOptions: [],
            enterpriseJcGrade: '',
            enterpriseJcGradeList: jcGradeList,
            options: regionData,
            enterpriseOperatingState: '', // 企业经营状态
            operateStateList: [
                {
                    value: '1',
                    label: '营业'
                },
                {
                    value: '2',
                    label: '停业'
                },
                {
                    value: '3',
                    label: '整改'
                },
                {
                    value: '4',
                    label: '停业整顿'
                },
                {
                    value: '5',
                    label: '歇业'
                },
                {
                    value: '6',
                    label: '注销'
                },
                {
                    value: '9',
                    label: '其他'
                }
            ],
            enterpriseEconomicCategory: '', // 经济类型
            economicsList,
            enterpriseRegion: '', // 所在区域
            regionList: [
            ],
            enterpriseBusinessCategory: '', // 业务类别
            serviceTypeList: [
                {
                    value: '01',
                    label: '一类维修经营业务'
                },
                {
                    value: '02',
                    label: '二类维修经营业务'
                },
                {
                    value: '03',
                    label: '三类维修经营业务'
                }
            ],
            tabIndex: 'basicInfo',
            enterpriseCreateSiteTime: '',
            enterpriseJcAreaCovered: '', // 占地面积
            enterpriseJcAuxiliaryArea: '', // 辅助面积
            enterpriseJcTestLaneSize: '', // 试车道大小
            enterpriseJcMainCheckArea: '', // 主检测面积
            enterpriseJcParkingArea: '', // 停车场面积
            enterpriseJcEquipmentTotal: '', // 设备总数
            enterpriseRegisterEmail: '', // 企业邮箱
            enterpriseJcAuthenticationUnit: '', // 发证单位
            businessTime: [new Date(2018, 12, 1, 9, 0), new Date(2018, 12, 1, 18, 0)], // 营业时间
            authenticationTime: [], // 计量证号有效日期
            enterpriseJcMetrologicalAuthentication: '', // 计量认证号
            enterpriseJcShortName: '', // 企业简称
            enterpriseJcScope: [], // 企业类别
            enterpriseBusinessCertificate: '', // 经营许可证号
            enterpriseCreditIdentifier: '', // 社会信用代码
            enterpriseOwner: '', // 企业负责人
            enterpriseLinkName: '', // 企业联系人
            enterpriseBusinessPhone: '', // 企业业务电话
            enterpriseCoding: '', // 企业编码
            enterpriseOwnerPhone: '', // 企业负责人电话
            enterpriseLinkMobile: '', // 企业联系电话
            enterprisePostalcode: '', // 企业邮政编码
            enterpriseOperatingAddress: '', // 企业经营地址
            enterpriseOperationArea: '', // 企业经营范围
            enterpriseIntroduction: '', // 企业经营概况
            enterpriseSiteUrl: '', // 企业网址
            enterpriseTailGasTreatmentStationIs: '0', // 是否尾气治理站
            enterpriseChainOrGroupIs: '0', // 是否连锁或集团经营企业
            enterpriseChainOrGroupOperationIs: '0', // 是否连锁或集团经营总店
            enterpriseQaMileage: '', // 质量保障里程
            enterprise4sSpecialMaintenanceIs: '0', // 是否为4s店或特约维修站
            enterpriseGroupStoreName: '', // 连锁或集团经营总店名称
            enterpriseQaDay: '', // 质量保障日期
            firstChangeTab: '', // 首次点击选项卡
            sendData: false,
            enterpriseBusinessLicense: '',
            enterpriseBusinessPermit: '',
            recordNumber: '', // 企业备案号
            roleExtEnterpriseOwnerIsview: 1, // 企业负责人权限
            roleExtEnterpriseLinkpersonIsview: 1, // 企业联系人权限
            sendRecordNum: false // 已获取备案号
        }
    },
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    computed: {
    },
    created () {
        this.findLoginRegion()
        if (this.$route.query.id) {
            this.getRecordDetail(this.$route.query.id)
        }
    },
    watch: {
        // 监听穿梭框左侧品牌事件
        selectBrand () {
            var add = true
            for (var i = 0; i < this.transferBrand.length; i++) {
                if (this.transferBrand[i].vehicleBrandId === this.selectBrand.vehicleBrandId) {
                    add = false
                    break
                }
            }
            if (!this.selectBrand.vehicleBrandId) {
                add = false
            }
            this.addBrandBtn = add
        },
        // 监听穿梭框右侧选中事件
        transferBrand () {
            if (this.transferBrand.length === 0) {
                this.deleteBrandBtn = false
            }
        },
        // 监听穿梭框右侧已选中品牌
        transBrand () {
            this.deleteBrandBtn = !!this.transBrand.vehicleBrandId
        },
        // 监听穿梭框搜索
        brandSearch (val) {
            if (!val) {
                return
            }
            var reg = new RegExp(val + '+', 'i')
            for (var key in this.allBrandList) {
                for (var i = 0; i < this.allBrandList[key].length; i++) {
                    var dom = document.getElementById('allBrand')
                    var top = 0
                    // 搜索名称
                    if (reg.test(this.allBrandList[key][i].vehicleBrandName)) {
                        top = document.getElementById(this.allBrandList[key][i].vehicleBrandName).offsetTop
                        dom.scrollTo(0, top - 150)
                        return
                    }
                    // 搜索拼音
                    if (reg.test(this.allBrandList[key][i].pinyin)) {
                        top = document.getElementById(this.allBrandList[key][i].vehicleBrandName).offsetTop
                        dom.scrollTo(0, top - 150)
                        return
                    }
                    // 搜索首字母
                    if (reg.test(this.allBrandList[key][i].Initials)) {
                        top = document.getElementById(this.allBrandList[key][i].vehicleBrandName).offsetTop
                        dom.scrollTo(0, top - 150)
                        return
                    }
                }
            }
        }
    },
    methods: {
        resetRecordNum () {
            if (this.$route.query.id) {
                return
            }
            this.recordNumber = ''
        },
        getRecordNumber () {
            if (!this.enterpriseName) {
                this.$alert('请输入企业名称！', '提示')
                return
            }
            if (!this.enterpriseRegion) {
                this.$alert('请选择所在区域！', '提示')
                return
            }
            this.$post('manage/enterprise/findEnterpriseRecordNumber', {
                data: {
                    enterpriseName: this.enterpriseName,
                    enterpriseRegion: this.enterpriseRegion,
                    enterpriseTypeId: '2'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.recordNumber = res.data.enterpriseRecordNumber
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
                .catch(e => {
                    this.$alert('网络错误，请重试！', '提示')
                })
        },
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findLoginRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 获取档案详情
        getRecordDetail (id) {
            this.$post('manage/enterprise/view', {
                data: {
                    enterpriseId: id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.recordNumber = res.data.enterpriseCoding // 企业备案号
                    this.enterpriseName = res.data.enterpriseName // 企业名称
                    this.enterpriseEconomicCategory = res.data.enterpriseEconomicCategory // 经济性质
                    this.enterpriseCreditIdentifier = res.data.enterpriseCreditIdentifier // 社会信用代码
                    this.enterpriseBusinessCertificate = res.data.enterpriseBusinessCertificate // 经营许可证号
                    this.enterpriseRegion = res.data.enterpriseRegion // 所在区域
                    this.enterpriseJcMetrologicalAuthentication = res.data.enterpriseJcMetrologicalAuthentication // 计量认证号
                    this.enterpriseOperatingState = res.data.enterpriseOperatingState // 营业状态
                    this.enterpriseOwner = res.data.enterpriseOwner // 企业负责人
                    this.enterpriseOwnerPhone = res.data.enterpriseOwnerPhone // 负责人电话
                    this.enterpriseLinkName = res.data.enterpriseLinkName // 企业联系人
                    this.enterpriseLinkMobile = res.data.enterpriseLinkMobile // 联系人电话

                    try {
                        var user = JSON.parse(getCookie('user'))
                        this.roleExtEnterpriseOwnerIsview = user.roleExtEnterpriseOwnerIsview
                        this.roleExtEnterpriseLinkpersonIsview = user.roleExtEnterpriseLinkpersonIsview
                    } catch (e) {
                    }

                    this.enterpriseBusinessPhone = res.data.enterpriseBusinessPhone // 企业业务电话
                    this.enterpriseJcShortName = res.data.enterpriseJcShortName // 企业简称
                    this.enterpriseJcGrade = res.data.enterpriseJcGrade // 企业等级
                    this.enterpriseJcScope = res.data.enterpriseJcScope ? res.data.enterpriseJcScope.split(',') : []
                    this.enterpriseJcAuthenticationUnit = res.data.enterpriseJcAuthenticationUnit // 发证单位
                    this.enterpriseCreateSiteTime = new Date(res.data.enterpriseCreateSiteTime) // 建站时间
                    this.enterprisePostalcode = res.data.enterprisePostalcode // 企业邮政编码
                    this.enterpriseOperationArea = res.data.enterpriseOperationArea // 企业经营范围
                    this.enterpriseIntroduction = res.data.enterpriseIntroduction // 企业经营概况
                    this.enterpriseAddrProvince = res.data.province // 企业地址省
                    this.enterpriseAddrCity = res.data.city // 企业地址市
                    this.enterpriseAddrDistrict = res.data.region // 企业地址区
                    this.enterpriseAddr = res.data.enterpriseAddr // 企业详细地址
                    this.enterpriseAddrX = res.data.enterpriseAddrX + '' // 企业地址经度
                    this.enterpriseAddrY = res.data.enterpriseAddrY + '' // 企业地址纬度
                    this.enterpriseSiteUrl = res.data.enterpriseSiteUrl // 企业网址
                    this.enterpriseRegisterEmail = res.data.enterpriseRegisterEmail // 企业邮箱
                    this.enterpriseJcAreaCovered = res.data.enterpriseJcAreaCovered // 占地面积
                    this.enterpriseJcAuxiliaryArea = res.data.enterpriseJcAuxiliaryArea // 辅助面积
                    this.enterpriseJcTestLaneSize = res.data.enterpriseJcTestLaneSize // 试车道大小
                    this.enterpriseJcMainCheckArea = res.data.enterpriseJcMainCheckArea // 主检测面积
                    this.enterpriseJcParkingArea = res.data.enterpriseJcParkingArea // 停车场面积
                    this.enterpriseJcEquipmentTotal = res.data.enterpriseJcEquipmentTotal // 设备总台数
                    this.enterpriseBusinessLicense = res.data.enterpriseBusinessLicense // 营业执照照片
                    this.enterpriseBusinessPermit = res.data.enterpriseBusinessPermit // 经营许可证照片
                    this.enterprisePicUrl = res.data.enterprisePicUrl // 企业门店照片
                    // 许可证有效期
                    if (res.data.enterpriseCertificateS && res.data.enterpriseCertificateE) {
                        this.validityTime = [res.data.enterpriseCertificateS, res.data.enterpriseCertificateE]
                    }
                    // 计量认证号有效期
                    if (res.data.enterpriseJcAuthenticationDateS && res.data.enterpriseJcAuthenticationDateE) {
                        this.authenticationTime = [res.data.enterpriseJcAuthenticationDateS, res.data.enterpriseJcAuthenticationDateE]
                    }
                    // 营业时间
                    if (res.data.enterpriseJcBusinessS && res.data.enterpriseJcBusinessE) {
                        this.businessTime = [res.data.enterpriseJcBusinessS, res.data.enterpriseJcBusinessE]
                    }

                    this.imgLoad('picImg', 'enterprisePicUrl', res.data.enterprisePicUrl)
                    this.imgLoad('permitImg', 'enterpriseBusinessPermit', res.data.enterpriseBusinessPermit)
                    this.imgLoad('licenseImg', 'enterpriseBusinessLicense', res.data.enterpriseBusinessLicense)

                    setTimeout(() => {
                        this.center.lng = res.data.enterpriseAddrX - 0 // 企业地址经度
                        this.center.lat = res.data.enterpriseAddrY - 0 // 企业地址纬度
                    }, 1000)
                }
            })
        },
        // 图片加载后处理
        imgLoad (imgshow, pic, src) {
            var radio = 152 / 152
            var _this = this
            var img = new Image()
            img.src = src
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs[imgshow].style.width = '100%'
                } else {
                    _this.$refs[imgshow].style.height = '100%'
                }
                _this[pic] = src
            }
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!')
            }
            return isJPG && isLt2M
        },
        // 图片清空
        handleRemove (file) {
            this.enterpriseBusinessLicense = ''
        },
        handleRemove2 (file) {
            this.enterprisePicUrl = ''
        },
        handleRemove3 (file) {
            this.enterpriseBusinessPermit = ''
        },
        uploadSuccess (res) {
            var radio = 152 / 152
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.licenseImg.style.width = '100%'
                } else {
                    _this.$refs.licenseImg.style.height = '100%'
                }
                _this.enterpriseBusinessLicense = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        uploadSuccess2 (res) {
            var radio = 152 / 152
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.picImg.style.width = '100%'
                } else {
                    _this.$refs.picImg.style.height = '100%'
                }
                _this.enterprisePicUrl = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        uploadSuccess3 (res) {
            var radio = 152 / 152
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.permitImg.style.width = '100%'
                } else {
                    _this.$refs.permitImg.style.height = '100%'
                }
                _this.enterpriseBusinessPermit = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        goBack () {
            this.$myAlert({
                title: '提示',
                msg: '返回后数据将不会保存，是否继续？'
            }).then(res => {
                this.$router.push('/companyArch?chooseId=2')
            }).catch(() => {})
        },
        companyArchUpdate () {
        },
        // 新增检测企业档案
        addRecord () {
            if (!this.enterpriseName) {
                this.$alert('请输入企业名称！', '提示')
                return
            }
            if (!this.enterpriseEconomicCategory) {
                this.$alert('请选择经济性质！', '提示')
                return
            }
            if (!/^[\da-zA-Z]{18}$/.test(this.enterpriseCreditIdentifier)) {
                this.$alert('请正确输入社会信用代码，应为18位的数字和字母组合！', '提示')
                return
            }
            if (!/^[\da-zA-Z]{12}$/.test(this.enterpriseBusinessCertificate)) {
                this.$alert('请正确输入经营许可证号，应为12位的数字和字母组合！', '提示')
                return
            }
            if (!this.enterpriseRegion) {
                this.$alert('请选择所在区域！', '提示')
                return
            }
            if (!/^\d{10}[a-zA-Z]$/.test(this.enterpriseJcMetrologicalAuthentication)) {
                this.$alert('请输入正确的计量认证号，应为10位数字加1位英文组合！', '提示')
                return
            }
            if (!this.authenticationTime || !this.authenticationTime.length) {
                this.$alert('请输入证号有效日期！', '提示')
                return
            }
            if (!this.enterpriseOperatingState) {
                this.$alert('请选择营业状态！', '提示')
                return
            }
            if (!this.enterpriseOwner) {
                this.$alert('请输入企业负责人！', '提示')
                return
            }
            if (!this.enterpriseLinkName) {
                this.$alert('请输入企业联系人！', '提示')
                return
            }
            if (!/(^1[3-9]\d{9}$)|(^\d{3}-\d{1,15}$)|(^\d{4}-\d{1,15}$)/.test(this.enterpriseBusinessPhone)) {
                this.$alert('请正确输入企业业务电话，支持固定电话或手机号码！', '提示')
                return
            }
            if (!this.enterpriseJcShortName) {
                this.$alert('请输入企业简称！', '提示')
                return
            }
            if (!this.enterpriseJcScope.length) {
                this.$alert('请选择作业范围！', '提示')
                return
            }
            if (!this.enterpriseJcGrade) {
                this.$alert('请选择企业等级！', '提示')
                return
            }
            if (!this.validityTime || !this.validityTime.length) {
                this.$alert('请正确输入许可证有效期！', '提示')
                return
            }
            // if (!this.$route.query.id && !this.recordNumber) {
            //     this.$alert('请生成备案号！', '提示')
            //     return
            // }
            if (!this.enterpriseJcAuthenticationUnit) {
                this.$alert('请输入发证单位！', '提示')
                return
            }
            if (!this.enterpriseCreateSiteTime) {
                this.$alert('请输入建站时间！', '提示')
                return
            }
            if (!this.businessTime || !this.businessTime.length) {
                this.$alert('请输入营业时间！', '提示')
                return
            }
            if (!/^1[3-9]\d{9}$/.test(this.enterpriseOwnerPhone)) {
                this.$alert('请正确输入负责人电话！', '提示')
                return
            }
            if (!/^1[3-9]\d{9}$/.test(this.enterpriseLinkMobile)) {
                this.$alert('请正确输入联系人电话！', '提示')
                return
            }
            console.log()
            if (!this.enterprisePostalcode || !/^\d{6}$/.test(this.enterprisePostalcode)) {
                this.$alert('请输入正确的邮政编码，应为6位数字组成！', '提示')
                return
            }
            if (!this.enterpriseOperationArea) {
                this.$alert('请输入经营范围！', '提示')
                return
            }
            if (this.enterpriseOperationArea.length > 250) {
                this.$alert('经营范围不能大于250字！', '提示')
                return
            }
            if (!this.enterpriseIntroduction) {
                this.$alert('请输入企业概况！', '提示')
                return
            }
            if (this.enterpriseIntroduction.length > 250) {
                this.$alert('企业概况不能大于250字！', '提示')
                return
            }
            if (!this.enterpriseBusinessLicense) {
                this.$alert('请上传营业执照！', '提示')
                return
            }
            if (!this.enterprisePicUrl) {
                this.$alert('请上传企业门店照片！', '提示')
                return
            }
            if (!this.enterpriseBusinessPermit) {
                this.$alert('请上传经营许可证照片！', '提示')
                return
            }
            if (!this.enterpriseAddr) {
                this.$alert('请输入企业地址！', '提示')
                return
            }
            if (!(this.center.lng > 0) || !(this.center.lat > 0)) {
                this.$alert('请输入经纬度！', '提示')
                return
            }
            if (this.sendData) {
                return
            }
            this.sendData = true
            var obj = {
                data: {
                    enterpriseTypeId: '2', // 企业类型
                    enterpriseName: this.enterpriseName, // 企业名称
                    enterpriseEconomicCategory: this.enterpriseEconomicCategory, // 经济性质
                    enterpriseCreditIdentifier: this.enterpriseCreditIdentifier, // 社会信用代码
                    enterpriseBusinessCertificate: this.enterpriseBusinessCertificate, // 经营许可证号
                    enterpriseRegion: this.enterpriseRegion, // 所在区域
                    enterpriseJcMetrologicalAuthentication: this.enterpriseJcMetrologicalAuthentication, // 计量认证号
                    enterpriseOperatingState: this.enterpriseOperatingState, // 营业状态
                    enterpriseOwner: this.enterpriseOwner, // 企业负责人
                    enterpriseLinkName: this.enterpriseLinkName, // 企业联系人
                    enterpriseBusinessPhone: this.enterpriseBusinessPhone, // 企业业务电话
                    enterpriseJcShortName: this.enterpriseJcShortName, // 企业简称
                    enterpriseJcScope: this.enterpriseJcScope + '',
                    enterpriseJcGrade: this.enterpriseJcGrade, // 企业等级
                    enterpriseJcAuthenticationUnit: this.enterpriseJcAuthenticationUnit, // 发证单位
                    enterpriseCreateSiteTime: (this.enterpriseCreateSiteTime - 0) + '', // 建站时间
                    enterpriseOwnerPhone: this.enterpriseOwnerPhone, // 负责人电话
                    enterpriseLinkMobile: this.enterpriseLinkMobile, // 联系人电话
                    enterprisePostalcode: this.enterprisePostalcode, // 企业邮政编码
                    enterpriseOperationArea: this.enterpriseOperationArea, // 企业经营范围
                    enterpriseIntroduction: this.enterpriseIntroduction, // 企业经营概况
                    enterpriseAddrProvince: this.$store.state.info.province, // 企业地址省
                    enterpriseAddrCity: this.$store.state.info.city, // 企业地址市
                    enterpriseAddrDistrict: this.enterpriseRegion, // 企业地址区
                    enterpriseAddr: this.enterpriseAddr, // 企业详细地址
                    enterpriseAddrX: this.center.lng + '', // 企业地址经度
                    enterpriseAddrY: this.center.lat + '', // 企业地址纬度
                    enterpriseSiteUrl: this.enterpriseSiteUrl, // 企业网址
                    enterpriseRegisterEmail: this.enterpriseRegisterEmail, // 企业邮箱
                    enterpriseJcAreaCovered: this.enterpriseJcAreaCovered, // 占地面积
                    enterpriseJcAuxiliaryArea: this.enterpriseJcAuxiliaryArea, // 辅助面积
                    enterpriseJcTestLaneSize: this.enterpriseJcTestLaneSize, // 试车道大小
                    enterpriseJcMainCheckArea: this.enterpriseJcMainCheckArea, // 主检测面积
                    enterpriseJcParkingArea: this.enterpriseJcParkingArea, // 停车场面积
                    enterpriseJcEquipmentTotal: this.enterpriseJcEquipmentTotal, // 设备总台数
                    enterpriseBusinessLicense: this.enterpriseBusinessLicense, // 营业执照照片
                    enterpriseBusinessPermit: this.enterpriseBusinessPermit, // 经营许可证照片
                    enterprisePicUrl: this.enterprisePicUrl // 企业门店照片
                }
            }
            if (this.validityTime && this.validityTime.length) {
                obj.data.enterpriseCertificateS = this.validityTime[0] // 许可证有效期开始时间
                obj.data.enterpriseCertificateE = this.validityTime[1] // 许可证有效期结束时间
            }
            if (this.authenticationTime && this.authenticationTime.length) {
                obj.data.enterpriseJcAuthenticationDateS = this.authenticationTime[0] // 证号有效期开始
                obj.data.enterpriseJcAuthenticationDateE = this.authenticationTime[1] // 证号有效期结束
            }
            if (this.businessTime && this.businessTime.length) {
                obj.data.enterpriseJcBusinessS = this.businessTime[0] // 营业时间开始
                obj.data.enterpriseJcBusinessE = this.businessTime[1] // 营业时间结束
            }
            if (this.brandList && this.brandList.length) {
                var ary = []
                this.brandList.forEach(item => {
                    ary.push(item.vehicleBrandId)
                })
                obj.enterpriseVehicleBrandJsonStr = ary + ''
            }
            console.log(obj)
            if (this.$route.query.id) {
                obj.data.enterpriseId = this.$route.query.id
                obj.data.enterpriseCoding = this.recordNumber
                this.$post('manage/enterprise/editinspectent', obj)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '保存成功',
                                callback: () => {
                                    this.$router.push('/companyArch?chooseId=2')
                                }
                            })
                        } else if (res.status === 204) {
                            this.recordNumber = ''
                            this.$alert(res.message, '提示')
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.sendData = false
                    })
                    .catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试！', '提示', {
                            confirmButtonText: '确定'
                        })
                        this.sendData = false
                    })
            } else {
                obj.data.enterpriseCoding = this.recordNumber
                this.$post('manage/enterprise/addinspectent', obj)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '保存成功',
                                callback: () => {
                                    this.$router.push('/companyArch?chooseId=2')
                                }
                            })
                        } else if (res.status === 204) {
                            this.recordNumber = ''
                            this.$alert(res.message, '提示')
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.sendData = false
                    })
                    .catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试！', '提示', {
                            confirmButtonText: '确定'
                        })
                        this.sendData = false
                    })
            }
        },
        // tab切换
        changeTabs (tab) {
            if (this.firstChangeTab) {
                return
            }
            if (tab.label === '拓展信息') {
                this.firstChangeTab = true
                setTimeout(() => {
                    this.center.lng = this.center.lng + 0.01
                    this.center.lat = this.center.lat + 0.01
                }, 200)
                setTimeout(() => {
                    this.center.lng = this.center.lng - 0.01
                    this.center.lat = this.center.lat - 0.01
                }, 200)
            }
        },
        // 关闭弹窗
        alertCancel () {
            this.brandSearch = ''
            this.alert = false
        },
        handleSizeChange () {},
        handleCurrentChange () {},
        // 百度地图初始化
        handler ({ BMap, map }) {
        },
        // 搜索百度地图
        mapSearch () {
            // 遍历地址信息,匹配省市区
            this.BMkeyword = this.enterpriseAddr
            this.BMlocation = CodeToText[this.$store.state.info.city]
        },
        // 搜索回调函数
        searchcomplete (res) {
            if (!res) {
                return
            }
            if (!res.Ar.length) {
                this.$message.error('未找到您输入的位置信息!')
            }
            if (res && res.Ar.length > 0) {
                this.center.lng = res.Ar[0].point.lng
                this.center.lat = res.Ar[0].point.lat
            }
        },
        // 点击地图触发事件
        changeLocation (res) {
            if (res.bb) {
                this.longitude = res.bb.LA.lng
                this.latitude = res.bb.LA.lat
            }
        }
    }
}
</script>

<style lang='less' scoped>
.testingArchDetail {
    .content {
        min-height: 700px;
        padding-bottom: 100px;
    }
}
.basic-info {
    width: 1108px;
    .left {
        float: left;
        width: 520px;
        .info-item {
            .name-red {
                color: #FF1200;
                font-size: 12px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                text-align: right;
                color: #000;
                font-size: 12px;
                margin-right: 6px;
            }
            .msg {
                display: inline-block;
                width: 345px;
            }
        }
    }
    .right {
        float: left;
        width: 586px;
        .info-item {
            text-align: right;
            .name-red {
                color: #FF1200;
                font-size: 12px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                text-align: right;
                color: #000;
                font-size: 12px;
                margin-right: 6px;
            }
            .msg {
                margin-left: 6px;
                display: inline-block;
                width: 345px;
                text-align: left;
            }
        }
    }
    .bottom {
        float: left;
        .info-item {
            .name-red {
                color: #FF1200;
                font-size: 12px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                margin-right: 6px;
                text-align: right;
                color: #000;
                font-size: 12px;
            }
            .msg {
                display: inline-block;
                width: 930px;
            }
        }
    }
}
.more-info {
    width: 1110px;
    padding: 30px 0;
    .picture {
        ul {
            text-align: left;
            li {
                display: inline-block;
                width: 294px;
                margin-right: 60px;
                &:last-child {
                    margin-right: 0px;
                }
                .name {
                    font-size: 12px;
                    color: #666;
                    width: 138px;
                    text-align: right;
                    line-height: 30px;
                }
                .img {
                    width: 152px;
                    height: 172px;
                    padding: 6px;
                    border: 1px solid #DDD;
                    position: relative;
                    cursor: pointer;
                    img {
                        cursor: pointer;
                    }
                    p {
                        text-align: center;
                        height: 36px;
                        line-height: 36px;
                        font-size: 12px;
                        color: #208DFF;
                        cursor: pointer;
                        position: absolute;
                        bottom: -4px;
                        left: 0;
                        width: 170px;
                    }
                    .file-input {
                        display: none;
                    }
                    .empty {
                        width: 100%;
                    }
                }
            }
        }
    }
    .map {
        position: relative;
        margin-top: 30px;
        h6 {
            padding-left: 30px;
            font-size: 12px;
            color: #000;
            padding-top: 30px;
            padding-bottom: 20px;
            padding-left: 58px;
            text-align: left;
        }
        .localtion-search{
            position:absolute;
            top: 76px;
            left: 530px;
        }
        .other-info {
            padding-left: 75px;
        }
        .info-item {
            width: 520px;
            .name-red {
                color: #FF1200;
                font-size: 12px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 142px;
                text-align: right;
                color: #000;
                font-size: 12px;
            }
            .msg {
                margin-left: 6px;
                display: inline-block;
                width: 345px;
                text-align: left;
                &.msg-radio {
                    width: 350px;
                    height: 34px;
                    line-height: 34px;
                    float: right;
                    margin-left: 3px;
                }
            }
        }
    }
    .input {
        .left {
            float: left;
            width: 520px;
            .info-item {
                height: 34px;
                line-height: 34px;
                .name-red {
                    color: #FF1200;
                    font-size: 12px;
                }
                margin-top: 10px;
                .name {
                    float: left;
                    width: 154px;
                    text-align: right;
                    color: #000;
                    font-size: 12px;
                }
                .msg {
                    float: left;
                    margin-left: 6px;
                    width: 345px;
                    text-align: left;
                    &.msg-radio {
                        padding-left: 10px;
                    }
                }
            }
        }
        .right {
            float: right;
            width: 520px;
            .info-item {
                height: 34px;
                line-height: 34px;
                .name-red {
                    color: #FF1200;
                    font-size: 12px;
                }
                margin-top: 10px;
                .name {
                    display: inline-block;
                    width: 158px;
                    text-align: right;
                    color: #000;
                    font-size: 12px;
                }
                .msg {
                    margin-left: 6px;
                    display: inline-block;
                    width: 335px;
                    &.msg-radio {
                        text-align: left;
                        padding-left: 10px;
                    }
                }
            }
        }
    }
}
.red {
    color: #ff0000;
}
.bm-view {
    width: 280px;
    height: 260px;
    position: absolute;
    top: 80px;
    right: 6px;
}
.brand {
    font-size: 12px;
    .manage {
        height: 70px;
        line-height: 70px;
        text-align: right;
        button {
            height: 30px;
            width: 98px;
            font-size: 14px;
            color: #000;
            border: 1px solid #666;
            outline: none;
            background-color: #fff;
            border-radius:3px;
            cursor: pointer;
        }
    }
    .brand-list {
        padding: 40px 40px 40px 0;
        min-height: 805px;
        max-width: 1300px;
        .list-item {
            width: 188px;
            height: 166px;
            border: 1px solid #DDDDDD;
            text-align: center;
            float: left;
            margin-left: 26px;
            margin-bottom: 32px;
            position: relative;
            transition: all .2s;
            cursor: pointer;
            .delete {
                display: none;
                position: absolute;
                top: 2px;
                right: 9px;
                width: 14px;
                height: 17px;
            }
            &:hover {
                border: 1px solid #359DFF;
                .delete {
                    display: block;
                }
            }
            img {
                margin-top: 8px;
                width: 120px;
                height: 120px;
            }
            h6 {
                font-size: 12px;
                color: #666;
                font-weight: normal;
                line-height: 30px;
            }
        }
    }
    .add-brand {
        float:left;
        width: 188px;
        height: 166px;
        border: 1px dashed #409efe;
        text-align: center;
        font-size: 12px;
        margin-left: 26px;
        color: #666;
        cursor: pointer;
        img {
            margin-top: 44px;
        }
        p {
            margin-top: 36px;
        }
    }
}
.transfer {
    text-align: center;
    margin: 20px 40px 0 40px;
    position: relative;
    .search {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 190px;
        height: 28px;
        line-height: 28px;
        background-color: #F3F6FC;
        border: 1px solid #EAF0F7;
        input {
            width: 170px;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 10px;
            background-color: #F3F6FC;
            border-bottom: 1px solid #EAF0F7;
            font-size: 13px;
        }
    }
    .all-brand {
        width: 190px;
        height: 242px;
        border: 1px solid #EAF0F7;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 28px;
        float: left;
        .all-brand-list {
            .letter {
                color: #7B828A;
                font-size: 13px;
                text-align: left;
                padding-left: 42px;
                line-height: 30px;
            }
            .item {
                padding: 4px 0px;
                text-align: left;
                font-size: 13px;
                color: #666;
                cursor: pointer;
                &.active {
                    background-color: #f3f6fc;
                }
                .img {
                    display: inline-block;
                    width: 42px;
                    text-align: right;
                }
                img {
                    height: 15px;
                    width: 15px;
                    margin-right: 4px;
                }
            }
        }
        .search {
            height: 28px;
            line-height: 28px;
            background-color: #F3F6FC;
            margin-bottom: 6px;
            input {
                width: 170px;
                height: 100%;
                border: none;
                outline: none;
                padding: 0 10px;
                background-color: #F3F6FC;
                border-bottom: 1px solid #EAF0F7;
                font-size: 13px;
            }
        }
        &.right {
            margin-top: 0;
            height: 270px;
        }
    }
    .transfer-btn {
        float: left;
        padding: 70px 0px 0 0px;
        width: 110px;
        .btn {
            width: 77px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            font-weight: bold;
            color: #536083;
            border: 1px solid #BBCBDF;
            margin: 0 0 10px 0;
            cursor: pointer;
            border-radius:2px;
            padding: 0;
            &.disable {
                color: #BBCBDF;
            }
        }
    }
}
.add-brand-alert {
    .btn {
        text-align: center;
        margin: 22px 0;
        .save {
            background-color: #3E94FE;
            border: 1px solid #3984E5;
            color: #fff;
        }
    }
}
</style>
<style lang="less">
.testingArchDetail {
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
    .basic-info {
        .el-input {
            width: 100%;
        }
        .el-select {
            width: 100%
        }
        .el-input__icon {
            line-height: 34px;
        }
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
            font-size: 12px;
            width: 100%;
        }
        .height {
            .el-textarea__inner {
                height: 68px;
                resize: none;
                color: #333;
                font-size: 12px;
            }
        }
        .right {
            .info-item {
                &.record {
                    .el-input {
                        width: 274px;
                        margin-right: 16px;
                    }
                    .el-button--primary {
                        width: 55px;
                        height: 34px;
                        padding: 0;
                    }
                    .el-input, .el-button--primary {
                        vertical-align: middle;
                    }
                    .disable {
                        background-color: #BBCBDF;
                        border: 1px solid #BBCBDF;
                    }
                }
                &.detail {
                    .el-input {
                        width: 100%;
                    }
                }
            }
        }
        .bottom {
            .el-input {
                width: 930px;
            }
        }
        .el-input__suffix {
            top: 3px;
        }
        .el-date-editor .el-range__icon {
            line-height: 26px;
        }
    }
    .more-info {
        .el-input--suffix .el-input__inner {
            width: 345px;
        }
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
            font-size: 12px;
            width: 100%;
        }
    }
    .add-brand-alert {
        .el-button {
            width: 78px;
            height: 30px;
            line-height: 30px;
            color: #536083;
            border: 1px solid #BBCBDF;
            border-radius:2px;
            background-color: #F6F9FC;
            padding: 0;
        }
    }
    .upload-demo, .el-upload {
        width: 100%;
        height: 152px;
    }
    .el-upload-list {
        position: absolute;
        bottom: -28px;
        left: 8px;
    }
}
</style>
