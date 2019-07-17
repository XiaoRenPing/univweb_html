<template lang="html">
    <div class="companyData">
        <div class="content">
            <tool-bar :title="'企业数据对接统计'">
                <span slot="tips">共有企业{{recordCompany}}家,截止到目前,有{{buttCompany}}家企业完成系统对接</span>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        v-loading="loading"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center','border-color':'#dddddd',cellspacing:0}"
                        :header-row-style="{border:'1px solid red'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="index"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="region_name"
                        label="行政区域"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="recordCompany"
                        label="已备案企业数量"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="recordCompanyJoins"
                        label="已对接企业数量"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="recordCompanyPer"
                        label="已对接企业占比"
                        >
                        <template slot-scope="scope">
                             {{scope.row.recordCompanyPer + '%'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="一类维修企业"
                        >
                        <el-table-column
                            prop="company01"
                            label="企业数量"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="company01Joins"
                            label="对接企业"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        label="二类维修企业"
                        >
                        <el-table-column
                            prop="company02"
                            label="企业数量"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="company02Joins"
                            label="对接企业"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        label="三类维修企业"
                        >
                        <el-table-column
                            prop="company03"
                            label="企业数量"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="company03Joins"
                            label="对接企业"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editNotice(scope.row.region_id, scope.row.region_name)">详情</el-button>
                            <!-- <el-button type="text" size="small" @click="deleteNotice(1)">删除</el-button> -->
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'companyData',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            loading: false, // 是否显示loading
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            tableData3: [],
            recordCompany: 0, // 已备案企业数量
            buttCompany: 0 // 已对接企业数量
        }
    },
    created () {
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
        getData () {
            this.loading = true
            this.$get('bas/vehicle/count/docking_report')
                .then(res => {
                    if (res.status === 200) {
                        res.data.forEach((item, index) => {
                            let ind = index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.tableData3 = res.data
                        this.tableData3.forEach(item => {
                            this.recordCompany = this.recordCompany + (item.recordCompany - 0)
                            this.buttCompany = this.buttCompany + (item.recordCompanyJoins - 0)
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        handleSizeChange () {},
        handleCurrentChange () {},
        // 详情
        editNotice (id, name) {
            this.$router.push('/companyDataDetail?id=' + id)
        },
        // 删除
        deleteNotice (value) {
            console.log('删除')
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.companyData {
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
}
</style>
