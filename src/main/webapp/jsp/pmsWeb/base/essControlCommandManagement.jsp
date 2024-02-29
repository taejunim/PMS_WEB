<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/essControlCommandManagement.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>
        <script>
            var essCode = "${loginUser.essCode}";
            var essType = "${loginUser.essType}";
            var userCd = "${loginUser.userCd}";
        </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label="ax.admin.essCommandManagement.device" width="300px">
                            <select id="deviceCodeFilter" name="deviceCodeFilter" dataPath="deviceCodeFilter" title="장비 코드" class="av-required form-control W150" ></select>
                        </ax:td>
                        <ax:td label="ax.admin.essCommandManagement.controlType" width="300px">
                            <select id="controlTypeFilter" name="controlTypeFilter" dataPath="controlTypeFilter" title="제어 구분" class="av-required form-control W150" ></select>
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
                        <h2><i class="cqc-list"></i> 장비 제어 목록 </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <!-- Start Product Information -->
            <ax:split-panel width="*" style="padding-left: 10px; min-width: 550px;" scroll="scroll">
            <div class="ax-button-group" role="panel-header">
                <div class="left">
                    <h2><i class="cqc-news"></i> <ax:lang id="ax.admin.essCommandManagement.formTitle"/></h2>
                </div>
                <div class="right">
                    <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                        <i class="cqc-erase"></i>
                        <ax:lang id="ax.admin.clear"/>
                    </button>
                </div>
            </div>

                <ax:form name="formView01">
                    <input type="hidden" name="essCode" id="essCode" dataPath="essCode"/>
                    <ax:tbl clazz="ax-form-tbl">
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essCommandManagement.controlCode" width="350px">
                                <input type="text" name="controlCode" id="controlCode" data-ax-path="controlCode"  class="form-control W150" value="" readonly/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essCommandManagement.deviceName" width="350px">
                                <select id="deviceCode" name="deviceCode" dataPath="deviceCode" title="장비 코드" class="av-required form-control W150" ></select>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essCommandManagement.controlTypeCode" width="350px">
                                <select id="controlType" name="controlType" dataPath="controlType" title="controlType" class="av-required form-control W150" ></select>
                            </ax:td>
                            <ax:td label="ax.admin.essCommandManagement.controlValue" width="280px">
                                <input type="text" name="controlValue" id="controlValue" data-ax-path="controlValue"  class="form-control W150" value="" maxlength="11" onkeyup="this.value = onKeyNumberCheck(this.value,this.id);"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.common.useYn" width="350px">
                                <ax:common-code id="useFlag" name="useFlag" groupCd="USE_YN" dataPath="useFlag" clazz="form-control W150"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.common.remark" style="height : 100px;">
                                <textarea id="remarks" name="remarks" data-ax-path="remarks" title="비고" class="av-required form-control W500" style="height: 99%;" width="95%"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>