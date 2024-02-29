<%--
  Created by IntelliJ IDEA.
  User: Hong
  Date: 2021-12-07
  Time: 오후 2:38
  To change this template use File | Settings | File Templates.
--%>
<%@ tag import="metis.app.pmsWeb.utils.CommonCodeUtils" %>
<%@ tag import="com.chequer.axboot.core.utils.ContextUtil" %>
<%@ tag import="com.chequer.axboot.core.utils.PhaseUtils" %>
<%@ tag import="metis.app.pmsWeb.utils.SessionUtils" %>
<%@ tag import="com.google.gson.JsonObject" %>
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

        let isPositionFixYn = <%=SessionUtils.isEssFix()%>;
        let userCd = "<%=SessionUtils.getCurrentLoginUserCd()%>";

        console.log("고정형 이동형 여부 : " + (isPositionFixYn === true ? "고정형" : "이동형"));

        var CONTEXT_PATH = "<%=ContextUtil.getContext()%>";
        var COMMON_CODE = (function (json) {
            return json;
        })(<%=commonCodeJson%>);
        var SCRIPT_SESSION = (function (json) {
            return json;
        })(${scriptSession});

        var TOKEN_VALUE = (function (json) {
            return json;
        })(${tokenValue});

        function logoutbtnClick() {

            axboot.ajax({
                type: "POST",
                url: ["/statusChangeLogout"],
                data: userCd,
                callback: function (res) {


                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                    }, nomask: true
                }
            });

            location.href = '${pageContext.request.contextPath}/api/logout';
        }

    </script>

    <script type="text/javascript" src="<c:url value='/assets/js/plugins.min.js' />"></script>
    <script type="text/javascript" src="<c:url value='/assets/js/axboot/dist/axboot.js' />"></script>
    <script type="text/javascript" src="<c:url value='/axboot.config.js' />"></script>
    <jsp:invoke fragment="css"/>
    <jsp:invoke fragment="js"/>
</head>
<body class="ax-body ${axbody_class}" onselectstart="return false;">
<div id="ax-frame-root" style="min-width: 300px;" data-root-container="true">
    <jsp:doBody/>

    <div class="ax-frame-header-tool">
        <div class="ax-split-col" style="height: 100%;">
            <div class="ax-split-panel text-align-left" style="background: #E0E0E0;">
                <img src="/assets/images/ESS.png" style="padding-left: 10px"  width="45px;"/>
                <a href="${pageContext.request.contextPath}/jsp/mobileMain.jsp" style="font-size: large; padding-left: 10px; vertical-align:middle; font-weight: 700;">이동형 ESS</a>
            </div>
            <div class="ax-split-panel text-align-right" style="background: #E0E0E0;">

                <div class="ax-split-col ax-frame-user-info">

                    <a href="#ax" class="ax-frame-logout" onclick="logoutbtnClick();" style="margin-top: 8px;" >
                        <i class="cqc-log-out"></i>
                        <ax:lang id="ax.admin.logout"/>
                    </a>
                </div>

            </div>
        </div>
    </div>

    <div class="ax-frame-header">
        <div class="ax-split-col" style="height: 100%;">
            <div id="ax-top-menu" class="ax-split-panel ax-split-flex"></div>
        </div>
    </div>
<%--
    <div class="ax-frame-header-tab">
        <div id="ax-frame-header-tab-container"></div>
    </div>--%>


</div>
<jsp:invoke fragment="script"/>
</body>
</html>
