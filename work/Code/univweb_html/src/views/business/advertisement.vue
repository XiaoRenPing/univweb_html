<!-- 广告管理 -->
<template>
    <div class="advertisement">
        <tool-bar :title="'业务操作>>协会网站管理>>广告管理'">
            <label v-if="siderId === '1'">广告分类：</label>
            <el-select v-if="siderId === '1'" v-model="advertLocationId"  placeholder="请选择">
                <el-option
                v-for="item in searchAdvPositionList"
                :key="item.advertLocationId"
                :label="item.advertLocationName"
                :value="item.advertLocationId">
                </el-option>
            </el-select>
            <label v-if="siderId === '2'">类型名称：</label>
            <el-input v-if="siderId === '2'" class="tool_ipt" v-model.trim="searchAdvType" placeholder="请输入类型名称"></el-input>
            <label>状态：</label>
            <el-select v-model="linkStatus"  placeholder="请选择">
                <el-option
                v-for="item in linkStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <label v-if="siderId === '1'">更新时间：</label>
            <el-date-picker
                v-if="siderId === '1'"
                v-model="daterange"
                class="w240"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
            </el-date-picker>
            <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData" v-if="siderId === '1'" :disabled="!$checkAuth('external:advert:find')"></el-button>
            <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData" v-if="siderId === '2'" :disabled="!$checkAuth('external:advert:location:find')"></el-button>
            <el-button class="add_btn" v-if="siderId === '1'" icon="el-icon-add" @click="addAdvertisement" :disabled="!$checkAuth('external:advert:add')">
                <img class="add-icon" src="../../assets/images/iocn_add.png" alt="">
                <span class="add-name">添加广告</span>
            </el-button>
            <el-button class="add_btn" v-if="siderId === '2'" icon="el-icon-add" @click="addAdvertisementPos" :disabled="!$checkAuth('external:advert:location:add')">
                <img class="add-icon" src="../../assets/images/iocn_add.png" alt="">
                <span class="add-name">添加广告位</span>
            </el-button>
        </tool-bar>
        <div class="content">
            <div class="sidebar">
                <div class="side_item"
                    @click="siderChange(item.value)"
                    :class="{active: item.value === siderId}"
                    v-for="item in linkSider"
                    :key="item.value">
                    {{item.label}}
                </div>
            </div>
            <div class="table-box">
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                    <el-table-column
                        key="1"
                        prop="num"
                        label="序号"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        key="2"
                        v-if="siderId === '1'"
                        prop="advertPicUrl"
                        label="广告图">
                        <template slot-scope="scope">
                            <img class="table-advert-pic" :src="scope.row.advertPicUrl" alt="" srcset="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        key="3"
                        v-if="siderId === '1'"
                        prop="advertDesc"
                        label="广告说明">
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '1'"
                        key="4"
                        prop="advertLocationName"
                        label="广告分类">
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '1'"
                        key="5"
                        prop="advertUrl"
                        label="跳转地址">
                        <template slot-scope="scope">
                            <span :title="scope.row.advertUrl">{{
                                scope.row.advertUrl && scope.row.advertUrl.length > 30
                                ? scope.row.advertUrl.substr(0, 30) + '...'
                                : scope.row.advertUrl
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '1'"
                        key="6"
                        prop="advertStatus"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.advertStatus | filterCommon(advertLocationStatusList)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '2'"
                        key="7"
                        prop="advertLocationTypeName"
                        label="位置">
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '2'"
                        key="8"
                        prop="advertLocationName"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        v-if="siderId === '2'"
                        key="9"
                        prop="advertLocationStatus"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.advertLocationStatus | filterCommon(advertLocationStatusList)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="200"
                        prop="updateTime"
                        key="10"
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        key="11"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" class="operation" @click="getDetail(scope.row)" v-if="siderId === '1'&&$checkAuth('external:advert:view')">详情&nbsp;&nbsp;</el-button>
                            <el-button type="text" class="operation" @click="getDetail(scope.row)" v-if="siderId === '2'&&$checkAuth('external:advert:location:view')">详情&nbsp;&nbsp;</el-button>
                            <el-button type="text" class="operation" @click="deleteLink(scope.row)" v-if="siderId === '1'&&$checkAuth('external:advert:delete')">删除</el-button>
                            <el-button type="text" class="operation" @click="deleteLink(scope.row)" v-if="siderId === '2'&&$checkAuth('external:advert:location:delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page_box" slot="pagination">
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
        <modal
            @alertCancel="alertCancel"
            :title="linkId ? '编辑广告' :'添加广告'"
            :alert="advAlert"
            :height="520"
            :width="520">
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>广告分类：</div>
                    <div class="msg">
                        <el-select v-model="alertAdvPosition"  placeholder="请选择">
                            <el-option
                            v-for="item in advLocationList"
                            :key="item.advertLocationId"
                            :label="item.advertLocationName"
                            :value="item.advertLocationId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>广告logo：</div>
                    <div class="msg">
                        <div class="license-wrap" ref="licenseWrap">
                            <upload
                                class="upload-demo"
                                :on-success="uploadSuccess"
                                :before-upload="beforeAvatarUpload">
                                <div class="empty" v-show="!advLogo">
                                    <img src="../../assets/images/audit/default_icon_photo.png" alt="附件">
                                </div>
                                <img v-show="advLogo" class="logo" ref="licenseImg" :src="advLogo" alt="附件">
                            </upload>
                        </div>
                        <div class="logo-size">图片尺寸：{{logoSize}}</div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title">跳转URL：</div>
                    <div class="msg">
                        <el-input type="text" maxlength="100" v-model="advertUrl" placeholder="请输入http://或者https://开头"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                    <div class="msg">
                        <el-radio-group v-model="advertStatus">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="-1">禁用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title">广告说明：</div>
                    <div class="msg">
                        <el-input type="textarea" maxlength="250" v-model="advertDesc" resize="none" placeholder="请输入广告说明，字数限制在250字内" class="textarea"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"></div>
                    <div class="msg btn">
                        <el-button type="primary" @click="saveLink">确定</el-button>
                        <el-button @click="alertCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </modal>
        <modal
            @alertCancel="linkAlartCancel"
            :title="linkTypeId ? '编辑广告位' :'添加广告位'"
            :alert="advPosAlert"
            :height="368"
            :width="520">
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>广告名称：</div>
                    <div class="msg">
                        <el-input type="text" maxlength="20" v-model="alertAdvName" placeholder="请输入广告名称"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>广告位置：</div>
                    <div class="msg">
                        <el-select v-model="alertAdvTypePosition" placeholder="请选择">
                            <el-option
                            v-for="item in advPositionList"
                            :key="item.advertLocationTypeId"
                            :label="item.advertLocationTypeName"
                            :value="item.advertLocationTypeId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>图片尺寸：</div>
                    <div class="msg">
                        <el-input type="text" v-model="advertLocationTypeSize" disabled></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                    <div class="msg">
                        <el-radio-group v-model="advertLocationStatus">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="-1">禁用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"></div>
                    <div class="msg btn">
                        <el-button type="primary" @click="saveLinkType">确定</el-button>
                        <el-button @click="linkAlartCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import upload from '@/components/upload.vue'
import TableTemplate from '@/components/TableTemplate.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools'
export default {
    name: 'advertisement',
    data () {
        return {
            daterange: [], // 搜索日期
            advertStatus: 1,
            siderId: '1',
            logoSize: '',
            advPosAlert: false,
            advAlert: false,
            linkTypeList: [],
            alertlinkTypeList: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            advertUrl: '', // 广告跳转地址
            advLogo: '', // 广告logo
            advertDesc: '', // 广告描述
            advertLocationTypeSize: '',
            advertLocationId: '',
            advLocationList: '', // 广告位下拉
            searchAdvPositionList: [], // 搜索广告位分类
            advPositionList: [], // 广告位置下拉列表
            alertAdvPosition: [], // 弹窗广告位置
            alertAdvTypePosition: [], // 弹窗广告位位置
            alertAdvName: '',
            searchAdvType: '', // 搜索的类型名称
            searchLinkType: '', // 搜索的链接类型
            alertLinkType: '', // 添加的链接类型
            addLinkName: '', // 添加的链接名称
            addLinkHref: '', // 添加的链接地址
            addLinkRemark: '', // 添加的链接备注
            addLinkTypeName: '', // 添加的链接类型名称
            linkTypeState: '1', // 添加的链接状态
            addLinkTypeRemark: '', // 添加的链接类型备注
            linkTypeId: '', // 当前广告位id
            linkId: 0, // 当前广告id
            tableData: [],
            linkSider: [
                {
                    value: '1',
                    label: '广告管理'
                },
                {
                    value: '2',
                    label: '广告位管理'
                }
            ],
            params: {
            },
            region: '',
            searchLinkName: '', // 搜索链接名称
            regionList: [],
            advertLocationStatus: 1, // 添加广告位状态
            advertLocationStatusList: [
                {
                    value: -1,
                    label: '禁用'
                },
                {
                    value: 1,
                    label: '启用'
                }
            ],
            linkStatus: '',
            linkStatusList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: -1,
                    label: '禁用'
                },
                {
                    value: 1,
                    label: '启用'
                }
            ]
        }
    },
    components: {
        Modal,
        upload,
        TableTemplate,
        ToolBar
    },
    watch: {
        // 当前选择广告的图片尺寸
        alertAdvPosition (val) {
            for (var i = 0; i < this.advLocationList.length; i++) {
                if (this.advLocationList[i].advertLocationId === val) {
                    for (var j = 0; j < this.advPositionList.length; j++) {
                        if (this.advPositionList[j].advertLocationTypeId === this.advLocationList[i].advertLocationTypeId) {
                            this.logoSize = this.advPositionList[j].advertLocationTypeSize
                        }
                    }
                }
            }
        },
        // 当前选择广告位置的图片尺寸
        alertAdvTypePosition (val) {
            for (var i = 0; i < this.advPositionList.length; i++) {
                if (this.advPositionList[i].advertLocationTypeId === val) {
                    this.advertLocationTypeSize = this.advPositionList[i].advertLocationTypeSize
                }
            }
        }
    },
    created () {
        this.getAdvPosDown()
        this.getAdvLocationDown()
    },
    methods: {
        // 保存广告
        saveLink () {
            if (!this.alertAdvPosition) {
                this.$alert('请选择广告分类！', '提示')
                return
            }
            if (!this.advLogo) {
                this.$alert('请上传广告logo！', '提示')
                return
            }
            if (this.advertUrl && !/^http:\/\/|https:\/\//i.test(this.advertUrl)) {
                this.$alert('请输入正确的跳转地址！', '提示')
                return
            }
            var obj = {
                data: {
                    advertLocationId: this.alertAdvPosition,
                    advertUrl: this.advertUrl,
                    advertPicUrl: this.advLogo,
                    advertStatus: this.advertStatus,
                    advertDesc: this.advertDesc
                }
            }
            if (this.linkId) {
                obj.data.advertId = this.linkId
                this.$post('external/advert/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.alertCancel()
                            this.$toast({
                                msg: '编辑成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试！', '提示')
                        console.log(err)
                    })
            } else {
                this.$post('external/advert/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.alertCancel()
                            this.$toast({
                                msg: '添加成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试！', '提示')
                        console.log(err)
                    })
            }
        },
        // 保存广告位
        saveLinkType () {
            if (!this.alertAdvName) {
                this.$alert('广告名称不能为空！', '提示')
                return
            }
            if (!this.alertAdvTypePosition) {
                this.$alert('请选择广告位置！', '提示')
                return
            }
            var obj = {
                data: {
                    advertLocationName: this.alertAdvName,
                    advertLocationTypeId: this.alertAdvTypePosition
                }
            }
            if (!this.linkTypeId) {
                obj.data.status = this.advertLocationStatus
                this.$post('external/advert/location/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.linkAlartCancel()
                            this.$toast({
                                msg: '添加成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试！', '提示')
                        console.log(err)
                    })
            } else {
                obj.data.advertLocationId = this.linkTypeId
                obj.data.advertLocationStatus = this.advertLocationStatus
                this.$post('external/advert/location/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.linkAlartCancel()
                            this.$toast({
                                msg: '编辑成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试！', '提示')
                        console.log(err)
                    })
            }
            setTimeout(() => {
                this.getAdvLocationDown()
            }, 500)
        },
        // 所有数据列表
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var url = ''
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                data: {
                }
            }
            if (this.siderId === '1') {
                if (!this.$checkAuth('external:advert:find')) {
                    this.$alert('没有查询权限', '提示')
                    return
                }
                this.advertLocationId && (obj.data.advertLocationId = this.advertLocationId)
                this.linkStatus && (obj.data.advertStatus = this.linkStatus)
                if (this.daterange && this.daterange.length) {
                    obj.startDate = this.daterange[0]
                    obj.endDate = this.daterange[1]
                }
                url = 'external/advert/find'
            } else {
                if (!this.$checkAuth('external:advert:location:find')) {
                    this.$alert('没有查询权限', '提示')
                    return
                }
                obj.data.advertLocationName = this.searchAdvType
                obj.data.advertLocationStatus = this.linkStatus
                url = 'external/advert/location/find'
            }
            this.loading = true
            this.$post(url, obj).then(res => {
                if (res.status === 200) {
                    var data = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.tableData = data
                    this.total = res.data.total
                }
                this.loading = false
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        // 获取广告位分类下拉列表
        getAdvLocationDown () {
            this.$post('external/advert/location/list', {}).then(res => {
                if (res.status === 200) {
                    var data = [...res.data]
                    data && data.length && data.unshift({
                        advertLocationName: '全部',
                        advertLocationId: ''
                    })
                    this.searchAdvPositionList = data
                    this.advLocationList = res.data
                    this.queryData()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取广告位置下拉列表
        getAdvPosDown () {
            this.$post('external/advert/locationtype/list', {}).then(res => {
                if (res.status === 200) {
                    this.advPositionList = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 打开添加广告位弹窗
        addAdvertisementPos () {
            this.advPosAlert = true
        },
        // 打开添加广告弹窗
        addAdvertisement () {
            this.advAlert = true
        },
        // 关闭广告弹窗
        alertCancel () {
            this.advAlert = false
            this.advLogo = ''
            this.advertStatus = 1
            this.advertUrl = ''
            this.advertDesc = ''
            this.logoSize = ''
            this.linkId = 0
            this.alertAdvPosition = ''
        },
        // 关闭广告位弹窗
        linkAlartCancel () {
            this.advPosAlert = false
            this.alertAdvName = ''
            this.alertAdvTypePosition = ''
            this.linkTypeId = ''
            this.advertLocationTypeSize = ''
            this.advertLocationStatus = 1
        },
        // 广告和广告位详情
        getDetail (item) {
            if (this.siderId === '1') {
                this.$post('external/advert/detail', {
                    data: {
                        advertId: item.advertId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.advAlert = true
                        this.alertAdvPosition = res.data.advertLocationId
                        this.linkId = res.data.advertId
                        this.advLogo = res.data.advertPicUrl
                        this.advertStatus = res.data.advertStatus
                        this.advertUrl = res.data.advertUrl
                        this.advertDesc = res.data.advertDesc
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.$post('external/advert/location/detail', {
                    data: {
                        advertLocationId: item.advertLocationId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.advPosAlert = true
                        this.alertAdvName = res.data.advertLocationName
                        this.alertAdvTypePosition = res.data.advertLocationTypeId
                        this.advertLocationStatus = res.data.advertLocationStatus
                        this.linkTypeId = res.data.advertLocationId
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        // 左侧菜单切换
        siderChange (id) {
            this.siderId = id
            this.pageNum = 1
            this.queryData()
        },
        // 删除
        deleteLink (item) {
            var url = ''
            var msg = ''
            var obj = {
                data: {}
            }
            if (this.siderId === '1') {
                msg = `确定要删除序号为 "${item.num}" 的广告图吗？`
                obj.data.advertId = item.advertId
                url = 'external/advert/delete'
            } else {
                msg = `确定要删除 "${item.advertLocationName}" 吗？`
                obj.data.advertLocationId = item.advertLocationId
                url = 'external/advert/location/delete'
            }
            this.$myAlert({
                title: '提示',
                type: 'waring',
                msg: msg
            }).then(res => {
                this.$post(url, obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '删除成功'
                            })
                            this.queryData()
                            this.getAdvLocationDown()
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
        beforeAvatarUpload (file) {
            console.log(file)
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
            this.advLogo = res.data
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
        }
    }
}
</script>

<style lang='less' scoped>
@import '../../assets/css/util.less';
.advertisement {
    .license-wrap {
        width: 120px;
        height: 88px;
        border: 1px solid #ddd;
        padding: 4px;
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
                line-height: 114px;
                img {
                    width: 46px;
                }
            }
        }
    }
    .content {
        position: relative;
        border-top: 1px solid #ddd;
        .sidebar {
            position: absolute;
            width: 250px;
            height: 100%;
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
        .table-box {
            padding: 20px 20px 0 20px;
            margin-left: 250px;
            .table-advert-pic {
                width: 120px;
                height: 70px;
                margin-top: 6px;
            }
            .operation {
                cursor: pointer;
                &:hover {
                    color: #359dfe;
                }
            }
        }
    }
    .form {
        .logo-size {
            line-height: 12px;
            color: #ff0000;
            font-size: 12px;
            margin-top: 6px;
        }
    }
    .alertForm(146px, 300px, 68px);
}
</style>
<style lang="less">
.advertisement {
    .el-upload {
        width: 100%;
        height: 100%;
    }
}
</style>
