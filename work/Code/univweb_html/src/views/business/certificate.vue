<template>
    <div class="certificate">
        <div class="content">
            <tool-bar>
                <div class="fl">
                    <label>企业名称:</label>
                    <el-input class="tool_ipt" v-model="queryName" placeholder="请输入内容"></el-input>
                    <label>合格证类型:</label>
                    <el-select v-model="enterpriseTailGasTreatmentStationIs" placeholder="请选择">
                        <el-option
                        v-for="item in certificateTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <label>发放日期:</label>
                    <el-date-picker
                        v-model="daterange"
                        type="daterange"
                        align="right"
                        class="w240"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                    </el-date-picker>
                </div>
                <div class="fr">
                    <!-- <el-button class="search_btn" type="primary" icon="el-icon-search" @click="search" :disabled="!$checkAuth('bas:enterprise:certificate:find')"></el-button>
                    <el-button icon="el-icon-add" @click="add"><img src="../../assets/images/iocn_add.png" :disabled="!$checkAuth('bas:enterprise:certificate:add')"><span>合格证发放</span></el-button> -->
                    <el-button class="query_btn slects_btn" @click="search" :disabled="!$checkAuth('bas:enterprise:certificate:find')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
                        height="600"
                        :cell-style="{'text-align':'center'}"
                        :header-cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                        <el-table-column
                            prop="num"
                            label="序号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            label="企业名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseCreditIdentifier"
                            label="社会信用代码"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseBusinessCategory"
                            label="经营类别"
                            >
                            <template slot-scope="scope">
                                {{scope.row.enterpriseBusinessCategory | filterCommon(bussinessCategory)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseTailGasTreatmentStationIs"
                            label="合格证类型"
                            >
                            <template slot-scope="scope">
                                {{scope.row.enterpriseTailGasTreatmentStationIs | filterCommon(certificateTypeList.slice(1))}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseCertificateS"
                            label="起始编号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseCertificateE"
                            label="截止编号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseCertificateE-enterpriseCertificateS"
                            label="合计份数">
                            <template slot-scope="scope">
                                {{scope.row.enterpriseCertificateE - scope.row.enterpriseCertificateS + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="剩余(份数)">
                            <template slot-scope="scope">
                                {{scope.row.enterpriseCertificateE - scope.row.enterpriseCertificateS + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="createusername"
                            label="发放人">
                        </el-table-column>
                        <el-table-column
                            width="170"
                            prop="createTime"
                            label="发放日期">
                            <template slot-scope="scope">
                                {{new Date(scope.row.createTime) | formatTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="detail"
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editModel(scope.row)" :disabled="!$checkAuth('bas:enterprise:certificate:view')">详情</el-button>
                                <!-- <el-button type="text" size="small" @click="deleteModel(scope.row)" :disabled="!$checkAuth('bas:enterprise:certificate:delete')">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="'合格证发放'"
            :width="640"
            :alert="showAdd"
            @alertCancel="closeAlert">
            <div class="alert-box">
                <div class="line">
                    <label for=""><i class="important">*&nbsp;</i>合格证类型：</label>
                    <div class="inline-input info-ipt">
                        <el-radio-group :disabled="canEdit" v-model="certificateType" @change="certificateTypeChange">
                            <el-radio label="0">维修竣工合格证</el-radio>
                            <el-radio label="1">尾气治理合格证</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="line">
                    <label for=""><i class="important">*&nbsp;</i>企业名称：</label>
                    <el-autocomplete
                        class="inline-input info-ipt"
                        v-model="companyName"
                        :disabled="canEdit"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入企业名称"
                        @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="name" v-html="item.enterpriseName.replace(companyName, `<span style=color:#ff0000>${companyName}</span>`)"></div>
                        </template>
                    </el-autocomplete>
                </div>
                <div class="line">
                    <label for="">企业备案号：</label>
                    <el-input disabled class="info-ipt" v-model="enterpriseCoding"></el-input>
                </div>
                <div class="line">
                    <label for="">经营类别：</label>
                    <el-input disabled class="info-ipt" v-model="enterpriseBusinessCategoryName"></el-input>
                </div>
                <div class="line">
                    <label for="">社会信用代码：</label>
                    <el-input disabled class="info-ipt" v-model="enterpriseCreditIdentifier"></el-input>
                </div>
                <div class="line">
                    <label for=""><i class="important">*&nbsp;</i>起始编号：</label>
                    <el-input :disabled="canEdit" class="info-ipt" type="number" v-model="startCode"></el-input>
                </div>
                <div class="line">
                    <label for=""><i class="important">*&nbsp;</i>截止编号：</label>
                    <el-input :disabled="canEdit" class="info-ipt" type="number" v-model="endCode"></el-input>
                </div>
                <div class="line">
                    <label for="">发放份数：</label>
                    <el-input disabled class="info-ipt" type="number" v-model="codeNum"></el-input>
                </div>
                <div class="btn-box">
                    <el-button type="primary" @click="sureAlert('sure')">确定</el-button>
                    <el-button @click="sureAlert('cancel')">取消</el-button>
                </div>
            </div>
        </Modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button type="primary" @click="add" :disabled="!$checkAuth('bas:enterprise:certificate:add')">合格证发放</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import ToolBar from '@/components/ToolBar.vue'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
import { bussinessCategory } from '@/utils/type.js'
import { filterTime } from '@/utils/filterTime.js'
export default {
    name: 'certificate',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '合格证发送', path: '' }
            ],
            openStatus: ['营业', '停业', '整顿', '停业整顿', '歇业', '注销', '其他'], // 经营状态
            companyTypeList: ['维修企业', '检测企业', '运输企业'],
            bussinessCategory,
            enterpriseTailGasTreatmentStationIs: '',
            certificateTypeList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '维修竣工合格证'
                },
                {
                    value: '1',
                    label: '尾气治理合格证'
                }
            ],
            openStatusList: [
                { value: 1, label: '营业' },
                { value: 2, label: '停业' },
                { value: 3, label: '整顿' },
                { value: 4, label: '停业整顿' },
                { value: 5, label: '歇业' },
                { value: 6, label: '注销' },
                { value: 9, label: '其他' }
            ],
            enterpriseCertificate: '', // 合格证编码
            enterpriseCreditIdentifier: '', // 社会信用代码
            certificateType: '0', // 合格证类型
            canEdit: false, // 是否可编辑 false==可编辑
            queryName: '', // 查询名称
            queryCode: '', // 查询许可证号
            queryType: '', // 企业类型
            daterange: '', // 时间范围
            startCode: '', // 起始编号
            endCode: '', // 结束编号
            companyInfo: '',
            enterpriseCoding: '', // 备案号
            enterpriseBusinessCategory: '', // 经营类别ID
            companyName: '', // 企业名称
            showLi: false, // 搜索列表
            showAdd: false, // 是否显示弹框
            pageSize: 10,
            pageNum: 1,
            total: 0,
            input: '',
            options: [],
            value: '',
            dataList: []
        }
    },
    filters: {
        formatTime (val) {
            return filterTime('yyyy-mm-dd hh:ff:ss', val - 0)
        }
    },
    created () {
        // this.queryData()
        // this.enterpriseTypeFind()
    },
    computed: {
        // 经营类别
        enterpriseBusinessCategoryName () {
            for (var i = 0; i < this.bussinessCategory.length; i++) {
                if (this.bussinessCategory[i].value === this.enterpriseBusinessCategory) {
                    return this.bussinessCategory[i].label
                }
            }
            return ''
        },
        // 计算发放份数
        codeNum () {
            if (this.endCode !== '' && this.startCode !== '' && this.endCode - 0 >= this.startCode - 0) {
                return this.endCode - this.startCode + 1
            } else {
                return ''
            }
        }
    },
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar,
        ToolBar,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        // 查询企业类别
        enterpriseTypeFind () {
            this.$post('/bas/enterprise/register/type/find', {})
                .then(res => {
                    if (res.status === 200) {
                        this.options = res.enterpriseTypeList
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 弹窗合格证类型改变
        certificateTypeChange () {
            this.companyName = ''
            this.companyInfo = ''
            this.enterpriseCoding = ''
            this.enterpriseCertificate = ''
            this.enterpriseBusinessCategory = ''
            this.enterpriseCreditIdentifier = ''
        },
        // 弹窗搜索企业
        querySearch (queryString, cb) {
            var obj = {
                pageSize: 10,
                data: {
                    enterpriseName: this.companyName
                }
            }
            obj.data.enterpriseTailGasTreatmentStationIs = this.certificateType
            this.$post('bas/enterprise/register/findFixEnterprise', obj).then(res => {
                if (res.status === 200) {
                    cb(res.data)
                }
            })
        },
        handleSelect (info) {
            this.fillInfo(info)
        },
        // 编辑合格证
        editModel (obj) {
            this.companyInfo = obj
            this.showAdd = true
            this.companyName = obj.enterpriseName
            this.enterpriseCoding = obj.enterpriseCoding
            this.enterpriseCreditIdentifier = obj.enterpriseCreditIdentifier
            this.endCode = obj.enterpriseCertificateE
            this.startCode = obj.enterpriseCertificateS
            this.enterpriseCertificate = obj.enterpriseCertificate
            this.enterpriseBusinessCategory = obj.enterpriseBusinessCategory
            this.certificateType = obj.enterpriseTailGasTreatmentStationIs
            this.canEdit = true
        },
        // 删除合格证
        deleteModel (obj) {
            this.$myAlert({
                title: '提示',
                msg: '确认要删除"' + obj.enterpriseName + '"吗?'
            }).then(() => {
                this.$post('bas/enterprise/certificate/delete', {
                    'data': {
                        'enterpriseCertificate': obj.enterpriseCertificate
                    }
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
                console.log('取消')
            })
        },
        // 根据名称查企业
        searchCompany () {
            this.$post('bas/enterprise/register/findenterprise', {
                'data': {
                    'enterpriseName': this.companyName,
                    'enterpriseIsAudit': 1
                }
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    this.companyList = res.data
                    console.log(this.companyList)
                    this.showLi = false
                    this.$nextTick(() => {
                        this.showLi = true
                    })
                    // this.showLi = true
                } else {
                    this.companyList = []
                    this.showLi = false
                }
                // this.$alert(res.message, '提示')
                // this.$post('bas/', {
                //     'data': {
                //         pageSize: 10,
                //         pageNum: 1
                //     }
                // }).then(res => {
                //     console.log(res)
                // }).catch(err => {
                //     console.log(err)
                // })
            }).catch(err => {
                console.log(err)
            })
        },
        // 填充企业信息
        fillInfo (info) {
            this.companyInfo = info
            this.companyName = info.enterpriseName
            this.enterpriseCoding = info.enterpriseCoding
            this.enterpriseCreditIdentifier = info.enterpriseCreditIdentifier
            this.enterpriseBusinessCategory = info.enterpriseBusinessCategory
            this.certificateType = info.enterpriseTailGasTreatmentStationIs
            this.showLi = false
        },
        // 新增合格证
        add () {
            this.showAdd = true
        },
        sureAlert (val) {
            if (val === 'sure') {
                if (!this.companyName) {
                    this.$alert('请输入企业名称', '提示')
                    return
                }
                if (!this.companyInfo) {
                    this.$alert('请选择正确的企业', '提示')
                    return
                }
                if (!this.codeNum || this.startCode - 0 <= 0) {
                    this.$alert('请填写正确的编号', '提示')
                    return
                }
                if (!this.canEdit) {
                    this.$post('bas/enterprise/certificate/add', {
                        'data': {
                            'enterpriseCertificateS': this.startCode,
                            'enterpriseCertificateE': this.endCode,
                            'enterpriseId': this.companyInfo.enterpriseId
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '添加成功'
                            })
                            this.closeAlert()
                            this.queryData()
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    // this.$post('bas/enterprise/certificate/edit', {
                    //     'data': {
                    //         'enterpriseCertificate': this.enterpriseCertificate,
                    //         'enterpriseCertificateS': this.startCode,
                    //         'enterpriseCertificateE': this.endCode,
                    //         'enterpriseId': this.companyInfo.enterpriseId
                    //     }
                    // }).then(res => {
                    //     if (res.status === 200) {
                    //         this.closeAlert()
                    //         this.queryData()
                    //     } else {
                    //         this.$alert(res.message, '提示')
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    // })
                    this.closeAlert()
                }
            } else {
                this.closeAlert()
            }
        },
        closeAlert () {
            this.companyName = ''
            this.companyInfo = ''
            this.enterpriseCoding = ''
            this.startCode = ''
            this.endCode = ''
            this.enterpriseCertificate = ''
            this.enterpriseBusinessCategory = ''
            this.enterpriseCreditIdentifier = ''
            this.certificateType = '0'
            this.canEdit = false
            this.showAdd = false
            this.showLi = false
        },
        // 查询
        search () {
            this.pageNum = 1
            this.queryData()
        },
        // 获取数据
        queryData () {
            if (!this.$checkAuth('bas:enterprise:certificate:view')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                enterpriseName: this.queryName,
                enterpriseBusinessCertificate: this.queryCode,
                startDate: this.daterange ? this.daterange[0] : '',
                endDate: this.daterange ? this.daterange[1] : ''
            }
            if (this.enterpriseTailGasTreatmentStationIs) {
                obj.enterpriseTailGasTreatmentStationIs = this.enterpriseTailGasTreatmentStationIs
            }
            this.$post('bas/enterprise/certificate/find', obj).then(res => {
                if (res.status === 200) {
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleSizeChange (val) {
            this.pageNum = val
            this.pageSize = val
            this.queryData()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.queryData()
        },
        // 重置
        toReact () {
            this.queryName = ''
            this.enterpriseTailGasTreatmentStationIs = ''
            this.daterange = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.certificate {
    .important {
        color: red;
        font-style: normal;
    }
    .search_btn {
        width: 40px;
    }
    .search-box {
        position:absolute;
        left: 165px;
        z-index: 2;
        background: #ffffff;
        border: 1px solid #dddddd;
        width: 200px;
        li {
            line-height: 30px;
            cursor: pointer;
        }
    }
    .alert-box {
        padding: 10px;
        .line {
            position: relative;
            margin-top: 20px;
            label {
                width: 100px;
                display: inline-block;
                color: #666;
                font-size: 14px;
                text-align: right;
            }
            .info-ipt {
                width: 400px;
                display: inline-block;
                text-align: left;
                label {
                    text-align: left;
                    width: auto;
                }
            }
            .btn-1 {
                position: absolute;
                position:absolute;
                border:none;
                background:#359dff;
                line-height: 34px;
                color:#ffffff;
                height:34px;
                width: 50px;
                cursor:pointer;
                left: 370px;
                border-radius: 4px;
            }
        }
        .btn-box {
            text-align: center;
            margin: 30px 0;
            button {
                width: 100px;
                height: 34px;
                border-radius: 4px;
            }
            .btn1 {
                background: #359dff;
                color: #ffffff;
                border: none;
                margin-right: 20px;
            }
            .btn2 {
                border: 1px solid #dbdbdb;
                background: #ffffff;
            }
        }
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #ffffff;
        top: 0;
        .wrap {
            padding: 0 20px;
            padding-bottom: 100px;
            .table_box {
                border: 1px solid #dddddd;
                border-bottom: none;
            }
            .page_box {
                background: #f7f8f9;
                padding-top: 10px;
                height: 53px;
                border: 1px solid #dddddd;
                border-top: none;
            }
        }
    }
}
</style>
<style lang="less">
.certificate {
    .alert-box {
        .el-input__inner {
            height:34px;
            line-height: 34px;
        }
        .el-button {
            height:34px;
            line-height: 34px;
        }
    }
}
</style>
