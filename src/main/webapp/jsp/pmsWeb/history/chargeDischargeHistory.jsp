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
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/chargeDischargeHistory.js' />"></script>
        <script type="text/javascript">
          //대기 숨김
          $("#operationMode option[value='0'], #operationMode option[value='3']").hide();
        </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <!--검색 조건-->
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--충방전 구분-->
                        <ax:td label='운전 모드' width="300px">
                            <ax:common-code id="operationMode" name="operationMode"
                                            groupCd="OPERATION_MODE"
                                            dataPath="OPERATION_MODE" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                        <!--날짜 선택-->
                        <ax:td label='기간 선택' width="360px">
                            <!--일별 선택-->
                            <div class="col-md-6" id="day">
                                <div class="input-group" data-ax5picker="day">
                                    <input type="text" data-picker-date="date"
                                           name="startDay" id="startDay"
                                           class="form-control" placeholder="yyyy/mm/dd"
                                           style="width: 90px;" readonly>
                                    <span class="input-group-addon">~</span>
                                    <input type="text" name="endDay"
                                           id="endDay"
                                           class="form-control" placeholder="yyyy/mm/dd"
                                           style="width: 90px;" readonly>
                                    <span class="input-group-addon"><span
                                            class="fa fa-calendar-o"></span></span>
                                </div>
                            </div>
                        </ax:td>
                        <ax:td label='운영 구분' width="360px">
                            <ax:common-code id="operationType" name="operationType"
                                            groupCd="CONTROL_REQUEST_TYPE"
                                            dataPath="CONTROL_REQUEST_TYPE" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="65%" style="padding-right:10px;" childId="split-panel-grid-view-01">

                <!-- 충방전 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            ESS 충·방전 목록 </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <ax:split-panel width="*" style="padding-left:10px;" childId="split-panel-grid-view-02">
                <!-- 충방전 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-02">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            누적 전력량 상세 목록 </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-02" data-fit-height-content="grid-view-02" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>