<template lang="html">
    <div class="erweiWork">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'统计查询>二级维护作业查询'">
                <label>车牌号码:</label>
                <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                <label>合格证:</label>
                <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                <label>维护日期:</label>
                <el-date-picker
                    v-model="input"
                    type="daterange"
                    class="w240"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                </el-date-picker>
                <el-button class="search_btn" type="primary" icon="el-icon-search"></el-button>
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
                        prop="index"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="维修企业"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="区域"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="车牌号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="车牌颜色"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="合格证"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="车牌类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="车主单位"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="维护日期"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="320">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editNotice(1)">详情</el-button>
                            <!-- <el-button type="text" size="small" @click="deleteNotice(1)">删除</el-button> -->
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
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
export default {
    name: 'erweiWork',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            currentPage: 1, // 当前页数
            input: '',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }
            ],
            value: '',
            tableData3: []
        }
    },
    created () {},
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
        handleSizeChange () {},
        handleCurrentChange () {},
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
            this.$router.push('/addNotice')
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.erweiWork {
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
            .toolBar {
                height: 74px;
                line-height: 74px;
                label {
                    margin: 10px;
                    font-size: 14px;
                }
                .tool_ipt {
                    width: 140px;
                }
                .tool_select {
                    width: 140px;
                }
                h3 {
                    float: left;
                    color: #359dff;
                    font-size: 15px;
                    .h3_line {
                        display: inline-block;
                        width: 4px;
                        height: 15px;
                        background: #359dff;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        vertical-align: middle;
                    }
                }
                .right_bar {
                    float: right;
                }
                .search_btn {
                    margin-left: 10px;
                    width: 40px;
                }
            }
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
