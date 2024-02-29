var fnObj = {};
var controlData;
let tmpUpdateObject = null;
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller) {
        axboot.ajax({
            type: "GET",
            url: ["deviceConfig", "list"],
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
    //페이지 저장 (신규/수정)
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var data = caller.formView01.getData();
            var configCode = data.configCode;
            var deviceCode = $("#deviceCode option:selected").val();

            // 신규 데이터일 경우 저장
            if (configCode === "" || configCode === undefined) {
                axDialog.confirm({
                    title: 'ESS 환경설정 등록',
                    msg: LANG("ax.script.onsavemsg")
                }, function () {
                    if (this.key === "ok") {
                        axboot.ajax({
                            type: "PUT",
                            url: ["/deviceConfig", "insert"],
                            data: JSON.stringify($.extend({}, data, {deviceCode:deviceCode})),
                            callback: function (res) {
                                if (res.message === "SUCCESS") {
                                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                                    axToast.push(LANG("ax.script.onsave"));
                                    caller.formView01.clear();
                                } else if(res.message === "primaryKeyError") {
                                    axToast.push("해당 환경설정이 이미 등록되어 있습니다.");
                                }
                            }
                        });
                    }
                });
            } else {

                if (controlData.controlCode !== undefined) {
                    axDialog.confirm({
                        title: 'ESS 환경설정 수정',
                        msg: LANG("ax.script.deviceSetting.confirmMessage")
                    }, function () {
                        if (this.key == "ok") {
                            // 기존 데이터일 경우 수정
                            axboot.ajax({
                                type: "POST",
                                url: ["/deviceConfig", "update"],
                                data: JSON.stringify($.extend({}, data, {deviceCode: deviceCode})),
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
                } else alertMessage("ESS 환경설정 동기화 등록 확인", "ESS 환경설정 동기화 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다.");
            }
        }
    },
    // 데이터 삭제
    PAGE_DELETE: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.deviceSetting.deleteMessage")
        }, function () {
            if (this.key == "ok") {

                var data = caller.formView01.getData();
                axboot.ajax({
                    type: "POST",
                    url: ["/deviceConfig","delete"],
                    data: JSON.stringify(data),
                    callback: function (res) {
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                        axToast.push(LANG("ax.script.ondelete"));
                        caller.formView01.clear();
                    }
                });
            }
        });
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                $("#deviceCode").attr("disabled", true);
                caller.formView01.clear();
            }
        });
    },
    FORM_CLEAR_ON_SAVE: function (caller, act, data) {
        caller.formView01.clear();
    },
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);

        var deviceCode = $("#deviceCode option:selected").val();
        tmpUpdateObject = JSON.stringify($.extend({}, data, {deviceCode:deviceCode}));
    },
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
        this.target = $(document["searchView"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.deviceCode = $("#deviceCodeFilter");
        this.deviceCategory = $("#deviceCategoryFilter");
        this.deviceCategorySub = $("#deviceCategorySubFilter");
        this.configType = $("#configTypeFilter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            deviceCode: this.deviceCode.val(),
            deviceCategory: this.deviceCategory.val(),
            deviceCategorySub: this.deviceCategorySub.val(),
            configType: this.configType.val()
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
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "configCode", label: "설정 코드", width: 150, align: "center"},
                {key: "configName", label: "설정 명", width: 200, align: "center"},
                {key: "deviceCategoryName", label: "장비 분류", width: 150, align: "center"},
                {key: "deviceCategorySubName", label: "장비 하위 분류", width: 150, align: "center"},
                {key: "deviceName", label: "장비", width: 150, align: "center"},
                {key: "configTypeName", label: "설정 구분", width: 100, align: "center"},
                {key: "minSetValue", label: "최소 설정값", width: 85, align: "center",formatter: function(){
                        return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
                {key: "maxSetValue", label: "최대 설정값", width: 85, align: "center",formatter: function(){
            return (this.value == null ? '-' : ax5.util.number(this.value,{"money": true}));}},
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
        this.target.find('[name="key"]').attr("disabled", "disabled");

        $("#deviceCode").val(data.deviceCode);

        $("#configType").attr("disabled", true);
        $("#deviceCategory").attr("disabled", true);
        $("#deviceCategorySub").attr("disabled", true);
        $("#deviceCode").attr("disabled", true);
    },
    validate: function () {
        var rs = this.model.validate();
        var data = fnObj.formView01.getData();

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

        var deviceCode = $("#deviceCode option:selected").val();
        if (deviceCode === undefined || deviceCode === "") {
            axToast.push("장비를 선택해주세요");
            return false;
        }

        if (data.configType === undefined || data.configType === "") {
            axToast.push("설정구분을 선택해주세요");
            return false;
        }
        if (data.configName === undefined || data.configName === "") {
            axToast.push("설정 명을 입력해주세요");
            return false;
        }
        if (data.minSetValue === undefined || data.minSetValue === "") {
            axToast.push("최소 설정값을 입력해주세요");
            return false;
        }
        if (data.maxSetValue === undefined || data.maxSetValue === "") {
            axToast.push("최대 설정값을 입력해주세요");
            return false;
        }

        if (Number(data.maxSetValue) < Number(data.minSetValue)) {
            axToast.push("최소 설정값이 최대 설정값보다 크게 설정할 수 없습니다.\n" +
                "입력한 설정값을 확인 바랍니다.");
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
        this.target.find('[name="key"]').removeAttr("disabled");
        this.model.setModel(this.getDefaultData());
        $("#deviceCode").val("");
        $("#deviceCode").attr("disabled", true);
        $("#deviceCategory").attr("disabled", false);
        $("#deviceCategorySub").attr("disabled", true);
        $("#configType").attr("disabled", false);
    }
});


// deviceCode 값 가져오기
function selectDeviceCodes(caller, data) {
    axboot.ajax({
        method: "GET",
        url: ["/deviceConfig/selectDeviceCodes"],
        data: {"essCode": essCode},
        callback: function (res) {
            //검색조건
            $("#deviceCodeFilter").empty();
            $("#deviceCodeFilter").append("<option value=''>전체</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCodeFilter").append("<option value='"+obj.deviceCode+"' data-data2='"+ obj.deviceCategorySub+"'>"+obj.deviceName+"</option>");
            });

            // 폼 조건
            $("#deviceCode").empty();
            $("#deviceCode").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCode").append("<option value='"+obj.deviceCode+"' data-data2='"+ obj.deviceCategorySub+"'>"+obj.deviceName+"</option>");
            });
        }
    });
}

//제어명령어 데이터 세팅
function setCommandList() {
    let selectData = controlList.find(obj => obj.controlType == '9001');

    controlData = {
        deviceCategory: selectData.deviceCategory,
        deviceCategorySub: selectData.deviceCategorySub,
        deviceCode: selectData.deviceCode,
        controlCode: selectData.controlCode,
        controlValue: ''
    }
}

//페이지 로드시 세팅
function pageLoad() {

    selectDeviceCodes();
    selectCommandList();

    //빈 데이터목록 텍스트 표출
    $("#split-panel-grid-view-01").children(".noDataMessage").attr("id","noDataMessage01");

    //배터리 > module 삭제
    $("#deviceCategorySub option[value='0102']").remove();
    $("#deviceCategorySubFilter option[value='0102']").remove();

    // 고정형,이동형 구분
    $('option[data-data1='+ (essType == "01" ? "02" : "01") +']').hide();

    //formView 장비분류 선택했을때만 표출 (장비하위분류)
    $("#deviceCategorySub").attr("disabled", true);

    getDeviceList(true, "deviceCategory" , "deviceCategorySub", "deviceCode");
    getDeviceList(false, "deviceCategorySub" , "deviceCode");

    //searchView 장비분류 선택했을때만 표출 (장비하위분류)
    $("#deviceCategorySubFilter").attr("disabled", true);
    $("#deviceCodeFilter").attr("disabled", true);

    getDeviceList(true, "deviceCategoryFilter" , "deviceCategorySubFilter", 'deviceCodeFilter');
    getDeviceList(false, "deviceCategorySubFilter" , "deviceCodeFilter");
}

/**
 * 입력값 숫자,소수점,자리수 체크 -- DECIMAL(6,2)
 * @param {String} str
 * @param {String} id
 * @returns {string|*}
 */
function onKeyNumberCheck(str,id) {
    var count = 0;
    var idx = str.indexOf('.');
    var pattern1 = (id == 'minSetValue'? /[^-0-9.]/g : /[^0-9.]/g);
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

    if (str.includes('-')) {
        str = str.split('-')[1];
    }

    if (str.includes('.')) {
        if (str.split('.')[0].length > 4) {
            axToast.push("10,000 미만의 숫자만 입력 가능하니다.");
            return '';
        }

        if (str.split('.')[1].length > 2) {
            axToast.push("소수점 두자리까지 입력 가능하니다.");
            return '';
        }
    } else {
        if (str.length > 4) {
            axToast.push("10,000 미만의 숫자만 입력 가능하니다.");
            return '';
        }
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
        url: ["/deviceConfig", "rollBackUpdate"],
        data: tmpUpdateObject,
        callback: function (res) { }
    }).done(function () {
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        ACTIONS.dispatch(ACTIONS.FORM_CLEAR_ON_SAVE);
        tmpUpdateObject = null;
        if (status) {
            // 제어요청 응답값이 실패일 때
            alertMessage("ESS 환경설정 수정 실패", "ESS 환경설정 수정에 실패하였습니다.\n 잠시 후 다시 시도 바랍니다.");
        } else {
            //통신불가일 때
            alertMessage("ESS 환경설정 수정 불가", "현재 ESS 환경설정이 수정 불가 상태입니다.\n 통신 상태를 확인 후 다시 시도 바랍니다.");
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
    alertMessage("ESS 환경설정 수정 성공", "ESS 환경설정 수정에 성공하였습니다.");
}