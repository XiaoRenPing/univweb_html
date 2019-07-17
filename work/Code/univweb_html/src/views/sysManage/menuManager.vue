<template>
    <div class="menuManager">
        <!-- <tool-bar :title="'系统管理>菜单管理'">
            <label>菜单名称:</label>
            <el-input class="tool_ipt" v-model="menuName" placeholder="请输入内容" clearable></el-input>
            <el-button class="search_btn" type="primary" icon="el-icon-search" @click="search(menuName)" :disabled="!$checkAuth('sys:menus:find')"></el-button>
            <el-button class="add_btn" v-if="dataList.length<7" icon="el-icon-add" @click="addOrUpdateHandle" :disabled="!$checkAuth('sys:menus:add')">
                <img src="../../assets/images/iocn_add.png" alt="">
                <span>添加菜单</span>
            </el-button>
        </tool-bar> -->
        <tool-bar>
            <div class="fl">
                <label>菜单名称:</label>
                <el-input class="tool_ipt" v-model="menuName" placeholder="请输入内容" clearable></el-input>
            </div>
            <div class="fr">
                <el-button class="query_btn slects_btn" @click="search(menuName)" :disabled="!$checkAuth('sys:menus:find')">查询</el-button>
                <el-button class="react_btn" @click="toReact">重置</el-button>
            </div>
        </tool-bar>
        <div class="menu-content">
            <el-table
                :data="dataList"
                height="600"
                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                border
                style="width: 100%;">
                <table-tree-column
                    ref="trees"
                    prop="name"
                    align="left"
                    treeKey="menuId"
                    width="250"
                    label="名称">
                </table-tree-column>
                <el-table-column
                    prop="parentName"
                    header-align="center"
                    align="center"
                    width="120"
                    label="上级菜单">
                    <template slot-scope="scope">
                        {{scope.row.parentName || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    width="120"
                    label="图标">
                    <template slot-scope="scope">
                        <img v-if="scope.row.icon" :src="`${baseUrl}/img/${scope.row.icon}.png`">
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    header-align="center"
                    align="center"
                    label="类型"
                    width="120">
                    <template slot-scope="scope">
                    <span v-if="scope.row.type === 0" style="color:#006600">目录</span>
                    <span v-else-if="scope.row.type === 1" style="color:#3399FF">菜单</span>
                    <span v-else-if="scope.row.type === 2" style="color:#CCCCFF">按钮</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderNum"
                    header-align="center"
                    align="center"
                    label="排序号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="url"
                    header-align="center"
                    align="center"
                    width=""
                    :show-overflow-tooltip="true"
                    label="菜单路径">
                </el-table-column>
                <el-table-column
                    prop="perms"
                    header-align="center"
                    align="center"
                    width=""
                    :show-overflow-tooltip="true"
                    label="授权标识">
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    width="150"
                    label="操作">
                    <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editDetail(scope.row)" :disabled="!$checkAuth('sys:menus:view')">详情</el-button>
                    <!-- <span @click="deleteHandle(scope.row.menuId)">删除</span> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 弹窗, 新增 / 修改 -->
            <modal
                :title="'添加菜单'"
                :width="640"
                @alertCancel="alertCancel"
                :alert="addOrUpdateVisible">
                <div class="form">
                    <div class="form-item">
                        <div class="title"><span class="red">*&nbsp;&nbsp;</span>菜单类型：</div>
                        <div class="msg">
                            <el-radio-group v-model="menuRadio">
                                <el-radio :label="1">目录</el-radio>
                                <el-radio :label="2">菜单</el-radio>
                                <el-radio :label="3">按钮</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="title"><span class="red">*&nbsp;&nbsp;</span>上级目录：</div>
                        <!-- <div class="msg">
                            <el-input type="text" placeholder="请输入菜单名称"></el-input>
                        </div> -->
                        <el-popover
                            placement="bottom"
                            width="400"
                            v-model="showPopover"
                            trigger="click">
                            <el-tree :data="selectMenu" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                            <div class="msg" slot="reference">
                                <el-input type="text" v-model="addMenuName" readonly placeholder="请选择上级目录"></el-input>
                            </div>
                        </el-popover>
                    </div>
                    <div class="form-item">
                        <div class="title" v-if="menuRadio === 1"><span class="red">*&nbsp;&nbsp;</span>目录名称：</div>
                        <div class="title" v-if="menuRadio === 2"><span class="red">*&nbsp;&nbsp;</span>菜单名称：</div>
                        <div class="title" v-if="menuRadio === 3"><span class="red">*&nbsp;&nbsp;</span>按钮名称：</div>
                        <div class="msg">
                            <el-input type="text" v-model="addName" maxlength="6" placeholder="请输入名称"></el-input>
                        </div>
                    </div>
                    <div class="form-item" v-if="menuRadio === 2">
                        <div class="title"><span class="red">*&nbsp;&nbsp;</span>菜单路径：</div>
                        <!-- <div class="title" v-if="menuRadio === 3"><span class="red">*&nbsp;&nbsp;</span>按钮路径：</div> -->
                        <div class="msg">
                            <el-input type="text" v-model="addUrl" maxlength="50" placeholder="请输入路径"></el-input>
                        </div>
                    </div>
                    <div class="form-item"  v-if="menuRadio === 1">
                        <div class="title">图标：</div>
                        <div class="msg">
                            <span @click="selectImg(index)" v-for="(icon,index) in iconList" :key="index" class="img_box" :class="{active: imgIndex === index}">
                                <img :src="icon.src" alt="">
                            </span>
                            <!-- <span @click="selectImg(0)" class="img_box" :class="{active: imgIndex === 0}">
                                <img src="../../assets/images/icon-home-normal.png" alt="">
                            </span>
                            <span @click="selectImg(1)" class="img_box" :class="{active: imgIndex === 1}">
                                <img src="../../assets/images/icon-business-normal.png" alt="">
                            </span>
                            <span @click="selectImg(2)" class="img_box" :class="{active: imgIndex === 2}">
                                <img src="../../assets/images/icon-archives-normal.png" alt="">
                            </span>
                            <span @click="selectImg(3)" class="img_box" :class="{active: imgIndex === 3}">
                                <img src="../../assets/images/icon-analy-normal.png" alt="">
                            </span>
                            <span @click="selectImg(4)" class="img_box" :class="{active: imgIndex === 4}">
                                <img src="../../assets/images/icon-setting-normal.png" alt="">
                            </span> -->
                        </div>
                    </div>
                    <div class="form-item" v-if="menuRadio !== 3">
                        <div class="title"><span class="red">*&nbsp;&nbsp;</span>排序号：</div>
                        <div class="msg">
                            <el-input type="number" v-model="addSortNum" placeholder="请输入排列序号"></el-input>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                        <div class="msg">
                            <el-radio-group v-model="menuState">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="title">授权标识：</div>
                        <div class="msg">
                            <el-input v-model="addFlag" type="text" placeholder=""></el-input>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="title">备注说明：</div>
                        <div class="msg">
                            <el-input v-model="addBak" maxlength="250" type="textarea" resize="none" class="textarea"></el-input>
                        </div>
                    </div>
                </div>
                <span class="btn">
                    <el-button type="primary" @click="addMenus" :disabled="!$checkAuth('sys:menus:edit')">确定</el-button>
                    <el-button @click="alertCancel">取消</el-button>
                </span>
            </modal>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="addOrUpdateHandle" :disabled="!$checkAuth('sys:menus:add')">添加菜单</el-button>
        </bread-foot>
    </div>
</template>

<script>
import BreadFoot from '@/components/BreadFoot.vue'
import TableTreeColumn from '@/components/tableTreeColumn'
import modal from '@/components/Modal'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'menuManager',
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '菜单管理', path: '' }
            ],
            baseUrl: process.env.BASE_URL,
            imgIndex: '',
            showPopover: false,
            addSelfId: '', // 编辑id
            addMenuName: '', // 上级菜单名称
            addMenuId: '', // 上级菜单id
            addBak: '', // 备注
            addFlag: '', // 授权标
            addSortNum: '', // 排序号
            addUrl: '', // 添加路由
            addName: '', // 添加名称
            menuName: '',
            dataList: [],
            pageSize: 10,
            pageNum: 1,
            total: 0,
            menuRadio: 1, // 菜单单选
            menuState: 1, // 菜单状态
            dataListLoading: false,
            addOrUpdateVisible: false,
            dataListDemo: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            menuList: [],
            iconList: [
                {
                    class: 'icon-home-normal',
                    index: 0,
                    src: process.env.BASE_URL + 'img/icon-home-normal.png'
                },
                {
                    class: 'icon-business-normal',
                    index: 1,
                    src: process.env.BASE_URL + 'img/icon-business-normal.png'
                },
                {
                    class: 'icon-archives-normal',
                    index: 2,
                    src: process.env.BASE_URL + 'img/icon-archives-normal.png'
                },
                {
                    class: 'icon-analy-normal',
                    index: 3,
                    src: process.env.BASE_URL + 'img/icon-analy-normal.png'
                },
                {
                    class: 'icon-setting-normal',
                    index: 4,
                    src: process.env.BASE_URL + 'img/icon-setting-normal.png'
                }
            ]
        }
    },
    computed: {
        alertHeight () {
            if (this.menuRadio === 2) {
                return 620
            } else {
                return 566
            }
        },
        selectMenu () {
            return [
                {
                    menuId: 0,
                    name: '顶级菜单',
                    children: this.dataList
                }
            ]
        }
    },
    components: {
        TableTreeColumn,
        modal,
        ToolBar,
        BreadFoot
    },
    activated () {
        this.getDataList()
    },
    created () {
        this.getDataList()
    },
    methods: {
        search (value) {
            let dataList2 = []
            function findByName (obj) {
                obj.children.forEach((i, index) => {
                    if (i.name.indexOf(value) !== -1) {
                        dataList2.push(i)
                    } else if (i.children) {
                        findByName(i)
                    }
                })
            }
            this.$post('sys/menus/menutree', {
                data: {
                    name: ''
                }
            }).then(res => {
                if (!this.$checkAuth('sys:menus:find')) {
                    this.$alert('没有查询权限！', '提示')
                    return
                }
                if (res.status === 200) {
                    this.addLevel(res.data, 1)
                    res.data.sort((a, b) => { return a.orderNum > b.orderNum })
                    this.dataList = setNum(res.data, 1, 99)
                    let lll = JSON.parse(JSON.stringify(this.dataList))
                    if (value) {
                        findByName({ children: lll })
                        this.dataList = dataList2
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            })
            // let row = ''
            // let index2 = ''
            // let _this = this
            // let dataList2 = []
            // function findByName (obj) {
            //     obj.children.forEach((i, index) => {
            //         if (value === i.name) {
            //             // row = obj
            //             // index2 = index
            //             dataList2.push(i)
            //         }
            //         if (i.children) {
            //             // _this.$refs.trees.toggleHandle(index + 1, obj)
            //             findByName(i)
            //         }
            //     })
            // }
            // let lll = JSON.parse(JSON.stringify(this.dataList))
            // findByName({ children: lll })
            // // let aaa = JSON.parse(JSON.stringify(row))
            // // this.$refs.trees.toggleHandle(index2 + 1, aaa)
            // this.dataList = dataList2
        },
        selectImg (index) {
            if (index === this.imgIndex) {
                this.imgIndex = ''
            } else {
                this.imgIndex = index
            }
        },
        // 添加菜单
        addMenus () {
            if (this.addMenuId === '') {
                this.$alert('请选择上级菜单', '提示')
                return
            }
            if (!this.addName) {
                this.$alert('请填写名称', '提示')
                return
            }
            if (!this.addSortNum && this.menuRadio !== 3) {
                this.$alert('请填写排序号', '提示')
                return
            }
            if (!this.addUrl && this.menuRadio === 2) {
                this.$alert('请填写菜单路径', '提示')
                return
            }
            if (this.addSelfId) {
                this.$post('sys/menus/edit', {
                    data: {
                        menuId: this.addSelfId,
                        parentId: this.addMenuId || 0,
                        name: this.addName,
                        perms: this.addFlag,
                        url: this.addUrl,
                        type: this.menuRadio - 1,
                        icon: this.menuRadio === 1 ? this.iconList[this.imgIndex].class : '',
                        orderNum: this.addSortNum,
                        remark: this.addBak,
                        status: this.menuState
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.addOrUpdateVisible = false
                        this.addMenuName = ''
                        this.addMenuId = ''
                        this.addBak = ''
                        this.addFlag = ''
                        this.addSortNum = ''
                        this.menuRadio = 1
                        this.menuState = 1
                        this.addUrl = ''
                        this.addName = ''
                        this.addSelfId = ''
                        this.getDataList()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            } else {
                this.$post('sys/menus/add', {
                    data: {
                        parentId: this.addMenuId,
                        name: this.addName,
                        perms: this.addFlag,
                        url: this.addUrl,
                        type: this.menuRadio - 1,
                        icon: this.menuRadio === 1 ? this.iconList[this.imgIndex].class : '',
                        orderNum: this.addSortNum,
                        remark: this.addBak,
                        status: this.menuState
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.addOrUpdateVisible = false
                        this.addMenuName = ''
                        this.addMenuId = ''
                        this.addBak = ''
                        this.addFlag = ''
                        this.addSortNum = ''
                        this.addUrl = ''
                        this.addName = ''
                        this.addSelfId = ''
                        this.menuRadio = 1
                        this.imgIndex = ''
                        this.menuState = 1
                        this.getDataList()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            }
        },
        alertCancel () {
            this.addMenuName = ''
            this.addMenuId = ''
            this.addBak = ''
            this.addFlag = ''
            this.addSortNum = ''
            this.addUrl = ''
            this.addName = ''
            this.addSelfId = ''
            this.menuRadio = 1
            this.menuState = 1
            this.imgIndex = ''
            this.addOrUpdateVisible = false
        },
        // 点击树行
        handleNodeClick (val) {
            this.addMenuName = val.name
            this.addMenuId = val.menuId
            this.showPopover = false
        },
        // 获取数据列表
        getDataList () {
            this.dataListLoading = true
            this.$post('sys/menus/menutree', {
                data: {
                    name: ''
                }
            }).then(res => {
                if (!this.$checkAuth('sys:menus:find')) {
                    this.$alert('没有查询权限！', '提示')
                    return
                }
                if (res.status === 200) {
                    this.addLevel(res.data, 1)
                    res.data.sort((a, b) => { return a.orderNum > b.orderNum })
                    this.dataList = setNum(res.data, 1, 99)
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        addLevel (list, leval) {
            list.forEach(element => {
                element.level = leval
                if (element.children) {
                    this.addLevel(element.children, leval + 1)
                }
            })
        },
        // 新增 / 修改
        addOrUpdateHandle (obj) {
            this.addOrUpdateVisible = true
        },
        editDetail (obj) {
            if (obj) {
                this.addSelfId = obj.menuId
                this.addMenuId = obj.parentId
                this.addMenuName = obj.parentName
                this.addName = obj.name
                this.addFlag = obj.perms
                this.addUrl = obj.url
                this.menuRadio = obj.type + 1
                this.imgIndex = obj.icon - 0
                this.addSortNum = obj.orderNum
                this.addBak = obj.remark
                this.menuState = obj.status
                if (!obj.parentId) this.addMenuName = '顶级菜单'
            }
            this.addOrUpdateVisible = true
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getDataList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getDataList()
        },
        // 删除
        deleteHandle (id) {
            this.$myAlert({
                type: 'waring',
                msg: '您确定要从系统中删除该数据吗？请谨慎操作！'
            }).then(res => {
                this.$post('sys/menus/delete', {
                    data: {
                        menuId: id
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '删除成功'
                        })
                        this.getDataList()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            }).catch(err => {
                console.log(err)
                this.$alert('请求失败', '提示')
            })
        },
        // 获取菜单列表
        getMenuList () {
        },
        // 获取菜单信息
        getMenuInfo () {
        },
        // 菜单树选中
        menuListTreeCurrentChangeHandle (data, node) {
        },
        // 表单提交
        dataFormSubmit () {
        },
        toReact () {
            this.menuName = ''
        }
    }
}
</script>
<style lang="less">
.menuManager {
    .alert-content {
        padding-bottom: 20px;
    }
    .img_box {
        position: relative;
        cursor: pointer;
        margin-left: 10px;
        &.active {
            &:after {
                position: absolute;
                content: '';
                width: 15px;
                height: 15px;
                background-image: url(../../assets/images/succeed.png);
                background-size: 100% 100%;
                right: -10px;
            }
        }
    }
    .menu-content {
        padding: 0 20px;
        .form {
            padding: 30px 0;
            .red {
                color: #ff0000;
            }
            .form-item {
                margin-bottom: 20px;
                .title {
                    line-height: 34px;
                    width: 148px;
                    text-align: right;
                    float: left;
                    font-size: 14px;
                    color: #666;
                }
                .msg {
                    line-height: 34px;
                    width: 400px;
                    margin-left: 152px;
                    text-align: left;
                    font-size: 14px;
                    color: #333;
                    .el-textarea__inner {
                        height: 68px;
                    }
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
<style lang="less">
.menuManager {
    background: #fff;
    .el-input__inner {
        height: 34px;
        line-height: 34px;
    }
}
</style>
