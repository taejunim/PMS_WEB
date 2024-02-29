var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["/airConditioner", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
            },
            options: {
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
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    pageLoad();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

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
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.deviceCategorySub = $("#deviceCategorySubFilter");         // 센서구분
        this.airConditionerCode = $("#deviceCodeFilter");           // 센서
        this.searchDate = $("#searchDateFilter");     //일자 선택
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
            deviceCategorySub: this.deviceCategorySub.val(),    //공조장치 구분
            airConditionerCode: this.airConditionerCode.val(),  //공조장치
            searchDate: this.searchDate.val()                   //일자 선택
        }
    }
});

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 20
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "regDate",               label: "등록 일시", width: 210, align: "center"},
                {key: "deviceCategorySubName", label: "공조장치 분류", width: 200, align: "center"},
                {key: "deviceName",            label: "공조장치", width: 280, align: "center"},
                {key: "operationStatus",       label: "운전 상태", width: 240, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : !isNaN(this.value) ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "operationModeStatus",   label: "운전 모드", width: 240, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : !isNaN(this.value) ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "indoorTemperature",     label: "실내 온도", width: 120, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : !isNaN(this.value) ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "setTemperature",              label: "설정 온도", width: 120, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : !isNaN(this.value) ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "faultExist",            label: "오류 발생", width: 100, align: "center"}
            ],
            //페이징-페이지 이동
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
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, false, _data.totalRowCount);

    },
    getData: function () {
        return this.target.getData();
    },
    getPageData: function getPageData() {
        return this.page;
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


//deviceCode 가져오기
function selectDeviceCode(caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/airConditioner/selectDeviceCodes"],
        data: {},
        callback: function (res) {
            //검색조건
            $("#deviceCodeFilter").empty();
            $("#deviceCodeFilter").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCodeFilter").append("<option value='"+obj.deviceCode+"' data-data2='"+ obj.deviceCategorySub+"'>"+obj.deviceName+"</option>");
            });

            $('#deviceCodeFilter').prop("disabled",true);
        }
    });
}


//페이지 로드시 세팅
function pageLoad() {
    selectDeviceCode();

    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    //날짜 세팅
    dateInit();

    // 고정형,이동형 구분
    $('option[data-data1='+ (essType == "01" ? "02" : "01") +']').hide();
    $('#deviceCategorySubFilter option').not($('#deviceCategorySubFilter option[data-data2=80], #deviceCategorySubFilter option:eq(0)')).hide();

    //searchView 장비하위분류 선택했을때만 표출 (장비)
    $("#deviceCodeFilter").attr("disabled", true);

    //searchView 장비하위분류선택시 해당 장비 표출
    getDeviceList(false, "deviceCategorySubFilter" , "deviceCodeFilter");
}