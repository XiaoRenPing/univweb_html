<template>
    <div class="integrityDetail">
        <div class="content">
            <tool-bar :title="'档案管理>企业诚信档案详情'">
                <!-- <span slot="tips">共有企业{{recordCompany}}家,截止到目前,有{{buttCompany}}家企业完成系统对接</span> -->
                <button class="back_btn2" @click="goBack">返回</button>
            </tool-bar>
            <div class='wrap'>
                <div class="leftBox">
                    <div class="line clearfix">
                        <label for="">当前评价年度：</label>
                        <span>{{info.enterpriseEvaluateCertificateCurrentyear}}</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">诚信材料审核：</label>
                        <span>已完成</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">企业自评得分：</label>
                        <span>{{info.enterpriseEvaluateCertificateEnterpriseScore}}</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">初评得分：</label>
                        <span>{{info.enterpriseEvaluateCertificateAdminScore}}</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">终评得分：</label>
                        <span>{{info.enterpriseEvaluateCertificateTotalScore}}</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">评价信用等级：</label>
                        <span>{{info.enterpriseEvaluateCertificateLevel}}</span>
                    </div>
                    <div class="line clearfix">
                        <label for="">备注说明：</label>
                        <span>{{info.enterpriseEvaluateCertificateBak}}</span>
                    </div>
                </div>
                <div class="rightBox">
                    <embed :src="pdfUrl" type="application/pdf" width="666" height="980">
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import ToolBar from '@/components/ToolBar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'integrityDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            info: {}, // 企业信息
            pdfUrl: '', // pdf地址
            loading: false, // 是否显示loading
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            tableData3: [],
            recordCompany: 0, // 已备案企业数量
            buttCompany: 0 // 已对接企业数量
        }
    },
    created () {
        // this.getData()
        // this.queryDate()
        this.getFinishInfo()
        this.pdfUrl = window.uploadURL + 'report/inspect/findEvaluateCertificate' + '?data.enterpriseEvaluateApplyId=' + this.$route.query.id
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        goBack () {
            // this.$router.go(-1)
            this.$router.push('/integrityManage')
        },
        getFinishInfo () {
            this.$post('bus/enterprise/evaluateCertificate/findByApplyId', {
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.id
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data) {
                        this.info = res.data
                    } else {
                        this.$alert(res.message, '提示')
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        queryDate () {
            this.$post('bus/enterprise/evaluateCertificate/find', {
                data: {}
            }).then(res => {
                if (res.status === 200) {
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getData () {
            this.loading = true
            this.$get('bas/vehicle/count/docking_report')
                .then(res => {
                    if (res.status === 200) {
                        res.data.forEach((item, index) => {
                            let ind = index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                        })
                        this.tableData3 = res.data
                        this.tableData3.forEach(item => {
                            this.recordCompany = this.recordCompany + (item.recordCompany - 0)
                            this.buttCompany = this.buttCompany + (item.recordCompanyJoins - 0)
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        handleSizeChange () {},
        handleCurrentChange () {},
        // 详情
        editNotice (id, name) {
            this.$router.push('/companyDataDetail?id=' + id)
        },
        // 删除
        deleteNotice (value) {
            console.log('删除')
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.integrityDetail {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        top: 0;
        .wrap {
            position: relative;
            padding: 20px 20px;
            border-top: 1px solid #dddddd;
            min-height: 500px;
            .leftBox {
                position: absolute;
                width: 400px;
                text-align: left;
                .line {
                    margin-top: 15px;
                    font-size: 14px;
                }
                label {
                    width: 150px;
                    text-align: right;
                    // display: inline-block;
                    line-height: 30px;
                    float: left;
                }
                span {
                    float: right;
                    width: 240px;
                    text-align: left;
                    line-height: 30px;
                }
            }
            .rightBox {
                margin-left:  400px;
            }
        }
    }
}
</style>
