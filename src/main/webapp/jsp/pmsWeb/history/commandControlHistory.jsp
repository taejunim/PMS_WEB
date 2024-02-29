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
<ax:set key="system-auth-user-version" value="1.0.0"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/commandControlHistory.js' />"></script>
         <script>
            $(function() {
                $(document).ready(function () {
                    //장비 제어 가능한 목록 표출
                    selectDeviceCode();
                });
            });
         </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <!-- 검색바 -->
        <div role="page-header">
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="600px">
                    <ax:tr>
                        <ax:td label="ax.admin.deviceManagement.deviceCodeFilter" width="300px">
                            <select id="deviceCodeFilter" name="deviceCodeFilter" dataPath="deviceCodeFilter" title="장비 코드" class="av-required form-control W150" ></select>
                        </ax:td>
                        <ax:td label="ax.admin.commandControlHistory.selectPeriod" width="338px">
                            <div class="input-group" data-ax5picker="grid1">
                                <input type="text" name="startDate" id="startDateFilter"
                                       class="form-control" placeholder="yyyy/mm/dd" style="width: 90px;" readonly>
                                <span class="input-group-addon">~</span>
                                <input type="text" name="endDate" id="endDateFilter"
                                       class="form-control" placeholder="yyyy/mm/dd" style="width: 90px;" readonly>
                                <span class="input-group-addon"><span
                                        class="fa fa-calendar-o"></span></span>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="60%" style="padding-right: 10px;" childId="split-panel-grid-view-01">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.commandControlHistory.gridTitle"/>
                        </h2>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>