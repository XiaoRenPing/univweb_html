<template>
    <div class="addNotice">
        <div class="content">
            <div class='wrap'>
                <div class="content2">
                    <!-- <h4>新增通知公告(*星号为必填项)</h4> -->
                    <div class="h10"></div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>通知标题</label>
                        <el-input :disabled="forbidden" class="tool_ipt" v-model="title1" placeholder="请输入标题"></el-input>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>作者</label>
                        <el-input :disabled="forbidden" class="tool_ipt" v-model="createUser" placeholder="请输入作者"></el-input>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>发布平台</label>
                        <el-checkbox :disabled="forbidden" v-model="target1">发布到协会网站</el-checkbox>
                        <el-checkbox :disabled="forbidden" v-model="target2">发布到企业ERP</el-checkbox>
                    </div>
                    <div class="line-box line-box1 clearfix line-box3">
                        <label for=""><span>*&nbsp;</span>发布区域</label>
                        <el-select :disabled="forbidden" @change="selectAll(value5)" class="tool_ipt" v-model="value5"  multiple placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.regionId"
                            :label="item.regionName"
                            :value="item.regionId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="line-box line-box1 clearfix">
                        <label for=""><span>*&nbsp;</span>发布时间</label>
                        <el-radio :disabled="forbidden" v-model="radio" label="1">实时发布</el-radio>
                        <el-radio :disabled="forbidden" v-model="radio" label="2">
                            定时发布
                            <el-date-picker
                                :disabled="forbidden||radio==1"
                                class="timePick"
                                v-model="value1"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-radio>
                    </div>
                    <div class="line-box line-box2 clearfix">
                        <label for="">
                            <span>*&nbsp;</span>通知内容
                        </label>
                        <vue-ueditor-wrap class="ueditor1" v-model="content" :config="myConfig" :destroy="false" @ready="ready"></vue-ueditor-wrap>
                    </div>
                    <!-- <el-upload
                        :disabled="forbidden"
                        class="upload-demo"
                        :action="uploadURL + '/attachment/file/upload'"
                        multiple
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :limit="10"
                        :file-list="fileList">
                        <el-button size="small" type="primary" class="up-btn" :disabled="forbidden">上传附件</el-button>
                        <div slot="tip" class="el-upload__tip">格式无限制，大小限制5M</div>
                    </el-upload> -->
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
        <Modal
            :title="'拒绝说明'"
            :width="450" :height="242"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="model alert-content clearfix" >
                <div class="clearfix">
                    <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                    <el-input class="ipt textarea" type='textarea' resize="none" rows="3" v-model="remark" placeholder="请输入理由"></el-input>
                </div>
                <div class="btn-box">
                    <button class="next-btn btn1" @click="sureAlert">确定</button>
                    <button class="close-btn btn2" @click="closeAlert">取消</button>
                </div>
            </div>
        </Modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button v-if="forbidden" type="primary" @click="audit(1)">通过</el-button>
            <el-button v-if="forbidden" type="primary" @click="audit(-1)">拒绝</el-button>
            <el-button v-if="!forbidden" type="primary" @click="submitNotice">保存</el-button>
            <el-button class="react_btn" @click="goBack">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
// import Header from '@/components/Header.vue'
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import Upload from '@/components/upload.vue'
import ToolBar from '@/components/ToolBar.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import Modal from '@/components/Modal.vue'
export default {
    name: 'addNotice',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '行业通知发布', path: '' }
            ],
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
                videoMaxSize: 8192000,
                videoAllowFiles: ['.mp4', '.avi', 'ogg', 'rmvb', 'rm', 'wav'],
                fileActionName: 'uploadfile',
                fileFieldName: 'file',
                fileUrlPrefix: '',
                fileMaxSize: 8192000,
                fileAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid', '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml']
            },
            content: '',
            uploadList: [], // 上传文件列表
            value1: '', // 发布时间
            radio: '1',
            options: [],
            value5: [], // 区域列表
            target1: '', // 是否发布协会
            target2: '', // 是否发布企业erp
            fileList: [],
            title1: '', // 通知标题
            input: '',
            value: '',
            oldOptions: [], // 用来储存上一次的数据
            createUser: '',
            forbidden: false, // 是否可编辑
            uploadURL: window.uploadURL
        }
    },
    created () {
        this.forbidden = this.$route.query.type === '2'
        if (this.$route.query.noticeId) {
            this.query()
        }
        if (this.forbidden) {
            this.breadArr.push({ title: '通知发布审核', path: '' })
        } else {
            this.breadArr.push({ title: '通知发布编辑', path: '' })
        }
        this.$post('bas/city/findLoginRegion', {})
            .then(res => {
                if (res.status === 200) {
                    this.options = res.datas
                    this.options.unshift({
                        parentId: '00000',
                        regionId: '00000',
                        regionName: '全部',
                        regionType: 3
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            })
    },
    computed: {},
    // 使用其它组件
    components: {
        Modal,
        VueUeditorWrap,
        BreadFoot,
        ToolBar,
        Sidebar,
        Upload
    },
    // 方法
    watch: {},
    methods: {
        selectAll (val) {
            let allValues = []
            // 保留所有值
            for (let item of this.options) {
                allValues.push(item.regionId)
            }
            // 用来储存上一次的值，可以进行对比
            const oldVal = this.oldOptions.length === 0 ? [] : this.oldOptions
            // 若是全部选择
            if (val.includes('00000')) this.value5 = allValues
            // 取消全部选中  上次有 当前没有 表示取消全选
            if (oldVal.includes('00000') && !val.includes('00000')) this.value5 = []
            // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
            // 新老数据都有全部选中
            if (oldVal.includes('00000') && val.includes('00000')) {
                const index = val.indexOf('00000')
                val.splice(index, 1) // 排除全选选项
                this.value5 = val
            }
            // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
            if (!oldVal.includes('00000') && !val.includes('00000')) {
                if (val.length === allValues.length - 1) this.value5 = ['00000'].concat(val)
            }
            // 储存当前最后的结果 作为下次的老数据
            this.oldOptions = this.value5
        },
        closeAlert () {
            this.showAlert = false
        },
        sureAlert () {
            if (!this.remark) {
                this.$alert('请填写拒绝理由', '提示')
                return
            }
            this.$post('sys/notice/audit', {
                'data': {
                    'noticeId': this.$route.query.noticeId,
                    'noticeStatus': -1,
                    'noticeStatusBak': this.remark
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '操作成功',
                        callback: () => {
                            this.$router.push('/notice')
                        }
                    })
                } else {
                    this.alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
                this.$alert('请求异常', '提示')
            })
            this.showAlert = false
        },
        // 审核
        audit (status) {
            if (status === -1) {
                this.showAlert = true
            } else {
                this.$post('sys/notice/audit', {
                    'data': {
                        'noticeId': this.$route.query.noticeId,
                        'noticeStatus': status,
                        'noticeStatusBak': ''
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '审核成功',
                            callback: () => {
                                this.$router.push('/notice')
                            }
                        })
                    } else {
                        this.alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求异常', '提示')
                })
            }
        },
        ready (ue) {
            if (this.forbidden) {
                ue.setDisabled()
            }
        },
        submitNotice () {
            if (!this.title1) {
                this.$alert('请填写通知标题', '提示')
                return
            }
            if (!this.createUser) {
                this.$alert('请填写通知作者', '提示')
                return
            }
            if (!this.target1 && !this.target2) {
                this.$alert('请选择发布平台', '提示')
                return
            }
            if (this.target1 && !this.value5.length) {
                this.$alert('请选择发布区域', '提示')
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
            let noticeSite = []
            if (this.target1) noticeSite.push(1)
            if (this.target2) noticeSite.push(2)
            if (this.$route.query.noticeId) {
                this.$post('sys/notice/edit', {
                    'data': {
                        'noticeId': this.$route.query.noticeId,
                        'noticeTitle': this.title1,
                        'noticeContent': this.content,
                        'noticeUser': this.createUser,
                        'noticePublishTime': this.value1,
                        'noticePublishType': this.radio,
                        'noticeStatus': 0,
                        'noticeStatusBak': '',
                        'noticeArea': this.value5.join(','),
                        'noticeSite': noticeSite.join(',')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '提交成功',
                            callback: () => {
                                // this.$router.go(-1)
                                this.$router.push('/notice')
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求异常', '提示')
                })
            } else {
                this.$post('sys/notice/add', {
                    'data': {
                        'noticeTitle': this.title1,
                        'noticeContent': this.content,
                        'noticeUser': this.createUser,
                        'noticePublishTime': this.value1,
                        'noticePublishType': this.radio,
                        'noticeArea': this.value5.join(','),
                        'noticeSite': noticeSite.join(',')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '提交成功',
                            callback: () => {
                                // this.$router.go(-1)
                                this.$router.push('/notice')
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求异常', '提示')
                })
            }
        },
        goBack () {
            if (this.forbidden) {
                this.$router.push('/notice')
            } else {
                this.$myAlert({
                    title: '提示',
                    msg: '通知内容尚未保存,是否继续？'
                }).then(() => {
                    this.$router.push('/notice')
                }).catch(() => {
                    console.log('取消')
                })
            }
        },
        deleteFile (index) {
            this.uploadList.splice(index, 1)
        },
        // 长传成功钩子
        uploadSuccess (response, file, fileList) {
            this.uploadList.push(file)
            // let temp = editor2.txt.html()
            // let fileName = file.name
            // let imgCLass = ''
            // if (fileName.indexOf('doc') !== -1) {
            //     imgCLass = 'doc'
            // } else if (fileName.indexOf('txt') !== -1) {
            //     imgCLass = 'txt'
            // } else if (fileName.indexOf('xls') !== -1) {
            //     imgCLass = 'xls'
            // } else if (fileName.indexOf('pdf') !== -1) {
            //     imgCLass = 'pdf'
            // } else {
            //     imgCLass = 'nopic'
            // }
            // editor2.txt.html(temp + `<div style="text-align:left;"><a style="color:#359dff;" class="img-box ${imgCLass}" href='${response.data}'>${file.name}</a></div>`)
        },
        // add () {
        //     alert(editor2.txt.html())
        // }
        query () {
            this.$post('/sys/notice/view', {
                'data': {
                    'noticeId': this.$route.query.noticeId
                }
            }).then(res => {
                if (res.status === 200) {
                    // editor2.txt.html(res.data.noticeContent)
                    this.title1 = res.data.noticeTitle
                    this.createUser = res.data.noticeUser
                    this.content = res.data.noticeContent
                    this.value5 = res.data.noticeArea.split(',')
                    if (res.data.noticeSite.indexOf('1') !== -1) this.target1 = true
                    if (res.data.noticeSite.indexOf('2') !== -1) this.target2 = true
                    this.value1 = res.data.noticePublishTime
                    this.radio = res.data.noticePublishType + ''
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
.addNotice {
    background: #ffffff;
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
    .alert-content {
        padding: 30px 0;
        .name {
            float:left;
            width: 134px;
            text-align: right;
            font-size: 14px;
            color: #333;
            .red {
                color: #ff0000;
            }
        }
        .textarea {
            float: left;
            width: 250px;
            height: 68px;
        }
        .btn {
            padding-left: 82px;
            .el-button{
                width: 98px;
                height: 34px;
                line-height: 34px;
                padding: 0;
                margin-right: 30px;
            }
        }
    }
    .notice-btn {
        width: 98px;
        border: none;
        background: #359DFF;
        color: #ffffff;
        height: 34px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
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
        background-color: #ffffff;
        top: 0;
        .wrap {
            top: 0;
            left: 0px;
            bottom: 0;
            right: 0;
            position: relative;
            .content2 {
                padding-top: 50px;
                padding-bottom: 100px;
                h4 {
                    text-align: left;
                    margin-top: 30px;
                }
                padding-left: 50px;
                .line-box {
                    margin-top: 20px;
                    text-align: left;
                    label {
                        float: left;
                        margin-right: 20px;
                        width: 140px;
                        text-align: right;
                        font-size: 14px;
                        span {
                            color: red;
                        }
                    }
                    .tool_ipt {
                        float: left;
                        width: 900px;
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
                    width: 900px;
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
.addNotice {
    .modal {
        z-index: 99999;
    }
    .edui-editor-breadcrumb {
        display: none;
    }
    .ueditor1 {
        display: inline-block;
        width: 900px;
    }
    .el-checkbox {
        text-align: left!important;
    }
    .el-radio {
        line-height: 34px;
        text-align: left!important;
    }
    .el-input__icon {
        line-height: 34px!important;
    }
    .el-message-box__wrapper {
        z-index: 10001!important;
    }
    .el-icon-tickets {
        margin-right: 8px;
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
    .img-box {
        position: relative;
        padding-left: 16px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top:3px;
            width: 16px;
            height: 16px;
            background-size: 100% 100%;
            &.doc {
                background: url('../../assets/images/icon_doc.gif');
            }
            &.xls {
                background: url('../../assets/images/icon_xls.gif')
            }
            &.txt {
                background: url('../../assets/images/icon_txt.gif')
            }
        }
        &.doc:before {
            background: url('../../assets/images/icon_doc.gif');
        }
        &.xls:before {
            background: url('../../assets/images/icon_xls.gif')
        }
        &.txt:before {
            background: url('../../assets/images/icon_txt.gif')
        }
        &.pdf:before {
            background: url('../../assets/images/icon_pdf.png')
        }
        &.nopic:before {
            background: url('../../assets/images/icon_nopic.png')
        }
    }
}
</style>
