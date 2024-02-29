<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="name" required="false" %>
<%@ attribute name="clazz" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="defaultValue" required="false" %>
<%@ attribute name="emptyValue" required="false" %>
<%@ attribute name="emptyText" required="false" %>

<%@ attribute name="defaultLabel" required="false" %>

<%@ attribute name="dataAxValidate" required="false" %>
<%@ attribute name="title" required="false" %>

<%

    StringBuilder builder = new StringBuilder();

    builder.append("<select class=\"form-control "+ clazz +" \"");


    if (StringUtils.isNotEmpty(id)) {
        builder.append("id=\"" + id + "\"");
    }

    if (StringUtils.isNotEmpty(name)) {
        builder.append("name=\"" + name + "\"");
    }

    if (StringUtils.isNotEmpty(dataPath)) {
        builder.append("data-ax-path=\"" + dataPath + "\"");
    }

    /*추가부분 */
    if (StringUtils.isNotEmpty(title)) {
        builder.append("title=\"" + title + "\"");
    }

    if (StringUtils.isNotEmpty(dataAxValidate)) {
        builder.append("data-ax-validate=\"" + dataAxValidate + "\"");
    }
    /* 여기까지*/

    builder.append(">");

    /*추가부분*/
    builder.append(String.format("<option value=\"\">선택</option>"));

    builder.append("</select>");
%>

<%=builder.toString()%>