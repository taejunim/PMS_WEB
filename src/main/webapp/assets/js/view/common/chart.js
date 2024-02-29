document.write('<link href="/assets/css/c3/c3.css" rel="stylesheet">');
document.write('<script type="text/javascript" src="/assets/js/view/common/chartJs/Chart.bundle.min.js"></script>');
document.write('<script type="text/javascript" src="/assets/js/view/common/chartJs/chartjs-gauge.js"></script>');
document.write('<script type="text/javascript" src="/assets/js/view/common/chartJs/chartjs-chart-radial-gauge.js"></script>');
document.write('<script type="text/javascript" src="/assets/js/view/common/momentJs/moment.min.js"></script>');

document.write('<script type="text/javascript" src="/assets/js/view/common/c3/c3.js"></script>');
document.write('<script type="text/javascript" src="/assets/js/view/common/c3/d3.js"></script>');

var barGraph;
let operationModeList;
let deviceStatusList;

/** 통계화면 datepicker 값 초기화 *
 * param format - 연간 / 월간 / 일간 구분 ("year"/"month") -> DEFAULT 일간
 * */
function statisticDateInit(format) {

    var date = new Date();
    var searchDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var searchDateYear = searchDate.getFullYear();
    var searchDateResult = searchDateYear;
    if (format != "year") {
        var searchDateMonth = searchDate.getMonth() + 1 >= 10 ? searchDate.getMonth() + 1 : "0" + (searchDate.getMonth() + 1); //1-9월까지 앞에 0 추가
        searchDateResult = searchDateResult + "-" + searchDateMonth;
        if (format != "month") {
            var searchDateDay = searchDate.getDate() >= 10 ? searchDate.getDate() : "0" + searchDate.getDate();     //1-9일까지 앞에 0 추가
            searchDateResult = searchDateResult + "-" + searchDateDay;     //0000-00-00
        }
    }
    $("#searchDateFilter").val(searchDateResult);
}

/** 통계화면 차트 만들기
 * param -> LIST
 * */
function makeChartData(list) {

    //범례와 y축 데이터
    var data = [
        ['충전 (kWh)'],
        ['방전 (kWh)']
    ];

    //x축
    var label = [];
    for (var i = 0; i < list.length; i++) {
        data[0].push(list[i].accumulatedCharge);
        data[1].push(list[i].accumulatedDischarge);

        label.push(list[i].label);
    }

    var chart = c3.generate({
        bindto: '#chart1',
        data: {
            columns: data,
            axes: {
                data2: 'y2' // ADD
            },
            type: 'bar'
        },
        color: {
            pattern: ['#41B3D5', '#F96501']
        },
        legend: {
            show: true
        },
        axis: {
            x: {
                type: 'category',
                categories: label
            },
            y: {
                show: true // ADD
            }
        }
    });
}



/* -------------------- 메인화면 chart -------------------- */


/**
 * 실시간 누적 전력량 , 배터리 운영 상태 donutChart
 * @param chartId
 * @param bgColor
 * @param fontSize
 */
function donutChart(chartId, fontSize) {
    var ctx = document.getElementById(chartId).getContext("2d");
    const config =
        {
            defaults : {
              font:{
                  weight:'bold',
              }
            },
            type: 'radialGauge',
            data: {
                datasets: [{
                    data: [0],
                    backgroundColor: ['#575757'],
                    borderWidth: 0,
                }]
            },
            options: {
                padding: 0,
                maintainAspectRatio: false,
                responsive: true,
                legend: false,
                title: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                centerPercentage: 80,
                rotation: -Math.PI / 2,
                trackColor: '#474747',
                domain: [0, 100],
                roundedCorners: true,
                centerArea: {
                    displayText: true,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontColor: '#fff',
                    fontSize: fontSize,
                    fontStyle: 'normal',
                    padding: 20,
                    textAlign:'center',
                    backgroundImage: null,
                    backgroundColor: null,
                    text:'0.0 %',
                },
            },
        };

    switch (chartId) {
        case 'socData':
            socData = new Chart(ctx,config);
            break;
        case 'rack1Data':
            rack1Data = new Chart(ctx,config);
            break;
        case 'rack2Data':
            rack2Data = new Chart(ctx,config);
            break;
        case 'mobileChart':
            mobileChart = new Chart(ctx,config);

            mobileChart.data.datasets[0].data = [50];
            mobileChart.data.datasets[0].backgroundColor = ['#66ADD9'];
            mobileChart.options.centerArea.text = '50.0 %';

            mobileChart.update();
            break;
        default:
            break;
    }
}


/**
 * PCS 운영상태 gaugeChart
 * @param chartId
 */
function gaugeChart(chartId) {
    var ctx = document.getElementById(chartId).getContext("2d");

    const config = {
        type: 'gauge',
        data: {
            datasets: [{
                data: [ '0', '95'],
                value: ['0'],
                minValue: 0,
                maxValue:95,
                backgroundColor: ['#474747','#474747'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 70,
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            label: {
                display: false
            },
            valueLabel: {
                display: false,
            },
            layout: {
                padding: {
                    bottom: 50
                },
            },
            needle: {
                radiusPercentage: 2.5,
                widthPercentage: 2,
                lengthPercentage: 90,
                color: '#fff'
            },
        },
    };

    switch (chartId) {
        case 'gaugeChart':
            chart = new Chart(ctx,config);
            break;
        case 'lGridChart':
            lGridChart = new Chart(ctx,config);
            break;
        case 'gridChart':
            gridChart = new Chart(ctx,config);
            break;
        case 'rGridChart':
            rGridChart = new Chart(ctx,config);
            break;
        case 'leftInverterChart':
            leftInverterChart = new Chart(ctx,config);
            break;
        case 'convertChart':
            convertChart = new Chart(ctx,config);
            break;
        case 'rightInverterChart':
            rightInverterChart = new Chart(ctx,config);
            break;
        default:
            break;
    }
}


/**
 * 누적 전력량 그래프
 */
function barChart () {
    barGraph = c3.generate({
        bindto: '#barGraph',
        size: {
            width: 370,
            height: 200
        },
        bar: {
            width: {
                ratio: 0.8
            },
            space: 0.6
        },
        data: {
            type: 'bar',
            columns: [
                ['전일 방전', 0],['전일 충전', 0],
                ['금일 방전', 0],['금일 충전', 0]
            ],
            groups: [
                ['전일 방전', '전일 충전'],
                ['금일 방전', '금일 충전']
            ],
        },
        color: {
            pattern: ['#EE4422', '#2177BD', '#F96501', '#41B3D3']
        },
        axis: {
            rotated: true,
            x: {
                show: false,
            },
            y: {
                show: true,
                max: 200,
                min: -200,
                tick : {
                    format: function (d) {
                        return d + " kWh";
                    },
                    values : [-200,0,200]
                }
            }
        },
        legend: {
            show: true,
        },
        tooltip: {
            grouped: false,
            contents: function (d) {
                let key = `${d[0].id}`;
                let value = `${d[0].value} kWh`;
                let tooltip = `<div class="graph__tooltip--wrapper">
                                        <div class="text-color">${key}</div>
                                        <div>전력량: <span class="strong">${value}</span></div>
                                      </div> `;
                return tooltip;
            },
        },
        transition: {
            duration: 350
        },
        grid: {
            y: {
                lines: [{value:0 },{value:200 },{value:-200 }]
            }
        }
    });
}


/**
 * 누적 전력량 그래프 수정
 * @param data
 */
function updateBarChart (data) {
    var max = Math.max(data.bfrtCumulativeCharge, data.ndCumulativeCharge);
    var min = Math.min(data.bfrtCumulativeDischarge, data.ndCumulativeDischarge);
    var range = (max > Math.abs(min) ? max : Math.abs(min));

    if (range <= 1) {
        range = 1;
    } else if ( range < 10){
        range = 10;
    } else if ( range < 1000) {
        range = Math.ceil(Math.ceil(range) / 100) * 100;
    } else {
        range = Math.ceil(Math.ceil(range) / 1000) * 1000;
    }

    barGraph.load({
        columns: [
            ['전일 방전', data.bfrtCumulativeDischarge],['전일 충전', data.bfrtCumulativeCharge],
            ['금일 방전', data.ndCumulativeDischarge],['금일 충전', data.ndCumulativeCharge]
        ],
    });

    barGraph.axis.max(range);
    barGraph.axis.min(-range);
    barGraph.internal.config.axis_y_tick_values = [-range,0 ,range];
    barGraph.ygrids([
        {value: 0},
        {value: range},
        {value: -range},
    ]);
}



/**
 * chart data update
 * @param chartId
 * @param value
 * @param chargingStatus
 * @param title
 */
function updateChart(chartId, value, operationStatus,operationModeStatus) {
    var map = setStatusDataCode(operationStatus,operationModeStatus);
    var title = map.get('title');
    var color = map.get('color');
    var socColor = "#575757";

    if (operationStatus === '08') {
        socColor = '#DAFC51';
    }

    switch (chartId) {
        case 'socData':
            var data = Math.floor(value * 10) / 10;

            socData.data.datasets[0].data = [data];
            socData.data.datasets[0].backgroundColor = [socColor];
            socData.options.centerArea.text = data.toFixed(1) + ' %';

            socData.update();
            break;
        case 'rack1Data':
            var data = Math.floor(value * 10) / 10;

            rack1Data.data.datasets[0].data = [data];
            rack1Data.data.datasets[0].backgroundColor = [socColor];
            rack1Data.options.centerArea.text = data.toFixed(1) + ' %';

            rack1Data.update();

            //상태값표시
            var code = (operationStatus === "08" ? operationModeStatus : operationStatus);
            $("#rack1-status").attr("src", "/assets/images/main/horizontal/" + code + "-enable-horizontal.png");

            break;
        case 'rack2Data':
            var data = Math.floor(value * 10) / 10;

            rack2Data.data.datasets[0].data = [data];
            rack2Data.data.datasets[0].backgroundColor = [socColor];
            rack2Data.options.centerArea.text = data.toFixed(1) + ' %';

            rack2Data.update();

            //상태값표시
            var code = (operationStatus === "08" ? operationModeStatus : operationStatus);
            $("#rack2-status").attr("src", "/assets/images/main/horizontal/" + code + "-enable-horizontal.png");

            break;
        case 'gaugeChart':
            if (operationStatus === '12') {
                if (operationModeStatus === '2') {
                    $("#minusEnd").text('- 95');
                } else {
                    $("#minusEnd").text('95');
                }
            } else {
                $("#minusEnd").text('95');
            }

            chart.data.datasets[0].value = value;
            chart.data.datasets[0].data = [value,95];
            chart.data.datasets[0].backgroundColor = [color, '#474747'];
            chart.options.title.fontColor = [color];

            chart.update();

            $("#outputPower").text((operationStatus === '100' ? '-' : value));

            break;
        case "gridChart" :
            gridChart.data.datasets[0].value = value;
            gridChart.data.datasets[0].data = [value,100];
            gridChart.data.datasets[0].backgroundColor = [color, '#474747'];

            gridChart.update();
            break;
        case "lGridChart" :
            lGridChart.data.datasets[0].value = value;
            lGridChart.data.datasets[0].data = [value,100];
            lGridChart.data.datasets[0].backgroundColor = [color, '#474747'];

            lGridChart.update();
            break;
        case "rGridChart" :
            rGridChart.data.datasets[0].value = value;
            rGridChart.data.datasets[0].data = [value,100];
            rGridChart.data.datasets[0].backgroundColor = [color, '#474747'];

            rGridChart.update();
            break;
        case "convertChart" :
            convertChart.data.datasets[0].value = value;
            convertChart.data.datasets[0].data = [value,100];
            convertChart.data.datasets[0].backgroundColor = [color, '#474747'];

            convertChart.update();
            break;
        case "leftInverterChart" :
            leftInverterChart.data.datasets[0].value = value;
            leftInverterChart.data.datasets[0].data = [value,100];
            leftInverterChart.data.datasets[0].backgroundColor = [color, '#474747'];

            leftInverterChart.update();
            break;
        case "rightInverterChart" :
            rightInverterChart.data.datasets[0].value = value;
            rightInverterChart.data.datasets[0].data = [value,100];
            rightInverterChart.data.datasets[0].backgroundColor = [color, '#474747'];

            rightInverterChart.update();
            break;
        case "currentAccumulated":
            if (operationModeStatus === '1') {
                $('#sign').removeClass('fa-minus').addClass('fa-plus');

            } else if (operationModeStatus === '2') {
                $('#sign').removeClass('fa-plus').addClass('fa-minus');

            } else {
                $('#sign').removeClass('fa-plus fa-minus');
            }

            $('#currentAccumulatedName').text(title);
            $('#currentAccumulatedValue').text(value);
            $('#currentAccumulatedProgress').val(value);
            $('.status-02 .layout-00').css("color",color);
            break;
        default:
            break;
    }
}


/**
 * 상태 코드 값에 따른 name,color,sign 데이터 Map 담기
 * @param {string} operationStatus
 * @param {String} operationModeStatus
 * @returns {Object} map
 */
function setStatusDataCode(operationStatus,operationModeStatus) {
    var map = new Map();
    var title = "";
    var color = "#575757";

    var status = deviceStatusList.find(obj => obj.code === operationStatus);
    var modeStatus = operationModeList.find(obj => obj.code === operationModeStatus);

    //상태가 운전중일때는 모드표출, 아니면 상태표출
    if (operationStatus === '12' || operationStatus === '08') {
        title = modeStatus.name;
        color = modeStatus.data5;
    } else {
        title = (operationStatus === "100" ? "통신 불가" : status.name);
    }

    map.set('title',title);
    map.set('color',color);

    return map;
}


/**
 * 운전모드상태 코드, 장비상태 코드 세팅
 * @param {Object} codeList
 */
function getStatusDataCode(codeList) {
    // 운전 모드 상태
    operationModeList = codeList.filter(obj => obj.groupCd === 'OPERATION_MODE');

    //장비 상태
    deviceStatusList = codeList.filter(obj => obj.groupCd === 'DEVICE_STATUS')
}



