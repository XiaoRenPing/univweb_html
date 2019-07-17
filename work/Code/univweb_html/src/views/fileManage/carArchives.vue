<!-- 车辆档案 -->
<template>
    <div class="carArchives">
        <div class="content">
            <div class="sidebar">
                <div class="side_item" @click="select(item.vehicleTypeId)" :class="{active: item.vehicleTypeId == chooseId}" v-for="item in sideList" :key="item.vehicleTypeId">{{item.vehicleTypeName}}</div>
            </div>
            <div class="table_box">
                <div class="clearfix table_top table_top_bottom">
                    <div class="table_top_l clearfix">
                        <div class="table_top_ls">
                            <label>车牌号码：</label>
                            <el-input class="tool_ipt" v-model="carNumber" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="table_top_ls">
                            <label>VIN码：</label>
                            <el-input class="tool_ipt" v-model="carVin" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="table_top_lr fr">
                            <!-- <el-button class="search_btn" type="primary" icon="el-icon-search" @click="getVehicleInfoList(1)"></el-button>
                            <el-button class="add_btn" icon="el-icon-add" @click="$router.push('/newCarArchives')">
                                <img src="../../assets/images/iocn_add.png" alt="">
                                <span>新增档案</span>
                            </el-button> -->
                            <el-button class="query_btn slects_btn" @click="getVehicleInfoList(1)">查询</el-button>
                            <el-button class="react_btn" @click="toReact(1)">重置</el-button>
                        </div>
                    </div>
                </div>
                <div>
                    <el-table
                        :data="tableData3"
                        height="600"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :stripe="false"
                        style="">
                        <el-table-column
                            prop="index"
                            label="序号">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleNo"
                            label="车牌号码">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleLicensePlateColor"
                            label="车牌颜色">
                        </el-table-column>
                        <el-table-column
                            prop="vin"
                            label="VIN码">
                        </el-table-column>
                        <el-table-column
                            prop="typeName"
                            label="车辆类型">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleBrand"
                            label="品牌">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleSeriesName"
                            label="车系">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleOwner"
                            label="车主">
                        </el-table-column>
                        <el-table-column
                            prop="detail"
                            label="操作">
                            <template slot-scope="scope">
                                <router-link :to="'archivesDetail?id=' + scope.row.vehicleId">详情</router-link>
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
        </div>
        <bread-foot :breadArr="breadArr" icons="icon-archives-normal">
            <el-button type="primary" @click="$router.push('/newCarArchives')">新增档案</el-button>
        </bread-foot>
    </div>
</template>

<script>
import BreadFoot from '@/components/BreadFoot.vue'
import { plateColor } from '@/utils/type.js'
import ToolBar from '@/components/ToolBar.vue'
export default {
    name: 'carArchives',
    data () {
        return {
            breadArr: [
                { title: '档案管理', path: '' }, { title: '车辆档案', path: '' }
            ],
            sideList: [],
            carNumber: '',
            carVin: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            chooseId: '', // 选中的id
            tableData3: [],
            carColorList: plateColor // 车牌颜色列表
        }
    },
    components: {
        BreadFoot,
        ToolBar
    },
    created () {
        this.getVehicleInfoList()
        this.getVehicleType()
    },
    methods: {
        // 获取车辆类型
        getVehicleType () {
            this.$post('bas/vehicle/type/list')
                .then(res => {
                    if (res.status === 200) {
                        res.data.unshift({
                            vehicleTypeId: '',
                            vehicleTypeName: '全部档案'
                        })
                        this.sideList = res.data
                    }
                })
        },
        // 获取车辆档案列表
        getVehicleInfoList (clear) {
            if (clear) {
                this.pageNum = 1
            }
            var obj = {
                vehicleVin: this.carVin,
                vehicleLicensePlate: this.carNumber,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                vehicleType: this.chooseId
            }
            this.$post('bas/vehicle/info/list', obj)
                .then(res => {
                    if (res.status === 200) {
                        res.data.list.forEach((item, index) => {
                            let ind = ((this.pageNum - 1) * this.pageSize) + index + 1
                            item.index = ind < 10 ? '0' + ind : ind
                            this.carColorList.forEach(itemB => {
                                if (item.vehicleLicensePlateColor === itemB.value) {
                                    item.vehicleLicensePlateColor = itemB.label
                                }
                            })
                        })
                        this.tableData3 = res.data.list
                        this.total = res.total
                    } else {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$alert('网络错误，请重试！', '提示', {
                        confirmButtonText: '确定'
                    })
                })
        },
        select (id) {
            this.pageNum = 1
            this.chooseId = id
            this.getVehicleInfoList()
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.pageNum = 1
            this.getVehicleInfoList()
        },
        handleCurrentChange (val) {
            this.pageNum = val
            this.getVehicleInfoList()
        }
    }
}
</script>

<style lang='less' scoped>
.carArchives {
    background-color: #ffffff;
}
.content {
    position: relative;
    .table_box {
        padding:20px;
        margin-left: 250px;
        a {
            text-decoration: none;
            color: #359dff;
        }
    }
    .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        width: 220px;
        height: 100%;
        border-right: 1px solid #dddddd;
        padding: 20px 30px;
        box-sizing: border-box;
        .side_item {
            width: 160px;
            height: 30px;
            font-size: 14px;
            color: #666666;
            border-radius: 4px;
            margin: 10px auto 0;
            line-height: 32px;
            border: 1px solid #dddddd;
            background-color: #fff;
            transition: all .2s;
            cursor: pointer;
            &:first-child {
                margin-top: 0;
            }
            &.active {
                background-color: #1790FF;
                border: 1px solid #1790FF;
                color: #ffffff;
            }
            &:hover {
                color: #ffffff;
                background-color: #1790FF;
                border: 1px solid #1790FF;
            }
        }
    }
}
</style>
