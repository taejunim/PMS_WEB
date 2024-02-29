function completeConfig(configType) {

    let data = {
        configType : configType,
        pmsCode : $('#pmsCode').val(),
        deviceCode : $('#deviceCode').val(),
        configNo : configNo,
        essCode : essCode,
        configTypeCode : $('#configTypeCode').val(),
        configName : $('#configName').val(),
        minSetValue : $('#minSetValue').val(),
        maxSetValue : $('#maxSetValue').val(),
        configDescription : $('#configDescription').val()
    };

    let msg;

    if (configType == 'insert') {
        msg = "등록 하시겠습니까?";
    } else if (configType == 'update') {
        msg = "수정 하시겠습니까?";
    } else if (configType == 'delete') {
        msg = "삭제 하시겠습니까?";
    }

    if (checkValidation(data)) {
        axDialog.confirm({
            msg: msg
        }, function () {
            if (this.key == "ok") {
                parent.axboot.modal.callback(data);
            }
        });
    }
}


function checkValidation(data) {
    if (data.pmsCode === undefined || data.pmsCode === "") {
        axToast.push("PMS명을 선택해주세요");
        return false;
    }

    if (data.deviceCode === undefined || data.deviceCode === "") {
        axToast.push("장비명을 선택해주세요");
        return false;
    }

    if (data.configTypeCode === undefined || data.configTypeCode === "") {
        axToast.push("설정 구분을 선택해주세요");
        return false;
    }

    if (data.configName === undefined || data.configName === "") {
        axToast.push("설정명을 입력해주세요");
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

    if (data.configDescription === undefined || data.configDescription === "") {
        axToast.push("설정 설명을 입력해주세요");
        return false;
    }

    return true;
}

// pmsCode - DeviceCode 값 가져오기
function selectDeviceCodes(pmsCode, configType, deviceCode) {
    console.log(configType);
    axboot.ajax({
        method: "GET",
        url: ["/deviceConfig/selectDeviceCodes"],
        data: {"pmsCode": pmsCode},
        callback: function (res) {
            $("#deviceCode").empty();
            $("#deviceCode").append("<option value=''>선택</option>");
            $(res.list).each(function (idx, obj) {
                $("#deviceCode").append("<option value='"+obj.deviceCode+"'>"+obj.deviceName+"</option>");
            });

            if (configType == 'update') {
                $("#deviceCode").val(deviceCode).prop("selected", true);
                $("#deviceCode").attr("disabled", true);
            }
        }
    });
}