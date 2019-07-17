<template>
    <div class="page">
        <div class="content">
            <tool-bar :title="'用户管理>新增用户'">
                <el-button icon="el-icon-tickets" type="primary" @click="saveUser">保存</el-button>
                <button class="back_btn" @click="goBack">返回</button>
            </tool-bar>
            <div class='wrap'>
                <div class="content2">
                    <h4>新增用户(*星号为必填项)</h4>
                    <div class="line">
                        <label for=""><i class="important">*&nbsp;</i>用户名：</label>
                        <el-input class="tool_ipt" v-model="userName" ></el-input>
                    </div>
                    <div class="line">
                        <label for=""><i class="important">*&nbsp;</i>显示名：</label>
                        <el-input class="tool_ipt" v-model="personName" ></el-input>
                    </div>
                    <div class="line">
                        <label for=""><i class="important">*&nbsp;</i>登录密码：</label>
                        <el-input class="tool_ipt" type="password" v-model="password" ></el-input>
                    </div>
                    <div class="line">
                        <label for=""><i class="important">*&nbsp;</i>手机号：</label>
                        <el-input class="tool_ipt" v-model="mobile" ></el-input>
                    </div>
                    <div class="line sideList clearfix">
                        <label for="" class="fl"><i class="important">*&nbsp;</i>用户权限：</label>
                        <el-checkbox-group
                            v-model="regionPermissions"
                            :min="1"
                            class="group">
                            <el-checkbox v-for="item in sideList" :label="item.regionId" :title="item.regionName" :key="item.regionId">{{item.regionName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="line">
                        <label for="">邮箱：</label>
                        <el-input class="tool_ipt" v-model="email" ></el-input>
                    </div>
                    <div class="line">
                        <label for="" class="fl">备注：</label>
                        <el-input type="textarea" :resize="'none'" class="tool_area" v-model="remark" ></el-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'addUser',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            userName: '',
            personName: '',
            password: '',
            mobile: '',
            email: '',
            remark: '',
            input: '',
            value: '',
            sideList: [],
            regionPermissions: []
        }
    },
    created () {
        if (this.$route.query.userId) {
            this.queryData()
        }
        this.$post('external/city/findLoginCityRegion', {})
            .then(res => {
                if (res.status === 200) {
                    this.sideList = res.datas
                } else {
                    this.$alert(res.message, '提示')
                }
            })
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        goBack () {
            this.$myAlert({
                title: '提示',
                msg: '信息尚未保存,是否继续？'
            }).then(() => {
                this.$router.push('/userManage')
            }).catch(() => {
                console.log('取消')
            })
        },
        // 获取用户详情数据
        queryData () {
            this.$post('bas/user/view', {
                'data': {
                    'userId': this.$route.query.userId
                }
            }).then(res => {
                if (res.status === 200) {
                    this.userName = res.data.userName
                    this.personName = res.data.personName
                    this.password = res.data.password
                    this.mobile = res.data.mobile
                    this.email = res.data.email
                    this.remark = res.data.remark
                    this.regionPermissions = res.data.regionPermissions.split(',')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        saveUser () {
            if (!this.userName) {
                this.$alert('请填写用户名', '提示')
                return
            }
            if (!this.personName) {
                this.$alert('请填写显示名', '提示')
                return
            }
            if (!this.password) {
                this.$alert('请填写密码', '提示')
                return
            }
            if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
                this.$alert('请输入正确的手机号码', '提示')
                return
            }
            if (!this.regionPermissions.length) {
                this.$alert('请选择用户权限', '提示')
                return
            }
            if (!this.$route.query.userId) {
                this.$post('/bas/user/add', {
                    data: {
                        'userName': this.userName,
                        'personName': this.personName,
                        'password': this.password,
                        'mobile': this.mobile,
                        'email': this.email,
                        'remark': this.remark,
                        'regionPermissions': this.regionPermissions + ''
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$alert('添加用户成功', '提示')
                        this.$router.push('/userManage')
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.$post('/bas/user/edit', {
                    data: {
                        'userId': this.$route.query.userId,
                        'userName': this.userName,
                        'personName': this.personName,
                        'password': this.password,
                        'mobile': this.mobile,
                        'email': this.email,
                        'remark': this.remark,
                        'regionPermissions': this.regionPermissions + ''
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '编辑用户成功',
                            callback: () => {
                                this.$router.push('/userManage')
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('网络错误', '提示')
                })
            }
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    // height: 100%;
    .important {
        font-style: normal;
        color: red;
    }
    .search_btn {
        margin-right: 20px;
    }
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        top: 0;
        .wrap {
            border-top: 1px solid #ddd;
            .content2 {
                h4 {
                    text-align: left;
                    margin-top: 30px;
                }
                text-align: left;
                padding-left: 50px;
                .line {
                    margin-top: 20px;
                    &.sideList {
                        .group {
                            width: 800px;
                            // margin-left: 118px;
                            display: inline-block;
                            height: 90px;
                            label {
                                text-align: left;
                                margin-left: 0;
                                margin-bottom: 10px;
                                padding-left: 6px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
                label {
                    display: inline-block;
                    width: 160px;
                    text-align: right;
                    color: #666;
                    font-size: 14px;
                }
                .tool_ipt {
                    width: 300px;
                }
                .tool_area {
                    width: 600px;
                }
            }
        }
    }
}
</style>
