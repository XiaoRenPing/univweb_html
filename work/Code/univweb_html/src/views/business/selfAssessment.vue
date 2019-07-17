<template>
    <div class="page">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'企业自评'">
                <button class="back_btn" @click="$router.push('/process')">返回</button>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="date"
                        label=序号>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="企业名称"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="检查日期"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="检查人员"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="企业评分"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="监督评分"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="审核状态"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="审核人"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="审核日期"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="goDetail(scope.row.id)">详情</el-button>
                            <el-button type="text" size="small" @click="goDetail(scope.row.id)">审核</el-button>
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
                        :total="200">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Model
            :title="modelText"
            :width="900"
            :alert="showModel"
            @alertCancel="closeAlert">
            <div class="box-inner">
                <el-table
                    :data="tableData3"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    border
                    style="width: 100%">
                <el-table-column
                    prop="date"
                    label=序号>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="检查项目"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="证明单位"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="录入时间"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="状态"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="附件"
                    width="">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goDetail(scope.row.id)">链接</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <p>
                    <span>监督审核</span>
                    <span>特别提醒：在评价过程中弄虚作假,隐瞒情况或者提供虚假情况经查证属实的,其诚信评价等级降为B级</span>
                </p>
                <div class="hdd">
                    <label for="">审核操作：</label>
                    <template>
                        <el-radio v-model="radio" label="1">备选项</el-radio>
                        <el-radio v-model="radio" label="2">备选项</el-radio>
                    </template>
                </div>
                <div class="hdd">
                    <label>备注说明：</label>
                    <el-input class="tool_ipt" type="textarea" v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="btn-box">
                    <button class="btn1" @click="sureAlert3('sure')">确定</button>
                    <button class="btn2" @click="sureAlert3('cancel')">取消</button>
                </div>
            </div>
        </Model>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Model from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'selfAssessment',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            radio: '',
            modelText: '企业自评审核',
            showModel: false,
            currentPage: 1, // 当前页数
            input: '',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            tableData3: []
        }
    },
    created () {
        this.$post('/OrderManager/getOrderDetail.action', {})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Model,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        handleSizeChange () {},
        handleCurrentChange () {},
        // 详情
        editNotice (value) {
            this.$router.push('/audit')
        },
        // 新增notice
        addNotice () {
            this.$router.push('/addNotice')
        },
        // 查看详情
        goDetail () {
            this.showModel = true
        },
        closeAlert () {
            this.showModel = false
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    // height: 100%;
    .box-inner {
        padding: 20px;
        text-align: left;
        p {
            margin-top: 10px;
            span:nth-child(1) {
                font-weight: bold;
                display: inline-block;
                width: 85px;
                text-align: right;
                margin-right: 20px;
            }
            span:nth-child(2) {
                color: red;
                font-size: 14px;
            }
        }
        .hdd {
            margin-top: 10px;
            label {
                display: inline-block;
                width: 100px;
                margin-right: 20px;
                text-align: right;
            }
            .tool_ipt {
                width: 700px;
            }
        }
        .btn-box {
            text-align: center;
            margin: 20px 0 40px 0;
            button {
                width: 100px;
                height: 40px;
                border-radius: 4px;
            }
            .btn1 {
                background: #359DFF;
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
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
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
</style>
<style lang="less">
.recording {
    .tool_ipt {
        .el-input__inner {
            height: 35px;
            line-height: 35px;
        }
    }
}
</style>
