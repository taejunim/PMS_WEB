var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["pcsStatusHistory", "pcsHistoryList"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
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
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    dateInit();     //기간 선택 초기값

    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
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
        this.searchDate = $("#pcsSearchDate");     //기간선택
        this.operationStatus = $("#operationStatus");
        this.operationModeStatus = $("#operationModeStatus");

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
            searchDate: this.searchDate.val(),                       //기간선택_시작
            operationStatus: this.operationStatus.val(),             //운영 상태
            operationModeStatus: this.operationModeStatus.val()      //운전 모드
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 60    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "regDate", label: "등록 일시", width: 140, align: "center",formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "operationStatus", label: "운전 상태", width: 80, align: "center",formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "operationModeStatus", label: "운전 모드", width: 80, align: "center",formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "outputPower", label: "<span style='display:inline-block;line-height: 11px;'>출력 전력<br/>(kW)</span>", width: 90, align: "center",formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "rsLineVoltage", label: "<span style='display:inline-block;line-height: 11px;'>R-S<br/>선간전압 (V)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "stLineVoltage", label: "<span style='display:inline-block;line-height: 11px;'>S-T<br/>선간전압 (V)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "trLineVoltage", label: "<span style='display:inline-block;line-height: 11px;'>T-R<br/>선간전압 (V)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "rphaseCurrent", label: "<span style='display:inline-block;line-height: 11px;'>R상 전류<br/>(A)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "sphaseCurrent", label: "<span style='display:inline-block;line-height: 11px;'>S상 전류<br/>(A)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "tphaseCurrent", label: "<span style='display:inline-block;line-height: 11px;'>T상 전류<br/>(A)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "frequency", label: "<span style='display:inline-block;line-height: 11px;'>계통 주파수<br/>(Hz)</span>", width: 70, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "dcLinkVoltage", label: "<span style='display:inline-block;line-height: 11px;'>DC-LINK<br/>전압 (V)</span>", width: 70, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "batteryVoltage", label: "<span style='display:inline-block;line-height: 11px;'>배터리 전압<br/>(V)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "batteryCurrent", label: "<span style='display:inline-block;line-height: 11px;'>배터리 전류<br/>(A)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "igbtTemperature1", label: "<span style='display:inline-block;line-height: 11px;'>IGBT<br/>온도1 (℃)</span>", width: 70, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "igbtTemperature2", label: "<span style='display:inline-block;line-height: 11px;'>IGBT<br/>온도2 (℃)</span>", width: 70, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "igbtTemperature3", label: "<span style='display:inline-block;line-height: 11px;'>IGBT<br/>온도3 (℃)</span>", width: 70, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "acMainMcStatus", label: "<span style='display:inline-block;line-height: 11px;'>AC 메인<br/>전자접촉기 상태</span>", width: 90, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "dcMainMcStatus", label: "<span style='display:inline-block;line-height: 11px;'>DC 메인<br/>전자접촉기 상태</span>", width: 90, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "referencePower", label: "<span style='display:inline-block;line-height: 11px;'>기준<br/>전력 값 (kW)</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "emergencyStopFlag", label: "<span style='display:inline-block;line-height: 11px;'>비상정지<br/>발생</span>", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "errorFlag", label: "오류 발생", width: 80, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}}
            ],
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
        var totalPage = _data.page.totalElements % this.getPageData().pageSize === 0 ? _data.page.totalPages - 1 :  _data.page.totalPages;
        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: totalPage
            }
        });
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, false, _data.totalRowCount);
    }
});

//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var nowDate = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();     //1-9일까지 앞에 0 추가

    var today = nowYear + "-" + nowMonth + "-" + nowDate;     //0000-00-00

    $("#pcsSearchDate").val(today);
}