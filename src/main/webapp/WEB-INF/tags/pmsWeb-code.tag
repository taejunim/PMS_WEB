<%@ tag import="metis.app.pmsWeb.utils.PmsWebCodeUtils" %>
<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import=" java.util.HashMap" %>
<%@ tag import="java.util.List" %>
<%@ tag import="com.nhncorp.lucy.security.xss.XssFilter" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>


<%@ attribute name="tableName" required="true" %>
<%@ attribute name="code" required="true" %>
<%@ attribute name="codeNm" required="true" %>
<%@ attribute name="equals" required="false" %>
<%@ attribute name="orderBy" required="false" %>
<%@ attribute name="groupBy" required="false" %>

<%@ attribute name="equals2" required="false" %>
<%@ attribute name="name" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="defaultValue" required="false" %>
<%@ attribute name="defaultLabel" required="false" %>
<%@ attribute name="clazz" %>
<%@ attribute name="dataAxValidate" required="false" %>
<%@ attribute name="title" required="false" %>

<%@ attribute name="firstText" required="false" %>
<%@ attribute name="lastText" required="false" %>
<%
    if (StringUtils.isEmpty(type)) {
        type = "select";
    }

    StringBuilder builder = new StringBuilder();

    List<HashMap<String, Object>> commonCodes = PmsWebCodeUtils.get(tableName, code, codeNm, equals, orderBy, groupBy, equals2);

    switch (type) {
        case "select":
            builder.append(String.format("<select title=\"%s\" id=\"%s\" name=\"%s\" data-ax-path=\"%s\" class=\"form-control %s\" data-ax-validate=\"%s\">", title, id, name, dataPath, clazz, dataAxValidate));

            if (StringUtils.isNotEmpty(defaultLabel)) {
                builder.append(String.format("<option value=\"\">%s</option>", defaultLabel));
            }

            for (HashMap commonCode : commonCodes) {

                XssFilter xssFilter = XssFilter.getInstance("lucy-xss-default-sax.xml");
                String codeValue = xssFilter.doFilter(commonCode.get("code").toString());
                String codeNmValue = xssFilter.doFilter(commonCode.get("codeNm").toString());

                String firstTextValue = StringUtils.isNotEmpty(firstText) ? firstText : "";
                String lastTextValue  = StringUtils.isNotEmpty(lastText)  ? lastText : "";

                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.get("code").toString())) {
                    builder.append(String.format("<option value=\"%s\" selected>%s</option>", codeValue, codeNmValue));
                } else {
                    builder.append(String.format("<option value=\"%s\">%s%s%s</option>", codeValue, firstTextValue, codeNmValue, lastTextValue));
                }
            }
            builder.append("</select>");
            break;

        case "checkbox":
            for (HashMap commonCode : commonCodes) {

                XssFilter xssFilter = XssFilter.getInstance("lucy-xss-default-sax.xml");
                String codeValue = xssFilter.doFilter(commonCode.get("code").toString());
                String codeNmValue = xssFilter.doFilter(commonCode.get("codeNm").toString());

                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.get("code").toString())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input title=\"%s\" type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" data-ax-validate=\"%s\" checked> %s </label>", title, name, dataPath, codeValue, codeNmValue, dataAxValidate));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input title=\"%s\" type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" data-ax-validate=\"%s\"> %s </label>", title, name, dataPath, codeValue, codeNmValue, dataAxValidate));
                }
            }
            break;

        case "radio":

            if (StringUtils.isNotEmpty(defaultLabel)) {
                builder.append(String.format("<input title=\"%s\" type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"\" data-ax-validate=\"%s\"> %s ", title, name, dataPath, defaultLabel, dataAxValidate));
            }

            for (HashMap commonCode : commonCodes) {

                XssFilter xssFilter = XssFilter.getInstance("lucy-xss-default-sax.xml");
                String codeValue = xssFilter.doFilter(commonCode.get("code").toString());
                String codeNmValue = xssFilter.doFilter(commonCode.get("codeNm").toString());

                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.get("code").toString())) {
                    builder.append(String.format("<input title=\"%s\" type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" data-ax-validate=\"%s\" checked> %s ", title, name, dataPath, codeValue, codeNmValue, dataAxValidate));
                } else {
                    builder.append(String.format("<input title=\"%s\" type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" data-ax-validate=\"%s\"> %s ", title, name, dataPath, codeValue, codeNmValue, dataAxValidate));
                }
            }
            break;
    }
%>

<%=builder.toString()%>