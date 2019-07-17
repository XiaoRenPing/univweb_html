<template>
    <transition name="fade">
        <div class="toast" v-show="toast">
            <div class="wrap fade-up">
                <div class="title">
                    提示
                    <img src="../assets/images/audit/icon_close.png" class="title-icon" @click="confirm">
                </div>
                <div class="icon">
                    <img src="../assets/images/succeed.png" alt="">
                </div>
                <p class="tips">{{text.msg}}</p>
                <div class="btn">
                    <button @click="confirm">知道了</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            toast: false,
            text: {
                msg: '确定删除此条信息？',
                type: 'success',
                callback: () => {}
            }
        }
    },
    methods: {
        confirm () {
            this.toast = false
            this.text.callback && this.text.callback()
        }
    }
}
</script>

<style lang='less' scoped>
.toast {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    .wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        background: #FEFEFE;
        border-radius: 6px;
        margin-top: -140px;
        margin-left: -200px;
        width: 400px;
        height: 280px;
        .title {
            height: 39px;
            line-height: 39px;
            text-align: left;
            background-color: #F7F8F9;
            color: #666;
            padding: 0 30px;
            border-radius:6px;
            position: relative;
            .title-icon {
                position: absolute;
                top: 13px;
                right: 15px;
                cursor: pointer;
            }
        }
        .btn {
            text-align: center;
            margin-top: 36px;
            button {
                width: 98px;
                height: 34px;
                line-height: 1;
                border: 1px solid #ccc;
                border-radius: 3px;
                color: #999;
                font-size: 14px;
                outline: none;
                background: #fff;
                cursor: pointer;
            }
        }
        .icon {
            text-align: center;
            margin-top: 30px;
        }
        .tips {
            text-align: center;
            margin-top: 26px;
            color: #333;
            font-size: 20px;
        }
    }
}
.fade-enter-active, .fade-leave-active {
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .3s;
    .fade-up {
        transform: translateY(0%);
        opacity: 1;
        transition: all .3s;
    }
}
.fade-enter, .fade-leave-to{
    background-color: rgba(0, 0, 0, 0);
    .fade-up {
        opacity: 0;
        transform: translateY(50%);
    }
}
</style>
