<!-- 运输车辆车技档案查询 -->
<template>
    <div class="carArchives">
        <tool-bar :title="'档案管理>运输车辆车技档案'">
            <label>车主单位:</label>
            <el-input
                :class="{w200:!smallWindow}"
                :style="{width:smallWindow?'140px!important':'200px!important'}"
                class="tool_ipt" v-model="vehicleTransportCertificateBusinessname"
                placeholder="请输入内容">
            </el-input>
            <label>VIN码:</label>
            <el-input class="tool_ipt" v-model="carVin" placeholder="请输入内容"></el-input>
            <label>车牌号:</label>
            <el-input class="tool_ipt" v-model="carNumber" placeholder="请输入内容"></el-input>
            <el-button class="search_btn" type="primary" icon="el-icon-search" @click="getVehicleInfoList(1)" :disabled="!$checkAuth('bas/vehicle/technicalRecord/findBaseVehicleTechnicalRecord')"></el-button>
            <el-button class="add_btn" icon="el-icon-add" @click="$router.push('/transportDetail')" :disabled="!$checkAuth('bas:vehicle:technicalRecord:addVehicleTechnicalRecord')">
                <img src="../../assets/images/iocn_add.png" alt="">
                <span>新增档案</span>
            </el-button>
            <upload
            class="csv-upload"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload" :disabled="!$checkAuth('bas:vehicle:technicalRecord:saveCSV')">
                <el-button class="import-btn" :disabled="!$checkAuth('bas:vehicle:technicalRecord:saveCSV')">
                    <span>档案导入</span>
                </el-button>
            </upload>
            <el-button @click="getTemplateDown" class="import-btn" :disabled="!$checkAuth('external:download:vehicleTechnologyTemplate')">
                <span >模板下载</span>
            </el-button>
        </tool-bar>
        <div class="content">
            <div class="sidebar">
                <div class="side_item" @click="select(item.vehicleTypeId)" :class="{active: item.vehicleTypeId == chooseId}" v-for="item in sideList" :key="item.vehicleTypeId">{{item.vehicleTypeName}}</div>
            </div>
            <div class="table_box">
                <el-table
                    :data="tableData3"
                    height="600"
                    v-loading="loading"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="vehicleTransportCertificateBusinessname"
                    label="车主单位">
                </el-table-column>
                <el-table-column
                    prop="vehicleTechnicalRecordLicensePlate"
                    label="车牌号码">
                </el-table-column>
                <el-table-column
                    prop="vehicleTechnicalRecordLicensePlateColor"
                    label="车牌颜色">
                    <template slot-scope="scope">
                        {{scope.row.vehicleTechnicalRecordLicensePlateColor | filterCommon(plateColor)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="vehicleTechnicalRecordVin"
                    label="VIN码">
                </el-table-column>
                <el-table-column
                    prop="vehicleTechnicalRecordTypeId"
                    label="车辆类型">
                </el-table-column>
                <!-- <el-table-column
                    prop="vehicleBrandName"
                    label="品牌">
                </el-table-column>
                <el-table-column
                    prop="vehicleModelName"
                    label="车系">
                </el-table-column> -->
                <el-table-column
                    prop="detail"
                    label="操作">
                     <template slot-scope="scope">
                        <router-link :to="'transportDetail?id=' + scope.row.vehicleTechnicalRecordId" v-if="$checkAuth('bas:vehicle:technicalRecord:editVehicleTechnicalRecord')">详情</router-link>
                    </template>
                </el-table-column>
                </el-table>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <modal
        class="import-alert"
        :width="600"
        :height="400"
        :alert="importAlert"
        @alertCancel="importAlertCancel"
        :title="'提示'">
            <div v-html="importAlertCont" class="import-alert-cont"></div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Header from '@/components/Header.vue'
import upload from '@/components/upload.vue'
import ToolBar from '@/components/ToolBar.vue'
import { plateColor } from '@/utils/type.js'
export default {
    name: 'transportArch',
    data () {
        return {
            smallWindow: false,
            templateDown: '',
            importAlert: false,
            loading: false,
            importAlertCont: '',
            sideList: [],
            carNumber: '',
            carVin: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            chooseId: '', // 选中的id
            tableData3: [],
            plateColor,
            vehicleTransportCertificateBusinessname: ''
        }
    },
    components: {
        Header,
        ToolBar,
        Modal,
        upload
    },
    created () {
        this.getVehicleType()
    },
    mounted () {
        if (document.body.clientWidth < 1450) {
            this.smallWindow = true
        } else {
            this.smallWindow = false
        }
        window.onresize = () => {
            if (document.body.clientWidth < 1450) {
                this.smallWindow = true
            } else {
                this.smallWindow = false
            }
        }
    },
    methods: {
        // 获取下载模板
        getTemplateDown () {
            window.open(window.uploadURL + 'download/vehicleTechnologyTemplate')
        },
        // 导入错误弹窗
        importAlertCancel () {
            this.importAlert = false
        },
        // 上传成功后
        uploadSuccess (data) {
            this.$post('bas/vehicle/technicalRecord/saveCSV', {
                url: data.data
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '导入成功'
                    })
                    this.getVehicleInfoList()
                } else {
                    this.importAlert = true
                    this.importAlertCont = res.message
                }
                this.loading = false
            })
        },
        // 上传之前
        beforeUpload (file) {
            const type = /.+(\.xls)|(\.xlsx)$/.test(file.name)
            const size = file.size / 1024 / 1024 < 8
            !type && this.$message.error('模板仅支持xls/xlsx格式文件！')
            !size && this.$message.error('模板大小不能超过8M！')
            type && size && (this.loading = true)
            return type && size
        },
        subimtBtn () {
        },
        // 获取车辆类型
        getVehicleType () {
            this.$post('bas/vehicle/type/list')
                .then(res => {
                    if (res.status === 200) {
                        res.data.unshift({
                            vehicleTypeId: '',
                            vehicleTypeName: '全部档案'
                        })
                        this.sideList = res.data
                        this.getVehicleInfoList()
                    }
                })
        },
        // 获取车技档案列表
        getVehicleInfoList (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                data: {
                    vehicleTechnicalRecordVin: this.carVin,
                    vehicleTechnicalRecordLicensePlate: this.carNumber,
                    vehicleTransportCertificateBusinessname: this.vehicleTransportCertificateBusinessname
                    // vehicleUse: '01'
                },
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            if (this.chooseId) {
                obj.data.vehicleTechnicalRecordTypeId = this.chooseId
            }
            this.$post('bas/vehicle/technicalRecord/findBaseVehicleTechnicalRecord', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                            this.sideList.forEach(itemC => {
                                item.vehicleTechnicalRecordTypeId === itemC.vehicleTypeId && (item.vehicleTechnicalRecordTypeId = itemC.vehicleTypeName)
                            })
                        })
                        this.tableData3 = res.data.list
                        this.total = res.data.total
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
        },
        select (id) {
            this.pageNum = 1
            this.chooseId = id
            this.getVehicleInfoList()
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getVehicleInfoList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getVehicleInfoList()
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    position: relative;
    border: 1px solid #ddd;
    .table_box {
        padding:20px;
        margin-left: 250px;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .sidebar {
        position: absolute;
        left: 0;
        top: 0;
        width: 250px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 30px;
        box-sizing: border-box;
        .side_item {
            width: 190px;
            height: 38px;
            font-size: 14px;
            color: #666666;
            border-radius: 4px;
            margin: 10px auto 0;
            line-height: 40px;
            border: 1px solid #dddddd;
            transition: all .2s;
            cursor: pointer;
            &:first-child {
                margin-top: 0;
            }
            &.active {
                background-color: #359dff;
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
.import-alert {
    .import-alert-cont {
        height: 340px;
        margin: 10px 20px;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        text-align: left;
        overflow: auto;
    }
}
</style>
