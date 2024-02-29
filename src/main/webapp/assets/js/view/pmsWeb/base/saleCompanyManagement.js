var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    //조회
    PAGE_SEARCH: function (caller) {

        axboot.ajax({
            type: "GET",
            url: ["saleCompanyManagement", "list"],
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
    //데이터 저장 / 수정
    PAGE_SAVE: function (caller, act, data) {
        var data = fnObj.formView01.getData();

        if (caller.formView01.validate()) {

            // 신규 데이터일 경우 저장
            if (data.saleCompanyCode === undefined) {
                axDialog.confirm({
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["saleCompanyManagement", "insert"],
                            data: JSON.stringify(data),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onsave"));
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                            }
                        });
                    }
                });
            } else {

                if (data.saleCompanyManagerTel === '' || data.saleCompanyManagerTel === '-'){
                    data.saleCompanyManagerTel = null;
                }
                if (data.saleCompanyTel === '' || data.saleCompanyTel === '-'){
                    data.saleCompanyTel = null;
                }

                axDialog.confirm({
                    msg: LANG("ax.script.onupdatemsg")
                }, function () {
                    if (this.key == "ok") {
                        // 기존 데이터일 경우 수정
                        axboot.ajax({
                            type: "POST",
                            url: ["saleCompanyManagement", "update"],
                            data: JSON.stringify(data),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onupdate"));
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
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
    //신규 버튼 클릭(폼 클리어)
    FORM_CLEAR: function (caller) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                $('#userCd').removeAttr("readonly");
                caller.formView01.clear();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        
        //form에서 - 제거
        if (data.saleCompanyManagerName === '-') {
            data.saleCompanyManagerName = null;
        }
        caller.formView01.setData(data);
    },
    // 데이터 삭제
    PAGE_DELETE: function (caller) {
        axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function () {
            if (this.key === "ok") {
                var data = fnObj.formView01.getData();

                if (data.saleCompanyCode) {
                    axboot.ajax({
                        type: "POST",
                        url: ["saleCompanyManagement","delete"],
                        data: JSON.stringify(caller.formView01.getData()),
                        callback: function (res) {
                            if(res.message === "SUCCESS") {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push("삭제되었습니다");
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                            }
                        }
                    });
                }
            }
        });
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
                //조회 시 페이지 번호 초기화
                fnObj.gridView01.setPageData({pageNumber: 0});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "fn1": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
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
        this.saleCompanyNameFilter = $("#saleCompanyNameFilter");
    },
    getData: function () {

        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            saleCompanyName : this.saleCompanyNameFilter.val()
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
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                { key: "saleCompanyCode", label: "판매처 코드", width: 140, align: "center" },
                { key: "saleCompanyName", label: "판매처 명", width: 240, align: "center"},
                {key: "saleCompanyManagerName", label: "담당자 명", width: 120, align: "center"},
                {key: "saleCompanyManagerTel", label: "담당자 전화번호", width: 140, align: "center"},
                {key: "saleCompanyTel", label: "사무실 전화번호", width: 140, align: "center"}
            ],
            //페이징-페이지 이동
            onPageChange: function (pageNumber) {
            _this.setPageData({pageNumber: pageNumber});
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        },
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
            list : _data.list,
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
    },
    getData: function () {
        return this.target.getData();
    },
    align: function () {
        this.target.align();
    }
});


/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
            "compCd": "S0001",
            roleList: [],
            authList: []
        });
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

        this.target.find('[data-ax-path="userPs"]').attr("readonly", "readonly");
        this.target.find('[data-ax-path="userPs_chk"]').attr("readonly", "readonly");
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var data = fnObj.formView01.getData();

        if (data.saleCompanyName === undefined || data.saleCompanyName === "") {
            axToast.push("판매처 명을 입력해주세요");
            return false;
        }

        var rs = this.model.validate();
        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }

        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        $("input:radio[name='grpAuthCd']:radio[value='S0002']").prop("checked", true);
    }
});

