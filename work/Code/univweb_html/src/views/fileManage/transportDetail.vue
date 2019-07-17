<!-- 档案详情 -->
<template>
    <div class="transportDetail">
        <tool-bar :title="'档案管理>运输车辆车技档案>' + ($route.query.id ? '编辑档案' : '新增档案')">
            <el-button icon="el-icon-tickets" type="primary" @click="saveData">保存</el-button>
            <button class="back_btn2" @click="goBack">返回</button>
        </tool-bar>
        <div class="content">
            <div class="table_box">
                <el-tabs type="card" v-model="tabIndex">
                    <el-tab-pane label="车辆基本信息" class="car-info" name="carInfo">
                        <div class="clearfix">
                            <div class="car-number-table fl">
                                <h6 class="title">车牌号码信息</h6>
                                <el-table
                                    :data="carNumberData"
                                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                    style="width: 100%"
                                    :height="220"
                                    class="table">
                                    <el-table-column
                                        prop="listorder"
                                        label="序号">
                                        <template slot-scope="scope">
                                            {{scope.row.listorder | carNumberFormat}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleLicensePlate"
                                        label="车牌号码">
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleLicensePlateColor"
                                        label="车牌颜色">
                                        <template slot-scope="scope">
                                            {{scope.row.vehicleLicensePlateColor | filterCommon(plateColor)}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleLicensePlateDate"
                                        label="注册变更日期"
                                        :width="150">
                                        <template slot-scope="scope">
                                            {{scope.row.vehicleLicensePlateDate | filterTime('yyyy-mm-dd')}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="edit-btn">
                                    <span class="add" @click="addCarNumAlert = true"><img src="../../assets/images/transportDetail/add.png" alt=""></span>
                                    <span class="reduce" @click="reduceCarNumData"><img src="../../assets/images/transportDetail/less.png" alt=""></span>
                                </div>
                            </div>
                            <div class="car-img fl">
                                <h6 class="title">车辆照片<span>（车辆正面偏右侧45度的3寸彩照）</span></h6>
                                <div class="img-wrap">
                                    <el-upload
                                        ref="carImg"
                                        class="upload-demo"
                                        :action="uploadURL + 'attachment/file/upload'"
                                        :on-success="uploadSuccess"
                                        multiple
                                        :limit="1"
                                        :on-remove="handleRemove"
                                        :before-upload="beforeAvatarUpload"
                                        :file-list="fileList">
                                        <img v-show="vehicleTechnology.vehicleTechnologyVehiclepic" ref="vehicleTechnologyVehiclepic" :src="vehicleTechnology.vehicleTechnologyVehiclepic" alt="车辆照片">
                                        <div class="default-img" v-show="!vehicleTechnology.vehicleTechnologyVehiclepic">
                                            <img src="../../assets/images/audit/default_icon_photo.png" alt="">
                                        </div>
                                    </el-upload>
                                    <!-- <img src="" alt=""> -->
                                </div>
                            </div>
                        </div>
                        <div class="road-table">
                            <h6 class="title">道路运输证信息</h6>
                            <el-table
                                :data="roadInfoData"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="200"
                                class="table">
                                <el-table-column
                                    prop="listorder"
                                    label="序号"
                                    width="100">
                                    <template slot-scope="scope">
                                        {{scope.row.listorder | roadDataFormat}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleTransportCertificateBusinessname"
                                    label="业户名称"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleTransportCertificateNo"
                                    label="道路运输证号">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleTransportCertificateScope"
                                    label="经营范围">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleTransportCertificateChangeDate"
                                    label="发证日期">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicleTransportCertificateChangeDate | filterTime('yyyy-mm-dd')}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="edit-btn">
                                <span class="add" @click="addRoadAlert = true"><img src="../../assets/images/transportDetail/add.png" alt=""></span>
                                <span class="reduce" @click="reduceRoadData"><img src="../../assets/images/transportDetail/less.png" alt=""></span>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆配置及主要技术参数" name="carConfig">
                        <div class="road-info">
                            <table class="road-info-table">
                                <tr>
                                    <td class="title"><span class="red">*&nbsp;</span>车辆类型</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTypeId" placeholder="请选择">
                                            <el-option
                                            v-for="item in carTypeList"
                                            :key="item.vehicleTypeId"
                                            :label="item.vehicleTypeName"
                                            :value="item.vehicleTypeId">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title"><span class="red">*&nbsp;</span>厂牌型号</td>
                                    <td>
                                        <input type="text" v-model="vehicleTechnology.vehicleTechnologyBrandModel" placeholder="请输入">
                                    </td>
                                    <td class="title"><span class="red">*&nbsp;</span>制造厂名</td>
                                    <td><input type="text" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyManufactureName"></td>
                                    <td class="title"><span class="red">*&nbsp;</span>出厂日期</td>
                                    <td>
                                        <el-date-picker
                                            v-model="vehicleTechnology.vehicleTechnologyProductDate"
                                            type="date"
                                            value-format="timestamp"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title"><span class="red">*&nbsp;</span>国产/进口</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyDomesticImport" placeholder="请选择">
                                            <el-option
                                            v-for="item in domesticList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title"><span class="red">*&nbsp;</span>VIN(车架号)</td>
                                    <td><input type="text" placeholder="请输入" maxlength="17" v-model="vehicleTechnology.vehicleTechnologyVin"></td>
                                    <td class="title"><span class="red">*&nbsp;</span>底盘型号</td>
                                    <td><input type="text" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyChassisModel"></td>
                                    <td class="title"><span class="red">*&nbsp;</span>车辆外廓尺寸(mm)</td>
                                    <td>
                                        长:
                                        <input type="number" min="1" class="shot" v-model="carLong">
                                        宽:
                                        <input type="number" min="1" class="shot" v-model="carWidth">
                                        高
                                        <input type="number" min="1" class="shot" v-model="carHeight">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title"><span class="red">*&nbsp;</span>品牌</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleBrandId" @change="getSeriesList" placeholder="请选择">
                                            <el-option
                                            v-for="item in carBrandList"
                                            :key="item.vehicleBrandId"
                                            :label="item.vehicleBrandName"
                                            :value="item.vehicleBrandId">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title"><span class="red">*&nbsp;</span>车系</td>
                                    <td>
                                        <el-select v-model="vehicleSeriesId" placeholder="请选择">
                                            <el-option
                                            v-for="item in seriesList"
                                            :key="item.vehicleSeriesId"
                                            :label="item.vehicleSeriesName"
                                            :value="item.vehicleSeriesId">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">整备质量(KG)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyUnladenMass" min="0">
                                    </td>
                                    <td class="title">准牵引质量(KG)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyDraw" min="0">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">核定载质量(KG)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyApprovedLoad" min="0">
                                    </td>
                                    <td class="title">核定载客</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyApprovedCarry" min="0">
                                    </td>
                                    <td class="title">发动机型号</td>
                                    <td><input type="text" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyEngineType"></td>
                                    <td class="title">发动机号码</td>
                                    <td><input type="text" maxlength="8" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyEngineNo"></td>
                                </tr>
                                <tr>
                                    <td class="title">发动机排量(L)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyEngineDisplacement" min="0">
                                    </td>
                                    <td class="title">发动机净功率(KW)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyEnginePower" min="0">
                                    </td>
                                    <td class="title">排放标准</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyEmissionStandard" placeholder="请选择">
                                            <el-option
                                            v-for="item in discharge"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">电池类型</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyBatteryType" placeholder="请选择">
                                            <el-option
                                            v-for="item in batteryType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">驱动电机型号</td>
                                    <td><input type="text" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyDrivingMotor"></td>
                                    <td class="title">电机功率(KW)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyMotorPower" min="0">
                                    </td>
                                    <td class="title">动力类型</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyPowerType" placeholder="请选择">
                                            <el-option
                                            v-for="item in technologyPowerType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">车轴数量</td>
                                    <td>
                                        <input type="number" max="100" min="0" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyAxleNum">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">轴距(mm)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyWheelbase" min="0">
                                    </td>
                                    <td class="title">轮胎数/规格</td>
                                    <td><input type="text" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyTiresSpecifications"></td>
                                    <td class="title">行车制动方式</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyBrakingMode" placeholder="请选择">
                                            <el-option
                                            v-for="item in brakingMode"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">制动器形式</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyBrakeType" placeholder="请选择">
                                            <el-option
                                            v-for="item in brakeType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">制动防抱死系统(ABS)</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyAbs" placeholder="请选择">
                                            <el-option
                                            v-for="item in [{value: '01', label: '有'}, {value: '02', label: '无'}]"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">变速器形式</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyTransmission" placeholder="请选择">
                                            <el-option
                                            v-for="item in transmission"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">缓速器</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyRetarder" placeholder="请选择">
                                            <el-option
                                            v-for="item in retarder"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">空调系统</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologyAirConditioner" placeholder="请选择">
                                            <el-option
                                            v-for="item in [{value: '01', label: '有'}, {value: '02', label: '无'}]"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title">卫星定位系统</td>
                                    <td>
                                        <el-select v-model="vehicleTechnology.vehicleTechnologySatellitePositioning" placeholder="请选择">
                                            <el-option
                                            v-for="item in [{value: '01', label: '有'}, {value: '02', label: '无'}]"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td class="title">货箱内尺寸或容积(L)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyContainer" min="0" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'>
                                    </td>
                                    <td class="title">总质量(KG)</td>
                                    <td>
                                        <input type="number" placeholder="请输入" v-model="vehicleTechnology.vehicleTechnologyTotalMass" min="0" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆检测和评定登记表" name="reportList" v-if="vehicleId">
                        <div class="testingTable">
                            <el-table
                                :data="testingTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="index"
                                    label="序号"
                                    width="60">
                                </el-table-column>
                                <el-table-column
                                    prop="detecttype"
                                    label="检测/评定类别"
                                    width="">detectFilter
                                    <template slot-scope="scope">
                                        {{scope.row.detecttype | detectFilter}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="dsname"
                                    label="检测/评定单位">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleDetectioneValuateDate"
                                    label="检测/评定日期">
                                    <template slot-scope="scope">
                                        {{scope.row.detectdate | filterTime('yyyy-mm-dd')}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleDetectioneValuateValiditydate"
                                    label="检测有效期">
                                    <!-- <template slot-scope="scope">
                                        {{scope.row.detectdate | filterTime('yyyy-mm-dd')}}
                                    </template> -->
                                </el-table-column>
                                <el-table-column
                                    prop="detectsn"
                                    label="报告编号">
                                </el-table-column>
                                <el-table-column
                                    prop="drnote"
                                    label="备注">
                                </el-table-column>
                                <el-table-column
                                    prop="client"
                                    label="登记人员">
                                </el-table-column>
                                <el-table-column
                                    prop="client"
                                    label="单据"
                                    width="330">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="getReport1(scope.row.detectsn)">人工检验记录单</el-button>
                                        <el-button type="text" size="small" @click="getReport2(scope.row.detectsn)">性能检验记录单</el-button>
                                        <el-button type="text" size="small" @click="getReport3(scope.row.detectsn)">综合性能检验报告单</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                    @size-change="testSizeChange"
                                    @current-change="testCurrentChange"
                                    :current-page="testPageNum"
                                    :page-sizes="[10, 15, 20]"
                                    :page-size="testPageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="testTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆维护和修理登记表" v-if="vehicleId">
                        <div class="repairTable">
                            <el-table
                                :data="repairTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="index"
                                    label="序号"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixBalanceDate"
                                    label="维护日期">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicleFixBalanceDate}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixMileage"
                                    label="累计行驶里程(KM)">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixCategory"
                                    label="维护类别">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixDescription"
                                    label="修理内容">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixUnit"
                                    label="维修单位">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixCertificateNumber"
                                    label="合格证编号">
                                </el-table-column>

                                <el-table-column
                                    prop="vehicleFixRegistrar"
                                    label="登记人员">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="repairSizeChange"
                                @current-change="repairCurrentChange"
                                :current-page="repairPageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="repairPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="repairTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆主要部件更换登记表" v-if="vehicleId">
                        <div class="partChangeTable">
                            <el-table
                                :data="partChangeTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="index"
                                    label="序号"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleChangePartsDate"
                                    label="更换日期">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicleChangePartsDate}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehiclePartsName"
                                    label="部件名称">
                                </el-table-column>
                                <el-table-column
                                    prop="vehiclePartsModel"
                                    label="型号规格">
                                    <template slot-scope="scope">
                                        {{scope.row.vehiclePartsModel}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehiclePartsNum"
                                    label="配件数量">
                                </el-table-column>
                                <el-table-column
                                    prop="vehiclePartsNumber"
                                    label="配件编号">
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleFixUnit"
                                    label="承修单位">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="partChangeSizeChange"
                                @current-change="partChangeCurrentChange"
                                :current-page="partChangePageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="partChangePageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="partChangeTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆变更记录" v-if="vehicleId">
                        <div class="carChangeTable">
                            <el-table
                                :data="carChangeTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="date"
                                    label="序号"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="变更日期">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="变更原因">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="变更事项">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="登记人员">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="carChangeSizeChange"
                                @current-change="carChangeCurrentChange"
                                :current-page="carChangePageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="carChangePageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="carChangeTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆行驶里程登记表" v-if="vehicleId">
                        <div class="mileageTable">
                            <el-table
                                :data="mileageTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="date"
                                    label="序号"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="登记日期">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="当月行驶里程(KM)">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="累计行驶里程(KM)">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="登记人员">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="mileageSizeChange"
                                @current-change="mileageCurrentChange"
                                :current-page="mileagePageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="mileagePageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="mileageTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆机损事故登记表" v-if="vehicleId">
                        <div class="accidentTable">
                            <el-table
                                :data="accidentTable"
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                style="width: 100%"
                                :height="600"
                                class="table">
                                <el-table-column
                                    prop="date"
                                    label="序号"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="事故时间">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="事故地点">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="事故性质">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="车辆损坏情况">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="理赔金额(元)">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="登记人员">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="accidentSizeChange"
                                @current-change="accidentCurrentChange"
                                :current-page="accidentPageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="accidentPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="accidentTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <pdf-view
            :title="'预览'"
            :url="pdfUrl"
            @alertCancel="pdfCancel"
            :width="pdfWidth"
            :height="pdfHeight"
            :alert="pdfShow">
        </pdf-view>
        <modal :title="'新增车辆号牌变更信息'" :width="450" :height="380" :alert="addCarNumAlert" @alertCancel="addCarNumCancel" class="add-car-alert">
            <div class="info-item">
                <div class="left">
                    序列：
                </div>
                <div class="right">
                    <span v-if="carNumberData.length">牌号变更{{carNumberData.length}}</span>
                    <span v-if="!carNumberData.length">首次核发</span>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>车牌号码：
                </div>
                <div class="right">
                    <el-input v-model="addCarNumber" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>车牌颜色：
                </div>
                <div class="right">
                    <el-select v-model="addCarColor" placeholder="请选择">
                        <el-option
                        v-for="item in plateColor"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>注册变更日期：
                </div>
                <div class="right">
                    <el-date-picker
                        v-model="addCarDate"
                        type="date"
                        value-format="timestamp"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="btn">
                <el-button @click="addCarNumConfirm" type="primary">确定</el-button>
                <el-button @click="addCarNumCancel">取消</el-button>
            </div>
        </modal>
        <modal :title="'新增道路运输证信息'" :width="450" :height="460" :alert="addRoadAlert" @alertCancel="addRoadCancel" class="add-road-alert">
            <div class="info-item">
                <div class="left">
                    序列：
                </div>
                <div class="right">
                    <span v-if="roadInfoData.length">名称变更{{roadInfoData.length}}</span>
                    <span v-if="!roadInfoData.length">初次登记</span>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>业户名称：
                </div>
                <div class="right">
                    <el-input v-model="addRoadName" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>道路运输证号：
                </div>
                <div class="right">
                    <el-input maxlength="12" v-model="addRoadNumber" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    经营范围：
                </div>
                <div class="right">
                    <el-input v-model="addRoadRange" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="info-item">
                <div class="left">
                    <span class="red">*&nbsp;</span>变更日期：
                </div>
                <div class="right">
                    <el-date-picker
                        v-model="addRoadDate"
                        type="date"
                        value-format="timestamp"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="btn">
                <el-button @click="addRoadConfirm" type="primary">确定</el-button>
                <el-button @click="addRoadCancel">取消</el-button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Header from '@/components/Header.vue'
import PdfView from '@/components/PdfView.vue'
import { filterTime } from '@/utils/filterTime.js'
import { plateNum } from '@/utils/cookie.js'
import { plateColor } from '@/utils/type.js'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'transportDetail',
    data () {
        return {
            tabIndex: 'carInfo', // tab索引
            uploadURL: window.uploadURL,
            pdfUrl: window.uploadURL + 'report/inspect/findInspect4', // pdf预览地址
            scale: 1.2,
            pdfShow: false,
            repairCodeList: [
                {
                    value: '01',
                    label: '零件修理'
                },
                {
                    value: '02',
                    label: '汽车小修'
                },
                {
                    value: '03',
                    label: '总成修理'
                },
                {
                    value: '04',
                    label: '汽车大修'
                },
                {
                    value: '05',
                    label: '日常维护'
                },
                {
                    value: '06',
                    label: '一级维护'
                },
                {
                    value: '07',
                    label: '二级维护'
                }
            ],
            brakeType: [
                {
                    value: '01',
                    label: '盘式制动器'
                },
                {
                    value: '02',
                    label: '鼓式制动器'
                }
            ],
            brakingMode: [
                {
                    value: '01',
                    label: '行车制动器'
                },
                {
                    value: '02',
                    label: '驻车制动器'
                }
            ],
            batteryType: [
                {
                    value: '01',
                    label: '蓄电池'
                },
                {
                    value: '02',
                    label: '燃料电池'
                }
            ],
            fileList: [],
            vehicleTechnology: {
                vehicleTechnologyAbs: '',
                vehicleTechnologyAirConditioner: '',
                vehicleTechnologyApprovedCarry: '',
                vehicleTechnologyApprovedLoad: '',
                vehicleTechnologyAxleNum: '',
                vehicleTechnologyBatteryType: '',
                vehicleTechnologyBrakeType: '',
                vehicleTechnologyBrakingMode: '',
                vehicleTechnologyBrandModel: '',
                vehicleTechnologyContainer: '',
                vehicleTechnologyDomesticImport: '',
                vehicleTechnologyDraw: '',
                vehicleTechnologyEngineDisplacement: '',
                vehicleTechnologyEmissionStandard: '',
                vehicleTechnologyDrivingMotor: '',
                vehicleTechnologyChassisModel: '',
                vehicleTechnologyEngineNo: '',
                vehicleTechnologyManufactureName: '',
                vehicleTechnologyEnginePower: '',
                vehicleTechnologyEngineType: '',
                vehicleTypeId: '',
                vehicleTechnologyMotorPower: '',
                vehicleTechnologyPowerType: '',
                vehicleTechnologyProductDate: '',
                vehicleTechnologyRetarder: '',
                vehicleTechnologySatellitePositioning: '',
                vehicleTechnologyTiresSpecifications: '',
                vehicleTechnologyTotalMass: '',
                vehicleTechnologyTransmission: '',
                vehicleTechnologyUnladenMass: '',
                vehicleTechnologyVin: '',
                vehicleTechnologyVehiclepic: ''
            },
            discharge: [ // 排放标准
                {
                    value: '01',
                    label: '国Ⅱ'
                },
                {
                    value: '02',
                    label: '国Ⅲ'
                },
                {
                    value: '03',
                    label: '国Ⅳ'
                },
                {
                    value: '04',
                    label: '国Ⅴ'
                },
                {
                    value: '05',
                    label: '国Ⅵ'
                }
            ],
            transmission: [ // 变速器形式
                {
                    value: '01',
                    label: '自动变速器'
                },
                {
                    value: '02',
                    label: '手动变速器'
                },
                {
                    value: '03',
                    label: '无级变速器'
                },
                {
                    value: '04',
                    label: '手自一体化'
                },
                {
                    value: '05',
                    label: '双离合变速器'
                }
            ],
            retarder: [ // 缓速器形式
                {
                    value: '01',
                    label: '电涡流缓速器'
                },
                {
                    value: '02',
                    label: '液力缓速器'
                }
            ],
            carLong: '', // 车长
            carWidth: '', // 车宽
            carHeight: '', // 车高
            addRoadName: '',
            addRoadDate: '',
            addRoadRange: '',
            roadInfoData: [
            ],
            addRoadNumber: '',
            addRoadAlert: false,
            addCarDate: '',
            addCarColor: '',
            plateColor,
            technologyPowerType: [
                {
                    value: '01',
                    label: '前置前驱'
                },
                {
                    value: '02',
                    label: '后置后驱'
                },
                {
                    value: '03',
                    label: '前置后驱'
                },
                {
                    value: '04',
                    label: '全轮驱动'
                }
            ],
            addCarNumber: '',
            addCarNumAlert: false,
            value: '',
            powerType: '',
            domestic: '',
            domesticList: [
                {
                    value: '01',
                    label: '国产'
                },
                {
                    value: '02',
                    label: '进口'
                }
            ],
            carTypeList: [
            ],
            carNumberData: [
            ],
            testingTable: [ // 车辆检测和评定登记表
            ],
            testPageNum: 1,
            testPageSize: 10,
            testTotal: 0,
            repairTable: [ // 车辆维护和修理登记表
            ],
            repairPageNum: 1,
            repairPageSize: 10,
            repairTotal: 0,
            partChangeTable: [ // 车辆主要部件更换登记表
            ],
            partChangePageNum: 1,
            partChangePageSize: 10,
            partChangeTotal: 0,
            carChangeTable: [ // 车辆变更记录
            ],
            carChangePageNum: 1,
            carChangePageSize: 10,
            carChangeTotal: 0,
            mileageTable: [ // 车辆行驶里程登记表
            ],
            mileagePageNum: 1,
            mileagePageSize: 10,
            mileageTotal: 0,
            accidentTable: [ // 车辆机损事故登记表
            ],
            accidentPageNum: 1,
            accidentPageSize: 10,
            accidentTotal: 0,
            carBrandList: [],
            seriesList: [],
            sendSave: false,
            vehicleId: '',
            partsPageNum: 1,
            partsPageSize: 10,
            partsTotal: 0,
            firstSend: true,
            vehicleSeriesId: ''
        }
    },
    components: {
        Header,
        PdfView,
        ToolBar,
        Modal
    },
    filters: {
        // 日期过滤
        filterDate (value) {
            if (!value) return ''
            return filterTime('yyyy-mm-dd', value - 0)
        },
        // 牌号过滤
        carNumberFormat (value) {
            if (value === 0) {
                return '首次核发'
            }
            return '牌号变更' + value
        },
        // 道路运输信息过滤
        roadDataFormat (value) {
            if (value === 0) {
                return '初次登记'
            }
            return '名称变更' + value
        },
        // 检查类别
        detectFilter (val) {
            let list = [
                {
                    name: '技术等级评定',
                    value: 1
                },
                {
                    name: '二级维护竣工质量检测',
                    value: 4
                },
                {
                    name: '汽车大修竣工质量检验',
                    value: 5
                },
                {
                    name: '其他检测',
                    value: 9
                }
            ]
            for (let item of list) {
                if (item.value === val) {
                    return item.name
                }
            }
        }
    },
    created () {
        this.getVehicleVrand()
        this.getVehicleType()
        if (this.$route.query && this.$route.query.id) {
            this.vehicleId = this.$route.query.id
            this.getBusVehicleRepair()
            this.getVehicleParts()
            this.getVehicleCheck()
            this.getAllDate(this.vehicleId)
        }
    },
    watch: {
        tabIndex (val) {
            if (val === 'reportList') {
                this.queryDetectRecord()
            }
        }
    },
    computed: {
        pdfWidth () {
            return document.body.clientWidth > 800 ? document.body.clientWidth * 0.8 : 800
        },
        pdfHeight () {
            return document.body.clientHeight > 600 ? document.body.clientHeight * 0.8 : 600
        }
    },
    methods: {
        pdfCancel () {
            this.pdfShow = false
        },
        // 人工检验记录单
        getReport1 (id) {
            this.pdfShow = true
            this.pdfUrl = window.uploadURL + 'report/inspect/findInspect1' + '?detectSn=' + id
        },
        // 性能检验记录单
        getReport2 (id) {
            this.pdfShow = true
            this.pdfUrl = window.uploadURL + 'report/inspect/findInspect2' + '?detectSn=' + id
        },
        // 综合性能检验报告单
        getReport3 (id) {
            this.pdfShow = true
            this.pdfUrl = window.uploadURL + 'report/inspect/findInspect3' + '?detectSn=' + id
        },
        // 报告单列表
        queryDetectRecord () {
            this.$post('jc/detect/findJcPerformanceDetectRecord', {
                'pageNum': this.testPageNum,
                'pageSize': this.testPageSize,
                'vehicleTechnicalRecordId': this.$route.query.id
            }).then(res => {
                if (res.status === 200) {
                    res.data.list.forEach((item, index) => {
                        let ind = index + 1
                        item.index = ind < 10 ? '0' + ind : ind
                    })
                    this.testingTable = res.data.list
                    this.testTotal = res.data.total
                }
            })
        },
        // 获取部件更换记录
        getVehicleParts () {
            var obj = {
                vehicleId: this.vehicleId,
                pageNum: this.partChangePageNum,
                pageSize: this.partChangePageSize
            }
            this.$post('bas/vehicle/technicalRecord/findPartsList', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.partChangeTable = res.data.list
                        this.partChangeTotal = res.data.total
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        // 获取维护和修理登记表
        getBusVehicleRepair () {
            this.$post('bas/vehicle/technicalRecord/findFixList', {
                vehicleId: this.vehicleId,
                pageSize: this.repairPageSize,
                pageNum: this.repairPageNum
            })
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                            this.repairCodeList.forEach(itemB => {
                                if (itemB.value === item.vehicleFixCategory) {
                                    item.vehicleFixCategory = itemB.label
                                }
                            })
                        })
                        this.repairTotal = res.data.total
                        this.repairTable = res.data.list
                    }
                })
        },
        // 获取车系列表
        getSeriesList () {
            this.$post('bas/vehicle/series/list', {
                data: {
                    vehicleBrandId: this.vehicleTechnology.vehicleBrandId
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.seriesList = res.data
                        if (this.$route.query.id && this.firstSend) {
                            this.firstSend = false
                        } else {
                            this.vehicleSeriesId = ''
                        }
                    }
                })
        },
        // 上传之前的钩子
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
        // 删除文件钩子
        handleRemove (file) {
            this.vehicleTechnology.vehicleTechnologyVehiclepic = ''
        },
        uploadSuccess (res) {
            var radio = this.$refs.carImg.offsetWidth / this.$refs.carImg.offsetHeight
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.vehicleTechnologyVehiclepic.style.width = '100%'
                } else {
                    _this.$refs.vehicleTechnologyVehiclepic.style.height = '100%'
                }
                _this.vehicleTechnology.vehicleTechnologyVehiclepic = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        // 获取车辆类型
        getVehicleType () {
            this.$post('bas/vehicle/type/list')
                .then(res => {
                    if (res.status === 200) {
                        this.carTypeList = res.data
                    }
                })
        },
        getVehicleCheck () {
            this.$post('bas/vehicle/busVehicleDetectioneValuate/find', {
                data: {
                    vehicleId: this.vehicleId
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        res.datas && res.datas.forEach((item, index) => {
                            let ind = index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.testingTable = res.datas
                    }
                })
        },
        // 获取所有车辆数据
        getAllDate (id) {
            var obj = {
                data: {
                    vehicleTechnicalRecordId: id
                }
            }
            this.$post('bas/vehicle/technicalRecord/findVehicleTechnicalRecordById', obj)
                .then(res => {
                    if (res.status === 200) {
                        // 车辆号牌数据排序
                        res.data.baseVehicleLicensePlates = this.dataSort(res.data.baseVehicleLicensePlates)
                        // 道路运输证信息排序
                        res.data.vehicleTransportCertificateList = this.dataSort(res.data.vehicleTransportCertificateList)
                        // 车辆号牌索引过滤
                        res.data.baseVehicleLicensePlates.forEach((item, index) => {
                            if (index === 0) {
                                item.index = '首次核发'
                            } else {
                                item.index = '牌号变更' + (index)
                            }
                        })
                        // 道路运输信息索引过滤
                        res.data.vehicleTransportCertificateList.forEach((item, index) => {
                            if (index === 0) {
                                item.index = '初次登记'
                            } else {
                                item.index = '名称变更' + (index)
                            }
                        })
                        if (res.data.vehicleTechnology) {
                            // 删除后台会报错的属性
                            res.data.vehicleTechnology.createId && delete res.data.vehicleTechnology.createId
                            res.data.vehicleTechnology.createTime && delete res.data.vehicleTechnology.createTime
                            res.data.vehicleTechnology.deleteId && delete res.data.vehicleTechnology.deleteId
                            res.data.vehicleTechnology.deleteStatus && delete res.data.vehicleTechnology.deleteStatus
                            res.data.vehicleTechnology.deleteTime && delete res.data.vehicleTechnology.deleteTime
                            res.data.vehicleTechnology.updateId && delete res.data.vehicleTechnology.updateId
                            // 单独数据赋值
                            this.vehicleSeriesId = res.data.vehicleTechnology.vehicleSeriesId
                            var carWidth = res.data.vehicleTechnology.vehicleTechnologyDimensions.split(',')
                            // 取出车辆图片URL
                            var picUrl = res.data.vehicleTechnology.vehicleTechnologyVehiclepic
                            res.data.vehicleTechnology.vehicleTechnologyVehiclepic = ''
                            // 主要数据赋值
                            this.vehicleTechnology = res.data.vehicleTechnology
                            if (res.data.vehicleTechnology.vehicleTechnologyProductDate) {
                                this.vehicleTechnology.vehicleTechnologyProductDate = new Date(res.data.vehicleTechnology.vehicleTechnologyProductDate).getTime()
                            }
                            // 图片异步加载，计算宽高比
                            var radio = this.$refs.carImg.offsetWidth / this.$refs.carImg.offsetHeight
                            var _this = this
                            var img = new Image()
                            img.src = picUrl
                            img.onload = function () {
                                if (this.width / this.height > radio) {
                                    _this.$refs.vehicleTechnologyVehiclepic.style.width = '100%'
                                } else {
                                    _this.$refs.vehicleTechnologyVehiclepic.style.height = '100%'
                                }
                                _this.vehicleTechnology.vehicleTechnologyVehiclepic = picUrl
                            }
                            this.carLong = carWidth[0]
                            this.carWidth = carWidth[1]
                            this.carHeight = carWidth[2]
                            this.getSeriesList()
                        }
                        this.carNumberData = res.data.baseVehicleLicensePlates
                        this.roadInfoData = res.data.vehicleTransportCertificateList
                    }
                })
        },
        // 数据排序
        dataSort (data) {
            return data.sort((a, b) => {
                if (a.listorder > b.listorder) {
                    return 1
                } else if (a.listorder < b.listorder) {
                    return -1
                } else {
                    return 0
                }
            })
        },
        // 验证是否正整数
        numberTest (val) {
            return /^\d+$/.test(val)
        },
        // 保存数据
        saveData () {
            if (!this.carNumberData.length) {
                this.$alert('请添加车牌号码信息！', '提示')
                this.tabIndex = 'carInfo'
                return
            }
            if (!this.roadInfoData.length) {
                this.$alert('请添加道路运输证信息！', '提示')
                this.tabIndex = 'carInfo'
                return
            }
            if (!this.vehicleTechnology.vehicleTypeId) {
                this.$alert('请选择车辆类型！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleTechnology.vehicleTechnologyBrandModel) {
                this.$alert('请选择厂牌型号！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleTechnology.vehicleTechnologyManufactureName) {
                this.$alert('请输入制造厂名！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            console.log(this.vehicleTechnology.vehicleTechnologyProductDate)
            if (!this.vehicleTechnology.vehicleTechnologyProductDate) {
                this.$alert('请输入出厂日期！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleTechnology.vehicleTechnologyDomesticImport) {
                this.$alert('请选择国产/进口！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!/^[\da-zA-Z]{17}$/.test(this.vehicleTechnology.vehicleTechnologyVin)) {
                this.$alert('请输入正确的VIN码，应为17位的数字与字母组合！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleTechnology.vehicleTechnologyChassisModel) {
                this.$alert('请输入底盘型号！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!/^\d+$/.test(this.carLong) || !/^\d+$/.test(this.carWidth) || !/^\d+$/.test(this.carHeight)) {
                this.$alert('请输入车辆外廓尺寸！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleTechnology.vehicleBrandId) {
                this.$alert('请选择品牌！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (!this.vehicleSeriesId) {
                this.$alert('请选择车系！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyUnladenMass && !this.numberTest(this.vehicleTechnology.vehicleTechnologyUnladenMass)) {
                this.$alert('请正确输入整备质量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyDraw && !this.numberTest(this.vehicleTechnology.vehicleTechnologyDraw)) {
                this.$alert('请正确输入准牵引质量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyApprovedLoad && !this.numberTest(this.vehicleTechnology.vehicleTechnologyApprovedLoad)) {
                this.$alert('请正确输入核定载质量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyApprovedCarry && !this.numberTest(this.vehicleTechnology.vehicleTechnologyApprovedCarry)) {
                this.$alert('请正确输入核定载客！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyEngineNo && this.vehicleTechnology.vehicleTechnologyEngineNo.length < 7) {
                this.$alert('请正确输入发动机号码！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyEngineDisplacement && !this.numberTest(this.vehicleTechnology.vehicleTechnologyEngineDisplacement)) {
                this.$alert('请正确输入发动机排量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyEnginePower && !this.numberTest(this.vehicleTechnology.vehicleTechnologyEnginePower)) {
                this.$alert('请正确输入发动机净功率！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyMotorPower && !this.numberTest(this.vehicleTechnology.vehicleTechnologyMotorPower)) {
                this.$alert('请正确输入电机功率！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyAxleNum && !this.numberTest(this.vehicleTechnology.vehicleTechnologyAxleNum)) {
                this.$alert('请正确输入车轴数量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyWheelbase && !this.numberTest(this.vehicleTechnology.vehicleTechnologyWheelbase)) {
                this.$alert('请正确输入轴距！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyContainer && !this.numberTest(this.vehicleTechnology.vehicleTechnologyContainer)) {
                this.$alert('请正确输入货箱内尺寸或容积！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            if (this.vehicleTechnology.vehicleTechnologyTotalMass && !this.numberTest(this.vehicleTechnology.vehicleTechnologyTotalMass)) {
                this.$alert('请正确输入总质量！', '提示')
                this.tabIndex = 'carConfig'
                return
            }
            this.vehicleTechnology.vehicleSeriesId = this.vehicleSeriesId
            var obj = {
                picurl: this.vehicleTechnology.vehicleTechnologyVehiclepic,
                baseVehicleTransportCertificates: this.roadInfoData,
                baseVehicleLicensePlateList: this.carNumberData,
                vehicleTechnology: this.vehicleTechnology
                // vehicleTechnology: {
                //     vehicleModelId: '', // 车辆类型Id
                //     vehicleTechnologyAbs: '', // 制动防抱死系统
                //     vehicleTechnologyAirConditioner: '', // 空调系统
                //     vehicleTechnologyApprovedCarry: '', // 核定载客
                //     vehicleTechnologyApprovedLoad: '', // 核定载质量
                //     vehicleTechnologyAxleNum: '', // 车轴数量
                //     vehicleTechnologyBatteryType: '', // 电池类型
                //     vehicleTechnologyBrakeType: '', // 制动器形式
                //     vehicleTechnologyBrakingMode: '', // 行车制动方式
                //     vehicleTechnologyBrandModel: '', // 厂牌型号
                //     vehicleTechnologyChassisModel: '', // 底盘型号
                //     vehicleTechnologyContainer: '', // 货箱内尺寸或容积
                //     vehicleTechnologyDimensions: '', // 车辆外廓尺寸
                //     vehicleTechnologyDomesticImport: '', // 国产/进口
                //     vehicleTechnologyDraw: '', // 准牵引质量
                //     vehicleTechnologyDrivingMotor: '', // 驱动电机型号
                //     vehicleTechnologyEmissionStandard: '', // 排放标准
                //     vehicleTechnologyEngineDisplacement: '', // 发动机排量
                //     vehicleTechnologyEngineNo: '', // 发动机号码
                //     vehicleTechnologyEnginePower: '', // 发动机净功率
                //     vehicleTechnologyEngineType: '', // 发动机型号
                //     vehicleTechnologyManufactureName: '', // 制造厂名
                //     vehicleTechnologyMotorPower: '', // 电机功率
                //     vehicleTechnologyPowerType: '', // 动力类型
                //     vehicleTechnologyProductDate: '', // 出厂日期
                //     vehicleTechnologyRetarder: '', // 缓速器
                //     vehicleTechnologySatellitePositioning: '', // 卫星定位系统
                //     vehicleTechnologyTiresSpecifications: '', // 轮胎数/规格
                //     vehicleTechnologyTotalMass: '', // 总质量
                //     vehicleTechnologyTransmission: '', // 变速器形式
                //     vehicleTechnologyUnladenMass: '', // 整备质量
                //     vehicleTechnologyVin: '', // VIN码
                //     vehicleTechnologyWheelbase: '' // 轴距
                // }
            }
            var newObj = JSON.parse(JSON.stringify(obj))
            newObj.vehicleTechnology.vehicleTechnologyAxleNum = newObj.vehicleTechnology.vehicleTechnologyAxleNum - 0
            newObj.vehicleTechnology.vehicleTechnologyDimensions = `${this.carLong},${this.carWidth},${this.carHeight}`
            if (this.sendSave) {
                return
            }
            this.sendSave = true
            if (this.vehicleId) {
                newObj.vehicleId = this.vehicleId
                this.$post('bas/vehicle/technicalRecord/editVehicleTechnicalRecord', newObj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '保存成功',
                                callback: () => {
                                    this.$router.push('/transportArch')
                                }
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.sendSave = false
                    })
                    .catch(e => {
                        console.log(e)
                        this.$alert('网络错误，请重试！', '提示')
                        this.sendSave = false
                    })
            } else {
                this.$post('bas/vehicle/technicalRecord/addVehicleTechnicalRecord', newObj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '添加成功',
                                callback: () => {
                                    this.$router.push('/transportArch')
                                }
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.sendSave = false
                    })
                    .catch(e => {
                        console.log(e)
                        this.$alert('网络错误，请重试！', '提示')
                        this.sendSave = false
                    })
            }
        },
        // 返回上一级
        goBack () {
            this.$myAlert({
                title: '提示',
                msg: '返回后数据将不会保存，是否继续？'
            }).then(() => {
                this.$router.push('/transportArch')
            }).catch(() => {
            })
        },
        // 删除车辆号牌信息
        reduceCarNumData () {
            this.carNumberData.length && this.carNumberData.pop()
        },
        // 删除道路运输信息
        reduceRoadData () {
            this.roadInfoData.length && this.roadInfoData.pop()
        },
        // 添加道路运输信息确认
        addRoadConfirm () {
            if (!this.addRoadName) {
                this.$alert('请输入业户名称！', '提示')
                return
            }
            if (!/^\d{12}/.test(this.addRoadNumber)) {
                this.$alert('请正确输入道路运输证号，应为12位数字！', '提示')
                return
            }
            if (!this.addRoadDate) {
                this.$alert('请选择变更日期！', '提示')
                return
            }
            this.roadInfoData.push({
                listorder: this.roadInfoData.length,
                vehicleTransportCertificateBusinessname: this.addRoadName,
                vehicleTransportCertificateNo: this.addRoadNumber,
                vehicleTransportCertificateScope: this.addRoadRange,
                vehicleTransportCertificateChangeDate: this.addRoadDate
            })
            this.addRoadName = ''
            this.addRoadNumber = ''
            this.addRoadRange = ''
            this.addRoadDate = ''
            this.addRoadAlert = false
        },
        // 添加道路运输信息取消
        addRoadCancel () {
            this.addRoadAlert = false
        },
        // 添加车辆号牌信息确认
        addCarNumConfirm () {
            if (!plateNum(this.addCarNumber)) {
                this.$alert('请正确填写车牌号码！', '提示')
                return
            }
            if (!this.addCarColor) {
                this.$alert('请选择车牌颜色！', '提示')
                return
            }
            if (!this.addCarDate) {
                this.$alert('请选择变更日期！', '提示')
                return
            }
            this.carNumberData.push({
                listorder: this.carNumberData.length,
                vehicleLicensePlate: this.addCarNumber,
                vehicleLicensePlateColor: this.addCarColor,
                vehicleLicensePlateDate: this.addCarDate
            })
            this.addCarNumber = ''
            this.addCarColor = ''
            this.addCarDate = ''
            this.addCarNumAlert = false
        },
        // 添加车辆号牌信息取消
        addCarNumCancel () {
            this.addCarNumber = ''
            this.addCarColor = ''
            this.addCarDate = ''
            this.addCarNumAlert = false
        },
        // 获取所有车辆品牌列表
        getVehicleVrand () {
            this.$get('external/vehicle/brand/list')
                .then(res => {
                    if (res.status === 200) {
                        this.carBrandList = res.data
                    }
                })
        },
        // 车辆检测表页数量
        testSizeChange (val) {
            this.testPageSize = val
            this.testPageNum = 1
            this.queryDetectRecord()
        },
        // 车辆检测表页码
        testCurrentChange (val) {
            this.testPageNum = val
            this.queryDetectRecord()
        },
        // 车辆维护和修理表页数量
        repairSizeChange (val) {
            this.repairPageSize = val
            this.repairPageNum = 1
            this.getBusVehicleRepair()
        },
        // 车辆维护和修理表页码
        repairCurrentChange (val) {
            this.repairPageNum = val
            this.getBusVehicleRepair()
        },
        // 车辆主要部件更换登记表页数量
        partChangeSizeChange (val) {
            this.partChangePageSize = val
            this.partChangePageNum = 1
            this.getVehicleParts()
        },
        // 车辆主要部件更换登记表页码
        partChangeCurrentChange (val) {
            this.partChangePageNum = val
            this.getVehicleParts()
        },
        // 车辆变更记录表页数量
        carChangeSizeChange (val) {
            this.carChangePageSize = val
        },
        // 车辆变更记录表页码
        carChangeCurrentChange (val) {
            this.carChangePageNum = val
        },
        // 车辆行驶里程登记表页数量
        mileageSizeChange (val) {
            this.mileagePageSize = val
        },
        // 车辆行驶里程登记表页码
        mileageCurrentChange (val) {
            this.mileagePageNum = val
        },
        // 车辆机损事故登记表页数量
        accidentSizeChange (val) {
            this.accidentTotalPageSize = val
        },
        // 车辆机损事故登记表页码
        accidentCurrentChange (val) {
            this.accidentTotalPageNum = val
        }
    }
}
</script>

<style lang='less' scoped>
.table_box {
    min-height: 620px;
}
.car-info {
    .title {
        text-align: left;
        font-size: 14px;
        color: #666;
        line-height: 34px;
        span {
            font-weight: normal;
            font-size: 12px;
        }
    }
    .car-number-table {
        height: 326px;
        width: 750px;
        margin-right: 30px;
        .edit-btn {
            height: 44px;
            line-height: 44px;
            // background-color: #EDF0F5;
            border: 1px solid #ddd;
            border-top: none;
            text-align: left;
            .add, .reduce {
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #D5D5D5;
                margin-left: 20px;
                cursor: pointer;
                border-radius:3px;
            }
            .reduce {
                img {
                    position: relative;
                    top: -5px;
                }
            }
        }
        .table {
            height: 200px;
        }
    }
    .road-table {
        width: 1200px;
        height: 300px;
        .edit-btn {
            height: 44px;
            line-height: 44px;
            // background-color: #EDF0F5;
            border: 1px solid #ddd;
            border-top: none;
            text-align: left;
            .add, .reduce {
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #D5D5D5;
                margin-left: 20px;
                border-radius:3px;
                cursor: pointer;
            }
            .reduce {
                img {
                    position: relative;
                    top: -5px;
                }
            }
        }
        .table {
            height: 200px;
        }
    }
    .car-img {
        .img-wrap {
            width: 400px;
            height: 244px;
            border: 1px solid #ddd;
            padding: 10px;
            .upload-demo {
                width: 100%;
                height: 100%;
            }
            .default-img {
                background-color: #eee;
                text-align: center;
                height: 244px;
                line-height: 244px;
                img {
                    width: 104px;
                    height: 81px;
                    vertical-align: middle;
                }
            }
        }
    }
}
.road-info {
    .road-info-table {
        width: 100%;
        height: 360px;
        border-collapse:collapse;
        input {
            border: none;
            outline: none;
            font-size: 14px;
            color: #333;
        }
        .shot {
            width: 42px;
        }
        tr {
            td {
                border: 1px solid #ddd;
                font-size: 14px;
                font-weight: normal;
                height: 39px;
                text-align: left;
                padding-left: 12px;
            }
            .title {
                color: #666;
                text-align: center;
            }
        }
    }
}
.red {
    color: #ff0000;
}
.add-car-alert {
    text-align: left;
    font-size: 14px;
    .info-item {
        margin-top: 30px;
        .left {
            display: inline-block;
            width: 130px;
            text-align: right;
            color: #666;
        }
        .right {
            width: 250px;
            display: inline-block;
        }
    }
    .btn {
        padding-left: 16px;
        margin-top: 30px;
        text-align: center;
    }
}
.add-road-alert {
    text-align: left;
    font-size: 14px;
    .info-item {
        margin-top: 30px;
        .left {
            display: inline-block;
            width: 130px;
            text-align: right;
            color: #666;
        }
        .right {
            width: 250px;
            display: inline-block;
        }
    }
    .btn {
        padding-left: 16px;
        margin-top: 30px;
        text-align: center;
    }
}
</style>
<style lang="less">
.transportDetail {
    .el-tabs--border-card {
        border: none;
        box-shadow: none;
    }
    .el-tabs__content {
        padding: 0 20px;
    }
    .el-tabs--card>.el-tabs__header {
        border-top: 1px solid #ddd;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border:none;
        border-radius: 0px;
        border-right: 1px solid #ddd;
    }
    .el-upload {
        width: 100%;
        height: 100%;
    }
    .el-table--fit {
        border: 1px solid #ddd;
    }
    .el-table {
        .th {
            height: 44px;
            line-height: 44px;
            padding: 0;
            .cell {
                height: 44px;
                line-height: 44px;
            }
        }
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
        border-left: 1px solid #e4e7ed;
    }
    .el-table th.is-leaf {
        height: 44px;
            line-height: 44px;
            padding: 0;
    }
    .el-table--enable-row-transition .el-table__body td {
        padding: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .el-table th.gutter {
        background-color: #EDF0F5;
    }
    .el-pagination {
        padding: 8px 5px;
        border: 1px solid #ddd;
        border-top: none;
        background-color:#F7F8F9;
    }
    .road-info-table {
        .el-input__inner {
            width: 160px;
        }
    }
    .add-car-alert {
        .el-select {
            width: 100%;
        }
        .el-date-editor.el-input {
            width: 100%;
        }
        .el-button {
            width: 98px;
        }
    }
    .add-road-alert {
        .el-select {
            width: 100%;
        }
        .el-date-editor.el-input {
            width: 100%;
        }
        .el-button {
            width: 98px;
        }
    }
}
</style>
