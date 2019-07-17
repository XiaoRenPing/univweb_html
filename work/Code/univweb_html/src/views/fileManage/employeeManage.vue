<template>
    <div class="page">
        <!-- <Header></Header>-->
        <div class="content">
            <tool-bar :title="'档案管理>从业人员档案'">
                <label>姓名:</label>
                <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                <label>企业名称:</label>
                <el-input class="tool_ipt" v-model="input" placeholder="请输入内容"></el-input>
                <el-button class="search_btn" type="primary" icon="el-icon-search"></el-button>
                <el-button class="add_btn" icon="el-icon-add" @click="add">
                    <img src="../../assets/images/iocn_add.png">
                    <span>新增通知</span>
                </el-button>
            </tool-bar>
            <div class='wrap'>
                <div class="table_box">
                    <el-table
                        :data="tableData3"
                        height="600"
                        :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="width: 100%">
                    <el-table-column
                        prop="index"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="性别"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="岗位"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="上岗证号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="身份证号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="所属企业"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detail(scope.row.id)">详情</el-button>
                            <el-button type="text" size="small" @click="deleteThis(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="page_box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Modal
            :title="'新增从业人员档案'"
            :width="450"
            :alert="showAlert"
            @alertCancel="closeAlert"
            @alertConfirm="sureAlert">
            <div class="model">
                <ul>
                    <li>
                        <label for=""><span>*</span>姓名：</label>
                        <el-input class="ipt" v-model="value"></el-input>
                    </li>
                    <li>
                        <label for=""><span>*</span>性别：</label>
                        <el-select class="ipt" v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in [1,2,3]"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for=""><span>*</span>岗位：</label>
                        <el-input class="ipt" v-model="value"></el-input>
                    </li>
                    <li>
                        <label for=""><span>*</span>上岗证号：</label>
                        <el-input class="ipt" v-model="value"></el-input>
                    </li>
                    <li>
                        <label for=""><span>*</span>身份证号：</label>
                        <el-input class="ipt" v-model="value"></el-input>
                    </li>
                    <li>
                        <label for=""><span>*</span>所属企业：</label>
                        <el-input class="ipt" v-model="value"></el-input>
                    </li>
                    <li>
                        <label for=""><span>*</span>状态：</label>
                        <el-select class="ipt" v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in [1,2,3]"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
                <div class="btn-box">
                    <button class="next-btn btn1" @click="sureAlert">确定</button>
                    <button class="close-btn btn2" @click="closeAlert">取消</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'employeeManage',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            showAlert: false,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            currentPage: 1, // 当前页数
            input: '',
            options: [],
            value: '',
            tableData3: []
        }
    },
    created () {},
    computed: {},
    // 使用其它组件
    components: {
        Header,
        ToolBar,
        Sidebar,
        Modal
    },
    // 方法
    watch: {},
    methods: {
        handleSizeChange () {},
        handleCurrentChange () {},
        // 编辑
        detail (value) {
            // this.$router.push('/complainDetail')
        },
        // 删除
        deleteThis (value) {
            this.$myAlert({
                type: 'waring',
                msg: `确定要删除账号 "${name}" 吗？`
            }).then(res => {
            }).catch(err => {
                console.log(err)
            })
        },
        closeAlert () {
            this.showAlert = false
        },
        sureAlert () {
            this.showAlert = false
        },
        // 新增
        add () {
            this.showAlert = true
        }
    },
    // 生命周期函数
    beforeCreate () {},
    mounted () {}
}
</script>

<style lang="less" scoped>
.page {
    // height: 100%;
    .content {
        position: relative;
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        top: 0;
        .wrap {
            padding: 0 20px;
            .table_box {
                border: 1px solid #dddddd;
                border-bottom: none;
            }
            .page_box {
                background: #f7f8f9;
                padding-top: 10px;
                height: 53px;
                border: 1px solid #dddddd;
                border-top: none;
            }
        }
    }
    .model {
        li {
            margin-top: 20px;
            text-align: left;
            label {
                float: left;
                line-height: 34px;
                text-align: right;
                width: 120px;
                span {
                    color: red;
                    margin-right: 3px;
                }
            }
            .ipt {
                width: 250px;
            }
        }
        .btn-box {
            text-align: center;
            margin: 20px 0 40px 0;
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
}
</style>
