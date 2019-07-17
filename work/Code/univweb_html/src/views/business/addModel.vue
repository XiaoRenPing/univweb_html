<template>
    <div class="addModel">
        <!-- <tool-bar>
            <el-button class="add_btn" icon="el-icon-add" @click="addModel" :disabled="!$checkAuth('bas:indexTerm:add')">
                <img src="../../assets/images/iocn_add.png" alt="">
                <span>新增指标项</span>
            </el-button>
        </tool-bar> -->
        <div class="content">
            <div class="sidebar">
                <div class="side_item" @click="select(index)" :class="{active: index == chooseId}" v-for="(i,index) in sideList" :key="i.id">{{i}}</div>
            </div>
            <div class="table_box">
                <el-table
                    v-show="chooseId==0"
                    :data="dataList"
                    height="600"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    label="序号"
                    width="60"
                    >
                </el-table-column>
                <el-table-column
                    prop="indexTermTypeId"
                    label="指标分类"
                    width="120"
                    >
                    <template slot-scope="scope">
                            <span>{{scope.row.indexTermTypeId|typeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="indexTermSuperviseName"
                    width="200"
                    label="考核项目">
                </el-table-column>
                <el-table-column
                    prop="indexTermSuperviseDesc"
                    :show-overflow-tooltip='true'
                    label="评分标准"
                    >
                </el-table-column>
                <el-table-column
                    prop="indexTermSuperviseScore"
                    width="80"
                    label="该项满分">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作"
                    width="160"
                    >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editModel(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteModel(scope.row.indexTermSuperviseId)" :disabled="!$checkAuth('bas:indexTerm:delete')">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <el-table
                    v-show="chooseId==1"
                    :data="dataList"
                    height="600"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                    <el-table-column
                        prop="num"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="indexTermName"
                        label="指标分类"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.indexTermTypeId|typeFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editModel(scope.row)">详情</el-button>
                            <el-button type="text" size="small" @click="deleteModel(scope.row.indexTermTypeId)" :disabled="!$checkAuth('bas:indexTerm:delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="'编辑指标项'"
            :width="700"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="inner" v-if="chooseId==0">
                <div class="line clearfix">
                    <div class="line-item">
                        <label for=""><i class="important">*</i>指标分类：</label>
                        <el-select  class="tool_ipt" v-model="value5"   placeholder="请选择">
                            <el-option
                            v-for="item in typeList"
                            :key="item.indexTermTypeId"
                            :label="item.indexTermTypeName"
                            :value="item.indexTermTypeId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="line clearfix">
                    <div class="line-item">
                        <label for=""><i class="important">*</i>考核项目：</label>
                        <el-input class="tool_ipt" v-model="indexTermName" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="line-item">
                        <label for=""><i class="important">*</i>该项满分：</label>
                        <el-input class="tool_ipt" type="number" v-model="indexTermScore" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="line clearfix">
                    <label class="fl"><i class="important">*</i>评分标准：</label>
                    <el-input class="i-area" type="textarea" :rows="3" resize="none" v-model="indexTermDesc" placeholder="请输入内容"></el-input>
                </div>
                <div class="btn-box">
                    <button class="next-btn btn1" @click="sureAlert('sure')">确定</button>
                    <button class="close-btn btn2" @click="sureAlert('cancel')">取消</button>
                </div>
            </div>
        </Modal>
        <Modal
            :title="'编辑指标项'"
            :width="900"
            :alert="showAlert2"
            @alertCancel="closeAlert2"
            @alertConfirm="sureAlert2">
            <div class="inner inner2" v-if="chooseId==1">
                <div>
                    <label class="label2"><i class="important">*</i>指标分类：</label>
                    <el-select  class="tool_ipt" v-model="value6"   placeholder="请选择" :disabled="!canedit">
                        <el-option
                        v-for="item in typeList"
                        :key="item.indexTermTypeId"
                        :label="item.indexTermTypeName"
                        :value="item.indexTermTypeId">
                        </el-option>
                    </el-select>
                </div>
                <el-table
                    :data="dataList2"
                    class="inner-table"
                    height="370"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                    <el-table-column
                        prop="num"
                        label="序号"
                        width="60"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="indexTermSuperviseName"
                        label="考核标准"
                        width="120"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="indexTermSuperviseDesc"
                        label="评分标准"
                        :show-overflow-tooltip='true'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="indexTermSuperviseScore"
                        label="该项满分"
                        width="120"
                        >
                    </el-table-column>
                </el-table>
                <div class="btn-box" v-if="canedit">
                    <button class="next-btn btn1" @click="sureAlert2" >确定</button>
                    <button class="close-btn btn2" @click="closeAlert2" >取消</button>
                </div>
            </div>
        </Modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button type="primary" @click="addModel" :disabled="!$checkAuth('bas:indexTerm:add')">新增指标项</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
import BreadFoot from '@/components/BreadFoot.vue'
import ToolBar from '@/components/ToolBar.vue'
import Modal from '@/components/Modal.vue'
import { setNum } from '@/utils/tools.js'
let typeList = []
export default {
    name: 'addModel',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业诚信评价', path: '' }, { title: '诚信指标设置', path: '' }
            ],
            canedit: true, // 是否可编辑材料列表
            typeList: [], // 分类列表
            value5: '', // 监管指标分类
            value6: '', // 诚信指标分类
            indexTermClass: '', // 分类名称
            indexTermName: '', // 指标项分类名称
            indexTermScore: '', // 该项满分
            indexTermDesc: '', // 指标说明
            indexTermDesc2: '',
            indexTermItem: '',
            indexTermSort: '',
            // indexTermName: '', // 检查项目
            radio: '1', // 评分方式
            gradeType: '', // 评分方式
            input: '',
            showAlert: false, // 显示弹窗
            showAlert2: false,
            sideList: [
                '诚信评价指标',
                // '企业自评指标',
                '诚信材料指标'
            ],
            isEdit: false, // 是否是编辑
            pageNum: 1,
            pageSize: 10,
            total: 0,
            currentPage: 0,
            chooseId: 0, // 选中的id
            dataList2: [], // 诚信指标列表
            dataList: [] // 数据列表
        }
    },
    watch: {
        value6 (val) {
            if (!val) return
            this.$post('bas/indexTerm/supervise/find', {
                indexTermTypeId: IDBCursorWithValue
            }).then(res => {
                if (res.status === 200) {
                    this.dataList2 = setNum(res.datas, this.pageNum, this.pageSize)
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {},
    filters: {
        typeFilter: (val) => {
            let item = typeList.find((i) => {
                return i.indexTermTypeId === val
            })
            return item ? item.indexTermTypeName : ''
        }
    },
    // 使用其它组件
    components: {
        BreadFoot,
        ToolBar,
        Modal
    },
    created () {
        // this.getType()
    },
    methods: {
        getType () {
            this.$post('bas/indexTerm/type/find', {})
                .then(res => {
                    if (res.status === 200) {
                        this.typeList = res.datas
                        typeList = res.datas
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
        },
        handleChange (val) {
            console.log(val)
        },
        // 编辑
        editNotice (value) {
        },
        // 删除
        deleteNotice (value) {
        },
        // 新增模板
        addModel () {
            if (this.chooseId === 1) {
                this.showAlert2 = true
            } else {
                this.showAlert = true
            }
        },
        // 关闭弹窗
        closeAlert () {
            this.indexTermClass = ''
            this.indexTermName = ''
            this.indexTermScore = ''
            this.indexTermDesc = ''
            this.indexTermDesc2 = ''
            this.indexTermSort = ''
            this.value5 = ''
            this.indexTermItem = ''
            this.radio = '1'
            this.isEdit = ''
            this.showAlert = false
        },
        closeAlert2 () {
            this.showAlert2 = false
            this.value6 = ''
            this.canedit = true
            this.dataList2 = []
        },
        sureAlert2 () {
            this.$post('bas/indexTerm/material/save', {
                indexTermTypeId: this.value6
            }).then(res => {
                if (res.status === 200) {
                    this.showAlert2 = false
                    this.value6 = ''
                    this.canedit = true
                    this.dataList2 = []
                    this.queryData()
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        // 获取数据
        queryData () {
            if (this.chooseId === 0) {
                this.$post('bas/indexTerm/supervise/find', {
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.total = res.totalSize
                        this.dataList = setNum(res.datas, this.pageNum, this.pageSize)
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            } else if (this.chooseId === 1) {
                this.$post('bas/indexTerm/material/find', {
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.total = res.totalSize
                        this.dataList = setNum(res.datas, this.pageNum, this.pageSize)
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            }
        },
        // 删除指标项
        deleteModel (id) {
            this.$myAlert({
                title: '提示',
                msg: '确认要删除吗?'
            }).then(() => {
                let url = ''
                if (this.chooseId === 0) {
                    url = 'bas/indexTerm/supervise/del'
                } else if (this.chooseId === 1) {
                    url = 'bas/indexTerm/material/del'
                }
                console.log(url)
                this.$post(url, {
                    indexTermTypeId: id,
                    indexTermEnterpriseId: id,
                    indexTermSuperviseId: id
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '操作成功',
                            callback: () => {
                                this.queryData()
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            })
        },
        // 编辑指标项
        editModel (obj) {
            if (this.chooseId === 0) {
                this.showAlert = true
                this.value5 = obj.indexTermTypeId
                this.indexTermName = obj.indexTermSuperviseName
                this.indexTermDesc = obj.indexTermSuperviseDesc
                this.indexTermScore = obj.indexTermSuperviseScore
                this.isEdit = obj.indexTermSuperviseId
            } else if (this.chooseId === 1) {
                this.showAlert2 = true
                this.value6 = obj.indexTermTypeId
                this.canedit = false
            }
        },
        // 确认新增
        sureAlert (val) {
            if (val === 'sure') {
                if (!this.isEdit) {
                    this.setModel()
                } else {
                    this.editModel2()
                }
            } else {
                console.log('取消')
                this.indexTermClass = ''
                this.value5 = ''
                this.indexTermName = ''
                this.indexTermItem = ''
                this.indexTermDesc2 = ''
                this.indexTermDesc2 = ''
                this.indexTermScore = ''
                this.indexTermSort = ''
                this.radio = '1'
                this.indexTermDesc = ''
                this.isEdit = ''
                this.showAlert = false
            }
        },
        // 新增
        setModel () {
            if (this.chooseId === 0) {
                if (!this.value5) {
                    this.$alert('请选中指标分类', '提示')
                    return
                }
                if (!this.indexTermName) {
                    this.$alert('请填写考核项目', '提示')
                    return
                }
                if (this.indexTermName.length > 50) {
                    this.$alert('指考核项目不能超过50字', '提示')
                    return
                }
                if (!this.indexTermDesc) {
                    this.$alert('请填写评分标准', '提示')
                    return
                }
                if (this.indexTermDesc.length > 500) {
                    this.$alert('评分标准长度不能超过500', '提示')
                    return
                }
                if (this.indexTermScore === '') {
                    this.$alert('请填写该项满分', '提示')
                    return
                }
                if (this.indexTermScore > 100) {
                    this.$alert('该项满分必须小于100', '提示')
                    return
                }
                if (this.indexTermScore < 0 && this.value5 - 0 !== 10) {
                    this.$alert('该项满分必须大于0', '提示')
                    return
                }
                this.$post('bas/indexTerm/supervise/save', {
                    indexTermTypeId: this.value5,
                    indexTermSuperviseName: this.indexTermName,
                    indexTermSuperviseDesc: this.indexTermDesc,
                    indexTermSuperviseScore: this.indexTermScore
                }).then(res => {
                    if (res.status === 200) {
                        this.indexTermClass = ''
                        this.indexTermName = ''
                        this.indexTermScore = ''
                        this.indexTermDesc = ''
                        this.showAlert = false
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            } else if (this.chooseId === 1) {
                if (!this.indexTermSort) {
                    this.$alert('请填写排序号', '提示')
                    return
                }
                if (!this.indexTermItem) {
                    this.$alert('请填写考核项目', '提示')
                    return
                }
                if (this.indexTermItem.length > 50) {
                    this.$alert('考核项目长度不能超过50', '提示')
                    return
                }
                if (!this.indexTermDesc2) {
                    this.$alert('请填写评分标准', '提示')
                    return
                }
                if (this.indexTermDesc2.length > 500) {
                    this.$alert('评分标准长度不能超过500', '提示')
                    return
                }
                if (!this.radio) {
                    this.$alert('请选择检查形式', '提示')
                    return
                }
                this.$post('bas/indexTerm/enterprise/save', {
                    indexTermEnterpriseOrder: this.indexTermSort,
                    indexTermEnterpriseName: this.indexTermItem,
                    indexTermEnterpriseDesc: this.indexTermDesc2,
                    indexTermEnterpriseViewtype: this.radio - 0
                }).then(res => {
                    if (res.status === 200) {
                        this.indexTermSort = ''
                        this.indexTermItem = ''
                        this.indexTermScore = ''
                        this.indexTermDesc2 = ''
                        this.showAlert = false
                        this.radio = '1'
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            }
        },
        // 编辑
        editModel2 () {
            if (this.chooseId === 0) {
                if (!this.value5) {
                    this.$alert('请选中指标分类', '提示')
                    return
                }
                if (!this.indexTermName) {
                    this.$alert('请填写考核项目', '提示')
                    return
                }
                if (this.indexTermName.length > 50) {
                    this.$alert('考核项目长度不能超过50', '提示')
                    return
                }
                if (!this.indexTermDesc) {
                    this.$alert('请填写评分标准', '提示')
                    return
                }
                if (this.indexTermDesc.length > 500) {
                    this.$alert('评分标准长度不能超过500', '提示')
                    return
                }
                if (this.indexTermScore === '') {
                    this.$alert('请填写该项满分', '提示')
                    return
                }
                if (this.indexTermScore > 100) {
                    this.$alert('该项满分必须小于100', '提示')
                    return
                }
                // console.log(this.value5 !== '5')
                if (this.indexTermScore < 0 && this.value5 - 0 !== 10) {
                    this.$alert('该项满分必须大于0', '提示')
                    return
                }
                this.$post('bas/indexTerm/supervise/update', {
                    indexTermSuperviseId: this.isEdit,
                    indexTermTypeId: this.value5,
                    indexTermSuperviseName: this.indexTermName,
                    indexTermSuperviseDesc: this.indexTermDesc,
                    indexTermSuperviseScore: this.indexTermScore
                }).then(res => {
                    if (res.status === 200) {
                        this.value5 = ''
                        this.indexTermName = ''
                        this.indexTermScore = ''
                        this.indexTermDesc = ''
                        this.showAlert = false
                        this.isEdit = ''
                        this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$alert('请求失败', '提示')
                })
            }
        },
        // 切换tab
        select (index) {
            this.dataList = []
            this.pageNum = 1
            this.pageSize = 10
            this.chooseId = index
            this.queryData()
        },
        handleSizeChange (val) {
            this.pageSize = val
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
button {
    cursor: pointer;
}
.inner {
    text-align: left;
    padding: 20px;
    padding-top: 30px;
    font-size: 14px;
    color: #666666;
    .important {
        color: red;
        font-style: normal;
        margin-right: 3px;
    }
    p {
        line-height: 60px;
        text-align: left;
    }
    label {
        width: 110px;
        text-align: right;
        display: inline-block;
        line-height: 34px;
        &.label2 {
            text-align: left;
        }
    }
    .line2 {
        margin-top: 10px;
    }
    .line-item {
        width: 50%;
        float: left;
        text-align: left;
        margin-bottom: 20px;
        // label {
        //     width: 90px;
        //     text-align: right;
        //     display: inline-block;
        // }
        .tool_ipt {
            width: 200px;
        }
    }
    .inner-table {
        margin-top: 10px;
    }
    .line-item2 {
        padding-left: 20px;
        box-sizing: border-box;
    }
    .i-area {
        width: 530px;
    }
    .btn-box {
        text-align: center;
        margin: 20px 0 20px 0;
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
.add_btn {
    line-height: 1;
    width: 120px;
    img {
        margin-right: 8px;
        vertical-align: middle
    }
    span {
        vertical-align: middle;
    }
}
.inner2 {
    height: 500px;
    padding: 20px 50px;
}
.content {
    position: relative;
    padding: 20px;
    padding-bottom: 100px;
    .table_box {
        margin-left: 250px;
        border: 1px solid #dddddd;
        border-bottom: none;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .sidebar {
        width: 220px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 30px;
        box-sizing: border-box;
        position: absolute;
        font-size: 14px;
        top: 0;
        left: 0;
        .side_item {
            width: 160px;
            height: 30px;
            border-radius: 4px;
            margin: 10px auto 0;
            line-height: 32px;
            border: 1px solid #dddddd;
            cursor: pointer;
            &:first-child {
                margin-top: 0;
            }
            &.active {
                background: #1790FF;
                border: 1px solid #1790FF;
                color: #ffffff;
            }
        }
    }
}
</style>
<style lang="less">
.addModel {
    background: #FFFFFF;
    .el-input__inner {
        line-height: 34px!important;
        height: 34px!important;
    }
    .el-input-number {
        line-height: 32px;
        .el-input-number__increase {
            line-height: 16px!important;
        }
        input{
            height: 34px;
        }
    }
}
</style>
