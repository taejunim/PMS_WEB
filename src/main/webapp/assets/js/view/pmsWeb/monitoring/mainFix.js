var fnObj = {};
var soc1 = '';
var soc2 = '';

/*장비 상태에 따라 제어값전송을 하기위한 변수*/
var pcs_operation = '';
var rack_0_operationStatus = '';
var rack_1_operationStatus = '';
var air_operation = '';

/*에러 목록 비교를 위한 변수*/
var pcsErrorList = {};
var battery1ErrorList = {};
var battery2ErrorList = {};
var sensorErrorList = {};
var airErrorList = {};

var controlFlag = "";

var ACTIONS = axboot.actionExtend(fnObj, {
    /* 제어 자동,수동 여부 표출 */
    PAGE_SEARCH2: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/monitoring", "selectAutoControlFlag"],
            data: {essCode: essCode},
            callback: function (res) {
                if (res.map.essStatus != null) {

                    controlFlag = res.map.essStatus.autoControlFlag;

                    if (controlFlag == 'Y') {
                        $("#auto").addClass('purple-btn-skin-outline');
                        $("#manual").removeClass('purple-btn-skin-outline');
                    } else if (controlFlag == 'N') {
                        $("#manual").addClass('purple-btn-skin-outline');
                        $("#auto").removeClass('purple-btn-skin-outline');
                    } else {
                    }
                }
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            },
            async: true
        });
        return false;
    },
    /* ESS 운영 일정 목록 조회 */
    PAGE_SEARCH3: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/monitoring", "/selectOperationSchedule"],
            data: {},
            callback: function (res) {
                if (res.map.list != null) {

                    $.each(res.map.list, function (index, item) {
                        $("#" + index).text(item);
                    });

                } else {
                    $("#chargeCount, #completedChargeCount, #dischargeCount, #completedDischargeCount ").text('0');
                }
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }, nomask: false
            }
        });
        return false;
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    // ess 알림창
    getEssAlert();

    // 명령어 코드 세팅
    selectCommandList();

    // 누적 전력량
    getEssInfo();

    // 시간 표시
    resetNowDate("timer");

    // 차트 세팅
    barChart();
    gaugeChart('gaugeChart', 0);
    donutChart('socData', 20);
    donutChart('rack1Data', 15);
    donutChart('rack2Data', 15);

    // 운영 통계
    getOperatingStats();

    // 오류 이력
    getDeviceErrorHistory();

    // 계통도 레이어
    $(".genealogy div").on("mouseover", function () {
        $("." + $(this).attr("id")).show();
    });
    $(".genealogy div").on("mouseout", function () {
        $("." + $(this).attr("id")).hide();
    });

    // 계통도 미터기 레이어
    if (essCode === 'E002') {
        $(".oneMeter").remove();
    } else {
        $(".twoMeter").remove();
    }

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2);
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH3);
}


/**
 * 제어 명령어 목록 담기
 */
function setCommandList() {
    drawControlButton("auto-control", controlList.filter(obj => obj.data1 == '90'), false);
    drawControlButton("pcs-control", controlList.filter(obj => obj.data1 == '02'), false);
    drawControlButton("rack1-control", controlList.filter(obj => obj.deviceCode == '010101'), true, codeList.filter(obj => obj.data1 == '01'));
    drawControlButton("rack2-control", controlList.filter(obj => obj.deviceCode == '010102'), true, codeList.filter(obj => obj.data1 == '01'));
    drawControlButton("bms-room", controlList.filter(obj => obj.deviceCode == '800101'), true, codeList.filter(obj => obj.data1 == '80'));
    drawControlButton("pcs-room", controlList.filter(obj => obj.deviceCode == '800102'), true, codeList.filter(obj => obj.data1 == '80'));
    getStatusDataCode(codeList);

}


/**
 * 제어 설정
 * @param status    {Boolean}   :: true - 응답값 실패, false - 제어 전송
 * @param data      {Object}    :: 제어데이터 - controlData
 * @returns {boolean}
 */
function rollBackUpdate(status, data) {
    $.ajax({
        type: "POST",
        url: '/monitoring/rollBackUpdate',
        data: {autoControlFlag: data.autoControlFlag, essCode: essCode},
        dataType: "JSON",
        success: function (res) {

            if (status) {
                // 제어요청 응답값이 실패일 때
                alertMessage("ESS 제어 설정 실패", "ESS 제어 설정에 실패하였습니다.\n 잠시 후 다시 시도 바랍니다.");

            } else {

                if (res.apiResponse.status === 0) { //성공시 제어 전송

                    sendControldData(data);

                } else {

                    alertMessage("ESS 제어 설정 오류", "ESS 제어 설정 변경 중 오류가 발생하였습니다.\n 잠시 후 다시 시도 바랍니다.");

                }
            }
        },
        async: false
    });
    return false;
}


/**
 * 제어설정 응답값 성공 시
 */
function controlSuccess() {
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2);
    alertMessage("ESS 제어 설정 성공", "ESS 제어 설정에 성공하였습니다.");
}


/**
 * 설정 온도 버튼 제어
 * @param classId   {String}    bms실, pcs실 구분값
 * @param sign      {Boolean}   true - 증가 , false - 감소 구분값
 *
 * ---에어컨 상태값이 들어올때 제어 가능
 * ---온도 16도 ~ 30도 제한, 버튼으로만 제어 가능
 */
function controlStepper(classId, sign) {
    var className = $("." + classId + "-room .setTemperature");
    var minTemp = 16;
    var maxTemp = 30;
    var data = "";
    var beforeValue = parseInt($(className).val());
    var afterValue = "";

    if (sign) {
        data = beforeValue + 1;
        afterValue = (maxTemp >= data ? data : beforeValue);
    } else {
        data = beforeValue - 1;
        afterValue = (minTemp <= data ? data : beforeValue);
    }

    $(className).val(afterValue + " ℃");
    $(className).attr("controlValue", afterValue * 10);

    // 선택 시 제어
    checkControlData("temp", $(className));
}


/**
 * 설정 온도 입력 값 제어 - onKeyup
 * @param classId   {String}    :: bms, pcs 구분값
 * @param data      {Object}
 */
function keyUpEvent(classId, data) {
    var className = $("." + classId + "-room .setTemperature");
    var pattern1 = /[^0-9]/g;
    var value = parseInt(data.value.replace(pattern1, ''));

    if (window.event.keyCode == 13) {
        if (value >= 16 && value <= 30) {

            $(className).val(value);
            $(className).attr("controlValue", value * 10);

            checkControlData("temp", $(className));

            $(className).val(value + "℃");

        } else {
            parent.axToast.push("설정온도는 16℃ ~ 30℃ 사이 입력 가능합니다.");

            var temp = "";

            if (classId === "bms") {
                temp = bmsAirData.temp;
            } else {
                temp = pcsAirData.temp;
            }

            $(className).val(temp + "℃");
        }
    }
}


/**
 * 설정 온도 입력 값 제어 - onBlur
 * @param classId   {String}    :: bms, pcs 구분값
 * @param data      {Object}
 * @returns {string}
 */
function blurEvent(classId, data) {
    var pattern1 = /[^0-9]/g;
    var value = parseInt(data.value.replace(pattern1, ''));

    if (value < 16 || value > 30 || value === "" || isNaN(value)) {

        var temp = "";

        if (classId === "bms") {
            temp = bmsAirData.temp;
        } else {
            temp = pcsAirData.temp;
        }

        value = temp;

        parent.axToast.push("설정온도는 16℃ ~ 30℃ 사이 입력 가능합니다.");
    }

    return value + "℃";
}

/**
 * 제어 버튼 상태 표출
 * @param reset {Boolean} :: true - 적용된 클래스 전체 삭제, false = 기본상태 되돌리기
 */
function resetPcsBtn (reset) {
    var classId = ".pcs-control .w-btn-outline";

    if (reset) {

        $(classId).removeClass("purple-btn-skin-outline");
        $(classId).removeClass("w-btn-gray-skin-outline");
        $(classId).removeClass("orange-btn-skin-outline");
        $(classId).removeClass("blue-btn-skin-outline");
        $(classId).removeClass("w-btn-yellow-skin-outline");
        $(classId).removeClass("red-btn-skin-outline");
        $(classId).removeClass("w-btn-default-skin-outline");

    } else {

        $(classId).addClass("w-btn-default-skin-outline");

    }

    $(classId).attr("disabled", true);
}


/**
 * PCS 연결
 * @param {Object} data data 없을 시 FAIL 처리
 */
function pcsConnection(data) {
    if (data != null) {
        var operationStatus = data.operationStatus;
        var operationModeStatus = data.operationModeStatus;
        var outputPower = Math.abs(data.outputPower);
        let errorList = data.errorList;

        if (data.errorFlag === 'Y') {
            if (JSON.stringify(errorList) != JSON.stringify(pcsErrorList)) {
                getDeviceErrorHistory();
            }
        }

        pcsErrorList = errorList;
        pcs_operation = operationStatus;

        //ess 총 누적 전력량
        $('#sumCharge').text(insertCommas(data.energyStatus.totalAccumulated.charge));
        $('#sumDisCharge').text(insertCommas(data.energyStatus.totalAccumulated.discharge));

        //실시간 누적 전력량
        updateChart("currentAccumulated", data.energyStatus.currentAccumulated, operationStatus, operationModeStatus);
        $('#currentBattery').text(data.energyStatus.currentBattery);

        if (operationModeStatus === "1") {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedDischarge-progress totalAccumulated").addClass("totalAccumulatedCharge-progress");
        } else if (operationModeStatus === "2") {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedCharge-progress totalAccumulated-progress").addClass("totalAccumulatedDischarge-progress");
        } else {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedCharge-progress totalAccumulatedDischarge-progress").addClass("totalAccumulated-progress");
        }

        //pcs 운영상태
        //IGBT 온도
        $("#progress1").val(data.igbtTemperature1);
        $("#progress2").val(data.igbtTemperature2);
        $("#progress3").val(data.igbtTemperature3);

        // gaugeChart
        updateChart('gaugeChart', outputPower, operationStatus, operationModeStatus);

        //계통도 상태
        if (operationStatus !== '12') {
            addRemoveClass('', 'chargeActive');
            addRemoveClass('', 'dischargeActive');
        }

        // pcs 버튼 상태
        switch (operationStatus) {
            case "07":  // 미준비

                resetPcsBtn(true);

                $(".c0200").addClass("purple-btn-skin-outline").attr("disabled", false);
                $(".c0203").addClass("red-btn-skin-outline").attr("disabled", false);

                break;
            case "09":  // 연결해제

                resetPcsBtn(true);

                resetPcsBtn(false);

                break;
            case "11":  // 정지
                resetPcsBtn(true);

                $(".c0200, .c0201").addClass("purple-btn-skin-outline").attr("disabled", false);
                $(".c0203").addClass("red-btn-skin-outline").attr("disabled", false);

                break;
            case "12":  // 운전
                resetPcsBtn(true);

                switch (operationModeStatus) {
                    case '1':
                        $(".c0202, .c0200").addClass("purple-btn-skin-outline").attr("disabled", false);
                        $(".c0204, .c0206").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                        $(".c0205").addClass("blue-btn-skin-outline").attr("disabled", true);

                        addRemoveClass('chargeActive', 'dischargeActive');
                        break;
                    case "2":
                        $(".c0202, .c0200").addClass("purple-btn-skin-outline").attr("disabled", false);
                        $(".c0204, .c0205").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                        $(".c0206").addClass("orange-btn-skin-outline").attr("disabled", true);

                        addRemoveClass('dischargeActive', 'chargeActive');
                        $("#defaultLine, #hubDisChargeLine").addClass("dischargeActive");
                        break;
                    default:
                        //대기
                        $(".c0202, .c0200").addClass("purple-btn-skin-outline").attr("disabled", false);
                        $(".c0205, .c0206").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                        $(".c0204").addClass("w-btn-yellow-skin-outline").attr("disabled", true);

                        addRemoveClass('', 'chargeActive');
                        addRemoveClass('', 'dischargeActive');
                        break;
                }

                $(".c0203").addClass("red-btn-skin-outline").attr("disabled", false);

                break;
            case "13":  // 비상정지
                resetPcsBtn();

                $(".c0200").addClass("purple-btn-skin-outline").attr("disabled", false);
                $(".c0203").addClass("red-btn-skin-outline").attr("disabled", false);

                break;
            default:
                break;
        }

        $(".pcs .text-value").css("color", "#D1FD00");

        //데이터 표출
        $.each(data, function (index, item) {

            $("#" + index).text(item);
            $(".pcs" + " ." + index).text(item);

            if (codeList.find(obj => obj.code === item) !== undefined) {
                $(".pcs" + " ." + index + "-code").text(codeList.find(obj => obj.code === item).name);
                $(".pcs" + " ." + index + "-code").css("color", getName("code", item).get("color"));
            }

        });

        setInverterStatus(".status-17 .layout-01 .frame-02", operationModeStatus, true);
        setInverterStatus(".status-17 .layout-01 .frame-02", operationStatus, false);

    } else {
        pcs_operation = "";
        pcsErrorList = "";

        $('.currentAccumulated').css("color", '#575757');
        $('#currentAccumulatedProgress').removeClass("totalAccumulatedCharge-progress totalAccumulatedDischarge-progress").addClass("totalAccumulated-progress");
        $("#minusEnd").text('95');
        $('#currentAccumulatedName').text("통신 불가");
        $(".status-17 .text-value").text('-');
        $('#currentAccumulatedValue, #currentBattery, #sumCharge, #sumDisCharge').text('0');
        $('#currentAccumulatedProgress, #progress1, #progress2, #progress3').val("0");

        $(".pcs .text-value").text("-").css("color", "#BFBFBF");
        $(".pcs .operationStatus-code").text("통신 불가").css("color", "#C00000");

        updateChart('gaugeChart', 0, '100');
        addRemoveClass('', 'chargeActive');
        addRemoveClass('', 'dischargeActive');

        $(".status-17 .layout-01 .frame-02 .mode-status").attr("src", "/assets/images/main/status/0-disable.png");
        $(".status-17 .layout-01 .frame-02 .op-status").attr("src", "/assets/images/main/status/100-enable.png");
        $(".status-17 .layout-01 .frame-02 .fault-status").attr("src", "/assets/images/main/status/98-disable.png");
        $(".status-17 .layout-01 .frame-02 .warning").attr("src", "/assets/images/main/status/99-disable.png");

        resetPcsBtn(true);
        resetPcsBtn(false);
    }
}


/**
 * BATTERY 연결
 * @param {Object} data data 없을 시 FAIL 처리
 */
function batteryRackConnection(data) {
    if (data != null) {
        var operationStatus = data.operationStatus;
        var operationModeStatus = data.operationModeStatus;
        var rackCode = data.rackCode;
        var rackId = '';
        let errorList = data.errorList;

        if (rackCode == '010101') {
            rackId = '1';
            rack_0_operationStatus = operationStatus;
            soc1 = data.soc;

            if (data.errorFlag === 'Y') {
                if (JSON.stringify(errorList) != JSON.stringify(battery1ErrorList)) {
                    getDeviceErrorHistory();
                }
            }

            battery1ErrorList = errorList;

        } else if (rackCode == '010102') {
            rackId = '2';
            rack_1_operationStatus = operationStatus;
            soc2 = data.soc;

            if (data.errorFlag === 'Y') {
                if (JSON.stringify(errorList) != JSON.stringify(battery2ErrorList)) {
                    getDeviceErrorHistory();
                }
            }

            battery2ErrorList = errorList;
        }

        //ess 계통현황
        if (operationStatus === '08') {
            switch (operationModeStatus) {
                case '1':
                    $("#rack" + rackId + "Line").removeClass('dischargeActive');
                    $("#rack" + rackId + "Line").addClass('chargeActive');
                    break;
                case "2":
                    $("#rack" + rackId + "Line").removeClass('chargeActive');
                    $("#rack" + rackId + "Line").addClass('dischargeActive');
                    break;
                default:
                    $("#rack" + rackId + "Line").removeClass('chargeActive');
                    $("#rack" + rackId + "Line").removeClass('dischargeActive');
                    $("#rack" + rackId + "Line").css("z-index", '3');
                    break;
            }
        } else {
            $("#rack" + rackId + "Line").removeClass('chargeActive');
            $("#rack" + rackId + "Line").removeClass('dischargeActive');
        }

        //배터리 평균 soc 차트 데이터
        if (rack_0_operationStatus === '08' && rack_1_operationStatus === '08') {
            if (Number(soc1) > 0 && Number(soc2) > 0) {
                updateChart('socData', (Number(soc1) + Number(soc2)) / 2, '08', operationModeStatus);
            } else {
                if (Number(soc1) > 0) {
                    updateChart('socData', Number(soc1), '08', operationModeStatus);
                } else {
                    updateChart('socData', Number(soc2), '08', operationModeStatus);
                }
            }
        } else if (rack_0_operationStatus != '08' && rack_1_operationStatus === '08') {
            updateChart('socData', Number(soc2), '08', operationModeStatus);
        } else if (rack_0_operationStatus === '08' && rack_1_operationStatus != '08') {
            updateChart('socData', Number(soc1), '08', operationModeStatus);
        } else {
            updateChart('socData', 0, '100', operationModeStatus);
        }

        //배터리 운영 상태 rack chart
        updateChart('rack' + rackId + 'Data', data.soc, operationStatus, operationModeStatus);

        $(".rack" + rackId + " .text-value").css("color", "#D1FD00");
        $(".rack" + rackId + " .title").text(getName("device", data.rackCode).get("deviceName"));

        //데이터 표출
        $.each(data, function (index, item) {

            if (index != "moduleSummary") {
                $("#rack" + rackId + index).text(item);
                $(".rack" + rackId + " ." + index).text(index === "positiveVoltageResistance" || index === "negativeVoltageResistance" ? (Number(item) / 1000000) : item);

                if (codeList.find(obj => obj.code === item) !== undefined) {
                    $(".rack" + rackId + " ." + index + "-code").text(codeList.find(obj => obj.code === item).name);
                    $(".rack" + rackId + " ." + index + "-code").css("color", getName("code", item).get("color"));
                }
            } else {

                $.each(item, function (ix, im) {
                    $("#rack" + rackId + ix).text(im);
                    $("." + ix).text(im);
                });
            }

        });

    } else {
        rack_0_operationStatus = "";
        rack_1_operationStatus = "";
        battery1ErrorList = "";
        battery2ErrorList = "";

        updateChart('socData', 0, '100');
        updateChart('rack1Data', 0, '100');
        updateChart('rack2Data', 0, '100');

        $(".rack1 .text-value, .rack2 .text-value").text("-").css("color", "#BFBFBF");
        $(".rack1 .operationStatus-code, .rack2 .operationStatus-code").text("통신 불가").css("color", "#C00000");

        $('.status-16 .text-value, .status-12 .text-value').text('-');

        $("#rack1Line, #rack2Line").removeClass('chargeActive dischargeActive');
    }
}


/**
 * 충방전 상태에 따른 ESS 계통현황흐름
 * @param {String} addClass
 * @param {String} removeClass
 */
function addRemoveClass(addClass, removeClass) {
    $("#pcsLine").removeClass(removeClass);
    $("#smartLine").removeClass(removeClass);
    $("#defaultLine").removeClass(removeClass);
    $("#electricChargeLine").removeClass(removeClass);
    $("#hubDisChargeLine").removeClass(removeClass);

    $("#pcsLine").addClass(addClass);
    $("#smartLine").addClass(addClass);
    $("#electricChargeLine").addClass(addClass);
}


//금일 일정 목록 불러오기 (일정관리 화면에서 등록, 수정, 취소시 화면에 보여지는 값 바꿔주기 위함
function reloadSchedule() {
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH3);
}