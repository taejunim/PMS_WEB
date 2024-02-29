<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<ax:set key="system-auth-user-version" value="1.0.0"/>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/common.css'/>"/>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <!-- c3 setting -->
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/chart.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/monitoring/mainCpcm.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>
        <script>
            var pageType          = "page";
            var essCode           = "${loginUser.essCode}";
            var essType           = "${loginUser.essType}";
            var essName           = "${loginUser.essName}";
            var userCd = "${loginUser.userCd}";
        </script>

    </jsp:attribute>
    <jsp:body>
        <div class="cpcm-area">
            <div class="cpcm-area-sub">
                <!-- ESS 운영 현황 시작 -->
                <div class="card status-00">
                    <div class="header" style="width: 370px;">
                        <div class="title">ESS 운영 현황</div>
                    </div>
                    <div class="content">
                        <div class="essName layout-00 ">${loginUser.essName} (${loginUser.essCode})</div>
                        <div class="statistics">
                            <div class="header-txt f12 text-color">금일 통계</div>
                            <div class="frame">
                                <div class="text od-0">
                                    <div class="frame">
                                        <div class="flex-row od-0">
                                            <div class="left-txt f11 gray-color od-0 wd120p">충전 완료 건수</div>
                                            <div class="right-txt f11 od-1 bfrtChargeCompletedCnt wd50p tar">
                                                <span class="text-value lightGreenText ">0</span>
                                                <span class="gray-color mg5t">건</span>
                                            </div>
                                        </div>
                                        <div class="flex-row od-1">
                                            <div class="left-txt f11 gray-color od-0 wd120p">방전 완료 건수</div>
                                            <div class="right-txt f11 od-1 bfrtDischargeCompletedCnt wd50p tar">
                                                <span class="text-value lightGreenText ">0</span>
                                                <span class="gray-color mg5t">건</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="line od-1"></div>
                                <div class="text od-2">
                                    <div class="frame">
                                        <div class="flex-row od-0">
                                            <div class="left-txt f11 gray-color od-0 wd100p">누적 충전량</div>
                                            <div class="right-txt f11 od-1 wd65p tar">
                                                <span class="lightGreenText bfrtCumulativeCharge ">
                                                    <span class="f12 lightGreenText sign-value">+</span>
                                                    <span class="text-value">0</span>
                                                </span>
                                                <span class="gray-color mg5t">kWh</span>
                                            </div>
                                        </div>
                                        <div class="flex-row od-1">
                                            <div class="left-txt f11 gray-color od-0 wd100p">누적 방전량</div>
                                            <div class="right-txt f11 od-1 wd65p tar">
                                                <span class="lightGreenText bfrtCumulativeDischarge ">
                                                    <span class="f16 lightGreenText sign-value" style="letter-spacing: 2px;">-</span>
                                                    <span class="text-value">0</span>
                                                </span>
                                                <span class="gray-color mg5t">kWh</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- ESS 운영 현황 끝 -->
                <!-- ESS 총 누적 전력량 시작 -->
                <div class="card status-01">
                    <div class="header"style="width: 370px;">
                        <div class="title">ESS 총 누적 전력량</div>
                    </div>
                    <div class="content">
                        <table class="" style="margin: 30px 0 0 0px;width: 360px;">
                            <tr class="chargeFont">
                                <td class="wd15  f20 tac">충전</td>
                                <td class="wd60  f20 tar chargeFont"><span class="fa fa-plus fa-xs" aria-hidden="true"></span> <span class="whiteText" id="sumCharge">0</span></td>
                                <td class="wd15  f20 tac">kWh</td>
                            </tr>
                            <tr class="disChargeFont">
                                <td class="wd15  f20 tac">방전</td>
                                <td class="wd60  f20 tar disChargeFont"><span class="fa fa-minus fa-xs" aria-hidden="true"></span> <span class="whiteText" id="sumDisCharge">0</span></td>
                                <td class="wd15  f20 tac">kWh</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- ESS 총 누적 전력량 끝 -->
                <!-- 실시간 누적 전력량 시작 -->
                <div class="card status-02">
                    <div class="header" style="width: 370px;">
                        <div class="title">실시간 누적 전력량</div>
                    </div>
                    <div class="content">
                        <div class="row-center layout-00">
                            <div class="layout-header od-0" id="currentAccumulatedName">통신 불가</div>
                            <div class="row-center layout-content od-1">
                                <span class="fa fa-xs" aria-hidden="true" id="sign"></span>
                                <span class="text-color f20" id="currentAccumulatedValue">0</span>
                                <span class="f18">kWh</span>
                                <span class="gray-color f16">/</span>
                                <span class="gray-color f14" id="currentBattery">0</span>
                                <span class="gray-color f14">kWh</span>
                            </div>
                        </div>
                        <div class="layout-01">
                            <progress class="total-progress" id="currentAccumulatedProgress" value="" min="0" max="230" style="width: 340px;height: 20px;"></progress>
                            <div class="progress-range" style="flex-direction: row;">0</div>
                            <div class="progress-range" style="flex-direction: row-reverse;">230</div>
                        </div>
                    </div>
                </div>
                <!-- 실시간 누적 전력량 끝 -->
                <!-- 오류 알림 시작 -->
                <div class="card status-03">
                    <div class="header" style="width: 460px;">
                        <div class="title">오류 알림</div>
                    </div>
                    <div class="content">
                        <table id="deviceError" class="wd100 f14">
                            <tr><td class='weatherText tac' style="text-align: center;width: 460px;height: 110px;">Lodding...</td></tr>
                        </table>
                    </div>
                </div>
                <!-- 오류 알림 끝 -->
                <!-- 날씨 시작-->
                <div class="card status-04">
                    <div class="header" style="width: 280px;" id="currentDay">
                        <div class="title">날씨</div>
                    </div>
                    <div class="content">
                        <div id="weatherIcon" class="fa fa-5x"></div>
                        <div class="layout-00 click-btn" onclick="resetNowDate('timer');">
                            <div class="layout-header">
                                <div class="gray-color f15" id="weather-area">제주시 </div>
                                <div class="gray-color f13" id="timer"></div>
                            </div>
                            <div class="layout-content">
                                <span class="fa fa-redo fa-lg pd10" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div class="layout-01 gray-color">
                            <div class="f15">온도</div>
                            <div class="f20 text-color" id="temperature" style="justify-content: flex-end;">00</div>
                            <div class="f15">℃</div>
                        </div>
                        <div class="layout-02 gray-color">
                            <div class="f15">습도</div>
                            <div class="f20 text-color" id="humidity" style="justify-content: flex-end;">00</div>
                            <div class="f15">%</div>
                        </div>
                    </div>
                </div>
                <!-- 날씨 끝 -->
                <!-- ESS 계통 현황 시작 -->
                <div class="card status-05">
                    <div class="header" style="width: 1100px;">
                        <div class="title">ESS 계통 현황 -
                            <span id="essName" class="essName"></span>
                        </div>
                    </div>
                    <div class="content genealogy">
                        <!-- 계통도 -->
                        <div>
                            <div style="position: absolute;left: 100px;top: 39px;">
                                <img src="/assets/images/main/main-02.png" style="width: 450px;"/>
                            </div>
                            <!--배터리 라인-->
                            <div class="battery_2" style="width: 60px;height: 159px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-right: 0;border-bottom: 0;position: absolute;top: 85px;left: 201px;z-index: 1"></div>
                            <div class="battery_1" style="width: 63px;height: 160px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-left: 0;border-bottom: 0;position: absolute;top: 113px;left: 151px;z-index: 1"></div>
                            <!--AC 라인-->
                            <div class="ac_0" style="width: 170px;height: 10px;left: 271px;top: 262px;border: 5px solid #575757;transform:rotate(30deg);position:absolute;border-left:0;border-right:0;border-bottom:0;z-index: 0"></div>
                            <div class="ac_1" style="width: 60px;height: 80px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-left: 0;border-bottom: 0;position: absolute;top: 275px;left: 460px;"></div>
                            <div class="ac_2" style="width: 61px;height: 80px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-right: 0;border-bottom: 0;position: absolute;top: 302px;left: 413px;"></div>
                            <!--DC 라인-->
                            <div class="dc_0" style="z-index: 0;width: 240px;height: 140px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-left: 0;border-bottom: 0;position: absolute;top: 133px;left: 333px;"></div>
                            <div class="dc_1" style="width: 60px;height: 80px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-left: 0;border-bottom: 0;position: absolute;top: 154px;left: 656px;"></div>
                            <div class="dc_2" style="width: 60px;height: 80px;border: 5px solid #575757;transform: rotate(-30deg) skew(30deg);border-right: 0;border-bottom: 0;position: absolute;top: 181px;left: 609px;"></div>

                            <!--라벨-->
                            <div style="position: absolute;width: 48px;height: 19px;left: 83px;top: 167px;transform: rotate(-30deg);color: rgb(255, 255, 255);">Rack 1.</div>
                            <div style="position: absolute;width: 48px;height: 19px;left: 184px;top: 111px;transform: rotate(-30deg);color: rgb(255, 255, 255);">Rack 2.</div>
                            <div style="position: absolute;width: 66px;height: 38px;left: 320px;top: 292px;transform: rotate(30deg);color: rgb(255, 255, 255);">AC/DC Converter</div>
                            <div style="position: absolute;width: 66px;height: 38px;left: 517px;top: 166px;transform: rotate(30deg);color: rgb(255, 255, 255);">DC/DC Converter</div>
                            <div style="position: absolute;width: 66px;height: 19px;left: 449.5px;top: 390px;transform: rotate(-30deg);color: rgb(255, 255, 255);">L-Inverter</div>
                            <div style="position: absolute;width: 68px;height: 19px;left: 538.5px;top: 334px;transform: rotate(-30deg);color: rgb(255, 255, 255);">R-Inverter</div>
                            <div style="position: absolute;width: 66px;height: 19px;left: 644px;top: 261px;transform: rotate(-30deg);color: rgb(255, 255, 255);">L-Inverter</div>
                            <div style="position: absolute;width: 68px;height: 19px;left: 732px;top: 205px;transform: rotate(-30deg);color: rgb(255, 255, 255);">R-Inverter</div>

                            <!--이미지-->
                            <div class="hover" id="rack1" style="position: absolute;top: 90px;left:30px; z-index: 4">
                                <img src="/assets/images/main/battery-02.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="rack2" style="position: absolute;top: 35px;left: 130px; z-index: 4">
                                <img src="/assets/images/main/battery-02.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="acConverter" style="position: absolute;top: 205px;left: 325px; z-index: 4">
                                <img src="/assets/images/main/pcs-02.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="acInverterR" style="position: absolute;top: 248px;left: 495px; z-index: 4">
                                <img src="/assets/images/main/inverter.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="acInverterL" style="position: absolute;top: 305px;left: 403px; z-index: 4">
                                <img src="/assets/images/main/inverter.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="dcConverter" style="position: absolute;top: 77px;left: 520px; z-index: 4">
                                <img src="/assets/images/main/smart-switchboard-02.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="dcInverterL" style="position: absolute;top: 178px;left: 598px; z-index: 4">
                                <img src="/assets/images/main/evcharger-02.png" style="width: 100px;"/>
                            </div>
                            <div class="hover" id="dcInverterR" style="position: absolute;top: 123px;left: 686px; z-index: 4">
                                <img src="/assets/images/main/evcharger-02.png" style="width: 100px;"/>
                            </div>

                        </div>
                        <!-- BMS 실 -->
                        <div class="bms-room device-room" style="top:50px;">
                            <div class="title">BMS 실</div>
                            <div class="frame od-0">
                                <div class="od-0">
                                    <div class="gray-color od-0 f14">온도</div>
                                    <div class="od-1" style="display: flow-root;">
                                        <span class="temp f14 text-color">-</span>
                                        <span class="f12 gray-color mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-1">
                                    <div class="gray-color od-0 f14">습도</div>
                                    <div class="od-1" style="display: flow-root;">
                                        <span class="hum f14 text-color">-</span>
                                        <span class="f12 gray-color mg3">%</span>
                                    </div>
                                </div>
                                <div class="od-2">
                                    <div class="gray-color od-0 f14">도어</div>
                                    <div class="text-color od-1 f14 door">-</div>
                                </div>
                            </div>
                            <div class="frame od-1 control point-none">
                                <div class="od-0 point-none">
                                    <div class="gray-color od-0 f14">흡기</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input class='tgl tgl-ios c8011' id="bmsInhalation" type='checkbox'/>
                                        <label class='tgl-btn' for='bmsInhalation'></label>
                                    </div>
                                </div>
                                <div class="od-1 point-none">
                                    <div class="gray-color od-0 f14">배기</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input class='tgl tgl-ios c8012' id="bmsVentilation" type='checkbox' />
                                        <label class='tgl-btn' for='bmsVentilation'></label>
                                    </div>
                                </div>
                                <div class="od-2 point-none air">
                                    <div class="gray-color od-0 f14">에어컨</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input type="hidden" class="c8098 start"/>
                                        <input type="hidden" class="c8099 stop"/>
                                        <input class='tgl tgl-ios power' id='bmsAirPower' type='checkbox' onclick="checkControlData('bms-room',this);"/>
                                        <label class='tgl-btn' for='bmsAirPower'></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- PCS 실 -->
                        <div class="pcs-room device-room" style="bottom: 25px;">
                            <div class="title">PCS 실</div>
                            <div class="frame od-0 ">
                                <div class="od-0">
                                    <div class="gray-color od-0 ">온도</div>
                                    <div class="od-1" style="display: flow-root;">
                                        <span class="temp f14 text-color">-</span>
                                        <span class="f12 gray-color mg3">℃</span>
                                    </div>                                </div>
                                <div class="od-1">
                                    <div class="gray-color od-0 f14">습도</div>
                                    <div class="od-1" style="display: flow-root;">
                                        <span class="hum f14 text-color">-</span>
                                        <span class="f12 gray-color mg3">%</span>
                                    </div>                                </div>
                                <div class="od-2">
                                    <div class="gray-color od-0 f14">도어</div>
                                    <div class="text-color od-1 f14 door">-</div>
                                </div>
                            </div>
                            <div class="frame od-1 control point-none">
                                <div class="od-0 point-none">
                                    <div class="gray-color od-0 f14">흡기</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input class='tgl tgl-ios c8011' id="pcsInhalation" type='checkbox'/>
                                        <label class='tgl-btn' for='pcsInhalation'></label>
                                    </div>
                                </div>
                                <div class="od-1 point-none">
                                    <div class="gray-color od-0 f14">배기</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input class='tgl tgl-ios c8012' id="pcsVentilation" type='checkbox' />
                                        <label class='tgl-btn' for='pcsVentilation'></label>
                                    </div>
                                </div>
                                <div class="od-2 point-none air">
                                    <div class="gray-color od-0 f14">에어컨</div>
                                    <div class="checkbox-wrapper-34" style="height: 30px;">
                                        <input type="hidden" class="c8098 start"/>
                                        <input type="hidden" class="c8099 stop"/>
                                        <input class='tgl tgl-ios power' id='pcsAirPower' type='checkbox' onclick="checkControlData('pcs-room',this);"/>
                                        <label class='tgl-btn' for='pcsAirPower'></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ESS 계통 현황 끝 -->
                <!-- AC/DC 컨버터 운영 상태 시작-->
                <div class="card status-06">
                    <div class="header" style="width: 780px;">
                        <div class="title">AC/DC 컨버터 운영 상태</div>
                    </div>
                    <div class="content">
                        <div class="layout-00">
                            <!-- L-Grid 영역 -->
                            <div class="l-grid-area od-0">
                                <div class="area-title text-color f14">Left-Inverter</div>
                                <div class="l-grid-frame">
                                    <div class="content-area">
                                        <div class="chart-range">
                                            <div class="chart">
                                                <canvas class="chart-gauge" id="lGridChart" style=""></canvas>
                                                <div class="range" style="left: 46px;">
                                                    <div class="range-0 text-color f10">0</div>
                                                    <div class="range-1 text-color f10">100</div>
                                                </div>
                                            </div>
                                            <div class="power-value gray-color row-center f12">
                                                <span class="f14 text-color power" >-</span>kW
                                            </div>
                                        </div>
                                        <div class="value gray-color">
                                            <div class="row-center od-0">
                                                <span class="text-color f14 outputVoltage">-</span>V
                                            </div>
                                            <div class="row-center od-1">
                                                <span class="text-color f14 totalCurrent">-</span>A
                                            </div>
                                            <div class="row-center od-2">
                                                <span class="text-color f14 outputFrequency">-</span>Hz
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="state row-center">
                                    <div class="od-0">
                                        <img class="mode-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-1">
                                        <img class="op-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-2">
                                        <img class="fault-status" src="/assets/images/main/status/98-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-3">
                                        <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 55px;">
                                    </div>
                                </div>
                            </div>
                            <!-- Grid 영역 -->
                            <div class="grid-area od-1">
                                <div class="content-area">
                                    <div class="chart-range">
                                        <div class="chart">
                                            <canvas class="chart-gauge" id="gridChart" style="margin-top:-56px;"></canvas>
                                            <div class="range">
                                                <div class="range-0 text-color f10">0</div>
                                                <div class="range-1 text-color f10">100</div>
                                            </div>
                                            <div class="power-value gray-color row-center 14">
                                                <span class="text-color f16 power">-</span>kW
                                            </div>
                                        </div>
                                        <div class="value gray-color">
                                            <div class="row-center od-0">
                                                <span class="text-color f14 totalVoltage">-</span> V
                                            </div>
                                            <div class="row-center od-1">
                                                <span class="text-color f14 totalActiveCurrent">-</span> A
                                            </div>
                                        </div>
                                    </div>
                                    <div class="state">
                                        <div class="od-0">
                                            <img class="mode-status" src="/assets/images/main/status/0-disable.png" style="width: 60px;">
                                        </div>
                                        <div class="od-1">
                                            <img class="op-status" src="/assets/images/main/status/09-disable.png" style="width: 60px;">
                                        </div>
                                        <div class="od-2">
                                            <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 60px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- R-Grid 영역 -->
                            <div class="r-grid-area od-2">
                                <div class="area-title text-color f14">Right-Inverter</div>
                                <div class="r-grid-frame">
                                    <div class="content-area">
                                        <div class="chart-range">
                                            <div class="chart">
                                                <canvas class="chart-gauge" id="rGridChart" style=""></canvas>
                                                <div class="range" style="left: 581px;">
                                                    <div class="range-0 text-color f10">0</div>
                                                    <div class="range-1 text-color f10">100</div>
                                                </div>
                                            </div>
                                            <div class="power-value gray-color row-center text-color f12">
                                                <span class="f14 text-color power" id="rGridKw">-</span>kW
                                            </div>
                                        </div>
                                        <div class="value gray-color">
                                            <div class="row-center od-0">
                                                <span class="text-color f14 outputVoltage">-</span>V
                                            </div>
                                            <div class="row-center od-1">
                                                <span class="text-color f14 totalCurrent">-</span>A
                                            </div>
                                            <div class="row-center od-2">
                                                <span class="text-color f14 outputFrequency">-</span>Hz
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="state row-center">
                                    <div class="od-0">
                                        <img class="mode-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-1">
                                        <img class="op-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-2">
                                        <img class="fault-status" src="/assets/images/main/status/98-disable.png" style="width: 55px;">
                                    </div>
                                    <div class="od-3">
                                        <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 55px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layout-01">
                            <!-- Left 인버터 데이터 -->
                            <div class="data gray-color od-0 left-inverter-data">
                                <div class="od-0 row-center">
                                    <div class="od-0 row-center">전류</div>
                                    <div class="od-1 row-center">
                                        <span class="text-color acCurrent">-</span>A
                                    </div>
                                    <div class="od-2 row-center">전압</div>
                                    <div class="od-3 row-center">
                                        <span class="text-color gridVoltage">-</span>V
                                    </div>
                                </div>
                                <div class="od-1 row-center">
                                    <div class="od-0 row-center">주파수</div>
                                    <div class="od-1 row-center">
                                        <span class="text-color gridFrequency">-</span>Hz
                                    </div>
                                    <div class="od-2 row-center">역률</div>
                                    <div class="od-3 row-center">
                                        <span class="text-color powerFactor">-</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 내부 온도 -->
                            <div class="temperature od-1">
                                <div class="frame od-0">
                                    <div class="temp-1 row-center od-0 f13">함체 내부</div>
                                    <div class="temp-2 od-1">
                                        <progress class="igbtProgress" id="internalTemp" value="" min="0" max="100" style="width: 170px;height: 15px;"></progress>
                                        <div class="range" style="top: 20px;">
                                            <div class="range-0 text-color f10">0</div>
                                            <div class="range-1 text-color f10">100</div>
                                        </div>
                                    </div>
                                    <div class="temp-3 od-2">
                                        <span class="text-color" id="internalTempValue">-</span>℃
                                    </div>
                                </div>
                                <div class="frame od-1">
                                    <div class="temp-1 row-center od-0 f13">AC 변압기</div>
                                    <div class="temp-2 od-1">
                                        <progress class="igbtProgress" id="transformerTemp" value="" min="0" max="100" style="width: 170px;height: 15px;"></progress>
                                        <div class="range" style="top: 53px;">
                                            <div class="range-0 text-color f10">0</div>
                                            <div class="range-1 text-color f10">100</div>
                                        </div>
                                    </div>
                                    <div class="temp-3 od-2">
                                        <span class="text-color" id="transformerTempValue">-</span>℃
                                    </div>
                                </div>
                            </div>
                            <!-- Right 인버터 데이터 -->
                            <div class="data gray-color od-2 right-inverter-data">
                                <div class="od-0 row-center">
                                    <div class="od-0 row-center">전류</div>
                                    <div class="od-1 row-center">
                                        <span class="text-color acCurrent">-</span>A
                                    </div>
                                    <div class="od-2 row-center">전압</div>
                                    <div class="od-3 row-center">
                                        <span class="text-color gridVoltage">-</span>V
                                    </div>
                                </div>
                                <div class="od-1 row-center">
                                    <div class="od-0 row-center">주파수</div>
                                    <div class="od-1 row-center">
                                        <span class="text-color gridFrequency">-</span>Hz
                                    </div>
                                    <div class="od-2 row-center">역률</div>
                                    <div class="od-3 row-center">
                                        <span class="text-color powerFactor">-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layout-02 cpcm-control">
                            <!-- Left 인버터 버튼 -->
                            <div class="inverter-btn od-0">
                                <div class="button">
                                    <div class="btn-layout od-0">
                                        <div class="od-0">
                                            <button class="w-btn-outline w-btn-default-skin-outline c0307" type="button"  onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                        </div>
                                        <div class="od-1">
                                            <button class="w-btn-outline w-btn-default-skin-outline c0308" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 컨버터 버튼 -->
                            <div class="convert-btn">
                                <div>
                                    <div class="od-0">
                                        <button class="w-btn-outline w-btn-default-skin-outline c0300" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                    <div class="od-1">
                                        <button class="w-btn-outline w-btn-default-skin-outline c0301" type="button" onclick="checkControlData('cpcm-mode',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                    <div class="od-2">
                                        <button class="w-btn-outline w-btn-default-skin-outline c0302" type="button" onclick="checkControlData('cpcm-mode',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                </div>
                                <div class="mg10">
                                    <div class="od-0">
                                        <button class="w-btn-outline w-btn-default-skin-outline c0303" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                    <div class="od-1">
                                        <div class="voltage-layout gray-color">
                                            <input type="text" class="gray-color" id="electricCurrent" value="" maxlength="4" onkeyup="this.value = onKeyNumberCheck(this.value,this.id);" disabled/>
                                            <div>A</div>
                                        </div>
                                    </div>
                                    <div class="od-2">
                                        <button class="w-btn-outline w-btn-default-skin-outline c0305" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                </div>
                                <div class="mg10">
                                    <div class="od-0">
                                        <button class="w-btn-outline red-btn-skin-outline c0306" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                    </div>
                                </div>
                            </div>
                            <!-- Right 인버터 버튼 -->
                            <div class="inverter-btn od-2">
                                <div class="button">
                                    <div class="btn-layout od-0">
                                        <div class="od-0">
                                            <button class="w-btn-outline w-btn-default-skin-outline c0309" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                        </div>
                                        <div class="od-1">
                                            <button class="w-btn-outline w-btn-default-skin-outline c0310" type="button" onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<%--                <!-- 실시간 그래프 시작-->--%>
<%--                <div class="card status-07">--%>
<%--                    <div class="header" style="width: 400px;">--%>
<%--                        <div class="title">실시간 그래프</div>--%>
<%--                    </div>--%>
<%--                    <div class="content">--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--                <!-- 실시간 그래프 끝-->--%>
<%--                <!-- BMS 운영 상태 시작 -->--%>
<%--                <div class="card status-08">--%>
<%--                    <div class="header" style="width: 689px;">--%>
<%--                        <div class="title">BMS 운영 상태</div>--%>
<%--                    </div>--%>
<%--                    <div class="content">--%>
<%--                        <!-- soc -->--%>
<%--                        <div class="od-0">--%>
<%--                            <div class="od-0 text-color f18">SoC</div>--%>
<%--                            <div class="donutChart od-1">--%>
<%--                                <canvas id="socData"></canvas>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <!-- rack1 -->--%>
<%--                        <div class="od-1">--%>
<%--                            <div class="rack-header text-color od-0">Rack 1.</div>--%>
<%--                            <div class="donutChart od-1">--%>
<%--                                <canvas id="rack1Data"></canvas>--%>
<%--                            </div>--%>
<%--                            <img class="od-1" src="/assets/images/main/horizontal/100-disable-horizontal.png" id="rack1-status" style="width:80px;">--%>
<%--                            <div class="rack-status gray-color od-2">--%>
<%--                                <div class="row-center od-0">--%>
<%--                                    <span class="text-color" id="rack1VData">-</span>V--%>
<%--                                </div>--%>
<%--                                <div class="row-center od-0">--%>
<%--                                    <span class="text-color" id="rack1AData">-</span><span>A</span>--%>
<%--                                </div>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <!-- rack1 button -->--%>
<%--                        <div class="od-2">--%>
<%--                            <div class="od-1 rack1-control">--%>
<%--                                <button class="w-btn-outline purple-btn-skin-outline od-0 c0101" type="button" onclick="checkControlData('rack1',this);"/>--%>
<%--                                <button class="w-btn-outline purple-btn-skin-outline od-1 c0100" type="button" onclick="checkControlData('rack1',this);"/>--%>
<%--                                <button class="w-btn-outline red-btn-skin-outline od-2 c0102" type="button" onclick="checkControlData('rack1',this);"/>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <!-- rack2 -->--%>
<%--                        <div class="od-3">--%>
<%--                            <div class="rack-header text-color od-0">Rack 2.</div>--%>
<%--                            <div class="donutChart od-1">--%>
<%--                                <canvas id="rack2Data"></canvas>--%>
<%--                            </div>--%>
<%--                            <img class="od-1" src="/assets/images/main/horizontal/100-disable-horizontal.png" id="rack2-status" style="width:80px;">--%>
<%--                            <div class="rack-status gray-color od-2">--%>
<%--                                <div class="row-center od-0">--%>
<%--                                    <span class="text-color" id="rack2VData">-</span>V--%>
<%--                                </div>--%>
<%--                                <div class="row-center od-0">--%>
<%--                                    <span class="text-color" id="rack2AData">-</span>A--%>
<%--                                </div>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <!-- rack2 button -->--%>
<%--                        <div class="od-4">--%>
<%--                            <div class="od-1 rack2-control">--%>
<%--                                <button class="w-btn-outline purple-btn-skin-outline od-0 c0101" type="button"  onclick="checkControlData('rack2',this);"/>--%>
<%--                                <button class="w-btn-outline purple-btn-skin-outline od-1 c0100" type="button" onclick="checkControlData('rack2',this);"/>--%>
<%--                                <button class="w-btn-outline red-btn-skin-outline od-2 c0102" type="button" onclick="checkControlData('rack2',this);"/>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--                <!-- BMS 운영 상태 끝 -->--%>
                <!-- BMS 운영 상태 시작 -->
                <div class="card status-16" style="left: 15px;right: 1549px;top: 596px;bottom: 150px;">
                    <div class="header" style="width: 1100px;">
                        <div class="title">BMS 운영 상태</div>
                    </div>
                    <div class="content">
                        <div class="soc od-0">
                            <div class="txt f18 text-color">SoC</div>
                            <div class="socChart">
                                <canvas id="socData"></canvas>
                            </div>
                        </div>
                        <div class="line-area od-1">
                            <div class="line"></div>
                        </div>
                        <div class="rack od-2">
                            <div class="txt f14 text-color od-0">Rack 1.</div>
                            <div class="info od-1">
                                <div class="frame-00 od-0">
                                    <canvas id="rack1Data"></canvas>
                                </div>
                                <div class="frame-01 od-1">
                                    <img class="" src="/assets/images/main/horizontal/100-disable-horizontal.png" id="rack1-status" style="width:80px;">
                                </div>
                                <div class="frame-02 od-2 f14 text-color">
                                    <div class="od-0">
                                        <span class="text-value" id="rack1voltage">-</span>
                                        <span class="f12 gray-color mg3">V</span>
                                    </div>
                                    <div class="od-1">
                                        <span class="text-value" id="rack1averageCurrent">-</span>
                                        <span class="f12 gray-color mg3">A</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rack-txt od-3">
                            <div class="frame-00 od-0">
                                <div class="head-txt f12 text-color od-0">온도</div>
                                <div class="od-1 gray-color">
                                    <div class="txt f11 od-0 tal">평균 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack1averageTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-2 gray-color">
                                    <div class="txt f11 od-0 tal">최고 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack1maxModuleTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-3 gray-color">
                                    <div class="txt f11 od-0 tal">최저 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack1minModuleTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                            </div>
                            <div class="frame-01 od-1">
                                <div class="head-txt f12 text-color od-0">Cell 전압</div>
                                <div class="od-1 gray-color">
                                    <div class="txt f11 od-0 tal">최대 전압</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack1maxCellVoltage">-</span>
                                        <span class="f11 mg3">V</span>
                                    </div>
                                </div>
                                <div class="od-2 gray-color">
                                    <div class="txt f11 od-0 tal">최소 전압</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack1minCellVoltage">-</span>
                                        <span class="f11 mg3">V</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rack-btn od-4">
                            <div class="frame od-0 rack1-control">
                                <button class="w-btn-outline purple-btn-skin-outline od-0 control-btn c0101" type="button" onclick="checkControlData('rack1',this);"/>
                                <button class="w-btn-outline purple-btn-skin-outline od-1 control-btn c0100" type="button" onclick="checkControlData('rack1',this);"/>
                                <button class="w-btn-outline red-btn-skin-outline od-2 control-btn c0102" type="button" onclick="checkControlData('rack1',this);"/>
                            </div>
                        </div>
                        <div class="line-area od-5">
                            <div class="line"></div>
                        </div>
                        <div class="rack od-6">
                            <div class="txt f14 text-color od-0">Rack 2.</div>
                            <div class="info od-1">
                                <div class="frame-00 od-0">
                                    <canvas id="rack2Data"></canvas>
                                </div>
                                <div class="frame-01 od-1">
                                    <img class="" src="/assets/images/main/horizontal/100-disable-horizontal.png" id="rack2-status" style="width:80px;">
                                </div>
                                <div class="frame-02 od-2 f14 text-color">
                                    <div class="od-0">
                                        <span class="text-value" id="rack2voltage">-</span>
                                        <span class="f12 gray-color mg3">V</span>
                                    </div>
                                    <div class="od-1">
                                        <span class="text-value" id="rack2averageCurrent">-</span>
                                        <span class="f12 gray-color mg3">A</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rack-txt od-7">
                            <div class="frame-00 od-0">
                                <div class="head-txt f12 text-color od-0">온도</div>
                                <div class="od-1 gray-color">
                                    <div class="txt f11 od-0 tal">평균 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack2averageTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-2 gray-color">
                                    <div class="txt f11 od-0 tal">최고 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack2maxModuleTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-3 gray-color">
                                    <div class="txt f11 od-0 tal">최저 온도</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack2minModuleTemp">-</span>
                                        <span class="f11 mg3">℃</span>
                                    </div>
                                </div>
                            </div>
                            <div class="frame-01 od-1">
                                <div class="head-txt f12 text-color od-0">Cell 전압</div>
                                <div class="od-1 gray-color">
                                    <div class="txt f11 od-0 tal">최대 전압</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack2maxCellVoltage">-</span>
                                        <span class="f11 mg3">V</span>
                                    </div>
                                </div>
                                <div class="od-2 gray-color">
                                    <div class="txt f11 od-0 tal">최소 전압</div>
                                    <div class="txt od-1 tar">
                                        <span class="f13 text-color wd50p text-value" id="rack2minCellVoltage">-</span>
                                        <span class="f11 mg3">V</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rack-btn od-8">
                            <div class="frame od-0 rack2-control">
                                <button class="w-btn-outline purple-btn-skin-outline od-0 control-btn c0101" type="button" onclick="checkControlData('rack2',this);"/>
                                <button class="w-btn-outline purple-btn-skin-outline od-1 control-btn c0100" type="button" onclick="checkControlData('rack2',this);"/>
                                <button class="w-btn-outline red-btn-skin-outline od-2 control-btn c0102" type="button" onclick="checkControlData('rack2',this);"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- BMS 운영 상태 끝 -->
                <!-- DC/DC 컨버터 운영 상태 시작-->
                <div class="card status-09">
                    <div class="header" style="width: 780px;">
                        <div class="title">DC/DC 컨버터 운영 상태</div>
                    </div>
                    <div class="content">
                        <!-- L-DC/R-DC 영역 -->
                        <div class="layout-00 od-1">
                            <!-- L-DC/DC 컨버터 영역 -->
                            <div class="area-title od-0 text-color f14">Left-Inverter</div>
                            <!-- 전력 차트 -->
                            <div class="content-area od-1">
                                <div class="chart-range od-0">
                                    <div class="chart od-0">
                                        <canvas class="chart-gauge" id="leftInverterChart"></canvas>
                                        <div class="range row-center text-color">
                                            <div class="range-0 od-0 text-color">0</div>
                                            <div class="range-1 od-1 text-color">100</div>
                                        </div>
                                    </div>
                                    <div class="power-value gray-color row-center od-1 text-color f12">
                                        <span class="text-color f14 power">-</span> kW
                                    </div>
                                </div>
                                <div class="value row-center od-1 gray-color f12">
                                    <div class="row-center od-0 f12">
                                        <span class="text-color f14 current">-</span> V
                                    </div>
                                    <div class="row-center od-1">
                                        <span class="text-color f14 voltage">-</span> A
                                    </div>
                                </div>
                            </div>
                            <!-- 컨버터 상태 -->
                            <div class="state row-center od-2">
                                <div class="od-0">
                                    <img class="mode-status" src="/assets/images/main/status/3-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-1">
                                    <img class="op-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-2">
                                    <img class="fault-status" src="/assets/images/main/status/98-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-3">
                                    <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 55px;">
                                </div>
                            </div>
                        </div>
                        <!-- DC/DC 컨버터 -->
                        <div class="layout-01 od-1">
                            <!-- 전력 차트 -->
                            <div class="convert-area od-0">
                                <div class="content-area od-0">
                                    <div class="chart-range od-0">
                                        <canvas class="chart-gauge" id="convertChart" style="margin:3px 0 0 0;"></canvas>
                                        <div class="range">
                                            <div class="range-0 od-0 f10 text-color">0</div>
                                            <div class="range-1 od-1 f10 text-color">100</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="power-value gray-color row-center od-1 f14 text-color">
                                    <span class="text-color f16 power">-</span>kW
                                </div>
                            </div>
                            <!-- 컨버터 상태 -->
                            <div class="state od-1">
                                <div class="od-0">
                                    <img class="mode-status" src="/assets/images/main/status/0-disable.png" style="width: 60px;">
                                </div>
                                <div class="od-1">
                                    <img class="op-status" src="/assets/images/main/status/09-disable.png" style="width: 60px;">
                                </div>
                                <div class="od-2">
                                    <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 60px;">
                                </div>
                            </div>
                        </div>
                        <!-- R-DC/DC 컨버터 영역 -->
                        <div class="layout-02 od-2">
                            <div class="area-title od-0 text-color f14">Right-Inverter</div>
                            <!-- 전력 차트 -->
                            <div class="content-area od-1">
                                <div class="chart-range od-0">
                                    <div class="chart od-0">
                                        <canvas class="chart-gauge" id="rightInverterChart"></canvas>
                                        <div class="range row-center text-color">
                                            <div class="range-0 od-0 text-color">0</div>
                                            <div class="range-1 od-1 text-color">100</div>
                                        </div>
                                    </div>
                                    <div class="power-value gray-color row-center od-1 text-color f12">
                                        <span class="text-color f14 power">-</span> kW
                                    </div>
                                </div>
                                <div class="value row-center od-1 gray-color f12">
                                    <div class="row-center od-0 f12">
                                        <span class="text-color f14 current">-</span> V
                                    </div>
                                    <div class="row-center od-1">
                                        <span class="text-color f14 voltage">-</span> A
                                    </div>
                                </div>
                            </div>
                            <!-- 컨버터 상태 -->
                            <div class="state row-center od-2">
                                <div class="od-0">
                                    <img class="mode-status" src="/assets/images/main/status/3-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-1">
                                    <img class="op-status" src="/assets/images/main/status/11-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-2">
                                    <img class="fault-status" src="/assets/images/main/status/98-disable.png" style="width: 55px;">
                                </div>
                                <div class="od-3">
                                    <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 55px;">
                                </div>
                            </div>
                        </div>
                        <!-- 정보 및 버튼 영역 -->
                        <div class="layout-03 od-3">
                            <div class="content-area od-0">
                                <div class="od-0">
                                    <div class="od-0 gray-color f13">Total</div>
                                    <div class="od-1">
                                        <span class="od-0">
                                            <span class="text-color f16 totalDcPower totalValue">-</span>kW
                                        </span>
                                        <span class="od-1">
                                            <span class="text-color f16 totalCurrent totalValue">-</span>A
                                        </span>
                                    </div>
                                </div>
                                <div class="od-1">
                                    <div class="od-0 gray-color f13">DC</div>
                                    <div class="od-1">
                                        <span class="od-0">
                                            <span class="text-color f16 convertDcPower totalValue">-</span>kW
                                        </span>
                                        <span class="od-1">
                                            <span class="text-color f16 dcCurrent totalValue">-</span>A
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="button od-1 cpcm-control">
                                <button class="w-btn-outline red-btn-skin-outline c0311" type="button"  onclick="checkControlData('cpcm',this);" style="width: 90px;height: 26px;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- DC/DC 컨버터 운영 상태 끝-->
                <jsp:include page="mainLayer.jsp"></jsp:include>
            </div>
        </div>

        <!-- ESS 정보 미 등록시 알림 창 시작-->
        <div id="systemAlert" style="display: none">
            <div id="alertDialog" data-dialog-els="root" class="ax5-ui-dialog" style="width: 600px; top: 200px; left: 700px;">
                <div class="ax-dialog-header" data-dialog-els="header" style="background-color: #474747;">
                    시스템 알림
                </div>
                <div class="ax-dialog-body" data-dialog-els="body">
                    <div class="ax-dialog-msg">
                        <p style="font-size: 25px;font-weight: bold">ESS 정보 미등록으로 시스템 이용이 제한됩니다.</p><br>
                        <p style="font-weight: bold">
                            원활한 시스템 이용을 위하여<br>
                            <span id="essPageOpen" style="font-weight: bold;">[기본 정보] > [ESS 정보]</span>메뉴를 통해<br>
                            ESS 정보를 등록하여 주십시오.
                        </p>
                    </div>
                </div>
            </div>
            <div class="ax-mask" id="axMask">
                <div class="ax-mask-bg"></div>
                <div class="ax-mask-content">
                    <div class="ax-mask-body">
                    </div>
                </div>
            </div>
        </div>
        <!-- ESS 정보 미 등록시 알림 창 끝-->

    </jsp:body>
</ax:layout>