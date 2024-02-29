<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<ax:set key="page_auto_height" value="true"/>
<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script>
            var pageType = "modal";
        </script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/monitoring/mainCpcmControl.js' />"></script>
    </jsp:attribute>

    <jsp:body>
        <div class="ax-button-group" style="margin-top: 10px">
            <div class="left">
                <h2><i class="cqc-list"></i><ax:lang id="ax.admin.main.modal.title"/></h2>
            </div>
            <div class="right">
                <button type="button" class="btn btn-default" data-modal-header-btn="modal-close">
                    <i class="icon-closed"></i>
                    <ax:lang id="ax.admin.sample.modal.button.close"/>
                </button>
            </div>
        </div>
        <ax:split-layout name="ax1" orientation="vertical" style="height:490px!important;">
           <ax:split-panel width="25%" style="padding-right: 10px; height:490px!important;">
                <!-- Grid 충전 제어(원격) -->
                <div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.gridChargingControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <table class="monitoringModalTable">
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.driveMode"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="charging">
                                    <ax:lang id="cpcmControl.charging"/>
                                </button>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.faultReset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" id="gridResetFault1" style="font-size: 12px;" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="faultResetStart">
                                    <ax:lang id="cpcmControl.faultResetStart"/></button>
                            </td>
                            <td>
                                <button type="button" id="gridResetFault0" style="font-size: 12px;" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="faultResetStop">
                                    <ax:lang id="cpcmControl.faultResetStop"/></button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.currentInputSetting"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="gridCurrent" name="current" class="buttonWidth20" maxlength="4" style="width: 90%; text-align: center;"/>
                                <span style="position: absolute; left: 110px; top: 206px;">A</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="setCurrent">
                                    <ax:lang id="cpcmControl.setCurrent"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.driveRun"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="start">
                                    <ax:lang id="cpcmControl.powerOn"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="stop">
                                    <ax:lang id="cpcmControl.powerOff"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button type="button" class="btn btn-default monitoringModalButton" grid-charging-remote-control-btn="emergencyStop">
                                    <ax:lang id="cpcmControl.emergencyStop"/></button>
                            </td>
                        </tr>
                    </table>
                    <div class="newDivideLine"></div>
                </div>
                <!-- Grid 충전 제어(원격) 끝-->
            </ax:split-panel>

            <ax:split-panel width="25%" style="padding-right: 10px; padding-left: 10px; height:490px!important;">
                <!-- L-Grid 방전 제어(원격) -->
                <div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.lGridDischargingControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <table class="monitoringModalTable">
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.driveMode"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" lGrid-discharging-remote-control-btn="discharging">
                                    <ax:lang id="cpcmControl.discharging"/>
                                </button>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.faultReset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" style="font-size: 12px;" class="btn btn-default monitoringModalButton" lGrid-discharging-remote-control-btn="faultResetStart">
                                    <ax:lang id="cpcmControl.faultResetStart"/></button>
                            </td>
                            <td>
                                <button type="button" style="font-size: 12px;" class="btn btn-default monitoringModalButton" lGrid-discharging-remote-control-btn="faultResetStop">
                                    <ax:lang id="cpcmControl.faultResetStop"/></button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.driveRun"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" lGrid-discharging-remote-control-btn="start">
                                    <ax:lang id="cpcmControl.powerOn"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" lGrid-discharging-remote-control-btn="stop">
                                    <ax:lang id="cpcmControl.powerOff"/>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- L-Grid 방전 제어(원격) 끝 -->
                <!-- R-Grid 방전 제어(원격) -->
                <div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.rGridDischargingControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <div class="newDivideLine"></div>
                    <table class="monitoringModalTable">
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.faultReset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" id="cpcmResetFault0" style="font-size: 12px;" class="btn btn-default monitoringModalButton" rGrid-discharging-remote-control-btn="faultResetStart">
                                    <ax:lang id="cpcmControl.faultResetStart"/></button>
                            </td>
                            <td>
                                <button type="button" id="cpcmResetFault1" style="font-size: 12px;" class="btn btn-default monitoringModalButton" rGrid-discharging-remote-control-btn="faultResetStop">
                                    <ax:lang id="cpcmControl.faultResetStop"/></button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.currentInputSetting"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="rGridCurrent" name="current" class="buttonWidth20" maxlength="4" style="width: 90%; text-align: center;"/>
                                <span style="position: absolute; left: 117px; top: 378px;">A</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" rGrid-discharging-remote-control-btn="setCurrent">
                                    <ax:lang id="cpcmControl.setCurrent"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.driveRun"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" rGrid-discharging-remote-control-btn="start">
                                    <ax:lang id="cpcmControl.powerOn"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" rGrid-discharging-remote-control-btn="stop">
                                    <ax:lang id="cpcmControl.powerOff"/>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- R-Grid 방전 제어(원격) 끝 -->
            </ax:split-panel>
            <ax:split-panel width="25%" style="padding-right: 10px; padding-left: 10px; height:490px!important;">
                <!-- DC/DC 컨버터 제어(원격) -->
                <div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.dcConverterControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <table class="monitoringModalTable">
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">
                                <ax:lang id="ax.admin.main.modal.subTitle.emergencyStop"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" dc-converter-remote-control-btn="emergencyStopReady">
                                    <ax:lang id="cpcmControl.emergencyStopReady"/></button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" dc-converter-remote-control-btn="emergencyStop">
                                    <ax:lang id="cpcmControl.emergencyStop"/></button>
                            </td>
                        </tr>
                    </table>
                    <div class="newDivideLine"></div>
                </div>
                <!-- DC/DC 컨버터 제어(원격) 끝 -->
            </ax:split-panel>
            <ax:split-panel width="*" style="padding-right: 10px; padding-left: 10px; height:490px!important;">
                <!-- 배터리 제어(원격) -->
                <div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.batteryRemoteControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <table class="monitoringModalTable">
                        <tr>
                            <td colspan="2" class="controlTableLabelTd">&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" battery-remote-control-btn="normalOperation">
                                    <ax:lang id="ax.admin.main.normalOperation"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" battery-remote-control-btn="faultReset">
                                    <ax:lang id="ax.admin.main.modal.faultReset"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button type="button" class="btn btn-default monitoringModalButton" battery-remote-control-btn="emergencyStop">
                                    <ax:lang id="ax.admin.main.emergencyStop"/>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 공조장치 제어(원격) -->
                <%--<div class="ax-button-group">
                    <div class="left">
                        <h3 class="title navyText"><i class="blueText cqc-check"></i>
                            <ax:lang id="ax.admin.main.modal.airConditionerRemoteControl"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="table-full-width">
                    <table class="monitoringModalTable">
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" air-conditioner-remote-control-btn="cooling">
                                    <ax:lang id="ax.admin.main.modal.cooling"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" air-conditioner-remote-control-btn="heating">
                                    <ax:lang id="ax.admin.main.modal.heating"/>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-default monitoringModalButton" air-conditioner-remote-control-btn="dehumidification">
                                    <ax:lang id="ax.admin.main.modal.dehumidification"/>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>--%>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>