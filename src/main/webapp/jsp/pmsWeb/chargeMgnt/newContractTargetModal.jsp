<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%
RequestUtils requestUtils = RequestUtils.of(request);
request.setAttribute("targetName", requestUtils.getString("targetName"));
%>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="modal">

  <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <script>
            var targetName = "${targetName}";

            $("#targetNameFilter").val(targetName);
        </script>
        <script type="text/javascript"
                src="<c:url value='/assets/js/view/pmsWeb/chargeMgnt/newContractTargetModal.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <div class="ax-button-group" style="margin-top: 10px" data-fit-height-aside="grid-view-01">
            <div class="left">
                <h2><i class="cqc-list"></i><ax:lang id="ax.admin.chargeDischargeContractMgnt.modal.title"/></h2>
            </div>
            <div class="right">
                <!--조회-->
                <button type="button" class="btn btn-default" data-modal-header-btn="search">
                    <i class="cqc-magnifier"></i>
                    <ax:lang id="ax.admin.inquery"/>
                </button>
                <!--닫기-->
                <button type="button" class="btn btn-default" data-modal-header-btn="modal-close">
                    <i class="icon-closed"></i>
                    <ax:lang id="ax.admin.sample.modal.button.close"/>
                </button>
            </div>
        </div>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <!--대상 명-->
                        <ax:td label='ax.admin.chargeDischargeContractMgnt.chargeDischargeTarget' width="300px">
                            <input type="text" id="targetNameFilter" name="targetNameFilter"
                                   data-ax-path="targetNameFilter" class="av-required form-control W180"
                                   value=""/>
                        </ax:td>
                        <!--사용 여부-->
                        <ax:td label='ax.admin.chargeDischargeContractMgnt.useYn' width="300px">
                            <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control W150"
                                            id="useYnFilter" name="useYnFilter"
                                            defaultLabel="전체"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="50%" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i> <ax:lang
                                id="ax.admin.chargeDischargeContractMgnt.modal.gridTitle"/></h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>

            <ax:splitter></ax:splitter>

            <!-- Start Product Information -->
            <ax:split-panel width="*" style="padding-left: 10px; min-width: 550px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i><ax:lang id="ax.admin.chargeDischargeContractMgnt.modal.formTitle"/>
                        </h2>
                    </div>
                    <div class="right">
                        <!--신규-->
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                        <!--저장-->
                        <button type="button" class="btn btn-default" data-form-view-01-btn="save">
                            <i class="cqc-save"></i>
                            <ax:lang id="ax.admin.save"/>
                        </button>
                        <!--삭제-->
                        <button type="button" class="btn btn-default" data-form-view-01-btn="delete"><i
                                class="cqc-minus"></i>
                            <ax:lang id="ax.admin.delete"/>
                        </button>
                    </div>
                </div>

                <ax:form name="formView01">
                    <input type="hidden" name="act_tp" id="act_tp" value=""/>
                    <ax:tbl clazz="ax-form-tbl">
                        <ax:tr labelWidth="120px">
                            <!--충방전 대상-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.chargeDischargeTarget" width="300px">
                                <input type="text" id="targetName" name="targetName" data-ax-path="targetName"
                                       class="av-required form-control W400" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--담당자 명-->
                            <ax:td label='ax.admin.chargeDischargeContractMgnt.modal.managerName' width="300px">
                                <input type="text" id="targetManagerName" name="targetManagerName"
                                       data-ax-path="targetManagerName" class="av-required form-control W400" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--담당자 전화번호-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.modal.managerTel" width="300px">
                                <%--                <input  name="targetManagerTel" data-ax-path="targetManagerTel"  placeholder="" class="av-phone form-control W120" data-ax5formatter="phone" value=""/>--%>
                                <input type="text" class="form-control W120" maxlength="14" value=""
                                       name="targetManagerTel" data-ax-path="targetManagerTel"
                                       data-ax5formatter="phone"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--업체 주소-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.modal.address" width="300px">
                                <input type="text" id="address" name="address" data-ax-path="address"
                                       class="av-required form-control W400" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--사용 여부-->
                            <ax:td label='ax.admin.chargeDischargeContractMgnt.useYn' width="W400">
                                <ax:common-code id="useYn" name="useYn"
                                                groupCd="USE_YN"
                                                dataPath="useYn" clazz="filter form-control W150"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <!--비고-->
                            <ax:td label="ax.admin.chargeDischargeContractMgnt.modal.remark" width="300px">
                 <textarea id="remark" name="remark" data-ax-path="remark" title="비고"
                           class="av-required form-control W400" style="height: 99%;"
                           width="95%"></textarea>
                            </ax:td>
                        </ax:tr>


                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>