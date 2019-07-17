<!-- 投诉申请受理 -->
<template>
    <div class="complain-apply">
        <div class="content">
            <tool-bar>
                <div class="fl">
                    <label>企业名称:</label>
                    <el-input class="tool_ipt" v-model="enterpriseName" placeholder="请输入内容"></el-input>
                    <label>投诉类别:</label>
                    <el-select class="tool_ipt" v-model="enterpriseComplaintCategory" placeholder="请选择">
                        <el-option
                        v-for="item in complaintCategory"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <label>投诉日期:</label>
                    <el-date-picker
                        class="w240"
                        v-model="daterange"
                        type="daterange"
                        align="right"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                    </el-date-picker>
                </div>
                <div class="fr">
                    <!-- <el-button class="search_btn" type="primary" icon="el-icon-search" style="width:40px;" @click="queryData(1)" :disabled="!$checkAuth('bas:enterprise:complaint:findEnterpriseComplaint')"></el-button> -->
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('bas:enterprise:complaint:findEnterpriseComplaint')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
                        height="600"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                        <el-table-column
                            prop="num"
                            width="50"
                            label="序号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            label="投诉企业名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseLinkMobile"
                            label="企业联系电话"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="ownerName"
                            label="投诉人姓名"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="ownerMobile"
                            label="手机号码"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="noticeAuditName"
                            label="投诉类别"
                            >
                            <template slot-scope="scope">
                                <span v-for="(type,index) in scope.row.typeList" :key="index">
                                    {{type | filterCommon(complaintCategory)}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseComplaintTitle"
                            label="投诉标题"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseComplaintTime"
                            label="投诉日期"
                            >
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.enterpriseComplaintTime|filterTime('yyyy-mm-dd')}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作"
                            width="">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" size="small" @click="goDetail(scope.row.enterpriseComplaintId)" :disabled="!$checkAuth('bas:enterprise:complaint:findEnterpriseComplaintById')">详情</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <!-- <el-button type="primary" @click="addNotice" :disabled="!$checkAuth('sys:notice:add')">新增通知</el-button> -->
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
import { complaintCategory } from '@/utils/type.js'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'complainApply',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '服务投诉处理', path: '' }
            ],
            noticeStatus: '', // 审核状态 0-未审核  1-通过 -1-拒绝
            total: 0,
            pageNum: 1,
            pageSize: 10,
            enterpriseName: '',
            enterpriseComplaintCategory: '',
            daterange: [],
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            dataList: [],
            complaintCategory
        }
    },
    created () {
        this.queryData()
    },
    computed: {},
    filters: {
    },
    // 使用其它组件
    components: {
        BreadFoot,
        ToolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        queryData (clear) {
            if (!this.$checkAuth('bas:enterprise:complaint:findEnterpriseComplaint')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                enterpriseComplaintStatus: 0
            }
            this.enterpriseName && (obj.enterpriseName = this.enterpriseName)
            this.enterpriseComplaintCategory && (obj.enterpriseComplaintCategory = this.enterpriseComplaintCategory)
            if (this.daterange && this.daterange.length) {
                obj.enterpriseComplaintTimeS = this.daterange[0]
                obj.enterpriseComplaintTimeE = this.daterange[1]
            }
            this.$post('bas/enterprise/complaint/findEnterpriseComplaint', obj).then(res => {
                if (res.status === 200) {
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.dataList.forEach(e => {
                        e.typeList = e.enterpriseComplaintCategory.split(',')
                    })
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
            })
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
        // 查看
        goDetail (value) {
            this.$router.push('/complainApplyDetail?id=' + value)
        },
        // 重置
        toReact () {
            this.enterpriseName = ''
            this.enterpriseComplaintCategory = ''
            this.daterange = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.complain-apply {
    .add_btn {
        img {
            vertical-align: baseline;
            margin-right: 8px;
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
