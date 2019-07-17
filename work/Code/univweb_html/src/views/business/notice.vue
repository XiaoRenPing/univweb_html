<template>
    <div class="page">
        <div class="content">
            <tool-bar>
                <div class="fl">
                    <label>通知标题:</label>
                    <el-input class="tool_ipt" v-model="noticeTitle" placeholder="请输入内容"></el-input>
                    <label>作者:</label>
                    <el-input class="tool_ipt" v-model="noticeAuthor" placeholder="请输入内容"></el-input>
                    <label>发布日期:</label>
                    <el-date-picker
                        v-model="daterange"
                        class="w240 mgr20"
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
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('sys:notice:find')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
                <!-- <el-button class="search_btn" type="primary" icon="el-icon-search" style="width:40px;" @click="queryData(1)" :disabled="!$checkAuth('sys:notice:find')"></el-button> -->
                <!-- <el-button class="add_btn" icon="el-icon-add" @click="addNotice"><img src="../../assets/images/iocn_add.png" :disabled="!$checkAuth('sys:notice:add')"><span>新增通知</span></el-button> -->
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
                            prop="noticeTitle"
                            label="通知标题"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="发布时间"
                            >
                            <template slot-scope="scope">
                                {{scope.row.noticePublishTime|filterTime('yyyy-mm-dd hh:ff:ss')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="noticeUser"
                            label="作者"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="createUser"
                            label="审核状态"
                            >
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.noticeStatus|statusFilter}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="noticeAuditName"
                            label="审核人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="noticeStatusBak"
                            label="备注说明"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作"
                            width="">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" v-if="scope.row.noticeStatus===0" size="small" @click="editNotice(scope.row.noticeId,2)" :disabled="!$checkAuth('sys:notice:audit')">审核</el-button>
                                    <!-- <el-button type="text" size="small" @click="goDetail(scope.row.noticeId)">详情</el-button> -->
                                    <el-button type="text" size="small" @click="editNotice(scope.row.noticeId,1)" :disabled="!$checkAuth('sys:notice:edit')">编辑</el-button>
                                    <el-button type="text" v-if="scope.row.noticeStatus!==1" size="small" @click="deleteNotice(scope.row)" :disabled="!$checkAuth('sys:notice:delete')">删除</el-button>
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
            <el-button type="primary" @click="addNotice" :disabled="!$checkAuth('sys:notice:add')">新增通知</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'notice',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '行业通知发布', path: '' }
            ],
            noticeStatus: '', // 审核状态 0-未审核  1-通过 -1-拒绝
            total: 0,
            pageNum: 1,
            pageSize: 10,
            noticeTitle: '',
            noticeAuthor: '',
            daterange: '',
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            dataList: []
        }
    },
    created () {
        this.queryData()
    },
    computed: {},
    filters: {
        statusFilter: function (val) {
            if (val === 1) {
                return '审核通过'
            }
            if (val === 0) {
                return '待审核'
            }
            if (val === -1) {
                return '审核拒绝'
            }
        }
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
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('sys:notice:find')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('sys/notice/find', {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize,
                'startTime': this.daterange ? this.daterange[0] : '',
                'endTime': this.daterange ? this.daterange[1] : '',
                'data': {
                    'noticeTitle': this.noticeTitle,
                    'noticeUser': this.noticeAuthor,
                    'noticeSite': '',
                    'noticeStatus': ''
                }
            }).then(res => {
                if (res.status === 200) {
                    this.dataList = res.data.list
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
            this.$router.push('/checkNotice?noticeId=' + value)
        },
        // 编辑
        editNotice (value, type) {
            this.$router.push(`/addNotice?noticeId=${value}&type=${type}`)
        },
        // 删除
        deleteNotice (value) {
            this.$myAlert({
                title: '提示',
                msg: '确认要删除"' + value.noticeTitle + '"吗?'
            }).then(res => {
                this.$post('sys/notice/delete', {
                    'data': {
                        'noticeId': value.noticeId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.queryData()
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
                console.log('取消删除')
            })
        },
        // 新增notice
        addNotice () {
            this.$router.push('/addNotice')
        },
        // 重置
        toReact () {
            this.noticeTitle = ''
            this.noticeAuthor = ''
            this.daterange = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    position: relative;
    .add_btn {
        img {
            margin-right: 8px;
        }
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        background-color: #ffffff;
        .page_top {
            height: 66px;
            line-height: 66px;
            padding: 0 20px;
            font-size: 14px;
            overflow: hidden;
        }
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
