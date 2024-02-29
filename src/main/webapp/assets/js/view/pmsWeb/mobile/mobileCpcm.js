var fnObj = {};
var controlCodeName;
var deviceGbnCodeName;

var rack_0_faultExistYn = "N";
var rack_1_faultExistYn = "N";

var soc1 = 0.0;
var soc2 = 0.0;
//
// /**
//  * 웹소켓 통신 부분
//  */
// var ws;
// axboot.ajax({
//     type: "GET",
//     url: ["/monitoring", "getWebSocketHost"],
//     callback: function (res) {
//         console.log("웹소켓 서버 정보" + res.map.webSocketHost);
//         axToast.push("웹 소켓 정보를 정상적으로 가져왔습니다.");
//
//         ws = new WebSocket(res.map.webSocketHost);
//         if (ws.readyState != 1) {
//             ws.onopen = (event) => {
//                 let sendData = {id: essId, eventType: 'req', deviceType: 'pms', dataType: 'connect'};
//                 ws.send(JSON.stringify(sendData));
//             }
//         }
//
//         ws.onmessage = (event) => {
//             console.log("---------------------------------------------");
//             console.log("PMS : Data Received From Server");
//
//             middlewareConnectionSuccess();
//
//             let receivedData = JSON.parse(event.data);
//
//             //장비 연결 실패 Error 수신
//             if (receivedData.eventType == 'deviceConnectionFail') {
//                 console.log('              deviceConnectionFail                ');
//                 console.log(event.data);
//                 console.log('Mobile PMS id : ' + receivedData.id);
//                 console.log('Mobile PMS eventType : ' + receivedData.eventType);
//                 console.log('Mobile PMS deviceType : ' + receivedData.deviceType);
//                 console.log('Mobile PMS message : ' + receivedData.message);
//
//                 switch (receivedData.deviceType) {
//                     case 'cpcm':
//
//                         //M/W 가 cpcm 데이터 수신 실패
//                         if (receivedData.message.indexOf('연결 실패') != -1) {
//
//                             deviceConnectionFail('gridStatusLabel');
//                             deviceConnectionFail('dcChargerStatusLabel');
//                         }
//
//                         //M/W 가 cpcm 제어 실패
//                         else if (receivedData.message.indexOf('제어 실패') != -1) {
//                             //제어 이력 insert
//                             insertControlHistory("fail", "M/W가 CPCM 제어에 실패하였습니다.\n확인후 다시 시도해주세요.");
//                         }
//
//                         break;
//
//                     case 'battery':
//
//                         //M/W 가 battery 데이터 수신 실패
//                         if (receivedData.message.indexOf('연결 실패') != -1) {
//
//                             deviceConnectionFail('batteryStatusLabel');
//                         }
//
//                         //M/W 가 battery 제어 실패
//                         else if (receivedData.message.indexOf('제어 실패') != -1) {
//                             //제어 이력 insert
//                             insertControlHistory("fail", "M/W가 배터리 제어에 실패하였습니다.\n확인후 다시 시도해주세요.");
//                         }
//
//                         break;
//
//                     //M/W 미접속으로 제어 실패
//                     case 'M/W':
//                         //제어 모달용 operationStatus 값 저장
//                         sessionStorage.setItem("operationStatus", '');
//
//                         middlewareConnectionFail();
//
//                         //제어 이력 insert
//                         insertControlHistory("fail", "M/W가 연결되어 있지 않습니다.\n확인후 다시 시도해주세요.");
//                         break;
//                 }
//             }
//
//             //정상 데이터 수신
//             else {
//                 switch (receivedData.dataType) {
//                     case 'connect':
//                         console.log('              connect                ');
//                         console.log(event.data);
//                         console.log('Mobile PMS id : ' + receivedData.id);
//                         console.log('Mobile PMS eventType : ' + receivedData.eventType);
//                         console.log('Mobile PMS dataType : ' + receivedData.dataType);
//                         console.log('Mobile PMS result : ' + receivedData.result);
//                         console.log('Mobile PMS message : ' + receivedData.message);
//
//                         break;
//
//                     case 'status':
//                         console.log('              status                ');
//                         console.log(event.data);
//                         console.log('Mobile PMS id : ' + receivedData.id);
//                         console.log('Mobile PMS eventType : ' + receivedData.eventType);
//                         console.log('Mobile PMS deviceType : ' + receivedData.deviceType);
//                         console.log('Mobile PMS dataType : ' + receivedData.dataType);
//
//                         //PCS 정보
//                         switch (receivedData.deviceType) {
//
//                             //M/W 미접속
//                             case "M/W":
//
//                                 middlewareConnectionFail();
//
//                                 break;
//
//                             case "cpcm" :
//                                 console.log('Mobile PMS chargeDischargeStatus : ' + receivedData.data.grid.common.chargeDischargeStatus);
//                                 console.log('Mobile PMS cpcmFaultExistYn : ' + receivedData.data.grid.common.faultExistYn);
//
//                                 let cpcmData = receivedData.data;
//                                 let gridCommon = cpcmData.grid.common;
//                                 let dcCommon = cpcmData.dc.common;
//
//                                 let gridChargingStatus = commonCodeMap.get("CHARGING_STATUS_" + gridCommon.chargeDischargeStatus);
//
//                                 if (gridCommon.chargeDischargeStatus !== '0' && gridCommon.chargeDischargeStatus !== '1' && gridCommon.chargeDischargeStatus !== '2') {
//                                     gridChargingStatus = "코드 없음";
//                                 }
//
//                                 if(gridCommon.warningExistYn === "Y") gridChargingStatus = "경고";
//                                 if(gridCommon.faultExistYn === "Y")   gridChargingStatus = "고장";
//
//                                 if(gridChargingStatus === "고장" || gridChargingStatus === "코드 없음") {
//                                     setDeviceStatus('gridStatusLabel', gridChargingStatus, '#e74c3c');
//                                 } else if(gridChargingStatus === "경고") {
//                                     setDeviceStatus('gridStatusLabel', gridChargingStatus, '#f38b35');
//                                 } else {
//                                     setDeviceStatus('gridStatusLabel', gridChargingStatus, '#66ADD9');
//                                 }
//
//                                 let dcChargingStatus = "";
//
//                                 if(dcCommon.ledStatus !== "12" && dcCommon.ledStatus !== "결함" && dcCommon.ledStatus !== "코드 없음") {
//                                     dcChargingStatus = "대기중";
//                                 }
//
//                                 if(dcChargingStatus !== "대기중") dcChargingStatus = commonCodeMap.get("STATUS_GBN_" + dcCommon.ledStatus);
//
//                                 if(dcCommon.warningExistYn === "Y") dcChargingStatus = "경고";
//                                 if(dcCommon.faultExistYn === "Y")   dcChargingStatus = "고장";
//
//                                 if(dcChargingStatus === "고장" || dcChargingStatus === "코드 없음") {
//                                     setDeviceStatus('dcChargerStatusLabel', dcChargingStatus, '#e74c3c');
//                                 } else if(dcChargingStatus === "경고") {
//                                     setDeviceStatus('dcChargerStatusLabel', dcChargingStatus, '#f38b35');
//                                 } else {
//                                     setDeviceStatus('dcChargerStatusLabel', dcChargingStatus, '#66ADD9');
//                                 }
//
//                                 break;
//
//                             case "battery":
//                                 console.log('Mobile PMS rackNo : ' + receivedData.data.rackNo);
//                                 console.log('Mobile PMS chargingStatus : ' + receivedData.data.chargingStatus);
//                                 console.log('Mobile PMS faultExistYn : ' + receivedData.data.faultExistYn);
//                                 console.log('Mobile PMS soc : ' + receivedData.data.soc);
//                                 console.log('Mobile PMS rackVolt : ' + receivedData.data.rackVolt);
//                                 console.log('Mobile PMS rackCurrent : ' + receivedData.data.rackCurrent);
//
//                                 let rackData = receivedData.data;
//                                 let rackNo = rackData.rackNo.charAt(rackData.rackNo.length - 1);
//
//                                 //var rackStatus = statusCodeMap.get("CHARGING_STATUS_" + rackData.chargingStatus);
//
//                                 let rackStatus;
//                                 rackStatus = chargingStatusKo(rackData);     //충방전 한글 표기
//
//                                 if (rackNo === '1') {
//                                     rack_0_faultExistYn = rackData.faultExistYn;
//                                     soc1 = rackData.soc;
//                                 } else if (rackNo === '2') {
//                                     rack_1_faultExistYn = rackData.faultExistYn;
//                                     soc2 = rackData.soc;
//                                 }
//
//                                 //배터리 장비 상태
//                                 if (rack_0_faultExistYn === 'Y' || rack_1_faultExistYn === 'Y') {
//
//                                     setDeviceStatus('batteryStatusLabel', '고장', '#e74c3c');
//
//                                 } else if (rack_0_faultExistYn === 'N' && rack_1_faultExistYn === 'N') {
//
//                                     if (rackStatus !== '충전중' && rackStatus !== '방전중' && rackStatus !== '대기중') {
//                                         setDeviceStatus('batteryStatusLabel', '-', '#848484');
//                                     } else {
//                                         setDeviceStatus('batteryStatusLabel', rackStatus, '#66ADD9');
//                                     }
//
//                                 } else {
//
//                                     deviceConnectionFail('batteryStatusLabel');
//                                 }
//
//                                 //배터리 평균 soc 차트 데이터
//                                 reloadGaugeChartData((Number(soc1) + Number(soc2)) / 2);
//
//                                 break;
//                         }
//                         break;
//
//                     //웹소켓 서버로부터 제어 응답 수신
//                     case 'control':
//                         console.log('              control                ');
//                         console.log(event.data);
//                         console.log('Mobile PMS id : ' + receivedData.id);
//                         console.log('Mobile PMS eventType : ' + receivedData.eventType);
//                         console.log('Mobile PMS dataType : ' + receivedData.dataType);
//                         console.log('Mobile PMS result : ' + receivedData.result);
//                         console.log('Mobile PMS message : ' + receivedData.message);
//
//                         var alertMessage;
//                         if (receivedData.result == 'success') {
//                             alertMessage = "제어 요청이 전송되었습니다.";
//                         } else {
//                             alertMessage = "제어 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.";
//                         }
//
//                         insertControlHistory(receivedData.result, alertMessage);
//
//                         break;
//
//                     default:
//                         console.log('              default                ');
//                 }
//             }
//
//             console.log("---------------------------------------------\n\n");
//         }
//     },
//     options: {
//         // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
//         onError: function (err) {
//             axToast.push("웹 소켓 정보를 가져오지 못했습니다.");
//             console.log(err);
//         },
//         nomask : true
//     }
// });

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    // this.pageButtonView.initView();
    // makeGaugeChartData('#statusChart',0, 100);
    // middlewareConnectionFail();
    donutChart('mobileChart',18);



};

var ACTIONS = axboot.actionExtend(fnObj, {
    CHARGE_DISCHARGE_CONTROL_MODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "CONTROL_MODAL",
            param: "controlType="+data.controlType+"&controlTitle="+data.controlTitle+"&controlMessage="+data.controlMessage+"",
            sendData: function () {
                return {};
            },
            callback: function (data) {
                console.log(data);
                this.close();

                let sendData = {
                    id: essId,
                    eventType: 'req',
                    deviceType: 'cpcm',
                    dataType: 'control',
                    data: {targetId: targetId, controlType: data.controlType, controlValue: data.controlValue}
                };

                ws.send(JSON.stringify(sendData));
            }
        });
    }
});

/**
 * pageButtonView
 */
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "cpcm-remote-control-btn", {
            /*"auto": function () {
                console.log("pcs제어-자동");

                if (ws.readyState == 1) {
                    sendControlCommand({controlType : "auto", controlValue : 'Y', controlName : '자동'});

                } else {
                    alertControlFail();
                }
            },
            "manual": function () {
                console.log("pcs제어-수동");

                if (ws.readyState == 1) {
                    sendControlCommand({controlType : "auto", controlValue : 'N', controlName : '수동'});

                } else {
                    alertControlFail();
                }
            },*/
        });


        axboot.buttonClick(this, "grid-charging-remote-control-btn", {
            "charging": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 충전 : ");
                    axDialog.confirm({
                        msg: "Grid 충전을 진행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {

                            sendControlCommand({deviceType : "cpcm" , controlType : "charging", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[0].innerText});
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultResetStart": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 초기화 시작");
                    axDialog.confirm({
                        msg: "Grid Fault 초기화를 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault1",
                                controlValue: '3',
                                controlName: $('[grid-charging-remote-control-btn]')[1].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultResetStop": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 초기화 종료");
                    axDialog.confirm({
                        msg: "Grid Fault 초기화를 종료하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault0",
                                controlValue: '3',
                                controlName: $('[grid-charging-remote-control-btn]')[2].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "setCurrent": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 전류 설정");
                    if ($('#gridCurrent').val() !== '') {
                        if ($('#gridCurrent').val() < 0) {
                            axDialog.confirm({
                                msg: "Grid 전류를 설정하시겠습니까?"
                            }, function () {
                                if (this.key === "ok") {
                                    sendControlCommand({
                                        deviceType: "cpcm",
                                        controlType: "setCurrent",
                                        controlValue: $('#gridCurrent').val(),
                                        controlName: $('[grid-charging-remote-control-btn]')[3].innerText
                                    });
                                }
                            });
                        } else {
                            axDialog.alert({
                                title: "음수값을 입력해 주십시오.",
                                theme: "primary",
                                msg: "전류값은 음수로 입력하여 주십시오."
                            });
                        }
                    } else alertCurrentInputEmpty("grid");
                } else {
                    alertControlFail();
                }
            },
            "start": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 운전");
                    axDialog.confirm({
                        msg: "Grid 운전을 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "start",
                                controlValue: '3',
                                controlName: $('[grid-charging-remote-control-btn]')[4].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "stop": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 정지");
                    axDialog.confirm({
                        msg: "Grid 운전을 정지하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "stop",
                                controlValue: '3',
                                controlName: $('[grid-charging-remote-control-btn]')[5].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "emergencyStop": function () {
                if (ws.readyState == 1) {
                    console.log("Grid 충전 제어(원격) - 비상 정지");
                    axDialog.confirm({
                        msg: "Grid 비상 정지를 실행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "emergencyStop",
                                controlValue: '1',
                                controlName: $('[grid-charging-remote-control-btn]')[6].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            }
        });

        axboot.buttonClick(this, "lGrid-discharging-remote-control-btn", {
            "discharging": function () {
                if (ws.readyState == 1) {
                    console.log("L-Grid 충전 제어(원격) - 방전");
                    axDialog.confirm({
                        msg: "L-Grid 방전을 진행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "discharging",
                                controlValue: '1',
                                controlName: $('[lGrid-discharging-remote-control-btn]')[0].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultResetStart": function () {
                if (ws.readyState == 1) {
                    console.log("L-Grid 충전 제어(원격) - 초기화 시작");
                    axDialog.confirm({
                        msg: "L-Grid Fault 초기화를 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault1",
                                controlValue: '1',
                                controlName: $('[lGrid-discharging-remote-control-btn]')[1].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultResetStop": function () {
                if (ws.readyState == 1) {
                    console.log("L-Grid 충전 제어(원격) - 초기화 종료");
                    axDialog.confirm({
                        msg: "L-Grid Fault 초기화를 종료하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault0",
                                controlValue: '1',
                                controlName: $('[lGrid-discharging-remote-control-btn]')[2].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "start": function () {
                if (ws.readyState == 1) {
                    console.log("L-Grid 충전 제어(원격) - 운전");
                    axDialog.confirm({
                        msg: "L-Grid 운전을 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "start",
                                controlValue: '1',
                                controlName: $('[lGrid-discharging-remote-control-btn]')[3].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "stop": function () {
                if (ws.readyState == 1) {
                    console.log("L-Grid 충전 제어(원격) - 정지");
                    axDialog.confirm({
                        msg: "L-Grid 운전을 정지하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "stop",
                                controlValue: '1',
                                controlName: $('[lGrid-discharging-remote-control-btn]')[4].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            }
        });

        axboot.buttonClick(this, "rGrid-discharging-remote-control-btn", {
            "faultResetStart": function () {
                if (ws.readyState == 1) {
                    console.log("R-Grid 충전 제어(원격) - 초기화 시작");
                    axDialog.confirm({
                        msg: "R-Grid Fault 초기화를 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault1",
                                controlValue: '2',
                                controlName: $('[rGrid-discharging-remote-control-btn]')[0].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultResetStop": function () {
                if (ws.readyState == 1) {
                    console.log("R-Grid 충전 제어(원격) - 초기화 종료");
                    axDialog.confirm({
                        msg: "R-Grid Fault 초기화를 종료하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "resetFault0",
                                controlValue: '2',
                                controlName: $('[rGrid-discharging-remote-control-btn]')[1].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "setCurrent": function () {
                if (ws.readyState == 1) {
                    console.log("R-Grid 충전 제어(원격) - 전류 설정");
                    if ($('#rGridCurrent').val() !== '') {
                        if ($('#rGridCurrent').val() > 0) {
                            axDialog.confirm({
                                msg: "R-Grid 전류를 설정하시겠습니까?"
                            }, function () {
                                if (this.key === "ok") {
                                    sendControlCommand({
                                        deviceType: "cpcm",
                                        controlType: "setCurrent",
                                        controlValue: $('#rGridCurrent').val(),
                                        controlName: $('[rGrid-discharging-remote-control-btn]')[2].innerText
                                    });
                                }
                            });
                        } else {
                            axDialog.alert({
                                title: "양수값을 입력해 주십시오.",
                                theme: "primary",
                                msg: "전류값은 양수로 입력하여 주십시오."
                            });
                        }
                    } else alertCurrentInputEmpty("rGrid");
                } else {
                    alertControlFail();
                }
            },
            "start": function () {
                if (ws.readyState == 1) {
                    console.log("R-Grid 충전 제어(원격) - 운전");
                    axDialog.confirm({
                        msg: "R-Grid 운전을 시작하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "start",
                                controlValue: '2',
                                controlName: $('[rGrid-discharging-remote-control-btn]')[3].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "stop": function () {
                if (ws.readyState == 1) {
                    console.log("R-Grid 충전 제어(원격) - 정지");
                    axDialog.confirm({
                        msg: "R-Grid 운전을 정지하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "stop",
                                controlValue: '2',
                                controlName: $('[rGrid-discharging-remote-control-btn]')[4].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            }
        });

        axboot.buttonClick(this, "dc-converter-remote-control-btn", {
            "emergencyStopReady": function () {
                console.log("DC/DC 컨버터 제어(원격) - 비상 정지 준비 (프로토콜 작업 후 진행 예정)");
            },
            "emergencyStop": function () {
                if (ws.readyState == 1) {
                    console.log("DC/DC 컨버터 제어(원격) - 비상 정지");
                    axDialog.confirm({
                        msg: "DC/DC 컨버터 비상 정지를 실행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {

                            sendControlCommand({
                                deviceType: "cpcm",
                                controlType: "dcEmergencyStop",
                                controlValue: '1',
                                controlName: $('[dc-converter-remote-control-btn]')[1].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            }
        });

        axboot.buttonClick(this, "battery-remote-control-btn", {
            "normalOperation": function () {
                if (ws.readyState == 1) {
                    console.log("배터리 제어(원격) - 정상 운영");
                    axDialog.confirm({
                        msg: "배터리 정상 운영을 실행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "battery",
                                controlType: "normalOperation",
                                controlValue: '1',
                                controlName : $('[battery-remote-control-btn]')[0].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "faultReset": function () {
                if (ws.readyState == 1) {
                    console.log("배터리 제어(원격) - fault 리셋");
                    axDialog.confirm({
                        msg: "배터리 Fault 초기화를 실행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "battery",
                                controlType: "faultReset",
                                controlValue: '1',
                                controlName : $('[battery-remote-control-btn]')[1].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            },
            "emergencyStop": function () {
                if (ws.readyState == 1) {
                    console.log("배터리 제어(원격) - 긴급 정지");
                    axDialog.confirm({
                        msg: "배터리 비상 정지를 실행하시겠습니까?"
                    }, function () {
                        if (this.key == "ok") {
                            sendControlCommand({
                                deviceType: "battery",
                                controlType: "emergencyStop",
                                controlValue: '1',
                                controlName : $('[battery-remote-control-btn]')[2].innerText
                            });
                        }
                    });
                } else {
                    alertControlFail();
                }
            }
        });
    }
});

function sendControlCommand(data) {
    console.log("control : " + data);

    if (ws.readyState == 1) {

        let sendData;

        switch (data.controlType) {
            case 'auto':
                //PMS 제어 자동 여부 설정
                axboot.ajax({
                    type: "PUT",
                    url: ["/monitoring","setPmsAutoYn"],
                    data: JSON.stringify({autoYn: data.controlValue}),
                    callback: function (resultData) {

                        console.log('result controlValue : ' + resultData);

                        if (resultData != 'fail') {
                            sendData = {
                                id: essId,
                                eventType: 'req',
                                deviceType: 'pcs',
                                dataType: 'control',
                                data: {targetId: operationMonitoringId, controlType: data.controlType, controlValue: data.controlValue}
                            };

                            ws.send(JSON.stringify(sendData));

                            deviceGbnCodeName = 'M/W';
                        } else if (resultData == 'fail') {
                            alertControlResponse("제어 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.");
                        }
                    }
                });

                break;
            case 'charging' :
            case 'discharging' :

            case 'setCurrent' :

            case 'start' :
            case 'stop' :

            case 'emergencyStop' :
            case 'resetFault0' :
            case 'resetFault1' :
            case 'faultReset' :
            case 'normalOperation' :
            case 'dcEmergencyStop' :

                sendData = {
                    id: essId,
                    eventType: 'req',
                    deviceType: data.deviceType,
                    dataType: 'control',
                    data: {targetId: targetId, controlType: data.controlType, controlValue: data.controlValue}
                };

                ws.send(JSON.stringify(sendData));
                console.log(sendData);
                if(data.deviceType === 'cpcm')
                    deviceGbnCodeName = 'CPCM';
                else if(data.deviceType === 'battery')
                    deviceGbnCodeName = '배터리';
                break;
        }

        controlCodeName = data.controlName; //제어 이력에 쌓기 위함

    } else {
        alertControlFail();
    }

}

//제어 이력 insert
function insertControlHistory(result, alertMessage) {
    axboot.ajax({
        type: "POST",
        url: ["commandControlHistory", "insert"],
        data: JSON.stringify({
            codeName: controlCodeName
            , deviceGbnCodeName: deviceGbnCodeName
            , responseDt: Math.floor(new Date().getTime() / 1000)
            , commandResponseValue: result
        }),
        callback: function (res) {
            controlCodeName = '';
            deviceGbnCodeName = '';
            alertControlResponse(alertMessage);
        },
        options: {
            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
            onError: function (err) {
                console.log(err);
                if(err.message.indexOf("foreign key") > -1)
                    alertControlResponse("해당 제어 명령어 등록이 필요합니다.\n[ESS 제어 명령어 관리] 화면에서\n해당 명령어를 등록하여 주세요.");
                else alertControlResponse("제어 이력 데이터 처리 요청 전송중 오류가 발생하였습니다.\n문제 지속시 관리자에게 문의해주세요.");
            }
        }
    });
}

//제어 알림창
function alertControlResponse(msg) {
    parent.axDialog.alert({
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

//미들웨어 연결 성공 -> 에어컨 센서는 추후 수정해야 함
function middlewareConnectionSuccess() {
    $('#pmsStatusLabel').html("수동");
    $('#pmsStatusLabel').css('background-color', '#66ADD9');

    //$('#cpcmAirConditionerStatusLabel').html("-");
    //$('#cpcmAirConditionerStatusLabel').css('background-color', '#848484');

    //$('#batteryAirConditionerStatusLabel').html("-");
    //$('#batteryAirConditionerStatusLabel').css('background-color', '#848484');
}

//미들웨어 연결 실패
function middlewareConnectionFail() {
    //$('#pmsStatusLabel').html("M/W 연결 실패");
    //$('#pmsStatusLabel').css('background-color', '#e74c3c');

    $('#gridStatusLabel').html("M/W 연결 실패");
    $('#gridStatusLabel').css('background-color', '#e74c3c');

    $('#dcChargerStatusLabel').html("M/W 연결 실패");
    $('#dcChargerStatusLabel').css('background-color', '#e74c3c');

    $('#batteryStatusLabel').html("M/W 연결 실패");
    $('#batteryStatusLabel').css('background-color', '#e74c3c');

    $('#cpcmAirConditionerStatusLabel').html("M/W 연결 실패");
    $('#cpcmAirConditionerStatusLabel').css('background-color', '#e74c3c');

    $('#batteryAirConditionerStatusLabel').html("M/W 연결 실패");
    $('#batteryAirConditionerStatusLabel').css('background-color', '#e74c3c');

    reloadGaugeChartData('-1');
}

function setDeviceStatus(device, status, color) {
    $('#'+device).html(status);
    $('#'+device).css('background-color', color);
}

//장비 연결 실패
function deviceConnectionFail(device) {
    $('#'+device).html('연결 실패');
    $('#'+device).css('background-color', '#e74c3c');
}

function alertCurrentInputEmpty(device){
    axDialog.alert({
        title: "전류값 입력이 필요합니다.",
        theme: "primary",
        msg: "설정햐실 전류값을 입력하여 주십시오."
    });
    if(device === "grid") $("#gridCurrent").focus();
    else if(device === "rGrid") $("#rGridCurrent").focus();
}

//충전상태 한글 표기
function chargingStatusKo(rackData) {
    let rackStatus = '';
    if (rackData.chargingStatus === 'charging') {
        rackStatus = '충전중';
    } else if (rackData.chargingStatus === 'discharging') {
        rackStatus = '방전중';
    } else if (rackData.chargingStatus === 'waiting') {
        rackStatus = '대기중';
    } else {
        rackStatus = '-';
    }
    return rackStatus;
}