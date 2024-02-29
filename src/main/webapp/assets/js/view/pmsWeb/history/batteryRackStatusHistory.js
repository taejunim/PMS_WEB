var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["batteryRackStatusHistory", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
                var list = res.mapResponse.map.list;
                if(list.length > 0)  {
                    caller.gridView01.target.select(0);
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2, list[0]);
                }
                else ACTIONS.dispatch(ACTIONS.GRID_CLEAR);
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
    PAGE_SEARCH2: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["batteryRackStatusHistory", "moduleList"],
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
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    $("#ax-base-root").css("overflow-y","scroll");
    dateInit(); //수정일자 default값

    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.gridView02.initView();
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");
    $("#split-panel-grid-view-02").children(".noDataMessage").attr("id","noDataMessage02");
    if($("#rackNoFilter").children().length === 0) {
        axToast.push("배터리 Rack 등록을 진행하여 주십시오.");
        $("#rackNoFilter").append("<option value=''>-</option>");
        $("#rackNoFilter").attr("disabled","disabled");
    }
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
        this.rackNoFilter = $("#rackNoFilter");
        this.searchDate = $("#searchDate");
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
            rackNo: this.rackNoFilter.val(),                         //rack 구분
            searchDate: this.searchDate.val(),                       //날짜 선택
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
                {key: "regDate", label: "등록 일시", width: 145, align: "center",formatter: function() { return (this.value == null ? '-' : this.value);}},
                {key: "operationStatus", label: "운영 상태", width: 70, align: "center",formatter: function() { return (this.value == null ? '-' : this.value);}},
                {key: "operationModeStatus", label: "운전 모드", width: 70, align: "center",formatter: function() { return (this.value == null ? '-' : this.value);}},
                {key: "userSoc", label: "<span style='display:inline-block;line-height: 11px;'>사용자<br/>SoC (%)</span>", width: 70, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "realSoc", label: "<span style='display:inline-block;line-height: 11px;'>실제<br/>SoC (%)</span>", width: 70, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "soh", label: "SoH (%)", width: 70, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "voltage", label: "전압 (V)", width: 70, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "currentSensor1", label: "<span style='display:inline-block;line-height: 11px;'>전류 센서 1 <br/>(A)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "currentSensor2", label: "<span style='display:inline-block;line-height: 11px;'>전류 센서 2<br/>(A)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "chargeCurrentLimit", label: "<span style='display:inline-block;line-height: 11px;'>충전 전류<br/>제한 값 (A)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "chargePowerLimit", label: "<span style='display:inline-block;line-height: 11px;'>충전 전력<br/>제한 값 (kW)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "dischargeCurrentLimit", label: "<span style='display:inline-block;line-height: 11px;'>방전 전류<br/>제한 값 (A)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "dischargePowerLimit", label: "<span style='display:inline-block;line-height: 11px;'>방전 전력<br/>제한 값 (kW)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "positiveVoltageResistance", label: "<span style='display:inline-block;line-height: 11px;'>(+)극<br/>절연저항 (Ω)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "negativeVoltageResistance", label: "<span style='display:inline-block;line-height: 11px;'>(−)극<br/>절연저항 (Ω)</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "positiveMainRelayAction", label: "<span style='display:inline-block;line-height: 11px;'>(+)극 메인<br/>릴레이 동작</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "positiveMainRelayContact", label: "<span style='display:inline-block;line-height: 11px;'>(+)극 메인<br/>릴레이 접점</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "negativeMainRelayAction", label: "<span style='display:inline-block;line-height: 11px;'>(−)극 메인<br/>릴레이 동작</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "negativeMainRelayContact", label: "<span style='display:inline-block;line-height: 11px;'>(−)극 메인<br/>릴레이 접점</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "emergencyRelayAction", label: "<span style='display:inline-block;line-height: 11px;'>비상정지<br/>릴레이 동작</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "emergencyRelayContact", label: "<span style='display:inline-block;line-height: 11px;'>비상정지<br/>릴레이 접점</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "prechargeRelayAction", label: "<span style='display:inline-block;line-height: 11px;'>사전충전<br/>릴레이 동작</span>", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "warningFault", label: "오류 발생", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}}
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
        $("[data-ax5grid-panel-scroll='header']").animate({left:0});
        $("[data-ax5grid-panel-scroll='body']").animate({left:0});
        $("[data-ax5grid-scroller='horizontal-bar']").animate({left: 0});
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
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, false, _data.totalRowCount);

    }
});

/**
 * gridView
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 30    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            showLineNumber: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {key: "label", label: "항목", width: 130, align: "center"},
                {key: "column1", label: "Module 1.", width: 100, align: "center", formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column2", label: "Module 2.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column3", label: "Module 3.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column4", label: "Module 4.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column5", label: "Module 5.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column6", label: "Module 6.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column7", label: "Module 7.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column8", label: "Module 8.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column9", label: "Module 9.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column10", label: "Module 10.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column11", label: "Module 11.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column12", label: "Module 12.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column13", label: "Module 13.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column14", label: "Module 14.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}},
                {key: "column15", label: "Module 15.", width: 100, align: "center",formatter: function(){
                        return (this.value === '' ? '-' : ax5.util.number(this.value,{"money": true}) !== '0' ? ax5.util.number(this.value,{"money":true}): this.value);}}
            ]
        });
        $("[data-ax5grid-panel-scroll='header']").animate({left:0});
        $("[data-ax5grid-panel-scroll='body']").animate({left:0});
        $("[data-ax5grid-scroller='horizontal-bar']").animate({left: 0});
    },
    setData: function (_data) {

        let list;
        let message;

        if(_data.totalRowCount === 0) {
            list = [];
            if(_data.list.length !== 0) message = "해당하는 Module 데이터가 없습니다.";
            else message = "조회 조건과 일치하는 데이터가 없습니다.";
        } else list = _data.list;

        this.target.setData({
            list: list,
            page: { //페이지 세팅
                display: false,
                totalElements:  _data.totalRowCount
            }
        });

        setNoMessageDiv2("noDataMessage02",_data.totalRowCount, message);
    }
});

//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1)).slice(-2); //1-9월까지 앞에 0 추가
    var nowDate = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();     //1-9일까지 앞에 0 추가

    var today = nowYear + "-" + nowMonth + "-" + nowDate;     //0000-00-00

    $("#searchDate").val(today);
}