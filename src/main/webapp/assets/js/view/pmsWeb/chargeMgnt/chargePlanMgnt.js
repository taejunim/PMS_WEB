var fnObj = {};
let calendar;
var controlData;
var rollBackTypeName;
let tmpUpdateObject = null;

//해당 월의 기존 일정 마스터 테이블 updatedAt, updatedBy
let masterData = [];

var ACTIONS = axboot.actionExtend(fnObj, {
    //일정 등록
    INSERT: function (caller, act, data) {
        if(caller.formView01.validate()) {
            axDialog.confirm({
                title: "ESS 일정 등록",
                msg: "ESS 일정을 등록하시겠습니까?"
            }, function () {
                if (this.key === "ok") {
                    var data = caller.formView01.getData();
                    axboot.ajax({
                        type: "PUT",
                        url: ["chargeDischargePlanMgnt", "insert"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            if (res.message === 'Duplicate') {
                                axToast.push("해당 기간에 일정이 존재합니다.");
                            } else {
                                tmpUpdateObject = data;
                                tmpUpdateObject.scheduleNo = res.message;

                                let master = masterData.filter(obj =>  obj.scheduleStartDate === data.scheduleStartDate.replaceAll('-',''));

                                if(master.length > 0) {
                                    tmpUpdateObject.masterUpdatedAt = master[0].masterUpdatedAt;
                                    tmpUpdateObject.masterUpdatedBy = master[0].masterUpdatedBy;
                                }
                                tmpUpdateObject.rollBackType = 'insert';

                                tmpUpdateObject = JSON.stringify(tmpUpdateObject);

                                rollBackTypeName = "등록";

                                if (ws.readyState === 1 && connection) {
                                    sendControldData(controlData);
                                } else {
                                    rollBackUpdate(false);
                                }
                            }
                        },
                        options: {
                            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                            onError: function (err) {
                                console.log(err);
                            }
                        }
                    });
                }
            });
            return false;
        }
    },
    //예약 update
    UPDATE: function (caller, act, data) {
        if(caller.formView02.validate()) {
            axDialog.confirm({
                title: "ESS 일정 수정",
                msg: "ESS 일정을 수정하시겠습니까?"
            }, function () {
                if (this.key === "ok") {
                    var data = caller.formView02.getData();
                    axboot.ajax({
                        type: "PUT",
                        url: ["chargeDischargePlanMgnt", "update"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            if (res.message === 'Duplicate') {
                                axToast.push("해당 기간에 일정이 존재합니다.");
                            } else {
                                tmpUpdateObject.rollBackType = "update";
                                tmpUpdateObject = JSON.stringify(tmpUpdateObject);

                                rollBackTypeName = "수정";

                                if (ws.readyState === 1 && connection) {
                                    sendControldData(controlData);
                                } else {
                                    rollBackUpdate(false);
                                }
                            }
                        },
                        options: {
                            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                            onError: function (err) {
                                console.log(err);
                            }
                        }
                    });
                }
            });
            return false;
        }
    },
    //예약 취소
    CANCEL: function (caller, act, data) {
        if(caller.formView02.validate()) {
            axDialog.confirm({
                title: "ESS 일정 취소",
                msg: "일정을 취소하시겠습니까?\n 취소된 일정은 수정이 불가합니다."
            }, function () {
                if (this.key === "ok") {
                    var data = caller.formView02.getData();
                    axboot.ajax({
                        type: "PUT",
                        url: ["chargeDischargePlanMgnt", "cancel"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            tmpUpdateObject.rollBackType = 'cancel';
                            tmpUpdateObject = JSON.stringify(tmpUpdateObject);

                            rollBackTypeName = "취소";

                            if (ws.readyState === 1 && connection) {
                                sendControldData(controlData);
                            } else {
                                rollBackUpdate(false);
                            }
                        },
                        options: {
                            // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                            onError: function (err) {
                                console.log(err);
                            }
                        }
                    });
                }
            });
            return false;
        }
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    selectCommandList();

    showHideInsertPopup(false);
    showHideUpdatePopup(false);

    this.pageButtonView.initView();
    this.formView01.initView();
    this.formView02.initView();
    initCalendar();
    timeInit();    //초기화면 날짜 default값 설정

    //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    //modal 배경 클릭 이벤트 - 등록
    $(".insertModalBack").click(function(e) {
        if ($(e.target).parents('#insertModal').length < 1){
            showHideInsertPopup(false);
        }
    });
    //modal 배경 클릭 이벤트 - 수정
    $(".updateModalBack").click(function(e) {
        if ($(e.target).parents('#updateModal').length < 1){
            showHideUpdatePopup(false);
        }
    });
};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
        axboot.buttonClick(this, "insert-form-view-01-btn", {
            "form-clear": function () {
                showHideInsertPopup(false);
            },
            "form-save": function () {
                if(controlData.controlCode !== undefined) ACTIONS.dispatch(ACTIONS.INSERT);
                else alertMessage("ESS 운영 일정 동기화 등록 확인", "ESS 운영 일정 동기화 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다.");
            }
        });
        axboot.buttonClick(this, "update-form-view-01-btn", {
            "form-cancel": function () {
                if(controlData.controlCode !== undefined) ACTIONS.dispatch(ACTIONS.CANCEL);
                else alertMessage("ESS 운영 일정 동기화 등록 확인", "ESS 운영 일정 동기화 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다.");
            },
            "form-update": function () {
                if(controlData.controlCode !== undefined) ACTIONS.dispatch(ACTIONS.UPDATE);
                else alertMessage("ESS 운영 일정 동기화 등록 확인", "ESS 운영 일정 동기화 제어 정보가 존재하지 않습니다.\n 제어 정보를 등록 후 다시 시도 바랍니다.");
            },
            "form-clear": function () {
                showHideUpdatePopup(false);
            }
        });
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
        this.scheduleStartDate =  $("#insertScheduleStartDate");
        this.scheduleEndDate =  $("#insertScheduleEndDate");
        this.scheduleType =  $("#insertScheduleType");
        this.operationMode =  $("#insertOperationMode");
        this.scheduleStartTime =  $("#insertScheduleStartTime");
        this.scheduleEndTime =  $("#insertScheduleEndTime");
        this.targetUnit =  $("#insertTargetUnit");
        this.targetAmount =  $("#insertTargetAmount");
        this.remarks =  $("#insertRemarks");
        this.initEvent();

        $('#insertScheduleEndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            prevText: '<',
            nextText: '>',
            monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
            monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
            dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            onClose: function() {
                $('.ui-datepicker-prev').css('display','none');
                $('.ui-datepicker-next').css('display','none');
            },
            onChangeMonthYear: function(date){
                setTimeout(function () {
                    $('.ui-datepicker-prev').css('display','block');
                    $('.ui-datepicker-next').css('display','block');
                }, 100);
            }
        });
    },
    initEvent: function () {
        var _this = this;

    },
    getData: function () {
        return {
            scheduleStartDate: this.scheduleStartDate.val(),
            scheduleEndDate  : this.scheduleEndDate.val(),
            scheduleType     : this.scheduleType.val(),
            operationMode    : this.operationMode.val(),
            scheduleStartTime: this.scheduleStartTime.val(),
            scheduleEndTime  : this.scheduleEndTime.val(),
            targetUnit       : this.targetUnit.val(),
            targetAmount     : this.targetAmount.val(),
            remarks          : this.remarks.val()
        };
    },
    setData: function (data) {
        if (typeof data === "undefined") data = this.getDefaultData();

        data = $.extend({}, data);

        tmpUpdateObject = data;
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경

    },
    validate: function () {
        //var rs = this.model.validate();
        var data = fnObj.formView01.getData();
        //필수항목 (일정 구분) 선택 안 했을 경우
        if (data.scheduleType === undefined || data.scheduleType ==="") {
            axToast.push("일정 구분을 선택해주세요.");
            this.scheduleType.focus();
            return false;
        }

        //필수항목 (운전 모드) 선택 안 했을 경우
        if (data.operationMode === undefined || data.operationMode ==="") {
            axToast.push("운전 모드를 선택해주세요.");
            this.operationMode.focus();
            return false;
        }

        //필수항목 (목표 단위) 선택 안 했을 경우
        if (data.targetUnit === undefined || data.targetUnit === "") {
            axToast.push("목표 단위를 선택해주세요");
            this.targetUnit.focus();
            return false;
        }

        //필수항목 (목표량) 선택 안 했을 경우
        if (data.targetAmount === undefined || data.targetAmount === "") {
            axToast.push("목표량을 입력해주세요");
            this.targetAmount.focus();
            return false;
        } else if (isNaN(Number(data.targetAmount))) {
            axToast.push("목표량 형식을 확인해주세요.\n유효한 값을 입력하여 주시기 바랍니다.");
            this.targetAmount.focus();
            return false;
        } else if(data.targetUnit === '01' && (Number(data.targetAmount) < 20 || Number(data.targetAmount) > 80)) {
            axToast.push("목표량을 확인해주세요.\nSOC(%) 유효범위는 20 ~ 80 입니다.");
            this.targetAmount.focus();
            return false;
        } else if(data.targetUnit === '02' && (Number(data.targetAmount) < 0 || Number(data.targetAmount) > 138)) {
            axToast.push("목표량을 확인해주세요.\n전력량(kWh) 유효범위는 0 ~ 138 입니다.");
            this.targetAmount.focus();
            return false;
        }
        return true;
    },
    clear: function () {
    }
});
/**
 * formView02 (UPDATE)
 */
fnObj.formView02 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView02");
        this.scheduleStartDate = $("#updateScheduleStartDate");
        this.scheduleEndDate = $("#updateScheduleEndDate");
        this.scheduleNo =  $("#updateScheduleNo");
        this.scheduleStatus =  $("#updateScheduleStatus");
        this.scheduleType =  $("#updateScheduleType");
        this.operationMode =  $("#updateOperationMode");
        this.scheduleStartTime =  $("#updateScheduleStartTime");
        this.scheduleEndTime =  $("#updateScheduleEndTime");
        this.targetUnit =  $("#updateTargetUnit");
        this.targetAmount =  $("#updateTargetAmount");
        this.remarks =  $("#updateRemarks");

        $('#updateScheduleEndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            prevText: '<',
            nextText: '>',
            monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
            monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
            dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            onClose: function() {
                $('.ui-datepicker-prev').css('display','none');
                $('.ui-datepicker-next').css('display','none');
            },
            onChangeMonthYear: function(date){
                setTimeout(function () {
                    $('.ui-datepicker-prev').css('display','block');
                    $('.ui-datepicker-next').css('display','block');
                }, 100);
            }
        });

        this.initEvent();
    },
    initEvent: function () {
        var _this = this;

    },
    getData: function () {
        return {
            scheduleNo        : this.scheduleNo.val(),
            scheduleStatus    : this.scheduleStatus.val(),
            scheduleStartDate : this.scheduleStartDate.val(),
            scheduleEndDate   : this.scheduleEndDate.val(),
            scheduleType      : this.scheduleType.val(),
            operationMode     : this.operationMode.val(),
            scheduleStartTime : this.scheduleStartTime.val(),
            scheduleEndTime   : this.scheduleEndTime.val(),
            targetUnit        : this.targetUnit.val(),
            targetAmount      : this.targetAmount.val(),
            remarks           : this.remarks.val()
        };
    },
    setData: function (data) {
        if (typeof data === "undefined") data = this.getDefaultData();

        data = $.extend({}, data);
        tmpUpdateObject = data;

        $("#updateScheduleStartDate").val(moment(data.scheduleStartDate).format('YYYY-MM-DD'));
        $("#updateScheduleEndDate").val(moment(data.scheduleEndDate).format('YYYY-MM-DD'));
        $("#updateScheduleNo").val(data.scheduleNo);
        $("#updateShowScheduleNo").val(data.scheduleStartDate + '-' + data.scheduleNo);
        $("#updateScheduleStatus").val(data.scheduleStatusName);
        $("#updateScheduleType").val(data.scheduleType);
        $("#updateOperationMode").val(data.operationMode);
        $("#updateScheduleStartTime").val(data.scheduleStartTime);
        $("#updateScheduleEndTime").val(data.scheduleEndTime);
        $("#updateTargetUnit").val(data.targetUnit);
        $("#updateTargetAmount").val(data.targetAmount);
        $("#updateRemarks").val(data.remarks);
        $("#updateRunStartDateTime").val(data.runStartDateTime);
        $("#updateRunEndDateTime").val(data.runEndDateTime);
    },
    validate: function () {
        //var rs = this.model.validate();
        var data = fnObj.formView02.getData();
        //필수항목 (일정 구분) 선택 안 했을 경우
        if (data.scheduleType === undefined || data.scheduleType ==="") {
            axToast.push("일정 구분을 선택해주세요.");
            this.scheduleType.focus();
            return false;
        }

        //필수항목 (운전 모드) 선택 안 했을 경우
        if (data.operationMode === undefined || data.operationMode ==="") {
            axToast.push("운전 모드를 선택해주세요.");
            this.operationMode.focus();
            return false;
        }

        //필수항목 (목표 단위) 선택 안 했을 경우
        if (data.targetUnit === undefined || data.targetUnit === "") {
            axToast.push("목표 단위를 선택해주세요");
            this.targetUnit.focus();
            return false;
        }

        //필수항목 (목표량) 선택 안 했을 경우
        if (data.targetAmount === undefined || data.targetAmount === "") {
            axToast.push("목표량을 입력해주세요");
            this.targetAmount.focus();
            return false;
        } else if (isNaN(Number(data.targetAmount))) {
            axToast.push("목표량 형식을 확인해주세요.\n유효한 값을 입력하여 주시기 바랍니다.");
            this.targetAmount.focus();
            return false;
        } else if(data.targetUnit === '01' && (Number(data.targetAmount) < 20 || Number(data.targetAmount) > 80)) {
            axToast.push("목표량을 확인해주세요.\nSOC(%) 유효범위는 20 ~ 80 입니다.");
            this.targetAmount.focus();
            return false;
        } else if(data.targetUnit === '02' && (Number(data.targetAmount) < 0 || Number(data.targetAmount) > 138)) {
            axToast.push("목표량을 확인해주세요.\n전력량(kWh) 유효범위는 0 ~ 138 입니다.");
            this.targetAmount.focus();
            return false;
        }
        return true;
    },
    clear: function () {
    }
});
//time picker 초기화
function timeInit() {
    for(let i = 0 ; i < 24 ; i ++) {
        let hh = i >= 10 ? i : '0' + i;
        for(var j = 0 ; j < 2 ; j ++) {
            $(".timePicker").append($("<option value='"+ hh + ":" + (j*3) + "0'>" + hh + ":" + (j*3) + "0</option>"));
        }
    }
}
$("input[name='scheduleEndDate']").click(function () {
    $('.ui-datepicker-prev').css('display','block');
    $('.ui-datepicker-next').css('display','block');
});
$("#insertScheduleType, #updateScheduleType").change(function(){
    let divId = $(this).attr('id');
    let scheduleType = $(this).val();
    let form = "";

    if(divId.indexOf("insert") > -1) {
        form = '#insertOperationMode';
    } else if(divId.indexOf("update") > -1) {
        form = '#updateOperationMode';
    }

    if(scheduleType === '01')  $(form + ' option:eq(1)').hide();
    else  $(form + ' option').show();
    $(form).val("");
});
$(".timePicker, #insertScheduleEndDate, #updateScheduleEndDate").change(function(){
    let divId = $(this).attr('id');
    let form = '';
    if(divId.indexOf("insert") > -1)      form = 'insert';
    else if(divId.indexOf("update") > -1) form = 'update';

    var startDate = $("#" + form + "ScheduleStartDate").val();
    var endDate   = $("#" + form + "ScheduleEndDate").val();

    var startTime = $("#" + form + "ScheduleStartTime").val();
    var endTime   = $("#" + form + "ScheduleEndTime").val();

    if((startDate + startTime) >= (endDate + endTime)) {
        if(startDate === endDate) {
            let endIndex = "#" + form + "ScheduleEndTime option:eq(" + (1 + ($("#" + form + "ScheduleStartTime option").index($("#" + form + "ScheduleStartTime option:selected")))) + ")";
            $(endIndex).prop("selected", "selected");

            //종료 시간 바꿔주고 다시 한 번 값 가져옴.
            startTime   = $("#" + form + "ScheduleStartTime").val();
            if(startTime === "23:30") {
                let nextDate = moment(startDate).add(1,"Days").format('YYYY-MM-DD');
                $("#" + form + "ScheduleEndDate").val(nextDate);
                $("#" + form + "ScheduleEndTime").val("00:00");
            }
            return axToast.push("종료 시간은 시작 시간과 작거나 같게 지정할 수 없습니다.");
        }
    } else if(startDate === endDate && endTime === "24:00") {
        let nextDate = moment(startDate).add(1,"Days").format('YYYY-MM-DD');
        $("#" + form + "ScheduleEndDate").val(nextDate);
        $("#" + form + "ScheduleEndTime").val("00:00");
    }
});
function timePickerDefaultSetting(type) {
    let now = new Date();
    let hour      = now.getHours();
    let minute    = now.getMinutes();
    let startTime = "";
    let endTime   = "";

    if(type === "today") {

        if(minute > 30) {
            startTime = (hour >= 10 ? hour + 1 : "0" + (hour + 1)) + ":00";
        } else {
            startTime = (hour >= 10 ? hour : "0" + hour) + ":30";
        }

        $("#insertScheduleStartTime").val(startTime).prop("selected","selected");

        $("#insertScheduleEndTime option:eq(" + ( 1 + $("#insertScheduleStartTime option").index($("#insertScheduleStartTime option:selected"))) + ")").prop("selected", "selected");

        //당일의 경우 현재 시간 이전의 시간은 hide()
        $("#insertScheduleStartTime option:selected").prevAll().hide();

    } else if(type === "notToday") {
        startTime = "00:00";
        endTime   = "00:30";

        $("#insertScheduleStartTime").val(startTime).prop("selected","selected");
        $("#insertScheduleEndTime").val(endTime).prop("selected","selected");
    }
}
//일정 등록 modal 표출 / 초기화
function showHideInsertPopup(showYn,arg){
    if(showYn) {
        $("#insertModalBack").show();

        $("#insertScheduleStartTime option").show();
        $("#insertScheduleEndTime option").show();

        let scheduleStartDate = arg.startStr.replaceAll('-','');
        let maxDate = '';

        if(scheduleStartDate.indexOf('T') !== -1) scheduleStartDate = scheduleStartDate.substr(0, scheduleStartDate.indexOf('T'));
        maxDate = moment(scheduleStartDate).add(1,"Days").format('YYYY-MM-DD');
        scheduleStartDate = moment(scheduleStartDate).format('YYYY-MM-DD');

        //일정 시작 일자 , 종료 일자 SET
        $("#insertScheduleStartDate").val(scheduleStartDate);
        $("#insertScheduleEndDate").val(scheduleStartDate);
        $("#insertScheduleEndDate").datepicker("option", "minDate", scheduleStartDate);
        $("#insertScheduleEndDate").datepicker("option", "maxDate", maxDate);

        //오늘 날짜를 선택했는지에 따라서 time picker set
        if(checkToday(scheduleStartDate)) {
            timePickerDefaultSetting("today");
        } else {
            timePickerDefaultSetting("notToday");
        }

        //값 넘기기
    } else {
        $(".insertModalBack").hide();
        $(".form-control").val("");
        tmpUpdateObject = null;
    }
}
//일정 상세 modal 표출
function showHideUpdatePopup(showYn, data){
    if(showYn) {
        $("#updateModalBack").show();

        $("#updateScheduleStartTime option").show();
        $("#updateScheduleEndTime option").show();

        let scheduleStartDateTime = data.scheduleStartDate;
        let maxDate = '';

        maxDate = moment(scheduleStartDateTime).add(1,"Days").format('YYYY-MM-DD');
        let scheduleStartDate = moment(scheduleStartDateTime).format('YYYY-MM-DD');
        $("#updateScheduleEndDate").datepicker("option", "minDate", scheduleStartDate);
        $("#updateScheduleEndDate").datepicker("option", "maxDate", maxDate);

        scheduleStartDateTime = scheduleStartDateTime.substr(0,4) + '-' + scheduleStartDateTime.substr(4,2) + '-' + scheduleStartDateTime.substr(6,7);
        scheduleStartDateTime += 'T' + data.scheduleStartTime + ':00';

        //기간이 지났거나 취소된 예약이 아닐 경우
        if(!checkPastDayTime(scheduleStartDateTime) && data.scheduleStatus === '01') {
            $(".hiddenButton").show();
            $(".updateFormControl").removeAttr("disabled","disabled")
        } else {
            $(".updateFormControl").attr("disabled","disabled")
        }

        fnObj.formView02.setData(data);
    } else {
        $("#updateModalBack").hide();
        $(".form-control").val("");
        $(".hiddenButton").hide();
        tmpUpdateObject = null;
    }
}
//여러 날짜 동시에 선택 안되게 막기 (하루 또는 삼십분만 선택할수 있도록)
function checkMultiSelect(arg) {
    if((arg.end.getTime() - arg.start.getTime()) !== 86400000 && (arg.end.getTime() - arg.start.getTime()) !== 1800000){
        return true;
    }
}
//오늘 날짜를 선택했는지 체크
function checkToday(scheduleStartDate) {
    var now = new Date();
    var year     = now.getFullYear();
    var month    = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : ('0' + (now.getMonth() + 1)).slice(-2); //YYYY-MM
    var date     = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();                                                   //YYYY-MM-DD
    var startStr = year + '-' + month + '-' + date;

    return scheduleStartDate === startStr;
}
//과거 날짜를 선택했는지 체크
function checkPastDayTime(data) {
    var now = new Date();
    var year     = now.getFullYear();
    var month    = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : ('0' + (now.getMonth() + 1)).slice(-2); //YYYY-MM
    var date     = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();                                                   //YYYY-MM-DD
    var startStr = year + '-' + month + '-' + date;

    let compare = data.startStr ? data.startStr : data;

    //월달력 과거 체크
    if(compare.indexOf('T') === -1) return compare < startStr;
    else {
        var hour   = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
        var minute = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
        startStr   = startStr + "T" + hour + ":" + minute + ":00";

        return compare.substr(0,16) < startStr;
    }
}

function initCalendar() {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth timeGridWeek timeGridDay list'
        },
        select: function(arg) {             //날짜 클릭
            if(checkMultiSelect(arg)) return;
            if(checkPastDayTime(arg)) return axToast.push("일정 등록은 현재 시간 이후 부터 가능합니다.");
            showHideInsertPopup(true, arg);
        },
        eventClick: function(arg) {         //일정 클릭
            showHideUpdatePopup(true, arg.event._def.extendedProps);
        },
        locale: "ko",                       //한국어 설정
        editable: true,
        selectable: true,
        businessHours: true,
        dayMaxEvents: true,                 // 더 보기 표출
        displayEventTime: true,
        displayEventEnd: true,
        eventTimeFormat: {                  //24시간 형식
            hour: '2-digit',
            minute: '2-digit',
            hour12:false,
            meridiem: false
        },
        timeFormat: 'H(:mm)',               //24시간 형식
        minTime: '00:00:00',
        maxTime: '24:00:00',
        eventDidMount: function(info) {     //일정별 다른 색 칠하기

            //연결된 event면 배경색 바꾸기
            if(info.el.fcSeg.firstCol !== info.el.fcSeg.lastCol || info.el.fcSeg.isStart !== info.el.fcSeg.isEnd) {
                switch (info.event.extendedProps.scheduleType) {
                    case '01' :
                        if (info.event.extendedProps.operationMode === "1") $(info.el).addClass('normalCharge');
                        else if (info.event.extendedProps.operationMode === "2") $(info.el).addClass('normalDischarge');
                        break;
                    case '02' :
                        $(info.el).addClass('dr');
                        break;
                    case '03' :
                        $(info.el).addClass('plusDr');
                        break;
                    default   :
                        break;
                }
            } else {
                switch (info.event.extendedProps.scheduleType) {
                    case '01' :
                        if (info.event.extendedProps.operationMode === "1") $(info.el.children[0]).addClass('normalCharge');
                        else if (info.event.extendedProps.operationMode === "2") $(info.el.children[0]).addClass('normalDischarge');
                        break;
                    case '02' :
                        $(info.el.children[0]).addClass('dr');
                        break;
                    case '03' :
                        $(info.el.children[0]).addClass('plusDr');
                        break;
                    default   :
                        break;
                }
            }

            //월달력 일정 상태
            if(info.view.type === "dayGridMonth")
                if(info.el.fcSeg.firstCol !== info.el.fcSeg.lastCol || info.el.fcSeg.isStart !== info.el.fcSeg.isEnd) {
                    $($($(info.el.children[0]).children()[0])).prepend("<div class=''>[" + info.event.extendedProps.scheduleStatusName +"]</div>");
                } else {
                    $(info.el.children[0]).after("<div class='fc-event-time'>[" + info.event.extendedProps.scheduleStatusName + "]</div>");
                }
            //주,일 달력 일정 상태
            else if(info.view.type === "timeGridWeek" || info.view.type === "timeGridDay")
                $($($(info.el.children[0]).children()[0])).prepend("<div class=''>[" + info.event.extendedProps.scheduleStatusName +"]</div>");
        },
        events: function (info, successCallback, failureCallback) {
            let searchStart = moment(info.start).format('YYYYMMDD');
            let searchEnd   = moment(info.end).format('YYYYMMDD');
            $.ajax({
                 type: 'GET'
               , url: '/chargeDischargePlanMgnt/list'
               , dataType: 'json'
               , data: {searchStart: searchStart, searchEnd: searchEnd}
               , contentType: 'applicaition/x-www-form-urlencoded; charset=UTF-8'
               , success: function(param) {
                     var events = [];
                    masterData  = [];
                     let result = param.mapResponse.map.list;
                     //동적으로 가져오기 (화면에 보여지는 날짜만)
                     $.each(result, function (index, data) {
                        events.push({
                            title : data.scheduleTypeName + ' ' + data.operationModeTypeName
                          , start : data.scheduleStartDate + 'T' + data.scheduleStartTime
                          , end   : data.scheduleEndDate + ' ' + data.scheduleEndTime
                          , scheduleNo : data.scheduleNo
                          , scheduleType : data.scheduleType
                          , scheduleStatus : data.scheduleStatus
                          , scheduleStatusName : data.scheduleStatusName
                          , operationMode : data.operationMode
                          , scheduleStartDate : data.scheduleStartDate
                          , scheduleStartTime : data.scheduleStartTime
                          , scheduleEndDate : data.scheduleEndDate
                          , scheduleEndTime : data.scheduleEndTime
                          , targetUnit : data.targetUnit
                          , targetAmount : data.targetAmount
                          , runStartDateTime : data.runStartDateTime
                          , runEndDateTime : data.runEndDateTime
                          , remarks : data.remarks
                          , updatedAt : data.updatedAt
                          , updatedBy : data.updatedBy
                          , masterUpdatedAt : data.masterUpdatedAt
                          , masterUpdatedBy : data.masterUpdatedBy
                        });

                         masterData.push({
                             scheduleStartDate : data.scheduleStartDate
                             , masterUpdatedAt : data.masterUpdatedAt
                             , masterUpdatedBy : data.masterUpdatedBy
                         });
                     });

                     successCallback(events);
                }
            });
        }
    });
    calendar.render();
}


//제어명령어 데이터 세팅
function setCommandList() {
    let selectData = controlList.find(obj => obj.controlType == '9002');

    controlData = {
        deviceCategory: selectData.deviceCategory,
        deviceCategorySub: selectData.deviceCategorySub,
        deviceCode: selectData.deviceCode,
        controlCode: selectData.controlCode,
        controlValue: ''
    }
}


/**
 * 수정 데이터 rollBack
 * @param status    {Boolean}   :: true - 응답값 실패, false - 통신불가
 */
function rollBackUpdate (status) {
    axboot.call({
        type: "POST",
        url: ["/chargeDischargePlanMgnt","rollBack"],
        data: tmpUpdateObject,
        callback: function (res) { }
    }).done(function () {

        let data = JSON.parse(tmpUpdateObject);
        let rollBackType = data.rollBackType;

        if (status) {
            // 제어요청 응답값이 실패일 때
            alertMessage("ESS 일정 " + rollBackTypeName +  " 실패", "ESS 일정 " + rollBackTypeName + "에 실패하였습니다. \n 잠시 후 다시 시도 바랍니다.");
        } else {
            //통신불가일 때
            alertMessage("ESS 일정 " + rollBackTypeName + " 불가", "현재 일정 " + rollBackTypeName + (rollBackType !== 'cancel'? '이':'')  +  " 불가 상태입니다.\n 통신 상태를 확인 후 다시 시도 바랍니다.");
        }

        showHideInsertPopup(false);
        showHideUpdatePopup(false);
        calendar.refetchEvents();
        parent.reloadSchedule();
    });
}


/**
 * 응답값 성공 시
 */
function controlSuccess() {
    alertMessage("ESS 일정 " + rollBackTypeName + " 성공", "ESS 일정 " + rollBackTypeName + "에 성공하였습니다 .");
    showHideInsertPopup(false);
    showHideUpdatePopup(false);
    calendar.refetchEvents();
    parent.reloadSchedule();
}
