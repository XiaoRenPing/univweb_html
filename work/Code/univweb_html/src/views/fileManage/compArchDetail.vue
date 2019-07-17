<!-- 档案详情 -->
<template>
    <div class="compArchDetail">
        <div class="content" v-loading="loading">
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
                                    <span class="name-red">*&nbsp;</span>经营类别：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseBusinessCategory"  @change="resetRecordNum" placeholder="请选择">
                                        <el-option
                                            v-for="item in serviceTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
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
                                    <span class="name-red">*&nbsp;</span>企业负责人：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseOwner" :type="roleExtEnterpriseOwnerIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>负责人电话：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseOwnerPhone" maxlength="11" :type="roleExtEnterpriseOwnerIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    负责人身份证：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseOwnerIdcardnumber" maxlength="18" ></el-input>
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
                            <div class="info-item">
                                <div class="name">
                                    经营许可证号：
                                </div>
                                <div class="msg">
                                    <el-input maxlength="12" v-model="enterpriseBusinessCertificate"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    企业邮政编码：
                                </div>
                                <div class="msg">
                                    <el-input maxlength="6" v-model="enterprisePostalcode"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>企业类型：
                                </div>
                                <div class="msg">
                                    <el-input disabled value="维修企业"></el-input>
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
                                    <span class="name-red">*&nbsp;</span>企业经营状态：
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
                                    <span class="name-red">*&nbsp;</span>经济类型：
                                </div>
                                <div class="msg">
                                    <el-select v-model="enterpriseEconomicCategory" filterable placeholder="请选择">
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
                                    <span class="name-red">*&nbsp;</span>企业联系人：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseLinkName" :type="roleExtEnterpriseLinkpersonIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>联系人电话：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseLinkMobile" maxlength="11" :type="roleExtEnterpriseLinkpersonIsview ? 'text' : 'password'"></el-input>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="name">
                                    联系人身份证：
                                </div>
                                <div class="msg">
                                    <el-input v-model="enterpriseLinkIdcardnumber" maxlength="18" ></el-input>
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
                                    许可证有效期：
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
                        </div>
                        <div class="bottom">
                            <div class="info-item">
                                <div class="name">
                                    <span class="name-red">*&nbsp;</span>经营地址：
                                </div>
                                <div class="msg">
                                    <el-input v-model.trim="enterpriseOperatingAddress"></el-input>
                                </div>
                            </div>
                            <div class="info-item clearfix">
                                <div class="name fl">
                                    <span class="name-red">*&nbsp;</span>经营范围：
                                </div>
                                <div class="msg height fr">
                                    <!-- <el-input type="textarea" v-model.trim="enterpriseOperationArea"></el-input> -->
                                    <el-checkbox-group class="checkGroup" v-model="enterpriseOperationArea">
                                        <el-checkbox
                                            class="lh34"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in businessScopeList"
                                            :key="item.value">
                                        </el-checkbox>
                                    </el-checkbox-group>
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
                                    <div class="name fl"><b>经营许可证：</b></div>
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
                            <div class="info-item">
                                <div class="name">
                                    尾气治理站：
                                </div>
                                <div class="msg msg-radio">
                                    <el-radio v-model="enterpriseTailGasTreatmentStationIs" label="1">是</el-radio>
                                    <el-radio v-model="enterpriseTailGasTreatmentStationIs" label="0">否</el-radio>
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
                                        连锁或集团经营企业：
                                    </div>
                                    <div class="msg msg-radio">
                                        <el-radio v-model="enterpriseChainOrGroupIs" label="1">是</el-radio>
                                        <el-radio v-model="enterpriseChainOrGroupIs" label="0">否</el-radio>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        连锁或集团经营总店：
                                    </div>
                                    <div class="msg msg-radio">
                                        <el-radio v-model="enterpriseChainOrGroupOperationIs" label="1">是</el-radio>
                                        <el-radio v-model="enterpriseChainOrGroupOperationIs" label="0">否</el-radio>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        质量保障里程(公里)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseQaMileage"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="info-item">
                                    <div class="name">
                                        是否为4S店或特约维修店：
                                    </div>
                                    <div class="msg msg-radio">
                                        <el-radio v-model="enterprise4sSpecialMaintenanceIs" label="1">是</el-radio>
                                        <el-radio v-model="enterprise4sSpecialMaintenanceIs" label="0">否</el-radio>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        连锁或集团经营总店名称：
                                    </div>
                                    <div class="msg">
                                        <el-input v-model="enterpriseGroupStoreName"></el-input>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="name">
                                        质量保障日期(天)：
                                    </div>
                                    <div class="msg">
                                        <el-input type="number" v-model="enterpriseQaDay"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="主修品牌" name="brand" class="brand">
                        <div class="brand-list">
                            <ul>
                                <li class="list-item" v-for="item in brandList" :key="item.vehicleBrandId">
                                    <img :src="item.vehicleBrandLogo" :alt="item.vehicleBrandName">
                                    <h6>{{item.vehicleBrandName}}</h6>
                                    <img src="../../assets/images/audit/icon_delete_selected.png" alt="" class="delete" @click="deleteBrandItem(item.vehicleBrandId)">
                                </li>
                            </ul>
                            <div class="add-brand" @click="addBrand">
                                <img src="../../assets/images/audit/icon_bigadd.png" alt="">
                                <p>添加品牌</p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="网站登录信息" name="loginInfo" class="login-info" v-if="userName">
                        <div class="login-info">
                            <div class="tips">
                                <div class="left">温馨提示：</div>
                                <div class="msg">协会网站可通过用户名或企业联系人电话登录</div>
                            </div>
                            <div class="user">
                                <div class="left">用户名：</div>
                                <div class="msg">
                                    <el-input
                                        v-model="userName"
                                        :disabled="true">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="仪表工具" name="tab1" class="main-brand otherList">
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
                                <template slot-scope="scope">
                                    <input class="" type="number" v-model="scope.row.instrumentCount">
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="专用设备" name="tab2" class="main-brand otherList">
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
                                    <el-checkbox style="border-color:red" v-model="scope.row.isBus" ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="isTrunk"
                            label="大型货车"
                            align="center">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isTrunk" ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="isCar"
                            label="小型车"
                            align="center">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isCar" ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="otherCondition"
                            label="其他条件"
                            :width="250"
                            align="center">
                                <template slot-scope="scope">
                                    <input class="input_" style="width:250px;" type="text" v-model="scope.row.otherCondition">
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="equipmentCount"
                            label="数量"
                            align="center">
                                <template slot-scope="scope">
                                    <input class="" type="number" v-model="scope.row.equipmentCount">
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="检测设备" name="tab3" class="main-brand otherList">
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
                                    <template slot-scope="scope">
                                        <input class="" type="number" v-model="scope.row.equipmentCount">
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="通用设备" name="tab4" class="main-brand otherList">
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
                                    <template slot-scope="scope">
                                        <input class="" type="number" v-model="scope.row.equipmentCount">
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="人员条件" name="tab5" class="main-brand otherList">
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
                                width="220"
                                align="center">
                                    <template slot-scope="scope">
                                        <input class="" type="number" v-model="scope.row.memberCount">
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="设施条件" name="tab6" class="main-brand otherList">
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
                                width="220"
                                align="center">
                                    <template slot-scope="scope">
                                        <input class="" type="number" v-model="scope.row.equipmentSize">
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="组织管理" name="tab7" class="main-brand otherList">
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
                    <el-tab-pane label="相关附件" name="tab8" class="main-brand otherList">
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
                                label="上传操作"
                                width="200"
                                align="center">
                                <template slot-scope="scope">
                                    <el-upload
                                        style="margin-top:10px;height:126px;"
                                        class="upload-demo"
                                        :action="uploadURL + 'attachment/file/upload'"
                                        :on-success="(res)=>uploadSuccessZ(res, scope.row)"
                                        :before-upload="beforeAvatarUploadZ">
                                            <img class="empty" v-show="!scope.row.url" width="120" height="120" src="../../assets/images/img_photo.png" alt="营业执照">
                                            <img v-show="scope.row.url"  width="120" height="120" :src="scope.row.url" alt="营业执照">
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                        <p style="color:#FC4343;text-align:right;line-height:30px;margin-right:20px;font-size:14px;">注：上传照片类型为“.png、.jpg”,大小为2M</p>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <modal :title="'添加品牌'" :alert="alert" :width="594" :height="400" @alertCancel="alertCancel" class="add-brand-alert">
            <div class="transfer clearfix">
                <div class="search">
                    <input type="text" v-model="brandSearch" placeholder="请输入名称/拼音首字母">
                </div>
                <div class="all-brand" id="allBrand">
                    <div class="all-brand-list" v-for="(val, key, index) in allBrandList" :key="index">
                        <div class="letter">{{key}}</div>
                        <div class="item" :id="item.vehicleBrandName" v-for="item in allBrandList[key]" :key="item.vehicleBrandId" @click="allBrandListSlect(key, item.vehicleBrandId)" :class="{active:item.checked === 1}">
                            <div class="img"><img :src="item.vehicleBrandLogo" alt=""></div>
                            <span>{{item.vehicleBrandName}}</span>
                        </div>
                    </div>
                </div>
                <div class="transfer-btn">
                    <el-button class="btn" :class="{disable:!addBrandBtn}" @click="addTransferBrand">&gt;</el-button>
                    <el-button class="btn" :class="{disable:!deleteBrandBtn}" @click="deleteTransferBrand">&lt;</el-button>
                </div>
                <div class="all-brand right">
                    <div class="all-brand-list" v-for="item in transferBrand" :key="item.vehicleBrandId">
                        <div class="item" @click="transBrandListSlect(item.vehicleBrandId)" :class="{active:item.checked === 1}">
                            <div class="img"><img :src="item.vehicleBrandLogo" alt=""></div>
                            <span>{{item.vehicleBrandName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary"  class="save" @click="transferSave">保存</el-button>
                <el-button @click="transferBack">返回</el-button>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-archives-normal">
            <el-button type="primary" @click="addRecord" :disabled="!$checkAuth('manage:enterprise:addentrecord')">保存</el-button>
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import { CodeToText } from 'element-china-area-data'
import { filterTime } from '@/utils/filterTime.js'
import BreadFoot from '@/components/BreadFoot.vue'
import { getCookie } from '@/utils/cookie.js'
import Modal from '../../components/Modal'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'compArchDetail',
    data () {
        return {
            breadArr: [
                { title: '档案管理', path: '' }, { title: '企业档案', path: '' }, { title: '企业档案详情', path: '' }
            ],
            enterpriseInstrumentToolsList: [], // 仪表工具
            enterpriseSpecialEquipmentList: [], // 专业设备
            enterpriseDetectEquipmentList: [], // 检测设备
            enterpriseUniversalEquipmentList: [], // 通用设备
            enterpriseMemberConditionList: [], // 人员条件
            enterpriseEquipmentConditionList: [], // 设施条件
            enterpriseOrganizationmanageConditionList: [], // 组织管理
            enterpriseAttachmentsList: [], // 相关附加
            enterpriseLinkIdcardnumber: '',
            enterpriseOwnerIdcardnumber: '',
            businessScope: [], // 经营范围
            businessScopeList: [],
            uploadURL: window.uploadURL,
            fileList: [],
            businessLicenseImg: '',
            enterprisePicUrl: '',
            permitImg: '',
            allBrandList: [],
            businessTime: [
                filterTime('hh:ff:ss', new Date(2018, 12, 1, 9, 0) - 0),
                filterTime('hh:ff:ss', new Date(2018, 12, 1, 18, 0) - 0)], // 营业时间
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
            userName: '',
            center: { // 坐标经纬度
                lng: 116.403847,
                lat: 39.915526
            },
            zoom: 15, // 缩放等级
            radio: '0', // 是否尾气治理站
            options: [], // 地区数据
            props: {
                value: 'regionId',
                label: 'regionName',
                children: 'cities'
            },
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
            economicsList: [
                {
                    value: '100',
                    label: '内资'
                },
                {
                    value: '110',
                    label: '国有全资'
                },
                {
                    value: '120',
                    label: '集体全资'
                },
                {
                    value: '130',
                    label: '股份合作'
                },

                {
                    value: '140',
                    label: '联营'
                },
                {
                    value: '141',
                    label: '国有联营'
                },

                {
                    value: '142',
                    label: '集体联营'
                },
                {
                    value: '143',
                    label: '国有与集体联营'
                },
                {
                    value: '149',
                    label: '其他联营'
                },
                {
                    value: '150',
                    label: '有限责任(公司)'
                },
                {
                    value: '159',
                    label: '其他有限责任(公司)'
                },
                {
                    value: '160',
                    label: '股份有限(公司)'
                },
                {
                    value: '170',
                    label: '私有'
                },
                {
                    value: '171',
                    label: '私有独资'
                },
                {
                    value: '172',
                    label: '私有合伙'
                },
                {
                    value: '173',
                    label: '私营有限责任(公司)'
                },
                {
                    value: '174',
                    label: '私营股份有限(公司)'
                },
                {
                    value: '175',
                    label: '个体经营'
                },
                {
                    value: '179',
                    label: '其他私有'
                },
                {
                    value: '190',
                    label: '其他内资'
                },
                {
                    value: '200',
                    label: '港、澳、台投资'
                },
                {
                    value: '210',
                    label: '内地和港、澳或台合资'
                },
                {
                    value: '220',
                    label: '内地和港、澳或台合作'
                },
                {
                    value: '230',
                    label: '港、澳或台独资'
                },
                {
                    value: '240',
                    label: '港、澳或台投资股份有限(公司)'
                },
                {
                    value: '290',
                    label: '其他港澳台投资'
                },
                {
                    value: '300',
                    label: '国外投资'
                },
                {
                    value: '310',
                    label: '中外合资'
                },
                {
                    value: '320',
                    label: '中外合作'
                },
                {
                    value: '330',
                    label: '外资'
                },
                {
                    value: '340',
                    label: '国外投资股份有限(公司)'
                },
                {
                    value: '390',
                    label: '其他国外投资'
                },
                {
                    value: '900',
                    label: '其他'
                }
            ],
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
            loading: false,
            tabIndex: 'basicInfo',
            enterpriseBusinessCertificate: '', // 经营许可证号
            enterpriseCreditIdentifier: '', // 社会信用代码
            enterpriseOwner: '', // 企业负责人
            enterpriseLinkName: '', // 企业联系人
            enterpriseBusinessPhone: '', // 企业业务电话
            enterpriseCoding: '', // 企业编码
            enterpriseRegisterEmail: '', // 企业邮箱地址
            enterpriseOwnerPhone: '', // 企业负责人电话
            enterpriseLinkMobile: '', // 企业联系电话
            enterprisePostalcode: '', // 企业邮政编码
            enterpriseOperatingAddress: '', // 企业经营地址
            enterpriseOperationArea: [], // 企业经营范围
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
            roleExtEnterpriseOwnerIsview: 1,
            roleExtEnterpriseLinkpersonIsview: 1,
            recordNumber: '' // 企业备案号
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
        this.getBrandList()
        this.findLoginRegion()
        if (this.$route.query.id) {
            this.getRecordDetail(this.$route.query.id)
        } else {
            this.$post('external/enterprise/conditions/template/list', {})
                .then(res => {
                    if (res.status === 200) {
                        this.enterpriseAttachmentsList = res.data.enterpriseAttachmentsList
                        this.enterpriseDetectEquipmentList = res.data.enterpriseDetectEquipmentList
                        this.enterpriseEquipmentConditionList = res.data.enterpriseEquipmentConditionList
                        this.enterpriseInstrumentToolsList = res.data.enterpriseInstrumentToolsList
                        this.enterpriseMemberConditionList = res.data.enterpriseMemberConditionList
                        this.enterpriseOrganizationmanageConditionList = res.data.enterpriseOrganizationmanageConditionList
                        this.enterpriseSpecialEquipmentList = res.data.enterpriseSpecialEquipmentList
                        this.enterpriseUniversalEquipmentList = res.data.enterpriseUniversalEquipmentList
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        }
    },
    watch: {
        enterpriseBusinessCategory (val) {
            // this.enterpriseOperationArea = []
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
        },
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
        uploadSuccessZ (res, index) {
            index.url = res.data
            this.$message({
                message: '图片上传成功！',
                type: 'success'
            })
        },
        beforeAvatarUploadZ (file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        resetRecordNum () {
            if (this.$route.query.id) {
                return
            }
            this.recordNumber = ''
        },
        handleItemChange (val) {
            if (val[1]) {
                this.getRegion(val[0], val[1])
            } else {
                this.getCities(val[0])
            }
        },
        // 获取市区数据
        getRegion (parentId, regionId) {
            this.$post('bas/city/findRegion', {
                data: {
                    parentId: regionId
                }
            })
                .then(res => {
                    this.options.forEach(item => {
                        if (item.regionId === parentId) {
                            item.cities.forEach(itemB => {
                                if (itemB.regionId === regionId) {
                                    itemB.cities = res.datas
                                }
                            })
                        }
                    })
                })
        },
        // 获取市区数据
        getCities (id) {
            this.$post('bas/city/findCity', {
                data: {
                    parentId: id
                }
            })
                .then(res => {
                    res.datas && res.datas.forEach(item => {
                        item.cities = []
                    })
                    this.options.forEach(item => {
                        if (item.regionId === id) {
                            item.cities = res.datas
                        }
                    })
                })
        },
        // 获取省份数据
        getProvince () {
            this.$post('bas/city/findProvince', {})
                .then(res => {
                    res.datas && res.datas.forEach(item => {
                        item.cities = []
                    })
                    this.options = res.datas
                    // if (res.status === 200) {
                    //     this.options = res.datas
                    // } else {
                    //     this.$alert(res.message, '提示')
                    // }
                })
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
            if (!this.enterpriseBusinessCategory) {
                this.$alert('请选择经营类别！', '提示')
                return
            }
            this.$post('manage/enterprise/findEnterpriseRecordNumber', {
                data: {
                    enterpriseName: this.enterpriseName,
                    enterpriseRegion: this.enterpriseRegion,
                    enterpriseBusinessCategory: this.enterpriseBusinessCategory,
                    enterpriseTypeId: '1'
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
            this.loading = true
            this.$post('manage/enterprise/view', {
                data: {
                    enterpriseId: id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.enterpriseAttachmentsList = res.data.enterpriseAttachmentsList
                    this.enterpriseDetectEquipmentList = res.data.enterpriseDetectEquipmentList
                    this.enterpriseEquipmentConditionList = res.data.enterpriseEquipmentConditionList
                    this.enterpriseInstrumentToolsList = res.data.enterpriseInstrumentToolsList
                    this.enterpriseMemberConditionList = res.data.enterpriseMemberConditionList
                    this.enterpriseOrganizationmanageConditionList = res.data.enterpriseOrganizationmanageConditionList
                    this.enterpriseUniversalEquipmentList = res.data.enterpriseUniversalEquipmentList
                    this.enterpriseSpecialEquipmentList = res.data.enterpriseSpecialEquipmentList
                    if (this.enterpriseSpecialEquipmentList) {
                        this.enterpriseSpecialEquipmentList.forEach(e => {
                            e.isCar = !!e.isCar
                            e.isBus = !!e.isBus
                            e.isTrunk = !!e.isTrunk
                        })
                    }
                    this.enterpriseName = res.data.enterpriseName
                    this.enterpriseRegion = res.data.enterpriseRegion // 所在区域
                    this.enterpriseBusinessCertificate = res.data.enterpriseBusinessCertificate // 经营许可证号
                    this.enterpriseCreditIdentifier = res.data.enterpriseCreditIdentifier // 社会信用代码
                    this.enterpriseRegisterEmail = res.data.enterpriseRegisterEmail // 企业邮箱
                    this.enterpriseOwner = res.data.enterpriseOwner // 企业负责人
                    this.enterpriseOwnerIdcardnumber = res.data.enterpriseOwnerIdcardnumber
                    this.enterpriseLinkIdcardnumber = res.data.enterpriseLinkIdcardnumber
                    this.enterpriseOwnerPhone = res.data.enterpriseOwnerPhone // 企业负责人电话
                    this.enterpriseLinkName = res.data.enterpriseLinkName // 企业联系人
                    this.enterpriseLinkMobile = res.data.enterpriseLinkMobile // 企业联系人电话
                    this.enterpriseBusinessPhone = res.data.enterpriseBusinessPhone // 企业业务电话
                    this.enterpriseBusinessCategory = res.data.enterpriseBusinessCategory // 业务类别
                    this.enterpriseTypeId = res.data.enterpriseTypeId // 企业类型
                    this.enterpriseEconomicCategory = res.data.enterpriseEconomicCategory // 经济类型
                    this.enterprisePostalcode = res.data.enterprisePostalcode // 企业邮政编码
                    this.enterpriseOperatingState = res.data.enterpriseOperatingState // 企业经营状态
                    this.enterpriseOperatingAddress = res.data.enterpriseOperatingAddress // 企业经营地址
                    this.enterpriseOperationArea = res.data.enterpriseOperationArea.split(',') // 企业经营范围
                    this.enterpriseIntroduction = res.data.enterpriseIntroduction // 企业经营概况
                    this.province = res.data.enterpriseAddrProvince // 企业地址省
                    this.city = res.data.enterpriseAddrCity // 企业地址市
                    this.region = res.data.enterpriseAddrDistrict // 企业地址区
                    this.enterpriseAddr = res.data.enterpriseAddr // 企业地址区
                    this.enterpriseSiteUrl = res.data.enterpriseSiteUrl // 企业网址
                    this.enterpriseTailGasTreatmentStationIs = res.data.enterpriseTailGasTreatmentStationIs // 是否尾气治理站
                    this.enterpriseChainOrGroupIs = res.data.enterpriseChainOrGroupIs // 是否连锁或集团经营企业
                    this.enterpriseChainOrGroupOperationIs = res.data.enterpriseChainOrGroupOperationIs // 是否连锁或集团经营总店
                    this.enterpriseQaMileage = res.data.enterpriseQaMileage // 质量保障里程
                    this.enterprise4sSpecialMaintenanceIs = res.data.enterprise4sSpecialMaintenanceIs // 是否为4s店或特约维修站
                    this.enterpriseGroupStoreName = res.data.enterpriseGroupStoreName // 连锁或集团经营总店名称
                    this.enterpriseQaDay = res.data.enterpriseQaDay // 质量保障日期
                    this.recordNumber = res.data.enterpriseCoding
                    this.userName = res.data.enterpriseUsername
                    this.brandList = res.data.enterpriseVehicleBrandList

                    if (res.data.enterpriseCertificateS && res.data.enterpriseCertificateE) {
                        this.validityTime = [res.data.enterpriseCertificateS, res.data.enterpriseCertificateE]
                    }
                    if (res.data.enterpriseJcBusinessS && res.data.enterpriseJcBusinessE) {
                        this.businessTime = [res.data.enterpriseJcBusinessS, res.data.enterpriseJcBusinessE]
                    }

                    try {
                        var user = JSON.parse(getCookie('user'))
                        this.roleExtEnterpriseOwnerIsview = user.roleExtEnterpriseOwnerIsview
                        this.roleExtEnterpriseLinkpersonIsview = user.roleExtEnterpriseLinkpersonIsview
                    } catch (e) {
                    }

                    this.imgLoad('picImg', 'enterprisePicUrl', res.data.enterprisePicUrl)
                    this.imgLoad('permitImg', 'enterpriseBusinessPermit', res.data.enterpriseBusinessPermit)
                    this.imgLoad('licenseImg', 'enterpriseBusinessLicense', res.data.enterpriseBusinessLicense)

                    setTimeout(() => {
                        this.center.lng = res.data.enterpriseAddrX - 0 // 企业地址经度
                        this.center.lat = res.data.enterpriseAddrY - 0 // 企业地址纬度
                    }, 1000)
                }
                this.loading = false
            }).catch(() => {
                this.loading = false
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
                this.$router.push('/companyArch')
            }).catch(() => {})
        },
        companyArchUpdate () {
        },
        // 获取车辆品牌
        getBrandList () {
            this.$get('external/vehicle/brand/list')
                .then(res => {
                    if (res.status === 200) {
                        res.data.forEach(item => {
                            item.pinyin = window.pinyinUtil.getPinyin(item.vehicleBrandName).replace(' ', '')
                            item.Initials = window.pinyinUtil.getFirstLetter(item.vehicleBrandName)
                        })
                        // 按首字母排序
                        var brandList = res.data.sort(function (objA, objB) {
                            if (objA.vehicleBrandChar > objB.vehicleBrandChar) {
                                return 1
                            } else if (objA.vehicleBrandChar < objB.vehicleBrandChar) {
                                return -1
                            } else {
                                return 0
                            }
                        })
                        // 将同字母类型进行分类
                        var obj = {}
                        brandList.forEach(item => {
                            item.checked = 0
                            if (!obj[item.vehicleBrandChar]) {
                                obj[item.vehicleBrandChar] = [item]
                            } else {
                                obj[item.vehicleBrandChar].push(item)
                            }
                        })
                        this.allBrandList = obj
                    }
                })
        },
        // 新增企业档案
        addRecord () {
            if (this.enterpriseLinkIdcardnumber && !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.enterpriseLinkIdcardnumber)) {
                this.$alert('请正确输入正确的联系人身份证！', '提示')
                return
            }
            if (this.enterpriseOwnerIdcardnumber && !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.enterpriseOwnerIdcardnumber)) {
                this.$alert('请正确输入正确的企业负责人身份证！', '提示')
                return
            }
            if (!this.enterpriseName) {
                this.$alert('请输入企业名称！', '提示')
                return
            }
            if (!this.enterpriseRegion) {
                this.$alert('请选择所在区域！', '提示')
                return
            }
            // if (!this.$route.query.id && !this.recordNumber) {
            //     this.$alert('请生成备案号！', '提示')
            //     return
            // }
            if (this.enterpriseBusinessCertificate && !/^[\da-zA-Z]{12}$/.test(this.enterpriseBusinessCertificate)) {
                this.$alert('请正确输入经营许可证号，应为12位的数字和字母组合！', '提示')
                return
            }
            if (this.enterpriseBusinessCertificate && (!this.validityTime || !this.validityTime.length)) {
                this.$alert('请正确输入许可证有效期！', '提示')
                return
            }
            if (this.validityTime && this.validityTime.length && !this.enterpriseBusinessCertificate) {
                this.$alert('请输入经营许可证号！', '提示')
                return
            }
            if (!/^[\da-zA-Z]{18}$/.test(this.enterpriseCreditIdentifier)) {
                this.$alert('请正确输入社会信用代码，应为18位的数字和字母组合！', '提示')
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
            if (!this.enterpriseOperatingState) {
                this.$alert('请选择企业经营状态！', '提示')
                return
            }
            if (!this.enterpriseBusinessCategory) {
                this.$alert('请选择经营类别！', '提示')
                return
            }
            if (!this.enterpriseEconomicCategory) {
                this.$alert('请选择经济类型！', '提示')
                return
            }
            if (!/^1\d{10}$/.test(this.enterpriseOwnerPhone)) {
                this.$alert('请正确输入负责人电话！', '提示')
                return
            }
            if (!/^1\d{10}$/.test(this.enterpriseLinkMobile)) {
                this.$alert('请正确输入联系人电话！', '提示')
                return
            }
            if (!this.businessTime || (this.businessTime && !this.businessTime.length)) {
                this.$alert('请输入营业时间！', '提示')
                return
            }
            if (!this.enterpriseOperatingAddress) {
                this.$alert('请输入经营地址！', '提示')
                return
            }
            if (this.enterpriseOperatingAddress.length > 50) {
                this.$alert('经营地址不能大于50字！', '提示')
                return
            }
            if (!this.enterpriseOperationArea.length) {
                this.$alert('请选择经营范围！', '提示')
                return
            }
            // if (this.enterpriseOperationArea.length > 250) {
            //     this.$alert('经营范围不能大于250字！', '提示')
            //     return
            // }
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
            if (!this.enterpriseAddr) {
                this.$alert('请输入企业地址！', '提示')
                return
            }
            if (!(this.center.lng > 0) || !(this.center.lat > 0)) {
                this.$alert('请输入经纬度！', '提示')
                return
            }
            if (this.enterpriseRegisterEmail && !/^\w+@\w+\.\w+(\.\w+)?/.test(this.enterpriseRegisterEmail)) {
                this.$alert('请输入正确的邮箱地址！', '提示')
                return
            }
            if (this.enterpriseChainOrGroupOperationIs === '1' && !this.enterpriseGroupStoreName) {
                this.$alert('请输入连锁或集团经营总店名称！', '提示')
                return
            }
            if (this.enterprisePostalcode && !/^\d{6}$/.test(this.enterprisePostalcode)) {
                this.$alert('请输入正确的邮政编码，应为6位数字组成！', '提示')
                return
            }
            if ((this.enterpriseQaMileage - 0) < 0) {
                this.$alert('请输入正确的质量保障里程！', '提示')
                return
            }
            if ((this.enterpriseQaDay - 0) < 0) {
                this.$alert('请输入正确的质量保障日期！', '提示')
                return
            }
            if (this.sendData) {
                return
            }
            this.sendData = true
            if (this.enterpriseSpecialEquipmentList) {
                this.enterpriseSpecialEquipmentList.forEach(e => {
                    e.isCar = e.isCar ? 1 : 0
                    e.isBus = e.isBus ? 1 : 0
                    e.isTrunk = e.isTrunk ? 1 : 0
                })
            }
            if (this.enterpriseEquipmentConditionList) {
                this.enterpriseEquipmentConditionList.forEach(e => {
                    e.equipmentSize = e.equipmentSize - 0
                    if (typeof e.equipmentSize === 'number') {
                        e.equipmentSize = e.equipmentSize.toFixed(2)
                    }
                })
            }
            var obj = {
                enterpriseInstrumentToolsList: this.enterpriseInstrumentToolsList,
                enterpriseSpecialEquipmentList: this.enterpriseSpecialEquipmentList,
                enterpriseDetectEquipmentList: this.enterpriseDetectEquipmentList,
                enterpriseUniversalEquipmentList: this.enterpriseUniversalEquipmentList,
                enterpriseMemberConditionList: this.enterpriseMemberConditionList,
                enterpriseEquipmentConditionList: this.enterpriseEquipmentConditionList,
                enterpriseOrganizationmanageConditionList: this.enterpriseOrganizationmanageConditionList,
                enterpriseAttachmentsList: this.enterpriseAttachmentsList,
                data: {
                    enterpriseLinkIdcardnumber: this.enterpriseLinkIdcardnumber,
                    enterpriseOwnerIdcardnumber: this.enterpriseOwnerIdcardnumber,
                    enterpriseName: this.enterpriseName, // 企业名称
                    enterpriseRegion: this.enterpriseRegion, // 所在区域
                    enterpriseBusinessCertificate: this.enterpriseBusinessCertificate, // 经营许可证号
                    enterpriseCreditIdentifier: this.enterpriseCreditIdentifier, // 社会信用代码
                    enterpriseOwner: this.enterpriseOwner, // 企业负责人
                    enterpriseLinkName: this.enterpriseLinkName, // 企业联系人
                    enterpriseBusinessPhone: this.enterpriseBusinessPhone, // 企业业务电话
                    enterpriseBusinessCategory: this.enterpriseBusinessCategory, // 业务类别
                    enterpriseTypeId: '1', // 企业类型
                    enterpriseRegisterEmail: this.enterpriseRegisterEmail, // 企业编码
                    enterpriseEconomicCategory: this.enterpriseEconomicCategory, // 经济类型
                    enterpriseOwnerPhone: this.enterpriseOwnerPhone, // 负责人电话
                    enterpriseLinkMobile: this.enterpriseLinkMobile, // 联系人电话
                    enterprisePostalcode: this.enterprisePostalcode, // 企业邮政编码
                    enterpriseOperatingState: this.enterpriseOperatingState, // 企业经营状态
                    enterpriseOperatingAddress: this.enterpriseOperatingAddress, // 企业经营地址
                    enterpriseOperationArea: this.enterpriseOperationArea.join(','), // 企业经营范围
                    enterpriseIntroduction: this.enterpriseIntroduction, // 企业经营概况
                    enterpriseAddrProvince: this.$store.state.info.province, // 企业地址省
                    enterpriseAddrCity: this.$store.state.info.city, // 企业地址市
                    enterpriseAddrDistrict: this.enterpriseRegion, // 企业地址区
                    enterpriseAddr: this.enterpriseAddr, // 企业详细地址
                    enterpriseAddrX: this.center.lng + '', // 企业地址经度
                    enterpriseAddrY: this.center.lat + '', // 企业地址纬度
                    enterpriseSiteUrl: this.enterpriseSiteUrl, // 企业网址
                    enterpriseTailGasTreatmentStationIs: this.enterpriseTailGasTreatmentStationIs, // 是否尾气治理站
                    enterpriseChainOrGroupIs: this.enterpriseChainOrGroupIs, // 是否连锁或集团经营企业
                    enterpriseChainOrGroupOperationIs: this.enterpriseChainOrGroupOperationIs, // 是否连锁或集团经营总店
                    enterpriseQaMileage: this.enterpriseQaMileage, // 质量保障里程
                    enterprise4sSpecialMaintenanceIs: this.enterprise4sSpecialMaintenanceIs, // 是否为4s店或特约维修站
                    enterpriseGroupStoreName: this.enterpriseGroupStoreName, // 连锁或集团经营总店名称
                    enterpriseQaDay: this.enterpriseQaDay, // 质量保障日期
                    enterpriseBusinessLicense: this.enterpriseBusinessLicense, // 营业执照
                    enterpriseBusinessPermit: this.enterpriseBusinessPermit, // 经营许可证
                    enterprisePicUrl: this.enterprisePicUrl // 企业门店照片
                }
            }
            if (this.validityTime && this.validityTime.length) {
                obj.data.enterpriseCertificateS = this.validityTime[0] // 许可证有效期开始时间
                obj.data.enterpriseCertificateE = this.validityTime[1] // 许可证有效期结束时间
            }
            if (this.businessTime && this.businessTime.length) {
                obj.data.enterpriseJcBusinessS = this.businessTime[0] // 许可证有效期开始时间
                obj.data.enterpriseJcBusinessE = this.businessTime[1] // 许可证有效期结束时间
            }
            if (this.brandList && this.brandList.length) {
                var ary = []
                this.brandList.forEach(item => {
                    ary.push(item.vehicleBrandId)
                })
                obj.enterpriseVehicleBrandJsonStr = ary + ''
            }
            if (this.$route.query.id) {
                obj.data.enterpriseId = this.$route.query.id
                obj.data.enterpriseCoding = this.recordNumber
                this.$post('manage/enterprise/edit', obj)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '保存成功',
                                callback: () => {
                                    this.$router.push('/companyArch')
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
                this.$post('manage/enterprise/addentrecord', obj)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '保存成功',
                                callback: () => {
                                    this.$router.push('/companyArch')
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
        // 穿梭框保存
        transferSave () {
            this.brandList = [...this.transferBrand]
            this.transBrand = {}
            this.selectBrand = {}
            this.brandSearch = ''
            this.alert = false
            for (var val in this.allBrandList) {
                this.allBrandList[val].forEach(item => {
                    item.checked = 0
                })
            }
            this.transferBrand.forEach(item => {
                item.checked = 0
            })
        },
        // 穿梭框返回
        transferBack () {
            this.transferBrand = [...this.brandList]
            this.transBrand = {}
            this.selectBrand = {}
            this.brandSearch = ''
            this.alert = false
            for (var val in this.allBrandList) {
                this.allBrandList[val].forEach(item => {
                    item.checked = 0
                })
            }
            this.transferBrand.forEach(item => {
                item.checked = 0
            })
        },
        // 穿梭框添加品牌
        addTransferBrand () {
            if (this.addBrandBtn) {
                this.selectBrand.checked = 0
                this.transferBrand.push(JSON.parse(JSON.stringify(this.selectBrand)))
                this.addBrandBtn = false
            }
        },
        // 穿梭框删除品牌
        deleteTransferBrand () {
            this.transferBrand.forEach((item, index, ary) => {
                if (item.vehicleBrandId === this.transBrand.vehicleBrandId) {
                    ary.splice(index, 1)
                    this.transBrand = {}
                }
            })
        },
        // 所有品牌列表选中事件
        allBrandListSlect (key, id) {
            if (this.selectBrand.checked) {
                this.selectBrand.checked = 0
            }
            this.allBrandList[key].forEach(item => {
                if (item.vehicleBrandId === id) {
                    item.checked = 1
                    this.selectBrand = item
                }
            })
        },
        // 穿梭框品牌列表选中事件
        transBrandListSlect (id) {
            this.transferBrand.forEach(item => {
                if (item.vehicleBrandId === id) {
                    item.checked = 1
                    this.transBrand = item
                } else {
                    item.checked = 0
                }
            })
        },
        // 删除主修品牌
        deleteBrandItem (id) {
            for (let i = 0; i < this.brandList.length; i++) {
                if (id === this.brandList[i].vehicleBrandId) {
                    this.brandList.splice(i, 1)
                }
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
        // 添加品牌弹窗
        addBrand () {
            !this.brandList && (this.brandList = [])
            this.transferBrand = [...this.brandList]
            this.alert = true
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
        // 地区过滤
        regionToText (id) {
            for (var i = 0; i < this.regionList.length; i++) {
                if (this.regionList[i].regionId === id) {
                    return this.regionList[i].regionName
                }
            }
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
.compArchDetail {
    .content {
        min-height: 700px;
        padding-bottom: 100px;
    }
}
.otherList {
    padding: 20px;
    input {
        border: none;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #dddddd;
        border-radius: 3px;
        width: 100px;
    }
    .input_ {
        border: none;
        border-bottom: 1px solid #dddddd;
        outline: none;
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
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                text-align: right;
                color: #000;
                font-size: 14px;
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
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                text-align: right;
                color: #000;
                font-size: 14px;
                margin-right: 6px;
            }
            .msg {
                margin-left: 6px;
                display: inline-block;
                width: 345px;
            }
        }
    }
    .bottom {
        float: left;
        .info-item {
            .name-red {
                color: #FF1200;
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                margin-right: 6px;
                text-align: right;
                color: #000;
                font-size: 14px;
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
                width: 326px;
                margin-right: 60px;
                &:last-child {
                    margin-right: 0px;
                }
                .name {
                    font-size: 14px;
                    color: #000;
                    width: 156px;
                    text-align: right;
                    line-height: 30px;
                }
                .img {
                    width: 152px;
                    height: 172px;
                    padding: 6px;
                    border: 1px solid #ddd;
                    position: relative;
                    cursor: pointer;
                    img {
                        cursor: pointer;
                    }
                    p {
                        text-align: center;
                        height: 36px;
                        line-height: 36px;
                        font-size: 14px;
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
            font-size: 14px;
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
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 142px;
                text-align: right;
                color: #000;
                font-size: 14px;
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
                    font-size: 14px;
                }
                margin-top: 10px;
                .name {
                    float: left;
                    width: 154px;
                    text-align: right;
                    color: #000;
                    font-size: 14px;
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
            width: 534px;
            .info-item {
                height: 34px;
                line-height: 34px;
                .name-red {
                    color: #FF1200;
                    font-size: 14px;
                }
                margin-top: 10px;
                .name {
                    display: inline-block;
                    width: 172px;
                    text-align: right;
                    color: #000;
                    font-size: 14px;
                }
                .msg {
                    margin-left: 6px;
                    display: inline-block;
                    width: 335px;
                    &.msg-radio {
                        text-align: left;
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
.login-info {
    min-height: 500px;
    .tips {
        font-size: 14px;
        color: #999;
        line-height: 34px;
        .left {
            float: left;
            width: 176px;
            text-align: right;
        }
        .msg {
            text-align: left;
            width: 346px;
            margin-left: 176px;
        }
    }
    .user {
        margin-top: 10px;
        font-size: 14px;
        color: #000;
        line-height: 34px;
        .left {
            float: left;
            width: 176px;
            text-align: right;
        }
        .msg {
            margin-left: 176px;
            width: 346px;
        }
    }
}
.brand {
    font-size: 14px;
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
        min-height: 500px;
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
                font-size: 14px;
                color: #000;
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
        font-size: 14px;
        margin-left: 26px;
        color: #000;
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
                color: #000;
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
.compArchDetail {
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
    .el-checkbox__inner {
        border-color: #409EFF;
    }
    .el-table th, .el-table td {
        padding: 12px 0!important;
    }
    .el-upload-list {
        display: none;
    }
    .checkGroup {
        text-align: left;
        .el-checkbox {
            width: 168px;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 12px;
        }
    }
    .el-tabs--border-card {
        border: none;
    }
    .el-tabs--border-card {
        box-shadow: none;
    }
    .basic-info {
        .el-input {
            width: 100%;
        }
        .el-select {
            width: 100%
        }
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
            font-size: 14px;
        }
        .height {
            .el-textarea__inner {
                height: 68px;
                resize: none;
                color: #333;
                font-size: 14px;
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
        .el-date-editor--daterange.el-input__inner {
            width: 100% !important;
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
            font-size: 14px;
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
    .el-tabs__item {
        height:44px;
        line-height: 44px;
        padding: 0 30px;
    }
}
</style>
