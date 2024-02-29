<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
    <jsp:attribute name="css">
<%--        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/plugins/font-awesome/5.8.2/fontawesome-free-5.8.2-web/css/all.min.css'/>"/>--%>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/common.css'/>"/>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.admin" var="COL"/>
        <!-- c3 setting -->
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/chart.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/monitoring/mainFix.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>

        <script>
            var pageType          = "page";
            var essCode           = "${loginUser.essCode}";
            var essType           = "${loginUser.essType}";
            var essName           = "${loginUser.essName}";
            var autoControlFlag   = "${loginUser.autoControlFlag}";
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
                        <div class="layout-00 text-color f15" style="justify-content: center;">
                                ${loginUser.essName} (${loginUser.essCode})
                        </div>
                        <div class="layout-00 auto-control">
                            <div class="layout-header text-color f15">제어 설정</div>
                            <div class="btn-frame od-1">
                                <button class="w-btn-outline w-btn-default-skin-outline c9098" type="button"  value="Y" onclick="checkControlData('auto',this);" id="auto"/>
                            </div>
                            <div class="btn-frame od-2">
                                <button class="w-btn-outline w-btn-default-skin-outline c9099" type="button"  value="N" onclick="checkControlData('auto',this);" id="manual"/>
                            </div>
                        </div>
                        <div class="layout-00">
                            <div class="layout-header text-color f15">금일 일정</div>
                            <div class="plan-frame od-1">
                                <div class="txt-00 chargeFont f15">충전</div>
                                <div class="txt-01 text-color f15">
                                    <span class="pd5" id="completedChargeCount">0</span> /
                                    <span class="pd5" id="chargeCount">0</span>건
                                </div>
                            </div>
                            <div class="plan-frame od-2">
                                <div class="txt-00 disChargeFont f15">방전</div>
                                <div class="txt-01 text-color f15">
                                    <span class="pd5" id="completedDischargeCount">0</span> /
                                    <span class="pd5" id="dischargeCount">0</span>건
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
                                <td class="wd15 f20 tac">충전</td>
                                <td class="wd60 f20 tar chargeFont"><span class="fa fa-plus fa-xs" aria-hidden="true"></span> <span class="whiteText" id="sumCharge">0</span></td>
                                <td class="wd15 f20 tac">kWh</td>
                            </tr>
                            <tr class="disChargeFont">
                                <td class="wd15 f20 tac">방전</td>
                                <td class="wd60 f20 tar disChargeFont"><span class="fa fa-minus fa-xs" aria-hidden="true"></span> <span class="whiteText" id="sumDisCharge">0</span></td>
                                <td class="wd15 f20 tac">kWh</td>
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
                <!-- ESS 운영 통계 시작 -->
                <div class="card status-10">
                    <div class="header" style="width: 370px;">
                        <div class="title od-0">ESS 운영 통계</div>
                        <div class="refresh od-1" id="operatingTimer"></div>
                        <div class="od-2 click-btn" onclick="getOperatingStats();">
                            <span class="fa fa-redo" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="layout-00 od-0">
                            <div class="header-txt f12 text-color">전일 통계</div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">충전 완료 건수</div>
                                <div class="right-txt f11 od-1 bfrtChargeCompletedCnt">
                                    <span class="text-value lightGreenText "></span>
                                    <span class="gray-color mg5t">건</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">방전 완료 건수</div>
                                <div class="right-txt f11 od-1 bfrtDischargeCompletedCnt">
                                    <span class="text-value lightGreenText "></span>
                                    <span class="gray-color mg5t">건</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">누적 충전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText bfrtCumulativeCharge">
                                        <span class="f12 lightGreenText sign-value"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">누적 방전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText bfrtCumulativeDischarge">
                                        <span class="f16 lightGreenText sign-value" style="letter-spacing: 2px;"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">총 누적 충전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText bfrtTotaCumulativeCharge">
                                        <span class="f12 lightGreenText sign-value"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">총 누적 방전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText bfrtTotaCumulativeDischarge">
                                        <span class="f16 sign-value" style="letter-spacing: 2px;"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                        </div>
                        <div class="layout-01 od-1"></div>
                        <div class="layout-02 od-2">
                            <div class="header-txt f12 text-color">금일 통계</div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">충전 완료 건수</div>
                                <div class="right-txt f11 od-1 ndChargeCompletedCnt">
                                    <span class="text-value lightGreenText "></span>
                                    <span class="gray-color mg5t">건</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">방전 완료 건수</div>
                                <div class="right-txt f11 od-1 ndDischargeCompletedCnt">
                                    <span class="text-value lightGreenText "></span>
                                    <span class="gray-color mg5t">건</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">누적 충전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText ndCumulativeCharge">
                                        <span class="f12 lightGreenText sign-value"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="left-txt f11 gray-color od-0">누적 방전량</div>
                                <div class="right-txt f11 od-1">
                                    <span class="lightGreenText ndCumulativeDischarge">
                                        <span class="f16 lightGreenText sign-value" style="letter-spacing: 2px;"></span>
                                        <span class="text-value"></span>
                                    </span>
                                    <span class="gray-color mg5t">kWh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ESS 운영 현황 끝 -->
                <!-- 누적 전력량 그래프 시작 -->
                <div class="card status-11">
                    <div class="header" style="width: 370px;">
                        <div class="title">누적 전력량 그래프</div>
                    </div>
                    <div class="content">
                        <div id="barGraph"></div>
                    </div>
                </div>
                <!-- 누적 전력량 그래프 끝 -->
                <!-- ESS 계통 현황 시작 -->
                <div class="card status-12">
                    <div class="header" style="width: 1220px;">
                        <div class="title">ESS 계통 현황</div>
                    </div>
                    <div class="content genealogy">
                        <!-- 라인-->
                        <div class="line" style="width:128px;height:14px;transform: rotate( 330deg );top: 208px;left: 122px;z-index: 3;border-radius: 0 10px;" id="rack1Line"></div>
                        <div class="line" style="width:130px;height:14px;transform: rotate( 330deg );top: 152px;left: 219px;z-index: 3;border-radius: 10px 5px;" id="rack2Line"></div>
                        <div class="line" style="width: 260px;height: 12px;transform: rotate( 34deg );top: 252px;left: 205px;border-radius: 10px;"id="pcsLine"></div>
                        <div class="line" style="width:266px;height:12px;transform: rotate( 330deg );top:252px;left: 450px;" id="smartLine"></div>
                        <div class="line" style="width:249px;height:12px;transform: rotate( 330deg );top: 104px;left: 715px;" id="defaultLine"></div>
                        <div class="line" style="width: 260px;height:12px;transform: rotate( 33deg );top:241px;left: 692px" id="electricChargeLine"></div>
                        <div class="line" style="width: 260px;height:12px;transform: rotate( 33deg );top: 113px;left: 920px;" id="hubDisChargeLine"></div>

                        <!--라벨-->
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 264px;left: 196px;font-size: 12px;">Rack 1.</div>
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 136px;left: 408px;font-size: 12px;">Rack 2.</div>
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 351px;left: 527px;font-size: 12px; ">PCS</div>
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 165px;left: 823px;font-size: 12px;">Smart<br/>Switchboard</div>
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 202px;left: 1213px;font-size: 12px;width: 100px;">Smart Hub</div>
                        <div style="transform: skew(54deg, -30deg);position: absolute;top: 335px;left: 985px;font-size: 12px;">Electricity</div>

                        <!--이미지-->
                        <div class="rack-img hover" id="rack1" style="top:160px;left: 61px;z-index: 4;height: 130px;"><img style="height: 140px;"/></div>
                        <div class="rack-img hover" id="rack2" style="top: 33px;left: 276px;z-index: 4;height: 130px;"><img style="height: 140px;"/></div>
                        <div class="pcs-img hover" id="pcs" style="top:230px;left: 370px;z-index: 4;height: 150px;"><img style="height: 145px;"/></div>
                        <div class="board-img hover" id="board" style="top:77px;left: 652px;z-index: 4;"><img style="height: 140px;"/></div>
                        <div class="electricity-img hover" id="elect" style="top: 210px;left: 859px;z-index: 4;"><img style="height: 140px;"/></div>
                        <div class="hub-img hover" id="hub" style="top:90px;left:1068px;z-index: 4;"><img style="height: 150px;"/></div>
                    </div>
                </div>
                <!-- ESS 계통 현황 끝 -->
                <!-- BMS 실 시작 -->
                <div class="card status-13 device-room bms-room">
                    <div class="header" style="width: 280px;">
                        <div class="title">BMS 실</div>
                    </div>
                    <div class="content">
                        <div class="air-conditioner od-0">
                            <div class="head-txt f12 text-color od-0">에어컨</div>
                            <div class="control od-1 point-none">
                                <div class="frame-00 od-0">
                                    <div class="switch od-0">
                                        <div class="od-0 f10 gray-color">전원</div>
                                        <div class="od-1">
                                            <div class="checkbox-wrapper-34">
                                                <input type="hidden" class="c8000 start"/>
                                                <input type="hidden" class="c8001 stop"/>
                                                <input class='tgl tgl-ios power' id='bmsAirPower' type='checkbox' onclick="checkControlData('bms-room',this);"/>
                                                <label class='tgl-btn' for='bmsAirPower'></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="temp od-1">
                                        <div class="od-0 f10 gray-color">설정 온도</div>
                                        <div class="od-1">
                                            <div class="stepper-input point-none">
                                                <button class="btn btn-left" value="bms-room" onclick="controlStepper('bms', false);">-</button>
                                                <input type="text" placeholder="-℃" value="" class="input-box setTemperature c8020" minlength="2" maxlength="2" onkeyup="keyUpEvent('bms', this);" onfocus="this.value = this.value.replace(/[^0-9]/g,'');" onblur="this.value = blurEvent('bms',this);"/>
                                                <button class="btn btn-right" onclick="controlStepper('bms', true);">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frame-01 od-1 bms-mode point-none">
                                    <div class="head-txt f10 gray-color od-0">운전 모드</div>
                                    <div class="mode od-1">
                                        <div class="line od-0"></div>
                                        <div class="mode-btn od-1">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="01 c8010" onclick="checkControlData('bms-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">냉방</div>
                                        </div>
                                        <div class="line od-2"></div>
                                        <div class="mode-btn od-3">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="04 c8013" onclick="checkControlData('bms-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">난방</div>
                                        </div>
                                        <div class="line od-4"></div>
                                        <div class="mode-btn od-5">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="02 c8011" onclick="checkControlData('bms-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">송풍</div>
                                        </div>
                                        <div class="line od-6"></div>
                                        <div class="mode-btn od-7">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="03 c8012" onclick="checkControlData('bms-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">자동</div>
                                        </div>
                                        <div class="line od-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="line od-1"></div>
                        <div class="sensor-status od-2">
                            <div class="od-0">
                                <div class="od-0 f12 gray-color">온도</div>
                                <div class="od-1">
                                    <span class="temp f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">℃</span>
                                </div>
                                <div class="od-2 f12 gray-color">습도</div>
                                <div class="od-4">
                                    <span class="hum f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">%</span>
                                </div>
                            </div>
                            <div class="od-1">
                                <div class="od-0 f12 gray-color">조도</div>
                                <div class="od-1">
                                    <span class="illum f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">lx</span>
                                </div>
                                <div class="od-2 f12 gray-color">도어</div>
                                <div class="od-4">
                                    <span class="door f12 text-color">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- BMS 실 끝 -->
                <!-- PCS 실 시작 -->
                <div class="card status-14 device-room pcs-room">
                    <div class="header" style="width: 280px;">
                        <div class="title">PCS 실</div>
                    </div>
                    <div class="content">
                        <div class="air-conditioner od-0">
                            <div class="head-txt f12 text-color od-0">에어컨</div>
                            <div class="control od-1 point-none">
                                <div class="frame-00 od-0">
                                    <div class="switch od-0">
                                        <div class="od-0 f10 gray-color">전원</div>
                                        <div class="od-1">
                                            <div class="checkbox-wrapper-34">
                                                <input type="hidden" class="c8000 start"/>
                                                <input type="hidden" class="c8001 stop"/>
                                                <input class='tgl tgl-ios power' id='pcsAirPower' type='checkbox' onclick="checkControlData('pcs-room',this);"/>
                                                <label class='tgl-btn' for='pcsAirPower'></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="temp od-1">
                                        <div class="od-0 f10 gray-color">설정 온도</div>
                                        <div class="od-1">
                                            <div class="stepper-input">
                                                <button class="btn btn-left" onclick="controlStepper('pcs', false);">-</button>
                                                <input type="text" placeholder="-℃" value="" class="input-box setTemperature c8020" minlength="2" maxlength="2" onkeyup="keyUpEvent('pcs', this);" onfocus="this.value = this.value.replace(/[^0-9]/g,'');" onblur="this.value = blurEvent('pcs',this);"/>
                                                <button class="btn btn-right" onclick="controlStepper('pcs', true);">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frame-01 od-1 pcs-mode">
                                    <div class="head-txt f10 gray-color od-0">운전 모드</div>
                                    <div class="mode od-1">
                                        <div class="line od-0"></div>
                                        <div class="mode-btn od-1">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="01 c8010" onclick="checkControlData('pcs-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">냉방</div>
                                        </div>
                                        <div class="line od-2"></div>
                                        <div class="mode-btn od-3">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="04 c8013" onclick="checkControlData('pcs-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">난방</div>
                                        </div>
                                        <div class="line od-4"></div>
                                        <div class="mode-btn od-5">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="02 c8011" onclick="checkControlData('pcs-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">송풍</div>
                                        </div>
                                        <div class="line od-6"></div>
                                        <div class="mode-btn od-7">
                                            <div class="checkbox-wrapper-31">
                                                <input type="checkbox" class="03 c8012" onclick="checkControlData('pcs-mode',this);"/>
                                                <svg viewBox="0 0 35.6 35.6">
                                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                </svg>
                                            </div>
                                            <div class="f10 gray-color mg5">자동</div>
                                        </div>
                                        <div class="line od-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="line od-1"></div>
                        <div class="sensor-status od-2">
                            <div class="od-0">
                                <div class="od-0 f12 gray-color">온도</div>
                                <div class="od-1">
                                    <span class="temp f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">℃</span>
                                </div>
                                <div class="od-2 f12 gray-color">습도</div>
                                <div class="od-4">
                                    <span class="hum f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">%</span>
                                </div>
                            </div>
                            <div class="od-1">
                                <div class="od-0 f12 gray-color">조도</div>
                                <div class="od-1">
                                    <span class="illum f14 text-color">-</span>
                                    <span class="f12 gray-color mg3">lx</span>
                                </div>
                                <div class="od-2 f12 gray-color">도어</div>
                                <div class="od-4">
                                    <span class="door f12 text-color">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PCS 실 끝 -->
                <!-- 서버 실 시작 -->
                <div class="card status-15">
                    <div class="header" style="width: 280px;">
                        <div class="title">서버 실</div>
                    </div>
                    <div class="content">
                        <div class="od-0 f12 gray-color">도어</div>
                        <div class="od-1 f12 text-color" id="doorSensor">-</div>
                    </div>
                </div>
                <!-- 서버 실 끝 -->
                <!-- BMS 운영 상태 시작 -->
                <div class="card status-16">
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
                <!-- PCS 운영 상태 시작 -->
                <div class="card status-17">
                    <div class="header" style="width: 780px;">
                        <div class="title">PCS 운영 상태</div>
                    </div>
                    <div class="content">
                        <!-- IGBT 온도 -->
                        <div class="layout-00 od-0">
                            <div class="frame-00 od-0 text-color f14">IGBT 온도</div>
                            <div class="frame-01 od-1">
                                <div class="od-0">
                                    <div class="txt-00 od-0">#1</div>
                                    <div class="od-1">
                                        <progress class="igbtProgress" id="progress1" value="" min="0" max="100"></progress>
                                        <span class="f10" style="float: left;">0</span>
                                        <span class="f10" style="float: right">100</span>
                                    </div>
                                    <div class="txt-01 od-2 text-color">
                                        <span class="text-color text-value" id="igbtTemperature1">-</span>
                                        <span class="gray-color mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-1">
                                    <div class="txt-00 od-0">#2</div>
                                    <div class="od-1">
                                        <progress class="igbtProgress" id="progress2" value="" min="0" max="100"></progress>
                                        <span class="f10" style="float: left;">0</span>
                                        <span class="f10" style="float: right">100</span>
                                    </div>
                                    <div class="txt-01 od-2">
                                        <span class="text-color text-value" id="igbtTemperature2">-</span>
                                        <span class="gray-color mg3">℃</span>
                                    </div>
                                </div>
                                <div class="od-2">
                                    <div class="txt-00 od-0">#3</div>
                                    <div class="od-1">
                                        <progress class="igbtProgress" id="progress3" value="" min="0" max="100"></progress>
                                        <span class="f10" style="float: left;">0</span>
                                        <span class="f10" style="float: right">100</span>
                                    </div>
                                    <div class="txt-01 od-2">
                                        <span class="text-color text-value" id="igbtTemperature3">-</span>
                                        <span class="gray-color mg3">℃</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 차트 -->
                        <div class="layout-01 od-1">
                            <div class="frame-00 od-0">
                                <div>
                                    <canvas class="chart-gauge" id="gaugeChart"></canvas>
                                    <div class="range f10">
                                        <div class="od-0">0</div>
                                        <div class="od-1" style="justify-content: flex-end">100</div>
                                    </div>
                                </div>
                                <div class="txt od-1">
                                    <span class="f14 text-color text-value" id="outputPower"> - </span>
                                    <span class="f12 gray-color mg3">kW</span>
                                </div>
                            </div>
                            <div class="frame-01 od-1">
                                <div class="txt od-0">
                                    <span class="f14 text-color text-value" id="averageLineVoltage">-</span>
                                    <span class="f12 gray-color mg3">V</span>
                                </div>
                                <div class="txt od-1">
                                    <span class="f14 text-color text-value" id="averagePhaseCurrent">-</span>
                                    <span class="f12 gray-color mg3">A</span>
                                </div>
                                <div class="txt od-2">
                                    <span class="f14 text-color text-value" id="frequency">-</span>
                                    <span class="f12 gray-color mg3">Hz</span>
                                </div>
                            </div>
                            <div class="frame-02 od-2">
                                <div class="od-0">
                                    <img class="op-status" src="/assets/images/main/status/100-disable.png" style="width: 41px;">
                                </div>
                                <div class="od-1">
                                    <img class="mode-status" src="/assets/images/main/status/3-disable.png" style="width: 41px;">
                                </div>
                                <div class="od-2">
                                    <img class="fault-status" src="/assets/images/main/status/98-disable.png" style="width: 41px;">
                                </div>
                                <div class="od-3">
                                    <img class="warning-status" src="/assets/images/main/status/99-disable.png" style="width: 41px;">
                                </div>
                            </div>
                        </div>
                        <!-- 운전 제어 -->
                        <div class="layout-02 od-2">
                            <div class="frame od-0 pcs-control">
                                <div class="od-0 ">
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-0 c0201" type="button" onclick="checkControlData('pcs',this);" disabled/>
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-1 c0202" type="button" onclick="checkControlData('pcs',this);" disabled/>
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-2 c0200" type="button" onclick="checkControlData('pcs',this);" disabled/>
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-3 c0203" type="button" onclick="checkControlData('pcs',this);" disabled/>
                                </div>
                                <div class="od-1 ">
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-0 c0204" type="button" onclick="checkControlData('pcs-mode',this);" disabled/>
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-1 c0205" type="button" onclick="checkControlData('pcs-mode',this);" disabled/>
                                    <button class="w-btn-outline w-btn-default-skin-outline control-btn od-2 c0206" type="button" onclick="checkControlData('pcs-mode',this);" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PCS 운영 상태  끝 -->
            </div>
            <jsp:include page="mainLayer.jsp"></jsp:include>
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