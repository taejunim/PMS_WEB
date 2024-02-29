var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["deviceDefectHistory", "list"],
            data: caller.searchView.getData(),
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
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var data = caller.formView01.getData();
            // 신규 데이터일 경우 저장
            if (data.essCode == undefined) {

                axboot.ajax({
                    type: "PUT",
                    url: ["/deviceDefectHistory","insert"],
                    data: JSON.stringify(data),
                    callback: function (res) {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                        axToast.push(LANG("ax.script.onsave"));
                        caller.formView01.clear();
                    }
                });
            } else {
                // 기존 데이터일 경우 수정
                axboot.ajax({
                    type: "POST",
                    url: ["/deviceDefectHistory","update"],
                    data: JSON.stringify(data),
                    callback: function (res) {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                        axToast.push(LANG("ax.script.onsave"));
                        caller.formView01.clear();
                    }
                });
            }
        }
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                $("#pmsCode").removeAttr("disabled");
                $("#deviceCode").removeAttr("disabled");
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        axboot.ajax({
            method: "GET",
            url: ["deviceDefectHistory", "getDeviceInfo"],
            data: {"pmsCode": data.pmsCode},
            callback: function (res) {
                $("#deviceCode").empty();
                $("#deviceCode").append("<option value=''>선택</option>");
                $(res.list).each(function (idx, obj) {
                    $("#deviceCode").append("<option value='"+obj.deviceCode+"'>"+obj.deviceName+"</option>");
                });

                caller.formView01.setData(data);
            }
        });

    },
    REPAIR_COMPLETE: function (caller, act, data) {

        if(data.repairCompleteYn == '미완료'){

            axboot.modal.open({
                modalType: "REPAIR-COMPLETE-MODAL",
                param: "deviceCode="+data.deviceCode+"&deviceDefectDate="+data.deviceDefectDate+"&essCode="+data.essCode+"&repairContent="+data.repairContent+"",
                sendData: function () {
                    return {list: data};
                },
                callback: function (data) {
                    //완료 처리됐을 시
                    if (data == "updated") {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    }

                    //취소됐을 시
                    if (data == "close") {
                        console.log("REPAIR_COMPLETE close")
                    }

                    this.close();
                }
            });
        }
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    dateInit();    //초기화면 날짜 default값 설정

    getDeviceInfo($("#pmsCode").val());

    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
        this.target = $(document["searchView"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.deviceGbnFilter = $("#deviceGbnFilter");
        this.startDateFilter = $("#startDateFilter");
        this.endDateFilter = $("#endDateFilter");

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
            },
            onStateChanged: function () {

            }
        });
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            deviceGbnCode: this.deviceGbnFilter.val(),
            startDate : this.startDateFilter.val().replaceAll("-",""),
            endDate : this.endDateFilter.val().replaceAll("-","")
        }
    }
});

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 15    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [

                {key: "pmsName", label: "PMS 명", width: 170, align: "center" },
                {key: "deviceName", label: "장비 명", width: 170, align: "center" },
                {key: "saleCompanyName", label: "판매처 명", width: 150, align: "center"},
                {key: "saleCompanyManagerName", label: "담당자 명", width: 120, align: "center"},
                {key: "saleCompanyTel", label: "사무실 전화번호", width: 130, align: "center"},
                {key: "deviceDefectDate", label: "고장 확인 일자", width: 180, align: "center" },
                {key: "repairCompleteYn", label: "수리 완료 처리", width: 120, align: "center",
                    formatter: function () {
                        var returnValue = "";
                        // 바우만 타입이 1이면 버튼, 0이면 공백 처리
                        if(this.item.repairCompleteYn == '미완료'){
                            returnValue = '<button data-confirm="primary" class="btn btn-primary" style="background-color: #E74C3C !important">미완료</button>';
                        } else {
                            returnValue = '<button data-confirm="primary" class="btn btn-primary" style="background-color: #3498DB !important">완료</button>';
                        }
                        return returnValue;
                    }
                }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);

                    if (this.colIndex == 6) {
                        ACTIONS.dispatch(ACTIONS.REPAIR_COMPLETE, this.item)
                    } else {
                        ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                    }
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
    getPageData: function getPageData() {
        return this.page;
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

        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            }
        });
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


        $("#pmsCode").attr("disabled", "disabled");
        $("#deviceCode").attr("disabled", "disabled");
        //this.target.find('[name="key"]').attr("disabled", "disabled");

    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }
        var data = fnObj.formView01.getData();

        // validation check
        if (data.deviceCode === undefined || data.deviceCode === "") {
             axToast.push("장비 명을 선택해주세요");
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});

function getDeviceInfo(pmsCode) {

    axboot.ajax({
        method: "GET",
        url: ["deviceDefectHistory", "getDeviceInfo"],
        data: {"pmsCode": pmsCode},
        callback: function (res) {

            // console.log(res);
            $("#deviceCode").empty();
            $("#deviceCode").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCode").append("<option value='"+obj.deviceCode+"'>"+obj.deviceName+"</option>");
            });
        }
    });
}

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
