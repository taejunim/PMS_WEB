<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%@ tag import="com.chequer.axboot.core.utils.ContextUtil" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="name" required="true" %>
<%@ attribute name="title" %>
<%@ attribute name="script" fragment="true" %>
<%@ attribute name="js" fragment="true" %>
<%@ attribute name="css" fragment="true" %>
<%@ attribute name="header" fragment="true" %>
<%@ attribute name="buttons" fragment="true" %>

<c:choose>

    <c:when test="${name eq 'frame'}">
        <%@ include file="layout/mobileFrame.tag" %>
    </c:when>

    <c:otherwise>
        <%@ include file="layout/mobileBase.tag" %>
    </c:otherwise>
</c:choose>