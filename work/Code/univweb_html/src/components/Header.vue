<!--
* 组件的公共模板
 -->
<template>
    <div class="header" @mouseleave="showSecondNav=false">
        <div class="img-box" ref="imgBox">
            <!-- <img class="name_img" src="../assets/images/icon_logocarbleck.png"> -->
            <div class="title">
                <h1 ref="title">{{title}}</h1><br />
                <h6 ref="enName" class="en" v-if="info">{{info.associationNameEn || 'Motor vehicle maintenance repair and testing supervision management system'}}</h6>
            </div>
        </div>
        <div class="nav_box" ref="navBox" @mouseleave="showIndex=0">
            <div class="nav_item"  @click="goHome" :style="{'width': navWidth}">
                <!-- <img src="../assets/images/icon_home11.png"> -->
                <p>首页</p>
            </div>
            <div class="nav_item" v-for="(menu,index) in menuList2" :style="{'width': navWidth}" :key="menu.menuId" @mouseover="showIndex=index+1" @click="goPage(menu.url)">
                <img :src="`${baseUrl}/img/icon${menu.icon-0+1}.png`">
                <p>{{menu.name}}</p>
                <div class="navWrap">
                    <el-collapse-transition>
                    <!-- <transition name="el-zoom-in-top"> -->
                        <div class="secondNav" v-show="showIndex === index+1 && menu.name !== '首页'" ref="secondNav">
                            <div class="jiantous"></div>
                            <div class="secondItem" v-for="item in menu.children" v-show="(item.name!=='菜单管理'&&item.name!=='系统参数管理')||isAdmin" :key="item.id" @mouseover="hacks" @click="goPage(item.url)">
                                <span class="jiantou" v-show="item.children&&item.type===0"></span>
                                {{item.name}}
                                <div class="thirdNav" v-if="item.children&&item.type===0">
                                    <div class="thirdItem" v-for="item2 in item.children" v-show="(item2.name!=='菜单管理'&&item2.name!=='系统参数管理')||isAdmin" :key="item2.id" @click="goPage(item2.url)">
                                        {{item2.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                    <!-- </transition> -->
                </div>
            </div>
        </div>
        <div class="user_info">
            <div class="warning_box" @click="clickWarn" style="z-index: 999;cursor:pointer">
                <!-- <img src="../assets/images/warning.png"> -->
                <span v-show="total">{{total > 99 ? '99+' : total}}</span>
            </div>
            <div class="user_item fr" @click="loginOut" v-show="!navHide">
                <!-- <img src="../assets/images/icon-guanji.png"> -->
                <span>退出</span>
            </div>
            <div class="user_item user-name fr" :class="{hide:navHide}" v-show="!navHide">
                <img v-if="user.avatar" :src="user.avatar" alt="" width="36" height="36">
                <!-- <img v-else src="../assets/images/icon-user-default.png"> -->
                <span>{{user.name}}</span>
            </div>
            <div class="user_item fr" :class="{hide:navHide}" v-show="navHide">
                <div class="hide-menu">
                    <el-dropdown @command="handleCommand">
                        <div>
                            <!-- <img src="../assets/images/icon-user-default.png" style="position:inherit"> -->
                            <span class="el-dropdown-link">
                                {{user.name}}
                            </span>
                            <!-- <img src="../assets/images/icon_main_nav_menu_more_down.png" class="down"> -->
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="out">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <Modal
            :title="'待处理事件'"
            :width="900"
            :height="444"
            :alert="showAlert"
            @alertCancel="closeAlert">
            <div class="model alert-content clearfix" >
                <el-table class="tab" :data="tableData" :header-cell-style="{background:'#EDF0F5',color:'#666666','text-align':'center'}" :cell-style="{'text-align':'center'}" :stripe="false" height="300" style="width: 100%">
                    <el-table-column prop="num" label="序号" width="80" :show-overflow-tooltip='true'>
                    </el-table-column>
                    <el-table-column prop="affairesTaskTypeText" label="事件类型" width="120" :show-overflow-tooltip='true'>
                    </el-table-column>
                    <el-table-column prop="affairesTask" label="事件内容" width="" :show-overflow-tooltip='true'>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="haddleDetail(scope.row.affairesTaskType, scope.row.affairesTaskId, scope.row.enterpriseId)">去处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page_box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 25, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                    </el-pagination>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import { clearCookie, getCookie } from '../utils/cookie.js'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'common',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            warnNum: 0,
            total: 0,
            pageNum: 1,
            pageSize: 10,
            tableData: [],
            showAlert: false,
            navWidth: '20%',
            user: '',
            baseUrl: process.env.BASE_URL,
            menuList2: [], // 菜单列表
            showIndex: 0,
            logo: '',
            title: '',
            navHide: false,
            tabIndex: 0, // tabIndex
            showThirdNav: false, // 是否显示3级菜单
            menuList: [
                [
                    { name: '通知发布', children: [], src: 'notice' },
                    { name: '企业备案审核', children: [], src: 'recording' },
                    {
                        name: '协会网站管理',
                        children: [
                            {
                                name: '热门服务管理',
                                src: 'hotServiceManage'
                            },
                            {
                                name: '新闻管理',
                                src: 'newsManage'
                            },
                            {
                                name: '协会管理',
                                src: 'societyManager'
                            },
                            {
                                name: '链接管理',
                                src: 'linkType'
                            },
                            {
                                name: '广告管理',
                                src: 'advertisement'
                            }
                        ],
                        src: 'none'
                    },
                    {
                        name: '企业信用评价',
                        children: [
                            {
                                name: '企业参评审核',
                                src: 'applyAudit'
                            },
                            {
                                name: '企业参评管理',
                                src: 'process'
                            },
                            {
                                name: '诚信指标设置',
                                src: 'addModel'
                            }
                        ],
                        src: 'none'
                    },
                    { name: '合格证发放', children: [], src: 'certificate' },
                    { name: '投诉受理', children: [], src: 'complainApply' }
                ],
                [
                    { name: '企业档案', children: [], src: 'companyArch' },
                    { name: '车辆档案', children: [], src: 'carArchives' },
                    { name: '运输车辆车技档案', children: [], src: 'transportArch' }
                    // { name: '从业人员档案', children: [], src: 'employeeManage' },
                    // { name: '企业诚信档案', children: [], src: '' }
                ],
                [
                    {
                        name: '企业数据上传统计',
                        children: [],
                        src: 'companyData'
                    },
                    {
                        name: '健康档案上传查询',
                        children: [],
                        src: 'detailSearch'
                    },
                    // { name: '二级维护作业查询', children: [], src: 'erweiWork' },
                    // { name: '二级维护业务统计', children: [], src: 'erweiBusiness' },
                    // { name: '二级维护车型统计', children: [], src: 'erweiCar' },
                    { name: '综合性能检测查询', children: [], src: 'synthesizeWork' },
                    // { name: '综合性能检测业务统计', children: [], src: 'synthesizeBusiness' },
                    // { name: '综合性能检测车型统计', children: [], src: 'synthesizeCar' },
                    { name: '维修服务评价查询', children: [], src: 'complainManage' },
                    { name: '企业投诉查询', children: [], src: 'accuseManage' }
                    // { name: '维修配件数量统计', children: [], src: '' },
                    // { name: '维修项目数量统计', children: [], src: '' }
                ],
                [
                    { name: '用户管理', children: [], src: 'userManage' },
                    { name: '角色管理', children: [], src: 'roleManager' },
                    { name: '部门管理', children: [], src: 'departmentManager' },
                    { name: '菜单管理', children: [], src: 'menuManager' },
                    { name: '发证机关管理', children: [], src: 'certificateOffice' },
                    { name: '系统参数管理', children: [], src: 'paramManage' },
                    { name: '数据上传日志', children: [], src: 'dataUpload' },
                    { name: '企业备案日志', children: [], src: 'enterpriseRecordLog' },
                    { name: '操作日志', children: [], src: 'operationLog' }
                ]
            ],
            isAdmin: '', // 是否管理员
            thirdList: [], // 选中的三级菜单
            showSecondNav: false, // 是否显示二级菜单
            currentList: [] // 当前二级菜单
        }
    },
    created () {
        this.user = JSON.parse(getCookie('user'))
        this.isAdmin = this.user.username.indexOf('admin') !== -1
        this.getCommonParams()
        this.getMenu()
        this.getWranList()
        setInterval(() => {
            this.getWranList()
        }, 10000)
    },
    computed: {
    },
    // 使用其它组件
    components: {
        Modal
    },
    // 方法
    watch: {},
    methods: {
        // 消息处理
        haddleDetail (type, id, eid) {
            if (type === '10') {
                this.$router.push(`/applyAuditDetail?id=${id}`)
            } else if (type === '11') {
                this.$router.push(`/complainApplyDetail?id=${id}`)
            } else if (type === '12') {
                this.$router.push(`/processDetail?id=${id}&enterpriseEvaluateApplyId=${id}&step=3&apply=true`)
            } else {
                this.$router.push(`/audit?enterpriseChangeRecordId=${id}&enterpriseId=${eid}`)
            }
            this.showAlert = false
        },
        // 点击消息提醒
        clickWarn () {
            this.showAlert = true
            this.getWranList()
        },
        // 获取消息列表
        getWranList () {
            this.$post('external/affaires/useraffaires', {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alet(res.message, '提示')
                }
            })
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getWranList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getWranList()
        },
        closeAlert () {
            this.showAlert = false
        },
        // 获取公共参数
        getCommonParams () {
            if (getCookie('info')) {
                this.info = JSON.parse(getCookie('info3'))
                this.$store.commit('setInfo', this.info)
                this.title = document.title = this.info.sysTitle
            }
        },
        // 获取菜单
        getMenu () {
            this.$post('sys/menus/loginMenu', {}).then(res => {
                if (res.status === 200) {
                    if (!res.data) return
                    res.data.sort((a, b) => { return a.orderNum > b.orderNum })
                    sessionStorage.authList = JSON.stringify(res.data)
                    this.menuList2 = res.data
                    this.menuList2.forEach((i, index) => {
                        if (i.name === '首页' || i.name === '主页') {
                            this.menuList2.splice(index, 1)
                        }
                        // 屏蔽权限菜单
                        if (i.children && i.children.length) {
                            i.children.forEach((item, index2) => {
                                if (item.name === '系统参数管理') {
                                    this.menuList2[index].children.splice(index2, 1)
                                }
                                if (item.children && item.children.length) {
                                    item.children.forEach((itemB, indexB) => {
                                        if (itemB.name === '菜单管理') {
                                            this.menuList2[index].children[index2].children.splice(indexB, 1)
                                        }
                                    })
                                }
                            })
                        }
                    })
                    if (this.menuList2.length > 4) {
                        this.navWidth = this.$refs.navBox.offsetWidth / (this.menuList2.length + 1) + 'px'
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        hacks () {
            if (this.$refs.secondNav.length) {
                this.$refs.secondNav.forEach(i => {
                    i.style.overflow = 'visible'
                })
            } else {
                this.$refs.secondNav.style.overflow = 'visible'
            }
        },
        // 显示二级菜单
        showSecond (index) {

        },
        changeSecond (index) {
        },
        handleCommand (val) {
            if (val === 'out') {
                this.loginOut()
            }
        },
        // 显示三级菜单
        showThird (i) {
            i.children.length
                ? (this.showThirdNav = true)
                : (this.showThirdNav = false)
        },
        loginOut () {
            this.$myAlert({
                title: '提示',
                msg: '确定退出登录吗？'
            }).then(() => {
                clearCookie('token')
                clearCookie('user')
                this.$router.push('/login')
                this.$store.dispatch('delAllViews')
            }).catch(() => {
            })
        },
        // 跳转页面
        goPage (value) {
            if (!value) {
                return
            }
            this.showIndex = 0
            this.$router.push('/' + value)
        },
        // 跳转到首页
        goHome () {
            this.$router.push('/')
        },
        setEnTitle () {
            const title = this.$refs.title
            const enName = this.$refs.enName
            const defEnW = enName.clientWidth
            enName.style.letterSpacing = '0.1px'

            // 设置标题对齐
            if (title.innerHTML.length > 17) {
                title.style.fontSize = '24px'
            }
            enName.style.letterSpacing = (title.clientWidth - defEnW) / (enName.clientWidth - defEnW) * 0.1 + 'px'

            // 设置菜单收缩、退出隐藏
            if (this.$refs.imgBox.clientWidth + this.$refs.navBox.clientWidth + 258 > document.body.offsetWidth - 20) {
                let navBoxW = document.body.scrollWidth - this.$refs.imgBox.clientWidth - 150 - 40
                navBoxW < 400 && (navBoxW = 400)
                navBoxW > 540 && (navBoxW = 540)
                this.$refs.navBox.style.width = `${navBoxW}px`
                this.navHide = true
            }
        }
    },
    mounted () {
        this.setEnTitle()
    }
}
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease-out;
}
.slide-enter,
.slide-leave-active {
    opacity: 0;
}
.slide2-enter-active,
.slide2-leave-active {
    transition: all 0.5s ease-out;
}
.slide2-enter,
.slide2-leave-active {
    opacity: 0;
}
.model {
    padding: 20px;
}
.header {
    height: 80px;
    width: 100%;
    background-color: #0853A6;
    // background-image: url(../assets/images/bg_top.png);
    background-size: 100% 100%;
    color: #ffffff;
    position: relative;
    z-index: 2;
    .img-box {
        float: left;
        min-width: 400px;
        height: 80px;
        .title {
            margin-left: 90px;
            margin-top: 19px;
            text-align: left;
            h1 {
                display: inline-block;
                font-size: 23px;
            }
            .en {
                font-size: 12px;
                color: #fff;
                letter-spacing: 0px;
                font-weight: normal;
                // margin-top: 2px;
                display: inline-block;
                position: relative;
                top: -2px;
            }
        }
    }
    .name_img {
        float: left;
        margin-left: 20px;
        margin-top: 20px;
        width: 51px;
    }
    .nav_box {
        float: left;
        margin-left: 20px;
        color: #ffffff;
        width: 540px;
        .nav_item {
            position: relative;
            cursor: pointer;
            height: 80px;
            text-align: center;
            float: left;
            width: 20%;
            &.active {
                // background: url(../assets/images/top_slider.png);
            }
            &:hover {
                // background: url(../assets/images/top_slider.png);
            }
            img {
                margin-top: 10px;
            }
            p {
                margin-top: 2px;
                font-size: 14px;
            }
        }
    }
    .navWrap {
        position:absolute;
        left:50%;
        top:72px;
    }
    .secondNav {
        min-width: 160px;
        position: relative;
        white-space: nowrap;
        color: #333333;
        font-size: 14px;
        left: -50%;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: .2s all ease-in;
        .jiantou {
            display: inline-block;
            width: 0;
            height: 0;
            position: relative;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-right: none;
            border-left: 4px solid #359DFF;
        }
        .secondItem {
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            position: relative;
            background: #ffffff;
            .thirdNav {
                display: none;
                position: absolute;
                width: 170px;
                z-index: 99999;
                top: 0;
                left: 100%;
                background: #ffffff;
                color: #333333;
                box-shadow:0px 4px 10px 0px rgba(221,221,221,1);
                .thirdItem:hover {
                    background: #EAF5FF;
                    color: #359DFF
                }
            }
            &:hover {
                background: #EAF5FF;
                color: #359DFF;
                .thirdNav {
                    display: block;
                }
            }
        }
        .jiantous {
            width: 0;
            height: 0;
            top: 0px;
            border-top: none;
            margin: 0 auto;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 8px solid #ffffff;
        }
    .user_info {
        position: absolute;
        height: 80px;
        right: 20px;
        line-height: 80px;
        .warning_box {
            position: absolute;
            height: 24px;
            line-height: 1;
            top: 28px;
            span {
                position: absolute;
                left: 20px;
                background: #F75757;
                border-radius: 10px;
                padding: 0 3px;
                font-size: 12px;
                line-height: 15px;
            }
        }
        .user_item {
            height: 100%;
            position: relative;
            cursor: pointer;
            img {
                margin-right: 8px;
                position: relative;
            }
            img, span {
                vertical-align: middle;
            }
            .el-dropdown-link {
                color: #fff;
                max-width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
                margin-right: 4px;
            }
            .hide-menu {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                img, span {
                    vertical-align: middle;
                }
            }
            &.hide {
                width: 190px;
            }
        }
        .user-name {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.hide {
                width: 150px;
            }
        }
        .header-bg {
            position: absolute;
            bottom: 0;
            right: -20px;
        }
    }
    .el-menu {
        position: fixed;
        right: 0;
        bottom: 0;
        top: 0;
        width: 65px;
    }
}
// @media screen and (max-width: 1350px) {
//     .header .user_info .user-name {
//         width: 100px;
//     }
// }
</style>
