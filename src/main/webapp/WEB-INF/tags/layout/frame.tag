<%@ tag import="metis.app.pmsWeb.utils.CommonCodeUtils" %>
<%@ tag import="com.chequer.axboot.core.utils.ContextUtil" %>
<%@ tag import="com.chequer.axboot.core.utils.PhaseUtils" %>
<%@ tag import="metis.app.pmsWeb.utils.SessionUtils" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%
    String commonCodeJson = CommonCodeUtils.getAllByJson();
    boolean isDevelopmentMode = PhaseUtils.isDevelopmentMode();
    request.setAttribute("isDevelopmentMode", isDevelopmentMode);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>${config.title}</title>
    <link rel="shortcut icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>
    <link rel="icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>

    <c:forEach var="css" items="${config.extendedCss}">
        <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/>
    </c:forEach>
    <!--[if lt IE 10]>
    <c:forEach var="css" items="${config.extendedCssforIE9}">
        <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/>
    </c:forEach>
    <![endif]-->

    <script type="text/javascript">

        let isPositionFixYn = "<%=SessionUtils.isEssFix()%>";
        let userCd = "<%=SessionUtils.getCurrentLoginUserCd()%>";

        console.log("고정형 이동형 여부 : " + (isPositionFixYn === "true" ? "고정형" : "이동형"));

        var CONTEXT_PATH = "<%=ContextUtil.getContext()%>";
        var TOP_MENU_DATA = (function (json) {
            return json;
        })(${menuJson});
        var COMMON_CODE = (function (json) {
            return json;
        })(<%=commonCodeJson%>);
        var SCRIPT_SESSION = (function (json) {
            return json;
        })(${scriptSession});

        var TOKEN_VALUE = (function (json) {
            return json;
        })(${tokenValue});


        document.addEventListener("DOMContentLoaded", function() {


            // 시간을 딜레이 없이 나타내기위한 선 실행
            realTimer();
            getCurrentWeather();

            // 이후 1초에 한번씩 시간을 갱신한다.
            setInterval(realTimer, 1000);

            // 31분에 한번씩 날씨를 조회
           setInterval(getCurrentWeather, 1000 * 60 * 31);
        });

        function realTimer() {

            const nowDate = new Date();

            const year = nowDate.getFullYear();

            const month= nowDate.getMonth() + 1;

            const date = nowDate.getDate();

            const hour = nowDate.getHours();

            const min = nowDate.getMinutes();

            const sec = nowDate.getSeconds();

            document.getElementById("timer").innerHTML =

                year + "-" + addzero(month) + "-" + addzero(date) + "&nbsp;" + addzero(hour) + ":" + addzero(min) + ":" + addzero(sec);

        }

        function addzero(num) {

            if(num < 10) { num = "0" + num; }

            return num;

        }


        /**
         * 현재 날씨 조회
         */
        function getCurrentWeather() {

            axboot.ajax({
                type: "GET",
                url: ["interfaceWeather", "getCurrentWeather"],
                callback: function (res) {
                    var temp = res.map.weather.main.temp;
                    if (res.map.weather.main) {
                        temp = (parseFloat(temp) >= 273 ? parseInt(parseFloat(temp)-273.15) : parseInt(parseFloat(temp)));
                    } else {
                        temp = "-";
                    }
                    var humidity = res.map.weather.main ? res.map.weather.main.humidity: "-";
                    document.getElementById("temperature").innerHTML = "온도&nbsp;&nbsp;&nbsp;&nbsp;" + temp + " ℃";
                    document.getElementById("humidity").innerHTML = "습도&nbsp;&nbsp;&nbsp;&nbsp;" + humidity + " %";
                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                        document.getElementById("temperature").innerHTML = "온도&nbsp;&nbsp;&nbsp;-";
                        document.getElementById("humidity").innerHTML = "습도&nbsp;&nbsp;&nbsp;-";
                    }, nomask: true
                }
            });
        }


        function logoutbtnClick() {

            axboot.ajax({
                type: "POST",
                url: ["/statusChangeLogout"],
                data: userCd,
                callback: function (res) {
                    location.href = '${pageContext.request.contextPath}/api/logout';
                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                    }, nomask: true
                }
            });
        }

    </script>

    <script type="text/javascript" src="<c:url value='/assets/js/plugins.min.js' />"></script>
    <script type="text/javascript" src="<c:url value='/assets/js/axboot/dist/axboot.js' />"></script>
    <script type="text/javascript" src="<c:url value='/axboot.config.js' />"></script>
    <jsp:invoke fragment="css"/>
    <jsp:invoke fragment="js"/>
</head>
<body class="ax-body ${axbody_class}" onselectstart="return false;">
<div id="ax-frame-root" class="<c:if test="${config.layout.leftSideMenu eq 'visible'}">show-aside</c:if>" data-root-container="true">
    <jsp:doBody/>

    <div class="ax-frame-header-tool">
        <div class="ax-split-col" style="height: 100%;">
            <div class="ax-split-panel text-align-left">

            </div>
            <div class="ax-split-panel text-align-right">

                <div class="ax-split-col ax-frame-user-info">
                    <!-- 온도 -->
                    <div class="ax-split-panel" id="temperature">
                        온도
                    </div>
                    <div class="panel-split"></div>

                    <!-- 습도 -->
                    <div class="ax-split-panel" id="humidity">
                        습도
                    </div>
                    <div class="panel-split"></div>
                    <div class="ax-split-panel" id="timer">
                        2021-09-24 10:23:55
                    </div>
                    <%--<div class="panel-split"></div>
                    <div class="ax-split-panel">
                        <a href="/?language=en">English</a> / <a href="/?language=ko">한국어</a>
                    </div>--%>
                    <div class="panel-split"></div>
<%--                    <c:if test="${isDevelopmentMode}">--%>
<%--                        <!-- 개발자 툴 연결 아이콘 -->--%>
<%--                        <div class="ax-split-panel">--%>
<%--                            <a href="#ax" onclick="window.open('/jsp/system/system-dev-tools.jsp');"><i class="cqc-tools"></i> <ax:lang id="ax.devtools"/></a>--%>
<%--                        </div>--%>
<%--                        <div class="panel-split"></div>--%>
<%--                    </c:if>--%>
                    <div class="ax-split-panel">
                        <span><ax:lang id="ax.admin.login.status.message" args="${loginUser.userNm}"/></span>
                    </div>
                    <div class="panel-split"></div>
                    <div class="ax-split-panel">

                        <a href="#ax" class="ax-frame-logout" onclick="logoutbtnClick();">
                            <i class="cqc-log-out"></i>
                            <ax:lang id="ax.admin.logout"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="ax-frame-header">
        <div class="ax-split-col" style="height: 100%;">
            <c:if test="${config.layout.leftSideMenu eq 'visible'}">
                <div class="ax-split-panel cell-aside-handle" id="ax-aside-handel">
                    <i class="cqc-menu"></i>
                </div>
            </c:if>
            <c:if test="${config.layout.leftSideMenu ne 'visible'}">
                <div class="ax-split-panel">&nbsp;</div>
            </c:if>
            <div class="ax-split-panel cell-logo">
                <a href="${pageContext.request.contextPath}/jsp/main.jsp">
                    <img src="${pageContext.request.contextPath}${config.logo.header}" width="100%"/>
                </a>
            </div>
            <div id="ax-top-menu" class="ax-split-panel ax-split-flex"></div>
            <div class="ax-split-panel cell-aside-handle" id="ax-fullscreen-handel">
                <i class="cqc-expand icon-closed"></i>
                <i class="cqc-collapse icon-opened"></i>
            </div>
        </div>
    </div>

    <div class="ax-frame-header-tab">
        <div id="ax-frame-header-tab-container"></div>
    </div>

    <c:if test="${config.layout.leftSideMenu eq 'visible'}">
        <div class="ax-frame-aside" id="ax-frame-aside"></div>
        <script type="text/html" data-tmpl="ax-frame-aside">
            <div class="ax-frame-aside-menu-holder">
                <div style="height: 10px;"></div>
                {{#items}}
                <a class="aside-menu-item aside-menu-item-label{{#hasChildren}} {{#open}}opend{{/open}}{{/hasChildren}}" data-label-index="{{@i}}">{{{name}}}</a>
                {{#hasChildren}}
                <div class="aside-menu-item aside-menu-item-tree-body {{#open}}opend{{/open}}" data-tree-body-index="{{@i}}">
                    <div class="tree-holder ztree" id="aside-menu-{{@i}}" data-tree-holder-index="{{@i}}"></div>
                </div>
                {{/hasChildren}}
                {{/items}}
            </div>
        </script>
    </c:if>

    <div class="ax-frame-foot">
        <div class="ax-split-col" style="height: 100%;">
            <div class="ax-split-panel text-align-left"> ${config.copyrights} </div>
            <div class="ax-split-panel text-align-right">
                Last account activity <b id="account-activity-timer">00</b> ago.
            </div>
        </div>
    </div>

</div>
<jsp:invoke fragment="script"/>
</body>
</html>