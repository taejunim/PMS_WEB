var fnObj = {};
var essCode = null;
var controlData;
let tmpUpdateObject = null;
var ACTIONS = axboot.actionExtend(fnObj, {
    //페이지 조회
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/essManagement", "list"],
            data: $.extend({}, {essType : essType, essCode : essCode}),
            callback: function (res) {
                var data = res.mapResponse.map.list;
                caller.formView01.setData(data);
                if (data != null) {
                    essCode = data.essCode;
                }

                tmpUpdateObject = JSON.stringify(data);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });
        return false;
    },
    //페이지 저장 (신규/수정)
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var data = caller.formView01.getData();
            if (essCode === null) {
                // 신규 데이터일 경우 저장
                axDialog.confirm({
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["/essManagement","insert"],
                            data: JSON.stringify(data),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onsave"));
                            }
                        });
                    }
                })
            } else {
                if (data.latitude === undefined || data.latitude === "") {
                    data.latitude = null;
                }

                if (data.longitude === undefined || data.longitude === "") {
                    data.longitude = null;
                }

                // 기존 데이터일 경우 수정
                if (controlData.controlCode !== undefined) {
                    axDialog.confirm({
                        msg: LANG("ax.script.onupdatemsg")
                    }, function () {
                        if (this.key == "ok") {
                            axboot.ajax({
                                type: "POST",
                                url: ["/essManagement","update"],
                                data: JSON.stringify(data),
                                callback: function (res) {

                                    if (ws.readyState === 1 && connection) {
                                        sendControldData(controlData);
                                    } else {
                                        rollBackUpdate(false);
                                    }
                                }
                            });
                        }
                    })
                }
            }
        }
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.formView01.initView();
    selectCommandList();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
        });
    }
});

/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();
    },
    initEvent: function () {
        var _this = this;
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
    },
    setData: function (data) {
        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경

        if ($("#essCode").val() != null && $("#essCode").val() != "") {
            this.target.find('[data-ax-path="essCode"]').attr("readonly", "readonly");
            this.target.find('[id="essType"]').attr("disabled", "disabled");
        } else {
            this.target.find('[data-ax-path="essCode"]').removeAttr("readonly");
            this.target.find('[id="essType"]').removeAttr("disabled");
        }

        //이동형 선택시 위치주소,위도,경도 비활성화
        $("#essType").change(function(){
            var data = $(this).val();
            if (data == "02") {
                $("#locationAddress").val("").attr("disabled", "disabled");
                $("#latitude").val("").attr("disabled", "disabled");
                $("#longitude").val("").attr("disabled", "disabled");
                $("#autoControlFlag").val("N").attr("disabled", "disabled");
            } else {
                $("#locationAddress").removeAttr("disabled");
                $("#latitude").removeAttr("disabled");
                $("#longitude").removeAttr("disabled");
                $("#autoControlFlag").removeAttr("disabled");
            }
        });

        $("#energyUpdatedDate").text((data.energyUpdatedDate ? data.energyUpdatedDate : '-'));
        $("#totalCharge").text((data.totalCharge ? data.totalCharge : '-'));
        $("#totalDischarge").text(data.totalDischarge ? data.totalDischarge : '-');
    },
    validate: function () {
        var rs = this.model.validate();
        var data = fnObj.formView01.getData();

        if (data.essCode === undefined || data.essCode === "") {
            axToast.push("ESS 코드를 입력해주세요");
            return false;
        }

        if (data.essCode.length > 4) {
            axToast.push("ESS 코드를 4자리 이하로 입력해주세요");
            return false;
        }

        if (data.essName === undefined || data.essName === "") {
            axToast.push("ESS 명을 입력해주세요");
            return false;
        }

        if (data.totalBatteryEnergy === undefined || data.totalBatteryEnergy === "") {
            axToast.push("배터리 총 용량을 입력해주세요");
            return false;
        }

        if (data.contractPower === undefined || data.contractPower === "") {
            axToast.push("계약 전력을 입력해주세요");
            return false;
        }

        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});


/**
 * 입력값 숫자,소수점,자리수 체크 -- Double
 * @param {String} str
 * @param {String} id
 * @returns {string|*}
 */
function onKeyNumberCheck(str,id) {
    var count = 0;
    var idx = str.indexOf('.');
    var pattern1 = /[^-0-9.]/g;
    var data = str.replace(pattern1,'');

    str = data;

    while(idx != -1){
        count ++;
        idx = str.indexOf('.',idx+1);
    }

    if (count > 1 || str.startsWith('.') || str.includes('-', 1)) {
        axToast.push("잘못된 형식의 값이 입력되었습니다. 다시 입력해 주세요");
        return "";
    }

    return data;
}


//제어명령어 데이터 세팅
function setCommandList() {
    let selectData = controlList.find(obj => obj.controlType == '9000');

    controlData = {
        deviceCategory: selectData.deviceCategory,
        deviceCategorySub: selectData.deviceCategorySub,
        deviceCode: selectData.deviceCode,
        controlCode: selectData.controlCode,
        controlValue: ''}
}


/**
 * 수정 데이터 rollBack
 * @param status    {Boolean}   :: true - 응답값 실패, false - 통신불가
 */
function rollBackUpdate (status) {
    axboot.call({
        type: "POST",
        url: ["/essManagement","update"],
        data: tmpUpdateObject,
        callback: function (res) { }
    }).done(function () {
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        tmpUpdateObject = null;
        if (status) {
            // 제어요청 응답값이 실패일 때
            alertMessage("ESS 정보 수정 실패", "ESS 정보 수정에 실패하였습니다.\n 잠시 후 다시 시도 바랍니다.");
        } else {
            //통신불가일 때
            alertMessage("ESS 정보 수정 불가", "현재 ESS 정보 수정이 불가 상태입니다.\n 통신 상태를 확인 후 다시 시도 바랍니다.");
        }
    });
}



/**
 * 응답값 성공 시
 */
function controlSuccess() {
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    tmpUpdateObject = null;
    alertMessage("ESS 정보 수정 성공", "ESS 정보 수정에 성공하였습니다.");
}