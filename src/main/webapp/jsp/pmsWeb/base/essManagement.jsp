<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>
<ax:set key="system-auth-user-version" value="1.0.0"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/base/essManagement.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>

        <script>
          var essCode = "${loginUser.essCode}";
          var essType = "${loginUser.essType}";
          var userCd = "${loginUser.userCd}";
        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" >
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.essManagement.formTitle"/>
                        </h2>
                    </div>
                </div>

                <ax:form name="formView01" style="margin-right:20px;">
                    <ax:tbl clazz="ax-form-tbl">
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essManagement.essType" width="350px" labelWidth="120px">
                                <ax:common-code groupCd="ESS_TYPE" dataPath="essType" id="essType" clazz="form-control W150"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essManagement.essCode" width="350px" labelWidth="120px">
                                <input type="text" name="essCode" id="essCode" data-ax-path="essCode" maxlength="10" class="form-control W150" value=""/>
                            </ax:td>
                            <ax:td label="ax.admin.essManagement.essName" width="350px" labelWidth="120px">
                                <input type="text" name="essName" data-ax5formatter="essName" data-ax-path="essName" maxlength="50" class="form-control W150" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essManagement.locationAddress" width="600px" labelWidth="120px">
                                <input type="text" id="locationAddress" name="locationAddress" data-ax-path="locationAddress" maxlength="200" class="form-control W500" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                            <ax:td label="ax.admin.essManagement.latitude" width="350px" labelWidth="120px">
                                <input type="text" id="latitude"  name="latitude" data-ax-path="latitude" class="form-control W150" value="" maxlength="17" onkeyup="this.value = onKeyNumberCheck(this.value,this.id);"/>
                            </ax:td>
                            <ax:td label="ax.admin.essManagement.longitude" width="350px" labelWidth="120px">
                                <input type="text" id="longitude"  name="longitude" data-ax-path="longitude"  class="form-control W150" value="" maxlength="17" onkeyup="this.value = onKeyNumberCheck(this.value,this.id);"/>
                            </ax:td>
                        </ax:tr>
                        <c:choose>
                            <c:when test="${loginUser.essType eq '01'}">
                                <ax:tr labelWidth="120px">
                                    <ax:td label="ax.admin.essManagement.contractPower" width="350px" labelWidth="120px">
                                        <input type="text" name="contractPower" data-ax-path="contractPower" maxlength="100" class="form-control W150" value="" onKeyup="this.value=this.value.replace(/[^0-9.]/g,'');" style="display: inline"/>
                                        <span style="color: #BADC2D;">kWh</span>
                                    </ax:td>
                                    <ax:td label="ax.admin.essManagement.totalBatteryEnergy" width="350px" labelWidth="120px">
                                        <input type="text" name="totalBatteryEnergy" data-ax-path="totalBatteryEnergy" maxlength="100" class="form-control W150" value="" onKeyup="this.value=this.value.replace(/[^0-9.]/g,'');" style="display: inline"/>
                                        <span style="color: #BADC2D;">kWh</span>
                                    </ax:td>
                                </ax:tr>
                                <ax:tr labelWidth="120px">
                                    <ax:td label="ax.admin.essManagement.autoControlFlag" width="350px" labelWidth="120px">
                                        <ax:common-code groupCd="AUTO_CONTROL_FLAG" dataPath="autoControlFlag" id="autoControlFlag" clazz="form-control W150"/>
                                    </ax:td>
                                </ax:tr>
                            </c:when>
                            <c:otherwise>
                                <ax:tr labelWidth="120px">
                                    <ax:td label="ax.admin.essManagement.totalBatteryEnergy" width="350px" labelWidth="120px">
                                        <input type="text" name="totalBatteryEnergy" data-ax-path="totalBatteryEnergy" maxlength="100" class="form-control W150" value="" onKeyup="this.value=this.value.replace(/[^0-9.]/g,'');" style="display: inline"/>
                                        <span style="color: #BADC2D;">kWh</span>
                                    </ax:td>
                                    <ax:td label="ax.admin.essManagement.autoControlFlag" width="350px" labelWidth="120px">
                                        <ax:common-code groupCd="AUTO_CONTROL_FLAG" dataPath="autoControlFlag" id="autoControlFlag" clazz="form-control W150"/>
                                    </ax:td>
                                </ax:tr>
                            </c:otherwise>
                        </c:choose>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="50%" style="padding-left: 15px; max-width:923px; min-width: 923px;" scroll="scroll" overflow="auto">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            ESS 총 누적 전력량
                        </h2>
                    </div>
                </div>

                <ax:form name="formView02">
                    <ax:tbl clazz="ax-form-tbl" style="">
                        <ax:tr>
                            <div data-ax-td="" style="width:302px;">
                                <div data-ax-td-label="" >
                                    <ax:lang id="ax.admin.essManagement.energyUpdatedDate"/>
                                </div>
                            </div>
                            <div data-ax-td="" style="width:302px;">
                                <div data-ax-td-label="" >
                                    <ax:lang id="ax.admin.essManagement.totalCharge"/>
                                </div>
                            </div>
                            <div data-ax-td="" style="width:302px;">
                                <div data-ax-td-label="" >
                                    <ax:lang id="ax.admin.essManagement.totalDischarge"/>
                                </div>
                            </div>
                        </ax:tr>
                        <ax:tr>
                            <div data-ax-td="" style="width:302px;text-align: center;padding: 7px;font-size: 1em;">
                                <div data-ax-td-wrap="" style="color: #BADC2D;">
                                    <span name="energyUpdatedDate" id="energyUpdatedDate" data-ax-path="energyUpdatedDate" maxlength="128" class="W290" ></span>
                                </div>
                            </div>
                            <div data-ax-td="" style="width:302px;text-align: center;padding: 7px;font-size: 1em;">
                                <div data-ax-td-wrap="" style="color: #BADC2D;">
                                    <span name="totalCharge" id="totalCharge" data-ax-path="totalCharge" maxlength="128" class="W290" ></span>
                                    <span>kWh</span>
                                </div>
                            </div>
                            <div data-ax-td="" style="width:302px;text-align: center;padding: 7px;font-size: 1em;">
                                <div data-ax-td-wrap="" style="color: #BADC2D;">
                                    <span name="totalDischarge" id="totalDischarge" data-ax-path="totalDischarge" maxlength="128" class="W290"  ></span>
                                    <span>kWh</span>
                                </div>
                            </div>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>