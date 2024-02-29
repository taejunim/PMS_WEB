<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>


<!-- 레이어 팝업 시작 -->
<div class="layer rack1 f11 text-color" style="height: 260px;top: 300px;left: 600px;display: none">
    <div class="title">Rack 1.</div>
    <div class="info">
        <div class="od-0 txt">
            <div class="od-0">
                <div class="od-0 left-txt">운영 상태</div>
                <div class="od-1 right-txt text-value operationStatus-code" style="width: 70px;color: #C00000;">통신 불가</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">운전 모드</div>
                <div class="od-1 right-txt text-value operationModeStatus-code" style="width: 70px;">-</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">SoC</div>
                <div class="od-1 right-txt text-value soc">-</div>
                <div class="od-2 unit">%</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">전압</div>
                <div class="od-1 right-txt text-value voltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">평균 전류</div>
                <div class="od-1 right-txt text-value averageCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">전류 센서 #1</div>
                <div class="od-1 right-txt text-value currentSensor1">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">전류 센서 #2</div>
                <div class="od-1 right-txt text-value currentSensor2">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">평균 온도</div>
                <div class="od-1 right-txt text-value averageTemp">-</div>
                <div class="od-2 unit">℃</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">충전 제한 전류</div>
                <div class="od-1 right-txt text-value chargeCurrentLimit">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-9">
                <div class="od-0 left-txt">방전 제한 전류</div>
                <div class="od-1 right-txt text-value dischargeCurrentLimit">-</div>
                <div class="od-2 unit">A</div>
            </div>
        </div>
        <div class="od-1 line-area">
            <div class="line"></div>
        </div>
        <div class="od-2 txt">
            <div class="od-0">
                <div class="od-0 left-txt">(+)극 전압 절연저항</div>
                <div class="od-1 right-txt text-value positiveVoltageResistance" style="width: 45px;">-</div>
                <div class="od-2 unit" style="width: 25px;">MΩ</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">(−)극 전압 절연저항</div>
                <div class="od-1 right-txt text-value negativeVoltageResistance" style="width: 45px;">-</div>
                <div class="od-2 unit" style="width: 25px;">MΩ</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">(+)극 메인 릴레이 동작</div>
                <div class="od-1 right-txt text-value positiveMainRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">(+)극 메인 릴레이 접점</div>
                <div class="od-1 right-txt text-value positiveMainRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">(−)극 메인 릴레이 동작</div>
                <div class="od-1 right-txt text-value negativeMainRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">(−)극 메인 릴레이 접점</div>
                <div class="od-1 right-txt text-value negativeMainRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">비상정지 릴레이 동작</div>
                <div class="od-1 right-txt text-value emergencyRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">비상정지 릴레이 접점</div>
                <div class="od-1 right-txt text-value emergencyRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">사전충전 릴레이 동작</div>
                <div class="od-1 right-txt text-value prechargeRelayAction-code" style="width: 70px;">-</div>
            </div>
        </div>
    </div>
</div>
<div class="layer rack2 f11 text-color" style="height: 260px;top: 200px;left: 800px;display: none">
    <div class="title">Rack 2.</div>
    <div class="info">
        <div class="od-0 txt">
            <div class="od-0">
                <div class="od-0 left-txt">운영 상태</div>
                <div class="od-1 right-txt text-value operationStatus-code" style="width: 70px;color: #C00000;">통신 불가</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">운전 모드</div>
                <div class="od-1 right-txt text-value operationModeStatus-code" style="width: 70px;">-</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">SoC</div>
                <div class="od-1 right-txt text-value soc">-</div>
                <div class="od-2 unit">%</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">전압</div>
                <div class="od-1 right-txt text-value voltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">평균 전류</div>
                <div class="od-1 right-txt text-value averageCurrent"></div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">전류 센서 #1</div>
                <div class="od-1 right-txt text-value currentSensor1">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">전류 센서 #2</div>
                <div class="od-1 right-txt text-value currentSensor2">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">평균 온도</div>
                <div class="od-1 right-txt text-value averageTemp">-</div>
                <div class="od-2 unit">℃</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">충전 제한 전류</div>
                <div class="od-1 right-txt text-value chargeCurrentLimit">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-9">
                <div class="od-0 left-txt">방전 제한 전류</div>
                <div class="od-1 right-txt text-value dischargeCurrentLimit">-</div>
                <div class="od-2 unit">A</div>
            </div>
        </div>
        <div class="od-1 line-area">
            <div class="line"></div>
        </div>
        <div class="od-2 txt">
            <div class="od-0">
                <div class="od-0 left-txt">(+)극 전압 절연저항</div>
                <div class="od-1 right-txt text-value positiveVoltageResistance" style="width: 45px;">-</div>
                <div class="od-2 unit" style="width: 25px;">MΩ</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">(−)극 전압 절연저항</div>
                <div class="od-1 right-txt text-value negativeVoltageResistance" style="width: 45px;">-</div>
                <div class="od-2 unit" style="width: 25px;">MΩ</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">(+)극 메인 릴레이 동작</div>
                <div class="od-1 right-txt text-value positiveMainRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">(+)극 메인 릴레이 접점</div>
                <div class="od-1 right-txt text-value positiveMainRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">(−)극 메인 릴레이 동작</div>
                <div class="od-1 right-txt text-value negativeMainRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">(−)극 메인 릴레이 접점</div>
                <div class="od-1 right-txt text-value negativeMainRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">비상정지 릴레이 동작</div>
                <div class="od-1 right-txt text-value emergencyRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">비상정지 릴레이 접점</div>
                <div class="od-1 right-txt text-value emergencyRelayContact-code" style="width: 70px;">-</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">사전충전 릴레이 동작</div>
                <div class="od-1 right-txt text-value prechargeRelayAction-code" style="width: 70px;">-</div>
            </div>
        </div>
    </div>
</div>
<div class="layer pcs f11 text-color" style="height: 280px;top: 360px;left: 920px;display: none">
    <div class="title">PCS</div>
    <div class="info">
        <div class="od-0 txt" style="height: 230px;">
            <div class="od-0">
                <div class="od-0 left-txt">운영 상태</div>
                <div class="od-1 right-txt text-value operationStatus-code" style="width: 70px;color: #C00000;">통신 불가</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">운전 모드</div>
                <div class="od-1 right-txt text-value operationModeStatus-code" style="width: 70px;">-</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">출력 전력</div>
                <div class="od-1 right-txt text-value outputPower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">평균 선간 전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-9">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-10">
                <div class="od-0 left-txt">평균 상 전류</div>
                <div class="od-1 right-txt text-value trLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
        </div>
        <div class="od-1 line-area">
            <div class="line" style="height: 220px;"></div>
        </div>
        <div class="od-2 txt" style="height: 230px;">
            <div class="od-0">
                <div class="od-0 left-txt">계통 주파수</div>
                <div class="od-1 right-txt text-value frequency">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">DC-Link 전압</div>
                <div class="od-1 right-txt text-value dcLinkVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">IGBT 온도 #1</div>
                <div class="od-1 right-txt text-value igbtTemperature1">-</div>
                <div class="od-2 unit">℃</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">IGBT 온도 #2</div>
                <div class="od-1 right-txt text-value igbtTemperature2">-</div>
                <div class="od-2 unit">℃</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">IGBT 온도 #3</div>
                <div class="od-1 right-txt text-value igbtTemperature3">-</div>
                <div class="od-2 unit">℃</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">AC 메인 전자접촉기</div>
                <div class="od-1 right-txt text-value acMainMcStatus-code" style="width: 70px;">-</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">DC 메인 전자접촉기</div>
                <div class="od-1 right-txt text-value dcMainMcStatus-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">비상정지 발생</div>
                <div class="od-1 right-txt text-value emergencyStopFlag-code" style="width: 70px;">-</div>
            </div>
        </div>
    </div>
</div>
<div class="layer elect instument f11 text-color" style="height: 310px;top: 365px;left: 830px;display: none">
    <div class="title">계통 - 전력 계전기</div>
    <div class="info">
        <div class="od-0 txt" style="height: 260px;">
            <div class="od-0">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 70px;color: #C00000;">통신 불가</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">R-S 선간 전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage">-</div>
                <div class="od-2 unit">V</div>

            </div>
            <div class="od-2">
                <div class="od-0 left-txt">S-T 선간 전압</div>
                <div class="od-1 right-txt text-value stLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">평균 선간 전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">평균 상 전류</div>
                <div class="od-1 right-txt text-value averagePhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">주파수</div>
                <div class="od-1 right-txt text-value frequency">-</div>
                <div class="od-2 unit" style="width: 20px;">Hz</div>
            </div>
        </div>
        <div class="od-1 line-area">
            <div class="line" style="height: 250px;"></div>
        </div>
        <div class="od-2 txt" style="height: 260px;">
            <div class="od-0">
                <div class="od-0 left-txt">R상 유효 전력</div>
                <div class="od-1 right-txt text-value rPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">S상 유효 전력</div>
                <div class="od-1 right-txt text-value sPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">T상 유효 전력</div>
                <div class="od-1 right-txt text-value tPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">총 유효 전력</div>
                <div class="od-1 right-txt text-value totalActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">R상 역전력</div>
                <div class="od-1 right-txt text-value rPhaseReversePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">S상 역전력</div>
                <div class="od-1 right-txt text-value sPhaseReversePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">T상 역전력</div>
                <div class="od-1 right-txt text-value tPhaseReversePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">총 역전력</div>
                <div class="od-1 right-txt text-value totalReversePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">과전압 릴레이 동작</div>
                <div class="od-1 right-txt text-value overVoltageRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">저전압 릴레이 동작</div>
                <div class="od-1 right-txt text-value underVoltageRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">과주파수 릴레이 동작</div>
                <div class="od-1 right-txt text-value overFrequencyRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">저주파수 릴레이 동작</div>
                <div class="od-1 right-txt text-value underFrequencyRelayAction-code" style="width: 70px;">-</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">역전력 릴레이 동작</div>
                <div class="od-1 right-txt text-value reversePowerRelayAction-code" style="width: 70px;">-</div>
            </div>
        </div>
    </div>
</div>
<div class="layer hub oneMeter instument f11 text-color" style="width:260px;height: 390px;top: 250px;left:1170px;display: none">
    <div class="title">EV 충전기 - 전력 계측기</div>
    <div class="info" style="width: 240px;">
        <div class="od-0 txt instument-1" style="width:240px; height: 340px;">
            <div class="od-0" style="width: 240px;">
                <div class="od-0 left-txt">계전기 번호</div>
                <div class="od-1 right-txt text-value meterNo" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-1" style="width: 240px;">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-2" style="width: 240px;">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-3" style="width: 240px;">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-4" style="width: 240px;">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-5" style="width: 240px;">
                <div class="od-0 left-txt">평균 선간전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-6" style="width: 240px;">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-7" style="width: 240px;">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-7" style="width: 240px;">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">N상 전류(중성선)</div>
                <div class="od-1 right-txt text-value nPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">G상 전류(접지선)</div>
                <div class="od-1 right-txt text-value gPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">평균 상 전류</div>
                <div class="od-1 right-txt text-value averagePhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">주파수</div>
                <div class="od-1 right-txt text-value frequency" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">Hz</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">R상 유효 전력</div>
                <div class="od-1 right-txt text-value rPhaseActivePower" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">S상 유효 전력</div>
                <div class="od-1 right-txt text-value sPhaseActivePower" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">T상 유효 전력</div>
                <div class="od-1 right-txt text-value tPhaseActivePower" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8" style="width: 240px;">
                <div class="od-0 left-txt">총 유효 전력</div>
                <div class="od-1 right-txt text-value totalActivePower" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
        </div>
    </div>
</div>
<div class="layer hub twoMeter instument f11 text-color" style="width:410px;height: 390px;top: 250px;left:1020px;display: none">
    <div class="title">EV 충전기 - 전력 계측기</div>
    <div class="info" style="width: 390px;">
        <div class="od-0 txt instument-1" style="height: 340px;">
            <div class="od-0">
                <div class="od-0 left-txt">계전기 번호</div>
                <div class="od-1 right-txt text-value meterNo" style="width: 70px;color: #C00000;"></div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 70px;color: #C00000;"></div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">평균 선간전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">N상 전류(중성선)</div>
                <div class="od-1 right-txt text-value nPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">G상 전류(접지선)</div>
                <div class="od-1 right-txt text-value gPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">평균 상 전류</div>
                <div class="od-1 right-txt text-value averagePhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">주파수</div>
                <div class="od-1 right-txt text-value frequency" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">Hz</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">R상 유효 전력</div>
                <div class="od-1 right-txt text-value rPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">S상 유효 전력</div>
                <div class="od-1 right-txt text-value sPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">T상 유효 전력</div>
                <div class="od-1 right-txt text-value tPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">총 유효 전력</div>
                <div class="od-1 right-txt text-value totalActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
        </div>
        <div class="od-1 line-area">
            <div class="line" style="height: 330px;"></div>
        </div>
        <div class="od-2 txt instument-2" style="height: 340px;">
            <div class="od-0">
                <div class="od-0 left-txt">계전기 번호</div>
                <div class="od-1 right-txt text-value meterNo" style="width: 70px;color: #C00000;"></div>
            </div>
            <div class="od-1">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 70px;color: #C00000;"></div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-2">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-3">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-4">
                <div class="od-0 left-txt">평균 선간전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage">-</div>
                <div class="od-2 unit">V</div>
            </div>
            <div class="od-5">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-6">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-7">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">N상 전류(중성선)</div>
                <div class="od-1 right-txt text-value nPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">G상 전류(접지선)</div>
                <div class="od-1 right-txt text-value gPhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">평균 상 전류</div>
                <div class="od-1 right-txt text-value averagePhaseCurrent">-</div>
                <div class="od-2 unit">A</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">주파수</div>
                <div class="od-1 right-txt text-value frequency" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">Hz</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">R상 유효 전력</div>
                <div class="od-1 right-txt text-value rPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">S상 유효 전력</div>
                <div class="od-1 right-txt text-value sPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">T상 유효 전력</div>
                <div class="od-1 right-txt text-value tPhaseActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
            <div class="od-8">
                <div class="od-0 left-txt">총 유효 전력</div>
                <div class="od-1 right-txt text-value totalActivePower" style="width: 50px;">-</div>
                <div class="od-2 unit" style="width: 20px;">kW</div>
            </div>
        </div>
    </div>
</div>
<div class="layer acConverter f11 text-color" style="width:260px;height: 230px;top: 390px;left:450px;display: none">
    <div class="title">AC CONVERTER</div>
    <div class="info" style="width: 240px;">
        <div class="od-0 txt instument-1" style="width:240px; height: 340px;">
            <div class="od-0" style="width: 240px;">
                <div class="od-0 left-txt">계전기 번호</div>
                <div class="od-1 right-txt text-value meterNo" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-1" style="width: 240px;">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-2" style="width: 240px;">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-3" style="width: 240px;">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-4" style="width: 240px;">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-5" style="width: 240px;">
                <div class="od-0 left-txt">평균 선간전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-6" style="width: 240px;">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-7" style="width: 240px;">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
        </div>
    </div>
</div>
<div class="layer dcConverter f11 text-color" style="width:260px;height: 230px;top: 250px;left:650px;display: none">
    <div class="title">DC CONVERTER</div>
    <div class="info" style="width: 240px;">
        <div class="od-0 txt instument-1" style="width:240px; height: 340px;">
            <div class="od-0" style="width: 240px;">
                <div class="od-0 left-txt">계전기 번호</div>
                <div class="od-1 right-txt text-value meterNo" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-1" style="width: 240px;">
                <div class="od-0 left-txt">통신 상태</div>
                <div class="od-1 right-txt text-value status-code" style="width: 130px;color: #C00000;"></div>
            </div>
            <div class="od-2" style="width: 240px;">
                <div class="od-0 left-txt">R-S 선간전압</div>
                <div class="od-1 right-txt text-value rsLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-3" style="width: 240px;">
                <div class="od-0 left-txt">S-T 선간전압</div>
                <div class="od-1 right-txt text-value stLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-4" style="width: 240px;">
                <div class="od-0 left-txt">T-R 선간전압</div>
                <div class="od-1 right-txt text-value trLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-5" style="width: 240px;">
                <div class="od-0 left-txt">평균 선간전압</div>
                <div class="od-1 right-txt text-value averageLineVoltage" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">V</div>
            </div>
            <div class="od-6" style="width: 240px;">
                <div class="od-0 left-txt">R상 전류</div>
                <div class="od-1 right-txt text-value rPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-7" style="width: 240px;">
                <div class="od-0 left-txt">S상 전류</div>
                <div class="od-1 right-txt text-value sPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
            <div class="od-7" style="width: 240px;">
                <div class="od-0 left-txt">T상 전류</div>
                <div class="od-1 right-txt text-value tPhaseCurrent" style="width: 110px;">-</div>
                <div class="od-2 unit" style="width: 20px;">A</div>
            </div>
        </div>
    </div>
</div>
<%--<div class="layer acInverterR f11 text-color" style="height: 260px;top: 390px;left:625px;display: none">--%>
<%--    <div class="title">Rack 1.</div>--%>
<%--    <div class="info">--%>
<%--        <div class="od-0 txt">--%>
<%--            <div class="od-0">--%>
<%--                <div class="od-0 left-txt">운영 상태</div>--%>
<%--                <div class="od-1 right-txt text-value operationStatus-code" style="width: 70px;color: #C00000;">통신 불가</div>--%>
<%--            </div>--%>
<%--            <div class="od-1">--%>
<%--                <div class="od-0 left-txt">운전 모드</div>--%>
<%--                <div class="od-1 right-txt text-value operationModeStatus-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-2">--%>
<%--                <div class="od-0 left-txt">SoC</div>--%>
<%--                <div class="od-1 right-txt text-value soc">-</div>--%>
<%--                <div class="od-2 unit">%</div>--%>
<%--            </div>--%>
<%--            <div class="od-3">--%>
<%--                <div class="od-0 left-txt">전압</div>--%>
<%--                <div class="od-1 right-txt text-value voltage">-</div>--%>
<%--                <div class="od-2 unit">V</div>--%>
<%--            </div>--%>
<%--            <div class="od-4">--%>
<%--                <div class="od-0 left-txt">평균 전류</div>--%>
<%--                <div class="od-1 right-txt text-value averageCurrent">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--            <div class="od-5">--%>
<%--                <div class="od-0 left-txt">전류 센서 #1</div>--%>
<%--                <div class="od-1 right-txt text-value currentSensor1">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--            <div class="od-6">--%>
<%--                <div class="od-0 left-txt">전류 센서 #2</div>--%>
<%--                <div class="od-1 right-txt text-value currentSensor2">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--            <div class="od-7">--%>
<%--                <div class="od-0 left-txt">평균 온도</div>--%>
<%--                <div class="od-1 right-txt text-value averageTemp">-</div>--%>
<%--                <div class="od-2 unit">℃</div>--%>
<%--            </div>--%>
<%--            <div class="od-8">--%>
<%--                <div class="od-0 left-txt">충전 제한 전류</div>--%>
<%--                <div class="od-1 right-txt text-value chargeCurrentLimit">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--            <div class="od-9">--%>
<%--                <div class="od-0 left-txt">방전 제한 전류</div>--%>
<%--                <div class="od-1 right-txt text-value dischargeCurrentLimit">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--        <div class="od-1 line-area">--%>
<%--            <div class="line"></div>--%>
<%--        </div>--%>
<%--        <div class="od-2 txt">--%>
<%--            <div class="od-0">--%>
<%--                <div class="od-0 left-txt">(+)극 전압 절연저항</div>--%>
<%--                <div class="od-1 right-txt text-value positiveVoltageResistance" style="width: 45px;">-</div>--%>
<%--                <div class="od-2 unit" style="width: 25px;">MΩ</div>--%>
<%--            </div>--%>
<%--            <div class="od-1">--%>
<%--                <div class="od-0 left-txt">(−)극 전압 절연저항</div>--%>
<%--                <div class="od-1 right-txt text-value negativeVoltageResistance" style="width: 45px;">-</div>--%>
<%--                <div class="od-2 unit" style="width: 25px;">MΩ</div>--%>
<%--            </div>--%>
<%--            <div class="od-2">--%>
<%--                <div class="od-0 left-txt">(+)극 메인 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value positiveMainRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-3">--%>
<%--                <div class="od-0 left-txt">(+)극 메인 릴레이 접점</div>--%>
<%--                <div class="od-1 right-txt text-value positiveMainRelayContact-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-4">--%>
<%--                <div class="od-0 left-txt">(−)극 메인 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value negativeMainRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-5">--%>
<%--                <div class="od-0 left-txt">(−)극 메인 릴레이 접점</div>--%>
<%--                <div class="od-1 right-txt text-value negativeMainRelayContact-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-6">--%>
<%--                <div class="od-0 left-txt">비상정지 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value emergencyRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-7">--%>
<%--                <div class="od-0 left-txt">비상정지 릴레이 접점</div>--%>
<%--                <div class="od-1 right-txt text-value emergencyRelayContact-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-8">--%>
<%--                <div class="od-0 left-txt">사전충전 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value prechargeRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</div>--%>
<%--<div class="layer dcInverterR f11 text-color" style="height: 150px;top: 265px;left:810px;display: none">--%>
<%--    <div class="title">Rack 1.</div>--%>
<%--    <div class="info">--%>
<%--        <div class="od-0 txt" style="height: 100px;">--%>
<%--            <div class="od-0">--%>
<%--                <div class="od-0 left-txt">운영 상태</div>--%>
<%--                <div class="od-1 right-txt text-value operationStatus-code" style="width: 70px;color: #C00000;">통신 불가</div>--%>
<%--            </div>--%>
<%--            <div class="od-1">--%>
<%--                <div class="od-0 left-txt">운전 모드</div>--%>
<%--                <div class="od-1 right-txt text-value operationModeStatus-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-2">--%>
<%--                <div class="od-0 left-txt">SoC</div>--%>
<%--                <div class="od-1 right-txt text-value soc">-</div>--%>
<%--                <div class="od-2 unit">%</div>--%>
<%--            </div>--%>
<%--            <div class="od-3">--%>
<%--                <div class="od-0 left-txt">전압</div>--%>
<%--                <div class="od-1 right-txt text-value voltage">-</div>--%>
<%--                <div class="od-2 unit">V</div>--%>
<%--            </div>--%>
<%--            <div class="od-4">--%>
<%--                <div class="od-0 left-txt">평균 전류</div>--%>
<%--                <div class="od-1 right-txt text-value averageCurrent">-</div>--%>
<%--                <div class="od-2 unit">A</div>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--        <div class="od-1 line-area">--%>
<%--            <div class="line" style="height: 100px;"></div>--%>
<%--        </div>--%>
<%--        <div class="od-2 txt" style="height: 100px;">--%>
<%--            <div class="od-0">--%>
<%--                <div class="od-0 left-txt">(+)극 전압 절연저항</div>--%>
<%--                <div class="od-1 right-txt text-value positiveVoltageResistance" style="width: 45px;">-</div>--%>
<%--                <div class="od-2 unit" style="width: 25px;">MΩ</div>--%>
<%--            </div>--%>
<%--            <div class="od-1">--%>
<%--                <div class="od-0 left-txt">(−)극 전압 절연저항</div>--%>
<%--                <div class="od-1 right-txt text-value negativeVoltageResistance" style="width: 45px;">-</div>--%>
<%--                <div class="od-2 unit" style="width: 25px;">MΩ</div>--%>
<%--            </div>--%>
<%--            <div class="od-2">--%>
<%--                <div class="od-0 left-txt">(+)극 메인 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value positiveMainRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-3">--%>
<%--                <div class="od-0 left-txt">(+)극 메인 릴레이 접점</div>--%>
<%--                <div class="od-1 right-txt text-value positiveMainRelayContact-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--            <div class="od-4">--%>
<%--                <div class="od-0 left-txt">(−)극 메인 릴레이 동작</div>--%>
<%--                <div class="od-1 right-txt text-value negativeMainRelayAction-code" style="width: 70px;">-</div>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</div>--%>
<!-- 레이어 팝업 끝 -->