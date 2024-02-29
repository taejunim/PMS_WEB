<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:mobileLayout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/commonMobile.css'/>"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/common.css'/>"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
    </jsp:attribute>
    <jsp:attribute name="script">
        <!-- c3 setting -->
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/chart.js' />"></script>
<%--        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>--%>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/mobile/mobileCpcm.js' />"></script>
        <script>
            var batteryRemainElec = "${loginUser.batteryRemainElec}";
            var pmsCode           = "${loginUser.pmsCode}";
        </script>
    </jsp:attribute>
    <jsp:body>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="" scroll="scroll">

                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            실시간 장비 상태 </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
                            </div>
                            <div data-ax-td="" class="wd100 deviceStatusTable">
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">PMS</span>
                                    <img class="pmsImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="pmsStatusLabel">수동</div>
                                </div>
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">Grid</span>
                                    <img class="pcsImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="gridStatusLabel">대기</div>
                                </div>
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">DC/DC 컨버터</span>
                                    <img class="chargerImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="dcChargerStatusLabel">대기</div>
                                </div>
                                <%--<div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">Grid - 220V</span>
                                    <img class="powerSocketImage"/>
                                    <div class="statusLabel" id="grid220VStatusLabel">대기</div>
                                </div>--%>
                            </div>
                            <div data-ax-td="" class="wd100 deviceStatusTable">
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">배터리</span>
                                    <img class="batteryImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="batteryStatusLabel">대기</div>
                                </div>
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">에어컨(CPCM실)</span>
                                    <img class="airConditionerImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="cpcmAirConditionerStatusLabel">-</div>
                                </div>
                                <div data-ax-td-wrap="" style="line-height: 25px;">
                                    <span style="font-size: 10px; white-space: nowrap;">에어컨(배터리실)</span>
                                    <img class="airConditionerImage" style="filter :brightness(0) invert(1);"/>
                                    <div class="statusLabel" id="batteryAirConditionerStatusLabel">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            <ax:lang id="ax.admin.operationMonitoring.electricityStatus"/></h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
                            </div>
                            <div data-ax-td-wrap="" class="deviceStatusTable" style="line-height: 25px;">
                                <canvas id="mobileChart" style="margin:10px;"></canvas>
                            </div>
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            <ax:lang id="ax.admin.main.modal.gridChargingControl"/>
                                        </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
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
                                            <span>A</span>
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
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            <ax:lang id="ax.admin.main.modal.lGridDischargingControl"/>
                                        </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
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
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            <ax:lang id="ax.admin.main.modal.rGridDischargingControl"/>
                                        </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
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
                                            <span>A</span>
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
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            <ax:lang id="ax.admin.main.modal.dcConverterControl"/>
                                        </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
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
                        </div>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="" style="line-height: 25px;">
                                <div class="ax-button-group">
                                    <div class="left">
                                        <h4 class="title " style="margin-left: 2%; margin-top: 2%;"><i class="fa fa-info-circle blueText"></i>&nbsp
                                            배터리 제어 </h4>
                                    </div>
                                    <div class="right">
                                    </div>
                                </div>
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
                        </div>
                    </div>
                </ax>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:mobileLayout>