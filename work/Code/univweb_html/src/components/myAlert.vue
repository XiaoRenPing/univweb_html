<template>
    <transition name="fade">
        <div class="modal" v-show="alert">
            <div class="wrap fade-up" ref="model">
                <div class="title">
                    {{text.title}}
                    <img src="../assets/images/audit/icon_close.png" class="icon" @click="close">
                </div>
                <div class="alert-content">
                    <div class="icon">
                        <img src="../assets/images/question.png" alt="" v-if="text.type === 'confirm'">
                        <img src="../assets/images/notice.png" alt="" v-if="text.type === 'waring'">
                    </div>
                    <p class="msg">{{text.msg}}</p>
                    <div class="btn">
                        <el-button type="primary" @click="ok">确定</el-button><el-button @click="close">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            alert: false,
            text: {
                title: '提示',
                msg: '确定删除此条信息？',
                type: 'confirm'
            }
        }
    },
    components: {},
    methods: {
        close () {
        },
        ok () {
        }
    }
}
</script>

<style lang="less" scoped>
.modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
    .wrap {
        width: 400px;
        height: 280px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -140px;
        margin-left: -200px;
        background: #FEFEFE;
        border-radius: 6px;
        .title {
            height: 39px;
            line-height: 39px;
            text-align: left;
            background-color: #F7F8F9;
            color: #666;
            padding: 0 30px;
            border-radius:6px;
            position: relative;
            .icon {
                position: absolute;
                top: 13px;
                right: 15px;
                cursor: pointer;
            }
        }
        .alert-content {
            .icon {
                text-align: center;
                margin: 30px 0;
            }
            .msg {
                color: #333;
                font-size: 14px;
                text-align: center;
                padding: 0 20px;
                margin-bottom: 38px;
            }
            .btn {
                text-align: center;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .2s;
    .fade-up {
        transform: translateY(0%);
        opacity: 1;
        transition: all .2s;
    }
}
.fade-enter, .fade-leave-to{
    background-color: rgba(0, 0, 0, 0);
    .fade-up {
        opacity: 0;
        transform: translateY(-20%);
    }
}
</style>
<style lang="less">
.alert-content {
    .el-button {
        width: 98px;
        &:first-child {
            margin-right: 20px;
        }
    }
}
</style>
