<template>
    <div class="page">
        <!-- <Header></Header>-->
        <div class="content">
            <!-- <Sidebar></Sidebar> -->
            <div class='wrap'>
                <div class="toolBar">
                    <h3><span class="h3_line"></span><span>档案管理>>注册会员管理>>详情</span></h3>
                    <button class="back_btn fr" @click="goBack">返回</button>
                </div>
                <div class="table">
                    <table class="table-inner" border="1" width="1000" style="border-color:#eeeeee;border:none">
                        <tr>
                            <td width="120">会员号：</td>
                            <td width="380">113123123</td>
                            <td width="120">注册账号：</td>
                            <td width="380"></td>
                        </tr>
                        <tr>
                            <td>用户类型：</td>
                            <td>asdasdasdqweqweqwe</td>
                            <td>姓名：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>身份证号码：</td>
                            <td></td>
                            <td>昵称：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>手机号码：</td>
                            <td></td>
                            <td>邮箱：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>会员状态：</td>
                            <td></td>
                            <td>注册日期：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>注册渠道：</td>
                            <td></td>
                            <td>冻结日期：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>冻结描述：</td>
                            <td></td>
                            <td>解冻日期：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>解冻描述：</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
export default {
    name: 'memberDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            showAlert: false,
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            tableData3: [
                { name: '1' }
            ]
        }
    },
    created () {},
    computed: {},
    // 使用其它组件
    components: {
        Header,
        Sidebar,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        top: 0;
        .wrap {
            padding: 0 20px;
            .toolBar {
                height: 74px;
                line-height: 74px;
                label {
                    margin: 10px;
                    font-size: 14px;
                }
                .tool_ipt {
                    width: 140px;
                }
                .tool_select {
                    width: 140px;
                }
                h3 {
                    float: left;
                    color: #359dff;
                    font-size: 15px;
                    .h3_line {
                        display: inline-block;
                        width: 4px;
                        height: 15px;
                        background: #359dff;
                        margin-right: 5px;
                    }
                    span {
                        vertical-align: middle;
                    }
                }
                .right_bar {
                    float: right;
                }
                .search_btn {
                    margin-left: 10px;
                    width: 40px;
                }
            }
        }
    }
    .table {
        // border: 1px solid #dddddd;
        width: 1000px;
        td {
            line-height: 40px;
            &:nth-child(2n-1) {
                text-align: right;
                color: #666666;
                font-size: 14px;
            }
            &:nth-child(2n) {
                text-align: left;
                padding-left: 10px;
                color: #333333;
            }
        }
    }
}
</style>
