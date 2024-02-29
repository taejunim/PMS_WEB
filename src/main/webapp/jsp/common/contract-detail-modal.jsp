<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/commonMobile.css'/>"/>

<%
    RequestUtils requestUtils = RequestUtils.of(request);
    request.setAttribute("webSocketState", requestUtils.getString("webSocketState"));
    request.setAttribute("essCode", requestUtils.getString("essCode"));
    request.setAttribute("chargeTargetSeq", requestUtils.getString("chargeTargetSeq"));
    request.setAttribute("contractStartDatetimeId", requestUtils.getString("contractStartDatetimeId"));
%>

<ax:set key="page_auto_height" value="true"/>
<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script>
            var pageType = "modal";

            let webSocketState = '${webSocketState}';
            let essCode = '${essCode}';
            let chargeTargetSeq = '${chargeTargetSeq}';
            let contractStartDatetimeId = '${contractStartDatetimeId}';
        </script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/monitoring/mobileChargeContractInfoControl.js' />"></script>
    </jsp:attribute>
    <jsp:body>
        <div style="height: 100%">
            <div class="fixedTop">
                <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-news"></i>&nbsp<ax:lang id="ax.admin.chargeDischargeContractMgnt.modal.formTitle"/></h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-modal-header-btn="modal-close">
                            <i class="icon-closed"></i>
                            <ax:lang id="ax.admin.sample.modal.button.close"/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="fixedMiddle">
                <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                    <div data-ax-tr="" class="" style="">
                        <div data-ax-td="" class="wd100">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">대상</span>
                                        <span class="chargeContractDetail" id="targetName">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">구분</span>
                                        <span class="chargeContractDetail" id="chargeGbnName">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">계약 사유</span>
                                        <span class="chargeContractDetail" id="contractReasonName">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">충방전 옵션</span>
                                        <span class="chargeContractDetail" id="chargeOption">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">충/방전량</span>
                                        <span class="chargeContractDetail" id="chargeAmount">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">시작 일시</span>
                                        <span class="chargeContractDetail" id="contractStartDatetime">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">종료 일시</span>
                                        <span class="chargeContractDetail" id="contractEndDatetime">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">담당자</span>
                                        <span class="chargeContractDetail" id="targetManagerName">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">담당자 연락처</span>
                                        <span class="chargeContractDetail" id="targetManagerTel">-</span>
                                    </div>
                                </div>
                                <div class="ax-button-group">
                                    <div class="left">
                                        <span class="chargeContractDetail" style="width:25%; margin-right: 20px;">주소</span>
                                        <span class="chargeContractDetail" id="targetAddress">-</span>
                                    </div>
                                </div>
                                <input type="hidden" id="contractCompleteYn">
                                <input type="hidden" id="controlValue">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixedBottom" id="buttonLayout" style="display: none;">
                <button type="button" class="contractDetailButton" id="chargeButton" style="background-color: #3498DB;" onclick="chargeButton()">충전</button>
                <button type="button" class="contractDetailButton" id="dischargeButton" style="background-color: #3498DB; display: none;" onclick="dischargeButton()">방전</button>
                <button type="button" class="contractDetailButton" id="emergencyStopButton" style="background-color: #CCCCCC;" onclick="emergencyStopButton()">긴급정지</button>
            </div>
            <div class="fixedBottom" id="messageLayout" style="display: none; background-color: #E74C3C;">
                <span class="centerText" id="messageText">장비 고장 발생</span>
            </div>
        </div>
    </jsp:body>
</ax:layout>