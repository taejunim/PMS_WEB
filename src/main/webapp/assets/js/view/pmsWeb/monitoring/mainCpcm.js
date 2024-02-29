var fnObj = {};
var soc1 = '';
var soc2 = '';

/*장비 상태에 따라 제어값전송을 하기위한 변수*/
var cpcm_operation = '';
var rack_0_operationStatus = '';
var rack_1_operationStatus = '';
var air_operation = '';

var setCurrentValue = "";
var setOperationMode = '';
var inverterStatus = false;

/*에러 목록 비교를 위한 변수*/
var cpcmErrorList = {};
var dcErrorList = {};
var battery1ErrorList = {};
var battery2ErrorList = {};
var sensorErrorList = {};
var airErrorList = {};

/*M/W 통신 확인용 변수*/
var controlFlag = "";


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

    // 운영 현황
    getOperatingStats();

    // 차트 세팅
    gaugeChart('gridChart', 0);
    gaugeChart('lGridChart', 0);
    gaugeChart('rGridChart', 0);
    gaugeChart('convertChart', 0);
    gaugeChart('leftInverterChart', 0);
    gaugeChart('rightInverterChart', 0);
    donutChart('socData', 20);
    donutChart('rack1Data', 15);
    donutChart('rack2Data', 15);

    // 오류 이력
    getDeviceErrorHistory();

    // 계통도 레이어
    $(".genealogy .hover").on("mouseover", function () {
        $("." + $(this).attr("id")).css("backdrop-filter", "blur(100px)");

        if ($(this).attr("id") === "rack1") {
            $("." + $(this).attr("id")).css("left", "150px");
        } else if ($(this).attr("id") === "rack2") {
            $("." + $(this).attr("id")).css("left", "250px").css("top","260px");
        }

        $("." + $(this).attr("id")).show();
    });
    $(".genealogy .hover").on("mouseout", function () {
        $("." + $(this).attr("id")).hide();
    });
}


/**
 * 제어 명령어 목록 담기
 */
function setCommandList() {

    drawControlButton("cpcm-control", controlList.filter(obj => obj.data1 === '03'), false);
    drawControlButton("rack1-control", controlList.filter(obj => obj.deviceCode === '010101'), true, codeList.filter(obj => obj.data1 === '01'));
    drawControlButton("rack2-control", controlList.filter(obj => obj.deviceCode === '010102'), true, codeList.filter(obj => obj.data1 === '01'));
    drawControlButton("bms-room", controlList.filter(obj => obj.deviceCode === '800201'), true, codeList.filter(obj => obj.data1 === '80'));
    drawControlButton("pcs-room", controlList.filter(obj => obj.deviceCode === '800202'), true, codeList.filter(obj => obj.data1 === '80'));
    getStatusDataCode(codeList);

}


/**
 * CPCM 연결
 * @param {Object} data data 없을 시 FAIL 처리
 */
function cpcmConnection(data) {
    if (data != null) {
        var operationStatus = data.operationStatus;
        var operationModeStatus = data.operationModeStatus;
        let errorList = data.errorList;
        var statusColor = "";

        setOperationMode = data.setOperationMode;

        inverterStatus = data.leftInverter.inverterStatus === "12" && setOperationMode !== "3 ? true : false";

        if (data.errorFlag === 'Y') {
            if (JSON.stringify(errorList) !== JSON.stringify(cpcmErrorList)) {
                getDeviceErrorHistory();
            }
        }

        cpcmErrorList = errorList;
        cpcm_operation = operationStatus;

        //ess 총 누적 전력량
        $('#sumCharge').text(insertCommas(data.energyStatus.totalAccumulated.charge));
        $('#sumDisCharge').text(insertCommas(data.energyStatus.totalAccumulated.discharge));

        //실시간 누적 전력량
        updateChart("currentAccumulated", data.energyStatus.currentAccumulated, operationStatus, operationModeStatus);
        $('#currentBattery').text(insertCommas(data.energyStatus.currentBattery));

        if (operationModeStatus === "1") {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedDischarge-progress totalAccumulated").addClass("totalAccumulatedCharge-progress");
        } else if (operationModeStatus === "2") {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedCharge-progress totalAccumulated-progress").addClass("totalAccumulatedDischarge-progress");
        } else {
            $("#currentAccumulatedProgress").removeClass("totalAccumulatedCharge-progress totalAccumulatedDischarge-progress").addClass("totalAccumulated-progress");
        }

        //AC/DC 컨버터
        $('.grid-area .power-value > span').text(data.totalPower);
        $('.grid-area .totalActiveCurrent').text(data.totalActiveCurrent);
        $('.grid-area .totalVoltage').text(data.totalVoltage);

        $('#internalTemp').val(data.internalTemp);
        $('#internalTempValue').text(data.internalTemp);
        $('#transformerTemp').val(data.transformerTemp);
        $('#transformerTempValue').text(data.transformerTemp);

        if (data.setCurrent !== setCurrentValue) {
            $('#electricCurrent').val(data.setCurrent);
            setCurrentValue = data.setCurrent;
        }

        updateChart("gridChart", data.totalPower, operationStatus, operationModeStatus);
        updateChart("gridChart", data.totalPower, operationStatus, operationModeStatus);
        setInverterStatus(".grid-area .state", operationModeStatus, true);
        setInverterStatus(".grid-area .state", operationStatus, false);

        // 좌측 인버터 데이터 표출
        $.each(data.leftInverter, function (index, item) {

            $(".l-grid-frame" + " ." + index).text(item);
            $(".left-inverter-data" + " ." + index).text(item);

        });

        updateChart("lGridChart", data.leftInverter.power, operationStatus, operationModeStatus);
        setInverterStatus(".l-grid-area .state", data.leftInverter.modeStatus, true);
        setInverterStatus(".l-grid-area .state", data.leftInverter.inverterStatus, false);

        // 우측 인버터 데이터 표출
        $.each(data.rightInverter, function (index, item) {

            $(".r-grid-frame" + " ." + index).text(item);
            $(".right-inverter-data" + " ." + index).text(item);

        });

        updateChart("rGridChart", data.rightInverter.power, operationStatus, operationModeStatus);
        setInverterStatus(".r-grid-area .state", data.rightInverter.modeStatus, true);
        setInverterStatus(".r-grid-area .state", data.rightInverter.inverterStatus, false);

        //버튼상태
        switch (setOperationMode) {
            case "3" :

                removeBtn(true);
                $(".c0300").addClass("w-btn-yellow-skin-outline").attr("disabled", false);
                $(".c0301, .c0302").addClass("w-btn-gray-skin-outline").attr("disabled", false);

                break;
            case "1" :
            case "2" :
                removeBtn(true);

                if (setOperationMode === "1") {
                    $("#electricCurrent").attr("disabled", false);

                    $(".c0301").addClass("blue-btn-skin-outline").attr("disabled", false);
                    $(".c0302").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                    $(".c0305").addClass("purple-btn-skin-outline").attr("disabled", false);

                } else {

                    $(".c0301").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                    $(".c0302").addClass("orange-btn-skin-outline").attr("disabled", false);
                    $(".c0305").addClass("w-btn-default-skin-outline").attr("disabled", true);
                }

                $(".c0300").addClass("w-btn-gray-skin-outline").attr("disabled", false);
                $(".c0303, .c0307").addClass("purple-btn-skin-outline").attr("disabled", false);

                if (data.leftInverter.inverterStatus === "12" || data.rightInverter.inverterStatus === "12") {
                    $("#electricCurrent").attr("disabled", false);
                    $(".c0300").removeClass("w-btn-gray-skin-outline").addClass("w-btn-default-skin-outline").attr("disabled", false);

                    if (setOperationMode === "1") {
                        $(".c0302").removeClass("w-btn-gray-skin-outline").addClass("w-btn-default-skin-outline").attr("disabled", false);
                    } else {
                        $(".c0301").removeClass("w-btn-gray-skin-outline").addClass("w-btn-default-skin-outline").attr("disabled", false);
                    }

                    $(".c0305").removeClass("w-btn-default-skin-outline").addClass("purple-btn-skin-outline").attr("disabled", false);

                    if (data.leftInverter.inverterStatus === "12") {
                        removeBtn(false);
                        $(".c0307, .c0310").addClass("w-btn-default-skin-outline").attr("disabled", true);
                        $(".c0308 , .c0309").addClass("purple-btn-skin-outline").attr("disabled", false);
                    }

                    if (data.rightInverter.inverterStatus === "12") {
                        removeBtn(false);
                        $(".c0307, .c0308, .c0309").addClass("w-btn-default-skin-outline").attr("disabled", true);
                        $(".c0310").addClass("purple-btn-skin-outline").attr("disabled", false);
                    }
                }
                break;
            default:
                break;
        }

        $(".c0306").attr("disabled", false);

        //계통도 상태
        if (operationStatus === "12") {
            if (operationModeStatus === "1") {
                statusColor = "border-charge-color";
            } else {
                $(".ac_0, .ac_1, .ac_2").removeClass("border-charge-color");
            }

            if (operationModeStatus === "2") {
                statusColor = "border-discharge-color";
            } else {
                $(".ac_0, .ac_1, .ac_2").removeClass("border-discharge-color");
            }

            $(".ac_0").addClass(statusColor);

            if (data.leftInverter.modeStatus === "04" && data.leftInverter.inverterStatus === "12") {
                $(".ac_2").addClass(statusColor);
            } else {
                $(".ac_2").removeClass("border-charge-color").removeClass("border-discharge-color");
            }

            if (data.rightInverter.modeStatus === "04" && data.rightInverter.inverterStatus === "12") {
                $(".ac_1").addClass(statusColor);
            } else {
                $(".ac_1").removeClass("border-charge-color").removeClass("border-discharge-color");
            }
        } else {
            $(".ac_0, .ac_1, .ac_2").removeClass("border-charge-color").removeClass("border-discharge-color");
        }

    } else {
        cpcm_operation = "";

        $(".c0306").attr("disabled", true);

        $('#currentAccumulatedProgress').val(0);
        $('#currentAccumulatedProgress').removeClass("totalAccumulatedCharge-progress totalAccumulatedDischarge-progress").addClass("totalAccumulated-progress");
        $('#internalTemp').val(0);
        $('#transformerTemp').val(0);

        $('.status-02 .layout-00').css("color",'#575757');;
        $('#currentAccumulatedName').text("통신 불가");
        $('.status-02 #currentAccumulatedValue, .status-02 #currentBattery').text("0");
        $('.status-06 .layout-00 span, .status-06 .layout-01 span').text("-");

        updateChart("gridChart",0,'100');
        updateChart("lGridChart",0,'100');
        updateChart("rGridChart",0,'100');

        $(".grid-area .state .mode-status").attr("src", "/assets/images/main/status/0-disable.png");
        $(".grid-area .state .op-status").attr("src", "/assets/images/main/status/100-enable.png");
        $(".l-grid-area .state .fault-status, .r-grid-area .state .fault-status").attr("src", "/assets/images/main/status/98-disable.png");
        $(".grid-area .state .warning-status, .l-grid-area .state .warning-status, .r-grid-area .state .warning-status").attr("src", "/assets/images/main/status/99-disable.png");
        $(".l-grid-area .state .mode-status, .r-grid-area .state .mode-status, .l-grid-area .state .op-status, .r-grid-area .state .op-status").attr("src", "/assets/images/main/status/11-disable.png");

        $(".status-06 .layout-02 button").removeClass("purple-btn-skin-outline orange-btn-skin-outline blue-btn-skin-outline w-btn-yellow-skin-outline w-btn-gray-skin-outline").addClass("w-btn-default-skin-outline").attr("disabled",true);
        $(".ac_0, .ac_1, .ac_2").removeClass("border-charge-color").removeClass("border-discharge-color");
    }
}


/**
 * DC/DC 컨버터 연결
 * @param {Object} data data 없을 시 FAIL 처리
 */
function dcConnection(data) {
    if (data != null) {
        var operationStatus = data.operationStatus;
        var modeStatus = (operationStatus === "12"? "2" : "0");
        let errorList = data.errorList;
        var statusColor = "border-discharge-color";

        if (data.errorFlag === 'Y') {
            if (JSON.stringify(errorList) !== JSON.stringify(dcErrorList)) {
                getDeviceErrorHistory();
            }
        }

        dcErrorList = errorList;

        // DC/DC 컨버터 운영 데이터 표출
        $.each(data, function (index, item) {
            $(".status-09 .layout-03" + " ." + index).text(item);
        });

        $('.status-09 .layout-01 .power-value > span').text(data.convertDcPower);
        updateChart("convertChart",data.convertDcPower,operationStatus,modeStatus);
        setInverterStatus(".status-09 .layout-01 .state", modeStatus, true);
        setInverterStatus(".status-09 .layout-01 .state", operationStatus, false);

        // 좌측 인버터 데이터 표출
        $.each(data.leftInverter, function (index, item) {
            $(".status-09 .layout-00" + " ." + index).text(item);
        });

        updateChart("leftInverterChart",data.leftInverter.power,operationStatus,modeStatus);
        setInverterStatus(".status-09 .layout-00 .state", (data.leftInverter.modeStatus === "00"? "3":data.leftInverter.modeStatus), true);
        setInverterStatus(".status-09 .layout-00 .state", data.leftInverter.inverterStatus, false);

        // 우측 인버터 데이터 표출
        $.each(data.rightInverter, function (index, item) {
            $(".status-09 .layout-02" + " ." + index).text(item);
        });

        updateChart("rightInverterChart",data.rightInverter.power,operationStatus,modeStatus);
        setInverterStatus(".status-09 .layout-02 .state", (data.rightInverter.modeStatus === "00"? "3":data.rightInverter.modeStatus), true);
        setInverterStatus(".status-09 .layout-02 .state", data.rightInverter.inverterStatus, false);

        if (operationStatus === "12") {
            $(".dc_0").addClass(statusColor);

            if (data.leftInverter.modeStatus === "04" && data.leftInverter.inverterStatus === "12") {
                $(".dc_2").addClass(statusColor);
            } else {
                $(".dc_2").removeClass(statusColor);
            }

            if (data.rightInverter.modeStatus === "04" && data.rightInverter.inverterStatus === "12") {
                $(".dc_1").addClass(statusColor);
            } else {
                $(".dc_1").removeClass(statusColor);
            }
        } else {
            $(".dc_0, .dc_1, .dc_2").removeClass(statusColor);
        }

        $(".c0311").attr("disabled", false);


    } else {
        $('.status-09 .layout-00 span, .status-09 .layout-01 span, .status-09 .layout-02 span, .status-09 .layout-03 .totalValue').text("-");

        updateChart("convertChart",0,'100');
        updateChart("leftInverterChart",0,'100');
        updateChart("rightInverterChart",0,'100');

        $(".c0311").attr("disabled", true);

        $(".status-09 .layout-00 .op-status,  .status-09 .layout-02 .op-status").attr("src", "/assets/images/main/status/11-disable.png");
        $(".status-09 .layout-01 .warning-status, .status-09 .layout-00 .state .warning-status, .status-09 .layout-02 .state .warning-status ").attr("src", "/assets/images/main/status/99-disable.png");
        $(".status-09 .layout-00 .fault-status, .status-09 .layout-02 .state .fault-status").attr("src", "/assets/images/main/status/98-disable.png");
        $(".status-09 .layout-01 .mode-status").attr("src", "/assets/images/main/status/0-disable.png");
        $(".status-09 .layout-01 .op-status").attr("src", "/assets/images/main/status/100-enable.png");
        $(".status-09 .layout-00 .mode-status, .status-09 .layout-02 .mode-status").attr("src", "/assets/images/main/status/3-disable.png");
        $(".dc_0, .dc_1, .dc_2").removeClass("border-discharge-color");
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
        var statusColor = "";
        var flowClass = "";

        if (rackCode === '010101') {
            rackId = '1';
            flowClass = ".battery_1";
            rack_0_operationStatus = operationStatus;
            soc1 = data.soc;

            if (data.errorFlag === 'Y') {
                if (JSON.stringify(errorList) !== JSON.stringify(battery1ErrorList)) {
                    getDeviceErrorHistory();
                }
            }

            battery1ErrorList = errorList;

        } else if (rackCode === '010102') {
            rackId = '2';
            flowClass = ".battery_2";
            rack_1_operationStatus = operationStatus;
            soc2 = data.soc;

            if (data.errorFlag === 'Y') {
                if (JSON.stringify(errorList) !== JSON.stringify(battery2ErrorList)) {
                    getDeviceErrorHistory();
                }
            }

            battery2ErrorList = errorList;
        }

        //계통도 상태
        if (operationModeStatus === "1") {
            statusColor = "border-charge-color";
        } else {
            $(flowClass).removeClass("border-charge-color");
        }

        if (operationModeStatus === "2") {
            statusColor = "border-discharge-color";
        } else {
            $(flowClass).removeClass("border-discharge-color");
        }

        if (operationModeStatus === "0") {
            $(flowClass).removeClass("border-charge-colo border-discharge-color");
        }

        $(flowClass).addClass(statusColor).css("z-index", "2");


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

        $('.status-16 .text-value, .status-12 .text-value').text('-');        $(".battery_1, .battery_2").removeClass("border-charge-color").removeClass("border-discharge-color").css("z-index","1");
    }
}


/**
 * 제어버튼 리셋
 * @param mode {Boolean} true = 전체 , false = left,right 인버터만 리셋
 */
function removeBtn (mode) {
    if (mode) {
        $("#electricCurrent").attr("disabled", true);
        $(".c0300").removeClass("w-btn-default-skin-outline w-btn-yellow-skin-outline").attr("disabled", true);
        $(".c0301").removeClass("purple-btn-skin-outline blue-btn-skin-outline").attr("disabled", true);
        $(".c0302").removeClass("purple-btn-skin-outline orange-btn-skin-outline").attr("disabled", true);
        $(".c0303 , .c0305 , .c0306").removeClass("purple-btn-skin-outline").attr("disabled", true);
    }

    $(".c0307 , .c0308 , .c0309 , .c0310 ").removeClass("purple-btn-skin-outline").attr("disabled", true);
}




//금일 일정 목록 불러오기 (일정관리 화면에서 등록, 수정, 취소시 화면에 보여지는 값 바꿔주기 위함
function reloadSchedule() {
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH3);
}


/**
 * 입력값 숫자,소수점,자리수 체크 -- Double
 * @param {String} str
 * @param {String} id
 * @returns {string|*}
 */
function onKeyNumberCheck(str,id) {
    var count = 0;
    var idx = str.indexOf('.');
    var pattern1 = /[^-0-9]/g;
    var data = str.replace(pattern1,'');

    str = data;

    while(idx !== -1){
        count ++;
        idx = str.indexOf('.',idx+1);
    }

    if (count > 1 || str.startsWith('.') || str.includes('-', 1)) {
        axToast.push("잘못된 형식의 값이 입력되었습니다. 다시 입력해 주세요");
        return "";
    }

    if(str < -150 || str > 150) {
        axToast.push("전류는 -150A ~ 150A 사이로 설정 가능합니다.");
        return "";
    }

    return data;
}