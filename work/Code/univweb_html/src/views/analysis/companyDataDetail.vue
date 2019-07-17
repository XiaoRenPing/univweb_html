<template lang="html">
    <div class="companyDataDetail">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'企业数据对接详情'">
                <span slot="tips">{{regionName}}共有企业{{recordCompany}}家,截至到目前,有{{buttCompany}}家企业完成系统对接</span>
                <div class="right_bar">
                    <label>维修企业名称:</label>
                    <el-input class="tool_ipt" v-model="companyName" placeholder="请输入内容"></el-input>
                    <label>是否完成系统对接:</label>
                    <el-select class="tool_select" v-model="hasJoin" placeholder="请选择">
                        <el-option
                            v-for="item in hasJoinList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <label>经营类别:</label>
                    <el-select class="tool_select" v-model="category" placeholder="请选择">
                        <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button class="search_btn" type="primary" icon="el-icon-search" @click="getData(1)"></el-button>
                    <!-- <el-button class="back_btn" icon="el-icon-add" @click="addNotice">返回</el-button> -->
                    <button class="back_btn2" @click="addNotice" style="margin-left:10px;">返回</button>
                </div>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        v-loading="loading"
                        height="600"
                        @sort-change="sortChange"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="index"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterprise_name"
                        label="维修企业名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="categoryStr"
                        label="经营类别"
                        >
                    </el-table-column>
                    <el-table-column
                        v-if="roleExtEnterpriseOwnerIsview"
                        prop="superintendentName"
                        label="企业负责人姓名"
                        >
                    </el-table-column>
                    <el-table-column
                        v-if="roleExtEnterpriseOwnerIsview"
                        prop="superintendentTel"
                        label="企业负责人联系方式"
                        width="180"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="经营地址"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="hasJoin"
                        label="是否完成系统对接"
                        >
                        <template slot-scope="scope">
                            <span :class="{red:scope.row.hasJoin === '否'}">{{scope.row.hasJoin}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="weekJoins"
                        label="已上传数据量(7日内)"
                        width="180"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                        prop="hasJoins"
                        label="已上传数据量(总数)"
                        width="180"
                        sortable
                        >
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
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'companyDataDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            loading: false, // 是否显示loading
            total: 0,
            currentPage: 1, // 当前页数
            pageSize: 10,
            pageNum: 1,
            companyName: '',
            categoryList: [
                {
                    id: '',
                    name: '全部'
                },
                {
                    id: '01',
                    name: '一类维修经营业务'
                },
                {
                    id: '02',
                    name: '二类维修经营业务'
                },
                {
                    id: '03',
                    name: '三类维修经营业务'
                }
            ],
            hasJoinList: [
                {
                    id: '',
                    name: '全部'
                },
                {
                    id: '是',
                    name: '是'
                },
                {
                    id: '否',
                    name: '否'
                }
            ],
            category: '',
            tableData3: [],
            hasJoin: '',
            regionName: '', // 区域名称
            recordCompany: 0, // 已备案企业数
            buttCompany: 0, // 已对接企业数量
            sortjoin: '',
            roleExtEnterpriseOwnerIsview: 0,
            sortweek: ''
        }
    },
    created () {
        try {
            var user = JSON.parse(getCookie('user'))
            this.roleExtEnterpriseOwnerIsview = user.roleExtEnterpriseOwnerIsview
        } catch (e) {
            this.roleExtEnterpriseOwnerIsview = 0
        }
        this.getData()
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        sortChange (column, prop, order) {
            if (column.order === 'ascending') {
                if (column.prop === 'weekJoins') {
                    this.sortweek = 'Y'
                }
                if (column.prop === 'hasJoins') {
                    this.sortjoin = 'Y'
                }
            } else {
                if (column.prop === 'weekJoins') {
                    this.sortweek = 'N'
                }
                if (column.prop === 'hasJoins') {
                    this.sortjoin = 'N'
                }
            }
            this.getData()
        },
        // 获取详情数据
        getData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                district: this.$route.query.id,
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                companyName: this.companyName,
                category: this.category,
                hasJoin: this.hasJoin,
                sortjoin: this.sortjoin,
                sortweek: this.sortweek
            }
            this.loading = true
            this.$post('bas/vehicle/count/docking_detail_report', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.datas.forEach((item, index) => {
                            let ind = (this.pageSize * (this.pageNum - 1)) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                            item.category === '01' && (item.category = '一类维修企业')
                            item.category === '02' && (item.category = '二类维修企业')
                            item.category === '03' && (item.category = '三类维修企业')
                        })
                        this.tableData3 = res.datas
                        this.total = res.total
                        this.recordCompany = res.data.companyTotal
                        this.buttCompany = res.data.companyHasUploadTotal
                        this.regionName = res.data.regionName
                    } else {
                        this.$alert(res.message, '提示')
                    }
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getData()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getData()
        },
        // 编辑
        editNotice (value) {
            this.$router.push('/checkNotice')
        },
        // 删除
        deleteNotice (value) {
            console.log('删除')
        },
        // 新增notice
        addNotice () {
            this.$router.push('/companyData')
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.companyDataDetail {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        // padding-top: 100px;
        top: 0;
        .wrap {
            padding: 0 20px;
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
.red {
    color: #ff0000;
}
</style>
