<!-- 布局组件 -->
<template>
    <div class="layout">
        <nav-menu></nav-menu>
        <div class="container" :class="{ 'container--fold':this.$store.state.sidebarFold }">
            <header-top></header-top>
            <!-- <tabs></tabs> -->
            <div class="wrap">
                <transition name="el-fade-in-linear" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import HeaderTop from '@/components/HeaderTop'
// import Tabs from '@/components/Tabs'
export default {
    data () {
        return {
        }
    },
    components: {
        NavMenu,
        HeaderTop
    },
    computed: {
        excludeComponents () {
            return this.$store.state.excludeComponents
        }
    },
    methods: {
    }
}
</script>

<style lang='less' scoped>
.layout {
    height: 100%;
    .container {
        margin-left: 256px;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        transition: all .3s;
        .wrap {
            margin-top: 20px;
            margin-right: 20px;
            // margin-bottom: 60px;
            margin-left: 20px;
            min-height: 778px;
            flex: 1;
        }
        .wrap-bottom {
            text-align: center;
            color: #BEC8D3;
            height: 60px;
            line-height: 60px;
        }
    }
    .container--fold {
        margin-left: 64px;
    }
}

</style>
