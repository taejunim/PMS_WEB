<%@ tag import="com.chequer.axboot.core.utils.ContextUtil" %>
<%@ tag import="metis.app.pmsWeb.utils.SessionUtils" %>
<%@ tag import="metis.app.pmsWeb.utils.CommonCodeUtils" %>
<%@ tag import="com.google.gson.JsonObject" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%
    JsonObject commonCodeJson = CommonCodeUtils.getCommonCodeMap();
    JsonObject deviceJson = CommonCodeUtils.getDeviceMap();
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport"
          content="width=1024, user-scalable=yes, initial-scale=1, maximum-scale=1, minimum-scale=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>${pageName}</title>

    <link rel="shortcut icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>
    <link rel="icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>

    <c:forEach var="css" items="${config.extendedCss}">
        <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/></c:forEach>
    <!--[if lt IE 10]><c:forEach var="css" items="${config.extendedCssforIE9}">
    <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/></c:forEach>
    <![endif]-->

    <script type="text/javascript">
        var CONTEXT_PATH = "<%=ContextUtil.getContext()%>";
        var SCRIPT_SESSION = (function(json){return json;})(${scriptSession});
        var TOKEN_VALUE = (function(json){return json;})(${tokenValue});

        let essId = "<%=SessionUtils.sessionUser.getEssCode()%>";
        let targetId = essId.replace("E", "M/W");

        //상태 코드 - 웹소켓으로 받아온 데이터 변환용
        var json = '<%=commonCodeJson%>';
        json = json.replaceAll("\\[", "[").replaceAll("\\]", "]").replaceAll("\\(", "(").replaceAll("\\)", ")").replaceAll("\r","").replaceAll("\n","");

        var commonCodeMap = new Map(Object.entries(JSON.parse(json)));

        //장비 코드
        var deviceJson = '<%=deviceJson%>';
        deviceJson = deviceJson.replaceAll("\\[", "[").replaceAll("\\]", "]").replaceAll("\\(", "(").replaceAll("\\)", ")").replaceAll("\r","").replaceAll("\n","");

        var deviceMap = new Map(Object.entries(JSON.parse(deviceJson)));
    </script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script type="text/javascript" src="<c:url value='/assets/js/plugins.min.js' />"></script>
    <script type="text/javascript" src="<c:url value='/assets/js/axboot/dist/axboot.js' />"></script>
    <script type="text/javascript" src="<c:url value='/axboot.config.js' />"></script>
    <jsp:invoke fragment="css"/>
    <jsp:invoke fragment="js"/>
</head>
<body class="ax-body ${axbody_class}" data-page-auto-height="${page_auto_height}">
<div id="ax-base-root" data-root-container="true"
    <c:if test="${pageName eq '메인'}">
        style="padding:0;"
    </c:if>
    >
    <c:if test="${pageName ne '메인'}">
    <div class="ax-base-title" role="page-title">
        <jsp:invoke var="headerContent" fragment="header"/>
        <c:if test="${empty headerContent}">
            <h1 class="title"><i class="cqc-browser"></i> ${pageName}</h1>
            <p class="desc">${pageRemark}</p>
        </c:if>
        <c:if test="${!empty headerContent}">
            ${headerContent}
        </c:if>
    </div>
    </c:if>
    <div class="ax-base-content">
        <jsp:doBody/>
    </div>
</div>
<jsp:invoke fragment="script"/>
</body>
</html>