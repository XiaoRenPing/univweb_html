<!-- 企业备案日志 -->
<template>
    <div class="enterpriseRecordLog">
        <div class="content">
            <div class="table_top table_top_m">
                <div class="table_top_l clearfix">
                    <div class="table_top_ls table_one_line">
                        <label>企业名称：</label>
                        <el-input class="tool_ipt" v-model="enterpriseName" placeholder="请输入操作人"></el-input>
                    </div>
                    <div class="table_top_ls table_one_line">
                        <label>操作人：</label>
                        <el-input class="tool_ipt" v-model="operator" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="table_top_ls table_one_line">
                        <label>注册时间：</label>
                        <el-date-picker
                            v-model="enterpriseRecordTime"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="table_top_lr fr table_one_line">
                        <el-button class="query_btn slects_btn" @click="queryData(1)">查询</el-button>
                        <el-button class="react_btn" @click="toReact">重置</el-button>
                    </div>
                </div>
            </div>
            <div class="table_box">
                <el-table
                    :data="tableData3"
                    height="580"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    width="100"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="enterpriseName"
                    label="注册企业名称">
                </el-table-column>
                <el-table-column
                    prop="operator"
                    label="操作人">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="注册时间">
                </el-table-column>
                </el-table>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <modal :title="'参数修改'" :alert="addAlert" :width="520" :height="350" @alertCancel="alertCancel">
            <div class="add-cer">
                <div class="item">
                    <div class="title">
                        参数名称：
                    </div>
                    <div class="msg">
                        <el-input disabled type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;参数值：
                    </div>
                    <div class="msg">
                        <el-input type="text"></el-input>
                    </div>
                </div>
                <div class="item textarea">
                    <div class="title">
                        参数描述：
                    </div>
                    <div class="msg">
                        <el-input disabled type="textarea" resize="none"></el-input>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary">确定</el-button>
                    <el-button @click="alertCancel">取消</el-button>
                </div>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
        </bread-foot>
    </div>
</template>

<script>
import BreadFoot from '@/components/BreadFoot.vue'
import Modal from '@/components/Modal.vue'
// import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'enterpriseRecordLog',
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '日志管理', path: '' }, { title: '企业备案日志', path: '' }
            ],
            enterpriseName: '', // 企业名称
            operator: '', // 操作人
            enterpriseRecordTime: [],
            addAlert: false,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData3: []
        }
    },
    components: {
        BreadFoot,
        Modal
    },
    created () {
        this.queryData()
    },
    methods: {
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                operator: this.operator,
                enterpriseName: this.enterpriseName
            }
            if (this.enterpriseRecordTime && this.enterpriseRecordTime.length) {
                obj.startTime = this.enterpriseRecordTime[0]
                obj.endTime = this.enterpriseRecordTime[1]
            }
            this.$post('log/data/upload/enterpriserecordlog', obj)
                .then(res => {
                    if (res.status === 200) {
                        this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                        this.total = res.data.total
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 打开添加弹窗
        openAddDep () {
            this.addAlert = true
        },
        // 关闭添加弹窗
        alertCancel () {
            this.addAlert = false
        },
        // 编辑
        editDetail (id) {
            this.addAlert = true
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
        // 重置
        toReact () {
            this.enterpriseName = ''
            this.operator = ''
            this.enterpriseRecordTime = ''
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    position: relative;
    padding: 0 20px;
    background: #FFF;
    padding-bottom: 100px;
}
.table_top_m {
    padding: 25px 0;
}
.table_one_line {
    width: 25%;
}
.add-cer {
    padding-top: 30px;
    padding-bottom: 10px;
    .item {
        margin-bottom: 20px;
        overflow: hidden;
        .title {
            float: left;
            width: 134px;
            line-height: 34px;
            text-align: right;
            color: #666;
            font-size: 14px;
        }
        .msg {
            margin-left: 134px;
            width: 320px;
            height: 34px;
        }
        &.textarea {
            .msg {
                height: 68px;
                .el-textarea {
                    height: 100%;
                }
            }
        }
        &:nth-last-child(2) {
            margin-bottom: 30px;
        }
    }
    .btn {
        text-align: left;
        text-indent: 134px;
    }
}
.red {
    color: #ff0000;
}
</style>
<style lang="less">
.enterpriseRecordLog {
    .add-cer {
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
        }
        .el-select {
            width: 100%;
        }
        .el-textarea__inner {
            height: 100%;
        }
    }
    .el-date-editor {
        overflow: hidden;
    }
    .el-date-editor .el-range-input {
        width: 30%;
    }
}
</style>
