<!-- 投诉价查询 -->
<template>
    <div class="accuseManage">
        <div class="content">
            <tool-bar :title="'查询统计>企业投诉查询'">
                <label>企业名称:</label>
                <el-input class="tool_ipt" v-model="enterpriseName" placeholder="请输入内容"></el-input>
                <label>处理结果:</label>
                <el-select class="tool_ipt" v-model="complainResult" clearable placeholder="请选择">
                    <el-option
                    v-for="item in complainResultList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>投诉类别:</label>
                <el-select class="tool_ipt" v-model="enterpriseComplaintCategory" clearable placeholder="请选择">
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
                    v-model="commentDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                </el-date-picker>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="findcomment(1)"></el-button>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :show-overflow-tooltip='true'
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="num"
                        width="80"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseName"
                        label="企业名称"
                        :show-overflow-tooltip='true'
                        width="280"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="ownerName"
                        label="投诉人姓名"
                        width="100"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="ownerMobile"
                        label="手机号码"
                        width="120"
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
                        prop="enterpriseComplaintCategory"
                        label="投诉类别">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.enterpriseComplaintCategory | filterCommon(complaintCategory)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseComplaintTitle"
                        label="投诉标题"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="投诉日期"
                        width="100"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | filterTime('yyyy-mm-dd')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseComplaintStatus"
                        label="投诉状态"
                        :show-overflow-tooltip='true'
                        width="80"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.enterpriseComplaintStatus | complaintFilter2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseComplaintTime"
                        label="处理日期"
                        width="100"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | filterTime('yyyy-mm-dd')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enterpriseComplaintResultStatus"
                        label="处理结果"
                        :show-overflow-tooltip='true'
                        width="80"
                        >
                        <template slot-scope="scope">
                            <span v-if="scope.row.enterpriseComplaintResultStatus!==''">{{scope.row.enterpriseComplaintResultStatus === 0 ? '未解决' : '已解决'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="80">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editDetail(scope.row.enterpriseComplaintId)">详情</el-button>
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
import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { setNum } from '@/utils/tools.js'
import { complaintCategory } from '@/utils/type.js'
export default {
    name: 'accuseManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            complainResult: '',
            complainResultList: [
                {
                    label: '未解决',
                    value: 0
                },
                {
                    label: '已解决',
                    value: 1
                }
            ],
            enterpriseName: '',
            enterpriseComplaintCategory: '',
            complaintCategory,
            commentDate: [],
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
    filters: {
        // 投诉类别过滤
        complaintFilter2 (val) {
            let complainResultList = [
                {
                    label: '未受理',
                    value: 0
                },
                {
                    label: '已受理',
                    value: 1
                },
                {
                    label: '已拒绝',
                    value: 2
                },
                {
                    label: '已回复',
                    value: 3
                },
                {
                    label: '已完成',
                    value: 4
                }
            ]
            let value2 = ''
            complainResultList.forEach(item => {
                if (item.value === val - 0) {
                    value2 = item.label
                }
            })
            return value2
        }
    },
    // 使用其它组件
    components: {
        Header,
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
                enterpriseComplaintCategory: this.enterpriseComplaintCategory,
                enterpriseComplaintResultStatus: this.complainResult,
                enterpriseComplaintStatus: '1,3,4',
                enterpriseName: this.enterpriseName
            }
            if (this.commentDate && this.commentDate.length) {
                obj.enterpriseComplaintTimeS = this.commentDate[0]
                obj.enterpriseComplaintTimeE = this.commentDate[1]
            }
            this.$post('bas/enterprise/complaint/findEnterpriseComplaint', obj)
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
        // 编辑
        editDetail (id) {
            this.$router.push('/accuseDetail?id=' + id)
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.accuseManage {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        // padding-top: 100px;
        top: 0;
        .wrap {
            top: 0;
            left: 0px;
            /*left: 250px;*/
            bottom: 0;
            right: 0;
            position: relative;
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
.accuseManage {
    .el-input--suffix {
        .el-input__inner {
            width: 140px;
        }
    }
}
</style>
