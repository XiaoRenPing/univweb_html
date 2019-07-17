<!-- 新增档案详情 -->
<template>
    <div class="newCarArchives">
        <!-- <tool-bar>
            <el-button icon="el-icon-tickets" type="primary" @click="vehicleUpdate">保存</el-button>
            <button class="back_btn" @click="goBack">返回</button>
        </tool-bar> -->
        <div class="content">
            <div class="table_box">
                <div class="car-info clearfix">
                    <div class="left">
                        <div class="info-msg">
                            <div class="title"><span class="red">* </span>车牌号码：</div>
                            <el-input v-model="carInfo.vehicleNo"></el-input>
                        </div>
                        <div class="info-msg">
                            <div class="title"><span class="red">* </span>VIN码：</div>
                            <el-input maxlength="17" v-model="carInfo.vin"></el-input>
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
                                :key="item.vehicleTypeName"
                                :label="item.vehicleTypeName"
                                :value="item.vehicleTypeId">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="info-msg">
                            <div class="title"><span class="red">* </span>使用性质：</div>
                            <el-input
                            value="非营运"
                            :disabled="true">
                            </el-input>
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
                                :key="item.vehicleTypeName"
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
                            <el-select v-model="carInfo.vehicleBrandId" @change="getSeriesList" placeholder="请选择">
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
                            <el-select v-model="vehicleSeriesId" placeholder="请选择">
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
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="info-msg">
                            <div class="title">行驶证发证日期：</div>
                            <el-date-picker
                                v-model="carInfo.vehicleDrivingLicenseDateOfissue"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button type="primary" @click="vehicleUpdate">保存</el-button>
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script>
import { filterTime } from '@/utils/filterTime.js'
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import { plateNum } from '@/utils/cookie.js'
import { plateColor } from '@/utils/type.js'
export default {
    name: 'newCarArchives',
    data () {
        return {
            breadArr: [
                { title: '档案管理', path: '' }, { title: '车辆档案', path: '/carArchives' }, { title: '新增车辆档案', path: '' }
            ],
            uploadURL: window.uploadURL,
            fileList: [],
            carNumber: '',
            carInfo: {
                typeName: '',
                vehicleBrand: '',
                vehicleDrivingLicenseDateOfissue: new Date('1999-12-31'), // 行驶证发证日期
                vehicleDrivingRecorddate: new Date('1999-12-31'), // 行驶证登记日期
                vehicleEngineNumber: '', // 发动机号码
                vehicleFuelCategory: '', // 燃油类别
                vehicleLicensePlateColor: '',
                vehicleId: '',
                vehicleModel: '',
                vehicleNo: '',
                vehicleOwner: '',
                vin: '',
                typeId: '',
                vehicleUse: '02'
            },
            vehiclePicUrl: '',
            sideList: [
                '全部档案',
                '小型车',
                '大中型客车',
                '大型货车',
                '其他'
            ],
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
            changeRecord: [], // 部件更换记录
            chooseId: 0, // 选中的id
            vehicleSave: false,
            vehicleSeriesId: '' // 车系ID
        }
    },
    components: {
        BreadFoot,
        ToolBar
    },
    created () {
        this.getVehicleType()
        this.getVehicleVrand()
        this.getVehicleCategory()
    },
    methods: {
        // 获取车系列表
        getSeriesList () {
            this.vehicleSeriesId = ''
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
        uploadSuccess (res) {
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
        getVehicleModelType () {
            this.$get('bas/vehicle/model/list')
                .then(res => {
                    if (res.status === 200) {
                        this.carModelList = res.data
                    }
                })
        },
        goBack () {
            this.$myAlert({
                title: '提示',
                msg: '返回后数据将不会保存，是否继续？'
            }).then(() => {
                this.$router.push('/carArchives')
            }).catch(() => {
            })
        },
        // 保存信息
        vehicleUpdate () {
            if (!plateNum(this.carInfo.vehicleNo)) {
                this.$alert('请输入正确的车牌号码！', '提示')
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
            if (!this.vehicleSeriesId) {
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
                vehicleDrivingRecorddate: this.carInfo.vehicleDrivingRecorddate ? filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingRecorddate - 0) : null,
                vehicleEngineNumber: this.carInfo.vehicleEngineNumber,
                vehicleFuelCategory: this.carInfo.vehicleFuelCategory,
                vehicleSeriesId: this.vehicleSeriesId,
                vehiclePicUrl: this.vehiclePicUrl,
                vehicleLicensePlateColor: this.carInfo.vehicleLicensePlateColor,
                // vehicleIsType: '1', // 1为车辆档案 2为车技档案
                vin: this.carInfo.vin,
                vehicleDrivingLicenseDateOfissue: this.carInfo.vehicleDrivingLicenseDateOfissue ? filterTime('yyyy-mm-dd', this.carInfo.vehicleDrivingLicenseDateOfissue - 0) : null,
                vehicleUse: this.carInfo.vehicleUse
            }
            if (this.vehicleSave) {
                return
            }
            this.vehicleSave = true
            console.log(obj)
            this.$post('bas/vehicle/add', obj)
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
                    this.vehicleSave = false
                })
                .catch(err => {
                    console.log(err)
                    this.$alert('网络错误，请重试！', '提示', {
                        confirmButtonText: '确定'
                    })
                    this.vehicleSave = false
                })
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
                        res.data.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.changeRecord = res.data
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
                        res.data.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.repairRecord = res.data
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
.toolBar {
    height: 73px;
    line-height: 73px;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    label {
        margin: 10px;
    }
    .tool_ipt {
        width: 140px;
    }
    .tool_select {
        width: 140px;
    }
    h3 {
        float: left;
        color: #359dff;
        font-size: 15px;
        position: relative;
        .h3_line {
            width: 4px;
            height: 15px;
            background: #359dff;
            margin-right: 5px;
            position: absolute;
            left: 0px;
            top: 29px;
        }
        .title {
            margin-left: 10px;
        }
    }
    .right_bar {
        float: right;
    }
    .search_btn {
        margin-left: 10px;
    }
}
.content {
    .table_box {
        height: 800px;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .car-info {
        padding-top: 50px;
        .left {
            width: 50%;
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
                    color: #666;
                }
            }
        }
        .right {
            width: 50%;
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
                    color: #666;
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
        }
    }
}
.red {
    color: #ff0000;
}
</style>
<style lang="less">
.newCarArchives {
    background-color: #fff;
    .el-tabs--border-card{
        border: none;
        box-shadow: none;
        width: 100%;
    }
    .el-tabs__header{
        background-color: #fff;
    }
    .car-info .el-input {
        width: 345px !important;
    }
    .car-info .el-input__inner {
        height: 34px;
    }
    .el-table .blue {
        background: #F0F5F8;
    }
    .upload-demo {
        width: 100%;
        height: 100%;
        text-indent: 0;
        position: relative;
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
