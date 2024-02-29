var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["programs"],
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res.map);
            }
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        axDialog.confirm({
            msg: "저장하시겠습니까?"
            }, function () {
                if (this.key == "ok") {
                    var saveList = [].concat(caller.gridView01.getData());
                    let filterList = saveList.filter(save => save.progCd && save.progCd.trim() !== '');
                    let duplicateProgCd = "";
                    //중복 체크
                    const duplicateCheckArray = filterList.reduce(function(acc, current) {
                        if (acc.findIndex(({ progCd }) => progCd === current.progCd) === -1) {
                            acc.push(current);
                        } else duplicateProgCd = current.progCd;
                        return acc;
                    }, []);

                    if(duplicateCheckArray.length !== filterList.length) {
                        axToast.push("[ " + duplicateProgCd + " ]\n프로그램 코드는 중복으로 등록할 수 없습니다.\n위 코드를 확인하여 주십시오.");
                    } else {
                        //중복되어 삭제된 progCd를 삭제하지 않기위함.
                        let deleteList = [].concat(caller.gridView01.getData("deleted"));
                        for(var i = 0; i < deleteList.length; i ++) {
                            if(filterList.findIndex(({ progCd }) => progCd === deleteList[i].progCd) === -1)
                                filterList.push(deleteList[i]);
                        }

                        axboot.ajax({
                            type: "PUT",
                            url: ["programs"],
                            data: JSON.stringify(filterList),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onsave"));
                            }
                        });
                    }
                }
        });

    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        axDialog.confirm({
            msg: "프로그램을 삭제하시겠습니까?\n변경 사항은 저장 후 반영됩니다."
        }, function () {
            if (this.key == "ok") {
                caller.gridView01.delRow("selected");
            }
        })
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
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
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.filter = $("#filter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()
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
            showRowSelector: true,
            frozenColumnIndex: 3,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "progCd", label: COL("ax.admin.program.code"), width: 210, align: "left", editor: {type:"text",
                    disabled: function () {
                        // 필드 progCd의 에디트 활성화 여부를 item.id의 값으로 런타임 판단.
                        return this.item.id;
                    }}},
                {key: "progNm", label: COL("ax.admin.program.name"), width: 160, align: "left", editor: "text"},
                {key: "progPh", label: COL("ax.admin.program.progPh"), width: 350, align: "left", editor: "text"},
                {key: "authCheck", label: COL("ax.admin.program.auth.check.or.not"), width: 80, align: "center", editor: "checkYn"},
                {key: "schAh", label: COL("ax.admin.program.auth.inquery"), width: 50, align: "center", editor: "checkYn"},
                {key: "savAh", label: COL("ax.admin.program.auth.save"), width: 50, align: "center", editor: "checkYn"},
                {key: "exlAh", label: COL("ax.admin.program.auth.excel"), width: 50, align: "center", editor: "checkYn"},
                {key: "delAh", label: COL("ax.admin.program.auth.delete"), width: 50, align: "center", editor: "checkYn"},
                {key: "fn1Ah", label: "FN1", width: 50, align: "center", editor: "checkYn"},
                {key: "fn2Ah", label: "FN2", width: 50, align: "center", editor: "checkYn"},
                {key: "fn3Ah", label: "FN3", width: 50, align: "center", editor: "checkYn"},
                {key: "fn4Ah", label: "FN4", width: 50, align: "center", editor: "checkYn"},
                {key: "fn5Ah", label: "FN5", width: 50, align: "center", editor: "checkYn"},
                {key: "remark", label: COL("ax.admin.remark"), width: 300, editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
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
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.progCd;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true, useYn: "N", authCheck: "N"}, "last");
        $("#noDataMessage01").hide();
    }
});