<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<%
    RequestUtils requestUtils = RequestUtils.of(request);
    request.setAttribute("deviceCode", requestUtils.getString("deviceCode"));
    request.setAttribute("deviceDefectDate", requestUtils.getString("deviceDefectDate"));
    request.setAttribute("essCode", requestUtils.getString("essCode"));
%>

<ax:set key="page_auto_height" value="true"/>
<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript">

            let deviceCode = "${deviceCode}";
            let deviceDefectDate = "${deviceDefectDate}";
            let essCode = "${essCode}";

            function confirm() {
                axboot
                    .call({
                        type: "POST",
                        url: ["deviceDefectHistory", "repairCompleteProcess"],
                        data: JSON.stringify({
                            deviceCode: deviceCode
                            , deviceDefectDate: deviceDefectDate
                            , essCode: essCode
                            , repairContent: $('#repairContent').val()
                        }),
                        callback: function (res) {

                        },
                        options: {}
                    })
                    .done(function () {
                        parent.axboot.modal.callback("updated");
                        parent.axToast.push("완료 처리되었습니다.");
                    });
            }
        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" style="margin-top: 10px"data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><ax:lang id="ax.admin.deviceDefectHistory.repairCompleteProcess"/></h2>
                    </div>
                </div>

                <h3><ax:lang id="ax.admin.deviceDefectHistory.repairCompleteProcess.message"/></h3>

                <textarea id="repairContent" rows="5" cols="80" name="content" style="width: 100%; margin-top: 30px"></textarea>

                <div class="common-footer">
                    <button type="button" class="common-footer-button" onclick="parent.axboot.modal.callback('close');">취소</button>
                    <button type="button" class="common-footer-button color-green" onclick="confirm()">확인</button>
                </div>
            </ax:split-panel>

        </ax:split-layout>

    </jsp:body>
</ax:layout>