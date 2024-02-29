<%--
  Created by IntelliJ IDEA.
  User: Hong
  Date: 2021-09-03
  Time: 오후 3:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5calendar.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5picker.css">
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5core.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5calendar.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5formatter.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5picker.min.js"></script>
<script type="text/javascript" src="<c:url value='/assets/js/view/common/dateUtils.js' />"></script>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/deviceDefectHistory.js' />"></script>
                 <script>
                     $(function () {
                         $(document).on('change', "#pmsCode", function(){
                             getDeviceInfo($("#pmsCode").val());
                         });
                     });
                 </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label="ax.admin.common.deviceGbn" width="300px">
                            <ax:common-code id="deviceGbnFilter" name="deviceGbnFilter" groupCd="DEVICE_GBN_CODE" dataPath="deviceGbnCode" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='ax.admin.common.betweenDate' width="600px">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text"  name="startDateFilter" id="startDateFilter" class="form-control" placeholder="yyyy/mm/dd" readonly>
                                        <span class="input-group-addon">~</span>
                                        <input type="text" name="endDateFilter" id="endDateFilter" class="form-control" placeholder="yyyy/mm/dd" readonly>
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
            <ax:split-panel width="60%" style="padding-right: 10px;" childId="split-panel-grid-view-01">
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i><ax:lang id="ax.admin.deviceDefectHistory.gridTitle"/></h2>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <ax:split-panel width="*" style="padding-left: 10px; min-width: 550px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i><ax:lang id="ax.admin.pmsManagement.formTitle"/></h2>
                    </div>
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
                            <ax:td label="ax.admin.pmsManagement.name" width="300px">
                                <ax:pmsWeb-code tableName="PMS_BASE_MASTER" code="PMS_CODE" codeNm="PMS_NAME" title="PMS_CODE 코드"
                                                id="pmsCode" dataPath="pmsCode" name="pmsCode" clazz="form-control W150" equals="{\"USE_YN\":\"Y\",\"DEL_YN\":\"N\"}"/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.deviceName" width="300px">
                                <ax:select_defaultLabel id="deviceCode" dataPath="deviceCode" clazz="form-control W150" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceDefectHistory.deviceDefectDate" width="300px">
                                <input type="text" id="deviceDefectDate" name="deviceDefectDate" data-ax-path="deviceDefectDate" title="고장 확인 일자" class="av-required form-control W150" readonly="readonly" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceDefectHistory.defectReason" style="height : 100px;">
                                <textarea id="defectReason" name="defectReason" data-ax-path="defectReason" title="고장 원인" class="av-required form-control W500" style="height: 99%;" width="95%"></textarea>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceDefectHistory.repairCompleteYn" width="300px">
                                <input type="text" id="repairCompleteYn" name="repairCompleteYn" data-ax-path="repairCompleteYn" title="수리 완료 여부" class="av-required form-control W150" readonly="readonly" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceDefectHistory.repairContent" style="height : 100px;">
                                <textarea id="repairContent" name="repairContent" data-ax-path="repairContent" title="수리 내용" class="av-required form-control W500" style="height: 99%;" width="95%" readonly="readonly"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>