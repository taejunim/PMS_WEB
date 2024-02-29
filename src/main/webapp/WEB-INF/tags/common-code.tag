<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="java.util.List" %>
<%@ tag import="metis.app.pmsWeb.utils.CommonCodeUtils" %>
<%@ tag import="metis.app.pmsWeb.domain.code.CommonCode" %>
<%@ tag import="com.nhncorp.lucy.security.xss.XssFilter" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="groupCd" required="true" %>
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
    if (StringUtils.isEmpty(type)) {
        type = "select";
    }

    StringBuilder builder = new StringBuilder();

    List<CommonCode> commonCodes = CommonCodeUtils.get(groupCd);

    switch (type) {
        case "select":
            builder.append("<select class=\"form-control "+ clazz +" \"");

            if (StringUtils.isEmpty(emptyValue)) {
                emptyValue = "";
            }

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
            if( StringUtils.isNotEmpty(defaultLabel)){
                builder.append(String.format("<option value=\"\">%s</option>", defaultLabel));
            }


            if (StringUtils.isEmpty(defaultValue) && StringUtils.isNotEmpty(emptyText)) {
                builder.append(String.format("<option value=\"%s\">%s</option>", emptyValue, emptyText));
            }

            for (CommonCode commonCode : commonCodes) {

                XssFilter xssFilter = XssFilter.getInstance("lucy-xss-default-sax.xml");
                String codeValue = xssFilter.doFilter(commonCode.getCode());
                String codeNmValue = xssFilter.doFilter(commonCode.getName());
                String data1 = xssFilter.doFilter(commonCode.getData1());
                String data2 = xssFilter.doFilter(commonCode.getData2());

                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getCode())) {
                    builder.append(String.format("<option value=\"%s\" data-data1=\"%s\" data-data2=\"%s\" selected>%s</option>", codeValue, data1, data2, codeNmValue));
                } else {
                    builder.append(String.format("<option value=\"%s\" data-data1=\"%s\" data-data2=\"%s\">%s</option>", codeValue, data1, data2, codeNmValue));
                }
            }
            builder.append("</select>");
            break;

        case "checkbox":
            for (CommonCode commonCode : commonCodes) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getCode())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, commonCode.getCode(), commonCode.getName()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, commonCode.getCode(), commonCode.getName()));
                }
            }
            break;

        case "radio":
            /*추가부분*/
            if( StringUtils.isNotEmpty(defaultLabel)){
                builder.append(String.format("<input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"\" title=\"%s\" data-ax-validate=\"%s\" > %s ", name, dataPath, defaultLabel, title, dataAxValidate));
            }
            for (CommonCode commonCode : commonCodes) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getCode())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, commonCode.getCode(), commonCode.getName()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, commonCode.getCode(), commonCode.getName()));
                }
            }
            break;
    }
%>

<%=builder.toString()%>