var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["dcConverter", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
                console.log(JSON.stringify(res.mapResponse.map.list))
                if (res.mapResponse.map.list != "") {
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, res.mapResponse.map.list[0]);
                } else {
                    caller.formView01.clear();
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
    ITEM_CLICK: function (caller, act, data) {
        axboot.ajax({
            method: "GET",
            url: ["dcConverter", "selectConverterDetail"],
            data: {"converterCode": data.converterCode, "regDate" : data.regDate},
            callback: function (res) {
                caller.formView01.setData(res.list);
            }
        });
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    dateInit();     //기간 선택 초기값

    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

/**
 * pageButtonView
 */
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                //1페이지가 아닌곳에서 새로 조회시 페이지 번호 초기화
                fnObj.gridView01.setPageData({pageNumber: 0});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
        this.searchDate = $("#searchDateFilter");     //일자 선택
        this.deviceStatusFilter = $("#deviceStatusFilter");
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
            positionFixYn: 'N',
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            searchDate: this.searchDate.val(),                   //일자 선택
            operationStatus: this.deviceStatusFilter.val(),
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
                {key: "regDate", label: "등록 일시", width: 190, align: "center"},
                {key: "operationStatusName", label: "운전 상태", width: 120, align: "center"},
                {key: "totalDcPower", label: "총 직류 전력 (kW)", width: 140, align: "center" ,formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "totalCurrent", label: "총 전류 (A)", width: 140, align: "center" ,formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "converterDcPower", label: "변환 직류 전류 (A)", width: 160, align: "center", formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "dcCurrent", label: "직류 전류 (A)" , width: 140, align: "center", formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "internalTemp", label: "함체 내부 온도 (℃)", width: 160, align: "center", formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {
                    key: "errorFlag",
                    label: "오류 발생",
                    width: 120,
                    align: "center",
                    formatter: function () {
                        var value = "";
                        if (this.item.warningFlag === "Y" && this.item.faultFlag === "Y") {
                            value = "경고 / 결함"
                        } else if (this.item.warningFlag === "Y" && this.item.faultFlag === "N") {
                            value = "경고"
                        } else if (this.item.warningFlag === "N" && this.item.faultFlag === "Y") {
                            value = "결함"
                        } else {
                            value = "정상"
                        }
                        return value;
                    }
                }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            },
            //페이징-페이지 이동
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    },
    getPageData: function getPageData() {
        return this.page;
    },
    setData: function (_data) {
        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: _data.page.totalPages

            }
        });
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, true, _data.totalRowCount);
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

        for (var i in data) {
            var set = ".l-inverter";
            if (data[i].inverterNo === 2) {
                set = ".r-inverter";
            }
            $(set + " .modeStatusName").text(data[i].modeStatusName);
            $(set + " .inverterStatusName").text(data[i].inverterStatusName);
            $(set + " .power").text(ax5.util.number(data[i].power,{"money": true}));
            $(set + " .current").text(ax5.util.number(data[i].current,{"money": true}));
            $(set + " .voltage").text(ax5.util.number(data[i].voltage,{"money": true}));
            $(set + " .dcPower").text(ax5.util.number(data[i].dcPower,{"money": true}));
            $(set + " .dcCurrent").text(ax5.util.number(data[i].dcCurrent,{"money": true}));
            $(set + " .activeCurrentContrast").text(ax5.util.number(data[i].activeCurrentContrast,{"money": true}));
            $(set + " .refActiveCurrentPercentage").text(ax5.util.number(data[i].refActiveCurrentPercentage,{"money": true}));
            $(set + " .stackTemp").text(ax5.util.number(data[i].stackTemp,{"money": true}));
            $(set + " .inductorTemp").text(ax5.util.number(data[i].inductorTemp,{"money": true}));
            $(set + " .capacitorTemp").text(ax5.util.number(data[i].capacitorTemp,{"money": true}));
            var value = "정상";
            if (data[i].warningFlag === "Y" && data[i].faultFlag === "Y") {
                value = "경고 / 결함";
            } else if (data[i].warningFlag === "Y" && data[i].faultFlag === "N") {
                value = "경고";
            } else if (data[i].warningFlag === "N" && data[i].faultFlag === "Y") {
                value = "결함";
            }
            $(set + " .errorFlag").text(value);
        }
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});


//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var nowDate = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();     //1-9일까지 앞에 0 추가

    var today = nowYear + "-" + nowMonth + "-" + nowDate;     //0000-00-00

    $("#searchDateFilter").val(today);
}