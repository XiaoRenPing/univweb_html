<template>
    <div class="addModel">
        <tool-bar :title="'业务操作>协会网站管理>新闻管理'">
            <div v-show="chooseId==0">
                <label for="">新闻标题：</label>
                <el-input class="tool_ipt" placeholder="请输入新闻标题" v-model="searchNewsTitle"></el-input>
                <label for="">新闻类型：</label>
                <el-select  class="tool_ipt" v-model="searchNewsType"  placeholder="请选择">
                    <el-option
                    v-for="item in newsTypeList"
                    :key="item.newsTypeId"
                    :label="item.typeName"
                    :value="item.newsTypeId">
                    </el-option>
                </el-select>
                <label for="">状态：</label>
                <el-select  class="tool_ipt" v-model="newsStatus"  placeholder="请选择">
                    <el-option
                    v-for="item in newsStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData(1)" :disabled="!$checkAuth('external:news:findnews')"></el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="$router.push('/newsDetail')" :disabled="!$checkAuth('external:news:add')">
                    <img src="../../assets/images/iocn_add.png" alt="">
                    <span>添加新闻</span>
                </el-button>
            </div>
            <div v-show="chooseId==1">
                <label for="">类型名称：</label>
                <el-input class="tool_ipt" placeholder="请输入类型名称" v-model="typeName"></el-input>
                <label for="">状态：</label>
                <el-select  class="tool_ipt" v-model="newsStatus"  placeholder="请选择">
                    <el-option
                    v-for="item in newsStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="queryData(1)"></el-button>
                <el-button class="add_btn2" icon="el-icon-add" @click="addNewsType">
                    <img src="../../assets/images/iocn_add.png" alt="">
                    <span>添加新闻类型</span>
                </el-button>
            </div>
        </tool-bar>
        <div class="content">
            <div class="sidebar">
                <div class="side_item" @click="select(index)" :class="{active: index == chooseId}" v-for="(i,index) in sideList" :key="i.id">{{i}}</div>
            </div>
            <div class="table_box">
                <el-table
                    v-loading="loading"
                    v-show="chooseId==0"
                    :data="dataList"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    label="序号"
                    >
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="新闻标题"
                    width="180"
                    :show-overflow-tooltip='true'
                    >
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    label="新闻类型">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.status | filterCommon(newsStatusType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="browse"
                    label="浏览量"
                    >
                </el-table-column>
                <el-table-column
                    prop="source"
                    label="来源"
                    >
                </el-table-column>
                <el-table-column
                    prop="isRecommend"
                    label="是否推荐"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.isRecommend | filterCommon(recommendType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="auditStatus"
                    label="审核状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus | filterCommon(auditStatusType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="updateTime"
                    label="更新时间">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作"
                    width="150"
                    >
                    <template slot-scope="scope">
                        <el-button type="text" v-if="!scope.row.auditStatus" size="small" @click="$router.push('/newsDetail?type=2&id=' + scope.row.newsId)" :disabled="!$checkAuth('external:news:auditnews')">审核</el-button>
                        <el-button type="text" size="small" @click="$router.push('/newsDetail?id=' + scope.row.newsId)" :disabled="!$checkAuth('external:news:detail')">详情</el-button>
                        <el-button type="text" size="small" @click="deleteModel(scope.row)" :disabled="!$checkAuth('external:news:delete')">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <el-table
                    v-show="chooseId==1"
                    :data="dataList"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="num"
                    label="序号"
                    >
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    label="类型名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="分类等级"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.level | filterCommon(levelType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="parentId"
                    label="上级分类"
                    >
                    <template slot-scope="scope">
                        <span v-if="!scope.row.parentName">无</span>
                        <span v-else>{{scope.row.parentName === '全部' ? '--' : scope.row.parentName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="排序号"
                    >
                </el-table-column>
                <el-table-column
                    prop="isRecommend"
                    label="首页推荐"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.isRecommend | filterCommon(recommendType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isFirst"
                    label="顶部推荐"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.isFirst | filterCommon(recommendType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isRight"
                    label="右侧推荐"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.isRight | filterCommon(recommendType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.status | filterCommon(newsStatusType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="updateTime"
                    label="更新时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <div>
                            <el-button type="text" size="small" @click="editModel(scope.row)" :disabled="!$checkAuth('external:news:type:viewdetail')">详情</el-button>
                            <el-button type="text" size="small" @click="deleteModel(scope.row)" :disabled="!$checkAuth('external:news:type:delete')">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                </el-table>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="newsTypeId ? '编辑新闻类型' : '新增新闻类型'"
            :width="800"
            :height="420"
            :alert="showAlert2"
            @alertCancel="closeAlert2"
            @alertConfirm="sureAlert2">
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>上级分类：</div>
                    <div class="msg">
                        <el-select v-model="parentId"  placeholder="请选择">
                            <el-option
                            v-for="item in parentList"
                            :key="item.newsTypeId"
                            :label="item.typeName"
                            :value="item.newsTypeId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>类型名称：</div>
                    <div class="msg">
                        <el-input type="text" v-model="alertTypeName" maxlength="10" placeholder="请输入新闻类型名称"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>首页推荐：</div>
                    <div class="msg">
                        <el-select v-model="isRecommend"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>右侧推荐：</div>
                    <div class="msg">
                        <el-select v-model="isRight"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>左侧推荐：</div>
                    <div class="msg">
                        <el-select v-model="isLeft"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>状态：</div>
                    <div class="msg">
                        <el-select v-model="alertNewsStatus"  placeholder="请选择">
                            <el-option
                            v-for="item in newsStatusType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="form">
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>类型logo：</div>
                    <div class="msg">
                        <div class="iconBox">
                            <img :src="`${baseUrl}/img/${i}.png`" width="24" height="24" alt="" v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :class="{active: i == chooseIcon}" @click="selectIndex(i)" :key="i">
                            <!-- <img src="../../../public/img/1.png" @click="selectIndex(1)">
                            <img src="../../../public/img/2.png" @click="selectIndex(1)">
                            <img src="../../../public/img/3.png" @click="selectIndex(1)">
                            <img src="../../../public/img/4.png" @click="selectIndex(1)">
                            <img src="../../../public/img/5.png" @click="selectIndex(1)">
                            <img src="../../../public/img/6.png" @click="selectIndex(1)">
                            <img src="../../../public/img/7.png" @click="selectIndex(1)">
                            <img src="../../../public/img/8.png" @click="selectIndex(1)">
                            <img src="../../../public/img/9.png" @click="selectIndex(1)">
                            <img src="../../../public/img/10.png" @click="selectIndex(1)"> -->
                            <!-- <upload
                                class="upload-demo"
                                :on-success="uploadSuccess"
                                :before-upload="beforeAvatarUpload">
                                <div class="empty" v-show="!newsLogo">
                                    <img src="../../assets/images/audit/default_icon_photo.png" alt="附件">
                                </div>
                                <img v-show="newsLogo" class="logo" ref="licenseImg" :src="newsLogo" alt="附件">
                            </upload> -->
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>顶部推荐：</div>
                    <div class="msg">
                        <el-select v-model="isFirst"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- <div class="form-item">
                    <div class="title"><span class="red">*&nbsp;&nbsp;</span>右侧推荐：</div>
                    <div class="msg">
                        <el-select v-model="isRight"  placeholder="请选择">
                            <el-option
                            v-for="item in recommendType"
                            :key="item.value + Math.random()"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="form-item">
                    <div class="title">排序号：</div>
                    <div class="msg">
                        <el-input type="text" v-model="newsTypeSort" placeholder="默认首页降序显示"></el-input>
                    </div>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="saveNewsType">确定</el-button>
                <el-button @click="closeAlert2">取消</el-button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import upload from '@/components/upload.vue'
import { setNum } from '@/utils/tools.js'
import { getByteLen } from '@/utils/cookie.js'
export default {
    name: 'newsManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            chooseIcon: 1,
            baseUrl: process.env.BASE_URL,
            value5: '',
            input: '',
            region: '',
            regionList: [],
            loading: false,
            showAlert: false, // 显示弹窗
            showAlert2: false,
            typeName: '', // 搜索新闻类型名称
            alertTypeName: '', // 弹窗类型名称
            isRecommend: 1, // 是否首页推荐
            isFirst: 0, // 是否顶部推荐
            isRight: 0, // 是否右侧推荐
            isLeft: 0, // 是否左侧推荐
            newsLogo: '', // 新闻类型logo
            parentId: 0, // 上级分类
            newsTypeSort: '', // 新闻类型排序号
            parentList: [], // 上级分类列表
            allParentList: [], // 上级分类所有列表
            newsTypeId: '', // 当前选择类型ID
            auditStatusType: [
                {
                    value: -1,
                    label: '审核拒绝'
                },
                {
                    value: 1,
                    label: '审核通过'
                },
                {
                    value: 0,
                    label: '待审核'
                }
            ],
            sideList: [
                '新闻管理',
                '新闻类型管理'
            ],
            searchNewsTitle: '', // 搜索新闻标题
            searchNewsType: 0, // 搜索新闻类型
            newsTypeList: [], // 搜索新闻类型下拉列表
            newsStatus: '', // 新闻状态搜索下拉
            newsStatusList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '禁用'
                },
                {
                    value: 0,
                    label: '启用'
                }
            ],
            alertNewsStatus: 0, // 弹窗新闻状态
            newsStatusType: [ // 新闻状态搜索筛选
                {
                    value: 1,
                    label: '禁用'
                },
                {
                    value: 0,
                    label: '启用'
                }
            ],
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
            levelType: [
                {
                    value: '1',
                    label: '一级分类'
                },
                {
                    value: '2',
                    label: '二级分类'
                }
            ],
            isEdit: false, // 是否是编辑
            pageNum: 1,
            pageSize: 10,
            total: 0,
            chooseId: 0, // 选中的id
            dataList: [] // 数据列表
        }
    },
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        upload,
        Modal
    },
    created () {
        this.getNewsTypeList()
        this.getParent()
    },
    methods: {
        selectIndex (i) {
            this.chooseIcon = i
        },
        // 获取新闻下拉列表
        getNewsTypeList () {
            this.$post('external/news/type/list', {})
                .then(res => {
                    if (res.status === 200) {
                        res.data.unshift({
                            newsTypeId: 0,
                            typeName: '全部'
                        })
                        this.newsTypeList = res.data || []
                        this.queryData()
                    }
                })
        },
        // 保存新闻类型
        saveNewsType () {
            if (!this.alertTypeName) {
                this.$alert('请输入类型名称！', '提示')
                return
            }
            // if (this.parentId === 0 && getByteLen(this.alertTypeName) > 8) {
            //     this.$alert('名称长度请控制在4个汉字内！', '提示')
            //     return
            // }
            if (this.isRight && getByteLen(this.alertTypeName) > 16) {
                this.$alert('右侧推荐的新闻类型名称长度请控制在8个汉字内！', '提示')
                return
            }
            if (getByteLen(this.alertTypeName) > 16) {
                this.$alert('名称长度请控制在8个汉字内！', '提示')
                return
            }
            if (this.isFirst && getByteLen(this.alertTypeName) > 8) {
                this.$alert('顶部推荐的新闻类型名称长度请控制在4个汉字内！', '提示')
                return
            }
            if (!this.chooseIcon) {
                this.$alert('请选择类型logo！', '提示')
                return
            }
            if (this.newsTypeSort && !/^\d+$/.test(this.newsTypeSort)) {
                this.$alert('请输入正确的新闻排序号！', '提示')
                return
            }
            var obj = {
                data: {
                    typeName: this.alertTypeName,
                    parentId: this.parentId,
                    isRecommend: this.isRecommend,
                    isLeft: this.isLeft,
                    status: this.alertNewsStatus,
                    isFirst: this.isFirst,
                    isRight: this.isRight,
                    logo: this.chooseIcon,
                    sort: this.newsTypeSort
                }
            }
            if (this.newsTypeId) {
                obj.data.newsTypeId = this.newsTypeId
                this.$post('external/news/type/edit', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.closeAlert2()
                            this.getParent()
                            this.getNewsTypeList()
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
                this.$post('external/news/type/add', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.closeAlert2()
                            this.getParent()
                            this.getNewsTypeList()
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
            this.chooseIcon = 1
        },
        // 获取上级分类
        getParent () {
            this.$post('external/news/type/parentlist', {})
                .then(res => {
                    if (res.status === 200) {
                        res.data.unshift({
                            newsTypeId: 0,
                            typeName: '设为一级分类'
                        })
                        this.allParentList = res.data
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
            console.log(res)
            this.newsLogo = res.data
            this.$message({
                message: '图片上传成功！',
                type: 'success'
            })
        },
        // 添加新闻类型
        addNewsType () {
            this.showAlert2 = true
            this.parentList = this.allParentList
        },
        handleChange (val) {
            console.log(val)
        },
        // 关闭弹窗
        closeAlert () {
            this.indexTermClass = ''
            this.indexTermName = ''
            this.indexTermScore = ''
            this.indexTermDesc = ''
            this.isEdit = ''
            this.showAlert = false
        },
        closeAlert2 () {
            this.showAlert2 = false
            this.alertTypeName = ''
            this.parentId = 0
            this.isRecommend = 1
            this.isLeft = 0
            this.alertNewsStatus = 0
            this.isFirst = 0
            this.isRight = 0
            this.newsLogo = ''
            this.newsTypeSort = ''
            this.newsTypeId = ''
            this.chooseIcon = 1
        },
        // 获取数据
        queryData (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                data: {
                }
            }
            if (this.newsStatus !== '') {
                obj.data.status = this.newsStatus
            }
            this.searchNewsType && (obj.data.typeId = this.searchNewsType)
            this.loading = true
            if (this.chooseId === 0) {
                obj.data.title = this.searchNewsTitle
                this.$post('external/news/findnews', obj)
                    .then(res => {
                        if (res.status === 200) {
                            res.data.list && res.data.list.forEach(item => {
                                this.newsTypeList.forEach(itemB => {
                                    if (item.typeId === itemB.newsTypeId) {
                                        item.typeName = itemB.typeName
                                    }
                                })
                            })
                            this.total = res.data.total
                            this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.loading = false
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        this.loading = false
                        console.log(err)
                    })
            } else {
                obj.data.typeName = this.typeName
                this.$post('external/news/type/find', obj)
                    .then(res => {
                        if (res.status === 200) {
                            this.total = res.data.total
                            res.data.list.forEach(item => {
                                this.newsTypeList.forEach(itemB => {
                                    if (itemB.newsTypeId === item.parentId) {
                                        item.parentName = itemB.typeName
                                    }
                                })
                            })
                            this.dataList = setNum(res.data.list, this.pageNum, this.pageSize)
                        } else {
                            this.$alert(res.message, '提示')
                        }
                        this.loading = false
                    }).catch(err => {
                        this.$alert('网络错误，请重试', '提示')
                        this.loading = false
                        console.log(err)
                    })
            }
        },
        // 删除新闻
        deleteModel (item) {
            var obj = {
                data: {}
            }
            var name = ''
            var url = ''
            if (this.chooseId === 0) {
                name = item.title
                obj.data.newsId = item.newsId
                url = 'external/news/delete'
            } else {
                name = item.typeName
                obj.data.newsTypeId = item.newsTypeId
                url = 'external/news/type/delete'
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
                            this.getParent()
                            this.getNewsTypeList()
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
        // 编辑新闻
        editModel (obj) {
            // console.log(obj)
            this.showAlert2 = true
            this.parentId = obj.parentId
            this.alertTypeName = obj.typeName
            this.isRecommend = obj.isRecommend
            this.isLeft = obj.isLeft
            this.alertNewsStatus = obj.status
            this.isFirst = obj.isFirst
            this.isRight = obj.isRight
            this.chooseIcon = obj.logo
            this.newsTypeSort = obj.sort
            this.newsTypeId = obj.newsTypeId
            if (obj.newsTypeId) {
                this.parentList = this.allParentList.filter(item => {
                    return item.newsTypeId !== obj.newsTypeId
                })
            } else {
                this.parentList = this.allParentList
            }
        },
        // 确认新增
        sureAlert (val) {
            if (val === 'sure') {
                console.log(this.isEdit)
                if (!this.isEdit) {
                    this.setModel()
                } else {
                    this.editModel2()
                }
            } else {
                console.log('取消')
                this.indexTermClass = ''
                this.indexTermName = ''
                this.indexTermScore = ''
                this.indexTermDesc = ''
                this.isEdit = ''
                this.showAlert = false
            }
        },
        sureAlert2 () {
            this.showAlert2 = false
        },
        // 新增
        setModel () {
        },
        // 编辑
        editModel2 () {
            let type = 0 // 评分类型
            let TypeCode = 0 // 指标类型
            if (this.chooseId === 0) {
                type = this.gradeType ? 1 : 0
                TypeCode = 1
                if (!this.indexTermClass || !this.indexTermName || !this.indexTermScore || !this.indexTermDesc) {
                    this.$alert('请填写完整信息', '提示')
                    return
                }
            } else {
                if (!this.indexTermName || !this.indexTermDesc) {
                    this.$alert('请填写完整信息', '提示')
                    return
                }
                type = this.radio
                TypeCode = 2
            }
            this.$post('bas/enterprise/indexterm/edit', {
                'data': {
                    'indexTermId': this.isEdit,
                    'indexTermOrder': '',
                    'indexTermTypeCode': TypeCode,
                    'indexTermClass': this.indexTermClass,
                    'indexTermName': this.indexTermName,
                    'indexTermType': type,
                    'indexTermScore': this.indexTermScore,
                    'indexTermDesc': this.indexTermDesc
                }
            }).then(res => {
                if (res.status === 200) {
                    this.indexTermClass = ''
                    this.indexTermName = ''
                    this.indexTermScore = ''
                    this.indexTermDesc = ''
                    this.showAlert = false
                    this.$alert(res.message, '提示')
                    this.isEdit = ''
                    this.queryData()
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 切换tab
        select (index) {
            // console.log(index)
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
@import '../../assets/css/util.less';
.page_title {
    font-size: 14px;
}
.iconBox {
    img {
        margin-right: 20px;
        cursor: pointer;
        &.active {
            border: 2px solid #359dff;
            width: 20px;
            height: 20px;
        }
    }
}
.license-wrap {
    width: 90px;
    height: 80px;
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
.inner {
    text-align: left;
    padding: 20px;
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
        margin: 20px 0 40px 0;
        button {
            width: 100px;
            height: 40px;
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
    margin-left: 20px;
    img {
        margin-right: 8px;
        vertical-align: middle
    }
    span {
        vertical-align: middle;
    }
}
.add_btn2 {
    line-height: 1;
    width: 130px;
    margin-left: 20px;
    padding: 0;
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
    padding: 20px 20px 0 20px;
    border-top: 1px solid #ddd;
    .table_box {
        // padding:20px;
        margin-left: 250px;
        border: 1px solid #dddddd;
        border-bottom: none;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 30px;
        box-sizing: border-box;
        position: absolute;
        font-size: 14px;
        top: 0;
        left: 0;
        .side_item {
            width: 190px;
            height: 40px;
            border-radius: 4px;
            margin: 10px auto 0;
            line-height: 40px;
            border: 1px solid #dddddd;
            cursor: pointer;
            &:first-child {
                margin-top: 0;
            }
            &.active {
                background: #359dff;
                border: 1px solid #359dff;
                color: #ffffff;
            }
        }
    }
}
.alertForm(128px, 234px, 68px);
.form {
    float: left;
    height: 252px;
    .btn {
        text-align: center;
    }
}
</style>
<style lang="less">
    .el-input-number {
        line-height: 32px;
        .el-input-number__increase {
            line-height: 16px!important;
        }
        input{
            height: 34px;
        }
    }
</style>
