<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/dashboard.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="100%" style="padding-right: 10px;">
                <!-- 목록 -->
                <style>
                    .grid-cell-red {
                        background: #f8d2cb;
                    }

                    .grid-cell-blue {
                        background: #dcf0f8;
                    }
                </style>
                <c:if test='${loginUser.menuGrpCd eq "USER"}'>
                    <script>location.href = "/jsp/pmsWeb/stock/stockHistoryTotal.jsp";</script>
                </c:if>
                <c:if test='${loginUser.menuGrpCd ne "USER"}'>
                    <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                        <div class="left">
                        </div>
                        <div class="right">
                        </div>
                    </div>
                    <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01"
                         style="height: 300px;">
                    </div>
                </c:if>

            </ax:split-panel>
        </ax:split-layout>


    </jsp:body>
</ax:layout>