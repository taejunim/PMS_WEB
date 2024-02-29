var fnObj = {};
var addRowFlag = false;
var deleteRowFlag = false;
var planChargeDischargeDate = "";
var ACTIONS = axboot.actionExtend(fnObj, {
    //그리드1 조회
    PAGE_SEARCH: function (caller, act, data) {

        caller.gridView02.setData(null);

        axboot.ajax({
            type: "GET",
            url: ["chargePlanPeriodMgnt", "selectChargePlanPeriodMgnt"],
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
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
    //그리드1 클릭
    ITEM_CLICK: function (caller, act, data) {
        deleteRowFlag = false;
        addRowFlag = false;

        planChargeDischargeDate = data.planChargeDischargeDate;

        selectDetailData(caller, planChargeDischargeDate);

    },
    //그리드2 추가
    GRID2_ADD: function (caller, act, data) {
        caller.gridView02.addRow(caller);
    },
    //그리드2 삭제
    GRID2_DELETE: function (caller, act, data) {

        if (!deleteRowFlag) {
            caller.gridView02.delRow("selected");

            deleteRowFlag = true;
        } else {

            axToast.push("그리드에서 삭제할 내역을 저장하여 주십시오.");
        }
    },
    //그리드2 저장
    GRID2_SAVE: function (caller, act, data) {

        var saveList = [].concat(caller.gridView02.getData("modified"));
        saveList = saveList.concat(caller.gridView02.getData("deleted"));

        if (planDetailValidation(saveList)) {

            axboot.ajax({
                type: "PUT",
                contentType: 'application/json',
                url: ["chargePlanPeriodMgnt", "insertChargeDischargePlanDetail"],
                data: JSON.stringify(saveList),
                callback: function (res) {

                    if (res.status === 200) {

                        //충방전 계획 상세 조회
                        selectDetailData(caller, planChargeDischargeDate);
                        axToast.push(LANG("onsave"));

                    } else {

                        axToast.push(res.message);
                    }

                    deleteRowFlag = false;
                    addRowFlag = false;
                }
            });
        }
    },
});


function selectDetailData(caller, planChargeDischargeDate) {

    axboot.ajax({
        type: "GET",
        url: ["chargePlanPeriodMgnt", "selectChargeDischargePlanDetail"],
        data: {"planChargeDischargeDate": planChargeDischargeDate},
        callback: function (res) {

            caller.gridView02.setData(res.mapResponse.map);
        }
    });

}

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    dateInit(); //수정일자 default값

    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.gridView02.initView();


    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);

                addRowFlag = false;
                deleteRowFlag = false;

            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);

                addRowFlag = false;
                deleteRowFlag = false;

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
        this.pmsCodeFilter = $("#pmsCodeFilter");
        this.month = $("#month");

        //날짜 picker UI
        var picker = new ax5.ui.picker();
        // 월별 달력 Start
        picker.bind({
            target: $('[data-ax5picker="monthPicker"]'),
            content: {
                type: 'date',
                config: {
                    mode: "year", selectMode: "month"
                },
                lang: {
                    yearTmpl: "%s년",
                    months: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
                    dayTmpl: "%s"
                },
                formatter: {
                    pattern: 'date(month)'
                }
            }
        });
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            pmsCode: this.pmsCodeFilter.val(),                  //pms 명
            month: this.month.val().replaceAll("-", "")         //날짜 선택_달
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "planChargeDischargeDate", label: "일자", width: 170, align: "center"},
                {key: "chargeDetailCnt", label: "충전 계획", width: 160, align: "center"},
                {key: "dischargeDetailCnt", label: "방전 계획", width: 160, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    // ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
    },
    getData: function (_type) {

        return this.columns;
    },
    setData: function (_data) {
        this.target.setData(_data.list);
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});

/**
 * gridView2_충전 계획 일괄 적용
 */
//그리드02
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {
                    key: "planChargeDischargeDate",
                    label: "일자 ",
                    width: 200,
                    align: "center",
                    editor: {disabled: "notCreated"}
                },
                {
                    key: "chargeDisChargeGbn",
                    label: "충방전 구분",
                    width: 120,
                    align: "center",
                    editor: {
                        type: "select",
                        disabled: "notCreated",
                        config: {
                            columnKeys: {optionText: "CD", optionValue: "TF"},
                            options: [{CD: "충전", TF: "충전"}, {CD: "방전", TF: "방전"}]
                        }
                    }
                },
                {
                    key: "planStartTime", label: "시작시간", width: 200, align: "center", editor: {
                        type: "select", disabled: "notCreated",
                        config: {
                            columnKeys: {optionText: "time", optionValue: "value"}
                            , options: [
                                {time: "00시", value: "00:00:00"}
                                , {time: "01시", value: "01:00:00"}
                                , {time: "02시", value: "02:00:00"}
                                , {time: "03시", value: "03:00:00"}
                                , {time: "04시", value: "04:00:00"}
                                , {time: "05시", value: "05:00:00"}
                                , {time: "06시", value: "06:00:00"}
                                , {time: "07시", value: "07:00:00"}
                                , {time: "08시", value: "08:00:00"}
                                , {time: "09시", value: "09:00:00"}
                                , {time: "10시", value: "10:00:00"}
                                , {time: "11시", value: "11:00:00"}
                                , {time: "12시", value: "12:00:00"}
                                , {time: "13시", value: "13:00:00"}
                                , {time: "14시", value: "14:00:00"}
                                , {time: "15시", value: "15:00:00"}
                                , {time: "16시", value: "16:00:00"}
                                , {time: "17시", value: "17:00:00"}
                                , {time: "18시", value: "18:00:00"}
                                , {time: "19시", value: "19:00:00"}
                                , {time: "20시", value: "20:00:00"}
                                , {time: "21시", value: "21:00:00"}
                                , {time: "22시", value: "22:00:00"}
                                , {time: "23시", value: "23:00:00"}
                            ]
                        }
                    }
                },
                {
                    key: "chargeDischargeAmount",
                    label: "충방전량",
                    width: 200,
                    align: "center",
                    editor: {type: "number", disabled: "notCreated", updateWith: ['cost'], attributes: {'maxlength': 4}}
                },
                {key: "batchApplyYn", label: "일괄 적용 여부", width: 200, align: "center"},
                {
                    key: "useYn",
                    label: "사용 여부",
                    width: 100,
                    align: "center",
                    editor: {
                        type: "select",
                        config: {
                            columnKeys: {optionText: "CD", optionValue: "TF"},
                            options: [{CD: "사용", TF: "Y"}, {CD: "사용안함", TF: "N"}]
                        }
                    }
                },
                {key: "essCode", label: "essCode", width: 0, align: "center"},
                {key: "planSeq", label: "planSeq", width: 0, align: "center"}

            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);  // 선택한 로우를 강제 선택 이벤트
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {

            "add": function () {

                if (this.getData().length == 0){
                    axToast.push("먼저 왼쪽 그리드에서 데이터를 선택해주세요.");
                }else {
                    ACTIONS.dispatch(ACTIONS.GRID2_ADD);
                }

            },
            "delete": function () {
                if (this.getData().length == 0){
                    axToast.push("먼저 왼쪽 그리드에서 데이터를 선택해주세요.");
                }else {
                    ACTIONS.dispatch(ACTIONS.GRID2_DELETE);
                }

            },
            "save": function () {
                if (this.getData().length == 0){
                    axToast.push("먼저 왼쪽 그리드에서 데이터를 선택해주세요.");
                }else {
                    ACTIONS.dispatch(ACTIONS.GRID2_SAVE);
                }

            }
        });
    },
    getData: function (_type) {

        var list = [];
        var _list = this.target.getList(_type);

        list = _list;
        return list;
    },
    setData: function (_data) {
        if(_data != null) {
            this.target.setData(_data.list);
        } else {
            // 좌측 그리드 리스트 초기화
            var list = [];
            this.target.setData(list);
        }

    },
    addRow: function (caller) {

        if (!addRowFlag) {

            this.target.addRow({
                    __created__: true
                    , planChargeDischargeDate: caller.gridView02.target.list[0].planChargeDischargeDate
                    , chargeDisChargeGbn: "충전"
                    , planStartTime: ""
                    , chargeDischargeAmount: 0
                    , batchApplyYn: "N"
                    , useYn: "Y"
                    , essCode: caller.gridView02.target.list[0].essCode
                    , planSeq: ""
                }
                , "last");

            addRowFlag = true;
        } else {

            axToast.push("저장하여 주십시오.");

        }
    }
});

//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var firstDayYear = date.getFullYear();
    var firstDayMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1)).slice(-2) //1-9월까지 앞에 0 추가

    var firstDay = firstDayYear + "-" + firstDayMonth;     //0000-00

    $("#month").val(firstDay);

}

//그리드2_유효성 검사
function planDetailValidation(_saveList) {

    if (_saveList.length <= 0) {
        axToast.push("충전계획 상세를 추가하여 주십시오.");

        return false;
    } else if (_saveList[0].planStartTime === undefined || _saveList[0].planStartTime === '') {
        axToast.push("시작시간을 수정하여 주십시오.");

        return false;
    } else if (_saveList[0].chargeDischargeAmount <= 0) {
        axToast.push("충방전량을 수정하여 주십시오.");

        return false;
    }

    return true;
}