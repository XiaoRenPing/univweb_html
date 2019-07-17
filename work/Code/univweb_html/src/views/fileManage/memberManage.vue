<template>
    <div class="page">
        <!-- <Header></Header>-->
        <div class="content">
            <!-- <Sidebar></Sidebar> -->
            <div class='wrap'>
                <div class="toolBar">
                    <h3><span class="h3_line"></span><span>档案管理>>注册用户管理</span></h3>
                    <div class="right_bar">
                        <label v-if="chooseType==1">注册账号</label>
                        <el-input v-if="chooseType==1" class="tool_ipt" v-model="account" placeholder="手机号/邮箱/用户名"></el-input>
                        <label v-if="chooseType==2">企业名称</label>
                        <el-input v-if="chooseType==2" class="tool_ipt" v-model="companyname" placeholder="请输入内容"></el-input>
                        <label v-if="chooseType==2">用户名</label>
                        <el-input v-if="chooseType==2" class="tool_ipt" v-model="username" placeholder="请输入内容"></el-input>
                        <!-- <label>用户类型</label>
                        <el-select class="tool_select" v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in [1,2,3]"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select> -->
                        <label>注册渠道</label>
                        <el-select class="tool_select" v-model="source" placeholder="请选择">
                            <el-option
                                v-for="item in sourceList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <label>会员状态</label>
                        <el-select class="tool_select" v-model="status" placeholder="请选择">
                            <el-option
                                v-for="item in statusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button class="search_btn" @click="search" type="primary" icon="el-icon-search"></el-button>
                        <!-- <el-button class="add_btn" icon="el-icon-add" @click="addNotice">新增通知</el-button> -->
                    </div>
                </div>
                <div class="sidebar">
                    <div class="side_item" :class="{active: 1 == chooseType}" @click="chooseType=1">车主用户</div>
                    <div class="side_item" :class="{active: 2 == chooseType}" @click="chooseType=2">企业用户</div>
                    <!-- <div class="side_item" :class="{active: item.enterpriseTypeId == chooseId}" v-for="item in sideList" :key="item.value">{{item.name}}</div> -->
                </div>
                <div class="content2">
                    <div class="table_box">
                        <el-table
                            v-show="chooseType==1"
                            :data="tableData3"
                            height="600"
                            :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            :stripe="false"
                            style="width: 100%">
                            <el-table-column
                                prop="num"
                                label="序号"
                                >
                            </el-table-column>
                            <!-- <el-table-column
                                prop="ownerId"
                                label="会员号"
                                >
                            </el-table-column> -->
                            <el-table-column
                                prop="ownerMobile"
                                label="注册账号"
                                >
                            </el-table-column>
                            <!-- <el-table-column
                                prop="name"
                                label="用户类型"
                                >
                            </el-table-column> -->
                            <el-table-column
                                prop="ownerPersonName"
                                label="姓名"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ownerIdcard"
                                label="身份证号码"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ownerNickname"
                                label="昵称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ownerMobile"
                                label="手机号码"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ownerEmail"
                                label="邮箱"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ownerStatus"
                                label="会员状态"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.ownerStatus==1?'启用':'禁用'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="注册日期"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.createTime | filterTime('yyyy-mm-dd hh:ff:ss')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="ownerSource"
                                label="注册渠道"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.ownerSource | registerSource}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="loodetail(scope.row)">详情</el-button>
                                    <el-button v-if="scope.row.ownerStatus==1" type="text" size="small" @click="freeze(scope.row.ownerId)">禁用</el-button>
                                    <el-button v-if="scope.row.ownerStatus==-1" type="text" size="small" @click="unfreeze(scope.row.ownerId)">启用</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table
                            v-show="chooseType==2"
                            :data="tableData3"
                            height="600"
                            :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            :stripe="false"
                            style="width: 100%">
                            <el-table-column
                                prop="num"
                                label="序号"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="enterpriseUsername"
                                label="用户名"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="enterpriseName"
                                label="企业名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="enterpriseCreditIdentifier"
                                label="企业备案号"
                                >
                            </el-table-column>
                            <el-table-column
                                v-if="roleExtEnterpriseLinkpersonIsview"
                                prop="enterpriseLinkName"
                                label="企业联系人"
                                >
                            </el-table-column>
                            <el-table-column
                                v-if="roleExtEnterpriseLinkpersonIsview"
                                prop="enterpriseLinkMobile"
                                label="联系人电话"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="deleteStatus"
                                label="会员状态"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.deleteStatus==1?'启用':'停用'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="注册日期"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.enterpriseRegisterTime|filterTime('yyyy-mm-dd hh:ff:ss')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="enterpriseSource"
                                label="注册渠道"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.enterpriseSource | registerSource}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="loodetail(scope.row)">详情</el-button>
                                    <el-button v-if="scope.row.deleteStatus==1" type="text" size="small" @click="freeze(scope.row.enterpriseId)">禁用</el-button>
                                    <el-button v-if="scope.row.deleteStatus==-1" type="text" size="small" @click="unfreeze(scope.row.enterpriseId)">启用</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="page_box">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 15, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :title="freezeTitle"
            :width="450"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="model">
                <div class="model-title"><img src="../../assets/images/notice2.png" alt="">确认要{{freezeTitle}}注册账号'1111'吗？</div>
                <div class="model-area clearfix">
                    <label for=""><span>*</span>{{freezeTitle}}理由:</label>
                    <el-input class="ipt" type='textarea' resize="none" v-model="remark" placeholder="请输入理由"></el-input>
                </div>
                <div class="btn-box">
                    <button class="next-btn btn1" @click="sureAlert">确定</button>
                    <button class="close-btn btn2" @click="closeAlert">取消</button>
                </div>
            </div>
        </Modal>
        <Modal
            :title="detailTitle"
            :width="800"
            :alert="showAlert2"
            @alertCancel="closeAlert2"
            @alertConfirm="sureAlert2">
            <div class="detail">
                <ul class="clearfix" v-if="chooseType===1">
                    <li>
                        <label for="">注册账号：</label>
                        <span>{{detailInfo.ownerMobile}}</span>
                    </li>
                    <li>
                        <label for="">用户类型：</label>
                        <span>个人</span>
                    </li>
                    <li>
                        <label for="">注册渠道：</label>
                        <span>{{detailInfo.ownerSource | registerSource}}</span>
                    </li>
                    <li>
                        <label for="">姓名：</label>
                        <span>{{detailInfo.ownerPersonName}}</span>
                    </li>
                    <li>
                        <label for="">身份证号码：</label>
                        <span>{{detailInfo.ownerIdcard}}</span>
                    </li>
                    <li>
                        <label for="">昵称：</label>
                        <span>{{detailInfo.ownerNickname}}</span>
                    </li>
                    <li>
                        <label for="">手机号码：</label>
                        <span>{{detailInfo.ownerMobile}}</span>
                    </li>
                    <li>
                        <label for="">邮箱：</label>
                        <span>{{detailInfo.ownerEmail}}</span>
                    </li>
                    <li>
                        <label for="">会员状态：</label>
                        <span>{{detailInfo.deleteStatus==0?'启用':'禁用'}}</span>
                    </li>
                    <li>
                        <label for="">注册日期：</label>
                        <span>{{detailInfo.createTime | filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">启用日期：</label>
                        <span>{{detailInfo.enableCreateTime | filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">启用描述：</label>
                        <span>{{detailInfo.enableStatusLogBak}}</span>
                    </li>
                    <li>
                        <label for="">禁用日期：</label>
                        <span>{{detailInfo.disableCreateTime | filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">禁用描述：</label>
                        <span>{{detailInfo.disableStatusLogBak}}</span>
                    </li>
                </ul>
                <ul class="clearfix" v-if="chooseType===2">
                    <li>
                        <label for="">企业名称：</label>
                        <span>{{detailInfo.enterpriseName}}</span>
                    </li>
                    <li>
                        <label for="">用户名：</label>
                        <span>{{detailInfo.enterpriseUsername}}</span>
                    </li>
                    <li>
                        <label for="">企业备案号：</label>
                        <span>{{detailInfo.enterpriseCreditIdentifier}}</span>
                    </li>
                    <li>
                        <label for="">会员状态：</label>
                        <span>{{detailInfo.deleteStatus==0?'启用':'停用'}}</span>
                    </li>
                    <li>
                        <label for="">企业联系人：</label>
                        <span>{{detailInfo.enterpriseLinkName}}</span>
                    </li>
                    <li>
                        <label for="">联系人电话：</label>
                        <span>{{detailInfo.enterpriseLinkMobile}}</span>
                    </li>
                    <li>
                        <label for="">注册日期：</label>
                        <span>{{detailInfo.createTime | filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">注册渠道：</label>
                        <span>{{detailInfo.enterpriseSource}}</span>
                    </li>
                    <li>
                        <label for="">启用日期：</label>
                        <span>{{detailInfo.updateTime|filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">启用描述：</label>
                        <span>{{detailInfo.enableStatusLogBak}}</span>
                    </li>
                    <li>
                        <label for="">禁用日期：</label>
                        <span>{{detailInfo.deleteTime|filterTime('yyyy-mm-dd')}}</span>
                    </li>
                    <li>
                        <label for="">禁用描述：</label>
                        <span>{{detailInfo.disableStatusLogBak}}</span>
                    </li>
                </ul>
                <div class="btn-div">
                    <button @click="showAlert2=false">确定</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
import { getCookie } from '@/utils/cookie.js'
export default {
    name: 'memberManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            remark: '', // 描述
            freezeEnterpriseId: '',
            freezeTitle: '禁用', // 解冻or冻结
            account: '', // 注册账号
            companyname: '', // 企业名称
            username: '', // 用户名
            statusList: [
                {
                    name: '启用',
                    value: 0
                },
                {
                    name: '禁用',
                    value: 1
                }
            ],
            sourceList: [
                {
                    name: '金车汇',
                    value: 1
                },
                {
                    name: '协会网站',
                    value: 2
                }
            ],
            source: '', // 注册渠道
            status: '', // 会员状态
            detailTitle: '车主用户详情',
            detailInfo: {}, // 详情
            total: 0,
            pageNum: 1,
            pageSize: 10,
            chooseType: 1, // 企业or车主
            showAlert: false,
            showAlert2: false,
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            roleExtEnterpriseLinkpersonIsview: 0,
            tableData3: []
        }
    },
    created () {
        try {
            var user = JSON.parse(getCookie('user'))
            this.roleExtEnterpriseLinkpersonIsview = user.roleExtEnterpriseLinkpersonIsview
        } catch (e) {
            this.roleExtEnterpriseLinkpersonIsview = 0
        }
        this.query1()
        // this.query2()
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        Sidebar,
        Modal
    },
    // 方法
    watch: {
        chooseType (val) {
            this.tableData3 = []
            this.pageNum = 1
            val === 1 ? this.query1() : this.query2()
        }
    },
    methods: {
        search () {
            this.tableData3 = []
            this.chooseType === 1 ? this.query1() : this.query2()
        },
        // 查询个人会员
        query1 () {
            var obj = {
                'registertype': '',
                'ownerName': this.account,
                'ownerSource': this.source,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
            }
            if (this.status) {
                obj.status = this.status
            }
            this.$post('owner/findowner', obj).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 查询会员
        query2 () {
            this.$post('bas/enterprise/register/findentuser', {
                'registertype': '',
                'status': this.status,
                'enterpriseName': this.companyname,
                'enterpriseUserName': this.username,
                'enterpriseSource': this.source,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
            })
        },
        closeAlert () {
            this.showAlert = false
        },
        sureAlert (id) {
            if (!this.remark) {
                this.$alert('请输入理由', '提示')
                return
            }
            if (this.chooseType === 1) {
                let obj = {
                    'ownerId': this.freezeEnterpriseId
                }
                if (this.freezeTitle === '禁用') {
                    obj.status = -1
                    obj.ownerEnableStatusBak = this.remark
                } else {
                    obj.status = 1
                    obj.ownerDisableStatusBak = this.remark
                }
                this.$post('owner/ownerstatus', obj).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '操作成功'
                        })
                        this.query1()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.$post('bas/enterprise/register/entuserstatus', {
                    'enterpriseId': this.freezeEnterpriseId,
                    'ownerBak': this.remark,
                    'status': this.freezeTitle === '禁用' ? 1 : 0
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '操作成功'
                        })
                        this.query2()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            this.remark = ''
            this.showAlert = false
        },
        closeAlert2 () {
            this.showAlert2 = false
        },
        sureAlert2 () {
            this.showAlert2 = false
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.chooseType === 1 ? this.query1() : this.query2()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.chooseType === 1 ? this.query1() : this.query2()
        },
        // 编辑
        loodetail (value) {
            this.detailInfo = value
            this.showAlert2 = true
        },
        // 禁用
        freeze (id) {
            this.freezeTitle = '禁用'
            this.freezeEnterpriseId = id
            this.showAlert = true
        },
        // 启用
        unfreeze (id) {
            this.freezeEnterpriseId = id
            this.freezeTitle = '启用'
            this.showAlert = true
        }
    },
    filters: {
        // 注册渠道过滤
        registerSource (val) {
            if (val === 1) {
                return '金车汇'
            } else if (val === 2) {
                return '协会网站'
            } else {
                return '其他渠道'
            }
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
            // padding: 0 20px;
            .toolBar {
                height: 74px;
                line-height: 74px;
                padding: 0 20px;
                border-bottom: 1px solid #eeeeee;
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
            .sidebar {
                position: absolute;
                width: 250px;
                bottom: 0;
                top: 76px;
                // height: 100%;
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
            .content2 {
                margin-left: 250px;
                padding: 20px;
            }
            .table_box {
                border: 1px solid #dddddd;
                border-bottom: none;
            }
            .page_box {
                background: #f7f8f9;
                padding-top: 10px;
                height: 53px;
                border: 1px solid #dddddd;
                border-top: none;
            }
        }
    }
    .model {
        .model-title {
            margin-top: 10px;
            line-height: 50px;
            img {
                width: 26px;
                margin-right: 10px;
                margin-top: -3px;
            }
        }
        .model-area {
            margin-top: 10px;
            label {
                float: left;
                width: 106px;
                text-align: right;
                padding-right: 10px;
                color: #666666;
                font-size: 14px;
                span {
                    color: red;
                    margin-right: 3px;
                }
            }
            .ipt {
                float: left;
                width: 260px;
            }
        }
        .btn-box {
            text-align: center;
            margin: 20px 0 40px 0;
            button {
                width: 100px;
                height: 40px;
                border-radius: 4px;
                cursor: pointer;
            }
            .btn1 {
                background: #359dff;
                color: #ffffff;
                border: none;
                margin-right: 20px;
            }
            .btn2 {
                border: 1px solid #dbdbdb;
                background: #ffffff;
                color: #666666;
            }
        }
    }
    .detail {
        padding-top: 20px;
        li {
            float: left;
            width: 50%;
            text-align: left;
            line-height: 30px;
            line-height: 40px;
            font-size: 14px;
            color: #333333;
            label {
                display: inline-block;
                width: 200px;
                color: #666666;
                text-align: right;
            }
        }
        .btn-div {
            height: 99px;
            line-height: 99px;
            button {
                background: #359DFF;
                border: none;
                color: #ffffff;
                font-size: 14px;
                border-radius: 4px;
                width: 98px;
                height: 34px;
            }
        }
    }
}
</style>
