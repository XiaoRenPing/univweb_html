<!-- 部门管理 -->
<template>
    <div class="departmentManager">
        <div class="content">
            <tool-bar :title="'系统管理>部门管理'">
                <!-- <label>部门名称:</label>
                <el-input class="tool_ipt" v-model="departmentName" placeholder="请输入部门名称" ></el-input>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData(1)" :disabled="!$checkAuth('sys:department:find')"></el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="openAddDep" :disabled="!$checkAuth('sys:department:add')">
                    <img src="../../assets/images/iocn_add.png" alt="">
                    <span>添加部门</span>
                </el-button> -->
                <div class="fl">
                    <label>部门名称：</label>
                    <el-input class="tool_ipt" v-model="departmentName" placeholder="请输入部门名称" ></el-input>
                </div>
                <div class="fr">
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('sys:department:find')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class="wrap table_box">
                <el-table
                    :data="tableData3"
                    height="600"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="departmentName"
                    label="部门名称">
                </el-table-column>
                <el-table-column
                    prop="regionName"
                    label="所属地区">
                </el-table-column>
                <el-table-column
                    prop="departmentMaster"
                    label="部门负责人">
                </el-table-column>
                <el-table-column
                    prop="departmentPhone"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作">
                     <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goDetail(scope.row.departmentId)" :disabled="!$checkAuth('sys:department:view')">详情</el-button>
                        <el-button type="text" size="small" @click="deleteUser(scope.row)" :disabled="!$checkAuth('sys:department:delete')">删除</el-button>
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
        <modal :title="departmentId ? '编辑部门' : '添加部门'"
            :alert="addAlert"
            :width="500"
            :height="458"
            @alertCancel="alertCancel">
            <div class="add-dep">
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;部门名称：
                    </div>
                    <div class="msg">
                        <el-input v-model="alertDepartmentName" maxlength="20" type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;所属地区：
                    </div>
                    <div class="msg">
                        <el-select v-model="region" placeholder="请选择">
                            <el-option
                            v-for="item in regionList"
                            :key="item.regionId"
                            :label="item.regionName"
                            :value="item.regionId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        部门负责人：
                    </div>
                    <div class="msg">
                        <el-input v-model="departmentMaster" maxlength="20" type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        联系电话：
                    </div>
                    <div class="msg">
                        <el-input v-model="departmentPhone" maxlength="11" type="text"></el-input>
                    </div>
                </div>
                <div class="item textarea">
                    <div class="title">
                        备注说明：
                    </div>
                    <div class="msg">
                        <el-input type="textarea" v-model="remark" maxlength="50" :rows="3" resize="none"></el-input>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="addDepartment">确定</el-button>
                    <el-button @click="alertCancel">取消</el-button>
                </div>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="openAddDep" :disabled="!$checkAuth('sys:department:add')">添加部门</el-button>
        </bread-foot>
    </div>
</template>

<script>
// import Header from '@/components/Header.vue'
import BreadFoot from '@/components/BreadFoot.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'departmentManager',
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '权限管理', path: '' }, { title: '部门管理', path: '' }
            ],
            addAlert: false,
            remark: '',
            departmentPhone: '',
            alertDepartmentName: '',
            departmentMaster: '',
            departmentName: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            departmentId: '',
            region: '', // 区域
            regionList: [], // 区域列表
            tableData3: []
        }
    },
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    created () {
        this.queryData()
        this.getRegion()
    },
    methods: {
        // 添加部门
        addDepartment () {
            if (!this.alertDepartmentName) {
                this.$alert('请输入部门名称！', '提示')
                return
            }
            if (!this.region) {
                this.$alert('请选择所属地区！', '提示')
                return
            }
            if (this.departmentPhone && !/^1\d{10}$/.test(this.departmentPhone)) {
                this.$alert('请输入正确的手机号码！', '提示')
                return
            }
            var obj = {
                data: {
                    departmentName: this.alertDepartmentName,
                    departmentMaster: this.departmentMaster,
                    departmentPhone: this.departmentPhone,
                    regionId: this.region,
                    remark: this.remark
                }
            }
            var url, msg
            if (this.departmentId) {
                obj.data.departmentId = this.departmentId
                url = 'sys/department/edit'
                msg = '编辑成功'
            } else {
                url = 'sys/department/add'
                msg = '添加成功'
            }
            this.$post(url, obj)
                .then(res => {
                    if (res.status === 200) {
                        this.alertCancel()
                        this.$toast({
                            msg: msg
                        })
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    this.$alert('网络错误，请重试！', '提示')
                    console.log(err)
                })
        },
        // 请求列表数据
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('sys:department:find')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('sys/department/find', {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize,
                'data': {
                    'departmentName': this.departmentName
                }
            }).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取区域
        getRegion () {
            this.$post('external/city/findLoginCityRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
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
            this.alertDepartmentName = ''
            this.departmentPhone = ''
            this.departmentMaster = ''
            this.remark = ''
            this.region = ''
            this.departmentId = ''
        },
        // 编辑
        goDetail (id) {
            this.addAlert = true
            this.$post('sys/department/view', {
                data: {
                    departmentId: id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.alertDepartmentName = res.data.departmentName
                        this.departmentPhone = res.data.departmentPhone
                        this.departmentMaster = res.data.departmentMaster
                        this.remark = res.data.remark
                        this.region = res.data.regionId
                        this.departmentId = id
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 删除部门
        deleteUser (item) {
            this.$myAlert({
                type: 'waring',
                msg: `您确定要删除 "${item.departmentName}" 吗？`
            }).then(res => {
                this.$post('sys/department/delete', {
                    data: {
                        departmentId: item.departmentId
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '删除成功'
                            })
                            this.queryData()
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
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
        // 重置
        toReact () {
            this.departmentName = ''
        }
    }
}
</script>

<style lang='less' scoped>
.departmentManager {
    .content {
        position: relative;
        background: #FFF;
        .wrap {
            padding: 0 20px 100px;
        }
    }
}
.add-dep {
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
            width: 300px;
            height: 34px;
        }
        &.textarea {
            .msg {
                height: 75px;
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
.departmentManager {
    .add-dep {
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
        }
        .el-select {
            width: 100%;
        }
    }
}
</style>
