var fnObj = {};
var startDate = "";
var endDate = "";
var ACTIONS = axboot.actionExtend(fnObj, {
    //페이지 조회
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/commandControlHistory", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                startDate = $("#startDateFilter").val().replaceAll("-", "");
                endDate = $("#endDateFilter").val().replaceAll("-", "");
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
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    dateInit();

    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

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
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.EXCEL_EXPORT);
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
        //날짜 picker UI
        var picker = new ax5.ui.picker();

        picker.bind({
            target: $('[data-ax5picker="grid1"]'),
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
            },
            onStateChanged: function () {

            }
        });
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.startDate = $("#startDateFilter");
        this.endDate = $("#endDateFilter");
        this.deviceCode  = $("#deviceCodeFilter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            startDate: this.startDate.val(),
            endDate: this.endDate.val(),
            deviceCode: this.deviceCode.val()
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
                {key: "commandControlDt", label: "제어 일시", width: 180, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "deviceName", label: "장비", width: 120, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlTypeName", label: "제어 구분", width: 120, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlRequestTypeName", label: "제어 요청", width: 140, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlRequestDetailTypeName", label: "제어 요청 상세", width: 120, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlRequestValue", label: "제어 요청 값", width: 120, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "referenceCode", label: "참조 코드", width: 180, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlCompleteFlag", label: "제어 성공 여부", width: 100, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "deviceResponseDate", label: "제어 응답 일시", width: 180, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlRequestId", label: "제어 요청자", width: 140, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}}
            ],
            body: {
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
        this.target.setData({
            list : _data.list,
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

    }
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

    $("#startDateFilter").val(firstDay);
    $("#endDateFilter").val(lastDay);
}

//deviceCode 가져오기
function selectDeviceCode(caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/essControlCommandManagement/selectDeviceCodes"],
        callback: function (res) {
            //검색조건
            $("#deviceCodeFilter").empty();
            $("#deviceCodeFilter").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCodeFilter").append("<option value='"+obj.deviceCode+"'>"+obj.deviceName+"</option>");
            });
        }
    });
}