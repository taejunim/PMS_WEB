var fnObj = {};
var essCode = "";
var updateList = new Array();
// console.log(fnObj.gridView01.getData("essCode"));
var ACTIONS = axboot.actionExtend(fnObj, {
    //페이지 조회
    PAGE_SEARCH: function (caller, act, data) {

        axboot.ajax({
            type: "GET",
            url: ["chargeDischargePlanMgnt", "essList"],
            data: $.extend({}, this.searchView.getData()),
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
    //년도에 따른 pms list 조회
    GRID1_YEAR_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["chargeDischargePlanMgnt", "essSelectOne"],
            data: $.extend({}, this.searchView.getData(), this.formView01.getData()),
            callback: function (res) {

                var planCharge = res.mapResponse.map.list[0].planCharge;        //충전 계획
                var planDischarge = res.mapResponse.map.list[0].planDischarge;  //방전 계획

                //충전 계획 '생성'일 경우 버튼 비활성화
                if (planCharge === '생성') {
                    $("#planCharge").attr('disabled', true);
                }
                //충전 계획 '미생성'일 경우 버튼 활성화
                else if (planCharge === '미생성') {
                    $("#planCharge").attr('disabled', false);
                }

                //방전 계획 '생성'일 경우 버튼 비활성화
                if (planDischarge === '생성') {
                    $("#planDischarge").attr('disabled', true);
                }
                //방전 방획 '미생성'일 경우 버튼 활성화
                else if (planDischarge === '미생성') {
                    $("#planDischarge").attr('disabled', false);
                }
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
        var saveList = [].concat(caller.gridView01.getData("modified"));
        saveList = saveList.concat(caller.gridView01.getData("deleted"));

        axboot.ajax({
            type: "PUT",
            url: ["samples", "parent"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("저장 되었습니다");
            }
        });
    },
    //gridView01 row click event
    ITEM_CLICK: function (caller, act, data) {
        //충전 계획 '생성'일 경우 버튼 비활성화
        if (data.planCharge === '생성') {
            $("#planCharge").attr('disabled', true);
        }
        //충전 계획 '미생성'일 경우 버튼 활성화
        else if (data.planCharge === '미생성') {
            $("#planCharge").attr('disabled', false);
        }

        //방전 계획 '생성'일 경우 버튼 비활성화
        if (data.planDischarge === '생성') {
            $("#planDischarge").attr('disabled', true);
        }
        //방전 방획 '미생성'일 경우 버튼 활성화
        else if (data.planDischarge === '미생성') {
            $("#planDischarge").attr('disabled', false);
        }

        caller.formView01.setData(data);
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    },
    //충전 계획 생성 버튼
    CHARGE_PRODUCE: function (caller, act, data) {

        var data = fnObj.formView01.getData();

        axDialog.confirm({
            msg: LANG("ax.script.produceconfirm")
        }, function () {
            if (this.key == "ok") {
                // year 선택 안 했을 경우
                if (data.year != undefined) {
                    axboot.ajax({
                        type: "PUT",
                        url: ["chargeDischargePlanMgnt", "insertDischargePlan"],
                        data: JSON.stringify(caller.gridView01.getData()),
                        callback: function (res) {
                            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                            //axToast.push(LANG("ax.script.onsave"));
                            $("#planCharge").attr('disabled', true);

                        }
                    });
                } else {
                    alert("PMS를 선택해주세요");
                }
            }
        });

        return false;
    },
    //방전 계획 생성 버튼
    DISCHARGE_PRODUCE: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.produceconfirm")
        }, function () {
            if (this.key == "ok") {
                // year 선택 안 했을 경우

                axboot.ajax({
                    type: "PUT",
                    url: ["chargeDischargePlanMgnt", "dischargePlan"],
                    data: JSON.stringify(caller.gridView01.getData()),
                    callback: function (res) {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                        //axToast.push(LANG("ax.script.onsave"));
                        $("#planDischarge").attr('disabled', true);

                    }
                });
            }
        });
        return false;
    },
    //그리드2 조회
    GRID2_SEARCH: function (caller, act, data) {
        console.log('그리드2 조회');
        axboot.ajax({
            type: "GET",
            url: ["chargeDischargePlanMgnt", "chargePlanDetail"],
            data: $.extend({}, caller.gridView01.getData(), this.grid2searchView.getData()),
            callback: function (res) {
                caller.gridView02.setData(res.mapResponse.map);

            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log("err",err);
                }
            }
        });
        return false;
    },
    //그리드2 추가
    GRID2_ADD: function (caller, act, data) {
        caller.gridView02.addRow();
    },
    //그리드2 삭제
    GRID2_DELETE: function (caller, act, data) {
        caller.gridView02.delRow("selected");
        // 저장할 때 deletedList 가져오면 없는 값들이 있기 때문에 삭제할 때 리스트에 저장해 줌
        updateList = updateList.concat(caller.gridViewMap.target.deletedList);

        // 중복값이 들어오기때문에 중복값 제거
        updateList = updateList.filter((item, pos) => updateList.indexOf(item) === pos);
    },
    //그리드2 저장
    GRID2_SAVE: function (caller, act, data) {

        // //
        // if(essCode === ""){
        //     axToast.push("PMS를 선택해주세요.");
        //     return false;
        // }

        /*var saveList = [].concat(caller.gridView02.getData("modified"));
        saveList = saveList.concat(caller.gridView02.getData("deleted"));
        console.log(saveList);
        axboot.ajax({
            type: "PUT",
            url: ["chargeDischargePlanMgnt","chargePlanDetailInsert"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push(LANG("onsave"));
            }
        });
        caller.gridView02.addRow();*/
        console.log(caller.gridView02.getData());
        var saveList = [].concat(caller.gridView02.getData("modified"));
        saveList = saveList.concat(caller.gridView02.getData("deleted"));
        console.log(updateList);
        axboot.ajax({
            type: "PUT",
            url: ["chargeDischargePlanMgnt","saveTest"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                console.log(res);
                axToast.push(LANG("onsave"));
            }
        });
    },
    //그리드3 추가
    GRID3_ADD: function (caller, act, data) {
        caller.gridView03.addRow();
    },
    //그리드3 삭제
    GRID3_DELETE: function (caller, act, data) {
        caller.gridView03.delRow("selected");
},
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    this.pageButtonView.initView();
    this.searchView.initView();
    this.grid2searchView.initView();
    this.gridView01.initView();
    this.gridView02.initView();
    this.gridView03.initView();
    this.formView01.initView();
    dateInit();    //초기화면 날짜 default값 설정
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};


//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1) //이번달 1일
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)  //이번달 말일


    var firstDayYear = firstDay.getFullYear();
    var firstDayMonth = firstDay.getMonth() + 1 >= 10 ? firstDay.getMonth() + 1 : ('0' + (firstDay.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var firstDayDate = firstDay.getDate() >= 10 ? firstDay.getDate() : "0" + firstDay.getDate();     //1-9일까지 앞에 0 추가
    var lastDayYear = lastDay.getFullYear();
    var lastDayMonth = lastDay.getMonth() + 1 >= 10 ? lastDay.getMonth() + 1 : ('0' + (lastDay.getMonth() + 1)).slice(-2);     //1-9월까지 앞에 0 추가
    var lastDayDate = lastDay.getDate() >= 10 ? lastDay.getDate() : "0" + lastDay.getDate();         //1-9일까지 앞에 0 추가

    firstDay = firstDayYear + "-" + firstDayMonth + "-" + firstDayDate;     //0000-00-00
    lastDay = lastDayYear + "-" + lastDayMonth + "-" + lastDayDate;         //0000-00-00

    $("#planStartTime").val(firstDay);
    $("#planEndTime").val(lastDay);
    $("#dischargePlanStartDate").val(firstDay);
    $("#dischargePlanEndDate").val(lastDay);

    $("#chargePlanStartMonth").val(firstDayMonth);
    $("#chargePlanEndMonth").val(lastDayMonth);
    $("#chargePlanStartYear").val(firstDayYear);

    $("#dischargePlanStartMonth").val(firstDayMonth);
    $("#dischargePlanEndMonth").val(lastDayMonth);
    $("#dischargePlanStartYear").val(firstDayYear);
}

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "excel": function () {

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
        this.target = $(document["searchParameterView"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.pmsCode = $("#pmsCode");
    },
    getData: function () {
        return {
            // pageNumber: this.pageNumber,
            // pageSize: this.pageSize,
            // filter: this.filter.val(),
            pmsCode: this.pmsCode.val()
        }
    }
});


/**
 * gridView_년도별 충방전 계획 목록
 */
//그리드01
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "pmsName", label: "PMS 명", width: 140, align: "center"},
                {key: "year", label: "년도", width: 100, align: "center"},
                {key: "planCharge", label: "충전 계획", width: 100, align: "center"},
                {key: "planDischarge", label: "방전 계획", width: 100, align: "center"}
            ],
            //페이징-페이지 이동
            // onPageChange: function (pageNumber) {
            //     _this.setPageData({pageNumber: pageNumber});
            //     ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            // },
            body: {
                onClick: function () {

                    this.self.select(this.dindex);

                    $("#essCode").val(this.list[this.dindex].essCode);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);


                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
        this.essCode = $("#essCode");
        this.year = $("#year");
        this.planCharge = $("#planCharge");
        this.planDischarge = $("#planDischarge");
    },
    setData: function (_data) {
        this.target.setData(_data.list);

        // this.target.setData({
        //     list : _data.list,
        //     page: { //페이지 세팅
        //         currentPage: _data.page.currentPage || 0,
        //         totalElements: _data.page.totalElements,
        //         totalPages: _data.page.totalPages
        //     }
        // });
    },
    // getPageData: function getPageData() {
    //     return this.page;
    // },
    getData: function (_type) {
        return {
            essCode: this.essCode.val(),
            year: this.year.val(),
            planCharge: this.planCharge.val(),
            planDischarge: this.planDischarge.val()

        }
        console.log(essCode);
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    },
    body: {
        onClick: function () {
            // this.self.select(this.dindex);
            // ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
        }
    }
});
/**
 * grid2_searchView
 */
fnObj.grid2searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["grid2searchView"]);
        //this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");

        this.planStartTime = $("#planStartTime");
        this.planEndTime = $("#planEndTime");
        console.log(this.planStartTime.val());

    },
    getData: function () {
        return {
            // pageNumber: this.pageNumber,
            // pageSize: this.pageSize,
            planStartTime: this.planStartTime.val(),
            planEndTime: this.planEndTime.val()

        }


    }
});

/**
 * gridView2_충전 계획 일괄 적용
 */
//그리드02
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 5    //row count
    },
    initView: function () {
        //초기 화면
        $("#grid2day").show();      //일별 달력 show
        $("#grid2month").hide();    //월별 달력 hide
        $("#grid2year").hide();     //년별 달력 hide

        //날짜 picker UI
        var picker = new ax5.ui.picker();
        //일별 달력
        picker.bind({
            target: $('[data-ax5picker="grid2day"]'),
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
                        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                        dayTmpl: "%s"
                    }
                }
            },
            onStateChanged: function () {

            }
        });

        //날짜 구분 선택에 따른 변화
        $('#chargeDateGbn').on('change', function () {
            //일별 선택 시
            if ($("#chargeDateGbn").val() === '01') {

                $("#grid2day").show();      //일별 show
                $("#grid2month").hide();    //월별 hide
                $("#grid2year").hide();     //년별 hide

                //일별 달력
                picker.bind({
                    target: $('[data-ax5picker="grid2day"]'),
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
                                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                                dayTmpl: "%s"
                            }
                        }
                    },
                    onStateChanged: function () {

                    }
                });
            }
            //월별 선택 시
            else if ($("#chargeDateGbn").val() === '02'){

                $("#grid2day").hide();      //일별 hide
                $("#grid2month").show();    //월별 show
                $("#grid2year").hide();     //년별 hide

                // 월별 달력 Start
                picker.bind({
                    target: $('[data-picker-date="grid2month"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "month"
                        },
                        formatter: {
                            pattern: 'date(month)'
                        }
                    }
                });
                // 월별 달력 End
                picker.bind({
                    target: $('[data-picker-date="grid2monthEnd"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "month"
                        },
                        formatter: {
                            pattern: 'date(month)'
                        }
                    }
                });
            }
            //년별 선택 시
            else if ($("#chargeDateGbn").val() === '03'){

                $("#grid2day").hide();      //일별 hide
                $("#grid2month").hide();    //월별 hide
                $("#grid2year").show();     //년별 show

                // 년별 달력
               picker.bind({
                    target: $('[data-picker-date="grid2year"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "year"
                        },
                        formatter: {
                            pattern: 'date(year)'
                        }
                    }
                });
            }
        });


        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {key: "planSeq", label: "순번", width: 200, align: "center"},
                {key: "planStartTime", label: "시작시간", width: 200, align: "center", editor: "text"},
                {key: "planEndTime", label: "종료시간", width: 200, align: "center", editor: "text"}
            ],
            //페이징-페이지 이동
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            body: {
                onClick: function () {
                    // this.self.select(this.dindex, {selectedClear: true});
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.GRID2_SEARCH);
                console.log('서치 버튼 클릭');
            },
            "add": function () {
                ACTIONS.dispatch(ACTIONS.GRID2_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.GRID2_DELETE);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.GRID2_SAVE);
            }
        });
    },
    getData: function (_type) {
        // var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        // return $.extend({}, data);
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            console.log("여기탐?");
            list = ax5.util.filter(_list, function () {
                return this.essCode && this.planSeq && this.planChargeDt;
            });
        } else {
            console.log("아님?");
            list = _list;
        }
        return list;
    },
    setData: function (_data) {
        // console.log(_data);
        // console.log(_data.list.length);
        //this.target.setData(_data);
        // this.target.setData(_data.list);

        this.target.setData({
            list : _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: _data.page.totalPages
            }
        });
    },
    addRow: function () {
        // this.target.addRow({__created__: true}, "last");
        this.target.addRow({__created__: true, posUseYn: "N", useYn: "Y"}, "last");
    }
});
/**
 * gridView3_방전 계획 일괄 적용
 */
//그리드03
fnObj.gridView03 = axboot.viewExtend(axboot.gridView, {
    initView: function () {


        //초기 화면
        $("#grid3day").show();      //일별 달력 show
        $("#grid3month").hide();    //월별 달력 hide
        $("#grid3year").hide();     //년별 달력 hide

        //날짜 picker UI
        var picker = new ax5.ui.picker();
        //일별 달력
        picker.bind({
            target: $('[data-ax5picker="grid3day"]'),
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
                        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                        dayTmpl: "%s"
                    }
                }
            },
            onStateChanged: function () {

            }
        });

        //날짜 구분 선택에 따른 변화
        $('#dischargeDateGbn').on('change', function () {
            //일별 선택 시
            if ($("#dischargeDateGbn").val() === '01') {

                $("#grid3day").show();      //일별 show
                $("#grid3month").hide();    //월별 hide
                $("#grid3year").hide();     //년별 hide

                //일별 달력
                picker.bind({
                    target: $('[data-ax5picker="grid3day"]'),
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
                                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                                dayTmpl: "%s"
                            }
                        }
                    },
                    onStateChanged: function () {

                    }
                });
            }
            //월별 선택 시
            else if ($("#dischargeDateGbn").val() === '02'){

                $("#grid3day").hide();      //일별 hide
                $("#grid3month").show();    //월별 show
                $("#grid3year").hide();     //년별 hide

                // 월별 달력 Start
                picker.bind({
                    target: $('[data-picker-date="grid3month"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "month"
                        },
                        formatter: {
                            pattern: 'date(month)'
                        }
                    }
                });
                // 월별 달력 End
                picker.bind({
                    target: $('[data-picker-date="grid3monthEnd"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "month"
                        },
                        formatter: {
                            pattern: 'date(month)'
                        }
                    }
                });
            }
            //년별 선택 시
            else if ($("#dischargeDateGbn").val() === '03'){

                $("#grid3day").hide();      //일별 hide
                $("#grid3month").hide();    //월별 hide
                $("#grid3year").show();     //년별 show

                // 년별 달력
                picker.bind({
                    target: $('[data-picker-date="grid3year"]'),
                    content: {
                        type: 'date',
                        config: {
                            mode: "year", selectMode: "year"
                        },
                        formatter: {
                            pattern: 'date(year)'
                        }
                    }
                });
            }
        });
        var _this = this;

        this.year = $("#year");

        this.target = axboot.gridBuilder({
            // showRowSelector: false,
            // frozenColumnIndex: 0,
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-03"]'),
            columns: [
                {key: "key", label: "순번", width: 200, align: "center"},
                {key: "value", label: "시작시간", width: 200, align: "center"},
                {key: "etc1", label: "종료시간", width: 200, align: "center"}
            ]
        });

        axboot.buttonClick(this, "data-grid-view-03-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.GRID3_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.GRID3_DELETE);
            }
        });
    },
    getData: function (_type) {
        year: this.year.val()
        // var list = [];
        // var _list = this.target.getList(_type);

        // if (_type == "modified" || _type == "deleted") {
        //     list = ax5.util.filter(_list, function () {
        //         delete this.deleted;
        //         return this.key;
        //     });
        // } else {
        //     list = _list;
        // }
        // return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});

/**
 * formView01_충방전 계획
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        //날짜 picker UI
        var picker = new ax5.ui.picker();

        this.year = $("#year");
        // Select Year
        picker.bind({
            target: $('[data-picker-date="year"]'),
            content: {
                type: 'date',
                config: {
                    mode: "year", selectMode: "year"
                },
                formatter: {
                    pattern: 'date(year)'
                }
            },
            onStateChanged: function () {
                if (this.onStateChanged.end())
                //if (this.year.changed){
                    var year = $("#year").val();
                    if (year != "" && year != null)
                        // //년도에 따른 pms 명 불러오기
                        ACTIONS.dispatch(ACTIONS.GRID1_YEAR_SEARCH);
                //}
            }

        });
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model);
        this.initEvent();

        //버튼 클릭 이벤트
        axboot.buttonClick(this, "data-form-view-01-btn", {
            //충전 계획 버튼
            "chargeProduce": function () {
                ACTIONS.dispatch(ACTIONS.CHARGE_PRODUCE);
            },
            //방전 계획 버튼
            "dischargeProduce": function () {
                ACTIONS.dispatch(ACTIONS.DISCHARGE_PRODUCE);
            }
        });
    },
    initEvent: function () {
        var _this = this;
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
        // year: this.year.val()
    },
    setData: function (data) {
        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});