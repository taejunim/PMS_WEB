var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["deviceErrorCode", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
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
    PAGE_SAVE: function (caller) {
        if (caller.formView01.validate()) {
            var data = fnObj.formView01.getData();
            // 신규 데이터일 경우 저장
            if (data.errorCode === undefined) {
                axDialog.confirm({
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["deviceErrorCode", "insert"],
                            data: JSON.stringify($.extend({}, caller.formView01.getData(), {})),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onsave"));
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                            }
                        });
                    }
                });
            } else {
                // 기존 데이터일 경우 수정
                axDialog.confirm({
                    msg: LANG("ax.script.onupdatemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "POST",
                            url: ["deviceErrorCode", "update"],
                            data: JSON.stringify($.extend({}, caller.formView01.getData())),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                                axToast.push(LANG("ax.script.onsave")); //저장 알림 토스트
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
                            }
                        });
                    }
                });
            }
        }
    },
    // 신규 버튼 누르지않고 FORM_CLEAR (저장 후)
    FORM_INIT: function (caller) {
        caller.formView01.clear();
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);
    }
});

/**
 * initView
 */
// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    pageLoad();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

/**
 * pageButtonView
 */
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            //조회 버튼 클릭
            "search": function () {
                //조회 시 페이지 번호 초기화
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            //저장 버튼 클릭
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
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.deviceCategoryFilter = $("#deviceCategoryFilter");
        this.deviceCategorySubFilter = $("#deviceCategorySubFilter");
        this.errorTypeFilter = $("#errorTypeFilter");
        this.data1 = (essType == "01" ? "02" : "01");

    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            deviceCategory: this.deviceCategoryFilter.val(),
            deviceCategorySub: this.deviceCategorySubFilter.val(),
            errorType: this.errorTypeFilter.val(),
            data1: this.data1,
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "deviceCategoryName", label: "장비 분류", width: 80, align: "center"},
                {key: "deviceCategorySubName", label: "장비 하위 분류", width: 100, align: "center"},
                {key: "errorCode", label: "오류 코드", width: 100, align: "center"},
                {key: "errorCodeName", label: "오류 명", width: 280, align: "center"},
                {key: "errorTypeName", label: "오류 구분", width: 100, align: "center"},
                {key: "manufacturerCode", label: "제조사 개별 코드", width: 160, align: "center",formatter: function(){
                    return (this.value == null ? '-' : this.value);}},
                {key: "referenceCode", label: "참조 코드", width: 80, align: "center",formatter: function(){
                        return (this.value == null ? '-' : this.value);}},
                {key: "remarks", label: "비고", width: 258, align: "left"},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                        ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
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
        setNoMessageDiv("noDataMessage01",_data.list.length, true, _data.totalRowCount);
    },
    getPageData: function getPageData() {
        return this.page;
    },
    getData: function (_type) {
        return this.target.getData();
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});

/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, {});
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model);
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
        this.target.find('[name="key"]').attr("disabled", "disabled");

        $("#deviceCategory").attr("disabled", true);
        $("#deviceCategorySub").attr("disabled", true);
        $("#errorType").attr("disabled", true);
    },
    validate: function () {
        var rs = this.model.validate();
        var data = fnObj.formView01.getData();

        if (data.deviceCategory === undefined || data.deviceCategory ==="") {
            axToast.push("장비 분류를 선택해주세요.");
            return false;
        }

        if (data.deviceCategorySub === undefined || data.deviceCategorySub ==="") {
            axToast.push("장비 하위 분류를 선택해주세요.");
            return false;
        }

        if (data.errorType === undefined || data.errorType === "") {
            axToast.push("오류 구분을 선택해주세요");
            return false;
        }

        if (data.errorCodeName === undefined || data.errorCodeName === "") {
            axToast.push("오류 명을 입력해주세요");
            return false;
        }

        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[name="key"]').removeAttr("disabled");
        $("#deviceCategory").attr("disabled", false);
        $("#deviceCategorySub").attr("disabled", true);
        $("#errorType").attr("disabled", false);
    }
});


//페이지 로드시 세팅
function pageLoad() {
    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    // 고정형,이동형 구분
    $('option[data-data1='+ (essType == "01" ? "02" : "01") +']').hide();

    //formView 장비분류 선택했을때만 표출 (장비하위분류,장비실)
    $("#deviceCategorySub").attr("disabled", true);

    //searchView 장비분류 선택했을때만 표출 (장비하위분류)
    $("#deviceCategorySubFilter").attr("disabled", true);

    //공통 항목 추가 (deviceCategory - '00' , deviceCategorySub - '0000' )
    $("#deviceCategory option:eq(0)").after("<option value='00'>공통</option>");
    $("#deviceCategorySub option:eq(0)").after("<option value='0000' data-data2='00'>공통</option>");
    $("#deviceCategoryFilter option:eq(0)").after("<option value='00'>공통</option>");
    $("#deviceCategorySubFilter option:eq(0)").after("<option value='0000' data-data2='00'>공통</option>");

    //장비분류 선택시 해당 장비하위분류
    getDeviceList(false, "deviceCategory" , "deviceCategorySub");
    //searchView 장비분류선택시 해당 장비하위분류 표출
    getDeviceList(false, "deviceCategoryFilter" , "deviceCategorySubFilter");
}