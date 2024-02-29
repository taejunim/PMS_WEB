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
    <jsp:attribute name="css">
        <style>
            .noDataMessage {
                border: 1px #444 solid;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                width: 300px;
                text-align: center;
                height: 30px;
                line-height: 30px;
                border-radius: 10px;
                display: none;
            }
        </style>
    </jsp:attribute>
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/history/dcConverterHistory.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <!--검색 조건-->
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.dcConverterHistory.datePick' width="600px">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="input-group" data-ax5picker="basic">
                                        <input type="text" name="searchDateFilter" id="searchDateFilter"
                                               class="form-control" placeholder="yyyy/mm/dd" style="width: 120px;" readonly>
                                        <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                        <ax:td label='운전 상태' width="300px">
                            <ax:common-code id="deviceStatusFilter" name="deviceStatusFilter" groupCd="DEVICE_STATUS" dataPath="DEVICE_STATUS" clazz="filter form-control W150" defaultLabel="전체"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="65%" style="padding-right: 10px;" childId="split-panel-grid-view-01">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.dcConverterHistory.gridTitle"/>
                        </h2>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>
            <ax:split-panel width="*" style="padding-left: 15px; max-width:647px; min-width: 647px;"  overflow="auto">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.dcConverterHistory.formTitle1"/> </h2>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" style="width:617px;">
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >인버터</div>
                            </div>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >L-Inverter</div>
                            </div>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >R-Inverter</div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >모드 상태</div>
                            </div>
                            <div data-ax-td="" class="l-inverter" style="width:205px;">
                                <div data-ax-td-wrap="" class="modeStatusName" data-ax-path="modeStatusName" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="modeStatusName" data-ax-path="modeStatusName" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >인버터 상태</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="inverterStatusName" data-ax-path="inverterStatusName" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="inverterStatusName" data-ax-path="inverterStatusName" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >전력 (kw)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="power" data-ax-path="power" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="power" data-ax-path="power" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >전류 (A)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="current" data-ax-path="current" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="current" data-ax-path="current" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >전압 (V)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="voltage" data-ax-path="voltage" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="voltage" data-ax-path="voltage" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >직류 전력 (kw)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="dcPower" data-ax-path="dcPower" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="dcPower" data-ax-path="dcPower" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >직류 전류 (A)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="dcCurrent" data-ax-path="dcCurrent" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="dcCurrent" data-ax-path="dcCurrent" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >유효 전류 (%, 정격 대비)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="activeCurrentContrast" data-ax-path="activeCurrentContrast" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="activeCurrentContrast" data-ax-path="activeCurrentContrast" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >지령 유효 전류 (%, 백분율)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="refActiveCurrentPercentage" data-ax-path="refActiveCurrentPercentage" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="refActiveCurrentPercentage" data-ax-path="refActiveCurrentPercentage" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >인버터 스택 온도 (℃)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="stackTemp" data-ax-path="stackTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="stackTemp" data-ax-path="stackTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >필터 인덕터 온도 (℃)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="inductorTemp" data-ax-path="inductorTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="inductorTemp" data-ax-path="inductorTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >필터 커패시터 온도 (℃)</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="capacitorTemp" data-ax-path="capacitorTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="capacitorTemp" data-ax-path="capacitorTemp" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:205px;">
                                <div data-ax-td-label="" >오류 발생</div>
                            </div>
                            <div data-ax-td="" class="l-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="errorFlag" data-ax-path="errorFlag" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                            <div data-ax-td="" class="r-inverter"  style="width:205px;">
                                <div data-ax-td-wrap="" class="errorFlag" data-ax-path="errorFlag" style="color: #BADC2D;text-align: center;vertical-align:middle"></div>
                            </div>
                        </ax:tr>
                        

                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>