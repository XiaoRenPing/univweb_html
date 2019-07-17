<!-- 标签页组件 -->
<template>
    <div class="tabs-components" v-if="$store.state.tabShow" @contextmenu.prevent="showMenu">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane
                v-for="item in $store.state.tabsList"
                :key="item.name"
                :label="item.title"
                :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <div class="line" ref="line"></div>
        <ul
            v-show="visible"
            :style="{left:left+'px', top:top+'px'}"
            class="contextmenu">
            <li @click="refreshSelectedTag">刷新</li>
            <li @click="closeSelectedTag">关闭</li>
            <li @click="closeAllTags">关闭所有</li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tabName: '', // 当前右键选择的标签名
            editableTabsValue: '',
            visible: false, // 右键菜单显示
            left: 0, // 右键菜单定位
            top: 0, // 右键菜单定位
            tabIndex: 2
        }
    },
    computed: {
        // 当前tab的name
        activeName () {
            return this.$store.state.activeTab
        }
    },
    watch: {
        // 当前选择标签name
        activeName (val) {
            this.editableTabsValue = val
            this.lineAnimate()
        },
        // 菜单关闭控制
        visible (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
        // 如果跳转至首页则隐藏标签页组件
        '$route' (to) {
            if (to.path === '/home') {
                this.$store.commit('setTabShow', false)
            } else {
                this.$store.commit('setTabShow', true)
            }
        }
    },
    created () {
        this.editableTabsValue = this.$store.state.activeTab
    },
    mounted () {
        this.lineAnimate()
    },
    methods: {
        // 线条动画
        lineAnimate () {
            setTimeout(() => {
                const tabItem = document.querySelector('.el-tabs__item.is-active')
                if (tabItem) {
                    this.$refs.line.style.width = tabItem.offsetWidth + 'px'
                    this.$refs.line.style.left = tabItem.offsetLeft + 'px'
                }
            })
        },
        // 显示菜单
        showMenu (e) {
            if (/el-tabs__item/.test(e.target.className)) {
                this.tabName = e.target.id.replace('tab-', '')
                this.top = e.clientY - 50
                this.left = e.clientX - 230
                this.visible = true
            }
        },
        // 刷新选中标签页
        refreshSelectedTag () {
            this.$store.dispatch('routerTo', { excludeName: this.tabName, nextPath: this.tabName })
        },
        // 关闭选择的标签
        closeSelectedTag () {
            this.removeTab(this.tabName)
        },
        // 关闭所有标签
        closeAllTags () {
            this.$store.dispatch('delAllCache', '/home')
            this.$store.commit('setTabShow', false)
        },
        // 关闭菜单
        closeMenu () {
            this.tabName = ''
            this.visible = false
        },
        // tab点击事件
        tabClick (tab) {
            let tabs = this.$store.state.tabsList
            tabs.forEach((item, index) => {
                if (item.name === tab.name) {
                    this.$store.commit('setActiveTab', item.name)
                    this.$router.push(tabs[index].path)
                }
            })
        },
        // 删除tab
        removeTab (targetName) {
            let tabs = this.$store.state.tabsList
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                            this.$store.dispatch('routerTo', {
                                excludeName: targetName,
                                nextPath: nextTab.path
                            })
                        }
                    }
                })
            }
            this.$store.dispatch('delCache', targetName)
            // 改变路由，如果没有则跳回首页
            let newTabs = tabs.filter(tab => tab.name !== targetName)
            if (!newTabs.length) {
                this.$store.commit('setActiveTab', 'home')
                this.$router.push('/home')
            }
            this.editableTabsValue = activeName
            this.$store.commit('setTabsList', newTabs)
        }
    }
}
</script>

<style lang="less" scoped>
.tabs-components {
    position: relative;
    .line {
        position: absolute;
        bottom: 0;
        height: 2px;
        transition: all .2s;
        background-color: #4D7CFE;
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="less">
.tabs-components {
    .el-tabs--card>.el-tabs__header .el-tabs__item {
        padding-left: 16px;
        padding-right: 12px;
        border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item:hover {
        padding-left: 16px;
        padding-right: 12px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        padding-left: 16px;
        padding-right: 12px;
        color: #4D7CFE;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active:hover {
        padding-left: 16px;
        padding-right: 12px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
        padding-left: 16px;
        padding-right: 12px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable:hover {
        padding-left: 16px;
        padding-right: 12px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
        width: 14px;
    }
    .el-tabs__nav-wrap {
        padding-top: 20px;
        background-color: #E8ECEF;
    }
    .el-tabs--card>.el-tabs__header {
        border: none;
        margin: 0;
    }
}
</style>
