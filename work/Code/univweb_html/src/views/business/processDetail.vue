<template>
    <div class="processDetail">
        <div class="content">
            <!-- <tool-bar :title="'业务操作>企业信用评价>企业参评管理>详情'">
                <el-button class="w108" type="primary" @click="adoptMaterial(1)" :disabled="Ffinish!=='未完成'" v-if="activeName==='tab1'">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>审核通过</span>
                </el-button>
                <el-button class="w108" type="primary" @click="adoptMaterial(-1)" :disabled="Ffinish!=='未完成'" v-if="activeName==='tab1'">
                    <img src="../../assets/images/refuse.png" alt="">
                    <span>审核拒绝</span>
                </el-button>
                <el-button type="primary" @click="slefSave" :disabled="step>2" v-if="activeName==='tab2'">
                    <img src="../../assets/images/save.png" alt="">
                    <span>保存</span>
                </el-button>
                <el-button type="primary" @click="saveSupervise" :disabled="step>=3" v-if="activeName==='tab3'&&step==2">
                    <img src="../../assets/images/save.png" alt="">
                    <span>保存</span>
                </el-button>
                <el-button type="primary" v-if="step>=3&&activeName==='tab3'" @click="editFinalScore" :disabled="!!enterpriseEvaluateCertificateLevel">
                    <img src="../../assets/images/save.png" alt="">
                    <span>保存</span>
                </el-button>
                <el-button class="w108" type="primary" @click="adopt(1)" :disabled="!applyList.length"  v-if="activeName==='tab4'">
                    <img src="../../assets/images/pass.png" alt="">
                    <span>审核通过</span>
                </el-button>
                <el-button class="w108" type="primary" @click="alertRefuse=true" :disabled="!applyList.length" v-if="activeName==='tab4'">
                    <img src="../../assets/images/refuse.png" alt="">
                    <span>审核拒绝</span>
                </el-button>
                <el-button class="search_btn" type="primary" @click="finish()" style="width:140px;" v-if="activeName==='tab5'">
                    <img src="../../assets/images/star.png" alt="">
                    <span>{{ enterpriseEvaluateCertificateLevel ? '查看诚信档案' :'生成诚信档案'}}</span>
                </el-button>
                <button class="back_btn" @click="$router.push('/process')">返回</button>
            </tool-bar> -->
            <div class='wrap'>
                <el-tabs v-model="activeName" type="card" @tab-click="changeTabs">
                    <el-tab-pane label="诚信材料审核" name="tab1">
                        <div class="table_box">
                            <el-table
                                :data="materialsList2"
                                height="600"
                                :header-cell-style="{'text-align':'center'}"
                                :cell-style="{'text-align':'center'}"
                                :stripe="false"
                                style="width: 100%">
                                <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="60"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSelfMaterialYear"
                                    label="参评年份"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseName"
                                    label="企业名称"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="indexTermSuperviseName"
                                    label="指标项"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSelfMaterialExplain"
                                    label="指标说明"
                                    width="450"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSelfMaterialDesc"
                                    label="材料描述"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSelfMaterialUnit"
                                    label="证明单位"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="createTime"
                                    label="录入时间"
                                    >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createTime|formatTimeS}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSelfMaterialStatus"
                                    label="状态"
                                    >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.enterpriseEvaluateSelfMaterialStatus|materialStatusFilter}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="附件"
                                    width="">
                                    <template slot-scope="scope">
                                        <!-- <el-button type="text" size="small" @click="goDetail(scope.row.id)">详情</el-button> -->
                                        <p v-for="(i,index) in scope.row.busEnterpriseEvaluateSelfFileList" :key="index">
                                            <a class="aReset" :href="i.enterpriseEvaluateSelfFileUrl" target="_blank">网址链接</a>
                                        </p>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- <div class="page_box">
                                <el-pagination
                                    @size-change="handleSizeChange1"
                                    @current-change="handleCurrentChange1"
                                    :current-page="pageNum1"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSize1"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total1">
                                </el-pagination>
                            </div> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="企业自评" name="tab2" class="tab2">
                        <div class="tableInfo clearfix">
                            <h5>机动车维修企业信用等级评分表</h5>
                            <span class="span1">企业名称:{{comObj.enterpriseName}}</span>
                            <span class="span2">检查日期:{{comObj.enterpriseEvaluateSelfDate|formatTimeS()}}</span>
                            <span class="span3">检查人员:{{comObj.enterpriseEvaluateSelfPerson}}</span>
                        </div>
                        <div class="table_box">
                            <el-table
                                :data="selfList"
                                border
                                :header-cell-style="{'text-align':'center'}"
                                :cell-style="{'text-align':'center'}"
                                :stripe="false"
                                show-summary
                                :span-method="objectSpanMethod"
                                style="width: 100%">
                                <!-- :span-method="objectSpanMethod3" -->
                                <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="60"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop=""
                                    label="指标分类"
                                    width="120"
                                    >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.indexTermTypeId|itemTypeFilter(typeList)}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseName"
                                    label="考核项目"
                                    width="120"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseDesc"
                                    label="评分标准"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseScore"
                                    label="该项满分"
                                    width="80"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseEnterpriseScore"
                                    label="自评得分"
                                    width="80">
                                    <!-- <template slot-scope="scope">
                                        <span>{{scope.row.enterpriseEvaluateSuperviseEnterpriseScore}}</span>
                                    </template> -->
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="监管评分" name="tab3" v-if="step>=2">
                        <div class="tableInfo clearfix">
                            <h5>机动车维修企业信用等级评分表</h5>
                            <span class="span1">企业名称:{{comObj.enterpriseName}}</span>
                            <span class="span4">评分周期:{{comObj.enterpriseEvaluateSelfYear}}</span>
                            <span class="span3">社会信用代码:{{comObj.enterpriseCreditIdentifier}}</span>
                            <span class="span3">经营类别:{{comObj.enterpriseBusinessCategory}}</span>
                        </div>
                        <div class="table_box">
                            <el-table
                                v-show="!hasSupervise"
                                :data="selfList"
                                border
                                :header-cell-style="{'text-align':'center'}"
                                :cell-style="{'text-align':'center'}"
                                :stripe="false"
                                show-summary
                                :span-method="objectSpanMethod"
                                style="width: 100%">
                                <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="60"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop=""
                                    label="分类"
                                    width="120"
                                    >
                                    <template slot-scope="scope">
                                        {{scope.row.indexTermTypeId|itemTypeFilter(typeList)}}<br>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseName"
                                    label="考核项目"
                                    width="120"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseDesc"
                                    label="评分标准"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseScore"
                                    label="该项满分"
                                    width="80"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseEnterpriseScore"
                                    label="自评得分"
                                    width="80"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseInitScore"
                                    width="160"
                                    label="初评得分"
                                    >
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.enterpriseEvaluateSuperviseInitScore"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- <div class="allScore" v-show="!hasSupervise">
                                合计得分：
                                <span class="fr span1">{{totalFulls}}</span>
                                <span class="fr span2">{{totalChoices}}</span>
                            </div> -->
                            <el-table
                                v-show="hasSupervise"
                                :data="selfList"
                                border
                                :header-cell-style="{background:'#EDF0F5','text-align':'center'}"
                                :cell-style="{'text-align':'center'}"
                                :stripe="false"
                                show-summary
                                :span-method="objectSpanMethod"
                                style="width: 100%">
                                <!-- :span-method="objectSpanMethod" -->
                                <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="60"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop=""
                                    label="分类"
                                    width="120"
                                    >
                                    <template slot-scope="scope">
                                        {{scope.row.indexTermTypeId|itemTypeFilter(typeList)}}<br>
                                        ({{scope.row.selfMarks}}/{{scope.row.fullMarks}})
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseName"
                                    label="考核项目"
                                    width="120"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseDesc"
                                    label="评分标准"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseScore"
                                    label="该项满分"
                                    width="80"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseEnterpriseScore"
                                    label="自评得分"
                                    width="80"
                                    :show-overflow-tooltip='true'
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseInitScore"
                                    width="80"
                                    label="初评得分"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseFinalScore"
                                    width="160"
                                    label="最终得分"
                                    >
                                    <template slot-scope="scope">
                                        <el-input v-if="!enterpriseEvaluateCertificateLevel" class="smll" type="number" v-model="scope.row.enterpriseEvaluateSuperviseFinalScore"></el-input>
                                        <span v-if="enterpriseEvaluateCertificateLevel">{{scope.row.enterpriseEvaluateSuperviseFinalScore}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- <div class="allScore" v-show="hasSupervise">
                                合计得分：
                                <span class="fr span1">{{totalFull}}</span>
                                <span class="fr span2">{{totalChoice}}</span>
                            </div> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="异议申诉审核" name="tab4" v-if="step>=3">
                        <div class="table_box">
                            <el-table
                                :data="applyList"
                                height="600"
                                border
                                :header-cell-style="{'text-align':'center'}"
                                :cell-style="{'text-align':'center'}"
                                :stripe="false"
                                style="width: 100%">
                                <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="60"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseName"
                                    label="考核项目"
                                    width="80"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseDesc"
                                    label="评分标准"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseAppealDesc"
                                    label="申诉内容"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseScore"
                                    label="该项满分"
                                    width="80"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseEnterpriseScore"
                                    label="自评得分"
                                    width="80"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseInitScore"
                                    label="初评得分"
                                    width="80"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="enterpriseEvaluateSuperviseAppealScore"
                                    label="申诉分值"
                                    width="80"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="createTime"
                                    label="申诉时间"
                                    width="100"
                                    >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createTime|formatTimeS}}</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column
                                    prop="name"
                                    label="附件"
                                    width="">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="goDetail(scope.row.id)">网站链接</el-button>
                                    </template>
                                </el-table-column> -->
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="诚信档案生成" name="tab5" class="tab5" v-if="step>=3">
                        <div>
                            <div class="line">
                                <label for="">当前评价年度：</label>
                                <el-input class="line-ipt" v-model="Fyear" disabled></el-input>
                            </div>
                            <div class="line">
                                <label for="">诚信材料审核：</label>
                                <el-input class="line-ipt" v-model="Ffinish" disabled></el-input>
                            </div>
                            <div class="line">
                                <label for="">企业自评得分：</label>
                                <el-input class="line-ipt" v-model="Fscore1" disabled></el-input>
                            </div>
                            <div class="line">
                                <label for="">初评得分：</label>
                                <el-input class="line-ipt" v-model="Fscore2" disabled></el-input>
                            </div>
                            <div class="line">
                                <label for="">终评得分：</label>
                                <el-input class="line-ipt" v-model="Fscore3" disabled></el-input>
                            </div>
                            <div class="line">
                                <label for=""><span class="red">*</span>评价信用等级：</label>
                                <el-select class="line-ipt" :disabled="!!enterpriseEvaluateCertificateLevel" v-model="starValue">
                                    <el-option
                                        v-for="item in ['AA','A','B','C','D']"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="line">
                                <label for="">备注说明：</label>
                                <el-input class="line-ipt" v-model="starBak" :disabled="!!enterpriseEvaluateCertificateLevel" type="textarea"></el-input>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <modal :alert="alert" :title="'拒绝'" :width="450" :height="242" @alertConfirm="alertConfirm" @alertCancel="alertCancel">
            <div class="alert-content clearfix">
                <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="refuseMsg"
                    maxlength="250"
                    class="textarea">
                </el-input>
            </div>
            <div class="btn">
                <el-button class="search_btn" type="primary" @click="alertConfirm" v-text="'确定'"></el-button>
                <el-button class="search_btn" @click="alertCancel" v-text="'取消'"></el-button>
            </div>
        </modal>
        <modal :alert="alertRefuse" :title="'拒绝'" :width="450" :height="242" @alertConfirm="alertRefuseConfirm" @alertCancel="alertRefuse=false">
            <div class="alert-content clearfix">
                <div class="name"><span class="red">*&nbsp;</span>拒绝理由：</div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    maxlength="250"
                    v-model="refuseMsg"
                    class="textarea">
                </el-input>
            </div>
            <div class="btn">
                <el-button class="search_btn" type="primary" @click="alertRefuseConfirm" v-text="'确定'"></el-button>
                <el-button class="search_btn" @click="alertRefuse=false" v-text="'取消'"></el-button>
            </div>
        </modal>
        <modal :alert="alertCanvas" :title="'生成诚信档案'" :width="550" :height="820"  @alertConfirm="alertConfirm2" @alertCancel="alertCancel2">
            <div class="canvasBox" style="height:820px;width:550px;">
                <!-- <canvas id="canvas" width="848" height="1006"></canvas> -->
                <embed :src="pdfUrl" type="application/pdf" width="100%" height="100%">
            </div>
        </modal>
        <bread-foot :breadArr="breadArr" icons="icon-business-normal">
            <el-button type="primary" @click="adoptMaterial(1)" :disabled="Ffinish!=='未完成'" v-if="activeName==='tab1'">审核通过</el-button>
            <el-button type="primary" @click="adoptMaterial(-1)" :disabled="Ffinish!=='未完成'" v-if="activeName==='tab1'">审核拒绝</el-button>
            <el-button type="primary" @click="slefSave" :disabled="step>2" v-if="activeName==='tab2'">保存</el-button>
            <el-button type="primary" @click="saveSupervise" :disabled="step>=3" v-if="activeName==='tab3'&&step==2">保存</el-button>
            <el-button type="primary" v-if="step>=3&&activeName==='tab3'" @click="editFinalScore" :disabled="!!enterpriseEvaluateCertificateLevel">保存</el-button>
            <el-button type="primary" @click="adopt(1)" :disabled="!applyList.length"  v-if="activeName==='tab4'">审核通过</el-button>
            <el-button type="primary" @click="alertRefuse=true" :disabled="!applyList.length" v-if="activeName==='tab4'">审核拒绝</el-button>
            <el-button type="primary" @click="finish()" style="width:140px;" v-if="activeName==='tab5'">{{ enterpriseEvaluateCertificateLevel ? '查看诚信档案' :'生成诚信档案'}}</el-button>
            <el-button class="react_btn" @click="$router.push('/creditEva/process')">返回</el-button>
        </bread-foot>
    </div>
</template>

<script type="text/javascript">
// import Header from '@/components/Header.vue'
import BreadFoot from '@/components/BreadFoot.vue'
import Sidebar from '@/components/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import ToolBar from '@/components/ToolBar.vue'
import { filterTime } from '@/utils/filterTime.js'
import { setNum } from '@/utils/tools.js'
export default {
    name: 'processDetail',
    // 组件属性、变量、用于接收父组件的传值
    props: {},
    // 变量
    data () {
        return {
            breadArr: [
                { title: '业务操作', path: '' }, { title: '企业诚信评价', path: '' }, { title: '企业参评管理', path: '' }, { title: '企业参评详情', path: '' }
            ],
            comObj: {},
            hasConcat: false,
            spanArr2: [],
            spanArr3: [],
            spanArr: [],
            materialsList2: [],
            enterpriseEvaluateCertificateBak: '', // 评分备注
            enterpriseEvaluateCertificateLevel: '', // 评分等级
            pdfUrl: '', // pdf路径
            superviseListDemo: [],
            typeList: [],
            starBak: '', // 备注
            Fyear: new Date().getFullYear(),
            Ffinish: '未完成',
            Fscore1: '',
            Fscore2: '',
            Fscore3: '',
            starValue: '', // 最终评分
            // Fscore3: '',
            step: -1, // 参评进度
            alertRefuse: '', // 申诉拒绝弹窗
            applyList: [], // 异议申诉列表
            enterpriseEvaluateSelfId: '', // 自评记录id
            hasSupervise: false, // 已经完成监管评分
            enterpriseEvaluateSelfAdminScore: '', // 企业自评分数
            superviseList: [], // 监管列表
            superviseList2: [], // 已经评价过的监管列表
            selfObj: [], // 企业自评信息
            selfList: [], // 自评列表
            materialsList: [], // 材料列表
            alertCanvas: false, // 诚信档案弹窗
            dataObj: '', // 全部信息
            input: '',
            value: '',
            businessHours: '',
            validityTime: '',
            radio: '1',
            textarea: '',
            activeName: 'tab1',
            currentPage: 1,
            alert: false,
            alertTitle: '拒绝',
            refuseMsg: '',
            regionList: [],
            operateStateList: [
                {
                    value: '1',
                    label: '营业'
                },
                {
                    value: '2',
                    label: '停业'
                },
                {
                    value: '3',
                    label: '整顿'
                },
                {
                    value: '4',
                    label: '停业整顿'
                },
                {
                    value: '5',
                    label: '歇业'
                },
                {
                    value: '6',
                    label: '注销'
                },
                {
                    value: '9',
                    label: '其他'
                }
            ],
            pageNum1: 1,
            pageSize1: 10,
            total1: 0,
            tableData1: [
                { name: 1 }
            ],
            tableData2: [],
            tableData3: []
        }
    },
    mounted () {
        // let contactDot = 0
        // this.superviseList.forEach((item, index) => {
        //     item.index = index
        //     if (index === 0) {
        //         this.spanArr.push(1)
        //     } else {
        //         if (item.indexTermTypeId === this.superviseList[index - 1].indexTermTypeId) {
        //             this.spanArr[contactDot] += 1
        //             this.spanArr.push(0)
        //         } else {
        //             this.spanArr.push(1)
        //             contactDot = index
        //         }
        //     }
        // })
        // console.log(this.spanArr)
    },
    created () {
        this.findLoginRegion()
        this.querySelf()
        if (this.$route.query.step > 2) {
            this.getApplyList()
        }
        this.getFinishInfo()
        this.step = this.$route.query.step
        if (this.step - 0 === 1) this.activeName = 'tab2'
        if (this.step - 0 === 2) this.activeName = 'tab3'
        if (this.step - 0 === 3) this.activeName = 'tab5'
        if (this.step - 0 === 4) this.activeName = 'tab5'
        if (this.step > 2) this.hasSupervise = true
        this.$post('bas/indexTerm/type/find', {}).then(res => {
            if (res.status === 200) {
                this.typeList = res.datas
            }
        })
        if (this.$route.query.apply) this.activeName = 'tab4'
    },
    computed: {
        // 监管评分粗评分总分
        totalChoices () {
            if (this.superviseList.length) {
                let sum = 0
                this.superviseList.forEach((i) => {
                    sum += (i.enterpriseEvaluateSuperviseScore - 0)
                })
                return sum
            }
        },
        // 监管评分总分
        totalFulls () {
            if (this.superviseList.length) {
                let sum = 0
                this.superviseList.forEach((i) => {
                    sum += (i.enterpriseEvaluateSuperviseInitScore - 0)
                })
                return sum
            }
        },
        totalChoice () {
            if (this.superviseList2.length) {
                let sum = 0
                this.superviseList2.forEach((i) => {
                    sum += i.enterpriseEvaluateSuperviseScore
                })
                return sum
            }
        },
        totalFull () {
            if (this.superviseList2.length) {
                let sum = 0
                this.superviseList2.forEach((i) => {
                    sum += i.enterpriseEvaluateSuperviseInitScore
                })
                return sum
            }
        }
        // starValue2 () {
        //     if (this.Fscore3 > 900) {
        //         return 'AAA'
        //     }
        // }
    },
    filters: {
        formatTimeS (val) {
            let str = new Date(val) - 0
            return filterTime('yyyy-mm-dd', str - 0)
        },
        itemTypeFilter (val, list) {
            // console.log(1)
            let label = ''
            list.forEach(i => {
                if (i.indexTermTypeId === val) {
                    label = i.indexTermTypeName
                }
            })
            return label
        },
        materialStatusFilter (val) {
            if (val === 0) {
                return '待审核'
            }
            if (val === 1) {
                return '审核通过'
            }
            if (val === -1) {
                return '审核拒绝'
            }
        },
        formatTime (val) {
            return filterTime('yyyy-mm-dd', val - 0)
        }
    },
    // 使用其它组件
    components: {
        BreadFoot,
        Sidebar,
        ToolBar,
        Modal
    },
    // 方法
    watch: {
        selfList (list) {
            let sum1 = 0
            let sum2 = 0
            let sum3 = 0
            list.forEach(i => {
                sum1 += i.enterpriseEvaluateSuperviseEnterpriseScore
                sum2 += i.enterpriseEvaluateSuperviseInitScore
                sum3 += i.enterpriseEvaluateSuperviseFinalScore
            })
            this.Fscore3 = sum3
            this.Fscore2 = sum2
            this.Fscore1 = sum1
        },
        Fscore3 (val) {
            let score1 = 0
            let scoreFull1 = 0
            let score2 = 0
            let scoreFull2 = 0
            this.selfList.forEach(e => {
                if (e.indexTermTypeId === '0') {
                    score1 += (e.enterpriseEvaluateSuperviseFinalScore - 0)
                    scoreFull1 += (e.enterpriseEvaluateSuperviseScore - 0)
                }
                if (e.indexTermTypeId === '1') {
                    score2 += (e.enterpriseEvaluateSuperviseFinalScore - 0)
                    scoreFull2 += (e.enterpriseEvaluateSuperviseScore - 0)
                }
            })
            // console.log(score1)
            // console.log(score2)
            // console.log(scoreFull2)
            // console.log(scoreFull1)
            let score = val - 0
            if (score >= 900) {
                this.starValue = 'AA'
                if (score1 / scoreFull1 < 0.8 || score2 / scoreFull2 < 0.8) {
                    this.starValue = 'A'
                }
            } else if (score >= 800) {
                this.starValue = 'A'
                if (score1 / scoreFull1 < 0.7 || score2 / scoreFull2 < 0.7) {
                    this.starValue = 'B'
                }
            } else if (score >= 700) {
                this.starValue = 'B'
                if (score1 / scoreFull1 < 0.6 || score2 / scoreFull2 < 0.6) {
                    this.starValue = 'C'
                }
            } else if (score >= 600) {
                this.starValue = 'C'
                if (score1 / scoreFull1 < 0.5 || score2 / scoreFull2 < 0.5) {
                    this.starValue = 'D'
                }
            } else {
                this.starValue = 'D'
            }
        }
    },
    methods: {
        // 修改综评分
        editFinalScore () {
            let flag = false
            this.selfList.forEach(i => {
                if (i.enterpriseEvaluateSuperviseFinalScore === '' || i.enterpriseEvaluateSuperviseFinalScore === null) {
                    this.$alert('请填写分值', '提示')
                    flag = true
                }
                if (i.enterpriseEvaluateSuperviseFinalScore > i.enterpriseEvaluateSuperviseScore) {
                    this.$alert('最终得分不能高于该项满分', '提示')
                    flag = true
                }
            })
            if (flag) return
            this.$post('/bus/enterprise/superviseEvaluate/updateInFinal', {
                enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId,
                datas: this.selfList
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '保存成功',
                        callback: () => {
                            this.refresh()
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        getSpanArr () {
            if (this.hasConcat) {
                return
            }
            this.hasConcat = true
            let contactDot = 0
            this.selfList.forEach((item, index) => {
                item.index = index
                if (index === 0) {
                    this.spanArr.push(1)
                } else {
                    if (item.indexTermTypeId === this.selfList[index - 1].indexTermTypeId) {
                        this.spanArr[contactDot] += 1
                        this.spanArr.push(0)
                    } else {
                        this.spanArr.push(1)
                        contactDot = index
                    }
                }
            })
        },
        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        getFinishInfo () {
            this.$post('bus/enterprise/evaluateCertificate/findByApplyId', {
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data) {
                        this.enterpriseEvaluateCertificateLevel = res.data.enterpriseEvaluateCertificateLevel
                        this.starValue = res.data.enterpriseEvaluateCertificateLevel
                        this.enterpriseEvaluateCertificateBak = res.data.enterpriseEvaluateCertificateBak
                        this.starBak = res.data.enterpriseEvaluateCertificateBak
                    }
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 重新请求
        refresh () {
            this.findLoginRegion()
            this.querySelf()
            // this.getSuperviseList()
            // this.getSuperviseData()
            this.getApplyList()
        },
        // 查询异议申诉列表
        getApplyList () {
            this.$post('bus/enterprise/selfevaluate/find?applayList', {
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.busEnterpriseEvaluateSuperviseList) {
                        let applyList = []
                        res.busEnterpriseEvaluateSuperviseList.forEach(item => {
                            if (item.enterpriseEvaluateSuperviseAppealStatus === 1) {
                                applyList.push(item)
                            }
                        })
                        this.applyList = setNum(applyList, 1, 99)
                    }
                    // this.hasSupervise = true
                } else {
                    this.$alert(res.message, '提示')
                }
                // console.log(this.hasSupervise)
            })
        },
        // 查询监管评分数据
        getSuperviseData () {
            this.$post('bus/enterprise/superviseEvaluate/find', {
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
                }
            }).then(res => {
                if (res.datas.length) {
                    this.superviseList2 = setNum(res.datas, 1, 99)
                    // this.getSpanArr2()
                    this.hasSupervise = true
                    // let sum = 0
                    // this.superviseList2.forEach(i => {
                    //     // console.log(i.enterpriseEvaluateSuperviseInitScore)
                    //     sum += i.enterpriseEvaluateSuperviseInitScore
                    // })
                    // this.Fscore2 = sum
                }
                console.log(this.hasSupervise)
            })
        },
        // 自评分保存
        slefSave () {
            if (this.enterpriseEvaluateSelfAdminScore - 0 > 100) {
                this.$alert('评分不能高于100分', '提示')
                return
            }
            if (this.enterpriseEvaluateSelfAdminScore - 0 < 0) {
                this.$alert('评分不能低于0分', '提示')
                return
            }
            this.$post('bus/enterprise/selfevaluate/saveEnterprise', {
                data: {
                    enterpriseEvaluateSelfId: this.selfObj.enterpriseEvaluateSelfId,
                    enterpriseEvaluateSelfAdminScore: this.enterpriseEvaluateSelfAdminScore - 0
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '保存成功',
                        callback: () => {
                            this.refresh()
                            // this.$router.go(-1)
                            this.$router.push('/process')
                            this.step = 2
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        // 监管分保存
        saveSupervise () {
            let flag = false
            this.selfList.forEach(i => {
                // i.enterpriseEvaluateApplyId = this.$route.query.enterpriseEvaluateApplyId
                if (i.enterpriseEvaluateSuperviseInitScore === '' || i.enterpriseEvaluateSuperviseInitScore === null) {
                    this.$alert('请填写分值', '提示')
                    flag = true
                }
                if (i.enterpriseEvaluateSuperviseInitScore > i.enterpriseEvaluateSuperviseScore) {
                    this.$alert('初评得分不能高于该项满分', '提示')
                    flag = true
                }
                // if (i.enterpriseEvaluateSuperviseFinalScore < 0 && i.indexTermTypeId - 0 !== 5) {
                //     this.$alert('初评得分不能小于0', '提示')
                //     flag = true
                // }
            })
            if (flag) return
            // return
            this.$post('bus/enterprise/superviseEvaluate/save', {
                // enterpriseEvaluateApplyId: this.$route.query.id,
                // data: { enterpriseEvaluateApplyId: this.$route.query.id },
                datas: this.selfList,
                enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    // this.getSuperviseData()
                    this.$toast({
                        msg: '评分完成',
                        callback: () => {
                            this.$router.push('/process')
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        // 计算监管评分分类项的初评合计
        getAllSubMarks (list) {
            let selfMarks = {}
            list.forEach(item => {
                if (!selfMarks[item.indexTermTypeId]) {
                    selfMarks[item.indexTermTypeId] = item.enterpriseEvaluateSuperviseInitScore - 0
                } else {
                    selfMarks[item.indexTermTypeId] += item.enterpriseEvaluateSuperviseInitScore - 0
                }
            })
            list.forEach(item => {
                for (let key in selfMarks) {
                    if (item.indexTermTypeId === key) {
                        item.selfMarks = selfMarks[key]
                    }
                }
            })
        },
        // 获取监管指标列表
        getSuperviseList () {
            this.$post('bas/indexTerm/supervise/find', {
                pageNum: 1,
                pageSize: 99
            }).then(res => {
                if (res.status === 200) {
                    // 计算监管评分分类项的满分
                    let fullMarks = {}
                    res.datas.forEach(item => {
                        if (!fullMarks[item.indexTermTypeId]) {
                            fullMarks[item.indexTermTypeId] = item.indexTermSuperviseScore - 0
                        } else {
                            fullMarks[item.indexTermTypeId] += item.indexTermSuperviseScore - 0
                        }
                    })
                    // 分类项的满分赋值
                    res.datas.forEach(i => {
                        for (let key in fullMarks) {
                            if (i.indexTermTypeId === key) {
                                i.fullMarks = fullMarks[key]
                            }
                        }
                        i.enterpriseEvaluateSuperviseInitScore = ''
                        i.enterpriseId = this.$route.query.id
                        i.enterpriseEvaluateSuperviseOrder = i.indexTermSuperviseOrder
                        i.indexTermTypeId = i.indexTermTypeId
                        i.enterpriseEvaluateSuperviseName = i.indexTermSuperviseName
                        i.enterpriseEvaluateSuperviseDesc = i.indexTermSuperviseDesc
                        i.enterpriseEvaluateSuperviseScore = i.indexTermSuperviseScore
                    })
                    // res.datas.sort((a, b) => {
                    //     console.log(a.indexTermTypeId - 0)
                    //     console.log(b.indexTermTypeId - 0)
                    //     return a.indexTermTypeId > b.indexTermTypeId
                    // })
                    this.superviseList = setNum(res.datas, 1, 99)
                    // this.superviseList.sort((a, b) => {
                    //     return a.indexTermSuperviseName > b.indexTermSuperviseName
                    // })
                    console.log(this.superviseList)
                    this.superviseListDemo = []
                    this.superviseList.forEach((i, id) => {
                        let flag = false
                        this.superviseListDemo.forEach((j, index) => {
                            if (j.indexTermTypeId === i.indexTermTypeId) {
                                this.superviseListDemo[index].children.push(i)
                                flag = true
                            }
                        })
                        if (!flag) {
                            this.superviseListDemo.push({
                                indexTermTypeId: i.indexTermTypeId,
                                children: [i]
                            })
                        }
                    })
                    // this.getSpanArr()
                    // console.log(this.superviseListDemo)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取企业自评数据
        querySelf () {
            this.$post('bus/enterprise/selfevaluate/find', {
                // enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId
                }
            }).then(res => {
                if (res.status === 200) {
                    if (!res.data) return
                    this.comObj = res.data
                    this.selfList = setNum(res.busEnterpriseEvaluateSuperviseList, 1, 99)
                    this.enterpriseEvaluateSelfAdminScore = res.data.enterpriseEvaluateSelfScore
                    res.data.enterpriseBussinessCategory === '01' && (res.data.enterpriseBusinessCategory = '一类维修经营业务')
                    res.data.enterpriseBussinessCategory === '02' && (res.data.enterpriseBusinessCategory = '二类维修经营业务')
                    res.data.enterpriseBussinessCategory === '03' && (res.data.enterpriseBusinessCategory = '三类维修经营业务')
                    this.getSpanArr()
                    let fullMarks = {}
                    let selfMarks = {}
                    this.selfList.forEach(item => {
                        if (!fullMarks[item.indexTermTypeId]) {
                            fullMarks[item.indexTermTypeId] = item.enterpriseEvaluateSuperviseScore - 0
                        } else {
                            fullMarks[item.indexTermTypeId] += item.enterpriseEvaluateSuperviseScore - 0
                        }
                        if (!selfMarks[item.indexTermTypeId]) {
                            selfMarks[item.indexTermTypeId] = item.enterpriseEvaluateSuperviseFinalScore - 0
                        } else {
                            selfMarks[item.indexTermTypeId] += item.enterpriseEvaluateSuperviseFinalScore - 0
                        }
                    })
                    this.selfList.forEach(i => {
                        for (let key in fullMarks) {
                            if (i.indexTermTypeId === key) {
                                i.fullMarks = fullMarks[key]
                            }
                        }
                        for (let key in selfMarks) {
                            if (i.indexTermTypeId === key) {
                                i.selfMarks = selfMarks[key]
                            }
                        }
                    })
                    // res.busEnterpriseEvaluateSelfMaterialList.busEnterpriseEvaluateSelfFileList.forEach(i => {
                    //     i.enterpriseName = res.busEnterpriseEvaluateSelfMaterialList
                    // })
                    // this.selfList = [1, 2, 3, 4, 6, 1, 1, 1, 6, 1, 1, 1, 6, 1, 1, 1, 6, 1, 1, 1]
                    let list = []
                    let list2 = []
                    if (res.busEnterpriseEvaluateSelfMaterialList) {
                        res.busEnterpriseEvaluateSelfMaterialList.forEach(i => {
                            i.busEnterpriseEvaluateSelfFileList.forEach(j => {
                                j.enterpriseName = i.enterpriseName
                                j.indexTermSuperviseName = i.indexTermSuperviseName
                                j.enterpriseEvaluateSelfMaterialExplain = i.enterpriseEvaluateSelfMaterialExplain
                                j.enterpriseEvaluateSelfMaterialDesc = i.enterpriseEvaluateSelfMaterialDesc
                                j.enterpriseEvaluateSelfMaterialUnit = i.enterpriseEvaluateSelfMaterialUnit
                                j.enterpriseEvaluateSelfMaterialYear = i.enterpriseEvaluateSelfMaterialYear
                                j.enterpriseEvaluateSelfMaterialStatus = i.enterpriseEvaluateSelfMaterialStatus
                                if (i.enterpriseEvaluateSelfMaterialStatus === 0) {
                                    list2.push(j)
                                }
                                list.push(j)
                            })
                        })
                        this.materialsList = setNum(list, 1, 99)
                        this.materialsList2 = setNum(res.busEnterpriseEvaluateSelfMaterialList, 1, 99)
                    }
                    // this.enterpriseEvaluateSelfAdminScore = res.data.enterpriseEvaluateSelfAdminScore
                    // this.Fscore1 = res.data.enterpriseEvaluateSelfAdminScore
                    if (!list2.length) {
                        this.Ffinish = '已完成'
                    }
                    this.selfObj = res.data
                    this.enterpriseEvaluateSelfId = res.data.enterpriseEvaluateSelfId
                }
            }).catch(err => {
                console.log(err)
            })
        },
        alertConfirm2 () {
            this.alertCanvas = false
        },
        alertCancel2 () {
            this.alertCanvas = false
        },
        handleSizeChange1 (val) {

        },
        handleCurrentChange1 (val) {

        },
        changeTabs () {
            console.log(1)
        },
        checkpdf () {
            this.pdfUrl = window.uploadURL + 'report/inspect/findEvaluateCertificate' + '?data.enterpriseEvaluateApplyId=' + this.$route.query.enterpriseEvaluateApplyId
            this.alertCanvas = true
        },
        // 生成诚信档案
        finish () {
            if (this.Ffinish === '未完成') {
                this.$alert('诚信材料未审核', '提示')
                return
            }
            if (this.applyList.length) {
                this.$alert('异议申诉未处理', '提示')
                return
            }
            if (this.enterpriseEvaluateCertificateLevel) {
                this.checkpdf()
                return
            }
            if (!this.starValue) {
                this.$alert('评级不能为空', '提示')
                return
            }
            this.$post('bus/enterprise/evaluateCertificate/save', {
                enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId,
                data: {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId,
                    enterpriseEvaluateCertificateCreditType: '信用评价',
                    enterpriseEvaluateCertificateLevel: this.starValue,
                    enterpriseEvaluateCertificateBak: this.starBak
                }
            }).then(res => {
                if (res.status === 200) {
                    // this.$get('external/report/inspect/findEvaluateCertificate?data.enterpriseEvaluateApplyId=' + this.$route.query.enterpriseEvaluateApplyId).then(res => {
                    //     console.log(res)
                    // })
                    this.pdfUrl = window.uploadURL + 'report/inspect/findEvaluateCertificate' + '?data.enterpriseEvaluateApplyId=' + this.$route.query.enterpriseEvaluateApplyId
                    this.alertCanvas = true
                    this.getFinishInfo()
                } else {
                    this.$alert(res.message, '提示')
                }
            })
        },
        // 地区过滤
        regionToText (id) {
            for (var i = 0; i < this.regionList.length; i++) {
                if (this.regionList[i].regionId === id) {
                    return this.regionList[i].regionName
                }
            }
        },
        // 获取详情数据
        queryData () {
            var obj = {
                data: {}
            }
            if (this.$route.query.enterpriseEvaluateApplyId) {
                obj.data.enterpriseEvaluateApplyId = this.$route.query.enterpriseEvaluateApplyId
            }
            if (this.$route.query.enterpriseId) {
                obj.data.enterpriseId = this.$route.query.enterpriseId
            }
            this.$post('bas/enterprise/evaluate/evaleentdetail', obj).then(res => {
                if (res.status === 200) {
                    res.data.enterpriseBusinessCategory === '01' && (res.data.enterpriseBusinessCategory = '一类维修企业')
                    res.data.enterpriseBusinessCategory === '02' && (res.data.enterpriseBusinessCategory = '二类维修企业')
                    res.data.enterpriseBusinessCategory === '03' && (res.data.enterpriseBusinessCategory = '三类维修企业')

                    res.data.enterpriseRegion = this.regionToText(res.data.enterpriseRegion)
                    this.economicsList.forEach(item => {
                        if (item.value === res.data.enterpriseEconomicCategory) {
                            res.data.enterpriseEconomicCategory = item.label
                        }
                    })
                    this.operateStateList.forEach(item => {
                        if (item.value === res.data.enterpriseOperatingState) {
                            res.data.enterpriseOperatingState = item.label
                        }
                    })
                    this.imgLoad('permitWrap', 'permitImg', res.data.enterpriseBusinessPermit)
                    this.imgLoad('picWrap', 'picImg', res.data.enterprisePicUrl)
                    this.imgLoad('licenseWrap', 'licenseImg', res.data.enterpriseBusinessLicense)
                    this.dataObj = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 图片加载后处理
        imgLoad (parent, child, url) {
            var radio = 200 / 240
            var _this = this
            var img = new Image()
            img.src = url
            img.onload = function () {
                if (this.width / this.height > radio) {
                    _this.$refs[child].style.width = '100%'
                } else {
                    _this.$refs[child].style.height = '100%'
                }
                _this[child] = url
            }
        },
        // 拒绝弹窗
        alertConfirm () {
            if (!this.refuseMsg) {
                this.$alert('拒绝理由不能为空！', '提示')
                return
            }
            this.$post('bus/enterprise/selfevaluate/saveMaterialStatus', {
                'data': {
                    enterpriseEvaluateSelfId: this.enterpriseEvaluateSelfId,
                    enterpriseEvaluateSelfMaterialStatus: -1,
                    enterpriseEvaluateSelfMaterialRejectBak: this.refuseMsg
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '审核完成',
                        callback: () => {
                            this.refresh()
                            this.alert = false
                            this.refuseMsg = ''
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        alertCancel () {
            this.alert = false
        },
        // 诚信材料审核
        adoptMaterial (val) {
            if (val === 1) {
                this.$myAlert({
                    msg: '确认通过？',
                    title: '提示'
                }).then(() => {
                    this.$post('bus/enterprise/selfevaluate/saveMaterialStatus', {
                        'data': {
                            enterpriseEvaluateSelfId: this.enterpriseEvaluateSelfId,
                            enterpriseEvaluateSelfMaterialStatus: 1
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            this.$toast({
                                msg: '审核完成',
                                callback: () => {
                                    this.refresh()
                                }
                            })
                            // this.refresh()
                        } else {
                            this.$alert(res.message, '提示')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                this.alert = true
            }
        },
        // 获取区域
        findLoginRegion () {
            this.$post('bas/city/findLoginRegion', {})
                .then(res => {
                    if (res.status === 200) {
                        this.regionList = res.datas
                        // this.queryData()
                    } else {
                        this.$alert(res.message, '提示')
                    }
                })
        },
        // 通过or拒绝 异议申诉
        adopt () {
            this.$myAlert({
                msg: '确认通过？',
                title: '提示'
            }).then(() => {
                this.$post('bus/enterprise/superviseEvaluate/update', {
                    enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId,
                    'data': {
                        enterpriseEvaluateSuperviseAppealStatus: 0,
                        enterpriseEvaluateSuperviseRejectDesc: ''
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast({
                            msg: '审核完成',
                            callback: () => {
                                // this.$router.push('/process')
                                this.refresh()
                            }
                        })
                    } else {
                        this.$alert(res.message, '提示')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
            })
        },
        // 异议申诉拒绝
        alertRefuseConfirm () {
            if (!this.refuseMsg) {
                this.$alert('拒绝理由不能为空！', '提示')
                return
            }
            this.$post('bus/enterprise/superviseEvaluate/update', {
                enterpriseEvaluateApplyId: this.$route.query.enterpriseEvaluateApplyId,
                'data': {
                    enterpriseEvaluateSuperviseAppealStatus: 2,
                    enterpriseEvaluateSuperviseRejectDesc: this.refuseMsg
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$toast({
                        msg: '审核完成',
                        callback: () => {
                            this.refresh()
                            this.alertRefuse = false
                            this.refuseMsg = ''
                        }
                    })
                } else {
                    this.$alert(res.message, '提示')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleClick () {},
        // 点击拒绝
        refuse () {
            this.alert = true
        }
    },
    // 生命周期函数
    beforeCreate () {}
}
</script>

<style lang="less" scoped>
.processDetail {
    .tableInfo {
        position: relative;
        top: 15px;
        // margin-top: 20px;
        h5 {
            font-size: 16px;
            color: #666666;
            margin-top: 5px;
        }
        span {
            font-size: 14px;
            color: #666666;
        }
        .span1, .span4{
            float: left;
            margin-left: 20px
        }
        .span2, .span3 {
            float: right;
            margin-right: 20px;
        }
    }
    .allScore {
        line-height: 40px;
        border: 1px solid #dddddd;
        border-top: none;
        .span1 {
            width:160px;
            line-height:40px;
            border-left:1px solid #ebeef5;
        }
        .span2 {
            width:120px;
            line-height:40px;
            border-left:1px solid #ebeef5;
        }
    }
    .tableDemo {
        margin-bottom: 20px;
        width: 100%;
        border-top: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
        .headerDemo {
            background: rgb(237, 240, 245);
            font-weight: bold;
            // color: #666666;
        }
        h6 {
            line-height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            color: #666666;
        }
        .col {
            font-size: 14px;
            color: #666666;
            width: 20%;
            height: 40px;
            line-height: 40px;
            display: inline-block;
            box-sizing: border-box;
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
        }
        .col1 {
            width: 10%;
        }
        .col2 {
            width: 10%;
        }
        .col3 {
            width: 60%;
        }
        .col4 {
            width: 10%;
        }
        .col5 {
            width: 10%;
        }
    }
    .aReset {
        text-decoration: none;
        color: #409EFF;
    }
    .content {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        top: 0;
        .toolBar {
            .w108 {
                width: 108px;
                padding: 0;
            }
        }
        .wrap {
            min-height: 700px;
            padding-bottom: 100px;
        }
    }
}
.tab2 {
    .info {
        text-align: right;
        color: #333333;
        font-size: 14px;
        background: #FFFDF6;
        // height: 100px;
        line-height: 34px;
        box-shadow:0px -4px 10px 0px rgba(118,108,72,0.2);
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        span {
            display: inline-block;
            text-align: left;
            width: 100px;
        }
        .info-ipt {
            text-align: left;
            display: inline-block;
            width: 100px;
        }
    }
}
.tab5 {
    padding-top: 30px;
    font-size: 14px;
    .line {
        text-align: left;
        line-height: 40px;
        margin-top: 10px;
        label {
            width: 200px;
            float: left;
            text-align: right;
        }
        .line-ipt {
            width: 345px;
        }
    }
    .red {
        color: red;
    }
}
.table_box {
    padding: 30px 20px;
    .thead {
        font-weight: bold;
        color: #666666;
    }
    table {
        width: 100%;
        border-top: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
        font-size: 14px;
        .thead {
            background: rgb(237, 240, 245);
        }
        td {
            line-height: 30px;
            padding: 5px;
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
        }
    }
    .table {
        border-collapse:collapse;
        width: 1200px;
        table-layout: fixed;
        word-wrap: break-word;
        tr {
            td {
                border: 1px solid #ddd;
                font-size: 14px;
                font-weight: normal;
                height: 40px;
            }
            .title {
                color: #666;
                text-align: right;
                width: 126px;
            }
            .msg {
                color: #333;
                text-align: left;
                width: 376px;
                padding-left: 10px;
            }
        }
        .info {
            .title {
                width: 190px;
            }
            .msg {
                width: 298px;
            }
        }
    }
}
.alert-content {
    padding: 30px 0;
    .name {
        float:left;
        width: 134px;
        text-align: right;
        .red {
            color: #ff0000;
        }
    }
    .textarea {
        float: left;
        width: 250px;
        height: 68px;
    }
    .btn {
        padding-left: 82px;
        .el-button{
            width: 98px;
            height: 34px;
            line-height: 34px;
            padding: 0;
            margin-right: 30px;
        }
    }
}
.bm-view {
    width: 186px;
    height: 226px;
}
</style>
<style lang="less">
.processDetail {
    background: #FFF;
    .el-tabs--card>.el-tabs__header {
        background: #EDF0F5;
        border: none;
        .el-tabs__nav {
            border: none;
        }
        .el-tabs__item {
            box-sizing: border-box;
            border: none;
            border-radius:3px 3px 0px 0px;
            background: #FFF;
            margin-right: 10px;
            border-top: 3px solid #FFF;
            &.is-active {
                color: #1890FF;
                border-top: 3px solid #3E94FE;
            }
        }
    }
    .info-iptA {
        .el-input__inner {
            text-align: center;
            height: 34px!important;
            line-height: 34px!important;
        }
    }
    .el-table td, .el-table th {
        text-align: center;
    }
    .table_box {
        .el-input__inner {
            text-align: center;
            height: 34px!important;
            width: 128px;
            line-height: 34px!important;
        }
    }
    .hideborder {
        .el-input__inner {
            border: none!important;
            background: none;
        }
    }
    .el-tabs--border-card{
        border: none;
        box-shadow: none;
        width: 100%;
    }
    .el-tabs__header{
        background-color: #fff;
        margin: 0px;
    }
    .car-info .el-input {
        width: 345px;
    }
    .car-info .el-input__inner {
        height: 34px;
    }
    .el-table .blue {
        background: #F0F5F8;
    }
    .audit-btn .el-textarea {
        width: 500px;
    }
    .audit-btn .el-textarea__inner {
        width: 500px;
        height: 78px;
        resize: none;
    }
    .el-tabs--card >.el-tabs__header .el-tabs__nav {
        border: none;
        border-radius: 0;
    }
    .el-tabs__item {
        height:44px;
        line-height: 44px;
        padding: 0 30px;
    }
    .el-textarea__inner {
        resize: none;
        height: 68px;
    }
    .el-table .cell {
        padding: 8px;
    }
}
</style>
