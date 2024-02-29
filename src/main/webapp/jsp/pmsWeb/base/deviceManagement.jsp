<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

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
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/deviceManagement.js' />"></script>
        <script>
            var essCode = "${loginUser.essCode}";
            var essType = "${loginUser.essType}";
            var userCd = "${loginUser.userCd}";
        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='장비명' width="300px">
                            <input type="text" id="deviceNameFilter" name="deviceNameFilter" class="form-control" />
                        </ax:td>
                        <ax:td label='장비 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategoryFilter" clazz="form-control W150" id="deviceCategoryFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='장비 하위 분류' width="300px">
                            <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySubFilter" clazz="form-control W150" id="deviceCategorySubFilter" defaultLabel="전체"/>
                        </ax:td>
                        <ax:td label='사용여부' width="300px">
                            <ax:common-code id="useYnFilter" name="useYnFilter" groupCd="USE_YN" dataPath="USE_YN" clazz="filter form-control W150" defaultLabel="전체"/>
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
                            <ax:lang id="ax.admin.deviceManagement.gridTitle"/>
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
                            <ax:lang id="ax.admin.deviceManagement.formTitle"/>
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
                            <ax:td label="ax.admin.deviceManagement.deviceCode" width="300px" labelWidth="120px">
                                <input type="text" name="deviceCode" id="deviceCode" data-ax-path="deviceCode" maxlength="15" title="장비 코드" class="av-required form-control W150"  readonly="readonly" value=""/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.deviceName" width="300px" labelWidth="120px">
                                <input type="text" name="deviceName" data-ax-path="deviceName" maxlength="15" title="장비 명" class="av-required form-control W150" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.deviceCategory" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="DEVICE_CATEGORY" dataPath="deviceCategory" clazz="form-control W150" id="deviceCategory" defaultLabel="선택"/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.deviceCategorySub" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="DEVICE_CATEGORY_SUB" dataPath="deviceCategorySub" clazz="form-control W150" id="deviceCategorySub" defaultLabel="선택"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.deviceRoom" width="300px">
                                <ax:common-code groupCd="ROOM_CODE" dataPath="deviceRoom" clazz="form-control W150" id="deviceRoom" defaultLabel="선택"/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.deviceNo" width="300px">
                                <input type="text" name="deviceNo" id="deviceNo" data-ax-path="deviceNo" maxlength="15" title="장비 번호" class="av-required form-control W150"  readonly="readonly" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.manufacturerName" width="300px" labelWidth="120px">
                                <input type="text" name="manufacturerName" data-ax-path="manufacturerName" maxlength="50" title="제조사 명" placeholder="" class="W150 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.modelName" width="300px" labelWidth="120px">
                                <input type="text" name="modelNo" data-ax-path="modelNo" maxlength="50" title="모델 명" placeholder="" class="W150 form-control" value=""/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.serialNo" width="300px" labelWidth="120px">
                                <input type="text" name="serialNo" data-ax-path="serialNo" maxlength="100" title="시리얼 번호" placeholder="" class="W150 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.deviceSpec" width="300px" labelWidth="120px">
                                <textarea name="deviceSpec" data-ax-path="deviceSpec" title="스펙" placeholder="" class="W450 form-control" value=""></textarea>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.remark" width="300px" labelWidth="120px">
                                <input type="text" name="remarks" data-ax-path="remarks" title="비고" placeholder="" class="W450 form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.deviceManagement.useFlag" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="USE_YN" dataPath="useFlag" clazz="form-control W150"/>
                            </ax:td>
                            <ax:td label="ax.admin.deviceManagement.controlFlag" width="300px" labelWidth="120px">
                                <ax:common-code groupCd="CONTROL_FLAG" dataPath="controlFlag" clazz="form-control W150"/>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                    <!-- 장비 구성요소 정보 -->
                </ax:form>
                <ax:split-panel id="gridView02" style="height:300px;" childId="split-panel-grid-view-02" scroll="scroll">
                    <!-- 목록 -->
                    <div class="ax-button-group" data-fit-height-aside="grid-view-02" style="min-height: 50px;">
                        <div class="left">
                            <h2><i class="cqc-news"></i>
                                <ax:lang id="ax.admin.deviceManagement.component"/>
                            </h2>
                        </div>
                        <div class="right">
                            <!--추가-->
                            <button type="button" class="btn btn-default" data-grid-view-02-btn="add">
                                <i class="cqc-add-to-list"></i>
                                <ax:lang id="ax.admin.clear"/>
                            </button>
                            <!--삭제-->
                            <button type="button" class="btn btn-default" data-grid-view-02-btn="delete">
                                <i class="cqc-erase"></i>
                                <ax:lang id="ax.admin.delete"/>
                            </button>
                        </div>
                    </div>
                    <div data-ax5grid="grid-view-02" style="height: 240px;"></div>
                    <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
                </ax:split-panel>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>