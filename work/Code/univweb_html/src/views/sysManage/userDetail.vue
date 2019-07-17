<!-- 车辆档案 -->
<template>
    <div class="carArchives">
        <!-- <Header></Header>-->
        <div class="toolBar">
            <h3><span class="h3_line"></span><span>用户及权限>>编辑权限</span></h3>
            <div class="right_bar">
                <button class="back_btn" @click="$router.push('/userManage')">返回</button>
                <el-button class="add_btn"  icon="el-icon-tickets">保存</el-button>
            </div>
        </div>
        <div class="content">
            <div class="sidebar">
                <h3>麻花藤</h3>
                <div class="line">
                    <el-radio v-model="radio" label="1">开通全部区域数据查看权限</el-radio>
                </div>
                <div class="line">
                    <el-radio v-model="radio" label="2">开通指定区域数据查看权限</el-radio>
                </div>
                <el-table
                    :data="tableData3"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                    <el-table-column
                        prop="index"
                        label="区域名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="vehicleNo"
                        label="是否可以查看"
                        >
                    </el-table-column>
                </el-table>
            </div>
            <div class="table_box">
                <el-table
                    :data="tableData3"
                    height="600"
                    :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    :stripe="false"
                    style="">
                <el-table-column
                    prop="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="index"
                    label="功能名称">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="操作">
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
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    name: 'userDetail',
    data () {
        return {
            checked: '',
            radio: '',
            sideList: [],
            carNumber: '',
            carVin: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            chooseId: '', // 选中的id
            tableData3: []
        }
    },
    components: {
        Header
    },
    created () {
        // this.getVehicleInfoList()
        // this.getVehicleType()
    },
    methods: {
        select (id) {
            this.chooseId = id
            this.getVehicleInfoList()
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            // this.getVehicleInfoList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            // this.getVehicleInfoList()
        }
    }
}
</script>

<style lang='less' scoped>
.toolBar {
    height: 74px;
    line-height: 74px;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    label {
        margin: 10px;
    }
    .tool_ipt {
        width: 140px;
        &:first-child {
            margin-right: 30px;
        }
    }
    .tool_select {
        width: 140px;
    }
    h3 {
        float: left;
        color: #359dff;
        font-size: 16px;
        .h3_line {
            display: inline-block;
            width: 4px;
            height: 15px;
            background: #359dff;
            vertical-align: middle;
            margin-right: 5px;
        }
        span {
            vertical-align: middle;
        }
    }
    .right_bar {
        float: right;
    }
    .search_btn {
        width: 45px;
        height: 34px;
        margin-left: 20px;
        margin-right: 50px;
    }
    .add_btn {
        margin-left: 10px;
    }
}
.content {
    .table_box {
        padding:20px;
        margin-left: 250px;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 20px;
        box-sizing: border-box;
        float: left;
        text-align: left;
        h3 {
            margin-bottom: 10px;
        }
        .line {
            margin-bottom: 15px;
        }
    }
}
</style>
<style>
.toolBar .el-button{
    width: 98px;
    height: 34px;
    line-height: 34px;
    padding: 0;
}
.tool_ipt .el-input__inner {
    height: 34px;
    line-height: 34px;
}
</style>
