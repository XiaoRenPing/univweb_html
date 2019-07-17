<!-- 头部组件 -->
<template>
    <div class="header-top">
        <div class="main-title fl">
            <!-- 南宁市机动车维修与检测监督管理系统 -->
            <img class="icon-fold-img" src="../assets/images/icon-unfold.png" alt="" v-if="!$store.state.sidebarFold" @click="$store.state.sidebarFold = !$store.state.sidebarFold">
            <img class="icon-fold-img" src="../assets/images/icon-fold.png" alt="" v-else @click="$store.state.sidebarFold = !$store.state.sidebarFold">
            <h4 class="title-h">{{title}}</h4>
        </div>
        <div class="user fr">
            <!-- <div class="warning_box" @click="clickWarn" style="z-index: 3;cursor:pointer">
                <img src="../assets/images/icon-tixing.png">
                <span v-show="total">{{total > 99 ? '99+' : total}}</span>
            </div> -->
            <div class="avatar">
                <img :src="avatar" alt="" v-if="avatar">
                <img src="../assets/images/icon-user-my.jpg" alt="">
                <!-- <img src="../assets/images/icon-user-default.png" alt="" v-else> -->
            </div>
            <div class="name hidde-txt">{{name}}</div>
            <img class="login-out" src="../assets/images/icon-guanji.png" alt="" @click="loginOut">
            <span class="outspan" @click="loginOut">注销</span>
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

<script>
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
import { getCookie, clearCookie } from '@/utils/cookie.js'
export default {
    name: 'header-top',
    data () {
        return {
            title: '',
            name: 'user',
            avatar: '',
            total: 55,
            pageNum: 1,
            pageSize: 10,
            tableData: [],
            showAlert: false
        }
    },
    created () {
        this.getCommonParams()
        try {
            this.name = JSON.parse(getCookie('userData')).name
            this.avatar = JSON.parse(getCookie('userData')).avatar
        } catch (e) {}
        this.getWranList()
        // setInterval(() => {
        //     this.getWranList()
        // }, 10000)
    },
    components: {
        Modal
    },
    methods: {
        // 获取公共参数
        getCommonParams () {
            if (getCookie('info3')) {
                this.info = JSON.parse(getCookie('info3'))
                this.$store.commit('setInfo', this.info)
                this.title = document.title = this.info.sysTitle
            }
        },
        loginOut () {
            this.$myAlert({
                title: '提示',
                msg: '确定退出登录吗？'
            }).then(() => {
                this.$router.push('/login')
                this.$store.dispatch('delAllViews')
                this.$post('/external/loginOut')
                    .then(res => {
                        clearCookie('token')
                        this.$router.push('/login')
                        this.$store.dispatch('delAllViews')
                    })
                    .catch(() => {
                        clearCookie('token')
                        this.$router.push('login')
                    })
            }).catch(() => {
            })
        },
        // 点击消息提醒
        clickWarn () {
            this.showAlert = true
            this.getWranList()
        },
        closeAlert () {
            this.showAlert = false
        },
        // 获取消息列表
        getWranList () {
            this.$post('external/affaires/useraffaires', {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    this.tableData = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alet(res.message, '提示')
                }
            })
        },
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
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getWranList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getWranList()
        }
    }
}
</script>

<style lang='less' scoped>
.header-top {
    height: 59px;
    border-bottom: 1px solid #E8ECEF;
    background: #fff;
    padding-right: 20px;
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
    .main-title {
        line-height: 60px;
        color: #7C96AB;
        font-size: 26px;
        padding-left: 20px;
        font-weight: bold;
        overflow: hidden;
        .icon-fold-img {
            width: 22px;
            height: 22px;
            padding-top: 20px;
            cursor: pointer;
            float: left;
        }
        .title-h {
            font-size: 18px;
            color: #293140;
            height: 60px;
            padding-left: 30px;
        }
    }
    .user {
        line-height: 60px;
        .warning_box {
            height: 24px;
            width: 24px;
            margin-right: 20px;
            vertical-align: middle;
            display: inline-block;
            position: relative;
            img {
                height: 24px;
                width: 24px;
                position: absolute;
                left: 0;
                top: 0;
            }
            span {
                position: absolute;
                left: 15px;
                top: -5px;
                background: #f75757;
                border-radius: 10px;
                padding: 0 3px;
                font-size: 12px;
                color: #fff;
                line-height: 15px
            }
        }
        .avatar {
            height: 36px;
            width: 36px;
            border-radius: 50%;
            overflow: hidden;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .avatar, .name, .date, .login-out, .outspan{
            margin-right: 20px;
            display: inline-block;
            vertical-align: middle;
            color: #595959;
        }
        .login-out {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            line-height: 62px;
            cursor: pointer;
        }
        .name {
            font-size: 14px;
            color: #595959;
            max-width: 100px;
        }
        .outspan {
            margin-right: 0;
            font-size: 14px;
            color: #595959;
            cursor: pointer;
        }
    }
}
</style>
