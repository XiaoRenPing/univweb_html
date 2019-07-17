<!-- 链接类型管理 -->
<template>
    <div class="linkType">
        <table-template
            @siderChange="siderChange"
            :siderbar="linkSider"
            :siderTemplate="{
                name: 'label',
                id: 'value'
            }"
            :title="'业务操作>协会网站管理>链接管理'"
            :tableData="tableData">
            <template slot="tool">
                <label v-show="siderId === '1'">链接名称：</label>
                <el-input v-show="siderId === '1'" class="tool_ipt w200" v-model.trim="searchLinkName" placeholder="请输入链接名称"></el-input>
                <label v-show="siderId === '2'">链接类型名称：</label>
                <el-input  v-show="siderId === '2'" class="tool_ipt w200" v-model.trim="searchLinkTypeName" placeholder="请输入链接类型名称："></el-input>
                <label v-show="siderId === '1'">链接类型：</label>
                <el-select v-show="siderId === '1'" v-model="searchLinkType"  placeholder="请选择">
                    <el-option
                    v-for="item in linkTypeList"
                    :key="item.linkTypeId"
                    :label="item.typeName"
                    :value="item.linkTypeId">
                    </el-option>
                </el-select>
                <label>状态：</label>
                <el-select v-model="linkStatus"  placeholder="请选择">
                    <el-option
                    v-for="item in linkStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="search_btn" type="primary" icon="el-icon-search" v-if="siderId === '1'" @click="queryData(1)" :disabled="!$checkAuth('external:friendlink:url:findlink')"></el-button>
                <el-button class="search_btn" type="primary" icon="el-icon-search" v-if="siderId === '2'" @click="queryData(1)" :disabled="!$checkAuth('external:friendlink:url:type:find')"></el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="addlink"  v-if="siderId === '1'" :disabled="!$checkAuth('external:friendlink:url/add')">
                    <img class="add-icon" src="../../assets/images/iocn_add.png" alt="">
                    <span class="add-name">添加链接</span>                </el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="addlinkType" v-if="siderId === '2'" :disabled="!$checkAuth('external:friendlink:url:type:add')">
                    <img class="add-icon" src="../../assets/images/iocn_add.png" alt="">
                    <span class="add-name">添加链接类型</span>
                </el-button>
            </template>
            <template slot="table">
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '1'"
                    prop="name"
                    label="链接名称">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '2'"
                    prop="typeName"
                    label="类型名称">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '1'"
                    prop="typeName"
                    label="链接类型">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '1'"
                    prop="url"
                    label="跳转地址">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status === 0 ? '启用' : '禁用'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="updateTime"
                    label="更新时间">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '1'"
                    prop="linkDescription"
                    label="备注说明">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    v-if="siderId === '2'"
                    prop="description"
                    label="备注说明">
                </el-table-column>
                <el-table-column
                    :key="Math.random()"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="getDetail(scope.row)" v-if="siderId === '1'&&$checkAuth('external:friendlink:url:detail')">详情&nbsp;&nbsp;</el-button>
                        <el-button type="text" class="" @click="getDetail(scope.row)" v-if="siderId === '2'&&$checkAuth('external:friendlink:url:type:detail')">详情&nbsp;&nbsp;</el-button>
                        <el-button type="text" class="" @click="deleteLink(scope.row)" v-if="siderId === '1'&&$checkAuth('external:friendlink:url:delete')">删除</el-button>
                        <el-button type="text" class="" @click="deleteLink(scope.row)" v-if="siderId === '2'&&$checkAuth('external:friendlink:url:type:delete')">删除</el-button>
                    </template>
                </el-table-column>
            </template>
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
        </table-template>
        <modal
            @alertCancel="alertCancel"
            :title="linkTypeId ? '编辑链接类型' :'添加链接类型'"
            :alert="alert"
            :height="350"
            :width="520">
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>类型名称：</div>
                    <div class="msg">
                        <el-input type="text" maxlength="10" v-model="addLinkTypeName" placeholder="请输入类型名称"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                    <div class="msg">
                        <el-radio-group v-model="linkTypeState">
                            <el-radio :label="'0'">启用</el-radio>
                            <el-radio :label="'1'">禁用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title">备注说明：</div>
                    <div class="msg">
                        <el-input type="textarea" maxlength="250" v-model="addLinkTypeRemark" resize="none" class="textarea"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"></div>
                    <div class="msg btn">
                        <el-button type="primary" @click="saveLinkType">确定</el-button>
                        <el-button @click="alertCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </modal>
        <modal
            @alertCancel="linkAlartCancel"
            :title="linkId ? '编辑链接' : '添加链接'"
            :alert="linkAlart"
            :height="454"
            :width="520">
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>链接类型：</div>
                    <div class="msg">
                        <el-select v-model="alertLinkType"  placeholder="请选择">
                            <el-option
                            v-for="item in alertlinkTypeList"
                            :key="item.linkTypeId"
                            :label="item.typeName"
                            :value="item.linkTypeId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>链接名称：</div>
                    <div class="msg">
                        <el-input type="text" v-model="addLinkName" placeholder="请输入类型名称"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>跳转地址：</div>
                    <div class="msg">
                        <el-input type="text" v-model="addLinkHref" placeholder="请输入http://或者https://开头"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                    <div class="msg">
                        <el-radio-group v-model="linkState">
                            <el-radio :label="'0'">启用</el-radio>
                            <el-radio :label="'1'">禁用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title">备注说明：</div>
                    <div class="msg">
                        <el-input type="textarea" maxlength="250" v-model="addLinkRemark" resize="none" class="textarea"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"></div>
                    <div class="msg btn">
                        <el-button type="primary" @click="saveLink">确定</el-button>
                        <el-button @click="linkAlartCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import TableTemplate from '@/components/TableTemplate.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools'
export default {
    name: 'linkType',
    data () {
        return {
            linkState: '0',
            siderId: '1',
            alert: false,
            linkAlart: false,
            linkTypeList: [],
            alertlinkTypeList: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            searchLinkType: '', // 搜索的链接类型
            alertLinkType: '', // 添加的链接类型
            addLinkName: '', // 添加的链接名称
            addLinkHref: '', // 添加的链接地址
            addLinkRemark: '', // 添加的链接备注
            addLinkTypeName: '', // 添加的链接类型名称
            linkTypeState: '0', // 添加的链接状态
            addLinkTypeRemark: '', // 添加的链接类型备注
            linkTypeId: '', // 当前链接类型id
            linkId: '', // 当前链接id
            tableData: [],
            linkSider: [
                {
                    value: '1',
                    label: '链接管理'
                },
                {
                    value: '2',
                    label: '链接类型管理'
                }
            ],
            params: {
            },
            region: '',
            searchLinkName: '', // 搜索链接名称
            searchLinkTypeName: '', // 搜索链接类型名称
            regionList: [],
            linkStatus: '',
            linkStatusList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '禁用'
                },
                {
                    value: '0',
                    label: '启用'
                }
            ]
        }
    },
    components: {
        Modal,
        TableTemplate,
        ToolBar
    },
    created () {
        this.getLinkType()
    },
    methods: {
        // 保存链接
        saveLink () {
            if (!this.alertLinkType) {
                this.$alert('请选择链接类型！', '提示')
                return
            }
            if (!this.addLinkName) {
                this.$alert('请输入链接名称！', '提示')
                return
            }
            if (!this.addLinkHref) {
                this.$alert('请输入跳转地址！', '提示')
                return
            }
            if (!/^http:\/\/|https:\/\//i.test(this.addLinkHref)) {
                this.$alert('请输入正确的跳转地址！', '提示')
                return
            }
            var obj = {
                data: {
                    typeId: this.alertLinkType,
                    name: this.addLinkName,
                    url: this.addLinkHref,
                    status: this.linkState + '',
                    linkDescription: this.addLinkRemark
                }
            }
            if (this.linkId) {
                obj.data.linkId = this.linkId
                this.$post('external/friendlink/url/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.linkAlartCancel()
                            this.$toast({
                                msg: '编辑成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        console.log(err)
                    })
            } else {
                this.$post('external/friendlink/url/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.queryData()
                            this.linkAlartCancel()
                            this.$toast({
                                msg: '添加成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        console.log(err)
                    })
            }
        },
        // 保存链接类型
        saveLinkType () {
            if (!this.addLinkTypeName) {
                this.$alert('类型名称不能为空！', '提示')
                return
            }
            var obj = {
                data: {
                    typeName: this.addLinkTypeName,
                    status: this.linkTypeState + '',
                    description: this.addLinkTypeRemark
                }
            }
            if (!this.linkTypeId) {
                this.$post('external/friendlink/url/type/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.alertCancel()
                            this.$toast({
                                msg: '添加成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        console.log(err)
                    })
            } else {
                obj.data.linkTypeId = this.linkTypeId
                this.$post('external/friendlink/url/type/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.alertCancel()
                            this.$toast({
                                msg: '编辑成功'
                            })
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        console.log(err)
                    })
            }
            setTimeout(() => {
                this.getLinkType()
            }, 500)
        },
        // 链接类型列表
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
            this.linkStatus && (obj.data.status = this.linkStatus - 0)
            if (this.siderId === '1') {
                if (!this.$checkAuth('external:friendlink:url:findlink')) {
                    this.$alert('没有查询权限', '提示')
                    return
                }
                obj.data.name = this.searchLinkName
                obj.data.typeId = this.searchLinkType
                url = 'external/friendlink/url/findlink'
            } else {
                if (!this.$checkAuth('external:friendlink:url:type:find')) {
                    this.$alert('没有查询权限', '提示')
                    return
                }
                obj.data.typeName = this.searchLinkTypeName
                url = 'external/friendlink/url/type/find'
            }
            this.$post(url, obj).then(res => {
                if (res.status === 200) {
                    var data = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.tableData = data
                    this.total = res.data.total
                    this.alertlinkTypeList.forEach(item => {
                        data.forEach(itemB => {
                            if (item.linkTypeId === itemB.typeId) {
                                itemB.typeName = item.typeName
                            }
                        })
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                this.$alert('网络错误，请重试', '提示')
                console.log(err)
            })
        },
        // 链接类型下拉列表
        getLinkType () {
            this.$post('external/friendlink/url/type/list', {}).then(res => {
                if (res.status === 200) {
                    this.alertlinkTypeList = (res.data && [...res.data]) || []
                    res.data && res.data.length && res.data.push({
                        typeName: '全部',
                        linkTypeId: '',
                        updateTime: '',
                        description: ''
                    })
                    this.linkTypeList = res.data
                    this.queryData()
                    console.log(this.linkTypeList)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 打开添加链接类型弹窗
        addlinkType () {
            this.alert = true
        },
        // 打开添加链接弹窗
        addlink () {
            this.linkAlart = true
        },
        // 关闭链接类型弹窗
        alertCancel () {
            this.alert = false
            this.addLinkTypeName = ''
            this.linkTypeState = '0'
            this.addLinkTypeRemark = ''
            this.linkTypeId = ''
        },
        // 关闭链接弹窗
        linkAlartCancel () {
            this.linkAlart = false
            this.alertLinkType = ''
            this.addLinkName = ''
            this.linkState = '0'
            this.addLinkHref = ''
            this.addLinkRemark = ''
            this.linkId = ''
        },
        // 链接类型详情
        getDetail (item) {
            if (this.siderId === '1') {
                this.$post('external/friendlink/url/detail', {
                    data: {
                        linkId: item.linkId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.linkAlart = true
                        this.alertLinkType = res.data.typeId
                        this.addLinkName = res.data.name
                        this.addLinkRemark = res.data.linkDescription
                        this.addLinkHref = res.data.url
                        this.linkState = res.data.status + ''
                        this.linkId = res.data.linkId
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.$post('external/friendlink/url/type/detail', {
                    data: {
                        linkTypeId: item.linkTypeId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.alert = true
                        this.addLinkTypeName = res.data.typeName
                        this.addLinkTypeRemark = res.data.description
                        this.linkTypeState = res.data.status + ''
                        this.linkTypeId = res.data.linkTypeId
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
            var name = ''
            var url = ''
            var obj = {
                data: {}
            }
            if (this.siderId === '1') {
                name = item.name
                obj.data.linkId = item.linkId
                url = 'external/friendlink/url/delete'
            } else {
                name = item.typeName
                obj.data.linkTypeId = item.linkTypeId
                url = 'external/friendlink/url/type/delete'
            }
            this.$myAlert({
                title: '提示',
                type: 'waring',
                msg: `确定要删除 "${name}" 吗？`
            }).then(res => {
                this.$post(url, obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '删除成功'
                            })
                            this.queryData()
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
.linkType {
    .alertForm(146px, 300px, 68px);
}
</style>
<style lang="less">
.linkType {
    .el-button--text {
        color: #409EFF!important;
    }
}
</style>
