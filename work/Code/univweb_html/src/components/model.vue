<!--
* 组件的公共模板
 -->
<template lang="html">
    <div class="wrap1">
        wrap1
        <div class="wrap2">wrap2</div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'common',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {}
    },
    created () {
    },
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate () {
    },
    mounted () {
    }
}
</script>

<style lang="less" scoped>
    .wrap1 {
        color: red;
        .wrap2 {
            color: blue;
        }
    }
</style>
