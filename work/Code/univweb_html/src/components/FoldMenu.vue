<!-- 折叠菜单 -->
<template>
    <div class="list">
        <div v-for="item in data" :key="item.id" class="first">
            <div class="fold" :class="{active:item.show}" v-if="item.items" @click="menuFold(item)"></div>
            <el-checkbox v-model="item.checked" @change="firstChange(item)">{{item.name}}</el-checkbox>
            <div class="second" v-show="item.items && item.show" v-for="secItem in item.items" :key="secItem.id">
                <div class="fold" :class="{active:secItem.show}" v-if="secItem.items" @click="menuFold(secItem)"></div>
                <el-checkbox v-model="secItem.checked" @change="firstChange(secItem)">{{secItem.name}}</el-checkbox>
                <div class="third" v-show="secItem.items && secItem.show" v-for="thirdItem in secItem.items" :key="thirdItem.id">
                    <el-checkbox v-model="thirdItem.checked">{{thirdItem.name}}</el-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: [
                {
                    name: '首页',
                    show: true,
                    id: '11',
                    checked: false,
                    items: [
                        {
                            name: '备案企业数据上传',
                            id: '01',
                            checked: false
                        },
                        {
                            name: '企业经营红榜',
                            id: '02',
                            checked: false
                        },
                        {
                            name: '企业经营黑榜',
                            id: '03',
                            checked: false
                        },
                        {
                            name: '通告信息',
                            id: '04',
                            checked: false
                        }
                    ]
                },
                {
                    name: '业务操作',
                    show: true,
                    id: '12',
                    checked: false,
                    items: [
                        {
                            name: '通告信息发布',
                            show: true,
                            id: '13',
                            checked: false,
                            items: [
                                {
                                    name: '查询',
                                    id: '05',
                                    checked: false
                                },
                                {
                                    name: '新增',
                                    id: '06',
                                    checked: false
                                },
                                {
                                    name: '编辑',
                                    id: '07',
                                    checked: false
                                },
                                {
                                    name: '删除',
                                    id: '08',
                                    checked: false
                                }
                            ]
                        },
                        {
                            name: '企业备案审核',
                            show: true,
                            checked: false,
                            id: '14',
                            items: [
                                {
                                    name: '备案审核',
                                    id: '09',
                                    checked: false
                                },
                                {
                                    name: '审核详情',
                                    id: '10',
                                    checked: false
                                }
                            ]
                        }
                    ]
                }
            ],
            checked: '',
            secondList: []
        }
    },
    components: {
    },
    methods: {
        // 菜单收缩
        menuFold (menu) {
            menu.show = !menu.show
        },
        firstChange (menu) {
            if (menu.items) {
                menu.items.forEach(item => {
                    item.checked = menu.checked
                    if (item.items) {
                        item.items.forEach(itemB => {
                            itemB.checked = menu.checked
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang='less' scoped>
.list {
    width: 345px;
    height: 474px;
    border: 1px solid #ddd;
    border-radius:3px;
    text-align: left;
    padding: 20px;
    .first {
        text-align: left;
        position: relative;
        display: block;
        transition: all .5s;
        transform: translateY(0px);
        .second {
            position: relative;
            text-align: left;
            margin-left: 40px;
            transition: all .5s;
            display: block;
            transform: translateY(0px);
        }
        .third {
            position: relative;
            text-align: left;
            margin-left: 40px;
            transition: all .5s;
            display: block;
            transform: translateY(0px);
        }
    }
    .fold {
        width: 0px;
        height: 0px;
        border-width: 5px 0 5px 5px;
        border-style: solid;
        border-color: #fff #fff #fff #666;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        &.active {
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
    .el-checkbox {
        line-height: 28px;
    }
    .el-checkbox+.el-checkbox {
        margin: 0;
        display: block;
        line-height: 28px;
    }
}
.list-complete-enter, .list-complete-leave-to{
    transform: translateY(100px);
}
.list-complete-leave-active {
    transform: translateY(0);
}
</style>
