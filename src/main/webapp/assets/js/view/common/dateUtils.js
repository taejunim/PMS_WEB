//초기화면 날짜 default값 설정 함수
function dateInit() {

    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth() , 1) //이번달 1일
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)  //이번달 말일

    var firstDayYear = firstDay.getFullYear();
    var firstDayMonth = firstDay.getMonth() + 1 >= 10 ? firstDay.getMonth() + 1 : "0" + firstDay.getMonth() + 1; //1-9월까지 앞에 0 추가
    var firstDayDate = firstDay.getDate() >= 10 ? firstDay.getDate() : "0" + firstDay.getDate();     //1-9일까지 앞에 0 추가
    var lastDayYear = lastDay.getFullYear();
    var lastDayMonth = lastDay.getMonth() + 1 >= 10 ? lastDay.getMonth() + 1 : "0" + lastDay.getMonth() + 1;     //1-9월까지 앞에 0 추가
    var lastDayDate = lastDay.getDate() >= 10 ? lastDay.getDate() : "0" + lastDay.getDate();         //1-9일까지 앞에 0 추가

    firstDay = firstDayYear + "-" + firstDayMonth + "-" + firstDayDate;     //0000-00-00
    lastDay = lastDayYear + "-" + lastDayMonth + "-" + lastDayDate;         //0000-00-00

    $("#startDateFilter").val(firstDay);
    $("#endDateFilter").val(lastDay);
}