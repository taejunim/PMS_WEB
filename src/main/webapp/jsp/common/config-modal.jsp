<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<link rel="stylesheet" type="text/css" href="/assets/css/common.css"/>

<%
    RequestUtils requestUtils = RequestUtils.of(request);
    request.setAttribute("configType", requestUtils.getString("configType"));
    request.setAttribute("configTitle", requestUtils.getString("configTitle"));
    request.setAttribute("configNo", requestUtils.getString("configNo"));
    request.setAttribute("essCode", requestUtils.getString("essCode"));
    request.setAttribute("deviceCode", requestUtils.getString("deviceCode"));
    request.setAttribute("configTypeCode", requestUtils.getString("configTypeCode"));
%>

<ax:set key="page_auto_height" value="true"/>
<ax:layout name="modal">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/commonMobile.css'/>"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/common.css'/>"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/mobile/configModal.js' />"></script>
        <script>
            let configType = '${configType}';
            let configNo = '${configNo}';
            let essCode = '${essCode}';
            let deviceCode = '${deviceCode}';
            let deviceGbnCode = '${deviceGbnCode}';
            let configTypeCode = '${configTypeCode}';

            $(function() {
                $(document).on('change', "#pmsCode", function(){
                    var pmsCode = $(this).val();
                    if(pmsCode != undefined && pmsCode != ""){
                        selectDeviceCodes(pmsCode, configType, '');
                    } else {
                        $("#deviceCode").empty();
                        $("#deviceCode").append("<option value=''>선택</option>");
                    }
                });
            });

            if (configType == 'insert') {
                $('#insertButton').show();
                $('#deleteButton').hide();
                $('#updateButton').hide();
            } else if (configType == 'update') {
                $('#insertButton').hide();
                $('#deleteButton').show();
                $('#updateButton').show();

                axboot.ajax({
                    type: "GET",
                    url: ["deviceConfig", "list"],
                    data: {
                        deviceCode : deviceCode
                        , configTypeCode : configTypeCode
                        , configNo : configNo
                        , pageNumber : 0
                        , pageSize : 10
                    },
                    callback: function (res) {

                        let configData = res.mapResponse.map.list[0];

                        selectDeviceCodes(configData.pmsCode, configType, configData.deviceCode);

                        $("#pmsCode").val(configData.pmsCode).prop("selected", true);
                        $("#configTypeCode").val(configData.configTypeCode).prop("selected", true);
                        $("#configName").val(configData.configName).prop("selected", true);
                        $("#minSetValue").val(configData.minSetValue).prop("selected", true);
                        $("#maxSetValue").val(configData.maxSetValue).prop("selected", true);
                        $("#configDescription").val(configData.configDescription).prop("selected", true);

                        $("#pmsCode").attr("disabled", true);
                    },
                    options: {
                        // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                        onError: function (err) {
                            console.log(err);
                        }
                    }
                });
            }

        </script>
    </jsp:attribute>
    <jsp:body>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" style="margin-top: 10px"data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2>${configTitle}</h2>
                    </div>
                    <div class="right">
                        <button id="closeButton" class="closeButton" data-page-btn="closeButton" onclick="parent.axboot.modal.close();"><img src="/assets/images/close.png" height="30" width="30"></button>
                    </div>
                </div>
                <%--<h3>${controlMessage}</h3>--%>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="">
                                <table class="col-md-11 configTable">
                                    <tbody>
                                    <tr style="height: 5px;"></tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.pmsName"/></td>
                                        <td>
                                            <ax:pmsWeb-code tableName="PMS_BASE_MASTER a, PMS_BASE_ESS b" code="a.PMS_CODE" codeNm="PMS_NAME" title="PMS_CODE 코드" defaultLabel="선택"
                                                            id="pmsCode" dataPath="pmsCode" name="pmsCode" equals="{\"USE_YN\":\"Y\",\"DEL_YN\":\"N\"}" equals2="a.PMS_CODE = b.PMS_CODE"
                                                            clazz="form-control W160"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.deviceName"/></td>
                                        <td>
                                            <select title="DEVICE_CODE 코드" id="deviceCode" name="deviceCode" data-ax-path="deviceCode" class="form-control form-control W160" data-ax-validate="null">
                                                <option value="">선택</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.configTypeCode"/></td>
                                        <td>
                                            <ax:common-code id="configTypeCode" groupCd="CONFIG_TYPE_CODE" dataPath="configTypeCode" defaultLabel="선택" clazz="form-control W160"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.configName"/></td>
                                        <td>
                                            <input type="text" id="configName" name="configName" data-ax-path="configName" title="설정 명" class="av-required form-control W160" value=""/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.minSetValue"/></td>
                                        <td>
                                            <input type="text" id="minSetValue" name="minSetValue" class="av-required form-control W160" maxlength="100" data-ax-path="minSetValue" title="최소 설정값"  value="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.maxSetValue"/></td>
                                        <td>
                                            <input type="text" id="maxSetValue" name="maxSetValue" class="av-required form-control W160" maxlength="100" data-ax-path="maxSetValue" title="최대 설정값"  value="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.configDescription"/></td>
                                        <td>
                                            <textarea id="configDescription" name="configDescription" data-ax-path="configDescription" class="av-required form-control W160" style="height: 40px;" ></textarea>
                                        </td>
                                    </tr>
                                    <tr style="height: 10px;"></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ax>
                <div class="common-footer">
                    <button id="deleteButton" type="button" class="common-footer-button color-red" onclick="completeConfig('delete')">삭제</button>
                    <button id="insertButton" type="button" class="insertButton color-green" onclick="completeConfig('insert')">등록</button>
                    <button id="updateButton" type="button" class="common-footer-button color-green" onclick="completeConfig('update')">수정</button>
                </div>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>