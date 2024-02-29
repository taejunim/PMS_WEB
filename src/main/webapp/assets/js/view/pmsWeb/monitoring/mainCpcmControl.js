var fnObj = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
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

        axboot.buttonClick(this, "grid-charging-remote-control-btn", {
            "charging": function () {
                console.log("Grid 충전 제어(원격) - 충전 : ");
                axDialog.confirm({
                    msg: "Grid 충전을 진행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "charging", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[0].innerText});
                    }
                });
            },
            "faultResetStart": function () {
                console.log("Grid 충전 제어(원격) - 초기화 시작");
                axDialog.confirm({
                    msg: "Grid Fault 초기화를 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault1", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[1].innerText});
                    }
                });
            },
            "faultResetStop": function () {
                console.log("Grid 충전 제어(원격) - 초기화 종료");
                axDialog.confirm({
                    msg: "Grid Fault 초기화를 종료하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault0", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[2].innerText});
                    }
                });
            },
            "setCurrent": function () {
                console.log("Grid 충전 제어(원격) - 전류 설정");
                if($('#gridCurrent').val() !== '') {
                    if ($('#gridCurrent').val() < 0 ){
                        axDialog.confirm({
                            msg: "Grid 전류를 설정하시겠습니까?"
                        }, function () {
                            if (this.key === "ok") {
                                parent.axboot.modal.callback({deviceType: "cpcm", controlType: "setCurrent", controlValue: $('#gridCurrent').val(), controlName: $('[grid-charging-remote-control-btn]')[3].innerText});
                            }
                        });
                    }else {
                        axDialog.alert({
                            title: "음수값을 입력해 주십시오.",
                            theme: "primary",
                            msg: "전류값은 음수로 입력하여 주십시오."
                        });
                    }
                } else alertCurrentInputEmpty("grid");
            },
            "start": function () {
                console.log("Grid 충전 제어(원격) - 운전");
                axDialog.confirm({
                    msg: "Grid 운전을 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "start", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[4].innerText});
                    }
                });
            },
            "stop": function () {
                console.log("Grid 충전 제어(원격) - 정지");
                axDialog.confirm({
                    msg: "Grid 운전을 정지하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "stop", controlValue : '3', controlName : $('[grid-charging-remote-control-btn]')[5].innerText});
                    }
                });
            },
            "emergencyStop": function () {
                console.log("Grid 충전 제어(원격) - 비상 정지");
                axDialog.confirm({
                    msg: "Grid 비상 정지를 실행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "emergencyStop", controlValue : '1', controlName : $('[grid-charging-remote-control-btn]')[6].innerText});
                    }
                });
            }
        });
        axboot.buttonClick(this, "lGrid-discharging-remote-control-btn", {
            "discharging": function () {
                console.log("L-Grid 충전 제어(원격) - 방전");
                axDialog.confirm({
                    msg: "L-Grid 방전을 진행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "discharging", controlValue : '1', controlName : $('[lGrid-discharging-remote-control-btn]')[0].innerText});
                    }
                });
            },
            "faultResetStart": function () {
                console.log("L-Grid 충전 제어(원격) - 초기화 시작");
                axDialog.confirm({
                    msg: "L-Grid Fault 초기화를 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault1", controlValue : '1', controlName : $('[lGrid-discharging-remote-control-btn]')[1].innerText});
                    }
                });
            },
            "faultResetStop": function () {
                console.log("L-Grid 충전 제어(원격) - 초기화 종료");
                axDialog.confirm({
                    msg: "L-Grid Fault 초기화를 종료하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault0", controlValue : '1', controlName : $('[lGrid-discharging-remote-control-btn]')[2].innerText});
                    }
                });
            },
            "start": function () {
                console.log("L-Grid 충전 제어(원격) - 운전");
                axDialog.confirm({
                    msg: "L-Grid 운전을 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "start", controlValue : '1', controlName : $('[lGrid-discharging-remote-control-btn]')[3].innerText});
                    }
                });
            },
            "stop": function () {
                console.log("L-Grid 충전 제어(원격) - 정지");
                axDialog.confirm({
                    msg: "L-Grid 운전을 정지하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "stop", controlValue : '1', controlName : $('[lGrid-discharging-remote-control-btn]')[4].innerText});
                    }
                });
            }
        });
        axboot.buttonClick(this, "rGrid-discharging-remote-control-btn", {
            "faultResetStart": function () {
                console.log("R-Grid 충전 제어(원격) - 초기화 시작");
                axDialog.confirm({
                    msg: "R-Grid Fault 초기화를 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault1", controlValue : '2', controlName : $('[rGrid-discharging-remote-control-btn]')[0].innerText});
                    }
                });
            },
            "faultResetStop": function () {
                console.log("R-Grid 충전 제어(원격) - 초기화 종료");
                axDialog.confirm({
                    msg: "R-Grid Fault 초기화를 종료하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "resetFault0", controlValue : '2', controlName : $('[rGrid-discharging-remote-control-btn]')[1].innerText});
                    }
                });
            },
            "setCurrent": function () {
                console.log("R-Grid 충전 제어(원격) - 전류 설정");
                if($('#rGridCurrent').val() !== '') {
                    if ($('#rGridCurrent').val() > 0){
                        axDialog.confirm({
                            msg: "R-Grid 전류를 설정하시겠습니까?"
                        }, function () {
                            if (this.key === "ok") {
                                parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "setCurrent", controlValue : $('#rGridCurrent').val(), controlName : $('[rGrid-discharging-remote-control-btn]')[2].innerText});
                            }
                        });
                    }else {
                        axDialog.alert({
                            title: "양수값을 입력해 주십시오.",
                            theme: "primary",
                            msg: "전류값은 양수로 입력하여 주십시오."
                        });
                    }
                } else alertCurrentInputEmpty("rGrid");
            },
            "start": function () {
                console.log("R-Grid 충전 제어(원격) - 운전");
                axDialog.confirm({
                    msg: "R-Grid 운전을 시작하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "start", controlValue : '2', controlName : $('[rGrid-discharging-remote-control-btn]')[3].innerText});
                    }
                });
            },
            "stop": function () {
                console.log("R-Grid 충전 제어(원격) - 정지");
                axDialog.confirm({
                    msg: "R-Grid 운전을 정지하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "stop", controlValue : '2', controlName : $('[rGrid-discharging-remote-control-btn]')[4].innerText});
                    }
                });
            }
        });
        axboot.buttonClick(this, "dc-converter-remote-control-btn", {
            "emergencyStopReady": function () {
                console.log("DC/DC 컨버터 제어(원격) - 비상 정지 준비 (프로토콜 작업 후 진행 예정)");
            },
            "emergencyStop": function () {
                console.log("DC/DC 컨버터 제어(원격) - 비상 정지");
                axDialog.confirm({
                    msg: "DC/DC 컨버터 비상 정지를 실행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "cpcm" , controlType : "dcEmergencyStop", controlValue : '1', controlName : $('[dc-converter-remote-control-btn]')[1].innerText});
                    }
                });
            }
        });
        axboot.buttonClick(this, "battery-remote-control-btn", {
            "normalOperation": function () {
                console.log("배터리 제어(원격) - 정상 운영");
                axDialog.confirm({
                    msg: "배터리 정상 운영을 실행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "battery" , controlType : "normalOperation", controlValue : '1', controlName : $('[battery-remote-control-btn]')[0].innerText});
                    }
                });
            },
            "faultReset": function () {
                console.log("배터리 제어(원격) - fault 리셋");
                axDialog.confirm({
                    msg: "배터리 Fault 초기화를 실행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "battery" , controlType : "faultReset", controlValue : '1', controlName : $('[battery-remote-control-btn]')[1].innerText});
                    }
                });
            },
            "emergencyStop": function () {
                console.log("배터리 제어(원격) - 긴급 정지");
                axDialog.confirm({
                    msg: "배터리 비상 정지를 실행하시겠습니까?"
                }, function () {
                    if (this.key == "ok") {
                        parent.axboot.modal.callback({deviceType : "battery" , controlType : "emergencyStop", controlValue : '1', controlName : $('[battery-remote-control-btn]')[2].innerText});
                    }
                });
            }
        });
        axboot.buttonClick(this, "air-conditioner-remote-control-btn", {
            "cooling": function () {
                console.log("공조장치 제어(원격) - 냉방");
            },
            "heating": function () {
                console.log("공조장치 제어(원격) - 난방");
            },
            "dehumidification": function () {
                console.log("공조장치 제어(원격) - 제습");
            }
        });
    }
});
function alertCurrentInputEmpty(device){
    axDialog.alert({
        title: "전류값 입력이 필요합니다.",
        theme: "primary",
        msg: "설정햐실 전류값을 입력하여 주십시오."
    });
    if(device === "grid") $("#gridCurrent").focus();
    else if(device === "rGrid") $("#rGridCurrent").focus();
}