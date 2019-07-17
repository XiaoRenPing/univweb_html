<!-- 左侧导航组件 -->
<script>
import { setCookie } from '../utils/cookie.js'
export default {
    name: 'nav-menu',
    data () {
        return {
            logoIcon: require('../assets/images/login-logo-xh.png'),
            logoIconSmall: require('../assets/images/login-logo-xh.png'),
            // iconHome: require('../assets/images/icon-home.png'),
            // navList: [],
            navList: [
                {
                    name: '业务操作',
                    component: 'businessOper',
                    icon: 'icon-business-normal',
                    // icon: require('../assets/images/icon-business-normal.png'),
                    children: [
                        {
                            name: '行业通知发布',
                            component: 'notice',
                            path: '/notice'
                        },
                        {
                            name: '企业备案审核',
                            component: 'recording',
                            path: '/recording'
                        },
                        {
                            name: '企业诚信评价',
                            component: 'creditEva',
                            path: '/creditEva'
                        },
                        // {
                        //     name: '合格证发放',
                        //     component: 'certificate',
                        //     path: '/certificate'
                        // },
                        {
                            name: '服务投诉处理',
                            component: 'complainApply',
                            path: '/complainApply'
                        }
                    ]
                },
                {
                    name: '档案管理',
                    component: 'countAnalyze',
                    icon: 'icon-archives-normal',
                    // icon: require('../assets/images/icon-analy.png'),
                    children: [
                        {
                            name: '企业档案',
                            component: 'companyArch',
                            path: '/companyArch'
                        },
                        {
                            name: '车辆档案',
                            component: 'carArchives',
                            path: '/carArchives'
                        }
                    ]
                },
                {
                    name: '查询统计',
                    component: 'countAnalyze',
                    icon: 'icon-analy-normal',
                    // icon: require('../assets/images/icon-analy.png'),
                    children: [
                        {
                            name: '维修记录查询',
                            component: 'detailSearch',
                            path: '/detailSearch'
                        },
                        {
                            name: '检测记录查询',
                            component: 'synthesizeWork',
                            path: '/synthesizeWork'
                        },
                        {
                            name: '服务评价查询',
                            component: 'complainManage',
                            path: '/complainManage'
                        }
                    ]
                },
                {
                    name: '系统管理',
                    component: 'sysSet',
                    icon: 'icon-setting-normal',
                    // iconClass: require('../assets/images/icon-business.png'),
                    children: [
                        {
                            name: '权限管理',
                            component: 'permissionEva',
                            path: '/permissionEva'
                        },
                        {
                            name: '发证机关管理',
                            component: 'certificateOffice',
                            path: '/certificateOffice'
                        },
                        {
                            name: '日志管理',
                            component: 'logEva',
                            path: '/logEva'
                        }
                    ]
                }
            ],
            menuActive: 'home'
        }
    },
    render () {
        return (
            <div class={ this.$store.state.sidebarFold ? 'nav-menu nav-menu--fold' : 'nav-menu' }>
                <div class={ this.$store.state.sidebarFold ? 'nav-logo nav-logo--fold' : 'nav-logo' }>
                    { this.$store.state.sidebarFold ? <img class="logo-icon-fold fl" src={this.logoIconSmall}/>
                        : <img class="logo-icon fl" src={this.logoIcon} />}
                    { this.$store.state.sidebarFold ? '' : <div class="logo-icon-tit"><div class="icon-tit-p1 hidde-txt">南宁维修行业协会</div><div class="icon-tit-p2 hidde-txt">Maintenance industry association</div></div>}
                </div>
                <el-menu default-active={ this.$store.state.activeTab }
                    unique-opened={ true }
                    class="el-menu-vertical-demo"
                    collapse={ this.$store.state.sidebarFold }>
                    <el-menu-item index="home" onClick={ this.routerLinkTo.bind(this, '/home') }>
                        <i class="icon-menu icon-home-normal"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    {this.navList.map((item, index) => {
                        return (
                            <el-submenu
                                index={ item.name }
                                key={ item.name }>
                                <template slot="title">
                                    <i class={'icon-menu ' + item.icon }></i>
                                    <span>{ item.name }</span>
                                </template>
                                {item.children
                                    ? <el-menu-item-group v-show={ item.children }>
                                        {item.children.map((chil, chilIndex) => {
                                            return (
                                                <el-menu-item
                                                    onClick={ this.routerLinkTo.bind(this, chil.path) }
                                                    key={ chil.name }
                                                    index={ chil.path }>
                                                    { chil.name }
                                                </el-menu-item>
                                            )
                                        })}
                                    </el-menu-item-group> : ''}
                            </el-submenu>
                        )
                    })}
                </el-menu>
            </div>
        )
    },
    created () {
        // this.getRegion()
        // this.getLoginMenun() // <i class={'icon-menu ' + item.iconClass}></i>
    },
    mounted () {
    },
    methods: {
        // 获取区域列表
        getRegion () {
            this.$post('drownList/regionList', {})
                .then(res => {
                    if (res.code === 0) {
                        // this.regionData = res.data
                        let arr = []
                        res.data.forEach(i => {
                            if (i.level === 1) {
                                i.children = []
                                arr.push(i)
                            }
                        })
                        res.data.forEach(i => {
                            arr.forEach(j => {
                                if (i.level === 2 & i.pid === j.id) {
                                    i.children = []
                                    j.children.push(i)
                                }
                            })
                        })
                        res.data.forEach(i => {
                            arr.forEach(j => {
                                j.children.forEach(q => {
                                    if (i.level === 3 & i.pid === q.id) {
                                        q.children.push(i)
                                    }
                                })
                            })
                        })
                        this.$store.commit('setRegionList', arr)
                        setCookie('regionList', JSON.stringify(arr))
                    }
                })
        },
        // 路由跳转
        routerLinkTo (path) {
            this.$router.push(path)
        },
        // 获取权限菜单
        getLoginMenun () {
            this.$post('sys/menus/loginMenu', {})
                .then(res => {
                    if (res.status === 200) {
                        res.result.forEach((element, index) => {
                            if (element.name === '首页') {
                                res.result.splice(index, 1)
                            }
                            // 生产环境屏蔽菜单管理
                            if (element.name === '系统管理' && process.env.NODE_ENV !== 'development') {
                                element.children.forEach((child, index) => {
                                    if (child.name === '菜单管理') {
                                        // element.children.splice(index, 1)
                                    }
                                })
                            }
                        })
                        this.navList = res.result
                        sessionStorage.authList = JSON.stringify(res.result)
                    }
                })
        }
    }
}
</script>

<style lang='less' scoped>
.icon-nav {
    width: 16px;
    height: 16px;
    margin-right: 10px;
}
.nav-menu {
    background: #0030BD;
    width: 256px;
    height: 100%;
    overflow: auto;
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    transition: display .3s, left .3s, width .3s, margin .3s, font-size .3s;
    border-right: 1px solid #E8ECEF;
    .nav-logo {
        background: #0030BD;
        height: 60px;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 2px;
        box-shadow: 0px 2px 4px 0px #003466;
        overflow: hidden;
        .logo-icon {
            width: 36px;
            height: 44px;
            margin-right: 4px;
        }
        .logo-icon-tit {
            padding-left:40px;
            padding-right: 5px;
            color: #ffffff;
            .icon-tit-p1 {
                font-size: 16px;
            }
            .icon-tit-p2 {
                font-size: 10px;
            }
        }
        .logo-icon-fold {
            margin-top: 2px;
            width: 34px;
            height: 40px;
        }
        .logo-text {
            height: 44px;
            line-height: 44px;
            font-size: 22px;
            color: #FFFFFF;
        }
    }
    .nav-logo--fold {
        padding: 10px;
    }
    .icon-menu {
        display: inline-block;
        height: 16px;
        width: 16px;
        margin-left: 10px;
        margin-right: 20px;
        &.icon-home-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-home-normal.png');
        }
        &.icon-business-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-business-normal.png');
        }
        &.icon-analy-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-analy-normal.png');
        }
        &.icon-archives-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-archives-normal.png');
        }
        &.icon-setting-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-setting-normal.png');
        }
    }
    .is-active {
        .icon-home-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-home-selected.png');
        }
        .icon-business-normal  {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-business-selected.png');
        }
        .icon-analy-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-analy-selected.png');
        }
        .icon-archives-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-archives-selected.png');
        }
        .icon-setting-normal {
            background-size: 100% 100%;
            background-image: url('../assets/images/icon-setting-selected.png');
        }
    }
    .menu-title {
        font-size: 18px;
        color: #778CA2;
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin-top: 16px;
    }
}
.nav-menu--fold {
    width:64px;
}
</style>
<style lang="less">
.nav-menu {
    .icon-menu {
        color: #ffffff;
    }
    .el-menu {
        border-right: none;
        background: #002E62;
        transition: 0s;
    }
    .el-menu .el-menu-item, .el-menu .el-submenu {
        color: #8A9CC2;
        text-align: left;
        background: #0030BD;
        // border-top: 1px solid #00488D;
        box-shadow:0px -1px 0px 0px #00488D;
    }
    .el-menu .el-menu-item {
        background: #0030BD;
    }
    .el-menu-item-group__title {
        padding: 0;
    }
    .el-submenu .el-menu-item {
        background: #001E75;
        color: #fff;
        padding-left: 70px !important;
        // box-shadow:0px -1px 0px 0px #00488D;
    }
    .el-submenu.is-active .el-submenu__title {
        background: #0029A3;
        color: #FFFFFF;
    }
    .el-menu .el-menu-item.is-active, .el-menu .el-menu-item:hover,.el-menu .el-submenu__title:focus {
        background: #0029A3;
        color: #ffffff;
    }
    .el-menu .el-submenu .el-submenu__title:hover, .el-menu .el-submenu .el-submenu__title:focus {
        background: #0029A3;
        color: #ffffff;
    }
    .el-menu .el-submenu .el-menu .el-menu-item.is-active, .el-submenu .el-menu-item:hover, .el-submenu .el-menu-item:focus{
        background: #CCA419;
        color: #001E75;
    }
    .el-submenu__title {
        color: #8A9CC2;
    }
}
</style>
