<template lang="html">
    <div class="recording">
        <div class="content">
            <tool-bar>
                <div class="fl">
                    <label>企业名称：</label>
                    <el-input class="tool_ipt" v-model="enterpriseName" placeholder="请输入内容"></el-input>
                </div>
                <div class="fr">
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('bus:enterprise:change:record:find')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
                        height="600"
                        @cell-mouse-enter="tableEnter"
                        @cell-mouse-leave="tableLeaver"
                        :row-style="{height: '40px'}"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center',height:'40px','line-height':'40px',padding:'0'}"
                        style="width: 100%">
                        <el-table-column
                            prop="num"
                            label="序号">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            label="企业名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseRegionName"
                            label="所在区域">
                            <template slot-scope="scope">
                                <span>{{scope.row.enterpriseRegionName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseTypeId"
                            label="企业类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.enterpriseTypeId === '1' ? '维修企业' : ''}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseTypeId"
                            label="变更类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.enterpriseChangeRecordType | filterCommon(changeType)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-if="roleExtEnterpriseLinkpersonIsview"
                            prop="enterpriseLinkName"
                            label="联系人">
                        </el-table-column>
                        <el-table-column
                            v-if="roleExtEnterpriseLinkpersonIsview"
                            prop="enterpriseLinkMobile"
                            label="联系电话">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseOperatingAddress"
                            label="经营地址"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="申请日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | filterTime('yyyy-mm-dd')}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" :disabled="!$checkAuth('bus:enterprise:change:record:audit')" @click="editNotice(scope.row.enterpriseEvaluateApplyId,
                                scope.row.enterpriseId, scope.row.enterpriseChangeRecordId)" class="detail" :class="{active:scope.row.select===1}">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20]"
                        :page-size="10"
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
import Sidebar from '@/components/Sidebar.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
import { changeType } from '@/utils/type.js'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'recording',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业备案审核', path: '' }
            ],
            changeType,
            total: 0,
            currentPage: 1, // 当前页数
            dataList: [], // 数据列表
            enterpriseName: '', // 企业名称
            pageNum: 1,
            pageSize: 10,
            value: '',
            roleExtEnterpriseLinkpersonIsview: 0
        }
    },
    created () {
        this.queryData()
        try {
            var user = JSON.parse(getCookie('user'))
            if (user.roleExtEnterpriseLinkpersonIsview) {
                this.roleExtEnterpriseLinkpersonIsview = 1
            }
        } catch (e) {
            this.roleExtEnterpriseLinkpersonIsview = 0
        }
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        ToolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findRegionByDomainCity', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 地区过滤
        regionToText (id) {
            for (var i = 0; i < this.regionList.length; i++) {
                if (this.regionList[i].regionId === id) {
                    return this.regionList[i].regionName
                }
            }
        },
        // 获取待审核列表
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('bus:enterprise:change:record:find')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('bus/enterprise/change/record/find', {
                data: { enterpriseChangeRecordType: 1 },
                'enterpriseName': this.enterpriseName,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        tableEnter (row) {
            row.select = 1
        },
        tableLeaver (row) {
            row.select = 0
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.queryData()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.queryData()
        },
        // 详情
        editNotice (value, value2, value3) {
            var url = '/audit?enterpriseId=' + value2
            if (value) {
                url = url + '&enterpriseEvaluateApplyId=' + value
            }
            this.$router.push(`${url}&enterpriseChangeRecordId=${value3}`)
        },
        // 新增notice
        addNotice () {
            this.$router.push('/addNotice')
        },
        // 重置
        toReact () {
            this.enterpriseName = ''
        }
    },
    filters: {
    },
    // 生命周期函数
    beforeCreate () { },
    mounted () { }
}
</script>

<style lang="less" scoped>
.recording {
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
                cursor: pointer;
                .detail:hover {
                    color: #359dff;
                }
                .detail.active {
                    color: #359dff;
                }
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
.recording {
    .tool_ipt {
        .el-input__inner {
            height: 35px;
            line-height: 35px;
        }
    }
    .el-table {
    }
}
</style>
