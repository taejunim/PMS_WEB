let totalPages = 0;
let pageNumber = 0;
let pageSize = 10;

var fnObj = {};

$(function() {
    $(document).on('change', "#deviceCode, #configTypeCode", function(){
        initView();
    });
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();

    selectConfigList('init');
};

var ACTIONS = axboot.actionExtend(fnObj, {
    CONFIG_MODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "CONFIG_MODAL",
            param: "configType="+data.configType+"&configTitle="+data.configTitle+"&configNo="+data.configNo+"&essCode="+data.essCode+"&deviceCode="+data.deviceCode+"&configTypeCode="+data.configTypeCode+"",
            sendData: function () {
                return {};
            },
            callback: function (data) {
                this.close();

                if (data.configType == 'insert') {
                    axboot.ajax({
                        type: "PUT",
                        url: ["/deviceConfig", "insert"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            axToast.push("등록되었습니다.");

                            initView();
                        }
                    });
                } else if (data.configType == 'update') {
                    axboot.ajax({
                        type: "POST",
                        url: ["/deviceConfig", "update"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            axToast.push("수정되었습니다.");

                            initView();
                        }
                    });
                } else if (data.configType == 'delete') {
                    axboot.ajax({
                        type: "POST",
                        url: ["/deviceConfig","delete"],
                        data: JSON.stringify(data),
                        callback: function (res) {
                            axToast.push("삭제되었습니다.");

                            initView();
                        }
                    });
                }
            }
        });
    }
});

/**
 * pageButtonView
 */
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {

        let selectedData;

        axboot.buttonClick(this, "data-page-btn", {
            "addConfig": function () {

                selectedData = {
                    configType : 'insert',
                    configTitle : '환경 설정 등록'
                };

                ACTIONS.dispatch(ACTIONS.CONFIG_MODAL, selectedData);
            },

        });
    }
});

function initView() {
    totalPages = 0
    pageNumber = 0

    selectConfigList('init');
}

function selectConfigList(type) {

    if (type == 'add') {
        pageNumber++;
    }

    axboot.ajax({
        type: "GET",
        url: ["deviceConfig", "list"],
        data: {
            deviceCode : $('#deviceCode').val()
            , configTypeCode : $('#configTypeCode').val()
            , pageNumber : pageNumber
            , pageSize : pageSize
        },
        callback: function (res) {

            if (type == 'add') {
                $('#configDiv').append(configListHtml(res.mapResponse.map.list));
            } else if (type == 'init'){

                $('#configDiv').empty();

                $('#configDiv').html(configListHtml(res.mapResponse.map.list));
            }

            let pageInfo = res.mapResponse.map.page;
            let currentPage = pageInfo.currentPage;

            totalPages = pageInfo.totalPages;

            if (totalPages > currentPage + 1) {
                $('#additionButton').show();
            } else {
                $('#additionButton').hide();
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

function updateConfig(configNo, essCode, deviceCode, configTypeCode) {

    let selectedData = {
        configType : 'update',
        configTitle : '환경 설정 수정',
        configNo : configNo,
        essCode : essCode,
        deviceCode : deviceCode,
        configTypeCode : configTypeCode

    };

    ACTIONS.dispatch(ACTIONS.CONFIG_MODAL, selectedData);
}

function configListHtml(configList) {

    let html = "";

    if (configList.length > 0) {

        $.each(configList, function(index, item){

            let pmsName = item.pmsName == undefined ? '-' : item.pmsName;
            let deviceName = item.deviceName == undefined ? '-' : item.deviceName;
            let configCodeName = item.configCodeName == undefined ? '-' : item.configCodeName;
            let configName = item.configName == undefined ? '-' : item.configName;
            let minSetValue = item.minSetValue == undefined ? '-' : item.minSetValue;
            let maxSetValue = item.maxSetValue == undefined ? '-' : item.maxSetValue;
            let createdBy = item.createdBy == undefined ? '-' : item.createdBy;
            let createdAt = item.createdAt == undefined ? '-' : item.createdAt;

            html += ' <ax style="width: 100%;" id ="" onclick="updateConfig(\'' +item.configNo + '\', \''+item.essCode+'\', \''+item.deviceCode+'\', \''+item.configTypeCode+'\')">';
            html += '     <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">';
            html += '         <div data-ax-tr="" class="" style="">';
            html += '             <div data-ax-td-wrap="">';
            html += '                 <table class="col-md-11 configTable">';
            html += '                     <tbody>';
            html += '                       <tr style="height: 5px;"></tr>';
            html += '                       <tr>';
            html += '                           <td>PMS 명</td>';
            html += '                           <td>'+pmsName+'</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>장비 명</td>';
            html += '                           <td>'+deviceName+'</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>설정 구분</td>';
            html += '                           <td>'+configCodeName+'</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>설정 명</td>';
            html += '                           <td>' + configName + '</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>최소 설정값</td>';
            html += '                           <td>' + minSetValue + '</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>최대 설정값</td>';
            html += '                           <td>' + maxSetValue + '</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>등록자</td>';
            html += '                           <td>' + createdBy + '</td>';
            html += '                       </tr>';

            html += '                       <tr>';
            html += '                           <td>등록 일시</td>';
            html += '                           <td>' + createdAt + '</td>';
            html += '                       </tr>';
            html += '                       <tr style="height: 10px;"></tr>';
            html += '                     </tbody>';
            html += '                 </table>';
            html += '             </div>';
            html += '         </div>';
            html += '     </div>';
            html += ' </ax>';
        });

    } else {
        html += ' <ax style="width: 100%;" id ="">';
        html += '     <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">';
        html += '         <div data-ax-tr="" class="" style="">';
        html += '             <div data-ax-td-wrap="">';
        html += '                 <table class="col-md-11 configTable">';
        html += '                   <tbody>';
        html += '                       <tr style="height: 5px;"></tr>';
        html += '                       <tr>';
        html += '                           <td style="text-align: center">등록된 설정값이 없습니다.</td>';
        html += '                       </tr>';
        html += '                       <tr style="height: 5px;"></tr>';
        html += '                   </tbody>';
        html += '                 </table>';
        html += '             </div>';
        html += '         </div>';
        html += '     </div>';
        html += ' </ax>';
    }

    return html;
}