<template>
    <div class="page">
        <div class="content">
            <div class='wrap'>
                <tool-bar>
                    <div class="fl">
                        <label>企业名称：</label>
                        <el-input class="tool_ipt" v-model="companyName" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="fr">
                        <el-button class="query_btn slects_btn" @click="queryData" :disabled="!$checkAuth('bas:enterprise:evaluateApply:findEnterprise')">查询</el-button>
                        <el-button class="react_btn" @click="toReact">重置</el-button>
                    </div>
                </tool-bar>
                <div class="table_box">
                    <el-table
                        :data="dataList"
                        height="580"
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
                            {{scope.row.enterpriseBusinessCategory|filterCommon(bussinessCategory)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="roleExtEnterpriseLinkpersonIsview"
                        prop="enterpriseLinkName"
                        label="联系人"
                        >
                    </el-table-column>
                    <el-table-column
                        v-if="roleExtEnterpriseLinkpersonIsview"
                        prop="enterpriseLinkMobile"
                        label="联系电话"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseEvaluateApplyDate"
                        label="申请日期"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.enterpriseEvaluateApplyDate|formatTimeS}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="goDetail(scope.row.enterpriseEvaluateApplyId)" :disabled="!$checkAuth('bas:enterprise:evaluateApply:updateEnterpriseEvaluateApplyStatus')">详情</el-button>
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
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { filterTime } from '@/utils/filterTime.js'
import { setNum } from '@/utils/tools.js'
import { bussinessCategory } from '@/utils/type.js'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'applyAudit',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业诚信评价', path: '' }, { title: '企业参评审核', path: '' }
            ],
            bussinessCategory,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            auditStatus: '', // 审核状态
            companyName: '', // 企业名称
            currentPage: 1, // 当前页数
            input: [], // 时间
            options: [],
            value: '',
            roleExtEnterpriseLinkpersonIsview: 0,
            dataList: []
        }
    },
    created () {
        try {
            var user = JSON.parse(getCookie('user'))
            this.roleExtEnterpriseLinkpersonIsview = user.roleExtEnterpriseLinkpersonIsview
        } catch (e) {
            this.roleExtEnterpriseLinkpersonIsview = 0
        }
        this.queryData()
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        ToolBar,
        Sidebar
    },
    filters: {
        formatTimeS (val) {
            let str = new Date(val) - 0
            return filterTime('yyyy-mm-dd', str - 0)
        }
    },
    // 方法
    watch: {},
    methods: {
        queryData () {
            this.$post('bas/enterprise/evaluateApply/findEnterprise', {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                data: {
                    enterpriseName: this.companyName,
                    enterpriseEvaluateApplyAuditIs: 0
                }
            }).then(res => {
                if (res.status === 200) {
                    this.dataList = setNum(res.datas.list, this.pageNum, this.pageSize)
                    this.total = res.datas.total
                } else {
                    this.$alert(res.message, '提示')
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
        // 详情
        goDetail (id) {
            this.$router.push('/creditEva/applyAuditDetail?id=' + id)
        },
        // 重置
        toReact () {
            this.companyName = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
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
