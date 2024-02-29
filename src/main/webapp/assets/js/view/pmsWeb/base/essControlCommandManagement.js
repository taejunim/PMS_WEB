var fnObj = {};
var controlData;
let tmpUpdateObject = null;
var ACTIONS = axboot.actionExtend(fnObj, {
    //페이지 조회
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/essControlCommandManagement", "list"],
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData(), {essCode: essCode}),
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
    //페이지 저장 (신규/수정)
    PAGE_SAVE: function (caller, act, data) {

        if (caller.formView01.validate()) {
            var data = caller.formView01.getData();

            var deviceCode = $("#deviceCode option:selected").val();
            if (deviceCode === undefined || deviceCode ==="") {
                return axToast.push("장비명을 선택하여 주십시오.");
            }

            var controlType = $("#controlType option:selected").val();
            if (controlType === undefined || controlType ==="") {
                return axToast.push("제어 구분을 선택하여 주십시오.");
            }

            var controlValue = $("#controlValue").val();
            if (controlValue === undefined || controlValue ==="") {
                return axToast.push("제어 값을 입력하여 주십시오.");
            }

            // 신규 데이터일 경우 저장
            if (data.controlCode == undefined) {

                axDialog.confirm({
                    title: "장비 제어 정보 들록",
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key == "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["/essControlCommandManagement","insert"],
                            data: JSON.stringify($.extend({}, data, {deviceCode:deviceCode,controlType:controlType, controlValue: controlValue, essCode:essCode})),
                            callback: function (res) {
                                if (res.message === "SUCCESS") {
                                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                    axToast.push(LANG("ax.script.onsave"));
                                    caller.formView01.clear();
                                } else if(res.message === "primaryKeyError") {
                                    axToast.push("동일한 제어 명령어가 등록되어 있습니다.");
                                }
                            }
                        });
                    }
                });
            } else {

                if (controlData.controlCode !== undefined) {
                    // 기존 데이터일 경우 수정
                    axDialog.confirm({
                        title: "장비 제어 정보 수정",
                        msg: LANG("ax.script.onupdatemsg")
                    }, function () {
                        if (this.key == "ok") {
                            axboot.ajax({
                                type: "POST",
                                url: ["/essControlCommandManagement", "update"],
                                data: JSON.stringify(data),
                                callback: function (res) {

                                    if (ws.readyState === 1 && connection) {
                                        sendControldData(controlData);
                                    } else {
                                        rollBackUpdate(false);
                                    }
                                }
                            });
                        }
                    });
                } else alertMessage("장비 제어 정보 동기화 등록 확인", "장비 제어 정보 동기화 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다.");
            }
        }
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
    FORM_CLEAR_ON_SAVE: function (caller, act, data) {
        caller.formView01.clear();
    },
    ITEM_CLICK: function (caller, act, data) {

        //제어 코드
        $("#controlCode").prop("disabled", true);

        //장비코드
        $('#deviceCode').val(data.deviceCode).prop("selected", true);
        $("#deviceCode").prop("disabled", true);

        //제어 구분
        $('#controlType').val(data.controlType).prop("selected", true).show();
        $("#controlType").prop("disabled", true);

        data.controlValue = "" + data.controlValue;

        caller.formView01.setData(data);

        tmpUpdateObject = data;
        tmpUpdateObject.useFlag = $("#useFlag").val();
        tmpUpdateObject = JSON.stringify(tmpUpdateObject);
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    pageLoad();
};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                //1페이지가 아닌곳에서 새로 조회시 페이지 번호 초기화
                fnObj.gridView01.setPageData({pageNumber: 0});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "fn1": function() {                 //삭제버튼
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
        this.deviceCode = $("#deviceCodeFilter");
        this.controlType = $("#controlTypeFilter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            deviceCode: this.deviceCode.val(),
            controlType: this.controlType.val()
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
                {key: "controlCode", label: "제어 코드", width: 150, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "deviceName", label: "장비 명", width: 180, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlTypeName", label: "제어 구분", width: 150, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "controlValue", label: "제어 값", width: 150, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}},
                {key: "useFlagName", label: "사용 여부", width: 100, align: "center" ,formatter: function(){return (this.value == null ? '-' : this.value);}}
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
        setNoMessageDiv("noDataMessage01",_data.page.totalElements, true, _data.totalRowCount);

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
        this.target.find(".key").attr("disabled", "disabled");

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
        this.target.find(".key").removeAttr("disabled");

        $('#controlCode').val("");

        $('#deviceCode').val("");
        $("#deviceCode").prop("disabled", false);

        $('#controlType').val("");
        $("#controlType").prop("disabled", true);
    }
});

//deviceCode 가져오기
function selectDeviceCodes() {
    axboot.ajax({
        method: "GET",
        url: ["/essControlCommandManagement/selectDeviceCodes"],
        data: {},
        callback: function (res) {
            //폼조건
            $("#deviceCode").empty();
            $("#deviceCode").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCode").append("<option value='"+obj.deviceCode+"' data-data2='"+ obj.deviceCategorySub+"'>"+obj.deviceName+"</option>");
            });

            //검색조건
            $("#deviceCodeFilter").empty();
            $("#deviceCodeFilter").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCodeFilter").append("<option value='"+obj.deviceCode+"' data-data2='"+ obj.deviceCategorySub+"'>"+obj.deviceName+"</option>");
            });

            $('#controlType').prop("disabled",true);
            $('#controlTypeFilter').prop("disabled",true);
        }
    });
}


// 명령어 구분 값 가져오기
function selectCommandRequestTypes(deviceCode, caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/essControlCommandManagement/selectCommandRequestTypes"],
        data: {},
        callback: function (res) {
            //폼조건
            $("#controlType").empty();
            $("#controlType").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#controlType").append("<option value='"+obj.code+"' data-data2='"+ obj.data2+"'>"+obj.name+"</option>");
            });

            //검색조건
            $("#controlTypeFilter").empty();
            $("#controlTypeFilter").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#controlTypeFilter").append("<option value='"+obj.code+"' data-data2='"+ obj.data2+"'>"+obj.name+"</option>");
            });

            if(caller != undefined) caller.formView01.setData(data);
        }
    });
}



//제어명령어 데이터 세팅
function setCommandList() {
    let selectData = controlList.find(obj => obj.controlType == '9000');

    controlData = {
        deviceCategory: selectData.deviceCategory,
        deviceCategorySub: selectData.deviceCategorySub,
        deviceCode: selectData.deviceCode,
        controlCode: selectData.controlCode,
        controlValue: ''}
}


//페이지 로드시 세팅
function pageLoad() {
    selectDeviceCodes();
    selectCommandRequestTypes();
    selectCommandList();

    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    getDeviceList(false, "deviceCode" , "controlType");
    getDeviceList(false, "deviceCodeFilter" , "controlTypeFilter");
}


/**
 * 입력값 숫자,소수점,자리수 체크 -- int(11)
 * @param {String} str
 * @param {String} id
 * @returns {string|*}
 */
function onKeyNumberCheck(str,id) {
    var count = 0;
    var idx = str.indexOf('.');
    var pattern1 = /[^-0-9.]/g;
    var data = str.replace(pattern1,'');

    str = data;

    while(idx != -1){
        count ++;
        idx = str.indexOf('.',idx+1);
    }

    if (count > 1 || str.startsWith('.') || str.includes('-', 1)) {
        axToast.push("잘못된 형식의 값이 입력되었습니다. 다시 입력해 주세요");
        return "";
    }

    return data;
}



/**
 * 수정 데이터 rollBack
 * @param status    {Boolean}   :: true - 응답값 실패, false - 통신불가
 */
function rollBackUpdate (status) {
    axboot.call({
        type: "POST",
        url: ["/essControlCommandManagement","rollBackUpdate"],
        data: tmpUpdateObject,
        callback: function (res) { }
    }).done(function () {
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        ACTIONS.dispatch(ACTIONS.FORM_CLEAR_ON_SAVE);
        tmpUpdateObject = null;
        if (status) {
            // 제어요청 응답값이 실패일 때
            alertMessage("장비 제어 정보 수정 실패", "장비 제어 정보 수정에 실패하였습니다.\n 잠시 후 다시 시도 바랍니다.");
        } else {
            //통신불가일 때
            alertMessage("장비 제어 정보 수정 불가", "현재 장비 제어 정보 수정이 불가 상태입니다.\n 통신 상태를 확인 후 다시 시도 바랍니다.");
        }
    });
}



/**
 * 응답값 성공 시
 */
function controlSuccess() {
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    ACTIONS.dispatch(ACTIONS.FORM_CLEAR_ON_SAVE);
    tmpUpdateObject = null;
    alertMessage("장비 제어 정보 수정 성공", "장비 제어 정보 수정에 성공하였습니다.");
}

