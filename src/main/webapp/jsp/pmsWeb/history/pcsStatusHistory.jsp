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
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/pcsStatusHistory.js' />"></script>
        <script type="text/javascript">
            //전체, 미준비, 연결 해제, 정지, 운전
            $("#operationStatus option").not("[value=''],[value='07'],[value='09'],[value='11'],[value='12']").hide();
        </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <!--검색 조건-->
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.pcsStatusHistory.datePick' width="300px">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text" name="searchDateFilter" id="pcsSearchDate"
                                               class="form-control" placeholder="yyyy/mm/dd" style="width: 120px;" readonly>
                                        <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                        <ax:td label='운전 상태' width="300px">
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

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="" childId="split-panel-grid-view-01">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.pcsStatusHistory.gridTitle"/> </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>