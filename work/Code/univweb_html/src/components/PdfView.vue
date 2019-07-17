<template>
    <transition name="fade">
        <div class="modal" v-if="alert">
            <div class="wrap fade-up" ref="model" :style="{width:width + 'px',height:height + 'px','margin-left': -width/2 + 'px'}">
                <div class="title">
                    {{title}}
                    <img src="../assets/images/audit/icon_close.png" class="icon" @click="cancel">
                </div>
                <div class="alert-content">
                    <iframe v-show="!isIE" width="100%" height="100%" :src="url" frameborder="0"></iframe>
                    <p class="tips" v-show="isIE" isIE>当前浏览器不支持预览</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    computed: {
        isIE () {
            return !!window.ActiveXObject || 'ActiveXObject' in window
        }
    },
    props: ['title', 'alert', 'width', 'height', 'url'],
    components: {},
    methods: {
        cancel () {
            this.$emit('alertCancel', 'cancel')
        }
    },
    updated () {
        if (alert && this.$refs.model) {
            this.$refs.model.style.marginTop = -this.$refs.model.clientHeight / 2 + 'px'
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
    z-index: 5;
    background: rgba(0, 0, 0, 0.5);
    .wrap {
        position: absolute;
        left: 50%;
        top: 50%;
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
            width: 100%;
            height: 100%;
            .tips {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -80px;
                margin-top: 20px;
            }
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
