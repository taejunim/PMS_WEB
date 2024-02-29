var fnObj = {};
var startDate = "";
var endDate = "";
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["chargeDischargeHistory", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                startDate = $("#startDay").val().replaceAll("-", "");
                endDate = $("#endDay").val().replaceAll("-", "");

                caller.gridView01.setData(res.mapResponse.map);

                var list = res.mapResponse.map.list;

                caller.gridView01.target.select(0);
                ACTIONS.dispatch(ACTIONS.GRID_CLEAR);
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
    //누적 전력량 상세 목록
    PAGE_SEARCH2: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/chargeDischargeHistory", "selectDetailList"],
            data: data,
            callback: function (res) {
                caller.gridView02.setData(res.mapResponse.map);
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
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2, data);
    },
    GRID_CLEAR: function (caller, act, data) {
        caller.gridView02.setData({"list":[], "totalRowCount":0});
    },
    // EXCEL_EXPORT: function (caller) {
    //
    //     var fileName = "충방전이력_" + startDate + "-" + endDate + ".xls";
    //     caller.gridView01.exportExcel(fileName);
    // }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.gridView02.initView();

    dateInit();    //초기화면 날짜 default값 설정
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");
    $("#split-panel-grid-view-02").children(".noDataMessage").attr("id","noDataMessage02");

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                //1페이지가 아닌곳에서 새로 조회시 페이지 번호 초기화
                fnObj.gridView01.setPageData({pageNumber: 0});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            // "excel": function () {
            //     ACTIONS.dispatch(ACTIONS.EXCEL_EXPORT);
            // }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {

        //초기 화면
        $("#day").show();      //일별 달력 show

        //날짜 picker UI
        var picker = new ax5.ui.picker();
        //일별 달력
        picker.bind({
            target: $('[data-ax5picker="day"]'),
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

        this.startDay              = $("#startDay");                // 일별_시작
        this.endDay                = $("#endDay");                  // 일별_종료
        this.operationMode         = $("#operationMode");           // 충방전 구분
        this.operationType         = $("#operationType");           // 운영 구분
    },
    getData: function () {

        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            startDay: this.startDay.val().replaceAll("-", ""),      // 일별_시작
            endDay: this.endDay.val().replaceAll("-", ""),          // 일별_종료
            operationMode: this.operationMode.val(),                // 충방전 구분
            operationType: this.operationType.val()                 // 운영 구분
        }

    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 30
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "energyNo",   label: " 이력 번호", width: 200,  align: "center"},
                {key: "operationMode", label: " 운전 모드", width: 120,  align: "center"},
                {key: "operationHistoryType", label: " 운전 이력", width: 170,  align: "center"},
                {key: "operationHistoryDate", label: "운전 일시", width: 200, align: "center"},
                {key: "accumulatedEnergy", label: " 총 누적 전력량(kWh)", width: 180, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "operationType", label: "운영 구분", width: 150,  align: "center"},
                {key: "scheduleNo", label: "일정 번호", width: 150, align: "center", formatter: function(){return (this.value == null ? '-' : this.value);}}
            ],
            body:{
                mergeCells: ["energyNo", "operationMode",'accumulatedEnergy','operationType','scheduleNo'],
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    },
    setData: function (_data) {
        //  this.target.setData(_data.list);
        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: _data.page.totalPages
            }
        });
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, true, _data.totalRowCount);
    },
    exportExcel: function exportExcel(_filename) {
        this.target.exportExcel(_filename);
    }
});



/**
 * gridView
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;
        this.target = axboot.gridBuilder({
            showLineNumber: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {key: "energySeq",   label: "번호", width: 180,  align: "center"},
                {key: "accumulatedEnergy", label: "누적 전력량 (kWh)", width: 225,  align: "center"},
                {key: "regDate", label: " 일시", width: 240,  align: "center"},
            ],
            body: {
                onClick: function () {
                    //this.self.select(this.dindex);
                    // ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
    },
    setData: function (_data) {

        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                display: false,
                totalElements: _data.list.length
            }
        });
        setNoMessageDiv("noDataMessage02",_data.list.length, false, _data.totalRowCount);

    },
});


//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth() , 1) //이번달 1일
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)  //이번달 말일

    var firstDayYear = firstDay.getFullYear();
    var firstDayMonth = firstDay.getMonth() + 1 >= 10 ? firstDay.getMonth() + 1 : ('0' + (firstDay.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var firstDayDate = firstDay.getDate() >= 10 ? firstDay.getDate() : "0" + firstDay.getDate();     //1-9일까지 앞에 0 추가
    var lastDayYear = lastDay.getFullYear();
    var lastDayMonth = lastDay.getMonth() + 1 >= 10 ? lastDay.getMonth() + 1 : ('0' + (lastDay.getMonth() + 1)).slice(-2);     //1-9월까지 앞에 0 추가
    var lastDayDate = lastDay.getDate() >= 10 ? lastDay.getDate() : "0" + lastDay.getDate();         //1-9일까지 앞에 0 추가

    firstDay = firstDayYear + "-" + firstDayMonth + "-" + firstDayDate;     //0000-00-00
    lastDay = lastDayYear + "-" + lastDayMonth + "-" + lastDayDate;         //0000-00-00

    var firstMonth = firstDayYear + "-01";
    var thisMonth = firstDayYear + "-" + firstDayMonth;


    $("#startDay").val(firstDay);   //이번달 1일
    $("#endDay").val(lastDay);      //이번달 말일

    $("#startMonth").val(firstMonth);      //올해 1월
    $("#endMonth").val(thisMonth);         //이번달

    $("#thisYear").val(firstDayYear);      //올해
}