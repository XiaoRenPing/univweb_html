import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from './utils/cookie.js'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)
var router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            name: 'layout',
            component: () => import('./views/common/layout.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    meta: {
                        title: '首页'
                    },
                    component: Home
                },
                {
                    path: '/empty',
                    name: 'empty'
                },
                {
                    path: '/checkNotice',
                    name: 'checkNotice',
                    meta: {
                        title: '查看通知',
                        isDetail: true,
                        tag: 'notice'
                    },
                    component: () => import('./views/business/checkNotice.vue')
                },
                // 业务操作
                {
                    path: '/notice',
                    name: 'notice',
                    meta: {
                        tag: 'notice',
                        title: '通知发布'
                    },
                    component: () => import('./views/business/notice.vue')
                },
                {
                    path: '/addNotice',
                    name: 'addNotice',
                    meta: {
                        tag: 'notice',
                        isDetail: true,
                        title: '通知发布'
                    },
                    component: () => import('./views/business/addNotice.vue')
                },
                {
                    path: '/recording',
                    name: 'recording',
                    meta: {
                        tag: 'audit',
                        title: '企业备案'
                    },
                    component: () => import('./views/business/recording.vue')
                },
                {
                    path: '/audit',
                    name: 'audit',
                    meta: {
                        tag: 'audit',
                        isDetail: true,
                        title: '企业备案详情'
                    },
                    component: () => import('./views/business/audit.vue')
                },
                {
                    path: '/creditEva',
                    redirect: '/creditEva/applyAudit',
                    name: 'creditEva',
                    meta: {
                        tag: 'creditEva',
                        title: '企业诚信评价'
                    },
                    component: () => import('./views/common/creditEva.vue'),
                    children: [
                        {
                            path: '/creditEva/applyAudit',
                            name: 'applyAudit',
                            meta: {
                                tag: 'applyAudit',
                                title: '企业参评审核'
                            },
                            component: () => import('./views/business/applyAudit.vue')
                        },
                        {
                            path: '/creditEva/process',
                            name: 'process',
                            meta: {
                                tag: 'process',
                                title: '企业参评管理'
                            },
                            component: () => import('./views/business/process.vue')
                        },
                        {
                            path: '/creditEva/addModel',
                            name: 'addModel',
                            meta: {
                                tag: 'applyAudit',
                                title: '诚信指标设置'
                            },
                            component: () => import('./views/business/addModel.vue')
                        }
                    ]
                },
                {
                    path: '/creditEva/applyAuditDetail',
                    name: 'applyAuditDetail',
                    meta: {
                        title: '参评审核详情',
                        isDetail: true,
                        tag: 'applyAudit'
                    },
                    component: () => import('./views/business/applyAuditDetail.vue')
                },
                {
                    path: '/creditEva/processDetail',
                    name: 'processDetail',
                    meta: {
                        title: '参评详情',
                        isDetail: true,
                        tag: 'process'
                    },
                    component: () => import('./views/business/processDetail.vue')
                },
                {
                    path: '/certificate',
                    name: 'certificate',
                    meta: {
                        title: '合格证发放'
                    },
                    component: () => import('./views/business/certificate.vue')
                },
                {
                    path: '/complainApply',
                    name: 'complainApply',
                    meta: {
                        title: '投诉受理',
                        tag: 'complainApply'
                    },
                    component: () => import('./views/business/complainApply.vue')
                },
                {
                    path: '/complainApplyDetail',
                    name: 'complainApplyDetail',
                    meta: {
                        title: '投诉受理详情',
                        isDetail: true,
                        tag: 'complainApply'
                    },
                    component: () => import('./views/business/complainApplyDetail.vue')
                },
                // 档案管理
                {
                    path: '/companyArch',
                    name: 'companyArch',
                    meta: {
                        title: '企业档案',
                        tag: 'companyArch'
                    },
                    component: () => import('./views/fileManage/companyArch.vue')
                },
                {
                    path: '/compArchDetail',
                    name: 'compArchDetail',
                    meta: {
                        title: '企业档案详情',
                        isDetail: true,
                        tag: 'companyArch'
                    },
                    component: () => import('./views/fileManage/compArchDetail.vue')
                },
                {
                    path: '/testingArchDetail',
                    name: 'testingArchDetail',
                    meta: {
                        title: '检测企业档案详情',
                        isDetail: true,
                        tag: 'companyArch'
                    },
                    component: () => import('./views/fileManage/testingArchDetail.vue')
                },
                {
                    path: '/carArchives',
                    name: 'carArchives',
                    meta: {
                        title: '车辆档案',
                        tag: 'carArchives'
                    },
                    component: () => import('./views/fileManage/carArchives.vue')
                },
                {
                    path: '/archivesDetail',
                    name: 'archivesDetail',
                    meta: {
                        title: '车辆档案详情',
                        isDetail: true,
                        tag: 'carArchives'
                    },
                    component: () => import('./views/fileManage/archivesDetail.vue')
                },
                {
                    path: '/newCarArchives',
                    name: 'newCarArchives',
                    meta: {
                        title: '新增车辆档案',
                        isDetail: true,
                        tag: 'carArchives'
                    },
                    component: () => import('./views/fileManage/newCarArchives.vue')
                },
                // 查询统计
                {
                    path: '/detailSearch',
                    name: 'detailSearch',
                    meta: {
                        title: '维修记录',
                        tag: 'detailSearch'
                    },
                    component: () => import('./views/analysis/detailSearch.vue')
                },
                {
                    path: '/workDetail',
                    name: 'workDetail',
                    meta: {
                        title: '维修记录详情',
                        isDetail: true,
                        tag: 'detailSearch'
                    },
                    component: () => import('./views/analysis/workDetail.vue')
                },
                {
                    path: '/synthesizeWork',
                    name: 'synthesizeWork',
                    meta: {
                        title: '检测记录',
                        tag: 'synthesizeWork'
                    },
                    component: () => import('./views/analysis/synthesizeWork.vue')
                },
                {
                    path: '/synthesizeWorkDetail',
                    name: 'synthesizeWorkDetail',
                    meta: {
                        title: '检测记录详情',
                        tag: 'synthesizeWork'
                    },
                    component: () => import('./views/analysis/synthesizeWorkDetail.vue')
                },
                {
                    path: '/complainManage',
                    name: 'complainManage',
                    meta: {
                        title: '服务评价查询'
                    },
                    component: () => import('./views/analysis/complainManage.vue')
                },
                {
                    path: '/complainDetail',
                    name: 'complainDetail',
                    meta: {
                        title: '服务评价详情'
                    },
                    component: () => import('./views/analysis/complainDetail.vue')
                },
                // 系统管理
                {
                    path: '/permissionEva',
                    redirect: '/permissionEva/userManage',
                    name: 'permissionEva',
                    meta: {
                        tag: 'permissionEva',
                        title: '权限管理'
                    },
                    component: () => import('./views/common/permissionEva.vue'),
                    children: [
                        {
                            path: '/permissionEva/userManage',
                            name: 'userManage',
                            meta: {
                                tag: 'userManage',
                                title: '用户管理'
                            },
                            component: () => import('./views/sysManage/userManage.vue')
                        },
                        {
                            path: '/permissionEva/roleManager',
                            name: 'roleManager',
                            meta: {
                                tag: 'roleManager',
                                title: '角色管理'
                            },
                            component: () => import('./views/sysManage/roleManager.vue')
                        },
                        {
                            path: '/permissionEva/departmentManager',
                            name: 'departmentManager',
                            meta: {
                                tag: 'departmentManager',
                                title: '部门管理'
                            },
                            component: () => import('./views/sysManage/departmentManager.vue')
                        }
                    ]
                },
                {
                    path: '/permissionEva/roleDetail',
                    name: 'roleDetail',
                    meta: {
                        title: '角色详情',
                        isDetail: true,
                        tag: 'roleManager'
                    },
                    component: () => import('./views/sysManage/roleDetail.vue')
                },
                {
                    path: '/certificateOffice',
                    name: 'certificateOffice',
                    meta: {
                        title: '发证机关管理'
                    },
                    component: () => import('./views/sysManage/certificateOffice.vue')
                },
                {
                    path: '/logEva',
                    redirect: '/logEva/operationLog',
                    name: 'logEva',
                    meta: {
                        tag: 'logEva',
                        title: '日志管理'
                    },
                    component: () => import('./views/common/logEva.vue'),
                    children: [
                        {
                            path: '/logEva/operationLog',
                            name: 'operationLog',
                            meta: {
                                tag: 'operationLog',
                                title: '操作日志'
                            },
                            component: () => import('./views/sysManage/operationLog.vue')
                        },
                        {
                            path: '/logEva/dataUpload',
                            name: 'dataUpload',
                            meta: {
                                tag: 'dataUpload',
                                title: '数据上传日志'
                            },
                            component: () => import('./views/sysManage/dataUpload.vue')
                        },
                        {
                            path: '/logEva/enterpriseRecordLog',
                            name: 'enterpriseRecordLog',
                            meta: {
                                tag: 'enterpriseRecordLog',
                                title: '企业备案日志'
                            },
                            component: () => import('./views/sysManage/enterpriseRecordLog.vue')
                        }
                    ]
                },
                // 菜单管理
                {
                    path: '/menuManager',
                    name: 'menuManager',
                    meta: {
                        title: '菜单管理'
                    },
                    component: () => import('./views/sysManage/menuManager.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    let login = process.env.NODE_ENV === 'development' || getCookie('token')
    let path = to.path
    // console.log(path, 'path')
    if (!/home|login|empty/.test(to.path)) {
        let flag = true
        // console.log(store.state.visitedViews, 'tabsList')
        for (let i = 0; i < store.state.visitedViews.length; i++) {
            if (store.state.visitedViews[i].name === to.name) {
                flag = false
                break
            }
        }
        if (flag) {
            store.state.visitedViews.push({
                path: to.path,
                name: to.name,
                title: to.meta.title
            })
            store.state.tabShow = true
        }
        store.state.activeTab = to.name
    }
    if (/home/.test(to.path)) {
        store.state.activeTab = 'home'
    }
    // 路由白名单
    if (/login/.test(path)) {
        next()
        return
    }
    if (login) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
})

export default router
