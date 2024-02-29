var fnObj = {};
var itemClick = false;
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["chargeDischargeContractMgnt", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {

                caller.gridView01.setData(res.mapResponse.map);
                caller.formView01.clear();

                //그리드 데이터 하나일때 폼에 뿌려주기
                if(res.mapResponse.map.page.totalElements === 1){
                    caller.formView01.setData(res.mapResponse.map.list[0]);
                }
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

        var data = fnObj.formView01.getData();

        if (data.targetName === undefined || data.targetName === "") {
            return axToast.push("충방전 대상을 입력해주세요");
        }

        // 신규 데이터일 경우 저장(pms명이 수정 가능할 경우)
        if (itemClick === false) {
            console.log("click");
            axboot.ajax({
                type: "PUT",
                url: ["chargeDischargeContractMgnt", "insertTargetInfoModal"],
                data: JSON.stringify(caller.formView01.getData()),
                callback: function (res) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    axToast.push(LANG("ax.script.onsave"));
                    ACTIONS.dispatch(ACTIONS.FORM_INIT);
                    itemClick = false;
                }
            });
        } else {
            // 기존 데이터일 경우 수정
            axboot.ajax({
                type: "POST",
                url: ["chargeDischargeContractMgnt", "updateTargetInfoModal"],
                data: JSON.stringify(caller.formView01.getData()),
                callback: function (res) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                    axToast.push(LANG("ax.script.onupdate")); //저장 알림 토스트
                    ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
                    itemClick = false;
                }
            });
        }

    },
    //신규 버튼 클릭(form_clear)
    FORM_CLEAR: function (caller) {

        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key === "ok") {
                caller.formView01.clear();
            }
        });
    },
    //저장 후 form_clear
    FORM_INIT: function (caller) {
        caller.formView01.clear();
    },
    ITEM_CLICK: function (caller, act, data) {
        itemClick = true;
        caller.formView01.setData(data);
    },
    ITEM_DEL: function (caller, act, data) {

        if (itemClick === true) {
            axDialog.confirm({
                msg: LANG("ax.script.deleteconfirm")
            }, function () {

                if (this.key === "ok") {
                    axboot.ajax({
                        type: "POST",
                        url: ["chargeDischargeContractMgnt", "deleteTargetInfoModal"],
                        data: JSON.stringify(caller.formView01.getData()),
                        callback: function (res) {
                            if (res.message === "SUCCESS") {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push("삭제되었습니다");
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                                itemClick = false;
                            }
                        }
                    });
                }

            });
        } else {
            axToast.push("삭제하실 목록을 선택해주세요");
        }
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);


};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-modal-header-btn", {
            "modal-close": function () {
                parent.axboot.modal.callback('close');
            },
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
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
        this.filter = $("#filter");
        this.targetName = $("#targetNameFilter");
        this.useYn = $("#useYnFilter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val(),
            targetName: this.targetName.val(),
            useYn: this.useYn.val(),

        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 14    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "targetName", label: "충방전 대상", width: 180, align: "center"},
                {key: "targetManagerName", label: "담당자 명", width: 120, align: "center"},
                {key: "targetManagerTel", label: "담당자 전화번호", width: 180, align: "center"},
                {key: "useYn", label: "사용 여부", width: 80, align: "center"},
                {key: "address", label: "업체 주소", width: 0},
                {key: "chargeTargetSeq", label: "충방전 대상 정보", width: 0},
                {key: "remark", label: "비고", width: 0}
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
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    setData: function (_data) {
        // this.target.setData(_data.list);
        this.target.setData({
            list: _data.list,
            page: { //페이지 세팅
                currentPage: _data.page.currentPage || 0,
                totalElements: _data.page.totalElements,
                totalPages: _data.page.totalPages
            }
        });
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

