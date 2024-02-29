var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    //조회 기능
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["interfaceWeather", "list"],
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
    },
});

/**
 * initView
 */
// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    weatherDateInit();    //초기화면 날짜 default값 설정
    
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();

    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");


    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
};


/**
 * pageButtonView
 */
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                //조회 시 페이지 번호 초기화
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
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.startDateFilter = $("#startDateFilter");   //기간 선택_시작
        this.endDateFilter = $("#endDateFilter");       //기간 선택_종료
        this.useBuildFilter = $("#useBuildFilter");     //지역 명

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
            startDate: this.startDateFilter.val().replaceAll("-", ""),  //기간 선택_시작
            endDate: this.endDateFilter.val().replaceAll("-", ""),      //기간 선택_종료
            buildPositionCode: this.useBuildFilter.val()                //지역 명
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 24    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "weatherDate", label: "일자", width: 170, align: "center"},
                {key: "weatherTime", label: "시간", width: 170, align: "center"},
                {key: "weatherType", label: "날씨", width: 200, align: "center"},
                {key: "temperature", label: "온도 (°C)", width: 200, align: "center"},
                {key: "humidity", label: "습도 (%)", width: 200, align: "center"},
                {key: "atmosphericPressure", label: "기압 (atm)", width: 200, align: "center"},
                {key: "windDirection", label: "풍향", width: 200, align: "center"},
                {key: "windSpeed", label: "풍속 (m/s)", width: 200, align: "center"},
                {key: "latitude", label: "위도", width: 150, align: "center"},
                {key: "longitude", label: "경도", width: 150, align: "center"},
            ],
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
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

    },
    getPageData: function getPageData() {
        return this.page;
    }
});

//초기화면 날짜 default값 설정 함수
function weatherDateInit() {

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

    $("#startDateFilter").val(firstDay);
    $("#endDateFilter").val(lastDay);

}