<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>
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
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript"
                src="<c:url value='/assets/js/view/pmsWeb/history/batteryRackStatusHistory.js' />"></script>
           <script type="text/javascript">
               //전체, 초기화, 준비, 연결해제. 결함
               $("#operationStatus option").not("[value=''],[value='06'],[value='08'],[value='09'],[value='99']").hide();
           </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--Rack 선택-->
                        <ax:td label="ax.admin.rackNo.select" width="300px">
                            <ax:pmsWeb-code tableName="BASE_DEVICE" code="DEVICE_CODE" codeNm="DEVICE_NAME" title="RACK_NO 코드"
                                            id="rackNoFilter" dataPath="rackNoFilter" name="rackNoFilter"  equals="{\"DEVICE_CATEGORY_SUB\":\"0101\",\"USE_FLAG\":\"Y\"}"
                                            clazz="form-control W150"/>
                        </ax:td>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.batteryRackStatusHistory.datePick' width="300px">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text" name=searchDate" id="searchDate" class="form-control"
                                               placeholder="yyyy/mm/dd" readonly>
                                        <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                        <ax:td label='운영 상태' width="300px">
                            <ax:common-code id="operationStatus" name="operationStatus"
                                            groupCd="DEVICE_STATUS"
                                            dataPath="DEVICE_STATUS" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                        <!--충방전 구분-->
                        <ax:td label='운전 모드' width="300px">
                            <ax:common-code id="operationModeStatus" name="operationModeStatus"
                                            groupCd="OPERATION_MODE"
                                            dataPath="OPERATION_MODE" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>
        <ax:split-layout name="ax1" orientation="horizontal" style="margin-top: -30px; max-height : 370px">
            <ax:split-panel height="48%" style="" childId="split-panel-grid-view-01">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left" style="padding-bottom: 0px;">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.batteryRackStatusHistory.gridTitle"/></h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
            </ax:split-panel>
        </ax:split-layout>
        <ax:split-layout name="ax1" orientation="horizontal" style="margin-top: 20px; height : 800px; margin-bottom: 10px;">
            <ax:split-panel height="*" style="" scroll="scroll" childId="split-panel-grid-view-02">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-02">
                    <div class="left" style="padding-bottom: 0px;">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.batteryRackStatusHistory.moduleGridTitle"/></h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-02" data-fit-height-content="grid-view-02"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>