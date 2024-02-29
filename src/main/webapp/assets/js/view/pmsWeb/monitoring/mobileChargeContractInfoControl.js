/**
 * 웹소켓 통신 부분
 */
var ws = new WebSocket('ws://localhost:3100');

ws.onopen = (event) => {
    let sendData = {id: essId, eventType: 'req', deviceType: 'pms', dataType: 'connect'};
    ws.send(JSON.stringify(sendData));
}

var controlCodeName;
var deviceGbnCodeName;

var fnObj = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();

    setContractDetail();
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-modal-header-btn", {
            "modal-close": function () {
                console.log("제어 모달 close");
                parent.axboot.modal.callback('close');
            }
        });

        axboot.buttonClick(this, "pcs-remote-control-btn", {
            "charge": function () {

            },
            "discharge": function () {

            },
            "emergencyStop": function () {

            }
        });
    }
});

//버튼 레이아웃 / 메시지 레이아웃 전환
function setMessageLayout(status, message) {

    if (status) {
        $('#messageLayout').hide();
        $('#buttonLayout').show();
    } else if (!status) {
        $('#buttonLayout').hide();
        $('#messageLayout').show();
        $('#messageText').html(message);
    }
}

//계약 상세 정보
function setContractDetail() {

    axboot.ajax({
        type: "GET",
        url: ["chargeDischargeContractMgnt", "selectChargeContractDetailInfoForMobile"],
        data: {
            essCode: essCode,
            chargeTargetSeq: chargeTargetSeq,
            contractStartDatetimeId: contractStartDatetimeId
        },
        callback: function (res) {

            console.log("data : " + res.mapResponse.map);

            let chargeDischargeContractMgntVO = res.mapResponse.map.chargeDischargeContractMgntVO;

            $('#targetName').html(chargeDischargeContractMgntVO.targetName);
            $('#chargeGbnName').html(chargeDischargeContractMgntVO.chargeGbnName);
            $('#chargeOption').html(chargeDischargeContractMgntVO.targetName);
            $('#chargeAmount').html(chargeDischargeContractMgntVO.chargeAmount);
            $('#targetName').html(chargeDischargeContractMgntVO.targetName);
            $('#contractStartDatetime').html(chargeDischargeContractMgntVO.contractStartDatetime);
            $('#contractEndDatetime').html(chargeDischargeContractMgntVO.contractEndDatetime);
            $('#contractReasonName').html(chargeDischargeContractMgntVO.contractReasonName);
            $('#targetManagerName').html(chargeDischargeContractMgntVO.targetManagerName);
            $('#targetManagerTel').html(chargeDischargeContractMgntVO.targetManagerTel);
            $('#targetAddress').html(chargeDischargeContractMgntVO.targetAddress);
            $('#contractCompleteYn').val(chargeDischargeContractMgntVO.contractCompleteYn);
            $('#controlValue').val(chargeDischargeContractMgntVO.controlValue);
            console.log("contractCompleteYn : " + $('#contractCompleteYn').val());
            console.log("controlValue : " + $('#controlValue').val());

            if (ws.readyState == 1) {
                setButtonAttribute();
            } else {
                setMessageLayout(false , '서버 상태를 확인하여 주십시오.');
            }
        },
        options: {
            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
            onError: function (err) {
                console.log(err);
            }
        }
    });

}

//버튼 속성 지정 - 이행 여부와 충방전 구분값에 따라 분기
function setButtonAttribute() {
    //이행 여부 체크
    //이행 완료
    if ($('#contractCompleteYn').val() == 'Y') {
        setMessageLayout(false, '이행 완료');
    }

    //미이행
    else if ($('#contractCompleteYn').val() == 'N') {
        setMessageLayout(true, '');

        setEmergencyButtonAttribute("off");
        setChargeButtonAttribute("on");
        setDischargeButtonAttribute("on");

        checkChargeGbn();
    }

    //진행중
    else if ($('#contractCompleteYn').val() == 'R') {
        setMessageLayout(true, '');

        setEmergencyButtonAttribute("on");
        setChargeButtonAttribute("off");
        setDischargeButtonAttribute("off");

        checkChargeGbn();
    }
}

//충방전 버튼 구분
function checkChargeGbn() {
    //충전/방전 체크
    if ($('#chargeGbnName').html() == '충전') {
        $('#chargeButton').show();
        $('#dischargeButton').hide();
    } else if ($('#chargeGbnName').html() == '방전') {
        $('#dischargeButton').show();
        $('#chargeButton').hide();
    }
}

//긴급정지 버튼 css
function setEmergencyButtonAttribute(type) {

    if (type == 'on') {
        $('#emergencyStopButton').css('background-color', '#E74C3C');
        $('#emergencyStopButton').attr('disabled', false);
    } else if (type == 'off') {
        $('#emergencyStopButton').css('background-color', '#CCCCCC');
        $('#emergencyStopButton').attr('disabled', true);
    }
}

//충전 버튼 css
function setChargeButtonAttribute(type) {

    if (type == 'on') {
        $('#chargeButton').css('background-color', '#3498DB');
        $('#chargeButton').attr('disabled', false);
    } else if (type == 'off') {
        $('#chargeButton').css('background-color', '#CCCCCC');
        $('#chargeButton').attr('disabled', true);
        $('#chargeButton').html("충전중")
    }
}

//방전 버튼 css
function setDischargeButtonAttribute(type) {

    if (type == 'on') {
        $('#dischargeButton').css('background-color', '#3498DB');
        $('#dischargeButton').attr('disabled', false);
    } else if (type == 'off') {
        $('#dischargeButton').css('background-color', '#CCCCCC');
        $('#dischargeButton').attr('disabled', true);
        $('#dischargeButton').html("방전중")
    }
}

//충전
function chargeButton() {

    if (ws.readyState == 1) {
        axDialog.confirm({
            msg: '충전을 진행하시겠습니까?'
        }, function () {
            if (this.key == "ok") {

                let sendData = {
                    id: essId,
                    eventType: 'req',
                    deviceType: 'pcs',
                    dataType: 'control',
                    data: {targetId: targetId, controlType: 'charging', controlValue: $('#controlValue').val()}
                };

                ws.send(JSON.stringify(sendData));

                controlCodeName = '충전';
                deviceGbnCodeName = 'PCS';

            } else {
                console.log("닫기");
            }
        });
    } else {
        alertControlFail();
    }
}

//방전
function dischargeButton() {

    if (ws.readyState == 1) {
        axDialog.confirm({
            msg: '방전을 진행하시겠습니까?'
        }, function () {
            if (this.key == "ok") {

                let sendData = {
                    id: essId,
                    eventType: 'req',
                    deviceType: 'pcs',
                    dataType: 'control',
                    data: {targetId: targetId, controlType: 'discharging', controlValue: $('#controlValue').val()}
                };

                ws.send(JSON.stringify(sendData));

                controlCodeName = '방전';
                deviceGbnCodeName = 'PCS';

            } else {
                console.log("닫기");
            }
        });
    } else {
        alertControlFail();
    }
}

//긴급정지
function emergencyStopButton() {

    if (ws.readyState == 1) {
        axDialog.confirm({
            msg: '긴급 정지를 진행하시겠습니까?'
        }, function () {
            if (this.key == "ok") {

                let sendData = {
                    id: essId,
                    eventType: 'req',
                    deviceType: 'pcs',
                    dataType: 'control',
                    data: {targetId: targetId, controlType: 'emergencyStop', controlValue: '1'}
                };

                ws.send(JSON.stringify(sendData));

                controlCodeName = '긴급 정지';
                deviceGbnCodeName = 'PCS';

            } else {
                console.log("닫기");
            }
        });
    } else {
        alertControlFail();
    }
}

ws.onmessage = (event) => {
    console.log("---------------------------------------------");
    console.log("PMS : Data Received From Server");

    let receivedData = JSON.parse(event.data);

    //장비 연결 실패 Error 수신
    if (receivedData.eventType == 'deviceConnectionFail') {
        console.log('              deviceConnectionFail                ');
        console.log(event.data);
        console.log('PMS id : ' + receivedData.id);
        console.log('PMS eventType : ' + receivedData.eventType);
        console.log('PMS deviceType : ' + receivedData.deviceType);
        console.log('PMS message : ' + receivedData.message);

        switch (receivedData.deviceType) {
            case 'pcs':
                //M/W 가 pcs 데이터 수신 실패
                if (receivedData.message.indexOf('연결 실패') != -1) {
                    setMessageLayout(false , 'M/W 와 PCS 상태를 확인하여 주십시오.');
                }

                //M/W 가 pcs 제어 실패
                else if (receivedData.message.indexOf('제어 실패') != -1) {
                    //제어 이력 insert
                    insertControlHistory("fail", "M/W가 PCS 제어에 실패하였습니다.\n확인후 다시 시도해주세요.");
                }

                break;

            //M/W 미접속으로 제어 실패
            case 'M/W':

                //제어 이력 insert
                insertControlHistory("fail", "M/W가 연결되어 있지 않습니다.\n확인후 다시 시도해주세요.");
                break;
        }
    }

    //정상 데이터 수신
    else {
        switch (receivedData.dataType) {
            //접속
            case 'connect':
                console.log('              connect                ');
                console.log(event.data);
                console.log('PMS id : ' + receivedData.id);
                console.log('PMS eventType : ' + receivedData.eventType);
                console.log('PMS dataType : ' + receivedData.dataType);
                console.log('PMS result : ' + receivedData.result);
                console.log('PMS message : ' + receivedData.message);

                if (ws.readyState == 1) {
                    setButtonAttribute();
                } else {
                    setMessageLayout(false , '서버 상태를 확인하여 주십시오.');
                }

                break;

            //상태 데이터
            case 'status':
                console.log('              status                ');
                console.log(event.data);
                console.log('PMS id : ' + receivedData.id);
                console.log('PMS eventType : ' + receivedData.eventType);
                console.log('PMS deviceType : ' + receivedData.deviceType);
                console.log('PMS dataType : ' + receivedData.dataType);

                //PCS 정보
                switch (receivedData.deviceType) {
                    case "pcs":
                        console.log('PMS operationStatus : ' + receivedData.data.operationStatus);
                        console.log('PMS faultExistYn : ' + receivedData.data.faultExistYn);
                        console.log('PMS disChargePower : ' + receivedData.data.disChargePower);

                        //장비 정상
                        if (receivedData.data.faultExistYn == 'N') {


                            //대기중
                            if (receivedData.data.operationStatus == 'waiting') {
                                setMessageLayout(true, '');

                                setEmergencyButtonAttribute("off");
                                setChargeButtonAttribute("on");
                                setDischargeButtonAttribute("on");

                                checkChargeGbn();
                            }

                            //충전중 또는 방전중
                            else {
                                setButtonAttribute();
                            }
                        }

                        //장비 고장
                        else if (receivedData.data.faultExistYn == 'Y') {
                            setMessageLayout(false, '장비 고장 발생');
                        }

                        break;
                }

                break;

            //웹소켓 서버로부터 제어 응답 수신
            case 'control':
                console.log('              control                ');
                console.log(event.data);
                console.log('PMS id : ' + receivedData.id);
                console.log('PMS eventType : ' + receivedData.eventType);
                console.log('PMS dataType : ' + receivedData.dataType);
                console.log('PMS result : ' + receivedData.result);
                console.log('PMS message : ' + receivedData.message);

                var alertMessage;
                if (receivedData.result == 'success') {
                    alertMessage = "제어 요청이 전송되었습니다.";
                } else {
                    alertMessage = "제어 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.";
                }

                insertControlHistory(receivedData.result, alertMessage);

                break;

            default:
                console.log('              default                ');
        }
    }

    console.log("---------------------------------------------\n\n");
}

//제어 이력 insert & 충방전 계약 이행 완료 여부 '진행중'으로 수정
function insertControlHistory(result, alertMessage) {
    axboot.call({
        type: "POST",
        url: ["commandControlHistory", "insert"],
        data: JSON.stringify({
            codeName: controlCodeName
            , deviceGbnCodeName: deviceGbnCodeName
            , responseDt: Math.floor(new Date().getTime() / 1000)
            , commandResponseValue: result

        }),
        callback: function (res) {
            console.log("11111");

            if (controlCodeName == '충전' || controlCodeName == '방전') {
                axboot.ajax({
                    type: "POST",
                    url: ["chargeDischargeContractMgnt", "updateContractCompleteYn"],
                    data: JSON.stringify({
                        essCode: essCode,
                        chargeTargetSeq: chargeTargetSeq,
                        contractStartDatetimeId: contractStartDatetimeId,
                        contractCompleteYn: 'R'
                    }),
                    callback: function (res) {
                        $('#contractCompleteYn').val('R');
                        setButtonAttribute();

                        controlCodeName = '';
                        deviceGbnCodeName = '';

                    },
                    options: {
                        // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                        onError: function (err) {
                            console.log(err);
                            alertControlResponse("제어 이력 데이터 처리 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.");
                        }
                    }
                });
            }
        },
        options: {
            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
            onError: function (err) {
                console.log(err);
                alertControlResponse("제어 이력 데이터 처리 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.");
            }
        }
    }).done(function () {
        alertControlResponse(alertMessage);
    });
}

//제어 알림창
function alertControlResponse(msg) {
    axDialog.alert({
        title: "장비 제어",
        theme: "primary",
        msg: msg
    });
}

//제어 실패 알림창
function alertControlFail() {
    axDialog.alert({
        title: "장비 제어 실패",
        theme: "primary",
        msg: "서버와 연결이 되어 있지 않습니다.\n확인후 다시 시도해주세요."
    });
}