<%--
  Created by IntelliJ IDEA.
  User: Hong
  Date: 2021-09-05
  Time: 오후 8:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/saleCompanyManagement.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0" style="margin-bottom:0;">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label="ax.admin.saleCompanyManagement.nameFilter" width="300px">
                            <input type="text" id="saleCompanyNameFilter" name="saleCompanyNameFilter" data-ax-path="saleCompanyNameFilter" title="판매처 명" class="filter av-required form-control W250" placeholder="판매처명을 입력해주세요." value=""/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <!-- Start Product List -->
            <ax:split-panel width="60%" style="padding-right: 10px;" childId="split-panel-grid-view-01">
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i><ax:lang id="ax.admin.saleCompanyManagement.gridTitle"/></h2>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                <%@ include file="/jsp/common/noGridDataDiv.jsp"%>
            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <!-- Start Product Information -->
            <ax:split-panel width="*" style="padding-left: 10px; min-width: 550px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i><ax:lang id="ax.admin.saleCompanyManagement.formTitle"/></h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                    </div>
                </div>

                <ax:form name="formView01">
                    <input type="hidden" name="act_tp" id="act_tp" value=""/>
                    <ax:tbl clazz="ax-form-tbl">
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.saleCompanyManagement.name" width="350px">
                                <input type="text" id="saleCompanyName" name="saleCompanyName" data-ax-path="saleCompanyName" maxlength="30" title="판매처 명" class="av-required form-control W210" value=""/>
                            </ax:td>
                            <ax:td label="ax.admin.saleCompanyManagement.code" width="280px">

                                <input type="text" id="saleCompanyCode" name="saleCompanyCode" data-ax-path="saleCompanyCode" title="판매처 코드" class="av-required form-control W210" readonly="readonly" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.saleCompanyManagement.managerName" width="350px">
                                <input type="text" id="saleCompanyManagerName" name="saleCompanyManagerName" data-ax-path="saleCompanyManagerName" title="담당자 명" maxlength="7" class="av-required form-control W210" value=""/>
                            </ax:td>
                            <ax:td label="ax.admin.saleCompanyManagement.managerTel" width="280px">
                                <input type="text" name="saleCompanyManagerTel" data-ax-path="saleCompanyManagerTel" maxlength="13" placeholder="" class="av-phone form-control W120" data-ax5formatter="phone" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.saleCompanyManagement.companyTel" width="350px">
                                <input type="text" name="saleCompanyTel" data-ax-path="saleCompanyTel" maxlength="13" placeholder="" class="av-phone form-control W120" data-ax5formatter="phone" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.saleCompanyManagement.companyAddress" width="350px">
                                <input type="text" id="saleCompanyAddr" name="saleCompanyAddr" data-ax-path="saleCompanyAddr" maxlength="60" title="주소" class="av-required form-control W560" value=""/>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>