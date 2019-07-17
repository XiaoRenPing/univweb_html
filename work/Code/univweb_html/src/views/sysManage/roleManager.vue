<!-- 角色管理 -->
<template>
    <div class="page">
        <div class="content">
            <tool-bar>
                <!-- <label>角色名称:</label>
                <el-input class="tool_ipt" v-model="personName" placeholder="请输入内容"></el-input>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData(1)" :disabled="!$checkAuth('sys:role:find')"></el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="addRole" :disabled="!$checkAuth('sys:role:add')">
                    <img src="../../assets/images/iocn_add.png" alt="">
                    <span>添加角色</span>
                </el-button> -->
                <div class="fl">
                    <label>角色名称：</label>
                    <el-input class="tool_ipt" v-model="personName" placeholder="请输入内容"></el-input>
                </div>
                <div class="fr">
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('sys:role:find')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
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
                        prop="roleName"
                        label="角色名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="departmentName"
                        label="所属部门"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="角色描述"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        >
                        <template slot-scope="scope">
                            {{scope.row.createTime|filterTime('yyyy-mm-dd')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="goDetail(scope.row.roleId)" :disabled="!$checkAuth('sys:role:view')">详情</el-button>
                            <el-button type="text" size="small" @click="deleteUser(scope.row)" :disabled="!$checkAuth('sys:role:delete')">删除</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="addRole" :disabled="!$checkAuth('sys:role:add')">添加角色</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import { setNum } from '@/utils/tools.js'
import toolBar from '@/components/ToolBar.vue'
export default {
    name: 'roleManager',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '权限管理', path: '' }, { title: '角色管理', path: '' }
            ],
            personName: '',
            input: '',
            value: '',
            pageSize: 10,
            pageNum: 1,
            total: 0,
            dataList: []
        }
    },
    created () {
        this.queryData()
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        toolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('sys:role:find')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('sys/role/find', {
                'data': {
                    'roleName': this.personName
                },
                'pageSize': this.pageSize,
                'pageNum': this.pageNum
            }).then(res => {
                if (res.status === 200) {
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 添加角色
        addRole () {
            this.$router.push('/permissionEva/roleDetail')
        },
        // 删除角色
        deleteUser (item) {
            this.$myAlert({
                type: 'waring',
                msg: `确定要删除角色 "${item.roleName}" 吗？`
            }).then(res => {
                this.$post('sys/role/delete', {
                    data: {
                        roleId: item.roleId
                    }
                }).then(res => {
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
        // 编辑
        goDetail (id) {
            this.$router.push('/permissionEva/roleDetail?id=' + id)
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
        toReact () {
            this.personName = ''
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background: #FFF;
        top: 0;
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
