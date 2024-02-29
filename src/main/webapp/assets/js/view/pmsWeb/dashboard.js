var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    /*리스트 가져오기*/
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/wash/custmaster/custList"],
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    EXCEL_EXPORT: function (caller, act, data) {
        caller.gridView01.exportExcel("거래처정보.xls");
    }
});

fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.gridView01.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);

    $('p.desc').html('<h1> 메인페이지</h1>');
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
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
 * gridView01
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            showLineNumber: false,
            sortable: true,
            frozenColumnIndex: 2,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {
                    key: "ord", label: "순서", width: 50, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custNm", label: "거래처명", align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custInvenYn", label: "재고여부", width: 80, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }, formatter: function () {
                        if (this.value == "Y") {
                            return "존재";
                        } else {
                            return "없음";
                        }
                    }
                },
                {
                    key: "washCompleteYn", label: "세탁완료", width: 80, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }, formatter: function () {
                        if (this.value == "Y") {
                            return "세탁완료";
                        } else {
                            return "미완료";
                        }
                    }
                },
                {
                    key: "custManagerNm", label: "담당자명", width: 80, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custManagerTel", label: "담당자연락처", align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custManagerEmail", label: "담당자이메일", align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "postCd", label: "우편번호", width: 80, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custAddr", label: "주소", width: 100, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                },
                {
                    key: "custRoadAddr", label: "도로명주소", width: 100, align: "center", styleClass: function () {
                        if (this.item.washCompleteYn === "Y") {
                            return "grid-cell-blue";
                        } else if(this.item.custInvenYn === "Y"){
                            return "grid-cell-red";
                        }
                    }
                }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                }
            }

        });
    },
    setData: function setData(_data) {
        this.target.setData(_data);
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
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert(rs.error[0].jquery.attr("title") + '을(를) 입력해주세요.');
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    }
});
