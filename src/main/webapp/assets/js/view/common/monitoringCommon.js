//날씨 테이블에 데이터 SET
function setWeatherTable(temp, humidity, icon) {
    $("#weatherIcon").addClass(getWeatherIcon(icon));
    $("#temperature").text(temp);
    $("#humidity").text(humidity);
}

//WeatherGbn 에 따라 Icon 반환
function getWeatherIcon(icon) {
    icon = icon.substr(0, 2);
    switch (icon) {
        case "01" :
            return "fa-sun";                    //맑음
        case "02" :
        case "03" :
        case "04" :
            return "fa-cloud";                          //흐림
        case "09" :
        case "10" :
            return "fa-cloud-showers-heavy";            //비
        case "13" :
            return "fa-snowflake";              //눈
        case "11" :
            return "fa-poo-storm";              //번개
        case "50" :
            return "fa-smog";                   //안개
        default   :
            return "fa-question";               //기타
    }
}


/*제어 명령어 및 코드 목록 사용을 위한 변수*/
var controlCodeList;
var controlList;
var codeList;

/*에어컨 전원, 온도 및 운전모드 상태 이전값 저장을 위한 변수*/
let bmsAirData = {};
let pcsAirData = {};

/*M/W 연결 확인을 위한 변수*/
var connection = false;

/**
 * 웹소켓 통신 부분
 */
var ws;
axboot.ajax({
    type: "GET",
    url: ["/monitoring", "getWebSocketHost"],
    callback: function (res) {
        console.log("웹소켓 서버 정보" + res.map.webSocketHost);
        parent.axToast.push("웹 소켓 정보를 정상적으로 가져왔습니다.");

        ws = new WebSocket(res.map.webSocketHost);

        if (ws.readyState !== 1) {
            ws.onopen = (event) => {
                let sendData = {id: essId, eventType: 'req', deviceType: 'pms', dataType: 'connect'};
                ws.send(JSON.stringify(sendData));
            }
        }

        ws.onmessage = (event) => {
            console.log("---------------------------------------------");
            console.log("PMS : Data Received From Server");

            let receivedData = JSON.parse(event.data);

            //장비 연결 실패 Error 수신
            if (receivedData.eventType === 'connectionFail') {
                console.log('              connectionFail                ');
                console.log(event.data);
                console.log('connectionFail id : ' + receivedData.id);
                console.log('connectionFail eventType : ' + receivedData.eventType);
                console.log('connectionFail deviceCode : ' + receivedData.deviceCode);
                console.log('connectionFail message : ' + receivedData.message);

                //M/W 미접속으로 제어 실패
                communicationFailure();

                connection = false;

            } else {
                switch (receivedData.dataType) {
                    //접속
                    case 'connect':

                        console.log('              connected                ');

                        // 웹 소켓 연결 확인시 M/W 연결 확인
                        checkConnection();

                        break;

                    case 'checkConnection':
                        console.log('              checkConnection                ');
                        console.log(event.data);
                        console.log('status id : ' + receivedData.id);
                        console.log('status eventType : ' + receivedData.eventType);
                        console.log('status dataType : ' + receivedData.dataType);
                        console.log('status result : ' + receivedData.result);

                        connection = receivedData.result === "success";

                        break;

                    //상태 데이터
                    case 'status':
                        console.log('              status                ');
                        console.log(event.data);
                        console.log('status id : ' + receivedData.id);
                        console.log('status eventType : ' + receivedData.eventType);
                        console.log('status deviceCode : ' + receivedData.deviceCode);
                        console.log('status dataType : ' + receivedData.dataType);

                        connection = true;

                        switch (receivedData.deviceCategory) {
                            case "01":
                                //배터리 정보
                                console.log('battery rackCode : ' + receivedData.data.rackCode);
                                console.log('battery operationStatus : ' + receivedData.data.operationStatus);
                                console.log('battery operationModeStatus : ' + receivedData.data.operationModeStatus);
                                console.log('battery soc : ' + receivedData.data.soc);

                                if (typeof batteryRackConnection === 'function') {
                                    batteryRackConnection(receivedData.data);
                                }

                                break;

                            case "02":
                                //PCS 정보
                                console.log('PCS operationStatus : ' + receivedData.data.operationStatus);
                                console.log('PCS operationModeStatus : ' + receivedData.data.operationModeStatus);
                                console.log('PCS outputPower : ' + receivedData.data.outputPower);

                                if (typeof batteryRackConnection === 'function') {
                                    $(".pcs" + " .title").text(getName("device", receivedData.deviceCode).get("deviceName"));
                                    pcsConnection(receivedData.data);
                                }

                                break;

                            case "03":
                                //cpcm 정보
                                if (receivedData.deviceCategorySub === "0301") {                                        //Ac
                                    console.log('AC operationStatus : ' + receivedData.data.operationStatus);
                                    console.log('AC operationModeStatus : ' + receivedData.data.operationModeStatus);

                                    if (typeof batteryRackConnection === 'function') {
                                        cpcmConnection(receivedData.data);
                                    }


                                } else if (receivedData.deviceCategorySub === "0302") {                                 //DC
                                    console.log('DC operationStatus : ' + receivedData.data.operationStatus);

                                    if (typeof batteryRackConnection === 'function') {
                                        dcConnection(receivedData.data);
                                    }

                                }

                                break;

                            case "04":
                                //센서 정보
                                console.log('sensor deviceRoom : ' + receivedData.data.deviceRoom);
                                console.log('sensor sensorStatus : ' + receivedData.data.sensorStatus);

                                if (typeof batteryRackConnection === 'function') {
                                    sensorConnection(receivedData.deviceCategorySub, receivedData.data);
                                }

                                break;

                            case "05":
                                //계측기 정보
                                console.log('power status : ' + receivedData.data.status);
                                console.log('sensor meterCode : ' + receivedData.data.meterCode);
                                console.log('sensor meterNo : ' + receivedData.data.meterNo);

                                if (typeof batteryRackConnection === 'function') {
                                    instumentConnection(receivedData.deviceCategorySub, receivedData.data);
                                }

                                break;

                            case "80":
                                //공조 장치 정보
                                console.log('air deviceRoom : ' + receivedData.data.deviceRoom);
                                console.log('air operationStatus : ' + receivedData.data.operationStatus);

                                if (typeof batteryRackConnection === 'function') {
                                    airConnection(receivedData.deviceCategorySub, receivedData.deviceCode, receivedData.data);
                                }

                                break;
                            default:
                                break;
                        }
                        break;
                    //웹소켓 서버로부터 제어 응답 수신
                    case 'control':
                        console.log('              control                ');
                        console.log(event.data);
                        console.log('control id : ' + receivedData.id);
                        console.log('control eventType : ' + receivedData.eventType);
                        console.log('control dataType : ' + receivedData.dataType);
                        console.log('control data : ' + JSON.stringify(receivedData.data));

                        responseData(receivedData.data);

                        connection = true;

                        break;

                    default:
                        console.log('              default                ');
                }
            }

            console.log("---------------------------------------------\n\n");
        }
    },
    options: {
        // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
        onError: function (err) {
            parent.axToast.push("웹 소켓 정보를 가져오지 못했습니다.");
            console.log(err);
        }
    }
});


/**
 * 제어 응답값 처리
 * @param data  {Object}    :: 웹소켓 응답값
 */
function responseData(data) {
    var controlResult = (data.controlResult === "success");

    // M/W 없데이트시
    if (data.deviceCode === '900101') {

        (controlResult ? controlSuccess() : rollBackUpdate(true));

    } else {

        if (!controlResult) {
            // 공조장치일 경우 이전 값 세팅
            if (data.deviceCode.substring(0,2) === "80") {
                setBeforeAirValue(data.deviceCode, data.controlCode);
            }
        }

        alertControlResponse(controlResult, data);
    }
}


/**
 * 센서 연결
 * @param deviceCategorySub {String}    :: 구분값
 * @param data {Object}                 :: data 없을 시 FAIL 처리
 */
function sensorConnection(deviceCategorySub, data) {
    if (data != null) {
        var operationStatus = data.sensorStatus;
        let errorList = data.errorList;
        var checked = false;

        if (data.errorFlag === 'Y') {
            if (JSON.stringify(errorList) !== JSON.stringify(sensorErrorList)) {
                getDeviceErrorHistory();
            }
        }

        sensorErrorList = errorList;

        if (operationStatus === '10') {
            checked = true;
        }

        var room = (data.deviceRoom === "01" ? ".bms-room" : ".pcs-room");

        switch (deviceCategorySub) {
            case "0401":
                //온도
                $(room + " .temp").text(checked ? data.measure1 : "-");
                break;
            case "0402":
                //습도
                $(room + " .hum").text(checked ? data.measure1 : "-");
                break;
            case "0403":
                //조도
                $(room + " .illum").text(checked ? data.measure1 : "-");
                break;
            case "0404":
                //도어
                var classId = room + " .door";
                var measure = "열림";

                if (data.deviceRoom === "03") {

                    classId = "#doorSensor";
                }

                if (data.measure1 === "0") {
                    measure = "닫힘";
                }

                $(classId).text(checked ? measure : "-");

                break;
            case "0405":
                //진동
                break;
            case "0406":
                //기울기
                break;
            default:
                break;
        }
    } else {
        sensorErrorList = "";
        $(".status-05 .text-color").text("-");
        $(".device-room .sensor-status .text-color").text("-");
    }
}


/**
 * 공조장치 연결
 * @param deviceCategorySub {String}    :: 구분값
 * @param deviceCode        {String}    :: 장비코드
 * @param data              {Object}    :: data 없을 시 FAIL 처리
 */
function airConnection(deviceCategorySub, deviceCode, data) {
    if (data != null) {
        var operationStatus = data.operationStatus;
        let errorList = data.errorList;
        var statusChecked = operationStatus === "04" ? true : false;
        var roomChecked = data.deviceRoom === "01" ? true : false;
        var checked = false;
        var room = "";
        var powerValue = "";
        var modeValue = "";
        var tempValue = "";

        air_operation = operationStatus;

        if (data.errorFlag === 'Y') {
            if (JSON.stringify(errorList) !== JSON.stringify(airErrorList)) {
                getDeviceErrorHistory();
            }
        }

        airErrorList = errorList;

        // bms실, pcs실 구분
        if (roomChecked) {
            room = ".bms-room";
            powerValue = bmsAirData.power;
        } else {
            room = ".pcs-room";
            powerValue = pcsAirData.power;
        }

        // 에어컨 전원 체크값
        checked = (statusChecked === true ? true : false);

        // 상태값 들어올시 선택가능하게
        $(room + " .control").removeClass("point-none");
        $(room + " .air").removeClass("point-none");

        switch (deviceCategorySub) {
            case "8001":

                //시스템 에어컨
                controlAirConditioner(room);

                // 전원 값 체크
                if (powerValue !== operationStatus) {
                    $(room + " .power").prop("checked", checked);
                }

                // 고정형 일때만 설정온도,운전모드 선택
                // 전원이 들어올시만 표출
                if (statusChecked) {

                    $(room + " .stepper-input").removeClass("point-none");
                    $(room + " .frame-01").removeClass("point-none");

                    // bms실, pcs실 구분
                    if (roomChecked) {
                        modeValue = bmsAirData.mode;
                        tempValue = bmsAirData.temp;
                    } else {
                        modeValue = pcsAirData.mode;
                        tempValue = pcsAirData.temp;
                    }

                    var mode = room + " ." + data.operationModeStatus;

                    // 운전 모드 값 체크
                    if (modeValue !== $(mode).attr("controlType")) {

                        $(mode).prop("checked", true);
                        $(room + " .frame-01 input[type='checkbox']").not($(mode)).prop('checked', false);

                    }

                    // 설정 온도 값 체크
                    if (tempValue !== data.setTemperature) {

                        $(room + " .setTemperature").val(data.setTemperature + " ℃");

                    }

                    // 현재값들 저장변수에 담기
                    if (roomChecked) {
                        bmsAirData.power  = operationStatus;
                        bmsAirData.mode  = $(mode).attr("controlType");
                        bmsAirData.temp  = data.setTemperature;
                    } else {
                        pcsAirData.power  = operationStatus;
                        pcsAirData.mode  = $(mode).attr("controlType");
                        pcsAirData.temp  = data.setTemperature;
                    }

                } else {

                    modeValue = "";
                    tempValue = "";
                    bmsAirData.mode = "";
                    bmsAirData.temp = "";

                    $(room + " .frame-01 input[type='checkbox']").prop("checked", false);
                    $(room + " .setTemperature").val("");

                    if (operationStatus !== "03" && operationStatus !== "04") {
                        $(room + " .control").addClass("point-none");
                    } else {
                        $(room + " .control").removeClass("point-none");
                    }

                    $(room + " .stepper-input").addClass("point-none");
                    $(room + " .frame-01").addClass("point-none");
                }

                break;
            case "8002"://차량용 에어컨
                $(room + " .air").removeClass("point-none");

                // 전원 값 체크
                if (powerValue !== operationStatus) {
                    $(room + " .power").prop("checked", checked);
                }

                // 현재값들 저장변수에 담기
                if (roomChecked) {
                    bmsAirData.power  = operationStatus;
                } else {
                    pcsAirData.power  = operationStatus;
                }

                break;
            case "8011"://환풍기(흡기)
            case "8012"://환풍기(배기)
                $(room + " .c" + deviceCategorySub).prop("checked", checked);
                break;
            default:
                break;
        }

    } else {
        air_operation = "";
        bmsAirData = {};
        pcsAirData = {};

        $(".setTemperature").val("");
        $(".device-room .control").addClass("point-none");
        $("input[type=checkbox]").prop("checked", false);
    }
}


/**
 * 계측기 연결
 * @param deviceCategorySub {String}    :: 구분값
 * @param data {Object}                 :: data 없을 시 FAIL 처리
 */
function instumentConnection(deviceCategorySub, data) {
    if (data != null) {
        var operationStatus = data.sensorStatus;
        var classId = deviceCategorySub === "0501" ? ".elect" : ".hub .instument-" + data.meterNo;

        $(classId + " .text-value").css("color", "#D1FD00");

        $.each(data, function (index, item) {
            $(classId + " ." + index).text(index === "meterNo" ? "#" + item : item);
            if (codeList.find(obj => obj.code === item) !== undefined) {
                $(classId + " ." + index + "-code").text(codeList.find(obj => obj.code === item).name);
                $(classId + " ." + index + "-code").css("color", getName("code", item).get("color"));
            }
        });

    } else {

        $(".instument .text-value").text("-").css("color", "#BFBFBF");
        $(".instument .status-code").text("통신 불가").css("color", "#C00000");
    }
}


/**
 * 제어 데이터 SEND
 * @param data {Object} :: 제어 데이터
 */
function sendControldData(data) {
    var sendData = {
        id: essCode,
        eventType: 'req',
        deviceCategory: data.deviceCategory,
        deviceCategorySub: data.deviceCategorySub,
        deviceCode: data.deviceCode,
        dataType: 'control',
        data: {targetId: targetId, controllerId: userCd, controlCode: data.controlCode, controlValue: data.controlValue}
    };

    ws.send(JSON.stringify(sendData));
    console.log(sendData);
}


/**
 * 제어 전송 전 M/W 연결 확인
 */
function checkConnection() {
    var sendData = {
        id: essCode,
        eventType: 'req',
        deviceType: 'pms',
        dataType: 'checkConnection',
    };

    ws.send(JSON.stringify(sendData));
}


/**
 * 제어 선택시 값 체크
 * @param device    {String}    :: pcs(고정형), pcs-mode(운전모드), rack1,rack2, auto, 에어컨 : bms-room(전원), pcs-room(전원), bms-mode(상태제어), pcs-mode(상태제어), temp(설정온도)
 * @param data      {Object}
 */
function checkControlData(device, data) {
    let deviceData = {};
    var selected = false;

    // 에어컨 데이터 set
    if (device === "bms-room" || device === "pcs-room") {
        var status = $(data).prop("checked") ? "start" : "stop";

        $(data).attr("deviceCategory", $("." + device + " ." + status).attr("deviceCategory"));
        $(data).attr("deviceCategorySub", $("." + device + " ." + status).attr("deviceCategorySub"));
        $(data).attr("deviceCode", $("." + device + " ." + status).attr("deviceCode"));
        $(data).attr("controlCode", $("." + device + " ." + status).attr("controlCode"));
        $(data).attr("controlType", $("." + device + " ." + status).attr("controlType"));
    }

    // 선택된 장비 제어 데이터 set
    deviceData.deviceCategory = $(data).attr("deviceCategory");
    deviceData.deviceCategorySub = $(data).attr("deviceCategorySub");
    deviceData.deviceCode = $(data).attr("deviceCode");
    deviceData.controlCode = $(data).attr("controlCode");
    deviceData.controlValue = $(data).attr("controlValue") === undefined ? "" : $(data).attr("controlValue");
    deviceData.controlType = $(data).attr("controlType");
    deviceData.autoControlFlag = $(data).attr("value");

    // 이동형 setOperation 값 체크
    if (device === "cpcm-mode") {

        switch (setOperationMode) {
            case "1":

                selected = (deviceData.controlType === "0301");

                break;
            case "2":

                selected = (deviceData.controlType === "0302");

                break;
            case "3":

                selected = (deviceData.controlType === "0300");

                break;
            default:
                break;
        }
    }

    // 이미 선택된 값 체크 --  고정형은 고정 false , 이동형 모드 선택된값이 있을때 true
    if (selected) {

        alertMessage("운영 상태", "이미 선택된 상태입니다.");

    } else if (device === "cpcm-mode" && inverterStatus) {                      // 이동형 모드 선택이면서 인버터 상태값 체크

        alertMessage("제어 불가","제어 할 수 없습니다. 상태를 확인해 주세요.");

    } else {

        if (deviceData.deviceCode !== "" && deviceData.deviceCode !== undefined) {

            confirmControl(device, deviceData);

        } else showMessage();
    }
}


/**
 * 제어 취소 시 이전 값 세팅 (에어컨)
 * @param deviceCode     {String}        ::
 * @param controlCode    {String}        ::
 */
function setBeforeAirValue(deviceCode, controlCode) {
    var classId = (deviceCode === "800101" || deviceCode === "800201" ? "bms" : "pcs");
    var roomChecked = (classId === "bms" ? true : false);

    switch (controlCode) {
        //고정형 애어컨 전원
        case deviceCode + "8000":
        case deviceCode + "8001":
        // 이동형 에어컨 전원
        case deviceCode + "8098":
        case deviceCode + "8099":
            //전원
            $("." + classId + "-room .power").prop('checked', function () {
                return !$(this).prop('checked');
            });
            break;
        case deviceCode + "8020":
            //설정 온도
            var temp = "";

            //장비실 구분
            if (roomChecked) {
                temp = bmsAirData.temp;
            } else {
                temp = pcsAirData.temp;
            }

            $("." + classId + "-room .setTemperature").val(temp + " ℃");
            break;
        case deviceCode + "8010":
        case deviceCode + "8011":
        case deviceCode + "8012":
        case deviceCode + "8013":
            //운전모드

            var mode = "";

            //장비실 구분
            if (roomChecked) {
                mode = bmsAirData.mode;
            } else {
                mode = pcsAirData.mode;
            }

            $("." + classId + "-mode .c" + mode).prop('checked', true);
            $("." + classId + "-mode input[type='checkbox']").not($("." + classId + "-mode .c" + mode)).prop('checked', false);
            break;
        default:
            break;
    }
}


/**
 * 제어 명령어 목록
 * @returns {boolean}
 */
function selectCommandList() {
    axboot.ajax({
        type: "GET",
        url: ["/monitoring", "selectControlList"],
        data: {essType: essType},
        callback: function (res) {

            codeList = res.mapResponse.map.codeList.list;
            controlCodeList = codeList.filter(obj => obj.groupCd === 'CONTROL_TYPE');
            controlList = res.mapResponse.map.controlList.list;

            setCommandList();
        },
        options: {
            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
            onError: function (err) {
                console.log(err);
            }, nomask: false
        }
    });
    return false;
}


/**
 * 장비,상태 이름 가져오기
 * @param code  {String}    :: 가져올 코드 device - deviceCode, control - controlCode
 * @param value {String}    :: 코드 값
 * @returns {*}
 */
function getName(code, value) {
    const map = new Map();
    let data;
    let controlName = "";

    switch (code) {
        case "device":
            data = controlList.find((obj) => obj.deviceCode === value);
            break;
        case "control":
            data = controlList.find((obj) => obj.controlCode === value);

            //이동형 인버터
            if (data.controlCode === "0301010307" && data.controlCode === "0301010308") {
                controlName = "Left-Inverter";
            } else if (data.controlCode === "0301010309" && data.controlCode === "0301010310") {
                controlName = "Right-Inverter";
            } else {
                controlName = data.deviceName;
            }

            break;
        case "code":
            data = codeList.find((obj) => obj.code === value);
            break;
        default:
            break;
    }


    map.set('deviceName', data.deviceName);  //장비명
    map.set('codeName', data.name);          //상태명
    map.set('name', controlName);            //상태명
    map.set('color', data.data5);            //색

    return map;
}


/**
 * 제어 알림창 세팅
 * @param device
 * @param deviceData
 */
function confirmControl(device, deviceData) {
    const map = getName("control", deviceData.controlCode);
    const name = map.get('deviceName');
    const codeName = map.get('codeName');
    let operationStatus = "";
    let title = "";
    let message = "";

    switch (device) {
        case "rack1":
            operationStatus = rack_0_operationStatus;
            break;
        case "rack2":
            operationStatus = rack_1_operationStatus;
            break;
        case "pcs":
        case "pcs-mode":
            operationStatus = pcs_operation;
            break;
        case "cpcm":
        case "cpcm-mode":
            operationStatus = cpcm_operation;
            break;
        default:
            operationStatus = air_operation;
            break;
    }

    if (device === "auto") {

        title = "ESS 제어 설정";
        message = " ESS 제어 설정을 " + codeName + " \n 설정으로 변경하시겠습니까?";

    } else if (device === "pcs-mode" || device === "cpcm-mode") {

        message = name + " 의 운전 모드를 " + codeName + " 상태로 \n 변경하시겠습니까?";

    } else {

        title = name + " 제어";
        message = name + " 의 " + codeName + " \n 제어를 진행하시겠습니까?";
    }

    axDialog.confirm({
        title: title,
        msg: message
    }, function () {
        if (this.key === "ok") {

            sendControlDataSet(device, deviceData, operationStatus);

        } else {

            setBeforeAirValue(deviceData.deviceCode, deviceData.controlCode);
        }
    });
}


/**
 * 제어 데이터 SET
 * @param device            {String}
 * @param deviceData        {Object}
 * @param operationStatus   {String}
 */
function sendControlDataSet(device, deviceData, operationStatus) {

    const controlData = {
        deviceCode: deviceData.deviceCode,
        deviceCategory: deviceData.deviceCategory,
        deviceCategorySub: deviceData.deviceCategorySub,
        controlCode: deviceData.controlCode,
        controlValue: deviceData.controlValue,
        autoControlFlag: deviceData.autoControlFlag,
    };

    if (ws.readyState === 1 && connection) {

        if (device === "auto") {


            rollBackUpdate(false, controlData);

        } else {
            // 장비상태값을 체크 후 제어데이터 전송
            if (operationStatus !== "09") {

                sendControldData(controlData);

            } else {

                alertConnectionFail(controlData.controlCode);

            }
        }
    } else {
        //통신불가일 때
        alertConnectionFail(controlData.controlCode);
    }
}


/**
 * 통신 불가 또는 연결 해제 상태인 경우 알림
 * @param controlCode   {String}
 */
function alertConnectionFail(controlCode) {
    const map = getName("control", controlCode);
    const name = map.get('deviceName');

    let title = name + " 제어 불가";
    let message = "현재 " + name + " 의 상태가 \n 제어 불가 상태입니다. \n 장비 통신 상태를 확인 후 다시 시도 바랍니다.";

    if (controlCode === "9001019098" || controlCode === "9001019099") {
        title = "ESS 제어 설정 불가";
        message = "현재 ESS 제어 설정 변경이 불가 상태입니다.\n 통신 상태를 확인 후 다시 시도 바랍니다.";
    }

    alertMessage(title, message);
}


/**
 * 제어 후, 응답 값 상태에 따라 알림
 * @param result        {Boolean}   :: 응답값 성공여부 성공: true, 실패 : false
 * @param responseData  {Object}    :: 응답값
 */
function alertControlResponse(result, responseData) {
    const map = getName("control", responseData.controlCode);
    const name = map.get('deviceName');
    const codeName = map.get('codeName');

    const resultKey = (result ? '성공' : '실패');
    const title = name + " 제어 " + resultKey;
    let message = name + "의 " + codeName + " 제어에 " + resultKey + " 하였습니다." + (result === 'N' ? "\n 잠시 후 다시 시도 바랍니다." : "");

    if (responseData.message !== "") {
        message = responseData.message;
    }

    alertMessage(title, message);
}


/**
 * 장비 제어 장비코드,제어코드 세팅
 * @param device        {String}    :: 장비 구분
 * @param controlList   {List}      :: 제어 명령어 목록
 * @param isRepetitive  {Boolean}   :: 배터리,에어컨 구분 -- device 값이 rack1,rack2,bmsAir,pcsAir 일시 ture, 아니면 false
 * @param list          {List}      :: isRepetitive - true 일때만 사용
 */
function drawControlButton(device, controlList, isRepetitive, list) {

    let html;
    if (!isRepetitive) {

        for (let i in controlList) {

            html = "<span class='fas " + controlList[i].data5 + "'/><div class='controlTxt'>" + (controlList[i].code === "0303" ? "초기화" : controlList[i].name) + "</div>";

            if (controlList[i].deviceCode !== undefined) {

                $("." + device + " .c" + controlList[i].controlType).attr("deviceCode", controlList[i].deviceCode).attr("controlCode", controlList[i].controlCode)
                    .attr("deviceCategory", controlList[i].deviceCategory).attr("deviceCategorySub", controlList[i].deviceCategorySub).attr("controlType", controlList[i].controlType).append(html);

            } else {

                $("." + device + " .c" + controlList[i].code).append(html);

            }
        }
    } else {

        for (let i in list) {

            var data = controlList.find(obj => obj.controlType === list[i].code);

            html = (device === "rack1-control" || device === "rack2-control" ? "<span class='fas " + list[i].data5 + "'/><div class='controlTxt'> " + list[i].name + "</div>" : "");


            if (data !== undefined) {

                $("." + device + " .c" + data.controlType).attr("deviceCode", data.deviceCode).attr("controlCode", data.controlCode)
                    .attr("deviceCategory", data.deviceCategory).attr("deviceCategorySub", data.deviceCategorySub).attr("controlType", data.controlType).append(html);

            } else {

                $("." + device + " .c" + list[i].controlType).append(html);

            }
        }
    }
}


/**
 * 장비 오류 이력 알림
 * @returns {boolean}
 */
function getDeviceErrorHistory() {
    $.ajax({
        type: "GET",
        url: '/monitoring/selectErrorList',
        data: {essType: essType, processFlag: 'N'},
        dataType: "JSON",
        success: function (res) {
            noticeDeviceError(res.mapResponse.map.list);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("장비오류이력 에러");
            noticeDeviceError(null)
        },
        async: false
    });
}


/**
 * 장비 오류 이력 알림
 * @param list  {Object}
 */
function noticeDeviceError(list) {
    $("#deviceError").empty();

    if (list == null || list.length === 0) {
        $("#deviceError").append("<tr><td class='weatherText tac' style='text-align: center;width: 460px;height: 110px;'>최근 이력 없음</td></tr>");
    } else {
        for (var i = 0; i < 5; i++) {
            var html = "";
            var length = 20;
            var deviceName = "";
            var errorDate = "";
            var errorName = "";
            var errorType = "";

            if (list[i] != null || list[i] !== undefined) {
                deviceName = list[i].deviceName;
                errorDate = list[i].errorDate.substr(2, 14);
                errorName = list[i].errorCodeName;
                errorType = list[i].errorType;
            }

            //글자수 제한
            if (errorName.length > length) {
                errorName = errorName.substr(0, length - 2) + ' ···';
            }

            if (deviceName.length > 15) {
                deviceName = deviceName.substr(0, 15 - 2) + ' ···';
            }

            html += "<tr>";
            html += "<td class='tac wd140p' style='height: 20px;'>" + errorDate + "</td>";
            html += "<td class='tal wd140p' style='height: 20px;'>" + deviceName + "</td>";
            html += (errorType === '02' ? "<td class='tal warningText overText' style='height: 20px;'>" : "<td class='flawText overText' style='height: 20px;'>") + errorName + "</td>";

            $("#deviceError").append(html);
        }
    }
}


/**
 * 장비 상태 표출
 * @param classId   {String}    :: 클래스명
 * @param code      {String}    :: operationStatus, operationModeStatus, modeStatus, inverterStatus
 * @param mode      {Boolean}   :: true = operationStatus
 */
function setInverterStatus(classId, code, mode) {
    var src = "/assets/images/main/status/" + code + "-enable.png";

    if (mode) {
        $(classId + " .mode-status").attr("src", src);
    } else {
        if (code === "99") {
            $(classId + " .warning-status").attr("src", src);
        } else {
            $(classId + " .warning-status").attr("src", "/assets/images/main/status/99-disable.png");
        }

        if (code === "98") {
            $(classId + " .fault-status").attr("src", src);
        } else {
            $(classId + " .fault-status").attr("src", "/assets/images/main/status/98-disable.png");
        }

        if (code !== "99" && code !== "98") {
            $(classId + " .op-status").attr("src", src);
        } else {
            $(classId + " .op-status").attr("src", "/assets/images/main/status/11-disable.png");
        }
    }
}


/**
 * 에어컨 운전모드 상태 및 제어 표출
 * @param classId   {String}    bms실, pcs실 구분값
 *
 * --- 최소 하나의 값만 선택 가능
 */
function controlAirConditioner(classId) {
    var checkBox = $(classId + " .frame-01 input[type='checkbox']");

    checkBox.click(function () {
        if ($(this).is(':checked')) {
            checkBox.not(this).prop('checked', false);
        }
        $(this).prop('checked', true);
    });
}


/**
 * ESS 총 누적 전력량
 * @returns {boolean}
 */
function getEssInfo() {
    $.ajax({
        type: "GET",
        url: '/monitoring/selectAutoControlFlag',
        data: {essCode: essCode},
        dataType: "JSON",
        success: function (res) {
            var result = res.map.essStatus;
            $('#sumCharge').text(result.totalCharge);
            $('#sumDisCharge').text(result.totalDischarge);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        async: false
    });
}


/**
 * ESS 운영 통계
 * @returns {boolean}
 */
function getOperatingStats() {
    $.ajax({
        type: "GET",
        url: '/monitoring/selectOperatingStats',
        data: {essCode: essCode},
        dataType: "JSON",
        success: function (res) {
            var status = (essType === "01" ? "10": "00")

            $.each(res.map.list, function (index, item) {

                $(".status-" + status + " .content ." + index + " .text-value").text(Math.abs(item));

                if (item > 0) {
                    $(".status-" + status + " .content ." + index + " .sign-value").text('+');
                } else if (item < 0) {
                    $(".status-" + status + " .content ." + index + " .sign-value").text('-');
                } else {
                    $(".status-" + status + " .content ." + index + " .sign-value").text('');
                }

            });

            if (essType === "01") {
                realTimer("operatingTimer");

                updateBarChart(res.map.list);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        async: false
    });
    return false;
}


/**
 * 현재 날씨
 * @returns {boolean}
 */
function getCurrentWeather() {
    $.ajax({
        type: "GET",
        url: '/interfaceWeather/getCurrentWeather',
        data: {},
        dataType: "JSON",
        success: function (res) {
            var temp = res.map.weather.main.temp;
            if (res.map.weather.main) {
                temp = (parseFloat(temp) >= 273 ? parseInt(parseFloat(temp) - 273.15) : parseInt(parseFloat(temp)));
            } else {
                temp = "-";
            }

            var humidity = res.map.weather.main ? res.map.weather.main.humidity : "-";
            var icon = res.map.weather.weather ? res.map.weather.weather[0].icon : "01d";

            setWeatherTable(temp, humidity, icon);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        },
        async: false
    });
    return false;
}


/**
 * ESS정보 없을 시 알림창
 * @returns {boolean}
 */
function getEssAlert() {
    if (essCode === "") {
        $("#systemAlert").show();
        $("#alertDialog").removeClass("destroy");
        $("#axMask").removeClass("fade-out");
    } else {
        $("#systemAlert").hide();
        $("#alertDialog").addClass("destroy");
        $("#axMask").addClass("fade-out");
        $("#essName").text(essName);
    }
    return false;
}


/**
 * M/W 연결 실패
 */
function communicationFailure() {

    if (essType === "01") {

        pcsConnection(null);

        instumentConnection("", null);

    } else {

        cpcmConnection(null);

        dcConnection(null);
    }

    batteryRackConnection(null);

    sensorConnection("", null);

    airConnection("", "", null);
}


/**
 * 시간,날씨 새로고침
 */
function resetNowDate(id) {
    realTimer(id);                              // 시간
    getCurrentWeather();                        // 날시
}


/**
 * 현재 시간 표시
 */
function realTimer(id) {

    const nowDate = new Date();

    const hour = nowDate.getHours();

    const min = nowDate.getMinutes();

    Date.prototype.amPm = function () {
        return this.getHours() < 12 ? "오전" : "오후";
    }

    document.getElementById(id).innerHTML = nowDate.amPm() + " " + addzero(hour) + ":" + addzero(min);
}


function addzero(num) {

    if (num < 10) {
        num = "0" + num;
    }

    return num;
}


/**
 * 명령어 알림창
 * @param title    {String}
 * @param msg       {String}
 */
function alertMessage(title, msg) {
    axDialog.alert({
        title: title,
        msg: msg
    });
}


/**
 * 소수점 한자리 이후 버림, 세자리 컴마
 * @param data  {String}
 * @returns {String}
 */
function insertCommas(data) {
    data = Math.abs(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return data
}


/**
 * 제어정보 없을 시 알림창
 */
function showMessage() {
    parent.axDialog.alert({
        title: "제어 정보 등록 확인",
        msg: "해당 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다."
    });
}

