let pageSize = 10;
let pageNumber = 0;

var period = 'today';

//라디오 버튼 값을 가져온다.
$("input[name='period']:radio").change(function () {

    $('#dataList').empty();

    //setList(this.value);
    pageNumber = 0;
    period = this.value;
    setList();
});

setList();

function setList() {

    axboot.ajax({
        type: "GET",
        url: ["chargeDischargeContractMgnt", "selectChargeContractInfoForMobile"],
        data: {
            pmsCode: essId,
            period: period,
            pageNumber: pageNumber,
            pageSize: pageSize
        },
        callback: function (res) {

            let dataList = res.mapResponse.map.list;
            let pageObject = res.mapResponse.map.page;

            if (dataList.length > 0) {

                $('#noData').hide();

                let totalPages = pageObject.totalPages;
                let currentPage = pageObject.currentPage + 1;

                dataList.forEach(function (item, index) {

                    var html = '';

                    html = '<div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">';
                    html +=     '<div data-ax-tr="" class="" style="">';
                    html +=         '<div data-ax-td="" class="wd100" onclick="openContractDetail('+item.rowId+')">';
                    html +=         '<input type="hidden" id="essCode_'+item.rowId+'" value="'+item.essCode+'" >';
                    html +=         '<input type="hidden" id="chargeTargetSeq_'+item.rowId+'" value="'+item.chargeTargetSeq+'" >';
                    html +=         '<input type="hidden" id="contractStartDatetime_'+item.rowId+'" value="'+item.contractStartDatetime+'" >';
                    html +=             '<div data-ax-td-wrap="" style="line-height: 25px;">';
                    html +=                 '<div class="ax-button-group">';
                    html +=                     '<div class="left">';
                    html +=                         '<span class="chargeContractInfo" style="margin-right: 20px;">대상</span>';
                    html +=                         '<span class="chargeContractInfo" id="chargeTarget">'+item.targetName+'</span>';
                    html +=                     '</div>';
                    html +=                 '</div>';
                    html +=                 '<div class="ax-button-group">';
                    html +=                     '<div class="left">';
                    html +=                         '<span class="chargeContractInfo" style="margin-right: 20px;">주소</span>';
                    html +=                         '<span class="chargeContractInfo" id="chargeAddress">'+item.targetAddress+'</span>';
                    html +=                     '</div>';
                    html +=                 '</div>';
                    html +=                 '<div class="ax-button-group">';
                    html +=                     '<div class="left">';
                    html +=                         '<span class="chargeContractInfo" style="margin-right: 20px;">일시</span>';
                    html +=                         '<span class="chargeContractInfo" id="chargeStartDate">'+item.contractStartDatetime+' ~ '+item.contractEndDatetime+'</span>';
                    html +=                     '</div>';
                    html +=                 '</div>';
                    html +=             '</div>';
                    html +=         '</div>';
                    html +=     '</div>';
                    html += '</div>';

                    $('#dataList').append(html);

                    if (totalPages != currentPage) {
                        $('#moreButton').parent().show();
                    } else {
                        $('#moreButton').parent().hide();
                    }

                });
            } else {
                $('#moreButton').parent().hide();
                $('#noData').show();
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

function moreButton() {
    pageNumber++;
    setList();
}

function openContractDetail(rowId) {
    let essCode = "essCode_" + rowId;
    let chargeTargetSeq = "chargeTargetSeq_" + rowId;
    let contractStartDatetimeId = "contractStartDatetime_" + rowId;

    axboot.modal.open({
        modalType: "CONTRACT_DETAIL_MODAL",
        width: $( window ).width() * 0.85,
        height: 600,
        param: "essCode="+$('#'+essCode).val()+"&chargeTargetSeq="+$('#'+chargeTargetSeq).val()+"&contractStartDatetimeId="+$('#'+contractStartDatetimeId).val(),
        sendData: function () {
            return {};
        },
        callback: function (data) {
            console.log("control : " + data);

            if (data == "close") {
                this.close();
            }
        }
    });
}