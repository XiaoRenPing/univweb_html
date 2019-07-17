<template>
    <div class="userManage">
        <div class="content">
            <tool-bar>
                <div class="fl">
                    <label>用户名或显示名：</label>
                    <el-input class="tool_ipt" v-model="personName" placeholder="请输入内容"></el-input>
                </div>
                <div class="fr">
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('sys:user:find')">查询</el-button>
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
                        width="100"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="userNickname"
                        label="显示名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="roleName"
                        label="所属角色"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        >
                        <template slot-scope="scope">
                            {{scope.row.status === 1 ? '启用' : '禁用'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="userEmail"
                        label="邮箱"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="userMobile"
                        label="手机号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="goDetail(scope.row.userId)" :disabled="!$checkAuth('sys:user:view')">详情</el-button>
                            <el-button type="text" size="small" @click="deleteUser(scope.row)" :disabled="!$checkAuth('sys:user:delete')" v-if="!/admin/.test(scope.row.userName)">删除</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status===1 && !/admin/.test(scope.row.userName)" @click="disableUser(scope.row)" :disabled="!$checkAuth('sys:user:status')">禁用</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status===0 && !/admin/.test(scope.row.userName)" @click="enableUser(scope.row)" :disabled="!$checkAuth('sys:user:status')">启用</el-button>
                            <el-button type="text" size="small" @click="reset(scope.row)"  v-if="!/admin/.test(scope.row.userName)" :disabled="!$checkAuth('sys:user:resetpass')">重置密码</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="userId ? '编辑用户' : '添加用户'"
            :width="800"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="model clearfix">
                <div class="left">
                    <div class="item">
                        <label for=""><i class="important">*</i>用户名：</label>
                        <el-input class="tool_ipt" maxlength="20" v-model="userName" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="item">
                        <label for=""><i class="important">*</i>密码：</label>
                        <el-input class="tool_ipt" maxlength="16" v-model="userPass" placeholder="请输入密码" :type="pswDisplay? 'text' : 'password'">
                            <img slot="suffix" title="隐藏密码" v-if="pswDisplay" class="icon-font" @click="pswDisplayChange('pswDisplay')" src="../../assets/images/hide.png" alt="">
                            <img slot="suffix" title="显示密码" v-if="!pswDisplay" class="icon-font" @click="pswDisplayChange('pswDisplay')" src="../../assets/images/xianshi.png" alt="">
                        </el-input>
                    </div>
                    <div class="item">
                        <label for=""><i class="important">*</i>确认密码：</label>
                        <el-input class="tool_ipt" maxlength="16" v-model="confirmPass" placeholder="请输入确认密码" :type="confpswDisplay? 'text' : 'password'">
                            <img slot="suffix" title="隐藏密码" v-if="confpswDisplay" class="icon-font" @click="pswDisplayChange('confpswDisplay')" src="../../assets/images/hide.png" alt="">
                            <img slot="suffix" title="显示密码" v-if="!confpswDisplay" class="icon-font" @click="pswDisplayChange('confpswDisplay')" src="../../assets/images/xianshi.png" alt="">
                        </el-input>
                    </div>
                    <div class="item">
                        <label for=""><i class="important">*</i>显示名：</label>
                        <el-input class="tool_ipt" maxlength="50" v-model="userNickname" placeholder="请输入显示名"></el-input>
                    </div>
                    <div class="item">
                        <label for=""><i class="important">*</i>手机号码：</label>
                        <el-input class="tool_ipt" maxlength="11" v-model="userMobile" placeholder="请输入手机号码"></el-input>
                    </div>
                    <div class="item">
                        <label for=""><i class="important">*</i>状态：</label>
                        <div class="tool_ipt">
                            <el-radio v-model="radio" :label="1">启用</el-radio>
                            <el-radio v-model="radio" :label="0">禁用</el-radio>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <label for="" style="vertical-align:top;">点击图片&nbsp;&nbsp;&nbsp;<br>上传用户头像：</label>
                        <upload
                            class="upload-demo"
                            :on-success="uploadSuccess"
                            :before-upload="beforeAvatarUpload"
                            style="display:inline-block">
                            <div v-show="!picurl" class="default-img">
                                <img src="../../assets/images/audit/default_icon_photo.png" alt="用户头像">
                            </div>
                            <div ref="carImg" v-show="picurl" class="pic-img">
                                <img ref="picurl" :src="picurl" alt="用户头像" >
                            </div>
                        </upload>
                    </div>
                    <div class="item role">
                        <label for=""><i class="important">*</i>所属角色：</label>
                        <el-select  class="tool_ipt" v-model="role" multiple placeholder="请选择">
                            <el-option
                            v-for="item in roleList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <label for="">邮箱：</label>
                        <el-input class="tool_ipt" maxlength="50" v-model="userEmail" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <button class="next-btn btn1" @click="sureAlert">确定</button>
                <button class="close-btn btn2" @click="closeAlert">取消</button>
            </div>
        </Modal>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="addNotice" :disabled="!$checkAuth('sys:user:add')">新增用户</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import { setNum } from '@/utils/tools.js'
import { getCookie } from '@/utils/cookie.js'
import Modal from '@/components/Modal.vue'
import upload from '@/components/upload.vue'
import toolBar from '@/components/ToolBar.vue'
export default {
    name: 'userManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '权限管理', path: '' }, { title: '用户管理', path: '' }
            ],
            uploadURL: window.uploadURL, // 上传地址
            userName: '', // 用户名
            userPass: '', // 密码
            confirmPass: '', // 确认密码
            userEmail: '', // 邮箱
            userMobile: '', // 手机号
            userNickname: '', // 显示名
            userId: '', // 当前编辑的用户
            role: [], // 角色
            roleList: [], // 角色列表
            picurl: '', // 头像地址
            radio: 1, // 用户状态
            showAlert: false, // 用户弹窗
            pswDisplay: false, // 密码是否显示隐藏
            confpswDisplay: false, // 确认密码是否显示隐藏
            personName: '', // 搜索用户名
            currentUserName: '', // 当前编辑的用户名
            pageSize: 10,
            pageNum: 1, // 当前页数
            total: 0,
            isAdmin: false,
            dataList: []
        }
    },
    created () {
        if (getCookie('user')) {
            this.isAdmin = /admin/.test(JSON.parse(getCookie('user')).username)
        }
        this.queryData()
        this.getRoleList()
    },
    computed: {},
    // 使用其它组件
    components: {
        toolBar,
        BreadFoot,
        Sidebar,
        upload,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        // 切换密码框状态
        pswDisplayChange (type) {
            if (getCookie('user')) {
                var user = JSON.parse(getCookie('user'))
                if (this.userName === user.username || /admin/.test(user.username) || this.userId === '') {
                    this[type] = !this[type]
                } else {
                    this.$alert('您不能查看其它账号密码！', '提示')
                }
            } else {
                this.$alert('您不能查看其它账号密码！', '提示')
            }
        },
        // 获取角色列表
        getRoleList () {
            let url = /admin/.test(JSON.parse(getCookie('user')).username) ? 'sys/role/rolelist' : 'sys/role/findLoginUserRole'
            this.$post(url, {})
                .then(res => {
                    if (res.status === 200) {
                        this.roleList = res.data
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 生成随机密码
        randomPsw () {
            const en = 'abcdefghijklmnopqrstuvwxyz'.split('')
            const num = '0123456789'.split('')
            let len = 6
            let psw = ''
            while (len > 0) {
                psw += Math.random() > 0.5 ? num[parseInt(Math.random() * 10)] : en[Math.floor(Math.random() * 25)]
                len--
            }
            return psw
        },
        // 重置密码
        reset (user) {
            let newPsw = this.randomPsw()
            this.$myAlert({
                msg: `确定要重置账号 "${user.userName}" 的密码为 ${newPsw} 吗？`
            }).then(res => {
                this.$post('sys/user/resetpass', {
                    confirmPass: newPsw,
                    data: {
                        userId: user.userId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '重置密码成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            }).catch(() => {
            })
        },
        // 长传成功
        uploadSuccess (res, file, filList) {
            var radio = this.$refs.carImg.offsetWidth / this.$refs.carImg.offsetHeight
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs.picurl.style.width = '100%'
                } else {
                    _this.$refs.picurl.style.height = '100%'
                }
                _this.picurl = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        // 上传之前钩子
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!')
            }
            return isJPG && isLt2M
        },
        closeAlert () {
            this.showAlert = false
            this.userName = ''
            this.userPass = ''
            this.confirmPass = ''
            this.userNickname = ''
            this.userMobile = ''
            this.currentUserName = ''
            this.picurl = ''
            this.role = []
            this.radio = 1
            this.userId = ''
            this.pswDisplay = false
            this.confpswDisplay = false
        },
        sureAlert () {
            var user = (getCookie('user') && JSON.parse(getCookie('user'))) || {}
            if (/admin/.test(this.currentUserName) && !/admin/.test(user.username)) {
                this.$alert('您不能修改管理员用户信息！', '提示')
                return
            }
            if (!this.userName) {
                this.$alert('请填写用户名！', '提示')
                return
            }
            if (/admin/.test(this.userName) && !/admin/.test(user.username)) {
                this.$alert('用户名不能使用 "admin" 关键字！', '提示')
                return
            }
            // if (!(/^[a-zA-Z\d]{6,16}$/.test(this.userPass) && /\d/.test(this.userPass) && /[a-zA-Z]/.test(this.userPass))) {
            //     this.$alert('密码应为6-16位数字与字母组合！', '提示')
            //     return
            // }
            if (this.confirmPass !== this.userPass) {
                this.$alert('两次输入的密码必须一致！', '提示')
                return
            }
            if (!this.userNickname) {
                this.$alert('请输入显示名！', '提示')
                return
            }
            if (!this.userMobile) {
                this.$alert('请输入手机号！', '提示')
                return
            }
            if (!/^1\d{10}/.test(this.userMobile)) {
                this.$alert('请输入正确的11位手机号！', '提示')
                return
            }
            if (!this.role.length) {
                this.$alert('请选中角色！', '提示')
                return
            }
            if (this.userEmail && !/^\w+@\w+\.\w+/.test(this.userEmail)) {
                this.$alert('请输入正确的邮箱地址！', '提示')
                return
            }
            var obj = {
                data: {
                    username: this.userName,
                    password: this.userPass,
                    email: this.userEmail ? this.userEmail : null,
                    mobile: this.userMobile,
                    nickname: this.userNickname,
                    status: this.radio,
                    icon: this.picurl
                },
                roleIds: this.role,
                confirmPass: this.confirmPass
            }
            var url = ''
            var msg = ''
            if (this.userId) {
                url = 'sys/user/edit'
                obj.data.userId = this.userId
                msg = '编辑成功'
            } else {
                url = 'sys/user/add'
                msg = '添加成功'
            }
            this.$post(url, obj)
                .then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: msg
                        })
                        this.closeAlert()
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 禁用用户
        disableUser (info) {
            this.$myAlert({
                msg: `确定要禁用账号 "${info.userName}" 吗？`
            }).then(res => {
                this.$post('sys/user/status', {
                    data: {
                        userId: info.userId,
                        status: 0
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '禁用成功'
                        })
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        },
        // 启用
        enableUser (info) {
            this.$myAlert({
                msg: `确定要启用账号 "${info.userName}" 吗？`
            }).then(res => {
                this.$post('sys/user/status', {
                    data: {
                        userId: info.userId,
                        status: 1
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '启用成功'
                        })
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        },
        // 删除用户
        deleteUser (item) {
            this.$myAlert({
                type: 'waring',
                msg: `确定要删除账号 "${item.userName}" 吗？`
            }).then(res => {
                this.$post('sys/user/delete', {
                    data: {
                        userId: item.userId
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
                    this.$alert('网络错误，请重试！', '提示')
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
        // 编辑
        goDetail (id) {
            this.userId = id
            this.showAlert = true
            this.$post('sys/user/view', {
                data: {
                    userId: id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.currentUserName = res.data.username
                    this.userName = res.data.username
                    this.userNickname = res.data.nickname
                    this.userMobile = res.data.mobile
                    this.imgLoad('picurl', res.data.icon)
                    this.userPass = res.data.password
                    this.confirmPass = res.data.password
                    this.role = res.data.roleList.map(item => {
                        return item.roleId
                    })
                    this.radio = res.data.status
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 图片加载后处理
        imgLoad (child, url) {
            var radio = 222 / 134
            var _this = this
            var img = new Image()
            img.src = url
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs[child].style.width = '100%'
                } else {
                    _this.$refs[child].style.height = '100%'
                }
                _this[child] = url
            }
        },
        // 新增用户
        addNotice () {
            this.showAlert = true
        },
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('sys:user:find')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('sys/user/find', {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize,
                'data': {
                    'username': this.personName
                }
            }).then(res => {
                if (res.status === 200) {
                    this.total = res.data.total
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 重置
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
.userManage {
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
    .model {
        padding: 20px 0;
        .important {
            color: red;
            font-style: normal;
            margin-right: 3px;
        }
        .item {
            margin-top: 20px;
            &.role {
                margin-top: 13px;
            }
            .icon-font {
                width: 20px;
                vertical-align: middle;
                cursor: pointer;
            }
        }
        .left {
            width: 50%;
            float: left;
        }
        .right{
            width: 50%;
            float: left;
            text-align: left;
            .upload-demo {
                width: 222px;
                height: 134px;
                padding: 6px;
                border: 1px solid #ddd;
                text-align: center;
                .default-img {
                    width: 100%;
                    height: 100%;
                    line-height: 128px;
                    background-color: #eee;
                    img {
                        width: 60px;
                        vertical-align: middle;
                    }
                }
                .pic-img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .tool_ipt {
            width: 234px;
            display: inline-block;
            text-align: left;
        }
        label {
            width: 100px;
            display: inline-block;
            text-align: right;
            color: #666666;
            font-size: 14px;
        }
        .el-radio {
            width: 50px;
            text-align: left;
        }
    }
    .btn-box {
        text-align: center;
        margin: 20px 0 40px 0;
        button {
            width: 98px;
            height: 34px;
            border-radius: 4px;
            cursor: pointer;
            outline: none;
        }
        .btn1 {
            background: #359dff;
            color: #ffffff;
            border: none;
            margin-right: 20px;
        }
        .btn2 {
            border: 1px solid #dbdbdb;
            background: #ffffff;
        }
    }
}
</style>
<style lang="less">
.userManage {
    .upload-demo {
        .el-upload {
            width: 100%;
            height: 100%;
        }
    }
    .el-input__inner {
        height: 34px;
        line-height: 34px;
    }
    .model {
        .el-input__suffix-inner {
            line-height: 34px;
        }
    }
}
</style>
