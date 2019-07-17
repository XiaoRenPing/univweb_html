<template>
    <div class="audit">
        <div class="content">
            <!-- <tool-bar :title="'业务操作>企业备案审核>企业详情'">
                <el-button v-if="!changeName" class="search_btn adopt_btn" type="primary" @click="alertAudit=true">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>企业备案审核</span>
                </el-button>
                <el-button v-else class="search_btn adopt_btn" type="primary" @click="changeAlert=true">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>{{changeName}}</span>
                </el-button> -->
                <!-- <el-button class="search_btn" type="primary" @click="adopt(1)">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>通过</span>
                </el-button>
                <el-button class="search_btn" type="primary" @click="refuse(-1)">
                    <img src="../../assets/images/refuse.png" alt="">
                    <span>拒绝</span>
                </el-button> -->
                <!-- <el-button class="search_btn" @click="$router.push('/recording')">
                    <img src="../../assets/images/icon_back.png" alt="">
                    <span>返回</span>
                </el-button> -->
                <!-- <button class="back_btn" @click="$router.push('/recording')">返回</button>
            </tool-bar> -->
            <div class='wrap'>
                <el-tabs v-model="activeName" type="card" @tab-click="changeTabs">
                    <el-tab-pane label="基本信息" name="first">
                        <div class="table_box">
                            <table class="table">
                                <tr>
                                    <td class="title">企业名称：</td>
                                    <td class="msg">{{dataObj.enterpriseName}}</td>
                                    <td class="title">企业类型：</td>
                                    <td class="msg">{{dataObj.enterpriseTypeId === '1' ? '维修企业' : ''}}</td>
                                </tr>
                                <tr>
                                    <td class="title">所在区域：</td>
                                    <td class="msg">{{dataObj.enterpriseRegionName}}</td>
                                    <td class="title">企业经营状态：</td>
                                    <td class="msg">{{dataObj.enterpriseOperatingState}}</td>
                                </tr>
                                <tr>
                                    <td class="title">经营许可证号：</td>
                                    <td class="msg">{{dataObj.enterpriseBusinessCertificate}}</td>
                                    <td class="title">许可证有效期：</td>
                                    <td class="msg">{{dataObj.enterpriseCertificateS}}&nbsp;至&nbsp;{{dataObj.enterpriseCertificateE}}</td>
                                </tr>
                                <tr>
                                    <td class="title">社会信用代码：</td>
                                    <td class="msg">{{dataObj.enterpriseCreditIdentifier}}</td>
                                    <td class="title">经济类型：</td>
                                    <td class="msg">{{dataObj.enterpriseEconomicCategory}}</td>
                                </tr>
                                <tr>
                                    <td class="title">企业负责人：</td>
                                    <td class="msg">{{dataObj.enterpriseOwner}}</td>
                                    <td class="title">企业联系人：</td>
                                    <td class="msg">{{dataObj.enterpriseLinkName}}</td>
                                </tr>
                                <tr>
                                    <td class="title">负责人电话：</td>
                                    <td class="msg">{{dataObj.enterpriseOwnerPhone}}</td>
                                    <td class="title">联系人电话：</td>
                                    <td class="msg">{{dataObj.enterpriseLinkMobile}}</td>
                                </tr>
                                <tr>
                                    <td class="title">负责人身份证：</td>
                                    <td class="msg">{{dataObj.enterpriseOwnerIdcardnumber}}</td>
                                    <td class="title">联系人身份证：</td>
                                    <td class="msg">{{dataObj.enterpriseLinkIdcardnumber}}</td>
                                </tr>
                                <tr>
                                    <td class="title">企业业务电话：</td>
                                    <td class="msg">{{dataObj.enterpriseBusinessPhone}}</td>
                                    <td class="title">企业邮政编码：</td>
                                    <td class="msg">{{dataObj.enterprisePostalcode}}</td>
                                </tr>
                                <tr>
                                    <td class="title">业务类别：</td>
                                    <td class="msg">{{dataObj.enterpriseBusinessCategory}}</td>
                                    <td class="title">营业时间：</td>
                                    <td class="msg">{{dataObj.enterpriseJcBusinessS}}&nbsp;至&nbsp;{{dataObj.enterpriseJcBusinessE}}</td>
                                </tr>
                                <tr>
                                    <td class="title">经营地址：</td>
                                    <td class="msg" colspan="3">{{dataObj.enterpriseOperatingAddress}}</td>
                                </tr>
                                <tr>
                                    <td class="title">经营范围：</td>
                                    <td class="msg" colspan="3">{{dataObj.enterpriseOperationArea}}</td>
                                </tr>
                                <tr>
                                    <td class="title">企业概况：</td>
                                    <td class="msg" colspan="3">{{dataObj.enterpriseIntroduction}}</td>
                                </tr>
                            </table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="拓展信息" name="second">
                        <div class="table_box mor-info">
                            <table class="table">
                                <tr class="info">
                                    <td class="title">企业网址：</td>
                                    <td class="msg">{{dataObj.enterpriseSiteUrl}}</td>
                                    <td class="title">是否尾气治理站：</td>
                                    <td class="msg">{{dataObj.enterpriseTailGasTreatmentStationIs === '1' ? '是' : '否'}}</td>
                                </tr>
                                <tr class="info">
                                    <td class="title">是否连锁或集团经营：</td>
                                    <td class="msg">{{dataObj.enterpriseChainOrGroupIs === '1' ? '是' : '否'}}</td>
                                    <td class="title">是否为4S店或特约维修店：</td>
                                    <td class="msg">{{dataObj.enterprise4sSpecialMaintenanceIs === '1' ? '是' : '否'}}</td>
                                </tr>
                                <tr class="info">
                                    <td class="title">是否连锁或集团经营总店：</td>
                                    <td class="msg">{{dataObj.enterpriseChainOrGroupIs === '1' ? '是' : '否'}}</td>
                                    <td class="title">连锁或集团经营总店名称：</td>
                                    <td class="msg">{{dataObj.enterpriseGroupStoreName}}</td>
                                </tr>
                                <tr class="info">
                                    <td class="title">质量保障里程(公里)：</td>
                                    <td class="msg">{{dataObj.enterpriseQaMileage}}</td>
                                    <td class="title">质量保障日期(天)：</td>
                                    <td class="msg">{{dataObj.enterpriseQaDay}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="more-img">
                            <div class="item">
                                <div class="title">地图位置</div>
                                <div class="img">
                                    <baidu-map :center="center" :scroll-wheel-zoom="true" :double-click-zoom="true" :zoom="15" @click="changeLocation">
                                        <bm-view class="bm-view"></bm-view>
                                        <bm-local-search :keyword="BMkeyword" :panel="false" :selectFirstResult="true" :auto-viewport="true" :location="BMlocation" @searchcomplete="searchcomplete"></bm-local-search>
                                    </baidu-map>
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">经营许可证照片</div>
                                <div class="img" ref="permitWrap">
                                    <img v-show="dataObj.enterpriseBusinessPermit" ref="permitImg" :src="dataObj.enterpriseBusinessPermit" alt="">
                                    <div class="default-img" v-show="!dataObj.enterpriseBusinessPermit">
                                        <img src="../../assets/images/audit/default_icon_photo.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">营业执照照片</div>
                                <div class="img" ref="licenseWrap">
                                    <img v-show="dataObj.enterpriseBusinessLicense" ref="licenseImg" :src="dataObj.enterpriseBusinessLicense" alt="">
                                    <div class="default-img" v-show="!dataObj.enterpriseBusinessLicense">
                                        <img src="../../assets/images/audit/default_icon_photo.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">门面照片</div>
                                <div class="img" ref="picWrap">
                                    <img v-show="dataObj.enterprisePicUrl" ref="picImg" :src="dataObj.enterprisePicUrl" alt="">
                                    <div class="default-img" v-show="!dataObj.enterprisePicUrl">
                                        <img src="../../assets/images/audit/default_icon_photo.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="主修品牌" name="third" class="main-brand">
                        <ul class="brand clearfix" v-if="dataObj.enterpriseVehicleBrandList">
                            <li v-for="item in dataObj.enterpriseVehicleBrandList" :key="item.id">
                                <img :src="item.vehicleBrandLogo" alt="">
                                <h6>{{item.vehicleBrandName}}</h6>
                            </li>
                        </ul>
                        <p v-if="!dataObj.enterpriseVehicleBrandList" class="empty">暂无数据</p>
                    </el-tab-pane>
                    <el-tab-pane label="仪表工具" name="tab1" class="main-brand">
                        <el-table
                            :data="enterpriseInstrumentToolsList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                            prop="orderNumber"
                            label="序号"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="instrumentName"
                            label="设备名称"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="instrumentCount"
                            label="数量"
                            align="center">
                                <!-- <template slot-scope="scope">
                                    <input class="" type="number" v-model="scope.row.instrumentCount">
                                </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="专用设备" name="tab2" class="main-brand">
                        <el-table
                            :data="enterpriseSpecialEquipmentList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                            prop="orderNumber"
                            label="序号"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="specialEquipmentName"
                            label="设备名称"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="isBus"
                            label="大中型客车"
                            align="center">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isBus" disabled></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="isTrunk"
                            label="大型货车"
                            align="center">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isTrunk" disabled></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="isCar"
                            label="小型车"
                            align="center">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isCar" disabled></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="otherCondition"
                            label="其他条件"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="equipmentCount"
                            label="数量"
                            align="center">
                                <!-- <template slot-scope="scope">
                                    <input class="" type="text" v-model="scope.row.equipmentCount">
                                </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="检测设备" name="tab3" class="main-brand">
                        <el-table
                            :data="enterpriseDetectEquipmentList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="orderNumber"
                                label="序号"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="detectEquipmentName"
                                label="设备名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="otherCondition"
                                label="其他条件"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="equipmentCount"
                                label="数量"
                                align="center">
                                    <!-- <template slot-scope="scope">
                                        <input class="" type="text" v-model="scope.row.equipmentCount">
                                    </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="通用设备" name="tab4" class="main-brand">
                        <el-table
                            :data="enterpriseUniversalEquipmentList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="orderNumber"
                                label="序号"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="universalEquipmentName"
                                label="设备名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="equipmentCount"
                                label="数量"
                                align="center">
                                    <!-- <template slot-scope="scope">
                                        <input class="" type="text" v-model="scope.row.equipmentCount">
                                    </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="人员条件" name="tab5" class="main-brand">
                        <el-table
                            :data="enterpriseMemberConditionList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="memberConditionType"
                                label="类型"
                                width="200"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="memberConditionDescription"
                                label="相关条件"
                                align="left">
                            </el-table-column>
                            <el-table-column
                                prop="memberCount"
                                label="实有人数"
                                width="120"
                                align="center">
                                    <!-- <template slot-scope="scope">
                                        <input class="" type="text" v-model="scope.row.memberCount">
                                    </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="设施条件" name="tab6" class="main-brand">
                        <el-table
                            :data="enterpriseEquipmentConditionList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="equipmentConditionType"
                                label="类型"
                                width="200"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="equipmentConditionDescription"
                                label="相关条件"
                                align="left">
                                <template slot-scope="scope">
                                    <p v-html="scope.row.equipmentConditionDescription"></p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="equipmentSize"
                                label="实有面积(m²)"
                                width="120"
                                align="center">
                                    <!-- <template slot-scope="scope">
                                        <input class="" type="text" v-model="scope.row.equipmentSize">
                                    </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="组织管理" name="tab7" class="main-brand">
                        <el-table
                            :data="enterpriseOrganizationmanageConditionList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="organizationmanageConditionType"
                                label="类型"
                                width="200"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="organizationmanageConditionDescription"
                                label="相关条件"
                                align="left">
                                <template slot-scope="scope">
                                    <p v-html="scope.row.organizationmanageConditionDescription"></p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="相关附件" name="tab8" class="main-brand">
                        <el-table
                            :data="enterpriseAttachmentsList"
                            :header-cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column
                                prop="attachmentsRemark"
                                label="证明文件"
                                align="left">
                            </el-table-column>
                            <el-table-column
                                prop="organizationmanageConditionDescription"
                                label="相关图片"
                                width="200"
                                align="center">
                                <template slot-scope="scope">
                                    <img style="padding:5px;border:1px solid #dddddd;margin:5px;" :src="scope.row.url" v-if="scope.row.url" width="80" height="80" alt="">
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <modal :alert="alertAudit" :title="'企业备案审核'" :width="520"  @alertConfirm="alertConfirm2" @alertCancel="alertCancel2">
            <div class="inner">
                <div class="line clearfix">
                    <label class="label">企业名称：</label>
                    <el-input class="el_ipt" type="text" v-model="dataObj.enterpriseName" disabled></el-input>
                </div>
                <div class="line clearfix">
                    <label class="label"><span class="red">*&nbsp;</span>经营类别：</label>
                    <el-select class="el_ipt" v-model="enterpriseBusinessCategory" clearable placeholder="请选择">
                        <el-option
                            v-for="item in bussinessCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="line clearfix">
                    <label class="label"><span class="red">*&nbsp;</span>经营范围：</label>
                    <el-checkbox-group class="el_ipt clearfix" style="overflow:hidden;" v-model="businessScope">
                        <el-checkbox
                            class="clearfix"
                            :label="item.label"
                            :value="item.label"
                            v-for="item in businessScopeList"
                            :key="item.label">
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="line clearfix">
                    <label class="label">企业备案号：</label>
                    <el-input class="el_ipt2" disabled v-model="recordNumber"></el-input>
                    <el-button type="primary" class="scBtn"  @click="getRecordNumber">生成</el-button>
                </div>
                <div class="btn">
                    <el-button class="search_btn" type="primary" @click="alertConfirm2" v-text="'同意'"></el-button>
                    <el-button class="search_btn" @click="alert = true" v-text="'拒绝'"></el-button>
                </div>
            </div>
        </modal>
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
            </div>
        </modal>
        <modal
            :alert="changeAlert"
            @alertConfirm="alertConfirm3"
            @alertCancel="alertCancel3"
            :width="520"
            :title="changeName">
            <div class="changeBox">
                <div class="change_before">
                    <h4>变更前</h4>
                    <!-- <div class="line">
                        <label for="">经营范围：</label>
                        <p>大中型客车维修,大中型客车维修,大中型客车维修,大中型客车维修,大中型客车维修大中型客车维修大中型客车维修,大中型客车维修</p>
                    </div> -->
                    <div class="line clearfix" v-if="changeType === 0">
                        <label class="name">企业名称：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseName}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseName"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 6">
                        <label class="name">经营地址：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseOperatingAddress}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseOperatingAddress"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 5">
                        <label class="name">企业法人：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseOwner}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseOwner"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 5">
                        <label class="name">法人电话：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseOwnerPhone}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseOwnerPhone"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 7">
                        <label class="name">经营范围：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseOperationArea}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseOperationArea"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 4">
                        <label class="name">许可证号：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseBusinessCertificate}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseBusinessCertificate"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 4">
                        <label class="name">许可证有效期：</label>
                        <p class="msg lh34">{{dataObj.enterpriseCertificateS}}至{{dataObj.enterpriseCertificateE}}</p>
                    </div>
                    <div class="line clearfix" v-if="changeType === 2 || changeType === 3">
                        <label class="name">企业经营状态：</label>
                        <!-- <p class="msg">{{dataObj.enterpriseOperatingState}}</p> -->
                        <el-input class="iptCommon" disabled v-model="dataObj.enterpriseOperatingState"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 1">
                        <label class="name">经济类型：</label>
                        <p class="msg">{{dataObj.enterpriseEconomicCategory}}</p>
                        <!-- <el-input class="iptCommon" disabled v-model="dataObj.enterpriseEconomicCategory"></el-input> -->
                    </div>
                </div>
                <div class="change_after">
                    <h4>变更后</h4>
                    <div class="line clearfix" v-if="changeType === 0">
                        <label class="name">企业名称：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 6">
                        <label class="name">经营地址：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 5">
                        <label class="name">企业法人：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 5">
                        <label class="name">法人电话：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordField2E}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordField2E"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 7">
                        <label class="name">经营范围：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 4">
                        <label class="name">许可证号：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 4">
                        <label class="name">许可证有效期：</label>
                        <p class="msg lh34">{{changeObj.enterpriseChangeRecordField3S}}至{{changeObj.enterpriseChangeRecordField3E}}</p>
                    </div>
                    <div class="line clearfix" v-if="changeType === 2">
                        <label class="name">企业经营状态：</label>
                        <!-- <p class="msg lh34">注销</p> -->
                        <el-input class="iptCommon" disabled value ="注销"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 3">
                        <label class="name">企业经营状态：</label>
                        <!-- <p class="msg lh34">歇业</p> -->
                        <el-input class="iptCommon" disabled value ="歇业"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 2 || changeType === 3">
                        <label class="name">生效日期：</label>
                        <!-- <p class="msg">{{changeObj.enterpriseChangeRecordFieldE}}</p> -->
                        <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input>
                    </div>
                    <div class="line clearfix" v-if="changeType === 1">
                        <label class="name">经济类型：</label>
                        <p class="msg lh34">{{changeObj.enterpriseChangeRecordFieldE | filterCommon(economicsList)}}</p>
                        <!-- <el-input class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordFieldE"></el-input> -->
                    </div>
                    <div class="line clearfix" v-if="changeObj.enterpriseChangeRecordFileUrl" id='viewer'>
                        <label for="">附件文件：</label>
                        <img v-if="!changeObj.enterpriseChangeRecordFileUrl" src="../../assets/images/img_photo.png" alt="">
                        <img v-else :src="changeObj.enterpriseChangeRecordFileUrl" style="max-width:100px;" @click="setViewer">
                    </div>
                    <div class="line clearfix">
                        <label for="">备注说明：</label>
                        <!-- <p>{{changeObj.enterpriseChangeRecordBak}}</p> -->
                        <el-input type="textarea" :rows="3" class="iptCommon" disabled v-model="changeObj.enterpriseChangeRecordBak"></el-input>
                    </div>
                </div>
                <div class="btnBox">
                    <el-button class="search_btn" type="primary" @click="alertConfirm3" v-text="'同意变更'"></el-button>
                    <el-button class="search_btn" @click="alertX = true" v-text="'拒绝变更'"></el-button>
                </div>
            </div>
        </modal>
        <modal :alert="alertX" :title="'温馨提示'" :width="450" :height="242" @alertConfirm="alertConfirmX" @alertCancel="alertCancelX">
            <div class="alert-content clearfix">
                <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="refuseMsgX"
                    class="textarea">
                </el-input>
            </div>
            <div class="btn">
                <el-button class="search_btn" type="primary" @click="alertConfirmX" v-text="'确定'"></el-button>
                <el-button class="search_btn" @click="alertCancelX" v-text="'取消'"></el-button>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button v-if="!changeName" type="primary" @click="alertAudit=true">企业备案审核</el-button>
            <el-button v-else type="primary" @click="changeAlert=true">{{changeName}}</el-button>
            <el-button class="react_btn" @click="$router.push('/recording')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
// import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import { getCookie } from '@/utils/cookie.js'
import { filterTime } from '@/utils/filterTime.js'
import { bussinessCategory, economicsList } from '@/utils/type.js'
import Viewer from 'viewerjs'
export default {
    name: 'audit',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业备案审核', path: '' }, { title: '企业备案详情', path: '' }
            ],
            enterpriseInstrumentToolsList: [], // 仪表工具
            enterpriseSpecialEquipmentList: [], // 专业设备
            enterpriseDetectEquipmentList: [], // 检测设备
            enterpriseUniversalEquipmentList: [], // 通用设备
            enterpriseMemberConditionList: [], // 人员条件
            enterpriseEquipmentConditionList: [], // 设施条件
            enterpriseOrganizationmanageConditionList: [], // 组织管理
            enterpriseAttachmentsList: [], // 相关附加
            viewer: '', // 照片查看器
            alertX: false, // 拒绝弹窗2
            refuseMsgX: '', // 拒绝理由2
            enterpriseChangeRecordFieldE: '', // 经营类别
            economicsList,
            changeType: 0, // 变更类型
            changeName: '',
            changeTypeList: [
                {
                    value: '企业名称变更',
                    id: 1
                },
                {
                    value: '经济类型变更',
                    id: 2
                },
                {
                    value: '废业申请',
                    id: 3
                },
                {
                    value: '歇业申请',
                    id: 4
                },
                {
                    value: '延续许可变更',
                    id: 5
                },
                {
                    value: '企业法人变更',
                    id: 6
                },
                {
                    value: '经营地址变更',
                    id: 7
                },
                {
                    value: '经营范围变更',
                    id: 8
                }
            ],
            changeObj: {}, // 变更信息
            changeAlert: false, // 是否显示变更弹窗
            alertAudit: false, // 是否显示审核弹窗
            bussinessCategory,
            businessScope: [], // 经验范围
            businessScopeList: [], // 经营范围列表
            enterpriseBusinessCategory: '', // 经验类别
            recordNumber: '', // 备案号
            dataObj: '', // 全部信息
            input: '',
            value: '',
            businessHours: '',
            validityTime: '',
            radio: '1',
            textarea: '',
            activeName: 'first',
            alert: false,
            alertTitle: '企业备案拒绝',
            refuseMsg: '',
            regionList: [],
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
                    label: '整顿'
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
            center: { // 坐标经纬度
                lng: 0,
                lat: 0
            },
            BMkeyword: '', // 百度搜索关键词
            BMlocation: '' // 百度搜索城市名称
        }
    },
    created () {
        // let view = this.$route
        // this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        //     const latestView = this.$store.state.visitedViews.slice(-1)[0]
        //     if (latestView) {
        //         this.$router.push(latestView)
        //     } else {
        //         this.$router.push('/')
        //     }
        // })
        this.queryData2()
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
    watch: {
        enterpriseBusinessCategory (val) {
            this.businessScope = []
            if (val === '01') {
                this.businessScopeList = [
                    { label: '大中型客车维修' },
                    { label: '大中型货车维修' },
                    { label: '小型车辆维修' },
                    { label: '危险货物运输车辆维修' },
                    { label: '燃气汽车维修和电动汽车维修' }
                ]
            } else if (val === '02') {
                this.businessScopeList = [
                    { label: '大中型客车维修' },
                    { label: '大中型货车维修' },
                    { label: '小型车辆维修' },
                    { label: '燃气汽车维修和电动汽车维修' }
                ]
            } else if (val === '03') {
                this.businessScopeList = [
                    { label: '汽车综合小修' },
                    { label: '发动机维修' },
                    { label: '车身维修' },
                    { label: '电气系统维修' },
                    { label: '自动变速器维修' },
                    { label: '汽车润滑与养护' },
                    { label: '曲轴修磨' },
                    { label: '气缸镗磨' },
                    { label: '轮胎动平衡及修补' },
                    { label: '散热器维修' },
                    { label: '空调维修' },
                    { label: '四轮定位检测调整' },
                    { label: '汽车美容装潢' },
                    { label: '喷油泵和喷油器维修' },
                    { label: '汽车玻璃安装及修复' }
                ]
            }
        }
    },
    methods: {
        queryData2 () {
            if (this.$route.query.enterpriseChangeRecordId) {
                this.$post('bus/enterprise/change/record/detail', {
                    data: {
                        enterpriseChangeRecordId: this.$route.query.enterpriseChangeRecordId,
                        enterpriseId: this.$route.query.enterpriseId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.changeObj = res.data
                        this.changeType = res.data.enterpriseChangeRecordType - 1
                        this.changeTypeList.forEach(item => {
                            if (res.data.enterpriseChangeRecordType === item.id) {
                                this.changeName = item.value
                            }
                        })
                        this.enterpriseAttachmentsList = res.data.enterpriseAttachmentsList
                        this.enterpriseDetectEquipmentList = res.data.enterpriseDetectEquipmentList
                        this.enterpriseEquipmentConditionList = res.data.enterpriseEquipmentConditionList
                        this.enterpriseInstrumentToolsList = res.data.enterpriseInstrumentToolsList
                        this.enterpriseMemberConditionList = res.data.enterpriseMemberConditionList
                        this.enterpriseOrganizationmanageConditionList = res.data.enterpriseOrganizationmanageConditionList
                        this.enterpriseSpecialEquipmentList = res.data.enterpriseSpecialEquipmentList
                        this.enterpriseUniversalEquipmentList = res.data.enterpriseUniversalEquipmentList
                        if (this.enterpriseSpecialEquipmentList) {
                            this.enterpriseSpecialEquipmentList.forEach(e => {
                                e.isCar = !!e.isCar
                                e.isBus = !!e.isBus
                                e.isTrunk = !!e.isTrunk
                            })
                        }
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
                        res.data.enterpriseBusinessCategory === '01' && (res.data.enterpriseBusinessCategory = '一类维修企业')
                        res.data.enterpriseBusinessCategory === '02' && (res.data.enterpriseBusinessCategory = '二类维修企业')
                        res.data.enterpriseBusinessCategory === '03' && (res.data.enterpriseBusinessCategory = '三类维修企业')
                        this.economicsList.forEach(item => {
                            if (item.value === res.data.enterpriseEconomicCategory) {
                                res.data.enterpriseEconomicCategory = item.label
                            }
                        })
                        this.operateStateList.forEach(item => {
                            if (item.value === res.data.enterpriseOperatingState) {
                                res.data.enterpriseOperatingState = item.label
                            }
                        })
                        this.imgLoad('permitWrap', 'permitImg', res.data.enterpriseBusinessPermit)
                        this.imgLoad('picWrap', 'picImg', res.data.enterprisePicUrl)
                        this.imgLoad('licenseWrap', 'licenseImg', res.data.enterpriseBusinessLicense)
                        this.dataObj = res.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        // 创建照片查看器
        setViewer () {
            if (this.viewer) this.viewer.destroy()
            this.viewer = new Viewer(document.querySelector('#viewer'))
            this.viewer.view()
        },
        alertCancelX () {
            this.alertX = false
        },
        alertConfirmX () {
            this.refusedChange()
        },
        alertConfirm3 () {
            this.$post('bus/enterprise/change/record/audit', {
                data: {
                    enterpriseChangeRecordId: this.$route.query.enterpriseChangeRecordId,
                    enterpriseChangeRecordAudit: 1
                }
            }).then(res => {
                this.changeAlert = false
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/recording')
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('网络错误，请重试！', '提示')
            })
        },
        alertCancel3 () {
            this.changeAlert = false
        },
        // rejectChange () {
        //     this.$post('bus/enterprise/change/record/audit', {
        //         data: {
        //             enterpriseChangeRecordId: this.$route.query.enterpriseChangeRecordId,
        //             enterpriseChangeRecordAudit: -1
        //         }
        //     }).then(res => {
        //         this.changeAlert = false
        //         if (res.status === 200) {
        //             this.$router.push('/recording')
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },
        refusedChange () {
            if (!this.refuseMsgX) {
                this.$alert('拒绝理由不能为空！', '提示')
                return
            }
            if (this.refuseMsgX.length > 250) {
                this.$alert('拒绝理由不能大于250字', '提示')
                return
            }
            this.$post('bus/enterprise/change/record/audit', {
                data: {
                    enterpriseChangeRecordId: this.$route.query.enterpriseChangeRecordId,
                    enterpriseChangeRecordAudit: -1,
                    enterpriseChangeRecordRejectBak: this.refuseMsgX
                }
            }).then(res => {
                this.changeAlert = false
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/recording')
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('网络错误，请重试！', '提示')
            })
        },
        alertConfirm2 () {
            this.adopt()
        },
        alertCancel2 () {
            this.alertAudit = false
        },
        getRecordNumber () {
            if (!this.dataObj.enterpriseName) {
                this.$alert('请输入企业名称！', '提示')
                return
            }
            if (!this.dataObj.enterpriseRegion) {
                this.$alert('请选择所在区域！', '提示')
                return
            }
            if (!this.enterpriseBusinessCategory) {
                this.$alert('请选择经营类别！', '提示')
                return
            }
            this.$post('manage/enterprise/findEnterpriseRecordNumber', {
                data: {
                    enterpriseName: this.dataObj.enterpriseName,
                    enterpriseRegion: this.dataObj.enterpriseRegion,
                    enterpriseBusinessCategory: this.enterpriseBusinessCategory,
                    enterpriseTypeId: this.dataObj.enterpriseTypeId
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
        changeTabs (tab) {
            if (tab.label === '拓展信息') {
                setTimeout(() => {
                    this.center.lng = this.dataObj.enterpriseAddrX - 0
                    this.center.lat = this.dataObj.enterpriseAddrY - 0
                }, 200)
            }
        },
        // 搜索百度地图
        mapSearch () {
            // 遍历地址信息,匹配省市区
            this.BMkeyword = this.region + this.detailAddress
            this.BMlocation = this.city
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
        },
        // 地区过滤
        regionToText (id) {
            for (var i = 0; i < this.regionList.length; i++) {
                if (this.regionList[i].regionId === id) {
                    return this.regionList[i].regionName
                }
            }
        },
        // 获取详情数据
        queryData () {
            var obj = {
                data: {}
            }
            if (this.$route.query.enterpriseEvaluateApplyId) {
                obj.data.enterpriseEvaluateApplyId = this.$route.query.enterpriseEvaluateApplyId
            }
            if (this.$route.query.enterpriseId) {
                obj.data.enterpriseId = this.$route.query.enterpriseId
            }
            // this.$post('bus/enterprise/change/record/find', { data: { enterpriseChangeRecordType: 1 }, enterpriseName:  })
            this.$post('bas/enterprise/evaluate/evaleentdetail', obj).then(res => {
                if (res.status === 200) {
                    res.data.enterpriseBusinessCategory === '01' && (res.data.enterpriseBusinessCategory = '一类维修企业')
                    res.data.enterpriseBusinessCategory === '02' && (res.data.enterpriseBusinessCategory = '二类维修企业')
                    res.data.enterpriseBusinessCategory === '03' && (res.data.enterpriseBusinessCategory = '三类维修企业')

                    res.data.enterpriseRegion = this.regionToText(res.data.enterpriseRegion)
                    this.economicsList.forEach(item => {
                        if (item.value === res.data.enterpriseEconomicCategory) {
                            res.data.enterpriseEconomicCategory = item.label
                        }
                    })
                    this.operateStateList.forEach(item => {
                        if (item.value === res.data.enterpriseOperatingState) {
                            res.data.enterpriseOperatingState = item.label
                        }
                    })
                    this.imgLoad('permitWrap', 'permitImg', res.data.enterpriseBusinessPermit)
                    this.imgLoad('picWrap', 'picImg', res.data.enterprisePicUrl)
                    this.imgLoad('licenseWrap', 'licenseImg', res.data.enterpriseBusinessLicense)
                    this.dataObj = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 图片加载后处理
        imgLoad (parent, child, url) {
            var radio = 200 / 240
            var _this = this
            var img = new Image()
            img.src = url
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs[child].style.width = '100%'
                } else {
                    _this.$refs[child].style.height = '100%'
                }
                _this[child] = url
            }
        },
        // 拒绝弹窗
        alertConfirm () {
            if (!this.refuseMsg) {
                this.$alert('拒绝理由不能为空！', '提示')
                return
            }
            if (this.refuseMsg.length > 250) {
                this.$alert('拒绝理由不能大于250字', '提示')
                return
            }
            this.alert = false
            this.$post('bus/enterprise/change/record/audit', {
                'data': {
                    'enterpriseChangeRecordId': this.$route.query.enterpriseChangeRecordId,
                    // 'enterpriseName': this.dataObj.enterpriseName,
                    'enterpriseChangeRecordAudit': -1,
                    // 'enterpriseRecordApplyId': this.$route.query.enterpriseEvaluateApplyId,
                    'enterpriseChangeRecordRejectBak': this.refuseMsg
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/recording')
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('网络错误，请重试！', '提示')
            })
        },
        alertCancel () {
            this.alert = false
        },
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findRegionByDomainCity', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                        this.queryData2()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 通过or拒绝
        adopt () {
            // if (!this.recordNumber) {
            //     this.$alert('请生成备案号', '提示')
            //     return
            // }
            if (this.businessScope.length === 0) {
                this.$alert('请选择经营范围', '提示')
                return
            }
            this.$myAlert({
                msg: '确认通过？',
                title: '提示'
            }).then(() => {
                this.$post('bus/enterprise/change/record/audit', {
                    'data': {
                        'enterpriseChangeRecordId': this.$route.query.enterpriseChangeRecordId,
                        'enterpriseChangeRecordField3E': this.recordNumber,
                        'enterpriseChangeRecordField2E': this.businessScope.join(','),
                        'enterpriseChangeRecordFieldE': this.enterpriseBusinessCategory,
                        'enterpriseChangeRecordAudit': 1
                        // 'enterpriseRecordApplyId': this.$route.query.enterpriseEvaluateApplyId,
                        // 'enterpriseChangeRecordRejectBak': this.refuseMsg
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '操作成功',
                            callback: () => {
                                this.$router.push('/recording')
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('网络错误，请重试！', '提示')
                })
            }).catch(() => {
            })
        },
        handleClick () {},
        // 点击拒绝
        refuse () {
            this.alert = true
        }
    },
    filters: {
        formatTime (val) {
            return filterTime('yyyy-mm-dd', val - 0)
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.audit {
    background-color: #fff;
    .adopt_btn {
        width: 128px!important;
    }
    .lh34 {
        line-height: 34px;
    }
    .changeBox {
        font-size: 14px;
        h4 {
            color: #333333;
            text-align: left;
            padding-left: 70px;
        }
        .change_before {
            padding: 30px 30px 20px 0;
            border-bottom: 1px solid #EBEBEB;
        }
        .change_after {
            padding: 20px 30px 20px 0;
            // border-bottom: 1px solid #EBEBEB;
        }
        .line {
            text-align: left;
            margin-top: 20px;
            label {
                float: left;
                width: 120px;
                text-align: right;
                line-height: 34px;
                color: #666666;
            }
            p {
                margin-left: 122px;
                text-align: left;
            }
        }
        .btnBox {
            padding-bottom: 20px;
        }
    }
    .inner {
        .red {
            color: red;
        }
        .btn {
            margin-top: 20px;
            margin-bottom: 20px;
            padding-left: 0;
        }
        .line {
            margin-top: 20px;
            line-height: 34px;
            text-align: left;
            .label {
                font-size: 14px;
                float: left;
                text-align: right;
                width: 120px;
            }
            .scBtn {
                width: 78px;
                margin-left: 10px;
            }
        }
        .el_ipt {
            width: 320px;
        }
        .el_ipt2 {
            width: 232px;
        }
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #ffffff;
        top: 0;
        .wrap {
            min-height: 700px;
            padding-bottom: 100px;
        }
    }
}
.table_box {
    padding: 30px 20px;
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
        }
        .default-img {
            background-color: #eee;
            height: 226px;
            line-height: 226px;
            img {
                width: 60px;
                height: 40px;
                vertical-align: middle;
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
            width: 120px;
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
.main-brand {
    padding: 20px;
    .empty {
        padding: 20px;
        color: #666;
        text-align: left;
        font-size: 14px;
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
.bm-view {
    width: 186px;
    height: 226px;
}
</style>
<style lang="less">
.audit {
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
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
        border-color: #3E94FE;
    }
    .el-upload-list {
        display: none;
    }
    .el-table th, .el-table td {
        padding: 12px 0!important;
    }
    .inner {
        .el-checkbox {
            width: 160px!important;
            margin-left: 0!important;
        }
        .el-input__inner {
            height: 34px!important;
            line-height: 34px!important;
        }
    }
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
        border-radius: 0;
    }
    .el-tabs__item {
        width: 128px;
        height: 44px;
        line-height: 44px;
        padding: 0 30px;
    }
    .el-textarea__inner {
        resize: none;
        height: 68px;
    }
    .iptCommon {
        width: 300px;
        .el-input__inner {
            width: 300px;
            height: 34px;
        }
    }
}
</style>
