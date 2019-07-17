
<template>
    <div class="sidebar">
        <el-scrollbar style="height:100%">
            <div class="radio clearfix" v-if="$checkAuth('bas:unit:certificate:list')">
                <div class="radio-item" :class="{active:!sideRadio}" @click="sideRadio=0">行政区域</div>
                <div class="radio-item" :class="{active:sideRadio}" @click="sideRadio=1;getCertificateList()">发证机关</div>
                <div class="line" :class="{active:sideRadio}"></div>
            </div>
            <div class="side-list clearfix" :class="{active:sideRadio,haslist:$checkAuth('bas:unit:certificate:list')}">
                <div class="side-list-region">
                    <div class="side_item" @click="select(item.regionId, 'enterpriseRegion')" :class="{active: item.regionId == chooseId}" v-for="item in sideList" :key="item.regionId">
                        {{item.regionName}}
                    </div>
                </div>
                <div class="side-list-certificate" v-if="$checkAuth('bas:unit:certificate:list')">
                    <div class="side_item" @click="select(item.unitCertificateId, 'uniteCertificateId')" :class="{active: item.unitCertificateId == chooseId}" v-for="item in certificateList" :key="item.unitCertificateId">
                        {{item.unitCertificateName}}
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'sidebar',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            sideList: [],
            certificateList: [],
            sideRadio: 0,
            chooseId: 'all' // 选中的id
        }
    },
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {
        sideRadio (val) {
            this.chooseId = 'all'
            if (val === 0) {
                this.$emit('selectABC', 'all', 'enterpriseRegion')
            } else {
                this.$emit('selectABC', 'all', 'uniteCertificateId')
            }
        }
    },
    // 生命周期函数
    created () {
        this.findLoginRegion()
    },
    methods: {
        getCertificateList () {
            if (this.certificateList && this.certificateList.length) {
                return
            }
            this.$post('bas/unit/certificate/list', {})
                .then(res => {
                    if (res.status === 200) {
                        this.certificateList = res.data || []
                        this.certificateList.unshift({
                            unitCertificateId: 'all',
                            unitCertificateName: '全部'
                        })
                    }
                })
        },
        findBaseEnterpriseOpen () {
            var id = this.chooseId
            if (id === 'all') {
                id = ''
            }
            this.$post('bas/enterprise/register/findBaseEnterpriseOpen', {
                enterpriseRegion: id
            })
                .then(res => {
                    if (res.status === 200) {}
                })
        },
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findLoginRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        res.datas.unshift({
                            regionId: 'all',
                            regionName: '全部区域'
                        })
                        this.sideList = res.datas
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 切换区域
        select (id, param) {
            this.chooseId = id
            this.$emit('selectABC', id, param)
        }
    }
}
</script>

<style lang="less" scoped>
.sidebar {
    width: 250px;
    height: 100%;
    border-right: 1px solid #dddddd;
    box-sizing: border-box;
    .radio {
        line-height: 43px;
        height: 43px;
        border-bottom: 1px solid #eee;
        text-align: center;
        position: relative;
        .radio-item {
            float: left;
            width: 50%;
            color: #999999;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: all .3s;
            &.active {
                color: #359DFF;
            }
        }
        .line {
            width:95px;
            height:2px;
            background: #359DFF;
            position: absolute;
            bottom: 0px;
            bottom: -1px;
            left: 14px;
            transition: all .3s;
            &.active {
                left: 139px;
            }
        }
    }
    .side-list {
        width: 500px;
        position: absolute;
        top: 20px;
        left: 0%;
        transition: all .3s;
        &.active {
            left: -100%;
        }
        &.haslist {
            top: 70px;
        }
        .side-list-region {
            width: 250px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .side-list-certificate {
            width: 250px;
            height: 100%;
            position: absolute;
            left: 250px;
            top: 0;
        }
    }
    .side_item {
        width: 170px;
        height: 38px;
        text-align: center;
        border-radius: 4px;
        padding: 0 10px;
        margin: 10px auto 0;
        line-height: 40px;
        border: 1px solid #dddddd;
        background-color: #fff;
        transition: all 0.2s;
        font-size: 14px;
        color: #666666;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:nth-child(1) {
            margin-top: 0;
        }
        &.active {
            background-color: #359dff;
            border: 1px solid #359dff;
            color: #ffffff;
        }
        &:hover {
            background-color: #359dff;
            color: #fff;
        }
    }
}
</style>
