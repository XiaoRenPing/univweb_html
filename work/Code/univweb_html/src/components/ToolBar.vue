<template>
    <div class="toolBar">
        <!-- <h3 ref="tip" v-if="tipHide">{{title}}<span class="tips"><slot name="tips"></slot></span></h3> -->
        <slot name="center"></slot>
        <div ref="bar" class="right_bar">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // tipHide: true
        }
    },
    // watch: {

    // },
    mounted () {
        // this.hideTips()
    },
    methods: {
        // hideTips () {
        //     const bdWidth = document.body.scrollWidth - 40
        //     const tipWidth = this.$refs.tip.clientWidth
        //     const barWidth = this.$refs.bar.clientWidth
        //     if (tipWidth + barWidth > bdWidth - 40) {
        //         this.tipHide = false
        //     }
        // }
    }
}
</script>

<style lang='less' scoped>
.toolBar {
    // height: 99px;
    line-height: 99px;
    padding: 0 20px;
    font-size: 14px;
    text-align: center;
    label {
        margin: 0 8px 0 20px;
        font-size: 14px;
    }
    .csv-upload {
        display: inline-block;
    }
    .tool_ipt {
        width: 300px;
        &:first-child {
            margin-right: 30px;
        }
    }
    .tool_select {
        width: 140px;
    }
    .import-btn {
        padding: 0;
        width: 80px;
        min-width: 80px;
        margin-left: 10px;
    }
    h3 {
        float: left;
        color: #666;
        font-size: 15px;
        height: 66px;
        .tips {
            font-size: 13px;
            color: #ff0000;
            margin-left: 20px;
        }
    }
    .right_bar {
        float: left;
        width: 100%;
        .add_btn {
            .add-icon {
                margin-right: 8px;
            }
        }
    }
    .back_btn {
        vertical-align: middle;
    }
    .search_btn {
        width: 45px;
        min-width: 45px;
        height: 34px;
        margin-left: 20px;
        padding: 0;
    }
}
</style>
<style lang="less">
.toolBar {
    overflow: hidden;
    .el-select {
        .el-input__inner {
            height: 34px;
            width: 300px;
        }
    }
    .el-input__inner {
        height: 34px;
        width: 300px;
    }
    .w200 {
        .el-input__inner {
            width: 200px;
        }
    }
    .w300 {
        .el-input__inner {
            width: 300px;
        }
    }
    img {
        margin-right: 8px;
    }
    .add_btn {
        padding: 0 10px;
        width: auto;
    }
    .add-icon, .add-name {
        vertical-align: middle;
    }
    .el-button {
        line-height: 1;
        min-width: 70px;
        .el-icon-tickets {
            margin-right: 8px;
        }
        .el-icon-tickets, span > span {
            vertical-align: middle;
        }
        & > span {
            span, img {
                vertical-align: middle;
            }
        }
        &.confirm {
            padding: 0;
            width: 98px;
        }
    }
    .import-btn {
        padding: 0;
        width: 80px;
        min-width: 80px;
        margin-left: 10px;
    }
    .el-button, .el-select, label, .el-input, & > button {
        vertical-align: middle;
    }
    .el-button [class*=el-icon-] + span {
        margin-left: 0 !important;
    }
}
@media screen and (max-width: 1620px) {
    .toolBar {
        .el-select {
            .el-input__inner {
                height: 34px;
                width: 200px;
            }
        }
        .el-input__inner {
            height: 34px;
            width: 200px;
        }
        .tool_ipt {
            width: 200px!important;
        }
    }
}
@media screen and (min-width: 1420px) and (max-width: 1620px) {
    .toolBar {
        .el-select {
            .el-input__inner {
                height: 34px;
                width: 160px;
            }
        }
        .el-input__inner {
            height: 34px;
            width: 160px;
        }
        .tool_ipt {
            width: 160px!important;
        }
    }
}
@media screen and (max-width: 1420px) {
    .toolBar {
        .el-select {
            .el-input__inner {
                height: 34px;
                width: 120px;
            }
        }
        .el-input__inner {
            height: 34px;
            width: 120px;
        }
        .tool_ipt {
            width: 120px!important;
        }
    }
}
</style>
