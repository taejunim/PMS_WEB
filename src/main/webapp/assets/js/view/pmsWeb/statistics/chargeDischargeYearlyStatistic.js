var fnObj = {};
var date = "";
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["/chargeDischargeStatistic", "yearlyList"],
            data: caller.searchView.getData(),
            callback: function (res) {
                //엑셀 파일명 생성 위한 전역 변수
                date = res.chargeDischargeStatisticVO.searchDate.replaceAll("-","");
                makeChartData(res.mapResponse.map.list);
                caller.gridView01.setData(res.mapResponse.map);
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
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    },
    EXCEL_EXPORT: function (caller, act, data) {
        var fileName = "충방전연간통계_" + date + ".xls";
        caller.gridView01.exportExcel(fileName);
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();

    statisticDateInit("year");

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {

        var picker = new ax5.ui.picker();

        picker.bind({
            target: $('[data-ax5picker="grid1"]'),
            content: {
                type: 'date',
                config: {
                    mode: "year",
                    selectMode: "year",
                    lang: {
                        yearTmpl: "%s년"
                    }
                },
                formatter: {
                    pattern: 'date(year)'
                }
            }
        });
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.searchDate = $("#searchDateFilter");
    },
    getData: function () {
        return {
            searchDate: this.searchDate.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 24
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "label", label: "통계 월", width: 160, align: "center"},
                {key: "accumulatedCharge", label: "누적 충전 전력량 (kWh)", width: 150, formatter: "money", align: "center"},
                {key: "accumulatedDischarge", label: "누적 방전 전력량 (kWh)", width: 150, formatter: "money", align: "center"},
            ],
            //그리드 summary
            footSum: [
                [
                    {label: "총합", align: "center"},
                    {key: "accumulatedCharge", collector: "sum", formatter: "money", align: "right"},
                    {key: "accumulatedDischarge", collector: "sum", formatter: "money", align: "right"},
                ]]
        });
    },
    setData: function (_data) {
        //검색 결과가 없으면 메세지 표출
        if(_data.list.length  == 0) axToast.push(LANG("ax.script.noData"));
        this.target.setData({
            list : _data.list,
            page: { //페이지 세팅
                currentPage:  0,
                totalElements: _data.list.length,
                totalPages: 1
            }
        });
    },
    exportExcel: function exportExcel(_filename) {
        this.target.exportExcel(_filename);
    }
});