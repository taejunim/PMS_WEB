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
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/deviceErrorCode.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>

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
                        <ax:td label='장비 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategoryFilter" clazz="form-control W150" id="deviceCategoryFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='장비 하위 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySubFilter" clazz="form-control W150" id="deviceCategorySubFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='오류 구분' width="300px">
                            <ax:common-code id="errorTypeFilter" name="errorTypeSch" groupCd="ERROR_TYPE" dataPath="ERROR_TYPE" clazz="filter form-control W150" defaultLabel="전체"/>
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
                            <ax:lang id="ax.admin.deviceErrorCode.gridTitle"/>
                        </h2>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">

                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.deviceErrorCode.formTitle"/>
                        </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                    </div>
                </div>

                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.deviceCategory" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategory" clazz="form-control W150" id="deviceCategory" defaultLabel="선택"/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceErrorCode.deviceCategorySub" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySub" clazz="form-control W150" id="deviceCategorySub" defaultLabel="선택"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.errorCode" width="300px" labelWidth="120px">
                                <input type="text" id="errorCode" name="errorCode" data-ax-path="errorCode" maxlength="50" title="오류 코드" placeholder="" class="W150 form-control" value="" disabled/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceErrorCode.errorType" width="120px">
                                <ax:common-code groupCd="ERROR_TYPE" dataPath="errorType" id="errorType" name="errorType" clazz="form-control W150" defaultLabel="선택"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.errorCodeName" width="300px" labelWidth="120px">
                                <input type="text" name="errorCodeName" data-ax-path="errorCodeName" maxlength="50" title="오류 명" placeholder="" class="W450 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.manaufacturerCode" width="300px" labelWidth="120px">
                                <input type="text" name="manufacturerCode" data-ax-path="manufacturerCode" maxlength="50" title="제조사 개별 코드" placeholder="" class="W450 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.referenceCode" width="300px" labelWidth="120px">
                                <input type="text" name="referenceCode" data-ax-path="referenceCode" maxlength="50" title="참조 코드" placeholder="" class="W450 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.remarks" width="300px" labelWidth="120px">
                                <textarea name="remarks" data-ax-path="remarks" title="비고" placeholder="" class="W450 form-control" value="" maxlength="100"></textarea>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceErrorCode.useFlag" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="USE_YN" dataPath="useFlag" clazz="form-control W150"/>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>