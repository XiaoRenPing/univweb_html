<!-- 外链通告详情 -->
<template>
    <div class="detail">
        <div class="header" @mouseleave="showSecondNav=false">
            <div class="img-box" ref="imgBox">
                <img class="name_img" src="../../assets/images/icon_logocarbleck.png">
                <div class="title">
                    <h1 ref="title">{{title}}</h1><br />
                    <h6 ref="enName" class="en">{{info.associationNameEn || 'Motor vehicle maintenance repair and testing supervision management system'}}</h6>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- <div class="header">你的当前位置-首页-行业论坛</div> -->
            <h2 v-html="dataObj.noticeTitle"></h2>
            <ul>
                <li>发布人：{{dataObj.noticeUser}}</li>
                <li>发布时间：{{dataObj.noticePublishTime | filterTime('yyyy-mm-dd')}}</li>
                <!-- <li>来源：{{dataObj.source}}</li> -->
            </ul>
            <div class="text" v-html="dataObj.noticeContent">
                <!-- {{dataObj.context}} -->
            </div>
        </div>
        <!-- <div class="server-box">
            <Server></Server>
        </div> -->
    </div>
</template>

<script>
import { getCookie } from '../../utils/cookie.js'
export default {
    name: 'noticeDetail',
    data () {
        return {
            logo: '',
            title: '',
            info: '',
            navHide: false,
            username: getCookie('user'),
            dataObj: '',
            value: '',
            currentPage: 1
        }
    },
    components: {
    },
    methods: {
        // 获取主标题
        getTitle () {
            this.$post('external/index')
                .then(res => {
                    if (res.status === 200) {
                        this.title = res.data.sysTitle
                        document.title = res.data.sysTitle
                        this.info = res.data
                    } else {
                        this.$alert(res.message, '提示')
                    }
                    this.getNoticeDetail()
                    setTimeout(() => {
                        this.setTitleStyle()
                    }, 500)
                })
        },
        getNoticeDetail () {
            this.$post('external/notice/viewdetail', {
                'data': {
                    'noticeId': this.$route.query.noticeId
                }
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    this.dataObj = res.data
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setTitleStyle () {
            var title = this.$refs.title
            var enName = this.$refs.enName
            var defEnW = enName.clientWidth
            var step = /Automobile/i.test(enName.innerHTML) ? 5.8 : 7.41
            // 设置标题对齐
            if (title.innerHTML.length > 17) {
                title.style.fontSize = '24px'
                enName.style.letterSpacing = (title.clientWidth - defEnW) / step * 0.1 + 'px'
            } else {
                enName.style.letterSpacing = (title.clientWidth - defEnW) / step * 0.1 + 'px'
            }
        }
    },
    created () {
    },
    mounted () {
        this.getTitle()
    }
}
</script>

<style lang='less' scoped>
.header {
    height: 100px;
    width: 100%;
    background-color: #0853A6;
    color: #ffffff;
    position: relative;
    z-index: 2;
    .img-box {
        display: inline-block;
        width: 1100px;
        // float: left;
        min-width: 500px;
        height: 100px;
        .title {
            margin-left: 90px;
            margin-top: 21px;
            text-align: left;
            h1 {
                display: inline-block;
                font-size: 26px;
            }
            .en {
                font-size: 13px;
                color: #fff;
                letter-spacing: 0px;
                font-weight: normal;
                margin-top: 2px;
                display: inline-block;
            }
        }
    }
    .name_img {
        float: left;
        margin-left: 20px;
        margin-top: 20px;
    }
}
.detail {
    background: #F5F5F5;
    min-height: 100%;
    // padding-top: 20px;
    box-sizing: border-box;
    .content {
        box-sizing: border-box;
        min-height: 100%;
        width: 1100px;
        padding: 40px;
        margin: 20px auto 0;
        background: #ffffff;
        h2 {
            text-align: center;
            margin-bottom: 24px;
            color: #333333;
            font-size: 18px;
        }
        ul {
            overflow: hidden;
            // margin-left: 280px;
            display: inline-block;
            li {
                float: left;
                margin-left: 20px;
                font-size: 14px;
                color: #666;
            }
        }
        .text {
            border-top: 1px dashed #dddddd;
            margin-top: 20px;
            font-size: 12px;
            line-height: 25px;
            padding-top: 12px;
        }
    }
}
</style>
