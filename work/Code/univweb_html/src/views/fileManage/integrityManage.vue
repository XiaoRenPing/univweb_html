<template>
    <div class="integrityManage">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'档案管理>企业诚信档案'">
                <!-- <label>姓名:</label> -->
                <!-- <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input> -->
                <label>企业名称:</label>
                <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                <label>参评年份:</label>
                <el-select v-model="year" placeholder="请选择">
                    <el-option
                    v-for="item in [2017,2018,2019,2020]"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData"></el-button>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
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
                        :show-overflow-tooltip='true'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseRegion"
                        label="所属区域"
                        >
                        <template slot-scope="scope">
                            {{scope.row.enterpriseRegion|filterRegion}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseCreditIdentifier"
                        label="社会信用代码"
                        :show-overflow-tooltip='true'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseBusinessCategory"
                        label="经营类别"
                        :show-overflow-tooltip='true'
                        >
                        <template slot-scope="scope">
                            {{scope.row.enterpriseBusinessCategory|filterCommon(bussinessCategory)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseLinkName"
                        label="企业联系人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseLinkMobile"
                        label="联系电话"
                        :show-overflow-tooltip='true'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseEvaluateCertificateCurrentyear"
                        label="评分周期"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseEvaluateCertificateTotalScore"
                        label="企业得分"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseEvaluateCertificateLevel"
                        label="评价等级"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detail(scope.row.enterpriseEvaluateApplyId)">详情</el-button>
                            <!-- <el-button type="text" size="small" @click="deleteThis(scope.row.id)">删除</el-button> -->
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20, 30]"
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
import { setNum } from '@/utils/tools.js'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import { bussinessCategory } from '@/utils/type.js'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'integrityManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            bussinessCategory,
            year: '',
            showAlert: false,
            pageSize: 10,
            pageNum: 1,
            total: 0,
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
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar,
        Modal
    },
    // 方法
    watch: {},
    methods: {
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
        detail (value) {
            this.$router.push('/integrityDetail?id=' + value)
        },
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            this.$post('bus/enterprise/evaluateCertificate/find', {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                data: {
                    enterpriseName: this.input,
                    enterpriseEvaluateCertificateCurrentyear: this.year
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
        // 删除
        deleteThis (value) {
            this.$myAlert({
                type: 'waring',
                msg: `确定要删除账号 "${name}" 吗？`
            }).then(res => {
            }).catch(err => {
                console.log(err)
            })
        },
        closeAlert () {
            this.showAlert = false
        },
        sureAlert () {
            this.showAlert = false
        },
        // 新增
        add () {
            this.showAlert = true
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.integrityManage {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
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
    .model {
        li {
            margin-top: 20px;
            text-align: left;
            label {
                float: left;
                line-height: 34px;
                text-align: right;
                width: 120px;
                span {
                    color: red;
                    margin-right: 3px;
                }
            }
            .ipt {
                width: 250px;
            }
        }
        .btn-box {
            text-align: center;
            margin: 20px 0 40px 0;
            button {
                width: 100px;
                height: 40px;
                border-radius: 4px;
                cursor: pointer;
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
                color: #666666;
            }
        }
    }
}
</style>
