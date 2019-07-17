<!-- 档案详情 -->
<template>
    <div class="archivesDetail">
        <!-- <tool-bar>
            <el-button icon="el-icon-tickets" type="primary" @click="vehicleUpdate">保存</el-button>
            <button class="back_btn2" @click="goBack">返回</button>
        </tool-bar> -->
        <div class="content">
            <div class="table_box">
                <el-tabs type="border-card">
                    <el-tab-pane label="车辆基本信息" class="car-info">
                        <div class="left">
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>车牌号码：</div>
                                <el-input disabled v-model="carInfo.vehicleNo"></el-input>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>VIN码：</div>
                                <el-input disabled maxlength="17" v-model="carInfo.vin"></el-input>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>车牌颜色：</div>
                                <el-select v-model="carInfo.vehicleLicensePlateColor" placeholder="请选择">
                                    <el-option
                                    v-for="item in carColorList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>车辆类型：</div>
                                <el-select v-model="carInfo.typeId" placeholder="请选择">
                                    <el-option
                                    v-for="item in carTypeList"
                                    :key="item.vehicleTypeId"
                                    :label="item.vehicleTypeName"
                                    :value="item.vehicleTypeId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>使用性质：</div>
                                <el-select v-model="carInfo.vehicleUse" placeholder="请选择">
                                    <el-option
                                    v-for="item in vehicleUseList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>车主：</div>
                                <el-input v-model="carInfo.vehicleOwner"></el-input>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>燃油类别：</div>
                                <el-select v-model="carInfo.vehicleFuelCategory" placeholder="请选择">
                                    <el-option
                                    v-for="item in oilTypeList"
                                    :key="item.vehicleTypeId"
                                    :label="item.vehicleTypeName"
                                    :value="item.vehicleTypeId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>发动机号码：</div>
                                <el-input maxlength="8" v-model="carInfo.vehicleEngineNumber"></el-input>
                            </div>
                        </div>
                        <div class="right">
                            <div class="info-msg">
                                <div class="title img-title">
                                    <b>车辆照片：</b><br />
                                    <span>点击图片上传照片&nbsp;</span>
                                </div>
                                <div class="car-img" ref="carImg">
                                    <el-upload
                                        class="upload-demo"
                                        :action="uploadURL + 'attachment/file/upload'"
                                        :on-success="uploadSuccess"
                                        multiple
                                        :limit="1"
                                        :before-upload="beforeAvatarUpload"
                                        :on-remove="handleRemove"
                                        :file-list="fileList">
                                        <div v-show="!vehiclePicUrl" class="default-img">
                                            <img src="../../assets/images/audit/default_icon_photo.png" alt="车辆照片">
                                        </div>
                                        <img v-show="vehiclePicUrl" ref="vehiclePicUrl" :src="vehiclePicUrl" alt="车辆照片">
                                    </el-upload>
                                </div>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>品牌：</div>
                                <el-select v-model="carInfo.vehicleBrandId" @change="changeSeries" placeholder="请选择">
                                    <el-option
                                    v-for="item in carBrandList"
                                    :key="item.vehicleBrandId"
                                    :label="item.vehicleBrandName"
                                    :value="item.vehicleBrandId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title"><span class="red">* </span>车系：</div>
                                <el-select v-model="carInfo.vehicleSeriesId" placeholder="请选择">
                                    <el-option
                                    v-for="item in carSeriesList"
                                    :key="item.vehicleSeriesId"
                                    :label="item.vehicleSeriesName"
                                    :value="item.vehicleSeriesId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="info-msg">
                                <div class="title">行驶证登记日期：</div>
                                <el-date-picker
                                    v-model="carInfo.vehicleDrivingRecorddate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                            <div class="info-msg">
                                <div class="title">行驶证发证日期：</div>
                                <el-date-picker
                                    v-model="carInfo.vehicleDrivingLicenseDateOfissue"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="车辆维修记录">
                        <el-table
                            :data="repairRecord"
                            style="width: 100%"
                            height="600"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="vehicleFixBalanceDate"
                                label="送修日期"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="vehicleFixCategory"
                                label="维修类别"
                                width="80">
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
                        <div class="page_box">
                            <el-pagination
                                @size-change="handlePartSizeChange"
                                @current-change="handlePartCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[10, 15, 20]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="部件更换记录">
                        <el-table
                            :data="changeRecord"
                            style="width: 100%"
                            height="600"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="vehicleChangePartsDate"
                                label="更换日期"
                                width="100">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicleChangePartsDate | formatTime}}
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
                        <div class="page_box">
                            <el-pagination
                                @size-change="handlePartSizeChange2"
                                @current-change="handlePartCurrentChange2"
                                :current-page="pageNum2"
                                :page-sizes="[10, 15, 20]"
                                :page-size="pageSize2"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total2">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-archives-normal">
            <el-button type="primary" @click="vehicleUpdate">保存</el-button>
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import { filterTime } from '@/utils/filterTime.js'
import { plateColor } from '@/utils/type.js'
import ToolBar from '@/components/ToolBar.vue'
import BreadFoot from '@/components/BreadFoot.vue'
export default {
    name: 'archivesDetail',
    data () {
        return {
            breadArr: [
                { title: '档案管理', path: '' }, { title: '车辆档案', path: '' }, { title: '车辆档案详情', path: '' }
            ],
            uploadURL: window.uploadURL,
            fileList: [],
            carNumber: '',
            carInfo: {
                typeName: '',
                vehicleBrandId: '',
                vehicleDrivingLicenseDateOfissue: '', // 行驶证发证日期
                vehicleDrivingRecorddate: '', // 行驶证登记日期
                vehicleEngineNumber: '', // 发动机号码
                vehicleFuelCategory: '', // 燃油类别
                vehicleLicensePlateColor: '', // 车牌颜色
                vehicleId: '',
                vehicleModel: '',
                vehicleNo: '',
                vehicleOwner: '',
                vin: '',
                typeId: ''
            },
            firstSend: true,
            vehiclePicUrl: '',
            pageNum: 1,
            pageSize: 10,
            pageNum2: 1,
            pageSize2: 10,
            total: 0,
            total2: 0,
            registerTime: '',
            certiTime: '',
            carType: '', // 车辆类型
            carTypeList: [], // 车辆类型列表
            carColorList: plateColor, // 车牌颜色列表
            carSeriesList: [
            ],
            carBrandList: [],
            oilType: '', // 燃油类别
            oilTypeList: [], // 燃油类别列表
            repairRecord: [], // 维修记录
            vehicleUseList: [
                {
                    value: '01',
                    label: '营运'
                },
                {
                    value: '02',
                    label: '非营运'
                }
            ],
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
            changeRecord: [], // 部件更换记录
            chooseId: 0, // 选中的id
            fileUpload: ''
        }
    },
    filters: {
        formatTime (val) {
            return filterTime('yyyy-mm-dd', val - 0)
        }
    },
    components: {
        BreadFoot,
        ToolBar
    },
    created () {
        this.getVehicleFix()
        this.getVehicleParts()
        this.getVehicleCategory()
        this.getVehicleType()
        this.getVehicleInfo()
    },
    methods: {
        goBack () {
            this.$myAlert({
                title: '提示',
                msg: '返回后数据将不会保存，是否继续？'
            }).then(() => {
                this.$router.push('/carArchives')
            }).catch(() => {
            })
        },
        // 图片清空
        handleRemove () {
            this.vehiclePicUrl = ''
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
        // 图片上传成功
        uploadSuccess (res, file, filList) {
            var radio = this.$refs.carImg.offsetWidth / this.$refs.carImg.offsetHeight
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.vehiclePicUrl.style.width = '100%'
                } else {
                    _this.$refs.vehiclePicUrl.style.height = '100%'
                }
                _this.vehiclePicUrl = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        // 保存信息
        vehicleUpdate () {
            if (!this.carInfo.vehicleNo) {
                this.$alert('请输入车牌号码！', '提示')
                return
            }
            if (!/^[\da-zA-Z]{17}$/.test(this.carInfo.vin)) {
                this.$alert('请输入正确的VIN码，应为17位的数字或字母组成！', '提示')
                return
            }
            if (!this.carInfo.typeId) {
                this.$alert('请选择车辆类型！', '提示')
                return
            }
            if (!this.carInfo.vehicleBrandId) {
                this.$alert('请选择品牌！', '提示')
                return
            }
            if (!this.carInfo.vehicleFuelCategory) {
                this.$alert('请选择燃油类别！', '提示')
                return
            }
            if (!this.carInfo.vehicleOwner) {
                this.$alert('请输入车主！', '提示')
                return
            }
            if (!this.carInfo.vehicleSeriesId) {
                this.$alert('请选择车系！', '提示')
                return
            }
            if (!/^[\da-zA-Z]{7,8}$/.test(this.carInfo.vehicleEngineNumber)) {
                this.$alert('请正确输入发动机号码！', '提示')
                return
            }
            var obj = {
                vehicleOwner: this.carInfo.vehicleOwner,
                typeId: this.carInfo.typeId,
                vehicleNo: this.carInfo.vehicleNo,
                vehicleBrandId: this.carInfo.vehicleBrandId,
                // vehicleDrivingRecorddate: this.carInfo.vehicleDrivingRecorddate ? filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingRecorddate - 0) : null,
                vehicleEngineNumber: this.carInfo.vehicleEngineNumber,
                vehicleFuelCategory: this.carInfo.vehicleFuelCategory,
                vehicleSeriesId: this.carInfo.vehicleSeriesId,
                vehiclePicUrl: this.vehiclePicUrl,
                vehicleLicensePlateColor: this.carInfo.vehicleLicensePlateColor,
                vin: this.carInfo.vin,
                // vehicleDrivingLicenseDateOfissue: this.carInfo.vehicleDrivingLicenseDateOfissue ? filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingLicenseDateOfissue - 0) : null,
                vehicleId: this.carInfo.vehicleId,
                vehicleUse: '02'
            }
            // if (this.carInfo.vehicleDrivingRecorddate) {
            //     obj.vehicleDrivingRecorddate = filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingRecorddate - 0)
            // }
            // if (this.carInfo.vehicleDrivingLicenseDateOfissue) {
            //     obj.vehicleDrivingLicenseDateOfissue = filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingLicenseDateOfissue - 0)
            // }
            obj.vehicleDrivingRecorddate = this.carInfo.vehicleDrivingRecorddate
            obj.vehicleDrivingLicenseDateOfissue = this.carInfo.vehicleDrivingLicenseDateOfissue
            this.$post('bas/vehicle/update/info', obj)
                .then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '保存成功',
                            callback: () => {
                                this.$router.push('/carArchives')
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        // 获取所有车辆品牌列表
        getVehicleVrand () {
            this.$get('external/vehicle/brand/list')
                .then(res => {
                    if (res.status === 200) {
                        this.carBrandList = res.data
                        this.getSeriesList()
                    }
                })
        },
        changeSeries () {
            this.carInfo.vehicleSeriesId = ''
            this.getSeriesList()
        },
        // 获取车系列表
        getSeriesList () {
            this.$post('bas/vehicle/series/list', {
                data: {
                    vehicleBrandId: this.carInfo.vehicleBrandId
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.carSeriesList = res.data
                    }
                })
        },
        // 获取车辆类型列表
        getVehicleType () {
            this.$get('bas/vehicle/type/list')
                .then(res => {
                    if (res.status === 200) {
                        this.carTypeList = res.data
                    }
                })
        },
        // 获取燃油类别
        getVehicleCategory () {
            this.$get('bas/vehicle/category/list')
                .then(res => {
                    if (res.status === 200) {
                        this.oilTypeList = res.data
                    }
                })
        },
        // 获取部件更换记录
        getVehicleParts () {
            var obj = {
                pageNum: this.pageNum2,
                pageSize: this.pageSize2,
                vehicleId: this.$route.query.id
            }
            this.$post('bas/vehicle/parts/list', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.changeRecord = res.data.list
                        this.total2 = res.total
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        // 获取车辆维修记录
        getVehicleFix () {
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                vehicleId: this.$route.query.id
            }
            this.$post('bas/vehicle/fix/list', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                            this.repairCodeList.forEach(itemB => {
                                if (itemB.value === item.vehicleFixCategory) {
                                    item.vehicleFixCategory = itemB.label
                                }
                            })
                        })
                        this.repairRecord = res.data.list
                        this.total = res.total
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        // 获取车辆基本信息
        getVehicleInfo () {
            this.$post('bas/vehicle/info/?vehicleId=' + this.$route.query.id)
                .then(res => {
                    if (res.status === 200) {
                        this.carInfo = res.data
                        var radio = this.$refs.carImg.offsetWidth / this.$refs.carImg.offsetHeight
                        var _this = this
                        var img = new Image()
                        img.src = res.data.vehiclePicUrl
                        img.onload = function () {
                            if (this.width / this.height > radio) {
                                _this.$refs.vehiclePicUrl.style.width = '100%'
                            } else {
                                _this.$refs.vehiclePicUrl.style.height = '100%'
                            }
                            _this.vehiclePicUrl = res.data.vehiclePicUrl
                        }
                        this.getVehicleVrand()
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        select (index) {
            this.chooseId = index
        },
        tableRowClassName ({ row, rowIndex }) {
            if (rowIndex % 2 !== 0) {
                return 'blue'
            }
            return ''
        },
        // 车辆维修记录选择条数
        handlePartSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getVehicleFix()
        },
        // 车辆维修记录选择页数
        handlePartCurrentChange (val) {
            this.pageNum = val
            this.getVehicleFix()
        },
        // 部件更换记录选择条数
        handlePartSizeChange2 (val) {
            this.pageSize2 = val
            this.pageNum2 = 1
            this.getVehicleParts()
        },
        // 部件更换记录选择页数
        handlePartCurrentChange2 (val) {
            this.pageNum2 = val
            this.getVehicleParts()
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    background: #FFF;
    min-height: 700px;
    padding-bottom: 100px;
    .table_box {
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .car-info {
        .left {
            width: 500px;
            float: left;
            .info-msg {
                font-size: 14px;
                margin-top: 20px;
                text-align: left;
                text-indent: 2px;
                .title {
                    float:left;
                    width: 116px;
                    height: 34px;
                    line-height: 34px;
                    text-align: right;
                    color: #000000;
                }
            }
        }
        .right {
            width: 500px;
            float: left;
            .info-msg {
                font-size: 14px;
                margin-top: 20px;
                text-align: left;
                text-indent: 2px;
                .title {
                    float: left;
                    width: 118px;
                    height: 34px;
                    line-height: 34px;
                    text-align: right;
                    color: #000000;
                    &.img-title {
                        height: 40px;
                        line-height: 20px;
                    }
                }
                .car-img {
                    display: inline-block;
                    width: 220px;
                    height: 129px;
                    border: 1px solid #ddd;
                    padding: 6px;
                    .upload-demo {
                        height: 100%;
                        text-indent: 0;
                        position: relative;
                    }
                    .default-img {
                        background-color: #eee;
                        height: 128px;
                        line-height: 128px;
                        img {
                            width: 80px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
    .sidebar {
        float: left;
        width: 250px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 30px;
        box-sizing: border-box;
        .side_item {
            width: 190px;
            height: 40px;
            border-radius: 4px;
            margin: 10px auto 0;
            line-height: 40px;
            border: 1px solid #dddddd;
            cursor: pointer;
            &:nth-child(1) {
                margin-top: 0;
            }
            &.active {
                background: #359dff;
                border: 1px solid #359dff;
                color: #ffffff;
            }
            &:hover {
                color: #ffffff;
                background-color: #359dff;
                border: 1px solid #359dff;
            }
        }
    }
}
.red {
    color: #ff0000;
}
.brand-alert {
    .brand-list {
        padding: 10px 20px;
        img {
            width: 50px;
            height: 50px;
            margin: 9px;
        }
    }
}
</style>
<style lang="less">
.archivesDetail {
    background: #FFF;
    .el-tabs--border-card>.el-tabs__header {
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
    .el-tabs--border-card{
        border: none;
        box-shadow: none;
        width: 100%;
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
    .el-upload {
        width: 100%;
        height: 100%;
        line-height: 128px;
    }
    .el-upload-list {
        position: absolute;
        bottom: -30px;
        left: 48px;
    }
}
</style>
