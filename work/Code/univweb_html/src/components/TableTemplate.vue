<template>
    <div class="table-template">
        <tool-bar :title="title">
            <slot name="tool"></slot>
        </tool-bar>
        <div class="content" :class="{siderbar}">
            <div class="sidebar" v-if="siderbar">
                <div class="side_item"
                    @click="select(item[siderTemplate.id])"
                    :class="{active: item[siderTemplate.id] === chooseId}"
                    v-for="item in siderbar"
                    :key="item[siderTemplate.id]">
                    {{item[siderTemplate.name]}}
                </div>
            </div>
            <div class="wrap1">
                <div class="table_box">
                    <el-table
                        :data="tableData"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="">
                        <el-table-column
                            key="1"
                            prop="num"
                            label="序号"
                            width="50">
                        </el-table-column>
                        <slot name="table"></slot>
                    </el-table>
                    <slot name="pagination"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
export default {
    data () {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            chooseId: '1'
        }
    },
    props: [
        'tableData',
        'siderbar', // 左侧菜单栏数据，例：[{enterpriseName: 'xxx', enterpriseId: '1'}]
        'siderTemplate', // 左侧菜单栏数据格式，例：{name: 'enterpriseName', id: 'enterpriseId}
        'title' // 面包屑导航标题
    ],
    components: {
        ToolBar
    },
    created () {
    },
    methods: {
        select (id) {
            this.$emit('siderChange', id)
            this.chooseId = id
        }
    }
}
</script>
<style lang='less' scoped>
.content {
    position: relative;
    .table_box {
        a, span, .operation {
            text-decoration: none;
            color: #359dff;
            cursor: pointer;
        }
        a:hover, span:hover, .operation:hover {
            color: #359dff;
        }
    }
    &.siderbar {
        border-top: 1px solid #ddd;
        .table_box {
            padding: 20px 20px 0 20px;
            margin-left: 250px;
        }
    }
    .sidebar {
        position: absolute;
        width: 250px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 30px;
        box-sizing: border-box;
        .side_item {
            width: 190px;
            height: 38px;
            border-radius: 4px;
            margin: 10px auto 0;
            font-size: 14px;
            color: #666666;
            line-height: 40px;
            border: 1px solid #dddddd;
            background-color: #fff;
            transition: all .2s;
            cursor: pointer;
            &:first-child {
                margin-top: 0;
            }
            &.active {
                background-color: #359dff;
                border: 1px solid #359dff;
                color: #ffffff;
            }
            &:hover {
                color: #ffffff;
                background-color: #359dff;
                border: 1px solid #359dff;
            }
        }
    }
}
</style>
<style lang="less">
.table-template {
    .table_box {
        a, span, .operation {
            text-decoration: none;
            color: #666;
            cursor: pointer;
        }
        .el-button--text {
            span {
                color: #359dff;
            }
        }
        a:hover, span:hover, .operation:hover {
            color: #359dff;
        }
    }
}
</style>
