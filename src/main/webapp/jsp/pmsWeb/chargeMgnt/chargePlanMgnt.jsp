<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5calendar.css">
<link rel="stylesheet" href="/assets/js/axboot/dist/ax5picker.css">
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5core.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5calendar.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5formatter.min.js"></script>
<script type="text/javascript" src="/assets/js/axboot/dist/ax5picker.min.js"></script>
<script type="text/javascript" src="/assets/js/view/common/momentJs/moment.min.js"></script>
<script src='/assets/plugins/fullcalendar-6.1.1/dist/index.global.js'></script>
<script src='/assets/plugins/fullcalendar-6.1.1/packages/core/locales-all.global.js'></script>

<link rel="stylesheet" type="text/css" href="/assets/css/calendar.css"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script>
            var essCode = "${loginUser.essCode}";
            var essType = "${loginUser.essType}";
            var userCd = "${loginUser.userCd}";
            var pageType = "page";
        </script>

        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/momentJs/moment.min.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/chargeMgnt/chargePlanMgnt.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/common/monitoringCommon.js' />"></script>
    </jsp:attribute>

    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <ax:split-layout name="ax1" orientation="vertical">
            <!--vertical1 left-->
            <ax:split-panel width="100%" scroll="scroll" childId="split-panel-grid-view-01">
                <div id='calendar'></div>
                <%@ include file="/jsp/pmsWeb/chargeMgnt/charge-plan-insert-modal.jsp"%>
                <%@ include file="/jsp/pmsWeb/chargeMgnt/charge-plan-update-modal.jsp"%>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>