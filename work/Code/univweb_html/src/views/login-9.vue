
<template lang="html">
    <div class="login">
        <div class="login_tit">
            <img src="../assets/images/logo-login.png">
            <h4>{{title}}</h4>
        </div>
        <div class="inner_box" ref="loginBox">
            <div class="tit">欢迎登录</div>
            <div class="name_box ipt_box">
                <img src="../assets/images/icon-account.png">
                <input type="text" v-model="username" name="" placeholder="请输入用户名">
            </div>
            <div class="name_box ipt_box">
                <img src="../assets/images/icon-password.png">
                <input type="password" v-model="password" name="" placeholder="请输入密码">
            </div>
            <p class="login_btn" :class="{active:loginFlag=== true}" @click="login">登录</p>
        </div>
    </div>
</template>

<script type="text/javascript">
import { setCookie } from '@/utils/cookie.js'
export default {
    name: 'login',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            username: '', // 用户名
            password: '', // 密码
            loginFlag: false,
            title: '南宁市机动车维修与检测监督管理系统'
        }
    },
    created () {
        this.getTitle()
    },
    mounted () {
        this.enterLogin()
    },
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {
        // 回车自动登陆
        enterLogin () {
            this.$refs.loginBox.addEventListener('keydown', e => {
                e.stopPropagation()
                if (e.keyCode === 13) {
                    this.login()
                }
            })
        },
        // 获取主标题
        getTitle () {
            this.$post('external/index')
                .then(res => {
                    if (res.status === 200) {
                        // res.data.sysTitle = '红河哈尼族彝族自治州维修协会智能服务系统'
                        setCookie('info3', JSON.stringify(res.data))
                        this.title = res.data.sysTitle
                        document.title = res.data.sysTitle
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        login () {
            if (this.loginFlag) {
                return
            }
            this.loginFlag = true
            this.$post('external/sysUser/login', {
                'data': {
                    'userName': this.username,
                    'password': this.password
                }
            }).then(res => {
                if (res.status === 200) {
                    res.username = this.username
                    setCookie('token', res.token, 1)
                    setCookie('user', JSON.stringify(res), 1)
                    this.$router.push('/')
                } else {
                    this.$alert(res.message, '提示')
                }
                this.loginFlag = false
            }).catch(err => {
                this.$alert('网络错误，请重试！', '提示')
                console.log(err)
                this.loginFlag = false
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/images/login-bg-big.png) no-repeat;
    background-size: 100% 100%;
    h3 {
        color: #ffffff;
        font-size: 36px;
        font-weight: blod;
        position: absolute;
        top: -100px;
        left: -400px;
        width: 1340px;
        text-align: center;
    }
    .login_tit {
        position: absolute;
        top: 40px;
        left: 60px;
        vertical-align: middle;
        overflow: hidden;
        img {
            width: 43px;
            height: 56px;
            float: left;
        }
        h4 {
            float: left;
            height: 56px;
            margin-left: 20px;
            line-height: 56px;
            font-size: 26px;
            color: #ffffff;
        }
    }
    .inner_box {
        position: absolute;
        top: 50%;
        margin-top: -220px;
        right: 16%;
        width: 420px;
        height: 430px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 6px 8px rgba(0,0,0,0.1);
        border-radius:10px;
        .tit {
            height: 140px;
            line-height: 140px;
            text-align: center;
            font-size: 22px;
            color: #293140;
            font-weight: 500;
        }
        .ipt_box {
            position: relative;
            width: 330px;
            height: 42px;
            line-height: 42px;
            background: #ffffff;
            border-radius: 4px;
            margin: 0 auto 30px;
            border: 1px solid #D9D9D9;
            img {
                float: left;
                position: absolute;
                width: 17px;
                height: 18px;
                left: 12px;
                top: 11px;
            }
            input {
                width: 290px;
                height: 40px;
                padding-left: 40px;
                border: none;
                font-size: 15px;
                color: #333;
                outline: none;
            }
        }
        .login_btn {
            width: 300px;
            height: 42px;
            border-radius: 4px;
            margin: 50px auto 0;
            line-height: 42px;
            background-color: #1890FF;
            transition: all .2s;
            font-size: 18px;
            color: #ffffff;
            cursor: pointer;
            &.active {
                background-color: #ccc;
            }
        }
    }
}
@media screen and (max-width: 1400px) {
    .login {
        h3 {
            font-size: 30px;
            left: -438px;
            top: -86px;
        }
        .inner_box {
            width: 400px;
            height: 410px;
            margin-top: -220px;
            margin-left: -230px;
            .login_btn {
                width: 280px;
                height: 42px;
                line-height: 42px;
            }
            .ipt_box {
                width: 310px;
                height: 42px;
                line-height: 42px;
                margin: 0 auto 30px;
                input {
                    width: 260px;
                    height: 40px;
                    border-radius: 4px;
                }
                img {
                    height: 16px;
                }
            }
        }
    }
}
</style>
