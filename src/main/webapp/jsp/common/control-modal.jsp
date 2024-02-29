<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<%
    RequestUtils requestUtils = RequestUtils.of(request);
    request.setAttribute("controlType", requestUtils.getString("controlType"));
    request.setAttribute("controlTitle", requestUtils.getString("controlTitle"));
    request.setAttribute("controlMessage", requestUtils.getString("controlMessage"));
%>

<ax:set key="page_auto_height" value="true"/>
<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script>
            var pageType = "modal";
            function confirm() {

                var controlValue;
                if ('${controlTitle}' == '배터리'){
                    controlValue = $('#rackNo').val();
                } else controlValue =  $('#controlKw').val();

                if(controlValue != '') {
                    let data = {
                        controlType : '${controlType}',
                        controlValue : controlValue
                    };
                    parent.axboot.modal.callback(data);
                } else parent.axToast.push("전력량을 입력하여 주십시오.");
            }

            if ('${controlTitle}' == '배터리'){        //배터리 제어 화면
                $("#controlKw").hide();
                $("#kw").hide();
                $("#battery").show();
            }else {                                  //pcs 제어 화면
                $("#controlKw").show();
                $("#kw").show();
                $("#battery").hide();
            }

        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" style="margin-top: 10px"data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2>${controlTitle}</h2>
                    </div>
                </div>
                <h3>${controlMessage}</h3>
                <div style="text-align: center;">
                    <input type="text" id="controlKw" name="controlKw" maxlength="5"  style="width: 30%; margin-top: 20px"
                           oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                    <span id="kw">Kw</span>
                    <div id="battery" style="width: 50%; margin: 20px 25%;">
                        <ax:pmsWeb-code tableName="PMS_BASE_BATTERY_RACK a" code="a.RACK_NO" codeNm="RACK_NO" title="RACK_NO"
                                            id="rackNo" dataPath="rackNo" name="rackNo" defaultLabel="선택"
                                            clazz="form-control W150"/>
                    </div>
                </div>
                <div class="common-footer">
                    <button type="button" class="common-footer-button" onclick="parent.axboot.modal.close();">닫기</button>
                    <button type="button" class="common-footer-button color-green" onclick="confirm()">확인</button>
                </div>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>