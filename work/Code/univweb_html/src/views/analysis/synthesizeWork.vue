<template>
    <div class="synthesizeWork">
        <div class="content">
            <div class="table_top table_tap_pad">
                <div class="table_top_l clearfix" :class="{'arrow-active': ArrowActive}">
                    <div class="table_top_ls">
                        <label>企业名称：</label>
                        <el-input class="tool_ipt" v-model="pname" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="table_top_ls">
                        <label>所在区域：</label>
                        <el-select v-model="region"  class="tool_ipt_small" placeholder="请选择" clearable>
                            <el-option
                            v-for="item in regionList"
                            :key="item.regionId"
                            :label="item.regionName"
                            :value="item.regionId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="table_top_ls" v-if="ArrowActive">
                        <label>车牌号码：</label>
                        <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="table_top_ls" v-if="ArrowActive">
                        <label>上传日期：</label>
                        <el-date-picker
                            v-model="daterange"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            >
                        </el-date-picker>
                    </div>
                    <div class="table_top_lr fr">
                        <el-button type="text" v-if="ArrowActive" @click="toArrowActive">收起 <i class="el-icon-arrow-up"></i></el-button>
                        <el-button type="text" v-if="!ArrowActive" @click="toArrowActive">展开 <i class="el-icon-arrow-down"></i></el-button>
                        <el-button class="query_btn slects_btn" @click="queryData(1)">查询</el-button>
                        <el-button class="react_btn" @click="toReact">重置</el-button>
                    </div>
                </div>
            </div>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        height="600"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="num"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="dsname"
                        label="企业名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="dsid"
                        label="所属区域"
                        >
                        <template slot-scope="scope">
                            {{scope.row.dsid|filterRegionS}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="vehicleno"
                        label="车辆号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="platecolor"
                        label="车辆颜色"
                        >
                        <template slot-scope="scope">
                            {{scope.row.platecolor|filterCommon(plateColor)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="上传日期"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime|filterTime('yyyy-mm-dd')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="检测类别"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.detecttype|typeFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detectsn"
                        label="验证码"
                        >
                    </el-table-column>
                    <!-- <el-table-column
                        prop="1"
                        label="检测次数"
                        >
                        <template slot-scope="scope">
                            <span :class="scope.row.enterpriseId">1</span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="client"
                        label="业户名称"
                        >
                    </el-table-column> -->
                    <el-table-column
                        prop="name"
                        width=""
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="$router.push('/synthesizeWorkDetail?id='+scope.row.detectsn)">详情</el-button>
                            <!-- <el-button type="text" size="small" @click="getReport1(scope.row.detectsn)">人工检验记录单</el-button>
                            <el-button type="text" size="small" @click="getReport2(scope.row.detectsn)">性能检验记录单</el-button>
                            <el-button type="text" size="small" @click="getReport3(scope.row.detectsn)">综合性能检验报告单</el-button> -->
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
        <pdf-view
            :title="'预览'"
            :url="pdfUrl"
            @alertCancel="pdfCancel"
            :width="pdfWidth"
            :height="pdfHeight"
            :alert="pdfShow">
        </pdf-view>
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { setNum } from '@/utils/tools.js'
import { plateColor } from '@/utils/type.js'
import PdfView from '@/components/PdfView.vue'

export default {
    name: 'synthesizeWork',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '检测记录查询', path: '' }
            ],
            ArrowActive: true, // 展开
            pname: '',
            regionList: [],
            region: '',
            pdfShow: false,
            pdfUrl: window.uploadURL + 'report/inspect/findInspect4', // pdf预览地址
            plateColor,
            total: 0,
            pageNum: 1,
            pageSize: 10,
            daterange: [],
            currentPage: 1, // 当前页数
            input: '',
            value: '',
            tableData3: []
        }
    },
    created () {
        this.queryData()
        this.getRegion()
    },
    computed: {
        pdfWidth () {
            return document.body.clientWidth > 800 ? document.body.clientWidth * 0.8 : 800
        },
        pdfHeight () {
            return document.body.clientHeight > 600 ? document.body.clientHeight * 0.8 : 600
        }
    },
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar,
        ToolBar,
        PdfView
    },
    filters: {
        typeFilter (val) {
            if (val === 1) {
                return '技术等级评定'
            } else if (val === 4) {
                return '二级维护竣工质量检验'
            } else if (val === 5) {
                return '汽车大修竣工质量检验'
            } else if (val === 9) {
                return '其他检测'
            }
        },
        filterRegionS (val) {
            let id = val
            let name = '--'
            if (id) {
                id = id.slice(0, 6)
                JSON.parse(localStorage.regionList).forEach(e => {
                    if (e.regionId === id) {
                        name = e.regionName
                    }
                })
            }
            return name
        }
    },
    // 方法
    watch: {},
    methods: {
        getRegion () {
            this.$post('bas/city/findRegionByDomainCity', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                    }
                })
        },
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
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.queryData()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.queryData()
        },
        // 编辑
        editNotice (value) {
            this.$router.push('/checkNotice')
        },
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            this.$post('jc/detect/find', {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                vehicleNo: this.input,
                dsName: this.pname,
                regionId: this.region,
                startTime: this.daterange && this.daterange.length ? this.daterange[0] : '',
                endTime: this.daterange && this.daterange.length ? this.daterange[1] : ''
            }).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
                this.$alert('请求失败', '提示')
            })
        },
        // 重置
        toReact () {
            this.pname = ''
            this.region = ''
            this.input = ''
            this.daterange = ''
        },
        // 展开 收缩
        toArrowActive () {
            this.ArrowActive = !this.ArrowActive
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.synthesizeWork {
    background: #FFFFFF;
    padding-bottom: 100px;
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        .table_tap_pad {
            padding: 25px 30px;
        }
        .wrap {
            padding: 0 30px;
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
