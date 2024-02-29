var fnObj = {};
var itemClick = false;
var ACTIONS = axboot.actionExtend(fnObj, {
    //페이지 조회
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/deviceErrorHistory", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData(),{essType: essType}),
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
    FORM_CONFIRM: function (caller, act, data) {
        var saveList = caller.gridView01.getData("selected")[0];

        if (saveList == null) {
            axToast.push("처리 완료 여부를 변경할 데이터를 선택해주세요");

        } else if(saveList.processFlag === "Y"){
            axToast.push("이미 확인이 완료된 데이터입니다.");

        } else {
            if (!saveList.componentNo) {
                saveList.componentNo = null;
            }

            axDialog.confirm({
                msg: LANG("ax.script.form.confirm")
            }, function () {
                if (this.key === "ok") {

                    axboot.ajax({
                        method: "PUT",
                        contentType: 'application/json',
                        url: ["/deviceErrorHistory", "updateErrorHistory"],
                        data: JSON.stringify(saveList),
                        callback: function (res) {
                            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                            axToast.push("완료 처리 되었습니다.");
                        }
                    });
                }
            });

        }
    },
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
        this.deviceCode = $("#deviceCode");
        this.componentNo = $("#componentNo");
        this.errorType = $("#errorType");

    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            startDate: this.startDate.val(),
            endDate: this.endDate.val(),
            deviceCode: this.deviceCode.val(),
            componentNo: this.componentNo.val(),
            errorType: this.errorType.val()

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
                {key: "errorDate", label: "오류 발생 일시", width: 250, align: "center"},
                {key: "deviceCategoryName", label: "장비 분류", width: 180, align: "center"},
                {key: "deviceCategorySubName", label: "장비 하위 분류", width: 180, align: "center"},
                {key: "deviceName", label: "장비 / 구성요소", width: 280, align: "center"},
                {key: "errorTypeName", label: "오류 구분", width: 200, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "errorCodeName", label: "오류 내용", width: 550, align: "left"},
                {key: "processFlagName", label: "처리 여부", width: 200, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    itemClick = true;
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

        //확인 버튼 클릭
        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-confirm": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CONFIRM);
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
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        list = _list;
        return list;
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

//장비
function selectDeviceCode(caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/deviceErrorHistory/selectDeviceCode"],
        data: {},
        callback: function (res) {
            //검색조건
            $("#deviceCode").empty();
            $("#deviceCode").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCode").append("<option value='"+obj.deviceCode+"' value2='"+ obj.deviceCategory+"'>"+obj.deviceName+"</option>");
            });
        }
    });
}

//component
function selectComponent(caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/deviceErrorHistory/selectComponent"],
        data: {},
        callback: function (res) {
            //검색조건
            $("#componentNo").empty();
            $("#componentNo").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#componentNo").append("<option value='"+obj.componentNo+"' data-code='"+ obj.deviceCode+"'>"+obj.componentName+"</option>");
            });

            $("#component").hide();
        }
    });
}

//페이지 로드시 세팅
function pageLoad() {
    //구성요소 목록 호출
    selectComponent();

    //장비 목록 호출
    selectDeviceCode();

    //달력 세팅
    dateInit();

    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    //장비 선택시 해당 구성요소 표출
    $(document).on('change', "#deviceCode", function(){
        var deviceCode = $(this).val();
        var deviceCategory = $("#deviceCode option:selected").attr('value2');

        $('#componentNo option').show();
        $('#componentNo option:eq(0)').prop("selected",true);

        if(deviceCode != undefined && deviceCode != ""){
            $('#componentNo option').not('[data-code='+ deviceCode +']').hide();
            $('#componentNo option:eq(0)').show();
        }

        if (deviceCategory == '01' || deviceCategory == '03') { //rack , 이동형 cpcm 선택 시
            $('#component').show();
        } else {
            $('#component').hide();
        }
    });
}
