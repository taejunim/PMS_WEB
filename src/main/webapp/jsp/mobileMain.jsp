<%--
  Created by IntelliJ IDEA.
  User: Hong
  Date: 2021-12-07
  Time: 오후 2:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<ax:set key="axbody_class" value="frame-set"/>

<ax:mobileLayout name="frame">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
		<script type="text/javascript" src="<c:url value='/assets/js/view/mobile/mobileFrame.js' />"></script>
	</jsp:attribute>
    <jsp:body>
        <div id="content-frame-container" class="ax-frame-contents" style="padding-top: 100px;"></div>
    </jsp:body>
</ax:mobileLayout>
