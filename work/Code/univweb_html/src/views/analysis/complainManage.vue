<!-- 维修服务评价查询 -->
<template>
    <div class="complainManage">
        <div class="content">
            <div class="clearfix table_top search_top">
                <div class="table_top_l clearfix" :class="{'arrow-active': ArrowActive}">
                    <div class="table_top_ls">
                        <label>企业名称：</label>
                        <el-input class="tool_ipt" v-model="enterpriseName" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="table_top_ls">
                        <label>车牌号码：</label>
                        <el-input class="tool_ipt" v-model="vehicleLicensePlate" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="table_top_ls" v-if="ArrowActive">
                        <label>评价等级：</label>
                        <el-select class="tool_ipt" v-model="commentLevel" clearable placeholder="请选择">
                            <el-option
                            v-for="item in evaluateLevel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="table_top_ls" v-if="ArrowActive">
                        <label>评价日期：</label>
                        <el-date-picker
                            class=""
                            v-model="commentDate"
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
                        <el-button class="query_btn slects_btn" @click="findcomment(1)">查询</el-button>
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
                        prop="ownerPersonName"
                        label="车主名称"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.ownerPersonName || scope.row.ownerNickName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="vehicleTelphone"
                        label="手机号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="vehicleLicensePlate"
                        label="车牌号码"
                        >
                    </el-table-column>
                    <!-- <el-table-column
                        prop="vehicleFixDate"
                        label="送修日期"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.vehicleFixDate}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="vehicleFixDate"
                        label="送修日期">
                    </el-table-column>
                    <el-table-column
                        prop="grade"
                        label="评价等级"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.grade | filterCommon(evaluateLevel)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="评价日期"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | filterTime('yyyy-mm-dd')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseName"
                        label="企业名称"
                        >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editDetail(scope.row)">详情</el-button>
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
        <bread-foot :breadArr="breadArr" icons="icon-analy-normal">
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
import { evaluateLevel } from '@/utils/type.js'
export default {
    name: 'complainManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '查询统计', path: '' }, { title: '服务评价查询', path: '' }
            ],
            ArrowActive: true, // 展开
            enterpriseName: '',
            commentLevel: '',
            commentDate: [],
            evaluateLevel,
            vehicleLicensePlate: '',
            pageSize: 10,
            pageNum: 1,
            total: 0,
            tableData3: []
        }
    },
    created () {
        this.findcomment()
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
        findcomment (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                vehicleLicensePlate: this.vehicleLicensePlate,
                commentLevel: this.commentLevel,
                enterpriseName: this.enterpriseName
            }
            if (this.commentDate && this.commentDate.length) {
                obj.commentStartDate = this.commentDate[0]
                obj.commentEndDate = this.commentDate[1]
            }
            this.$post('/fix/comment/find', obj)
                .then(res => {
                    if (res.status === 200) {
                        this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                        this.total = res.data.total
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$alert('网络错误，请重试！', '提示')
                })
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.findcomment()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.findcomment()
        },
        // 编辑s
        editDetail (item) {
            this.$router.push('/complainDetail?id=' + item.vehicleFixCommentId + '&fixId=' + item.vehicleFixId)
        },
        // 重置
        toReact () {
            this.enterpriseName = ''
            this.vehicleLicensePlate = ''
            this.commentLevel = ''
            this.commentDate = ''
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
.complainManage {
    background: #FFF;
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        .search_top {
            padding: 25px 20px;
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
