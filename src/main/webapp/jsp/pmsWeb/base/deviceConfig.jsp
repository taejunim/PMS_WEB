<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/deviceConfig.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>
        <script>
            var essType = "${loginUser.essType}";
            var essCode = "${loginUser.essCode}";
            var userCd = "${loginUser.userCd}";

        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <!--검색 조건-->
            <ax:form name="searchView" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='장비 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategoryFilter" clazz="form-control W150" id="deviceCategoryFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='장비 하위 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySubFilter" clazz="form-control W150" id="deviceCategorySubFilter" defaultLabel="전체"/>
                        </ax:td>
                        <!--장비 구분-->
                        <ax:td label="ax.admin.essCommandManagement.deviceNm" width="300px">
                            <select id="deviceCodeFilter" name="deviceCodeFilter" dataPath="deviceCodeFilter" title="장비" class="av-required form-control W150" disabled></select>
                        </ax:td>
                        <!--설정 구분-->
                        <ax:td label="ax.admin.deviceConfig.configCodeName" width="300px">
                            <ax:common-code groupCd="CONFIG_TYPE" dataPath="configTypeFilter" clazz="form-control W150" id="configTypeFilter" defaultLabel="전체"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="65%" style="padding-right: 10px;" childId="split-panel-grid-view-01">

                <!-- 환경 설정 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <!--목록 제목-->
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.deviceConfig.gridTitle"/></h2>
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
                    <h2><i class="cqc-news"></i><ax:lang id="ax.admin.deviceConfig.formTitle"/></h2>
                </div>
                <div class="right">
                    <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                        <i class="cqc-erase"></i>
                        <ax:lang id="ax.admin.clear"/>
                    </button>
                </div>
            </div>

            <ax:form name="formView01">
                <ax:tbl clazz="ax-form-tbl">
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceConfig.configNo" width="350px">
                            <input type="text" id="configCode" name="configCode" data-ax-path="configCode" title="설정 코드" class="av-required form-control W150" value="" readonly/>
                        </ax:td>
                        <ax:td label="ax.admin.deviceConfig.configName" width="350px">
                            <input type="text" id="configName" name="configName" data-ax-path="configName" title="설정 명" class="av-required form-control W150" value="" maxlength="100"/>
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceManagement.deviceCategory" width="350px" labelWidth="120px">
                            <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategory" clazz="form-control W150" id="deviceCategory" defaultLabel="선택"/>
                        </ax:td>
                        <ax:td label="ax.admin.deviceManagement.deviceCategorySub" width="350px" labelWidth="120px">
                            <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySub" clazz="form-control W150" id="deviceCategorySub" defaultLabel="선택"/>
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceConfig.deviceName" width="350px">
                            <select id="deviceCode" name="deviceCode" dataPath="deviceCode" title="장비" class="av-required form-control W150" disabled></select>
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceConfig.configTypeCode" width="350px">
                            <ax:common-code id="configType" groupCd="CONFIG_TYPE" dataPath="configType" defaultLabel="선택" clazz="form-control W150"/>
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceConfig.minSetValue" width="350px">
                            <input type="text" id="minSetValue" name="minSetValue" data-ax-path="minSetValue" title="최소 설정값" class="av-required form-control W150" value="" maxlength="8" onkeyup="this.value = onKeyNumberCheck(this.value,this.id);"/>
                        </ax:td>
                        <ax:td label="ax.admin.deviceConfig.maxSetValue" width="350px">
                            <input type="text" id="maxSetValue" name="maxSetValue" data-ax-path="maxSetValue" title="최대 설정값" class="av-required form-control W150" value="" maxlength="7" onkeyup="this.value =  onKeyNumberCheck(this.value,this.id);"/>
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="120px">
                        <ax:td label="ax.admin.deviceConfig.configDescription" style="height : 100px;">
                            <textarea id="configDescription" name="configDescription" data-ax-path="configDescription"
                                      class="av-required form-control W500" style="height : 98%"
                                      width="100%" maxlength="1000"></textarea>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>