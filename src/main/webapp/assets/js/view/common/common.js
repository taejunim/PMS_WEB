$(function () {
    var getLabel = $('div[data-ax-td-label]');
    $(getLabel).each(function (idx, obj) {
        if($(obj).text().indexOf('*') != -1){
            var $span = "<span style='color:#C90000; font-weight: bold; vertical-align: middle;'>*</span>";

            var getText = $(obj).text();

            getText = getText.replaceAll("*","");

            $(obj).text(getText);
            $(obj).prepend($span);
        }
    })
});
function setNoMessageDiv(divId, listSize, checkTotal, totalSize) {
    if(listSize === 0) {
        if(checkTotal === true) {
            if(totalSize === 0) message = "등록된 데이터가 없습니다.";
            else message = "조회 조건과 일치하는 데이터가 없습니다.";
        } else message = "조회 조건과 일치하는 데이터가 없습니다.";

        $("#" + divId).text(message);
        $("#" + divId).show();
    } else {
        $("#" + divId).hide();
    }
}
function setNoMessageDiv2(divId, listSize, message) {

    if(listSize === 0)  {
        $("#" + divId).show();
        $("#" + divId).text(message);
    }
    else   $("#" + divId).hide();
}


/**
 * 장비,장비분류,장비하위분류 불러오기
 * @param isEnabled {Boolean}   세개 이상의 연결된 선택값들이 있을때 -true , 아니면 - false
 * @param clickId   {String}    해당 클릭 아이디
 * @param id        {String}    하위 표출 아이디
 * @param subId     {String}    isEnabled 값이 ture 일때만 사용
 * @param target    {String}    숨김처리 값
 */
function getDeviceList(isEnabled, clickId, id, subId) {
    $(document).on('change', "#" + clickId, function(){
        var data = $(this).val();

        if (id === "controlType" || id === "controlTypeFilter") {
            data = $("option:selected", this).attr("data-data2");
        }

        $('#' + id + ' option').show();
        $('#' + id + ' option:eq(0)').prop("selected",true);

        if(data != undefined && data != ""){
            //해당데이터 하위분류표출
            $('#' + id + ' option').not('[data-data2='+ data +']').hide();
            $('#' + id + ' option:eq(0)').show();
            $('#' + id).prop('disabled', false);
        } else {
            $('#' + id).prop('disabled', true);
        }

        if (isEnabled) {
            $('#' + subId + ' option:eq(0)').prop("selected",true);
            $('#' + subId).prop('disabled', true);
        }
    });
}
