<!-- 角色详情 -->
<template>
    <div class="role-detail">
        <div class="content">
            <div class='wrap clearfix'>
                <div class="option">
                    <div class="item">
                        <div class="title">
                            <span class="red">*</span>&nbsp;角色名称：
                        </div>
                        <div class="msg name">
                            <el-input maxlength="20" v-model="roleName" type="text"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <span class="red">*</span>&nbsp;所属部门：
                        </div>
                        <div class="msg department clearfix">
                            <el-checkbox-group v-model="departmentCheckBox">
                                <el-checkbox
                                    :label="item.departmentId"
                                    v-for="item in departmentList"
                                    :key="item.departmentId">
                                    {{item.departmentName}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <span class="red">*</span>&nbsp;角色描述：
                        </div>
                        <div class="msg desc">
                            <el-input maxlength="50" v-model="remark" type="text"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title"></div>
                        <div class="checkbox msg">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox :label="1">是否可查看企业负责人、负责人电话</el-checkbox>
                                <el-checkbox :label="2">是否可查看企业联系人、联系人电话</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="menu">
                    <div class="left">
                        <div class="item region">
                            <div class="title">
                                <span class="red">*</span>&nbsp;区域权限：
                            </div>
                            <div class="msg">
                                <el-checkbox v-model="regionSelectAll" @change="regionSelectChange">全选</el-checkbox>
                                <el-checkbox v-model="regionExpandAll" @change="regionExpandChange">全部展开</el-checkbox>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">
                            </div>
                            <div class="msg tree">
                                <el-tree
                                    :data="regionTree"
                                    show-checkbox
                                    :default-expand-all="true"
                                    node-key="regionId"
                                    ref="regionTree"
                                    highlight-current
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="item function">
                            <div class="title">
                                <span class="red">*</span>&nbsp;功能权限：
                            </div>
                            <div class="msg">
                                <el-checkbox v-model="funSelectAll" @change="funSelectChange">全选</el-checkbox>
                                <el-checkbox v-model="funExpandAll" @change="funExpandChange">全部展开</el-checkbox>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">
                            </div>
                            <div class="msg tree">
                                <el-tree
                                    :data="roleTree"
                                    show-checkbox
                                    :default-expand-all="false"
                                    node-key="menuId"
                                    ref="roleTree"
                                    highlight-current
                                    :props="roleProps">
                                </el-tree>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="saveRole">保存</el-button>
            <el-button class="react_btn" @click="goback">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
// import ToolBar from '@/components/ToolBar.vue'
import FoldMenu from '@/components/FoldMenu.vue'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'roleDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '权限管理', path: '' }, { title: '角色管理', path: '' }
            ],
            regionSelectAll: [], // 区域全选
            regionExpandAll: [], // 区域全部展开
            funSelectAll: [], // 权限全选
            funExpandAll: [], // 权限全部展开
            checkList: [], // 是否可查看企业、负责人
            departmentCheckBox: [], // 部门多选
            departmentList: [], // 部门列表
            regionTree: [],
            roleName: '', // 角色名称
            remark: '', // 角色描述
            roleTree: [], // 功能树
            roleProps: { // 功能树参数
                children: 'children',
                id: 'menuId',
                label: 'name'
            },
            defaultProps: { // 区域树参数
                children: 'children',
                id: 'regionId',
                label: 'regionName'
            }
        }
    },
    created () {
        this.getDepartmentList()
        this.getRegion()
        this.getMenutree()
        if (this.$route.query.id) {
            this.getRoleDetail()
        }
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar,
        FoldMenu
    },
    // 方法
    watch: {},
    methods: {
        // 获取角色详情
        getRoleDetail () {
            this.$post('sys/role/view', {
                data: {
                    roleId: this.$route.query.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.roleName = res.data.roleName
                        this.remark = res.data.remark
                        res.data.roleExtEnterpriseLinkpersonIsview && this.checkList.push(2)
                        res.data.roleExtEnterpriseOwnerIsview && this.checkList.push(1)
                        this.departmentCheckBox = res.data.sysDepartmentList.map(item => {
                            return item.departmentId
                        })
                        res.data.roleExtRegionPermissions && this.$refs.regionTree.setCheckedKeys(res.data.roleExtRegionPermissions.split(','))
                        res.data.sysRoleMenuList && this.$refs.roleTree.setCheckedKeys(res.data.sysRoleMenuList.map(item => {
                            return item.menuId
                        }))
                    }
                })
        },
        // 添加角色
        saveRole () {
            if (!this.roleName) {
                this.$alert('请输入角色名称！', '提示')
                return
            }
            if (!this.departmentCheckBox.length) {
                this.$alert('请选择所属部门！', '提示')
                return
            }
            if (!this.remark) {
                this.$alert('请输入角色描述！', '提示')
                return
            }
            if (!this.$refs.regionTree.getCheckedNodes().length) {
                this.$alert('请选择区域权限！', '提示')
                return
            }
            if (!this.$refs.roleTree.getCheckedNodes().length) {
                this.$alert('请选择功能权限！', '提示')
                return
            }
            var obj = {
                isviewentlinkinfo: (this.checkList.indexOf(2) !== -1) - 0,
                isviewentownerinfo: (this.checkList.indexOf(1) !== -1) - 0,
                departmentIds: this.departmentCheckBox + '',
                data: {
                    roleName: this.roleName,
                    remark: this.remark
                }
            }
            obj.regionIds = this.$refs.regionTree.getCheckedNodes().map(item => {
                return item.regionId
            }) + ''
            obj.menuIds = this.$refs.roleTree.getCheckedNodes().map(item => {
                return item.menuId
            })
            var url = ''
            var msg = ''
            if (this.$route.query.id) {
                obj.data.roleId = this.$route.query.id
                url = 'sys/role/edit'
                msg = '编辑成功'
            } else {
                url = 'sys/role/add'
                msg = '添加成功'
            }
            this.$post(url, obj)
                .then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: msg
                        })
                        this.$router.push('/roleManager')
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    this.$alert('网络错误，请重试！', '提示')
                    console.log(err)
                })
        },
        // 过滤已被禁用的菜单
        filterMenutree (list) {
            for (var i = 0; i < list.length; i++) {
                if (!list[i].status) {
                    list.splice(i, 1)
                }
                if (list[i] && list[i].children) {
                    this.filterMenutree(list[i].children)
                }
            }
        },
        // 获取所有菜单
        getMenutree  () {
            let url = /admin/.test(JSON.parse(getCookie('user')).username) ? 'sys/menus/menutree' : 'sys/menus/loginMenu'
            this.$post(url, {})
                .then(res => {
                    if (res.status === 200) {
                        this.filterMenutree(res.data)
                        this.roleTree = res.data
                        console.log(this.roleTree)
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 获取区域
        getRegion () {
            let url = /admin/.test(JSON.parse(getCookie('user')).username) ? 'external/city/findLoginCityRegion' : 'bas/city/findLoginRegion'
            this.$post(url, {})
                .then(res => {
                    if (res.status === 200) {
                        this.$set(this.regionTree, 0, {
                            regionId: 0,
                            regionName: '行政区域',
                            children: res.datas
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 获取部门列表
        getDepartmentList () {
            this.$post('sys/department/listdepartment', {})
                .then(res => {
                    if (res.status === 200) {
                        this.departmentList = res.data
                    } else {
                        this.$alert(res.message, '标题')
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 权限全选
        funSelectChange (val) {
            if (val) {
                this.$refs.roleTree.setCheckedNodes(this.roleTree)
            } else {
                this.$refs.roleTree.setCheckedNodes([])
            }
        },
        // 权限展开
        funExpandChange (val) {
            var ary = this.$refs.roleTree.store._getAllNodes() || []
            ary.length && ary.forEach(item => {
                item.expanded = val
            })
        },
        // 区域全选
        regionSelectChange (val) {
            if (val) {
                this.$refs.regionTree.setCheckedNodes(this.regionTree)
            } else {
                this.$refs.regionTree.setCheckedNodes([])
            }
        },
        // 区域全部展开
        regionExpandChange (val) {
            var ary = this.$refs.regionTree.store._getAllNodes() || []
            ary.length && ary.forEach(item => {
                item.expanded = val
            })
        },
        goback () {
            this.$myAlert({
                title: '提示',
                msg: '返回后数据将不会保存，是否继续操作？'
            }).then(res => {
                this.$router.push('/permissionEva/roleManager')
            }).catch(err => {
                console.log(err)
            })
        }
    },
    // 生命周期函数
    beforeCreate () {}
}
</script>

<style lang="less" scoped>
.role-detail {
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        background: #FFF;
        padding-top: 30px;
        .wrap {
            padding: 0 20px 100px;
            .menu {
                position: relative;
                height: 520px;
            }
            .option {
                text-align: left;
                margin-top: 2px;
                .item {
                    margin-bottom: 10px;
                    .title {
                        float: left;
                        width: 156px;
                        height: 34px;
                        line-height: 34px;
                        text-align: right;
                        color: #000;
                        font-size: 14px;
                    }
                    .msg {
                        display: inline-block;
                        width: 930px;
                        line-height: 34px;
                        color: #333;
                        font-size: 14px;
                        min-height: 34px;
                        &.department {
                            .el-checkbox {
                                float: left;
                                width: 154px;
                                margin-left: 0;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .title, .msg {
                        vertical-align: middle;
                    }
                }
            }
            .left {
                width: 520px;
                position: absolute;
                left: 0;
                top: 0px;
                .item {
                    margin-bottom: 10px;
                    .title {
                        float: left;
                        width: 156px;
                        height: 34px;
                        line-height: 34px;
                        text-align: right;
                        color: #000;
                        font-size: 14px;
                    }
                    .msg {
                        width: 345px;
                        height: 34px;
                        line-height: 34px;
                        text-align: left;
                        margin-left: 156px;
                        color: #333;
                        font-size: 14px;
                        &.tree {
                            width: 314px;
                            height: 446px;
                            overflow-y: auto;
                            border: 1px solid #ddd;
                            border-radius: 3px;
                            padding: 14px;
                        }
                    }
                    .desc {
                        height: 78px;
                    }
                    &.region {
                        margin-bottom: 0;
                    }
                }
            }
            .right {
                width: 520px;
                position: absolute;
                left: 586px;
                top: 0px;
                .item {
                    margin-bottom: 10px;
                    .title {
                        float: left;
                        width: 156px;
                        height: 34px;
                        line-height: 34px;
                        text-align: right;
                        color: #000;
                        font-size: 14px;
                    }
                    .msg {
                        width: 345px;
                        height: 34px;
                        line-height: 34px;
                        text-align: left;
                        margin-left: 156px;
                        color: #333;
                        font-size: 14px;
                        &.tree {
                            width: 314px;
                            height: 446px;
                            overflow-y: auto;
                            border: 1px solid #ddd;
                            border-radius: 3px;
                            padding: 14px;
                        }
                    }
                    .desc {
                        height: 78px;
                    }
                    &.function {
                        margin-bottom: 0;
                    }
                    .checkbox {
                        text-align: left;
                        padding: 10px 0 10px 156px;
                    }
                }
            }
        }
    }
}
.red {
    color: #ff0000;
}
</style>
<style lang="less">
.role-detail {
    .el-textarea__inner {
        height: 78px;
    }
    .el-input__inner {
        height: 34px;
    }
    .name {
        .el-input__inner {
            width: 345px;
        }
    }
}
</style>
