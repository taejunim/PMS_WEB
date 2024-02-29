<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <style>
            .c3-legend-item > text, tspan {
                fill: white;
            }
            g .tick > line {
                stroke: white!important;
            }
            .c3 path {
                stroke: white!important;
            }
        </style>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <!-- c3 setting -->
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/chart.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/statistics/chargeDischargeYearlyStatistic.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel height="7%" style="min-height:42px;">
                <ax:split-layout name="ax1" orientation="vertical">
                        <ax:form name="searchView0">
                            <ax:tbl clazz="ax-form-tbl">
                                <ax:tr>
                                    <ax:td label="ax.admin.chargeDischargeStatistic.searchYear" width="210px">
                                        <div class="input-group" data-ax5picker="grid1">
                                            <input type="text" name="searchDateFilter" id="searchDateFilter"
                                                   class="form-control" placeholder="yyyy/mm/dd" style="width: 120px;" readonly>
                                            <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                        </div>
                                    </ax:td>
                                </ax:tr>
                            </ax:tbl>
                        </ax:form>
                </ax:split-layout>
            </ax:split-panel>
            <ax:split-panel height="50%" style="">
                <div id="chart1"></div>
            </ax:split-panel>
            <ax:split-panel height="*" style="">
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>