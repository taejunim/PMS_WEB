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
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/chargeMgnt/chargePlanPeriodMgnt.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--pms 명-->
                        <ax:td label="ax.admin.pmsManagement.nameFilter" width="300px">
                            <ax:pmsWeb-code tableName="PMS_BASE_MASTER a, PMS_BASE_ESS b" code="a.PMS_CODE" codeNm="PMS_NAME" title="PMS_CODE 코드"
                                            id="pmsCodeFilter" dataPath="pmsCode" name="pmsCodeFilter" equals="{\"USE_YN\":\"Y\",\"DEL_YN\":\"N\"}" equals2="a.PMS_CODE = b.PMS_CODE"
                                            clazz="form-control W150" />
                        </ax:td>
                        <!--기간 선택-->
                        <ax:td label='ax.admin.sample.form.period' width="600px">
                            <!--월별 선택-->
                            <div class="col-md-4">
                                <div class="input-group" data-ax5picker="monthPicker">
                                    <input type="text" id="month" name="month" class="form-control" data-picker-date="month" placeholder="yyyy-mm" readonly>
                                    <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                </div>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="30%" style="padding-right: 10px;">
                <!-- 그리드1_기간별 충방전 계획 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.chargePlanPeriodMgnt.gridTitle1"/> </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <!-- splitter -->
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" id="split-panel-form" scroll="true">
                <!-- 그리드2_충방전 계획 상세 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-02">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.chargePlanPeriodMgnt.gridTitle2"/> </h2>
                    </div>
                    <div class="right">
                        <!--그리드2 버튼-->
                        <!--추가-->
                        <button type="button" class="btn btn-default" data-grid-view-02-btn="add">
                            <i class="cqc-add-to-list"></i>
                            <ax:lang id="ax.admin.add"/>
                        </button>
                        <!--저장-->
                        <button type="button" class="btn btn-default" data-grid-view-02-btn="save">
                            <i class="cqc-save"></i>
                            <ax:lang id="ax.admin.save"/>
                        </button>
                        <!--삭제-->
                        <button type="button" class="btn btn-default" data-grid-view-02-btn="delete">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.delete"/>
                        </button>
                    </div>
                </div>
                <!--그리드2-->
                <div data-ax5grid="grid-view-02" data-fit-height-content="grid-view-02" style="height: 300px;"></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>