<!-- 系统参数管理 -->
<template>
    <div class="paramManage">
        <tool-bar :title="'系统管理>系统参数管理'">
            <label>参数名称：</label>
            <el-input class="tool_ipt" v-model="paramName" placeholder="请输入内容"></el-input>
            <el-button class="search_btn" @click="queryData(1)" type="primary" icon="el-icon-search"></el-button>
        </tool-bar>
        <div class="content">
            <div class="table_box">
                <el-table
                    :data="tableData3"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    width="100"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="paramName"
                    label="参数名称">
                </el-table-column>
                <el-table-column
                    prop="paramValue"
                    label="参数值">
                </el-table-column>
                <el-table-column
                    prop="paramDesc"
                    label="参数描述">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作">
                     <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editDetail(scope.row)">修改</el-button>
                    </template>
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
        <modal :title="'参数修改'" :alert="addAlert" :width="520" :height="384" @alertCancel="alertCancel">
            <div class="add-cer">
                <div class="item">
                    <div class="title">
                        参数名称：
                    </div>
                    <div class="msg">
                        <el-input disabled v-model="alertParamName" type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;参数值：
                    </div>
                    <div class="msg">
                        <el-input type="textarea" maxlength="250" v-model="alertParamValue"></el-input>
                    </div>
                </div>
                <div class="item textarea">
                    <div class="title">
                        参数描述：
                    </div>
                    <div class="msg">
                        <el-input disabled type="textarea" v-model="alertParamDesc" resize="none"></el-input>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="editParam">确定</el-button>
                    <el-button @click="alertCancel">取消</el-button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'paramManage',
    data () {
        return {
            paramName: '',
            addAlert: false,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            alertParamName: '',
            alertParamDesc: '',
            alertParamValue: '',
            tableData3: []
        }
    },
    components: {
        Header,
        ToolBar,
        Modal
    },
    created () {
        this.queryData()
    },
    methods: {
        // 编辑参数
        editParam () {
            this.$post('sys/param/edit', {
                data: {
                    paramName: this.alertParamName,
                    paramDesc: this.alertParamDesc,
                    paramValue: this.alertParamValue
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '编辑成功'
                    })
                    this.queryData()
                    this.alertCancel()
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                this.$alert('网络错误，请重试！', '提示')
                console.log(err)
            })
        },
        // 查询数据
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            this.$post('sys/param/find', {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize,
                'data': {
                    'paramName': this.paramName
                }
            }).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                this.$alert('网络错误，请重试！', '提示')
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
            this.alertParamName = ''
            this.alertParamDesc = ''
            this.alertParamValue = ''
        },
        // 编辑
        editDetail (item) {
            this.addAlert = true
            this.$post('sys/param/view', {
                data: {
                    paramName: item.paramName
                }
            }).then(res => {
                if (res.status === 200) {
                    this.alertParamName = res.data.paramName
                    this.alertParamDesc = res.data.paramDesc
                    this.alertParamValue = res.data.paramValue
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                this.$alert('网络错误，请重试！', '提示')
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
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    position: relative;
    padding: 0 20px;
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
.paramManage {
    .add-cer {
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
        }
        .el-select {
            width: 100%;
        }
        .el-textarea {
            height: 68px;
        }
        .el-textarea__inner {
            height: 100%;
            resize: none;
        }
    }
}
</style>
