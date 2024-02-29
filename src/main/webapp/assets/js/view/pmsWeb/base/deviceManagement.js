var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["deviceManagement", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData(), {essCode:essCode}),
            callback: function (res) {
                caller.gridView01.setData(res.mapResponse.map);
                caller.formView01.clear();
                caller.gridView02.clear();
                $("#gridView02").hide();
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
    //구성요소 조회
    PAGE_SEARCH2: function (caller, act, data) {
        var deviceCode = $("#deviceCode").val();
        axboot.ajax({
            type: "GET",
            url: ["/deviceComponent", "list"],
            data: $.extend({}, {deviceCode:deviceCode}),
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
    PAGE_SAVE: function (caller) {
        if (caller.formView01.validate()) {
            var data = fnObj.formView01.getData();
            // 신규 데이터일 경우 저장
            if (data.deviceCode === undefined) {
                var modifiedList = caller.gridView02.getData("saveModified").get("list");
                var data1 = caller.gridView02.getData().get("list");

                if (deviceCategory == '01' || deviceCategory == '03') { //rack , 이동형 cpcm 선택 시
                    if (data1.length <= 0) {
                        data1 = null;
                    } else {
                        if (caller.gridView02.getData().get("componentNoList")) {  //구성요소번호가 중복일때
                            axToast.push("구성요소번호는 중복으로 등록될 수 없습니다. 다시 입력하여 주세요.");
                            return false;
                        }

                        if (data1.length != modifiedList.length) { //신규 생성된 구성요소만 있을 때
                            axToast.push("구성요소 정보를 입력해 주세요.");
                            return false;
                        }
                    }
                }
                axDialog.confirm({
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["deviceManagement", "insert"],
                            data: JSON.stringify($.extend({}, data, {'list':data1 }, {essCode:essCode})),
                            callback: function (res) {
                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                axToast.push(LANG("ax.script.onsave")); //저장 알림 토스트
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);
                            }
                        });
                    }
                });
            } else {
                if (data.deviceCategory == '01' || data.deviceCategory == '03') { //rack , 이동형 cpcm 선택 시
                    if (!ACTIONS.dispatch(ACTIONS.COMPONENT_SELECT)) {//component check
                        return false;
                    }
                }
                // 기존 데이터일 경우 수정
                axDialog.confirm({
                    msg: LANG("ax.script.onupdatemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "POST",
                            url: ["deviceManagement", "update"],
                            data: JSON.stringify($.extend({}, data ,  {essCode:essCode})),
                            callback: function (res) {
                                if (data.deviceCategory == '01' || data.deviceCategory == '03') { //rack , 이동형 cpcm 선택 시
                                    var createdList = caller.gridView02.getData("created"); // 신규생성된 데이터
                                    var modifiedList = caller.gridView02.getData("modifiedCheck");   //수정된 데이터

                                    if (createdList.get("list").length > 0 || modifiedList.get("list").length > 0) {
                                        if (createdList.get("list").length > 0 && modifiedList.get("list").length <= 0) {
                                            ACTIONS.dispatch(ACTIONS.COMPONENT_SAVE);
                                        } else if (createdList.get("list").length > 0 && modifiedList.get("list").length > 0) {
                                            ACTIONS.dispatch(ACTIONS.COMPONENT_SAVE);
                                            ACTIONS.dispatch(ACTIONS.COMPONENT_UPDATE);
                                        } else {
                                            ACTIONS.dispatch(ACTIONS.COMPONENT_UPDATE);
                                        }
                                    }
                                }

                                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                                ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
                                axToast.push(LANG("ax.script.onupdate"));
                            }
                        });
                    }
                });
            }
        }
    },
    //구성요소 저장
    COMPONENT_SELECT: function (caller, act, data) {
        var totalList = caller.gridView02.getData();    //목록에 있는 전체 데이터
        var createdList = caller.gridView02.getData("created"); // 신규생성된 데이터
        var modifiedList = caller.gridView02.getData("modified");   //수정된 데이터
        var emptyNameList = caller.gridView02.getData("emptyName");   //빈값 데이터

        var use = true;

        if (totalList.get("componentNoList")) {  //구성요소번호가 중복일때
            axToast.push("구성요소번호는 중복으로 등록될 수 없습니다. 다시 입력하여 주세요.");
            use = false;
        } else {
            if (emptyNameList.get("list").length > 0) {
                axToast.push("구성요소 정보를 입력해 주세요.");
                use = false;
            } else {
                if (createdList.get("list").length == modifiedList.get("list").length) { //신규 생성된 구성요소만 있을 때01
                    use = true;
                } else {
                    if (createdList.get("list").length < modifiedList.get("list").length) {     //수정된 구성요소가 있을 때
                        use = true;
                    } else {
                        axToast.push("구성요소 정보를 입력해 주세요.");
                        use = false;
                    }
                }
            }
        }

        return use;
    },
    //구성요소 저장
    COMPONENT_SAVE: function (caller, act, data)  {
        var list = caller.gridView02.getData("created").get("list");

        axboot.ajax({
            type: "PUT",
            url: ["/deviceComponent", "insert"],
            data: JSON.stringify($.extend({}, {list : list})),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                    axToast.push("구성요소를 등록할 수 없습니다.\n문제 지속시 관리자에게 문의해주세요.");
                }
            }
        });


        return false;
    },
    //구성요소 수정
    COMPONENT_UPDATE: function (caller, act, data)  {
        var list = caller.gridView02.getData("modifiedCheck").get("list");

        axboot.ajax({
            type: "POST",
            url: ["/deviceComponent", "update"],
            data: JSON.stringify($.extend({}, {list : list})),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);  //조회 실행
                ACTIONS.dispatch(ACTIONS.FORM_INIT);    //formView 초기화
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                    axToast.push("구성요소를 수정할 수 없습니다.\n문제 지속시 관리자에게 문의해주세요.");
                }
            }
        });
        return false;
    },
    // 신규 버튼 누르지않고 FORM_CLEAR (저장 후)
    FORM_INIT: function (caller) {
        caller.formView01.clear();
        caller.gridView02.clear();
        $("#gridView02").hide();
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                caller.gridView02.clear();
                $("#gridView02").hide();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);

        //해당 장비 구성요소 표출
        if (data.deviceCategory == '01' || data.deviceCategory == '03') {
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2);
            $("#gridView02").show();
        } else {
            caller.gridView02.clear();
            $("#gridView02").hide();
        }
    },
    ITEM_DEL: function (caller, act, data) {
        var data1 = (caller.gridView02.getData().get("list").length <= 0 ? null : caller.gridView02.getData().get("list"));
        var data = fnObj.formView01.getData();

        if (!data.deviceCode) {
            axDialog.alert({
                msg: "선택된 장비가 없습니다."
            });
        } else {
            //삭제
            axDialog.confirm({
                msg: LANG("ax.script.deleteconfirm")
            }, function () {
                if (this.key == "ok") {
                    var data = fnObj.formView01.getData();

                    if (data.deviceCode) {
                        axboot.ajax({
                            type: "POST",
                            url: ["deviceManagement", "delete"],
                            data: JSON.stringify($.extend({},{'list':data1 }, caller.formView01.getData(), {essCode:essCode})),
                            callback: function (res) {
                                if (res.message === "SUCCESS") {
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
    },
    MODULE_ITEM_ADD: function (caller, act, data) {
        caller.gridView02.addRow();
    },
    MODULE_ITEM_DEL: function (caller, act, data) {
        var data = caller.gridView02.getData("selected").get("list")[0];

        //모듈 삭제
        if (data != null) {
            axDialog.confirm({
                msg: LANG("ax.script.deleteconfirm")
            }, function () {
                if (this.key == "ok") {
                    if (data.deviceCode) {
                        axboot.ajax({
                            type: "POST",
                            url: ["/deviceComponent", "delete"],
                            data: JSON.stringify($.extend({}, data)),
                            callback: function (res) {
                                if (res.message === "SUCCESS") {
                                    caller.gridView02.delRow("selected");
                                    axToast.push("구성요소가 삭제되었습니다.");
                                }
                            },
                            options: {
                                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                                onError: function (err) {
                                    console.log(err);
                                    axToast.push("삭제할 수 없습니다.\n문제 지속시 관리자에게 문의해주세요.");
                                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                }
                            }
                        });
                    } else {
                        caller.gridView02.delRow("selected");
                    }
                }
            });
        } else {
            caller.gridView02.delRow("selected");
        }
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
    this.gridView02.initView();

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
                fnObj.gridView01.setPageData({pageNumber: 0});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            //저장 버튼 클릭
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            //삭제 버튼 클릭
            "fn1": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            },

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
        this.deviceNameFilter = $("#deviceNameFilter");
        this.deviceCategoryFilter = $("#deviceCategoryFilter");
        this.deviceCategorySubFilter = $("#deviceCategorySubFilter");
        this.useYnFilter = $("#useYnFilter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            deviceName: this.deviceNameFilter.val(),
            deviceCategory: this.deviceCategoryFilter.val(),
            deviceCategorySub: this.deviceCategorySubFilter.val(),
            useFlag: this.useYnFilter.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 20    //row count
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "deviceCategoryName", label: "장비 분류", width: 180, align: "center"},
                {key: "deviceCategorySubName", label: "장비 하위 분류", width: 180, align: "center"},
                {key: "deviceCode", label: "장비 코드", width: 160, align: "center"},
                {key: "deviceName", label: "장비 명", width: 400, align: "center"},
                {key: "deviceRoomName", label: "장비 실", width: 150, align: "center"},
                {key: "useFlag", label: "사용 여부", width: 100, align: "center"}
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
            list: _data.list,
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
    getData: function (_type) {
        return this.target.getData();
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    },
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
        $("#deviceRoom").attr("disabled", true);
    },
    validate: function () {
        var rs = this.model.validate();
        var data = fnObj.formView01.getData();


        //필수항목 (장비 명) 입력 안 했을 경우
        if (data.deviceName === undefined || data.deviceName ==="") {
            axToast.push("장비 명을 입력해주세요.");
            return false;
        }

        //필수항목 (장비 분류) 선택 안 했을 경우
        if (data.deviceCategory === undefined || data.deviceCategory ==="") {
            axToast.push("장비 분류를 선택해주세요.");
            return false;
        }

        //필수항목 (장비 하위 분류) 선택 안 했을 경우
        if (data.deviceCategorySub === undefined || data.deviceCategorySub ==="") {
            axToast.push("장비 하위 분류를 선택해주세요.");
            return false;
        }

        if (data.deviceRoom === undefined || data.deviceRoom === "") {
            axToast.push("장비 실을 선택해주세요.");
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
        $("#deviceRoom").attr("disabled", true);
    }
});

/**
 * gridView02
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 20
    },
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                    {key: "componentNo", label: "구성요소 번호", width: 230, align: "center", editor: {type: "number", disabled: "notCreated"}},
                    {key: "componentName", label: "구성요소 명", width: 320, align: "center",editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2);
            }
        });
        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.MODULE_ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.MODULE_ITEM_DEL);
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

        if(_data.page.totalElements === 0) {
            message = "등록된 구성요소가 없습니다.";

            $("#noDataMessage02").text(message);
            $("#noDataMessage02").show();
        } else {
            $("#noDataMessage02").hide();
        }
    },
    getData: function (_type) {
        var map = new Map();
        var list = [];
        var componentNoList = [];
        var _list = this.target.getList(_type);

        switch (_type) {
            case "created":
                list = ax5.util.filter(_list, function () {
                    this.deviceCode = $("#deviceCode").val();
                    this.createdBy = userCd;
                    this.updatedBy = userCd;
                    return this.__created__ && this.deviceCode && this.createdBy && this.updatedBy;
                });
                break;
            case "modified":
                list = ax5.util.filter(_list, function () {
                    this.deviceCode = $("#deviceCode").val();
                    this.createdBy = userCd;
                    this.updatedBy = userCd;
                    return this.componentNo && this.componentName && this.deviceCode && this.__modified__ && this.createdBy && this.updatedBy;
                });
                break;
            case "modifiedCheck":
                list = ax5.util.filter(_list, function () {
                    if(!this.__created__) {
                        this.createdBy = userCd;
                        this.updatedBy = userCd;
                        return this.componentNo && this.componentName && this.deviceCode && this.__modified__ && this.createdBy && this.updatedBy;
                    }
                });
                break;
            case "saveModified":
                list = ax5.util.filter(_list, function () {
                    this.createdBy = userCd;
                    this.updatedBy = userCd;
                    return this.componentNo && this.componentName && this.__modified__ && this.createdBy && this.updatedBy;
                });
                break;
            case "emptyName":
                list = ax5.util.filter(_list, function () {
                    return this.componentName == "" && this.__modified__;
                });
                break;
            default:
                list = _list;
                componentNoList = list.filter((x)=> x.componentNo >= 0).map((x)=> parseInt(x.componentNo));
                componentNoList = duplicateCheck(componentNoList);
                break;
        }

        map.set('list', list);
        map.set('componentNoList', componentNoList);

        return map;
    },
    addRow: function () {
        this.target.addRow({__created__: true,deviceCode:""}, "last");
        $("#noDataMessage02").hide();
    }
});

//구성요소 중복 체크
function duplicateCheck(list) {
    var duplicate = list.some(function(x) {
        return list.indexOf(x) !== list.lastIndexOf(x);
    });

    return duplicate;
}

//페이지 로드시 세팅
function pageLoad() {
    //구성요소 숨김
    $("#gridView02").hide();

    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");
    $("#split-panel-grid-view-02").children(".noDataMessage").attr("id","noDataMessage02");

    //배터리 > module 삭제
    $("#deviceCategorySub option[value='0102']").remove();
    $("#deviceCategorySubFilter option[value='0102']").remove();

    // 고정형,이동형 구분
    $('option[data-data1='+ (essType == "01" ? "02" : "01") +']').hide();

    //formView 장비분류 선택했을때만 표출 (장비하위분류,장비실)
    $("#deviceCategorySub").attr("disabled", true);
    $("#deviceRoom").attr("disabled", true);

    //장비분류 선택시 해당 장비하위분류, 장비실 표출
    $(document).on('change', "#deviceCategory", function(){
        var deviceCategory = $(this).val();
        var deviceRoom = $(this).find(':selected').data('data2');

        $('#deviceRoom option').show();
        $('#deviceCategorySub option').show();
        $('#deviceRoom option:eq(0)').prop("selected",true);
        $('#deviceCategorySub option:eq(0)').prop("selected",true);

        if (deviceCategory == '01' || deviceCategory == '03') {
            $("#gridView02").show();
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH2);
        } else {
            $("#gridView02").hide();
        }

        if(deviceCategory != undefined && deviceCategory != "" && deviceRoom != undefined && deviceRoom != ""){
            //해당장비하위분류표출
            $('#deviceCategorySub option').not('[data-data2='+ deviceCategory +']').hide();
            $('#deviceCategorySub option:eq(0)').show();
            $('#deviceCategorySub').prop('disabled', false);
            //해당장비실표출
            if (deviceRoom != "00") {
                $('#deviceRoom option:not(:eq('+ deviceRoom+'))').hide();
            }
            $('#deviceRoom option:eq(0)').show();
            $('#deviceRoom').prop('disabled', false);
        } else {
            $('#deviceRoom').prop('disabled', true);
            $('#deviceCategorySub').prop('disabled', true);
        }
    });

    //searchView 장비분류 선택했을때만 표출 (장비하위분류)
    $("#deviceCategorySubFilter").attr("disabled", true);

    //searchView 장비분류선택시 해당 장비하위분류 표출
    getDeviceList(false, "deviceCategoryFilter" , "deviceCategorySubFilter");


}