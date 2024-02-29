var fnObj = {};
var itemClick = false;
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["chargeDischargeContractMgnt", "selectChargeContractInfo"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
                caller.formView01.clear();
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
    PAGE_SAVE: function (caller, act, data) {

        if (caller.formView01.validate()) {
            // 신규 데이터일 경우 저장(pms명이 수정 가능할 경우)
            if (itemClick === false) {
                axboot.ajax({
                    type: "PUT",
                    url: ["/chargeDischargeContractMgnt", "insertContractInfo"],
                    data: JSON.stringify(caller.formView01.getData()),
                    callback: function (res) {
                        if (res.message === "SUCCESS") {
                            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                            axToast.push(LANG("ax.script.onsave"));
                            ACTIONS.dispatch(ACTIONS.FORM_INIT);
                            itemClick = false;
                        } else if (res.message === "primaryKeyError") {
                            axToast.push("동일한 충방전 계약 정보가 등록되어 있습니다.");
                        }
                    }
                });
            }
            // 기존 데이터일 경우 수정
            else {
                axboot.ajax({
                    type: "POST",
                    url: ["chargeDischargeContractMgnt", "updateContractInfo"],
                    data: JSON.stringify(caller.formView01.getData()),
                    callback: function (res) {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                        axToast.push(LANG("ax.script.onupdate")); //저장 알림 토스트
                        ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
                        itemClick = false;
                    }
                });
            }
        }
    },
    ITEM_CLICK: function (caller, act, data) {
        itemClick = true;

        //충방전량 화면
        if (data.chargeOption === '1' || data.chargeOption === '2') {
            $('#chargeAmountKw').removeAttr("disabled");
            $('#chargeAmountPercent').removeAttr("disabled");
        } else {
            $('#chargeAmountKw').attr("disabled", "true");
            $('#chargeAmountPercent').attr("disabled", "true");
        }

        //이행 여부 화면
        $('#completeDefault').hide();
        $('#contractCompleteYn').show();

        caller.formView01.setData(data);
    },
    //신규 버튼 클릭(form_clear)
    FORM_CLEAR: function (caller) {
        itemClick = false;
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key === "ok") {
                caller.formView01.clear();
                //이행 여부 화면
                $("#completeDefault").show();
                $("#contractCompleteYn").hide();
                //충방전량 화면
                $('#chargeAmountKw').attr("disabled", "true");
                $('#chargeAmountPercent').attr("disabled", "true");

            }
        });
    },
    //저장 후 form_clear
    FORM_INIT: function (caller) {
        itemClick = false;
        caller.formView01.clear();
        //이행 여부 화면
        $("#completeDefault").show();
        $("#contractCompleteYn").hide();
        //충방전량 화면
        $('#chargeAmountKw').attr("disabled", "true");
        $('#chargeAmountPercent').attr("disabled", "true");
    },
    ITEM_DEL: function (caller, act, data) {

        if (itemClick === true) {
            axDialog.confirm({
                msg: LANG("ax.script.deleteconfirm")
            }, function () {
                if (this.key === "ok") {
                    axboot.ajax({
                        type: "POST",
                        url: ["chargeDischargeContractMgnt", "deleteContractInfo"],
                        data: JSON.stringify(caller.formView01.getData()),
                        callback: function (res) {
                            if (res.message === "SUCCESS") {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push("삭제되었습니다");
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                                itemClick = false;
                            }
                        }
                    });
                }
            });
        } else {
            axToast.push("삭제하실 목록을 선택해주세요");
        }
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result !== "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    },
    NEW_CONTRACT_MODAL: function (caller, act, data) {

        var targetName = caller.formView01.getData().targetName;

        if (caller.formView01.getData().targetName === undefined) {
            targetName = "";
        }

        axboot.modal.open({
            modalType: "NEW_CONTRACT_MODAL",
            param: "targetName=" + targetName,
            sendData: function () {
                return {};
            },
            callback: function (data) {

                if (data === "close") {
                    this.close();
                    selectChargeTargetSeq();
                } else {

                }
            }
        });
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    dateInit();

    $('#chargeAmountKw').hide();
    $('#chargeAmountPercent').show();
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

Number.prototype.AddZero = function (b, c) {
    var l = (String(b || 10).length - String(this).length) + 1;
    return l > 0 ? new Array(l).join(c || '0') + this : this;
}

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "fn1": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            },
            "new-target": function () {
                ACTIONS.dispatch(ACTIONS.NEW_CONTRACT_MODAL);
            }
        });
        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.chargeGbn = $("#chargeGbn");
        this.startDateFilter = $("#startDateFilter");
        this.endDateFilter = $("#endDateFilter");

        //날짜 picker UI
        var picker = new ax5.ui.picker();

        picker.bind({
            target: $('[data-ax5picker="basic"]'),
            direction: "top",
            content: {
                width: 270,
                margin: 10,
                type: 'date',
                config: {
                    control: {
                        left: '<i class="fa fa-chevron-left"></i>',
                        yearTmpl: '%s',
                        monthTmpl: '%s',
                        right: '<i class="fa fa-chevron-right"></i>'
                    },
                    lang: {
                        yearTmpl: "%s년",
                        months: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
                        dayTmpl: "%s"
                    }
                }
            }
        });
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            chargeGbn: this.chargeGbn.val(),
            startDate: this.startDateFilter.val(),
            endDate: this.endDateFilter.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 18    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "pmsCode", label: "PMS 명", width: 130, align: "center"},
                {key: "targetName", label: "충방전 대상", width: 160, align: "center"},
                {key: "chargeGbnName", label: "충방전 구분", width: 130, align: "center"},
                {key: "chargeAmount", label: "충방전 량", width: 130, align: "center"},
                {key: "contractStartDatetime", label: "시작 시간", width: 210, align: "center"},
                {key: "contractReasonName", label: "계약 사유", width: 140, align: "center"},
                {key: "contractCompleteYnName", label: "이행 여부", width: 110, align: "center"},
                {key: "remark", label: "비고", width: 0},
                {key: "targetAddress", label: "주소", width: 0},
                {key: "contractReasonCode", label: "계약 사유 코드", width: 0},
                {key: "chargeOption", label: "충방전량 구분", width: 0},
                {key: "contractCompleteYn", label: "계약 이행 여부", width: 0},
                {key: "essCode", label: "essCode", width: 0},
                {key: "contractEndDatetime", label: "예상 종료 일자", width: 0}
            ],
            //페이징-페이지 이동
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });

    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    setData: function (_data) {
        // this.target.setData(_data.list);
        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: _data.page.totalPages
            }
        });
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
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

        //충방전량 구분 선택에 따른 변화
        $('#chargeOption').on('change', function () {

            if ($("#chargeOption").val() === '1') {
                $('#chargeAmountKw').hide();
                $('#chargeAmountPercent').show();
                $('#chargeAmountPercent').removeAttr("disabled");
            }
            if ($("#chargeOption").val() === '2'){
                $('#chargeAmountKw').show();
                $('#chargeAmountPercent').hide();
                $('#chargeAmountKw').removeAttr("disabled");
            }
            if ($("#chargeOption").val() === '') {

                $('#chargeAmountKw').attr("disabled", "true");
                $('#chargeAmountPercent').attr("disabled", "true");
            }

        });

        //이행 여부
        $("#completeDefault").show();
        $("#contractCompleteYn").hide();


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
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        //그리드 값 치환
        data.contractStartDatetime = data.contractStartDatetime.replace(" ", "T");
        if (data.contractEndDatetime != undefined) {
            data.contractEndDatetime = data.contractEndDatetime.replace(" ", "T");
        }
        data.chargeAmount = data.chargeAmount.replace("-", "").replace("%", "").replace("Kw", "");


        if (data.chargeAmount === '-') {

            $('#chargeAmountKw').attr("readonly", true);
            $('#chargeAmountPercent').attr("readonly", true);
        }


        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }

        var data = fnObj.formView01.getData();

        // validation check
        if (data.chargeTargetSeq === undefined || data.chargeTargetSeq === "") {
            axToast.push("충방전 대상을 선택해주세요");
            return false;
        }
        if (data.chargeOption === "1" || data.chargeOption === "2") {
            if ($("#chargeAmountKw").val().length < 1 && $("#chargeAmountPercent").val().length < 1) {
                axToast.push("충방전량을 입력해주세요");
                return false;
            }
        }
        if (data.contractStartDatetime === undefined || data.contractStartDatetime === "") {
            axToast.push("시작 일자를 선택해주세요");
            return false;
        }
        if (data.targetAddress === undefined || data.targetAddress === "") {
            axToast.push("충방전 지정 주소를 입력해주세요");
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});

//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1) //이번달 1일
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)  //이번달 말일

    var firstDayYear = firstDay.getFullYear();
    var firstDayMonth = firstDay.getMonth() + 1 >= 10 ? firstDay.getMonth() + 1 : ('0' + (firstDay.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var firstDayDate = firstDay.getDate() >= 10 ? firstDay.getDate() : "0" + firstDay.getDate();     //1-9일까지 앞에 0 추가
    var lastDayYear = lastDay.getFullYear();
    var lastDayMonth = lastDay.getMonth() + 1 >= 10 ? lastDay.getMonth() + 1 : ('0' + (lastDay.getMonth() + 1)).slice(-2);     //1-9월까지 앞에 0 추가
    var lastDayDate = lastDay.getDate() >= 10 ? lastDay.getDate() : "0" + lastDay.getDate();         //1-9일까지 앞에 0 추가

    firstDay = firstDayYear + "-" + firstDayMonth + "-" + firstDayDate;     //0000-00-00
    lastDay = lastDayYear + "-" + lastDayMonth + "-" + lastDayDate;         //0000-00-00

    $("#startDateFilter").val(firstDay);
    $("#endDateFilter").val(lastDay);
}


//숫자 자릿수 제한(kw)
function checkKwMaxNum(evt) {
    var _pattern = /^(\d{1,3}?)?$/;
    var _value = event.srcElement.value;
    if (!_pattern.test(_value)) {
        axToast.push("1000 미만의 숫자만 입력가능합니다.");
        event.srcElement.value = event.srcElement.value.substring(0, event.srcElement.value.length - 1);
        event.srcElement.focus();
    }
}

//숫자 자릿수 제한(percent)
function checkPercentMaxNum(evt) {
    var _pattern = /^(\d{1,2}?)?$/;
    var _value = event.srcElement.value;

        if (!_pattern.test(_value) && _value !=='100') {
            axToast.push("100 이하의 숫자만 입력가능합니다.");
            event.srcElement.value = event.srcElement.value.substring(0, event.srcElement.value.length - 1);
            event.srcElement.focus();
        }
}

function selectChargeTargetSeq() {
    axboot.ajax({
        type: "GET",
        url: ["chargeDischargeContractMgnt", "selectChargeTargetSeq"],
        callback: function (res) {

            $("#chargeTargetSeq").empty();
            $("#chargeTargetSeq").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#chargeTargetSeq").append("<option value='" + obj.code + "'>" + obj.codeNm + "</option>");
            });

        },
        options: {
            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
            onError: function (err) {
                console.log(err);
            },
            nomask: true
        }
    });
}