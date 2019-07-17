<!-- 发证机关管理 -->
<template>
    <div class="certificateOffice">
        <div class="content">
            <tool-bar>
            <!-- <label>发证机关名称：</label>
            <el-input class="tool_ipt w200" clearable  v-model="depName" placeholder="请输入发证机关名称"></el-input>
            <label>所在区域：</label>
            <el-select v-model="regionId" clearable  placeholder="请选择">
                <el-option
                v-for="item in regionList"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionId">
                </el-option>
            </el-select>
            <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData(1)" :disabled="!$checkAuth('bas:unit:certificate:findunitcertificate')"></el-button>
            <el-button class="add_btn" icon="el-icon-add" @click="openAddDep" :disabled="!$checkAuth('bas:unit:certificate:add')">
                <img src="../../assets/images/iocn_add.png" alt="">
                <span>添加发证机关</span>
            </el-button> -->
                <div class="fl">
                    <label>发证机关名称：</label>
                    <el-input class="tool_ipt" clearable  v-model="depName" placeholder="请输入发证机关名称"></el-input>
                    <label>所在区域：</label>
                    <el-select v-model="regionId" clearable  placeholder="请选择">
                        <el-option
                        v-for="item in regionList"
                        :key="item.regionId"
                        :label="item.regionName"
                        :value="item.regionId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fr">
                    <el-button class="query_btn slects_btn" @click="queryData(1)" :disabled="!$checkAuth('bas:unit:certificate:findunitcertificate')">查询</el-button>
                    <el-button class="react_btn" @click="toReact">重置</el-button>
                </div>
            </tool-bar>
            <div class="table_box">
                <el-table
                    :data="tableData3"
                    height="600"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="unitCertificateName"
                    label="发证机关名称">
                </el-table-column>
                <el-table-column
                    prop="regionName"
                    label="机关所在区域">
                </el-table-column>
                <el-table-column
                    prop="unitCertificateLinkName"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    prop="unitCertificateLinkMobile"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="unitCertificateBak"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作">
                     <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goDetail(scope.row)" :disabled="!$checkAuth('bas:unit:certificate:view')">详情</el-button>
                        <el-button type="text" size="small" @click="deleteUser(scope.row)" :disabled="!$checkAuth('bas:unit:certificate:delete')">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
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
        <modal :title="'添加发证机关'" :alert="addAlert" :width="520" :height="458" @alertCancel="alertCancel">
            <div class="add-cer">
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;发证机关名称：
                    </div>
                    <div class="msg">
                        <el-input v-model="unitCertificateName" type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        <span class="red">*</span>&nbsp;所在区域：
                    </div>
                    <div class="msg">
                        <el-select v-model="region" placeholder="请选择">
                            <el-option
                            v-for="item in regionList"
                            :key="item.regionId"
                            :label="item.regionName"
                            :value="item.regionId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        联系人：
                    </div>
                    <div class="msg">
                        <el-input v-model="unitCertificateLinkName" type="text"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="title">
                        联系电话：
                    </div>
                    <div class="msg">
                        <el-input maxlength="11" v-model="unitCertificateLinkMobile"></el-input>
                    </div>
                </div>
                <div class="item textarea">
                    <div class="title">
                        备注说明：
                    </div>
                    <div class="msg">
                        <el-input type="textarea" resize="none" v-model="unitCertificateBak"></el-input>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="add">确定</el-button>
                    <el-button @click="alertCancel">取消</el-button>
                </div>
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-setting-normal">
            <el-button type="primary" @click="openAddDep" :disabled="!$checkAuth('bas:unit:certificate:add')">添加发证机关</el-button>
        </bread-foot>
    </div>
</template>

<script>
import BreadFoot from '@/components/BreadFoot.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'certificateOffice',
    data () {
        return {
            breadArr: [
                { title: '系统管理', path: '' }, { title: '发证机关管理', path: '' }
            ],
            regionId: '',
            unitCertificateName: '',
            unitCertificateLinkName: '',
            unitCertificateLinkMobile: '',
            unitCertificateBak: '',
            depName: '',
            addAlert: false,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            region: '', // 区域
            regionList: [], // 区域列表
            tableData3: []
        }
    },
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    created () {
        // this.queryData()
        // this.getRegion()
    },
    methods: {
        add () {
            if (!this.unitCertificateName) {
                this.$alert('请填写发证机关名称', '提示')
                return
            }
            if (this.unitCertificateName.length > 50) {
                this.$alert('发证机关名称过长', '提示')
                return
            }
            if (!this.region) {
                this.$alert('请选择所在区域', '提示')
                return
            }
            if (this.unitCertificateLinkMobile && !/^1\d{10}$/.test(this.unitCertificateLinkMobile)) {
                this.$alert('请填写正确的联系电话', '提示')
                return
            }
            if (this.unitCertificateLinkName && this.unitCertificateLinkName.length > 20) {
                this.$alert('联系人不得多与20字', '提示')
                return
            }
            if (this.unitCertificateBak && this.unitCertificateBak.length > 250) {
                this.$alert('备注说明不得多与250字', '提示')
                return
            }
            if (this.chooseId) {
                this.$post('bas/unit/certificate/edit', {
                    data: {
                        unitCertificateId: this.chooseId,
                        unitCertificateName: this.unitCertificateName,
                        regionId: this.region,
                        unitCertificateLinkName: this.unitCertificateLinkName,
                        unitCertificateLinkMobile: this.unitCertificateLinkMobile,
                        unitCertificateBak: this.unitCertificateBak
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.queryData()
                        this.addAlert = false
                        this.reset()
                        this.$toast({
                            msg: '编辑成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(() => {
                    this.$alert('网络错误，请重试！', '提示')
                })
            } else {
                this.$post('bas/unit/certificate/add', {
                    data: {
                        unitCertificateName: this.unitCertificateName,
                        regionId: this.region,
                        unitCertificateLinkName: this.unitCertificateLinkName,
                        unitCertificateLinkMobile: this.unitCertificateLinkMobile,
                        unitCertificateBak: this.unitCertificateBak
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.queryData()
                        this.addAlert = false
                        this.reset()
                        this.$toast({
                            msg: '添加成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(() => {
                    this.$alert('网络错误，请重试！', '提示')
                })
            }
        },
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            if (!this.$checkAuth('bas:unit:certificate:findunitcertificate')) {
                this.$alert('没有查询权限！', '提示')
                return
            }
            this.$post('bas/unit/certificate/findunitcertificate', {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize,
                'data': {
                    unitCertificateName: this.depName,
                    regionId: this.regionId
                }
            }).then(res => {
                if (res.status === 200) {
                    this.tableData3 = setNum(res.data.list, this.pageNum, this.pageSize)
                    this.total = res.data.total
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getRegion () {
            this.$post('bas/city/findLoginRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 打开添加弹窗
        openAddDep () {
            this.addAlert = true
        },
        // 关闭添加弹窗
        alertCancel () {
            this.addAlert = false
            this.reset()
        },
        reset () {
            this.unitCertificateName = ''
            this.region = ''
            this.unitCertificateLinkName = ''
            this.unitCertificateLinkMobile = ''
            this.unitCertificateBak = ''
            this.chooseId = ''
        },
        // 编辑
        goDetail (obj) {
            this.unitCertificateName = obj.unitCertificateName
            this.region = obj.regionId
            this.unitCertificateLinkName = obj.unitCertificateLinkName
            this.unitCertificateLinkMobile = obj.unitCertificateLinkMobile
            this.unitCertificateBak = obj.unitCertificateBak
            this.chooseId = obj.unitCertificateId
            this.addAlert = true
        },
        // 删除部门
        deleteUser (obj) {
            this.$myAlert({
                type: 'waring',
                msg: `您确定要删除 “${obj.unitCertificateName}” 吗？`
            }).then(res => {
                this.$post('bas/unit/certificate/delete', {
                    data: {
                        unitCertificateId: obj.unitCertificateId
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.queryData()
                        this.$toast({
                            msg: '删除成功'
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    this.$alert('网络错误，请重试！', '提示')
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
        },
        // 重置
        toReact () {
            this.depName = ''
            this.regionId = ''
        }
    }
}
</script>

<style lang='less' scoped>
.content {
    position: relative;
    padding: 0 20px;
    background: #FFF;
    padding-bottom: 100px;
}
.add-cer {
    padding-top: 30px;
    padding-bottom: 10px;
    .item {
        margin-bottom: 20px;
        overflow: hidden;
        .title {
            float: left;
            width: 134px;
            line-height: 34px;
            text-align: right;
            color: #666;
            font-size: 14px;
        }
        .msg {
            margin-left: 134px;
            width: 320px;
            height: 34px;
        }
        &.textarea {
            .msg {
                height: 68px;
                .el-textarea {
                    height: 100%;
                }
            }
        }
        &:nth-last-child(2) {
            margin-bottom: 30px;
        }
    }
    .btn {
        text-align: left;
        text-indent: 134px;
    }
}
.red {
    color: #ff0000;
}
</style>
<style lang="less">
.certificateOffice {
    .toolBar {
        .el-button [class*=el-icon-]+span {
            margin-left: 0px !important;
        }
    }
    .add-cer {
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            color: #333;
        }
        .el-select {
            width: 100%;
        }
        .el-textarea__inner {
            height: 100%;
        }
    }
}
</style>
