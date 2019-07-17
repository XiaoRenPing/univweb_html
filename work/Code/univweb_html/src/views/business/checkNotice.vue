<template>
    <div class="checkNotice">
        <div class="content">
            <!-- <tool-bar :title="'通知发布>查看通知信息'">
                <button class="back_btn" @click="$router.push('/notice')">返回</button>
            </tool-bar> -->
            <div class='wrap'>
                <div class="content2">
                    <h3>{{title}}</h3>
                    <p class="text-header">作者：{{author?author:'未知'}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{time|filterTime('yyyy-mm-dd')}}</p>
                    <div class="text" v-html="content">
                    </div>
                </div>
            </div>
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button class="react_btn" @click="$router.push('/notice')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'checkNotice',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '通知发布', path: '' }, { title: '查看通知信息', path: '' }
            ],
            title: '',
            time: '',
            author: '',
            content: '', // 通知内容
            input: '',
            value: ''
        }
    },
    created () {
        this.$post('sys/notice/view', {
            'data': {
                'noticeId': this.$route.query.noticeId
            }
        }).then(res => {
            if (res.status === 200) {
                this.content = res.data.noticeContent
                this.time = res.data.noticePublishTime
                this.author = res.data.createUser
                this.title = res.data.noticeTitle
            }
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {},
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar
    },
    // 方法
    watch: {},
    methods: {
        upFile (e) {
            console.log(e)
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {
    }
}
</script>

<style lang="less" scoped>
.checkNotice {
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        background: #FFF;
        .wrap {
            .content2 {
                min-height: 700px;
                padding-bottom: 100px;
                h3 {
                    margin-top: 50px;
                    margin-bottom: 20px;
                }
                .text-header {
                    font-size: 12px;
                    color: #666666;
                }
                .text {
                    width: 800px;
                    margin: 0 auto;
                }
            }
        }
    }
    .img-box {
        display: inline-block;
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
}
</style>
<style lang="less">
.checkNotice {
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
