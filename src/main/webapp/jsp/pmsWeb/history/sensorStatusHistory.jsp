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
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/sensorStatusHistory.js' />"></script>
         <script>
             var essType = "${loginUser.essType}";
         </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.sensorStatusHistory.datePick' width="300px">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text" name="searchDateFilter" id="searchDateFilter"
                                               class="form-control" placeholder="yyyy/mm/dd" style="width: 120px;" readonly>
                                        <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                        <!--센서 구분-->
                        <ax:td label='ax.admin.sensorStatusHistory.deviceCategorySub' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySubFilter" clazz="form-control W150" id="deviceCategorySubFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='ax.admin.sensorStatusHistory.deviceCode' width="300px">
                            <select id="deviceCodeFilter" name="deviceCodeFilter" dataPath="deviceCodeFilter" title="장비 코드" class="av-required form-control W150" ></select>
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
                        <h2>
                            <i class="cqc-list"></i>센서 상태 목록
                        </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>