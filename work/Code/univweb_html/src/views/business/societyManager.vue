<!-- 协会管理 -->
<template>
    <div class="societyManager">
        <tool-bar :title="'业务操作>协会网站管理>协会管理'">
            <el-button icon="el-icon-tickets" type="primary" @click="saveData" :disabled="!$checkAuth('external/association/edit')">保存</el-button>
            <button class="back_btn2" @click="$router.push('/home')" style="line-height:32px;vertical-align:middle">返回</button>
        </tool-bar>
        <div class="content" v-loading="loading">
            <div class="more-info">
                <div class="basic-info clearfix">
                    <h6>协会基本信息</h6>
                    <div class="left">
                        <div class="info-item">
                            <div class="name">
                                <span class="name-red">*&nbsp;</span>协会名称：
                            </div>
                            <div class="msg">
                                <el-input maxlength="18" v-model="societyData.associationName"></el-input>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="name">
                                <span class="name-red">*&nbsp;</span>协会副名称：
                            </div>
                            <div class="msg">
                                <el-input maxlength="20" v-model="societyData.associationSecondName"></el-input>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="name">
                                <span class="name-red">*&nbsp;</span>服务热线：
                            </div>
                            <div class="msg">
                                <el-input maxlength="20" v-model="societyData.associationPhone"></el-input>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="name">
                                <span class="name-red">*&nbsp;</span>联系人：
                            </div>
                            <div class="msg">
                                <el-input maxlength="10" v-model="societyData.associationLink"></el-input>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="name">
                                <span class="name-red">*&nbsp;</span>联系电话：
                            </div>
                            <div class="msg">
                                <el-input maxlength="11" v-model="societyData.associationLinkMobile"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="info-item clearfix">
                            <div class="name logo fl">
                                <span class="name-red">*&nbsp;</span>协会logo：<br>（60x60px）
                            </div>
                            <div class="msg fl">
                                <div class="license-wrap">
                                    <upload
                                        class="upload-demo"
                                        :on-success="uploadSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <div class="empty" v-show="!societyData.associationLogo">
                                            <img src="../../assets/images/audit/default_icon_photo.png" alt="附件">
                                        </div>
                                        <img class="association-logo" v-show="societyData.associationLogo" ref="licenseImg" :src="societyData.associationLogo" alt="附件">
                                    </upload>
                                </div>
                            </div>
                        </div>
                        <div class="info-item clearfix">
                            <div class="name fl">
                                英文名称：
                            </div>
                            <div class="msg fl">
                                <el-input maxlength="50" v-model="societyData.sysTitleEn"></el-input>
                            </div>
                        </div>
                        <div class="info-item clearfix">
                            <div class="name fl">
                                邮箱：
                            </div>
                            <div class="msg fl">
                                <el-input maxlength="20" v-model="societyData.associationEmail"></el-input>
                            </div>
                        </div>
                        <div class="info-item clearfix">
                            <div class="name fl">
                                传真：
                            </div>
                            <div class="msg fl">
                                <el-input maxlength="20" v-model="societyData.associationFax"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map">
                    <h6>协会位置信息</h6>
                    <!-- <div class="info-item">
                        <div class="name"><span class="name-red">*&nbsp;</span>协会地址：</div>
                        <div class="msg">
                            <el-cascader
                                v-model="societyAddress"
                                :options="options"
                                @active-item-change="handleItemChange"
                                :props="props">
                            </el-cascader>
                        </div>
                    </div> -->
                    <div class="info-item">
                        <div class="name"><span class="name-red">*&nbsp;</span>协会地址：</div>
                        <div class="msg">
                            <el-input maxlength="50" v-model.trim="societyData.associationAddress"></el-input>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="name">
                            <span class="name-red">*&nbsp;</span>经度：
                        </div>
                        <div class="msg">
                            <el-input step="0.000001" type="number" v-model.number="center.lng"></el-input>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="name">
                            <span class="name-red">*&nbsp;</span>纬度：
                        </div>
                        <div class="msg">
                            <el-input step="0.000001" type="number" v-model.number="center.lat"></el-input>
                        </div>
                    </div>
                    <div class="localtion-search">
                        <el-button type="primary" @click="mapSearch">获取经纬度</el-button>
                    </div>
                    <baidu-map :center="center" :scroll-wheel-zoom="true" :double-click-zoom="true" :zoom="zoom" @click="changeLocation">
                        <bm-view class="bm-view"></bm-view>
                        <bm-local-search :keyword="BMkeyword" :panel="false" :selectFirstResult="true" :auto-viewport="true" :location="BMlocation" @searchcomplete="searchcomplete"></bm-local-search>
                    </baidu-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CodeToText } from 'element-china-area-data'
import Header from '@/components/Header'
import Modal from '../../components/Modal'
import upload from '../../components/upload'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'societyManager',
    data () {
        return {
            uploadURL: window.uploadURL,
            societyAddress: [], // 协会省市地址
            BMkeyword: '', // 百度搜索关键词
            BMlocation: '', // 百度搜索城市名称
            province: '', // 省
            city: '', // 市
            region: '', // 区
            societyData: {},
            center: { // 坐标经纬度
                lng: 116.403847,
                lat: 39.915526
            },
            zoom: 15, // 缩放等级
            options: [], // 地区数据
            props: {
                value: 'regionId',
                label: 'regionName',
                children: 'cities'
            },
            regionList: [
            ],
            loading: false,
            sendData: false
        }
    },
    components: {
        Header,
        upload,
        ToolBar,
        Modal
    },
    computed: {
    },
    created () {
        this.queryData()
    },
    methods: {
        // 保存详情数据
        saveData () {
            if (!this.societyData.associationName) {
                this.$alert('请输入协会名称！', '提示')
                return
            }
            if (!this.societyData.associationLogo) {
                this.$alert('请上传协会logo！', '提示')
                return
            }
            if (!this.societyData.associationSecondName) {
                this.$alert('请输入协会副名称！', '提示')
                return
            }
            if (!/(^1\d{10}$)|(^\d{3}-\d{1,15}$)|(^\d{4}-\d{1,15}$)/.test(this.societyData.associationPhone)) {
                this.$alert('请输入服务热线，支持固定电话或手机号码！', '提示')
                return
            }
            if (!this.societyData.associationLink) {
                this.$alert('请输入联系人！', '提示')
                return
            }
            if (!this.societyData.associationLinkMobile) {
                this.$alert('请输入联系人电话！', '提示')
                return
            }
            if (!/^1\d{10}$/.test(this.societyData.associationLinkMobile)) {
                this.$alert('请输入正确的联系人电话，应为13位手机号码！', '提示')
                return
            }
            if (!this.societyData.associationAddress) {
                this.$alert('请输入协会地址！', '提示')
                return
            }
            if (!this.center.lng || !this.center.lat) {
                this.$alert('请输入正确的经度和纬度！', '提示')
                return
            }
            if (this.societyData.sysTitleEn && !/^[\w\s]+$/.test(this.societyData.sysTitleEn)) {
                this.$alert('请输入正确的英文名称！', '提示')
                return
            }
            if (this.societyData.associationEmail && !/^.+@.+$/.test(this.societyData.associationEmail)) {
                this.$alert('请输入正确的邮箱地址！', '提示')
                return
            }
            if (this.societyData.associationFax && !/(^\d{3}-\d{1,15}$)|(^\d{4}-\d{1,15}$)/.test(this.societyData.associationFax)) {
                this.$alert('请输入正确的传真号码！', '提示')
                return
            }
            var obj = {
                data: this.societyData
            }
            if (this.societyData.sysTitleEn) {
                obj.sysTitleEn = this.societyData.sysTitleEn
            }
            obj.data.associationMapX = this.center.lng + ''
            obj.data.associationMapY = this.center.lat + ''
            obj.data.associationId = 'F7F2BB5FD54C4DE0AA939082C6F1A9C5'
            this.$post('external/association/edit', obj)
                .then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '保存成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
                .catch(() => {
                    this.$alert('网络错误，请重试', '提示')
                })
        },
        // 获取详情数据
        queryData () {
            this.$post('external/association/detail', {
                data: {
                    associationId: 'F7F2BB5FD54C4DE0AA939082C6F1A9C5'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.societyData = res.data
                        setTimeout(() => {
                            this.center.lng = res.data.associationMapX - 0
                            this.center.lat = res.data.associationMapY - 0
                        }, 500)
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
                .catch(() => {
                    this.$alert('网络错误，请重试', '提示')
                })
        },
        // 级联选择器变动
        handleItemChange (val) {
            if (val[1]) {
                this.getRegion(val[0], val[1])
            } else {
                this.getCities(val[0])
            }
        },
        // 获取市区数据
        getRegion (parentId, regionId) {
            this.$post('bas/city/findRegion', {
                data: {
                    parentId: regionId
                }
            })
                .then(res => {
                    this.options.forEach(item => {
                        if (item.regionId === parentId) {
                            item.cities.forEach(itemB => {
                                if (itemB.regionId === regionId) {
                                    itemB.cities = res.datas
                                }
                            })
                        }
                    })
                })
        },
        // 获取市数据
        getCities (id) {
            this.$post('bas/city/findCity', {
                data: {
                    parentId: id
                }
            })
                .then(res => {
                    res.datas && res.datas.forEach(item => {
                        item.cities = []
                    })
                    this.options.forEach(item => {
                        if (item.regionId === id) {
                            item.cities = res.datas
                        }
                    })
                })
        },
        // 获取省份数据
        getProvince () {
            this.$post('bas/city/findProvince', {})
                .then(res => {
                    res.datas && res.datas.forEach(item => {
                        item.cities = []
                    })
                    this.options = res.datas
                })
        },
        // 图片加载后处理
        imgLoad (imgshow, pic, src) {
            var radio = 152 / 152
            var _this = this
            var img = new Image()
            img.src = src
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs[imgshow].style.width = '100%'
                } else {
                    _this.$refs[imgshow].style.height = '100%'
                }
                _this[pic] = src
            }
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
        // 图片清空
        handleRemove (file) {
            this.societyData.associationLogo = ''
        },
        uploadSuccess (res) {
            var _this = this
            var img = new Image()
            img.src = res.data
            img.onload = function () {
                if (this.width / this.height > 1) {
                    _this.$refs.licenseImg.style.width = '100%'
                } else {
                    _this.$refs.licenseImg.style.height = '100%'
                }
                _this.societyData.associationLogo = res.data
                _this.$message({
                    message: '图片上传成功！',
                    type: 'success'
                })
            }
        },
        // goBack () {
        //     this.$myAlert({
        //         title: '提示',
        //         msg: '返回后数据将不会保存，是否继续？'
        //     }).then(res => {
        //         this.$router.go(-1)
        //         this.
        //     }).catch(() => {})
        // },
        // 百度地图初始化
        handler ({ BMap, map }) {
        },
        // 搜索百度地图
        mapSearch () {
            var str = '';
            (CodeToText[this.societyAddress[1]] &&
            CodeToText[this.societyAddress[1]] !== '市辖区' &&
            (str += CodeToText[this.societyAddress[1]])) || (str += CodeToText[this.societyAddress[0]])
            // 遍历地址信息,匹配省市区
            this.BMkeyword = this.societyData.associationAddress
            this.BMlocation = str
        },
        // 搜索回调函数
        searchcomplete (res) {
            if (!res) {
                return
            }
            if (!res.Ar.length) {
                this.$message.error('未找到您输入的位置信息!')
            }
            if (res && res.Ar.length > 0) {
                this.center.lng = res.Ar[0].point.lng
                this.center.lat = res.Ar[0].point.lat
            }
        },
        // 点击地图触发事件
        changeLocation (res) {
            if (res.bb) {
                this.longitude = res.bb.LA.lng
                this.latitude = res.bb.LA.lat
            }
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    border-top: 1px solid #ddd;
}
.basic-info {
    width: 1200px;
    h6 {
        width: 166px;
        text-align: right;
        font-size: 14px;
        color: #666;
    }
    .left {
        float: left;
        width: 530px;
        .info-item {
            .name-red {
                color: #FF1200;
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 176px;
                text-align: right;
                color: #666;
                font-size: 14px;
                margin-right: 6px;
            }
            .msg {
                display: inline-block;
                width: 345px;
            }
        }
    }
    .right {
        float: left;
        width: 594px;
        .info-item {
            text-align: right;
            .name-red {
                color: #FF1200;
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                width: 240px;
                text-align: right;
                color: #666;
                font-size: 14px;
                line-height: 34px;
                &.logo {
                    line-height: 22px;
                }
            }
            .msg {
                margin-left: 6px;
                width: 345px;
                .license-wrap {
                    width: 58px;
                    height: 58px;
                    border: 1px solid #ddd;
                    padding: 4px;
                    margin-bottom: 10px;
                    text-align: center;
                    .upload-demo {
                        width: 100%;
                        height: 100%;
                        .empty {
                            width: 100%;
                            background: #eee;
                            line-height: 58px;
                            img {
                                width: 24px;
                            }
                        }
                    }
                    .association-logo {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    .bottom {
        float: left;
        .info-item {
            .name-red {
                color: #FF1200;
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 169px;
                margin-right: 6px;
                text-align: right;
                color: #666;
                font-size: 14px;
            }
            .msg {
                display: inline-block;
                width: 930px;
            }
        }
    }
}
.more-info {
    width: 1122px;
    padding-top: 30px;
    .map {
        position: relative;
        height: 326px;
        h6 {
            font-size: 14px;
            color: #666;
            text-align: left;
            width: 166px;
            text-align: right;
            padding-top: 30px;
        }
        .localtion-search{
            position:absolute;
            top: 60px;
            left: 540px;
        }
        .other-info {
            padding-left: 75px;
        }
        .info-item {
            width: 530px;
            .name-red {
                color: #FF1200;
                font-size: 14px;
            }
            margin-top: 10px;
            .name {
                display: inline-block;
                width: 176px;
                text-align: right;
                color: #666;
                font-size: 14px;
            }
            .msg {
                margin-left: 6px;
                display: inline-block;
                width: 345px;
                text-align: left;
            }
        }
    }
}
.bm-view {
    width: 345px;
    height: 260px;
    position: absolute;
    top: 64px;
    right: 0px;
}
</style>
<style lang="less">
.societyManager {
    .el-tabs--border-card {
        border: none;
    }
    .el-tabs--border-card {
        box-shadow: none;
    }
    .el-input__inner {
        height: 34px;
        line-height: 34px;
        color: #666;
        font-size: 14px;
    }
    .basic-info {
        .el-input {
            width: 100%;
        }
        .el-select {
            width: 100%
        }
        .height {
            .el-textarea__inner {
                height: 68px;
                resize: none;
                color: #333;
                font-size: 14px;
            }
        }
        .right {
            .info-item {
                &.record {
                    .el-input {
                        width: 274px;
                        margin-right: 16px;
                    }
                    .el-button--primary {
                        width: 55px;
                        height: 34px;
                        padding: 0;
                    }
                    .el-input, .el-button--primary {
                        vertical-align: middle;
                    }
                    .disable {
                        background-color: #BBCBDF;
                        border: 1px solid #BBCBDF;
                    }
                }
                &.detail {
                    .el-input {
                        width: 100%;
                    }
                }
            }
        }
        .bottom {
            .el-input {
                width: 930px;
            }
        }
        .el-input__suffix {
            top: 3px;
        }
        .el-date-editor--daterange.el-input__inner {
            width: 100% !important;
        }
        .el-date-editor .el-range__icon {
            line-height: 26px;
        }
    }
    .more-info {
        .el-input--suffix .el-input__inner {
            width: 345px;
        }
    }
    .add-brand-alert {
        .el-button {
            width: 78px;
            height: 30px;
            line-height: 30px;
            color: #536083;
            border: 1px solid #BBCBDF;
            border-radius:2px;
            background-color: #F6F9FC;
            padding: 0;
        }
    }
    .upload-demo, .el-upload {
        width: 100%;
        height: 100%;
    }
    .el-upload-list {
        position: absolute;
        bottom: -28px;
        left: 8px;
    }
}
</style>
