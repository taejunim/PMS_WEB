<%@ page import="metis.app.pmsWeb.utils.SessionUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5calendar.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5picker.css">
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5core.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5calendar.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5formatter.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5picker.min.js"></script>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
           <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <script type="text/javascript"
                src="<c:url value='/assets/js/view/pmsWeb/chargeMgnt/chargeDischargeContractMgnt.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--충방전 구분-->
                        <ax:td label='ax.admin.chargeDischargeContractMgnt.chargeGbn' width="300px">
                            <ax:common-code id="chargeGbn" name="chargeGbn"
                                            groupCd="CHARGE_GBN"
                                            dataPath="CHARGE_GBN" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.commandControlHistory.selectPeriod' width="600px">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text" name="startDateFilter" id="startDateFilter"
                                               class="form-control" placeholder="yyyy/mm/dd" readonly>
                                        <span class="input-group-addon">~</span>
                                        <input type="text" name="endDateFilter" id="endDateFilter" class="form-control"
                                               placeholder="yyyy/mm/dd" readonly>
                                        <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="60%" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i> <ax:lang id="ax.admin.chargeDischargeContractMgnt.gridTitle1"/>
                        </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <!-- Start Product Information -->
            <ax:split-panel width="*" style="padding-left: 10px; min-width: 550px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i><ax:lang id="ax.admin.chargeDischargeContractMgnt.gridTitle2"/></h2>
                    </div>
                    <!--신규-->
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                    </div>
                </div>

                <ax:form name="formView01">
                    <input type="hidden" name="act_tp" id="act_tp" value=""/>
                    <ax:tbl clazz="ax-form-tbl">
                        <ax:tr labelWidth="120px">
                            <!--충방전 대상-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.chargeDischargeTarget" width="350px">

                                <ax:pmsWeb-code tableName="PMS_BASE_CHARGE_TARGET_INFO" code="CHARGE_TARGET_SEQ"
                                                codeNm="TARGET_NAME"
                                                title="TARGET_NAME" orderBy="{\"CHARGE_TARGET_SEQ\":\"desc\"}"
                                                equals="{\"USE_YN\":\"Y\"}" defaultLabel="선택"
                                                id="chargeTargetSeq" dataPath="chargeTargetSeq" name="chargeTargetSeq"
                                                clazz="form-control W150"/>
                            </ax:td>
                            <ax:td label="충방전 대상 생성" width="0px">

                                <button type="button" class="btn btn-warning W130"
                                        data-page-btn="new-target">
                                    <ax:lang id="ax.admin.chargeDischargeContractMgnt.new"/>
                                </button>

                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">

                            <!--충방전 구분-->
                            <ax:td label='ax.admin.chargeDischargeContractMgnt.chargeGbn' width="300px">
                                <ax:common-code id="chargeGbn" name="chargeGbn" groupCd="CHARGE_GBN"
                                                dataPath="chargeGbn"
                                                clazz="form-control W150"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--충방전량 구분-->
                            <ax:td label="충방전량 구분" width="350px">

                                <ax:common-code id="chargeOption" name="chargeOption" groupCd="CHARGE_OPTION"
                                                dataPath="chargeOption"
                                                clazz="form-control W150" defaultLabel="해당없음"/>
                            </ax:td>
                            <!--충방전량-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.chargeDischargeAmount" width="350px">
                                <input type="text" id="chargeAmountKw" name="chargeAmountKw" data-ax-path="chargeAmountKw"
                                       data-ax5formatter="number"
                                       onkeyup="return checkKwMaxNum(event)"
                                       class="av-required form-control W150" value="" disabled="true"/>
                                <input type="text" id="chargeAmountPercent" name="chargeAmountPercent" data-ax-path="chargeAmountPercent"
                                       data-ax5formatter="number"
                                       onkeyup="return checkPercentMaxNum(event)"
                                       class="av-required form-control W150" value="" disabled="true"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--시작 일자-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.startDate" width="350px">
                                <input type="datetime-local" id="contractStartDatetime" name="contractStartDatetime"
                                       data-ax-path="contractStartDatetime"
                                       class="av-required form-control W250"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--예상 종료 일자-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.expectEndDate" width="350px">
                                <input type="datetime-local" id="contractEndDatetime" name="contractEndDatetime"
                                       data-ax-path="contractEndDatetime"
                                       class="av-required form-control W250"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--주소-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.address" style="height : 100px;">
                                <textarea id="targetAddress" name="targetAddress" data-ax-path="targetAddress"
                                          class="av-required form-control W500" style="height: 99%;"
                                          width="95%"></textarea>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--계약 사유-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.contractReason" width="350px">

                                <ax:common-code id="contractReasonCode" groupCd="CONTRACT_REASON_CODE"
                                                dataPath="contractReasonCode"
                                                clazz="form-control W150"/>
                            </ax:td>
                            <!--이행 여부-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.fulfillmentYn" width="350px">
                                <ax:common-code id="contractCompleteYn" name="contractCompleteYn"
                                                groupCd="CONTRACT_COMPLETE_YN" dataPath="contractCompleteYn"
                                                clazz="form-control W150"/>
                                <input type="text" id="completeDefault" name="completeDefault" disabled="true"
                                       value="미이행"
                                       class="av-required form-control W140"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--비고-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.remark" style="height : 100px;">
                                <textarea id="remark" name="remark" data-ax-path="remark"
                                          class="av-required form-control W500" style="height: 99%;"
                                          width="95%"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>