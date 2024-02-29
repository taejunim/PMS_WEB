<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="system-config-menu-version" value="1.0.0"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <style>
            .noDataMessage {
                border: 1px #444 solid;
                top: 65%;
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
            [data-z-tree] li a.curSelectedNode_Edit {
                color: black!important;
            }
            [data-ax5combobox-display="input"] {
                display: none;
            }
        </style>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/axboot/system/system-config-menu.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.menu.group' width="300px">
                            <ax:common-code groupCd="MENU_GROUP" id="menuGrpCd"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="300" style="padding-right: 10px;">

                <div class="ax-button-group" data-fit-height-aside="tree-view-01">
                    <div class="left">
                        <h2>
                            <i class="cqc-list"></i>
                            <ax:lang id="ax.admin.menu.title"/> </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-tree-view-01-btn="add"><i class="cqc-circle-with-plus"></i> <ax:lang id="ax.admin.add"/></button>
                    </div>
                </div>

                <div data-z-tree="tree-view-01" data-fit-height-content="tree-view-01" style="height: 300px;" class="ztree"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" id="split-panel-form" childId="split-panel-grid-view-01">

                <div data-fit-height-aside="form-view-01">
                    <div class="ax-button-group">
                        <div class="left">
                            <h2>
                                <i class="cqc-news"></i>
                                <ax:lang id="ax.admin.menu.program.setting"/> </h2>
                        </div>
                        <div class="right">

                        </div>
                    </div>

                    <ax:form name="formView01">
                        <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                            <ax:tr labelWidth="150px">
                                <ax:td label="ax.admin.menu.program.code" width="100%">
                                    <input type="text" data-ax-path="progCd" class="form-control" value="" readonly="readonly"/>
                                </ax:td>
                            </ax:tr>
                            <ax:tr labelWidth="150px">
                                <ax:td label="ax.admin.menu.name.lang.multi" width="100%">
                                    <div class="form-inline">
                                        <div class="form-group">
                                            <label>한국어</label>
                                            <ax:input dataPath="multiLanguageJson.ko"/>
                                        </div>
                                        <div class="form-group">
                                            <label>English</label>
                                            <ax:input dataPath="multiLanguageJson.en"/>
                                        </div>
                                    </div>
                                </ax:td>
                            </ax:tr>
                            <ax:tr labelWidth="150px">
                                <ax:td label="ax.admin.menu.program.name" width="100%">
                                    <input type="hidden" data-ax-path="menuId" class="form-control" value=""/>
                                    <input type="hidden" data-ax-path="progNm" class="form-control" value=""/>
                                    <div class="form-group">
                                        <div data-ax5combobox="progCd" data-ax5combobox-config='{size: "", editable: false, multiple: false}'></div>
                                    </div>
                                </ax:td>
                            </ax:tr>
                        </ax:tbl>
                    </ax:form>

                    <div class="H20"></div>
                    <!-- 목록 -->
                    <div class="ax-button-group">
                        <div class="left">
                            <h2><i class="cqc-list"></i>
                                <ax:lang id="ax.admin.menu.auth.group.setting"/> </h2>
                        </div>
                        <div class="right">

                        </div>
                    </div>
                </div>

                <div data-ax5grid="grid-view-01" data-fit-height-content="form-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>