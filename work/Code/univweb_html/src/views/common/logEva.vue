<template>
    <div class="worp-page">
        <div class="worp-content">
            <div class="sec-level clearfix">
                <router-link tag="div" class="level-lis fl" :class="{'active': activeIndex===1}" @click.native="toChooseLis(1)" to="/logEva/operationLog">
                    <div>操作日志</div>
                </router-link>
                <router-link  tag="div" class="level-lis fl" :class="{'active': activeIndex===2}" @click.native="toChooseLis(2)" to="/logEva/dataUpload">
                    <div>数据上传日志</div>
                </router-link>
                <router-link  tag="div" class="level-lis fl" :class="{'active': activeIndex===3}" @click.native="toChooseLis(3)" to="/logEva/enterpriseRecordLog">
                    <div>企业备案日志</div>
                </router-link>
            </div>
            <div class="worp-body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'creditEva',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            activeIndex: 1
        }
    },
    created () {
        let pathnow = this.$route.path
        if (pathnow === '/logEva/dataUpload') {
            this.activeIndex = 2
        } else if (pathnow === '/logEva/enterpriseRecordLog') {
            this.activeIndex = 3
        }
    },
    computed: {},
    filters: {
    },
    // 使用其它组件
    components: {
    },
    // 方法
    watch: {},
    methods: {
        toChooseLis (val) {
            this.activeIndex = val
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.worp-page {
    position: relative;
    .worp-content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        .sec-level {
            height: 44px;
            .level-lis {
                cursor:pointer;
                background: #ffffff;
                box-sizing: border-box;
                line-height: 38px;
                font-size: 14px;
                margin-right: 10px;
                color: #595959;
                padding: 0 40px;
                border-radius:3px 3px 0px 0px;
                border-top: 3px solid #ffffff;
                border-bottom: 3px solid #ffffff;
                &.active {
                    border-top: 3px solid #3E94FE;
                    color: #3E94FE;
                }
            }
        }
    }
}
</style>
