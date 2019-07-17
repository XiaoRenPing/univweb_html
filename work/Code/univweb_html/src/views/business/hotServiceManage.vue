<template>
    <div class="page">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'业务操作>协会网站管理>热门服务管理'">
                    <label>服务名称:</label>
                    <el-input class="tool_ipt w200" v-model="searchServiceName" placeholder="请输入服务名称"></el-input>
                    <el-button class="search_btn" type="primary" icon="el-icon-search" style="width:40px;" @click="queryData(1)" :disabled="!$checkAuth('external:link:hotservice:find')"></el-button>
                    <el-button class="add_btn" icon="el-icon-add" @click="add"><img src="../../assets/images/iocn_add.png" :disabled="!$checkAuth('external:link:hotservice:add')">添加热门服务</el-button>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="dataList"
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
                            prop="logoUrl"
                            label="服务logo">
                            <template slot-scope="scope">
                                <img class="table-logo" :src="scope.row.logoUrl" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="服务名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="url"
                            label="服务链接"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作"
                            width="">
                            <template slot-scope="scope">
                                <el-button type="text" class="operation" @click="editNotice(scope.row.hotLinkId)" v-if="$checkAuth('external:link:hotservice:view')">详情&nbsp;&nbsp;</el-button>
                                <el-button type="text" class="operation" @click="deleteNotice(scope.row)" v-if="$checkAuth('external:link:hotservice:delete')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="'添加菜单'"
            :width="520"
            :height="350"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="model">
                <div class="line clearfix">
                    <label ><span class="important">*</span>服务名称：</label>
                    <el-input type="text" maxlength="10" v-model="alertName" class="ipt h34"></el-input>
                </div>
                <div class="line clearfix">
                    <label ><span class="important">*</span>服务链接：</label>
                    <el-input type="text" maxlength="50" placeholder="请输入http://或者https://开头" v-model="alertUrl" class="ipt h34"></el-input>
                </div>
                <div class="line clearfix">
                    <div class="fl label2"><span class="important">*</span>服务logo：<br>(60*60px)&nbsp;&nbsp;</div>
                    <div class="license-wrap" ref="licenseWrap">
                        <upload
                            class="upload-demo"
                            :on-success="uploadSuccess"
                            :before-upload="beforeAvatarUpload">
                            <div class="empty" v-show="!serviceLogo">
                                <img src="../../assets/images/audit/default_icon_photo.png" alt="附件">
                            </div>
                            <img v-show="serviceLogo" class="logo" ref="licenseImg" :src="serviceLogo" alt="附件">
                        </upload>
                    </div>
                </div>
                <div class="btn-box">
                    <el-button type="primary" @click="sureAlert">确定</el-button>
                    <el-button @click="closeAlert">取消</el-button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import ToolBar from '@/components/ToolBar.vue'
import upload from '@/components/upload.vue'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools'
export default {
    name: 'hotServiceManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            serviceLogo: '',
            alertName: '',
            alertUrl: '',
            hotLinkId: '', // 当前编辑的热门链接
            showAlert: false, // 是否显示弹窗
            noticeStatus: '', // 审核状态 0-未审核  1-通过 -1-拒绝
            total: 0,
            pageSize: 10,
            searchServiceName: '',
            noticeAuthor: '',
            daterange: '',
            pageNum: 1, // 当前页数
            input: '',
            value: '',
            dataList: []
        }
    },
    created () {
        this.queryData()
    },
    computed: {},
    filters: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar,
        upload,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        closeAlert () {
            this.showAlert = false
            this.alertName = ''
            this.alertUrl = ''
            this.serviceLogo = ''
            this.hotLinkId = ''
        },
        sureAlert () {
            if (!this.alertName) {
                this.$alert('请输入服务名称！', '提示')
                return
            }
            if (!this.alertUrl) {
                this.$alert('请输入服务链接！', '提示')
                return
            }
            if (!/^http:\/\/|https:\/\//i.test(this.alertUrl)) {
                this.$alert('请输入正确的服务链接！', '提示')
                return
            }
            if (!this.serviceLogo) {
                this.$alert('请上传服务logo！', '提示')
                return
            }
            var obj = {
                data: {
                    name: this.alertName,
                    url: this.alertUrl,
                    logoUrl: this.serviceLogo
                }
            }
            if (this.hotLinkId) {
                obj.data.hotLinkId = this.hotLinkId
                this.$post('external/link/hotservice/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.closeAlert()
                            this.$toast({
                                msg: '编辑成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试！', '提示')
                    })
            } else {
                this.$post('external/link/hotservice/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.closeAlert()
                            this.$toast({
                                msg: '添加成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试！', '提示')
                    })
            }
        },
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            this.$post('external/link/hotservice/find', {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                data: {
                    name: this.searchServiceName
                }
            }).then(res => {
                if (res.status === 200) {
                    this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                }
            }).catch(err => {
                console.log(err)
            })
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!')
            }
            return isJPG && isLt2M
        },
        uploadSuccess (res) {
            this.serviceLogo = res.data
            this.$message({
                message: '图片上传成功！',
                type: 'success'
            })
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.queryData()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.queryData()
        },
        // 查看详情
        editNotice (id) {
            this.showAlert = true
            this.hotLinkId = id
            this.$post('external/link/hotservice/detail', {
                data: {
                    hotLinkId: id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.alertName = res.data.name
                    this.alertUrl = res.data.url
                    this.serviceLogo = res.data.logoUrl
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('网络错误，请重试！', '提示')
            })
        },
        // 删除
        deleteNotice (item) {
            this.$myAlert({
                title: '提示',
                type: 'waring',
                msg: `确定要删除 "${item.name}" 吗？`
            }).then(res => {
                this.$post('external/link/hotservice/delete', {
                    data: {
                        hotLinkId: item.hotLinkId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.queryData()
                        this.closeAlert()
                        this.$toast({
                            msg: '删除成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        },
        // 新增notice
        add () {
            this.showAlert = true
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
    .add_btn {
        width: 130px;
        img {
            vertical-align: baseline;
            margin-right: 8px;
        }
    }
    .license-wrap {
        width: 58px;
        height: 58px;
        border: 1px solid #ddd;
        padding: 4px;
        display: inline-block;
        .upload-demo {
            width: 100%;
            height: 100%;
            text-align: center;
            .logo {
                width: 100%;
                height: 100%;
            }
            .empty {
                width: 100%;
                height: 100%;
                background: #eee;
                line-height: 58px;
                img {
                    width: 24px;
                    vertical-align: middle;
                }
            }
        }
    }
    .model {
        font-size: 14px;
        color: #666666;
        .line {
            margin-top: 20px;
            text-align: left;
            &:first-child {
                margin-top: 30px;
            }
            label {
                width: 140px;
                text-align: right;
                float: left;
                line-height: 34px;
            }
            .label2 {
                width: 140px;
                text-align: right;
                float: left;
            }
            .ipt {
                width: 300px;
            }
        }
        .btn-box {
            text-align: left;
            margin: 30px 0 20px 140px;
            button {
                width: 100px;
                height: 34px;
                border-radius: 4px;
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
            }
        }
    }
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        // padding-top: 100px;
        top: 0;
        .wrap {
            padding: 0 20px;
            .table_box {
                border: 1px solid #dddddd;
                border-bottom: none;
                .table-logo {
                    width: 60px;
                    height: 60px;
                    margin-top: 6px;
                }
                .operation {
                    cursor: pointer;
                    &:hover {
                        color: #359dfe;
                    }
                }
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
}
</style>
