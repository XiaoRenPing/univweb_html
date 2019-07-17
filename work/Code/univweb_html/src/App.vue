<template>
    <div id="app">
        <transition name="el-fade-in-linear" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
        }
    },
    computed: {
        cachedViews () {
            return this.$store.state.cachedViews
        },
        key () {
            return this.$route.fullPath
        },
        // 同步store头部状态
        headerStatus () {
            return this.$store.state.headerStatus
        },
        // 同步store标签页状态
        tagStatus () {
            return this.$store.state.tagStatus
        }
    },
    created () {
        console.log(this.$route.name)
    }
}
</script>
<style lang="less">
.el-tooltip__popper {
    max-width: 500px !important;
}
.baseline {
    vertical-align: baseline !important;
}
.hasWrap {
    margin: 20px;
    background: #ffffff;
    padding-bottom: 20px;
    margin-bottom: 0;
}
/*fade*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}
.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

#app {
    font-family: Microsoft YaHei, "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 1330px;
    background: #EDF0F5;
}
.important {
    color: red;
    margin-right: 3px;
}
.h34 {
    height: 32px !important;
    .el-input__inner {
        height: 32px !important;
    }
}
/*返回按钮*/
.back_btn {
    box-sizing: border-box;
    position: relative;
    width: 98px;
    top: 50%;
    height: 32px;
    color: #74899c;
    border-radius: 4px;
    line-height: 1;
    background: #ffffff;
    border: 1px solid #74899c;
    padding-left: 28px;
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    &:before {
        content: "";
        position: absolute;
        left: 21px;
        top: 8px;
        background: url(./assets/images/icon_back.png) no-repeat;
        width: 18px;
        height: 18px;
    }
}
/*返回按钮*/
.back_btn2 {
    box-sizing: border-box;
    position: relative;
    width: 98px;
    margin-left: 20px;
    // top: 50%;
    // margin-top: -17px;
    height: 32px;
    color: #74899c;
    border-radius: 4px;
    line-height: 32px;
    line-height: 1\9\0;
    background: #ffffff;
    border: 1px solid #74899c;
    padding-left: 28px;
    cursor: pointer;
    font-size: 14px;
    &:before {
        content: "";
        position: absolute;
        left: 21px;
        top: 8px;
        background: url(./assets/images/icon_back.png) no-repeat;
        width: 18px;
        height: 18px;
    }
}
.save-btn {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    border-radius: 4px;
    background: #359dff;
    color: #ffffff;
    border: none;
    float: right;
    top: 50%;
    margin-top: -17px;
    margin-left: 20px;
    margin-right: 20px;
    img {
        margin-right: 10px;
    }
}
.f16 {
    .el-radio__label {
        font-size: 16px !important;
    }
}
.el-button [class*="el-icon-"] + span {
    margin-left: 10px !important;
}
.el-pagination .el-select .el-input .el-select__caret {
    line-height: 28px;
}
.tableBorder {
    border: none;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    td {
        border: none;
        border-bottom: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
    }
}
.form {
    .el-textarea__inner {
        height: 100%;
    }
    .el-select {
        width: 100%;
    }
    .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
}
/*页面标题*/
.page_title {
    position: relative;
    color: #359dff;
    padding-left: 10px;
    float: left;
    font-size: 15px;
    &:before {
        content: "";
        width: 4px;
        height: 15px;
        position: absolute;
        top: 50%;
        margin-top: -8px;
        left: 0px;
        background: #359dff;
    }
}
.toolBarA {
    .el-button {
        width: 98px;
        height: 32px;
        line-height: 32px;
        padding: 0;
    }
    label {
        font-size: 14px;
        margin: 0 10px 0 30px;
    }
    .tool_ipt .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
    height: 74px;
    line-height: 74px;
    padding: 0 20px;
    .el-button {
        line-height: 1;
    }
    label {
        margin: 0 10px 0 30px;
        font-size: 14px;
    }
    .tool_ipt {
        width: 140px;
    }
    .tool_select {
        width: 140px;
    }
    .btn {
        float: right;
        .search_btn {
            margin-right: 20px;
            margin-left: 0px;
            img {
                margin-right: 10px;
            }
            img,
            span {
                vertical-align: middle;
            }
        }
        .back_btn {
            width: 98px;
            height: 32px;
            padding-left: 22px;
            color: #999;
            border: 1px solid #999;
            outline: none;
            cursor: pointer;
            &:before {
                content: "";
                left: 20px;
                top: 7px;
            }
        }
    }
    h3 {
        float: left;
        color: #359dff;
        font-size: 15px;
        height: 100%;
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
        margin-left: 20px;
    }
}
.query_btn, .react_btn {
    min-width: 70px;
    margin-right: 0px;
    margin-left: 0px;
}
.react_btn {
    &:hover {
        color: 606266;
        background: #ffffff;
    }
}
.slects_btn {
    color: #1890FF!important;
    border: 1px solid #1890FF!important;
    &:hover {
        background: #ffffff;
    }
}
.table_top_l {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .table_top_ls {
        width: 33%;
        font-size: 14px;
        float: left;
        line-height: 50px;
        label {
            width: 108px;
            display: inline-block;
            text-align: right;
            float: left;
        }
        .el-input {
            padding-left: 110px;
            width: 100%;
            box-sizing: border-box;
            display: block;
        }
        .el-select {
            display: block;
            padding-left: 110px;
            .el-input {
                padding: 0;
            }
        }
        .el-date-editor, .el-range-editor {
            width: auto;
            display: block;
            line-height: 50px;
            margin-top: 10px;
            margin-left: 110px;
        }
        .el-input__inner {
            height: 34px !important;
            line-height: 34px!important;
        }
    }
}
.table_top_lr {
    width: 33%;
    line-height: 50px;
    text-align: right;
}
.table_top_bottom {
    padding: 5px 0 25px;
}
.arrow-active {
    .table_top_ls {
        width: 33%;
    }
}
/* 弹窗样式 */
.el-message-box .el-message-box__header {
    padding: 12px 30px;
    background-color: #f7f8f9;
}
.el-message-box .el-message-box__title {
    font-size: 14px;
    color: #666;
}
.el-message-box .el-message-box__headerbtn {
    top: 10px;
}
.el-message-box .el-message-box__content {
    padding: 30px 30px 30px 50px;
}
.el-message-box .el-message-box__btns {
    text-align: center;
}
.el-message-box .el-message-box__btns {
    .el-button {
        width: 98px;
        height: 32px;
    }
}
.el-input__inner {
    height: 32px;
    line-height: 32px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}
.el-select {
    .el-input__inner {
        height: auto;
    }
}
.right_bar .el-date-editor {
    width: 300px;
    height: 32px;
}
.el-pagination {
    .el-input__inner {
        height: 28px !important;
        line-height: 28px !important;
    }
}
.el-button {
    height: 32px;
    line-height: 32px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    // padding: 0!important;
    // width: 100px;
}
.el-select .el-input .el-select__caret {
    line-height: 32px;
}
.el-textarea__inner {
    font-family: "微软雅黑", "Microsoft Yahei", sans-serif;
}
.el-input.is-disabled .el-input__inner {
    color: #333 !important;
}
.el-upload-list__item-name {
    width: 102px;
}
.el-table__body {
    tr {
        height: 40px !important;
    }
    td {
        height: 40px !important;
        padding: 5px !important;
    }
}
.el-table {
    // border: 1px solid #ddd !important;
}
.el-table--fit {
    // border-right: 1px solid #ddd !important;
    // border-bottom: 1px solid #ddd !important;
}
.el-range-editor .el-range-input,
.el-date-editor .el-range__icon,
.el-date-editor .el-range__close-icon,
.el-date-editor .el-range-separator {
    vertical-align: middle;
}
.el-range-editor.el-input__inner {
    height: 34px;
    // line-height: 32px!important;
}
.el-tabs__nav {
    z-index: 1 !important;
}
.sidebar {
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
.el-message-box__wrapper {
    z-index: 99999 !important;
}
.el-message-box {
    width: 398px !important;
    padding-bottom: 30px !important;
}
.el-message-box .el-message-box__content {
    padding: 33px;
    text-align: center;
}
// 样式
.center {
    text-align: center !important;
}
.tal {
    text-align: left !important;
}
.tar {
    text-align: right !important;
}
.el-table thead {
    color: #000000 !important;
}
.w240 {
    width: 240px !important;
}
.mgr20 {
    margin-right: 20px;
}
.el-range-editor .el-range-input {
    background: none;
}
.table_box {
    border: none !important;
}
.tab-box {
    border: none !important;
}
.page_box {
    background: #f7f8f9;
    padding-top: 10px;
    height: 53px;
    border: 1px solid #dddddd;
    border-top: none;
}
.el-icon-search:before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(./assets/images/search_icon.png) no-repeat;
}
.myIcon::before {
    font-size: 18px;
    position: relative;
    top: 2px;
}
.el-icon-tickets:before {
    content: "" !important;
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(./assets/images/save.png) no-repeat;
    position: relative;
    top: 2px;
}
/*!
 * Viewer.js v1.3.0
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-10-25T12:41:52.459Z
 */

.viewer-zoom-in::before,
.viewer-zoom-out::before,
.viewer-one-to-one::before,
.viewer-reset::before,
.viewer-prev::before,
.viewer-play::before,
.viewer-next::before,
.viewer-rotate-left::before,
.viewer-rotate-right::before,
.viewer-flip-horizontal::before,
.viewer-flip-vertical::before,
.viewer-fullscreen::before,
.viewer-fullscreen-exit::before,
.viewer-close::before {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC");
    background-repeat: no-repeat;
    color: transparent;
    display: block;
    font-size: 0;
    height: 20px;
    line-height: 0;
    width: 20px;
}

.viewer-zoom-in::before {
    background-position: 0 0;
    content: "Zoom In";
}

.viewer-zoom-out::before {
    background-position: -20px 0;
    content: "Zoom Out";
}

.viewer-one-to-one::before {
    background-position: -40px 0;
    content: "One to One";
}

.viewer-reset::before {
    background-position: -60px 0;
    content: "Reset";
}

.viewer-prev::before {
    background-position: -80px 0;
    content: "Previous";
}

.viewer-play::before {
    background-position: -100px 0;
    content: "Play";
}

.viewer-next::before {
    background-position: -120px 0;
    content: "Next";
}

.viewer-rotate-left::before {
    background-position: -140px 0;
    content: "Rotate Left";
}

.viewer-rotate-right::before {
    background-position: -160px 0;
    content: "Rotate Right";
}

.viewer-flip-horizontal::before {
    background-position: -180px 0;
    content: "Flip Horizontal";
}

.viewer-flip-vertical::before {
    background-position: -200px 0;
    content: "Flip Vertical";
}

.viewer-fullscreen::before {
    background-position: -220px 0;
    content: "Enter Full Screen";
}

.viewer-fullscreen-exit::before {
    background-position: -240px 0;
    content: "Exit Full Screen";
}

.viewer-close::before {
    background-position: -260px 0;
    content: "Close";
}

.viewer-container {
    bottom: 0;
    direction: ltr;
    font-size: 0;
    left: 0;
    line-height: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    -webkit-tap-highlight-color: transparent;
    top: 0;
    -webkit-touch-callout: none;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.viewer-container::-moz-selection,
.viewer-container *::-moz-selection {
    background-color: transparent;
}

.viewer-container::selection,
.viewer-container *::selection {
    background-color: transparent;
}

.viewer-container img {
    display: block;
    height: auto;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
}

.viewer-canvas {
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
}

.viewer-canvas > img {
    height: auto;
    margin: 15px auto;
    max-width: 90% !important;
    width: auto;
}

.viewer-footer {
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    text-align: center;
}

.viewer-navbar {
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.viewer-list {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 50px;
    margin: 0;
    overflow: hidden;
    padding: 1px 0;
}

.viewer-list > li {
    color: transparent;
    cursor: pointer;
    float: left;
    font-size: 0;
    height: 50px;
    line-height: 0;
    opacity: 0.5;
    overflow: hidden;
    -webkit-transition: opacity 0.15s;
    transition: opacity 0.15s;
    width: 30px;
}

.viewer-list > li:hover {
    opacity: 0.75;
}

.viewer-list > li + li {
    margin-left: 1px;
}

.viewer-list > .viewer-loading {
    position: relative;
}

.viewer-list > .viewer-loading::after {
    border-width: 2px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    width: 20px;
}

.viewer-list > .viewer-active,
.viewer-list > .viewer-active:hover {
    opacity: 1;
}

.viewer-player {
    background-color: #000;
    bottom: 0;
    cursor: none;
    display: none;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.viewer-player > img {
    left: 0;
    position: absolute;
    top: 0;
}

.viewer-toolbar > ul {
    display: inline-block;
    margin: 0 auto 5px;
    overflow: hidden;
    padding: 3px 0;
}

.viewer-toolbar > ul > li {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    float: left;
    height: 24px;
    overflow: hidden;
    -webkit-transition: background-color 0.15s;
    transition: background-color 0.15s;
    width: 24px;
}

.viewer-toolbar > ul > li:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.viewer-toolbar > ul > li::before {
    margin: 2px;
}

.viewer-toolbar > ul > li + li {
    margin-left: 1px;
}

.viewer-toolbar > ul > .viewer-small {
    height: 18px;
    margin-bottom: 3px;
    margin-top: 3px;
    width: 18px;
}

.viewer-toolbar > ul > .viewer-small::before {
    margin: -1px;
}

.viewer-toolbar > ul > .viewer-large {
    height: 30px;
    margin-bottom: -3px;
    margin-top: -3px;
    width: 30px;
}

.viewer-toolbar > ul > .viewer-large::before {
    margin: 5px;
}

.viewer-tooltip {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    color: #fff;
    display: none;
    font-size: 12px;
    height: 20px;
    left: 50%;
    line-height: 20px;
    margin-left: -25px;
    margin-top: -10px;
    position: absolute;
    text-align: center;
    top: 50%;
    width: 50px;
}

.viewer-title {
    color: #ccc;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    margin: 0 5% 5px;
    max-width: 90%;
    opacity: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-transition: opacity 0.15s;
    transition: opacity 0.15s;
    white-space: nowrap;
}

.viewer-title:hover {
    opacity: 1;
}

.viewer-button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    height: 80px;
    overflow: hidden;
    position: absolute;
    right: -40px;
    top: -40px;
    -webkit-transition: background-color 0.15s;
    transition: background-color 0.15s;
    width: 80px;
}

.viewer-button:focus,
.viewer-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.viewer-button::before {
    bottom: 15px;
    left: 15px;
    position: absolute;
}

.viewer-fixed {
    position: fixed;
}

.viewer-open {
    overflow: hidden;
}

.viewer-show {
    display: block;
}

.viewer-hide {
    display: none;
}

.viewer-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.viewer-invisible {
    visibility: hidden;
}

.viewer-move {
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab;
}

.viewer-fade {
    opacity: 0;
}

.viewer-in {
    opacity: 1;
}

.viewer-transition {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}

@-webkit-keyframes viewer-spinner {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes viewer-spinner {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.viewer-loading::after {
    -webkit-animation: viewer-spinner 1s linear infinite;
    animation: viewer-spinner 1s linear infinite;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    content: "";
    display: inline-block;
    height: 40px;
    left: 50%;
    margin-left: -20px;
    margin-top: -20px;
    position: absolute;
    top: 50%;
    width: 40px;
    z-index: 1;
}
.w200 {
    width: 200px !important;
}

@media (max-width: 767px) {
    .viewer-hide-xs-down {
        display: none;
    }
}

@media (max-width: 991px) {
    .viewer-hide-sm-down {
        display: none;
    }
}

@media (max-width: 1199px) {
    .viewer-hide-md-down {
        display: none;
    }
}
</style>
