<template>
    <div class="newsDetail">
        <div class="content">
            <tool-bar :title="'业务操作>协会网站管理>新闻管理>添加新闻'">
                <el-button v-if="forbidden" icon="el-icon-circle-check-outline myIcon" type="primary" class="notice-btn" @click="audit(1)">同意发布</el-button >
                <el-button v-if="forbidden" icon="el-icon-remove-outline myIcon" class="notice-btn refuse" @click="audit(-1)">拒绝发布</el-button >
                <el-button v-if="!forbidden" type="primary" @click="submitNotice">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>提交</span>
                </el-button>
                <button class="back_btn" @click="goBack">返回</button>
            </tool-bar>
            <div class='wrap'>
                <div class="content2">
                    <div class="h10"></div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>新闻标题：</label>
                        <el-input :disabled="forbidden" maxlength="50" class="tool_ipt" v-model="newsTitle" placeholder="请输入新闻标题"></el-input>
                        <label for=""><span>*&nbsp;</span>新闻类型：</label>
                        <el-select class="tool_ipt" :disabled="forbidden" v-model="newsType"  placeholder="请输入新闻类型">
                            <el-option
                            v-for="item in newsTypeList"
                            :key="item.newsTypeId"
                            :label="item.typeName"
                            :value="item.newsTypeId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>作者：</label>
                        <el-input :disabled="forbidden" maxlength="20" class="tool_ipt" v-model="newsAuthor" placeholder="请输入作者"></el-input>
                        <label for=""><span>*&nbsp;</span>是否推荐：</label>
                        <el-select class="tool_ipt" :disabled="forbidden" v-model="newsRecommend"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>状态：</label>
                        <el-select class="tool_ipt" :disabled="forbidden" v-model="newsStatus"  placeholder="请选择">
                            <el-option
                            v-for="item in newsStatusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <label for="">来源：</label>
                        <el-input :disabled="forbidden" class="tool_ipt" v-model="newsSource" placeholder="请输入来源"></el-input>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>发布时间：</label>
                        <el-radio :disabled="forbidden" v-model="radio" label="1" class="h34 w100">实时发布</el-radio>
                        <el-radio :disabled="forbidden" v-model="radio" label="2" class="h34">定时发布
                            <el-date-picker
                                :disabled="forbidden||radio==1"
                                class="timePick h34"
                                v-model="value1"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期和时间">
                            </el-date-picker>
                        </el-radio>
                    </div>
                    <div class="line-box line-box2 clearfix">
                        <label for="">
                            <span>*&nbsp;</span>新闻内容：
                        </label>
                        <vue-ueditor-wrap class="ueditor1" v-model="content" :config="myConfig" :destroy="false" @ready="ready"></vue-ueditor-wrap>
                    </div>
                    <div class="file-box">
                        <div class="item clearfix" v-for="(file,index) in uploadList" :key="file.w">
                            <div class="file-header">
                               {{file.name.replace(/(.+\.)([a-zA-Z]+)$/, '$2')}}
                            </div>
                            <div class="file-info">
                                <p class="name">{{file.name}}</p>
                                <p class="size">{{Math.ceil(file.size/1024)}}K</p>
                                <span class="btn-look" v-if="file.response.data.indexOf('.doc')!==-1||file.response.data.indexOf('.xls')!==-1">
                                    <a target="_blank" :href="'https://view.officeapps.live.com/op/view.aspx?src='+file.response.data">查看</a>
                                </span>
                                <span class="btn-look" v-else>
                                    <a target="_blank" :href="file.response.data">查看</a>
                                </span>
                                <span class="btn-delete" @click="deleteFile(index)">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Upload from '@/components/upload.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import ToolBar from '@/components/ToolBar.vue'
import Modal from '@/components/Modal.vue'
export default {
    name: 'newsDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            remark: '', // 拒绝理由
            showAlert: false,
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                serverUrl: window.uploadURL + 'attachment/file/upload',
                // serverUrl: '/vmts/sys/ueditor/exec',
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false,
                imageActionName: 'uploadimage',
                imageFieldName: 'file',
                imageAllowFiles: ['.png', '.jpg', '.jpeg'],
                imageUrlPrefix: '',
                imageMaxSize: 1024000,
                videoActionName: 'uploadvideo',
                videoFieldName: 'file',
                videoUrlPrefix: '',
                videoMaxSize: 5120000,
                videoAllowFiles: ['.mp4', '.avi', 'ogg', 'rmvb', 'rm', 'wav'],
                fileActionName: 'uploadfile',
                fileFieldName: 'file',
                fileUrlPrefix: '',
                fileMaxSize: 5120000,
                fileAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid', '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml']
            },
            content: '',
            newsStatus: 0, // 状态
            newsStatusList: [
                {
                    value: 1,
                    label: '禁用'
                },
                {
                    value: 0,
                    label: '启用'
                }
            ],
            newsRecommend: 0, // 是否推荐
            recommendType: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                }
            ],
            uploadList: [], // 上传文件列表
            value1: '', // 发布时间
            radio: '1',
            options: [],
            value5: [], // 区域列表
            target1: '', // 是否发布协会
            target2: '', // 是否发布企业erp
            fileList: [],
            newsTitle: '', // 新闻标题
            newsType: '', // 新闻类型
            newsTypeList: [],
            newsAuthor: '', // 作者
            newsSource: '', // 是否推荐
            input: '',
            value: '',
            oldOptions: [], // 用来储存上一次的数据
            createUser: '',
            forbidden: false, // 是否可编辑
            uploadURL: window.uploadURL
        }
    },
    created () {
        this.getNewsTypeList()
        this.forbidden = this.$route.query.type === '2'
        if (this.$route.query.id) {
            this.query()
        }
    },
    computed: {},
    // 使用其它组件
    components: {
        Modal,
        VueUeditorWrap,
        Header,
        Sidebar,
        ToolBar,
        Upload
    },
    // 方法
    watch: {},
    methods: {
        // 获取新闻类型下拉列表
        getNewsTypeList () {
            this.$post('external/news/type/list', {})
                .then(res => {
                    if (res.status === 200) {
                        this.newsTypeList = res.data || []
                    }
                })
        },
        closeAlert () {
            this.showAlert = false
        },
        // 审核
        audit (type) {
            this.$post('external/news/auditnews', {
                data: {
                    newsId: this.$route.query.id,
                    auditStatus: type
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '审核成功',
                        callback: () => {
                            this.$router.push('/newsManage')
                        }
                    })
                } else {
                    this.alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('网络错误，请重试', '提示')
            })
        },
        ready (ue) {
            if (this.forbidden) {
                ue.setDisabled()
            }
        },
        submitNotice () {
            if (!this.newsTitle) {
                this.$alert('请填写新闻标题！', '提示')
                return
            }
            if (!this.newsType) {
                this.$alert('请选择新闻类型！', '提示')
                return
            }
            if (!this.newsAuthor) {
                this.$alert('请填写作者！', '提示')
                return
            }
            if (this.radio === '2' && !this.value1) {
                this.$alert('请选择发布时间', '提示')
                return
            }
            let temp = this.content.replace(/<[;:/\w\n\d\s"=-]+>/g, '')
            if (!temp) {
                this.$alert('请填写通知内容', '提示')
                return
            }
            if (temp.length > 10000) {
                this.$alert('通知内容过长', '提示')
                return
            }
            var obj = {
                data: {
                    typeId: this.newsType,
                    title: this.newsTitle,
                    author: this.newsAuthor,
                    status: this.newsStatus,
                    source: this.newsSource,
                    isRecommend: this.newsRecommend,
                    context: this.content
                }
            }
            if (this.radio === '1') {
                obj.data.publishType = 1
            } else {
                obj.data.publishType = 2
                obj.data.publishTime = this.value1
            }
            if (this.$route.query.id) {
                obj.data.newsId = this.$route.query.id
                this.$post('external/news/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '提交成功',
                                callback: () => {
                                    this.$router.push('/newsManage')
                                }
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试', '提示')
                    })
            } else {
                this.$post('external/news/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '提交成功',
                                callback: () => {
                                    this.$router.push('/newsManage')
                                }
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$alert('网络错误，请重试', '提示')
                    })
            }
        },
        goBack () {
            if (this.forbidden) {
                this.$router.push('/newsManage')
            } else {
                this.$myAlert({
                    title: '提示',
                    msg: '新闻内容尚未保存,是否继续？'
                }).then(() => {
                    this.$router.push('/newsManage')
                }).catch(() => {
                    console.log('取消')
                })
            }
        },
        deleteFile (index) {
            this.uploadList.splice(index, 1)
        },
        // 获取详情数据
        query () {
            this.$post('external/news/detail', {
                data: {
                    newsId: this.$route.query.id
                }
            }).then(res => {
                if (res.status === 200) {
                    this.newsTitle = res.data.title
                    this.newsAuthor = res.data.author
                    this.newsType = res.data.typeId
                    this.newsRecommend = res.data.isRecommend
                    this.newsStatus = res.data.status
                    this.newsSource = res.data.source
                    this.content = res.data.context
                    this.radio = res.data.publishType + ''
                    if (res.data.publishTime) {
                        this.value1 = new Date(res.data.publishTime).getTime()
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {
    }
}
</script>

<style lang="less" scoped>
.newsDetail {
    // height: 100%;
    // padding-bottom: 50px;
    .h10 {
        height: 10px;
    }
    .model {
        padding: 20px;
        .btn-box {
            text-align: center;
            margin: 20px 0 20px 0;
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
    .no_btn {
        box-sizing: border-box;
        border: 1px solid #BBCBDF;
        background: #ffffff;
        color: #666666;
    }
    .upload-demo {
        text-align: left;
        padding-left: 160px;
        margin-top: 5px;
    }
    .timePick {
        margin-left: 10px;
        width: 196px;
    }
    .up-btn {
        width: 98px;
        border-radius: 4px;
        background: linear-gradient(#FFFFFF,#EAEAEA);
        color: #666666;
        border: 1px solid #DDDDDD;
    }
    .sub-btn {
        width: 98px;
        border-radius: 4px!important;
    }
    .file-box {
        .item {
            margin-top: 30px;
            .file-header {
                margin-left: 160px;
                float: left;
                width: 64px;
                height: 64px;
                text-align: center;
                line-height: 64px;
                background: #47C3A8;
                color: #ffffff;
            }
            .file-info {
                float: left;
                background: #F0F0F0;
                width: 800px;
                padding-left: 20px;
                height: 64px;
                margin-left: 15px;
                text-align: left;
                color: #666666;
                font-size: 14px;
                position: relative;
                .name {
                    margin-top: 15px;
                    margin-bottom: 5px;
                }
                .size {
                    font-size: 12px;
                    color: #999999;
                }
                span {
                    position: absolute;
                    width: 80px;
                    top: 0;
                    height: 64px;
                    line-height: 64px;
                    cursor: pointer;
                    text-align: center;
                    &.btn-delete {
                        right: 0;
                        color: #F12C20;
                    }
                    &.btn-look {
                        right: 80px;
                        a {
                            color: #666666;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        .wrap {
            border-top: 1px solid #ddd;
            .content2 {
                h4 {
                    text-align: left;
                    margin-top: 30px;
                }
                .line-box {
                    margin-top: 20px;
                    text-align: left;
                    label {
                        float: left;
                        margin-right: 4px;
                        width: 146px;
                        text-align: right;
                        font-size: 14px;
                        span {
                            color: red;
                        }
                        &.w100 {
                            width: 100px;
                        }
                    }
                    .tool_ipt {
                        float: left;
                        width: 345px;
                    }
                }
                .line-box1 {
                    line-height: 34px;
                    height: 34px;
                }
                .line-box3 {
                    height: auto;
                }
                .editor {
                    float: left;
                    width: 850px;
                }
                .bb-box {
                    margin-top: 10px;
                    padding-left: 160px;
                    text-align: left;
                    button {
                        cursor: pointer;
                        border: none;
                        background: #359dff;
                        color: #ffffff;
                        padding: 8px 20px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less" >
.newsDetail {
    .modal {
        z-index: 99999;
    }
    .refuse {
        border:1px solid #74899C;
        color: #74899C;
    }
    .notice-btn {
        .myIcon::before {
            top: 0;
        }
        .myIcon {
            margin-right: 4px;
        }
        i, span {
            vertical-align: middle;
        }
    }
    .edui-editor-breadcrumb {
        display: none;
    }
    .ueditor1 {
        display: inline-block;
        width: 850px;
    }
    .el-checkbox {
        text-align: left!important;
    }
    .el-radio {
        line-height: 34px;
        text-align: left!important;
        margin-left: 0;
    }
    .el-radio__label {
        padding-left: 6px;
    }
    .el-input__icon {
        line-height: 34px!important;
    }
    .el-message-box__wrapper {
        z-index: 10001!important;
    }
    .el-input__inner {
        height: 34px;
        line-height: 34px;
    }
    .editor {
        .w-e-toolbar {
            display: block;
            // overflow: hidden;
            .w-e-menu {
                float: left;
            }
        }
        .w-e-toolbar:after{
            display: block;
            clear: both;
            content: "";
            visibility: hidden;
            height: 0;
        }
        .w-e-toolbar{
            zoom:1;
        }
    }
    .timePick {
        .el-input__inner {
            width: 196px;
        }
    }
}
</style>
