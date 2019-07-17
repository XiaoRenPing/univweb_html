import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { getCookie } from './utils/cookie.js'
import Store from './store.js'

Vue.use(Router)

var router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/redirect/:path*',
            name: 'redirect',
            component: () => import('./views/common/redirect.vue')
        },
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '首页'
            },
            component: Home
        },
        {
            path: '/upload',
            name: 'upload',
            component: () => import('./components/upload.vue')
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录',
                hideHeader: true
            },
            component: () => import('./views/login.vue')
        },
        // 合格证发放
        {
            path: '/certificate',
            name: 'certificate',
            meta: {
                title: '合格证发放'
            },
            component: () => import('./views/business/certificate.vue')
        },
        // 通告列表
        {
            path: '/notice',
            name: 'notice',
            meta: {
                title: '通知发布',
                tag: 'notice'
            },
            component: () => import('./views/business/notice.vue')
        },
        // 新增通告
        {
            path: '/addNotice',
            name: 'addNotice',
            meta: {
                title: '编辑通知',
                isDetail: true,
                tag: 'notice'
            },
            component: () => import('./views/business/addNotice.vue')
        },
        // 查看通告 
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
        // 新闻管理
        {
            path: '/newsManage',
            name: 'newsManage',
            meta: {
                title: '新闻管理',
                tag: 'news'
            },
            component: () => import('./views/business/newsManage.vue')
        },
        // 新闻详情
        {
            path: '/newsDetail',
            name: 'newsDetail',
            meta: {
                title: '新闻详情',
                isDetail: true,
                tag: 'news'
            },
            component: () => import('./views/business/newsDetail.vue')
        },
        // 企业备案列表
        {
            path: '/recording',
            name: 'recording',
            meta: {
                title: '企业备案审核',
                tag: 'audit'
            },
            component: () => import('./views/business/recording.vue')
        },
        // 企业备案审核
        {
            path: '/audit',
            name: 'audit',
            meta: {
                title: '企业备案详情',
                isDetail: true,
                tag: 'audit'
            },
            component: () => import('./views/business/audit.vue')
        },
        // 自定义模板 
        {
            path: '/addModel',
            name: 'addModel',
            meta: {
                title: '诚信指标项设置'
            },
            component: () => import('./views/business/addModel.vue')
        },
        // 车辆档案
        {
            path: '/carArchives',
            name: 'carArchives',
            meta: {
                title: '车辆档案',
                tag: 'carArchives'
            },
            component: () => import('./views/fileManage/carArchives.vue')
        },
        // 车辆档案详情
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
        // 新增车辆档案
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
        // 评价过程管理 
        {
            path: '/process',
            name: 'process',
            meta: {
                title: '企业参评管理',
                tag: 'process'
            },
            component: () => import('./views/business/process.vue')
        },
        // 参评详情
        {
            path: '/processDetail',
            name: 'processDetail',
            meta: {
                title: '参评详情',
                isDetail: true,
                tag: 'process'
            },
            component: () => import('./views/business/processDetail.vue')
        },
        // 评价过程管理
        {
            path: '/applyAudit',
            name: 'applyAudit',
            meta: {
                title: '企业参评审核',
                tag: 'applyAudit'
            },
            component: () => import('./views/business/applyAudit.vue')
        },
        {
            path: '/integrityManage',
            name: 'integrityManage',
            meta: {
                title: '企业诚信档案',
                tag: 'integrityManage'
            },
            component: () => import('./views/fileManage/integrityManage.vue')
        },
        {
            path: '/integrityDetail',
            name: 'integrityDetail',
            meta: {
                title: '企业诚信档案详情',
                isDetail: true,
                tag: 'integrityManage'
            },
            component: () => import('./views/fileManage/integrityDetail.vue')
        },
        // 参评审核
        {
            path: '/applyAuditDetail',
            name: 'applyAuditDetail',
            meta: {
                title: '参评审核详情',
                isDetail: true,
                tag: 'applyAudit'
            },
            component: () => import('./views/business/applyAuditDetail.vue')
        },
        // 投诉申请受理
        {
            path: '/complainApply',
            name: 'complainApply',
            meta: {
                title: '投诉受理',
                tag: 'complainApply'
            },
            component: () => import('./views/business/complainApply.vue')
        },
        // 投诉申请受理详情
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
        // 诚信材料
        {
            path: '/materials',
            name: 'materials',
            meta: {
                title: '诚信材料'
            },
            component: () => import('./views/business/materials.vue')
        },
        // 监管评分
        {
            path: '/supervise',
            name: 'supervise',
            meta: {
                title: '监管评分'
            },
            component: () => import('./views/business/supervise.vue')
        },
        // 诚信材料
        {
            path: '/hotServiceManage',
            name: 'hotServiceManage',
            meta: {
                title: '热门服务管理'
            },
            component: () => import('./views/business/hotServiceManage.vue')
        },
        // 用户权限
        {
            path: '/userManage',
            name: 'userManage',
            meta: {
                title: '用户管理'
            },
            component: () => import('./views/sysManage/userManage.vue')
        },
        // 用户详情
        {
            path: '/userDetail',
            name: 'userDetail',
            meta: {
                title: '用户詳情'
            },
            component: () => import('./views/sysManage/userDetail.vue')
        },
        // 新增用户
        {
            path: '/addUser',
            name: 'addUser',
            meta: {
                title: '新增用戶'
            },
            component: () => import('./views/sysManage/addUser.vue')
        },
        // 企业数据统计
        {
            path: '/companyData',
            name: 'companyData',
            meta: {
                title: '企业数据上传统计'
            },
            component: () => import('./views/analysis/companyData.vue')
        },
        // 企业数据统计详情
        {
            path: '/companyDataDetail',
            name: 'companyDataDetail',
            meta: {
                title: '企业数据对接详情'
            },
            component: () => import('./views/analysis/companyDataDetail.vue')
        },
        // 企业数据统计详情
        {
            path: '/detailSearch',
            name: 'detailSearch',
            meta: {
                title: '健康档案上传查询',
                tag: 'detailSearch'
            },
            component: () => import('./views/analysis/detailSearch.vue')
        },
        // 二维业务统计
        {
            path: '/erweiBusiness',
            name: 'erweiBusiness',
            meta: {
                title: '二维业务统计'
            },
            component: () => import('./views/analysis/erweiBusiness.vue')
        },
        // 二维作业车型统计
        {
            path: '/erweiCar',
            name: 'erweiCar',
            meta: {
                title: '二维作业车型统计'
            },
            component: () => import('./views/analysis/erweiCar.vue')
        },
        // 二维作业统计
        {
            path: '/erweiWork',
            name: 'erweiWork',
            meta: {
                title: '二维作业统计'
            },
            component: () => import('./views/analysis/erweiWork.vue')
        },
        // 企业投诉评价查询
        {
            path: '/complainManage',
            name: 'complainManage',
            meta: {
                title: '维修服务评价查询'
            },
            component: () => import('./views/analysis/complainManage.vue')
        },
        // 企业投诉评价详情
        {
            path: '/complainDetail',
            name: 'complainDetail',
            meta: {
                title: '维修服务评价详情'
            },
            component: () => import('./views/analysis/complainDetail.vue')
        },
        // 综合性能检查记录
        {
            path: '/synthesizeWork',
            name: 'synthesizeWork',
            meta: {
                tag: 'synthesizeWork',
                title: '综合性能检查记录'
            },
            component: () => import('./views/analysis/synthesizeWork.vue')
        },
        // 综合性能检查记录
        {
            path: '/synthesizeWorkDetail',
            name: 'synthesizeWorkDetail',
            meta: {
                tag: 'synthesizeWork',
                title: '综合性能检查记录详情'
            },
            component: () => import('./views/analysis/synthesizeWorkDetail.vue')
        },
        // 综合性能检测业务统计
        {
            path: '/synthesizeBusiness',
            name: 'synthesizeBusiness',
            meta: {
                title: '综合性能检测业务统计'
            },
            component: () => import('./views/analysis/synthesizeBusiness.vue')
        },
        // 综合性能检测车型统计
        {
            path: '/synthesizeCar',
            name: 'synthesizeCar',
            meta: {
                title: '综合性能检测车型统计'
            },
            component: () => import('./views/analysis/synthesizeCar.vue')
        },
        // 企业自评
        {
            path: '/selfAssessment',
            name: 'selfAssessment',
            meta: {
                title: '企业自评'
            },
            component: () => import('./views/business/selfAssessment.vue')
        },
        // 企业档案查询
        {
            path: '/companyArch',
            name: 'companyArch',
            meta: {
                title: '企业档案',
                tag: 'companyArch'
            },
            component: () => import('./views/fileManage/companyArch.vue')
        },
        // 企业档案详情
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
        // 检测企业档案详情
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
        // 运输车辆车技档案
        {
            path: '/transportArch',
            name: 'transportArch',
            meta: {
                title: '运输车辆车技档案',
                tag: 'transportArch'
            },
            component: () => import('./views/fileManage/transportArch.vue')
        },
        // 编辑运输车辆车技档案
        {
            path: '/transportDetail',
            name: 'transportDetail',
            meta: {
                title: '运输车辆车技档案详情',
                isDetail: true,
                tag: 'transportArch'
            },
            component: () => import('./views/fileManage/transportDetail.vue')
        },
        // 维修详情
        {
            path: '/workDetail',
            name: 'workDetail',
            meta: {
                title: '维修详情',
                isDetail: true,
                tag: 'detailSearch'
            },
            component: () => import('./views/analysis/workDetail.vue')
        },
        // 角色管理
        {
            path: '/roleManager',
            name: 'roleManager',
            meta: {
                title: '角色管理',
                tag: 'roleManager'
            },
            component: () => import('./views/sysManage/roleManager.vue')
        },
        // 角色详情
        {
            path: '/roleDetail',
            name: 'roleDetail',
            meta: {
                title: '角色详情',
                isDetail: true,
                tag: 'roleManager'
            },
            component: () => import('./views/sysManage/roleDetail.vue')
        },
        // 部门管理
        {
            path: '/departmentManager',
            name: 'departmentManager',
            meta: {
                title: '部门管理'
            },
            component: () => import('./views/sysManage/departmentManager.vue')
        },
        // 菜单管理
        {
            path: '/menuManager',
            name: 'menuManager',
            meta: {
                title: '菜单管理'
            },
            component: () => import('./views/sysManage/menuManager.vue')
        },
        // 发证机关管理
        {
            path: '/certificateOffice',
            name: 'certificateOffice',
            meta: {
                title: '发证机关管理'
            },
            component: () => import('./views/sysManage/certificateOffice.vue')
        },
        // 系统参数管理
        {
            path: '/paramManage',
            name: 'paramManage',
            meta: {
                title: '系统参数管理'
            },
            component: () => import('./views/sysManage/paramManage.vue')
        },
        // 操作日志
        {
            path: '/operationLog',
            name: 'operationLog',
            meta: {
                title: '操作日志'
            },
            component: () => import('./views/sysManage/operationLog.vue')
        },
        // 数据上传日志
        {
            path: '/dataUpload',
            name: 'dataUpload',
            meta: {
                title: '数据上传日志'
            },
            component: () => import('./views/sysManage/dataUpload.vue')
        },
        // 企业备案日志
        {
            path: '/enterpriseRecordLog',
            name: 'enterpriseRecordLog',
            meta: {
                title: '企业备案日志'
            },
            component: () => import('./views/sysManage/enterpriseRecordLog.vue')
        },
        // 从业人员管理
        {
            path: '/employeeManage',
            name: 'employeeManage',
            meta: {
                title: '从业人员管理'
            },
            component: () => import('./views/fileManage/employeeManage.vue')
        },
        // 会员管理
        {
            path: '/memberManage',
            name: 'memberManage',
            meta: {
                title: '会员管理'
            },
            component: () => import('./views/fileManage/memberManage.vue')
        },
        // 通告详情
        {
            path: '/noticeDetail',
            name: 'noticeDetail',
            meta: {
                title: '通告详情',
                hideHeader: true
            },
            component: () => import('./views/common/noticeDetail.vue')
        },
        // 会员详情
        {
            path: '/memberDetail',
            name: 'memberDetail',
            meta: {
                title: '会员详情'
            },
            component: () => import('./views/fileManage/memberDetail.vue')
        },
        // 协会管理
        {
            path: '/societyManager',
            name: 'societyManager',
            meta: {
                title: '协会管理'
            },
            component: () => import('./views/business/societyManager.vue')
        },
        // 链接管理
        {
            path: '/linkType',
            name: 'linkType',
            meta: {
                title: '链接管理'
            },
            component: () => import('./views/business/linkType.vue')
        },
        // 广告管理
        {
            path: '/advertisement',
            name: 'advertisement',
            meta: {
                title: '广告管理'
            },
            component: () => import('./views/business/advertisement.vue')
        },
        // 投诉管理
        {
            path: '/accuseManage',
            name: 'accuseManage',
            meta: {
                title: '企业投诉查询',
                tag: 'accuse'
            },
            component: () => import('./views/analysis/accuseManage.vue')
        },
        // 投诉详情
        {
            path: '/accuseDetail',
            name: 'accuseDetail',
            meta: {
                title: '投诉详情',
                isDetail: true,
                tag: 'accuse'
            },
            component: () => import('./views/analysis/accuseDetail.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    let login = process.env.NODE_ENV === 'development' || getCookie('token')
    let path = to.path

    // 设置头部状态
    Store.commit('setHeaderStatus', !!to.meta.hideHeader)

    // 设置标签页状态
    Store.commit('setTagStatus', !/login/.test(path))

    // 路由白名单
    if (/noticeDetail|login/.test(path)) {
        next()
        return
    }

    // 列表-详情页面相互跳转时，关闭当前页
    if (to.meta.isDetail && to.meta.tag === from.meta.tag) {
        Store.dispatch('delView', from)
    }
    if (from.meta.isDetail && to.meta.tag === from.meta.tag) {
        Store.dispatch('delView', from)
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
