<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script>
            var pageType = "modal";
        </script>
        <script type="text/javascript"
                src="<c:url value='/assets/js/view/pmsWeb/chargeMgnt/chargePlanMgnt.js' />"></script>
    </jsp:attribute>

    <jsp:body>

        <ax:split-layout name="ax1" orientation="vertical">
            <!-- Start BaseMaterial List -->
            <ax:split-panel width="*" style="padding-right: 10px;">

                <div class="ax-button-group" style="margin-top: 10px"data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i><ax:lang id="ax.admin.baseMaterial.grid.title"/></h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" base-form-view-01-btn="base-form-close">
                            <i class="icon-closed"></i>
                            <ax:lang id="ax.admin.sample.modal.button.close"/>
                        </button>
                    </div>
                </div>

                <!-- Start Search Bar -->
                <div class="ax-button-group"  style="margin-bottom: 10px" data-fit-height-aside="grid-view-01">
                    <ax:form name="searchView0">
                        <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                            <ax:tr>
                                <ax:td label="ax.admin.baseMaterial.form.type" width="270px">
                                    <ax:common-code name="search_view_type" groupCd="BASE_MATERIAL_TYPE" dataPath="searchBaseMaterialType" clazz="form-control W150" defaultLabel="전체"/>
                                </ax:td>
                                <ax:td label="ax.admin.baseMaterial.form.name.kor" width="260px">
                                    <input type="text" name="searchBaseMaterialNameKor" id="searchBaseMaterialNameKor" class="av-required form-control W150" value="" placeholder="성분 명을 입력해주세요."/>
                                </ax:td>
                            </ax:tr>
                        </ax:tbl>
                    </ax:form>
                    <div class="H10"></div>
                </div>
                <!-- End Search Bar -->

                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <!-- End BaseMaterial List -->

        </ax:split-layout>

    </jsp:body>
</ax:layout>