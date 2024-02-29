<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:mobileLayout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/commonMobile.css'/>"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/common.css'/>"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
    </jsp:attribute>
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/mobile/mobileConfig.js' />"></script>
    </jsp:attribute>
    <jsp:body>
        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="" scroll="scroll">
                <ax style="width: 100%;">
                    <div style="text-align: right;">
                        <button id="addConfig" class="addConfig" data-page-btn="addConfig"><img src="/assets/images/pencil.png" height="30" width="30"></button>
                    </div>
                </ax>
                <ax style="width: 100%;">
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="">
                        <div data-ax-tr="" class="" style="">
                            <div data-ax-td-wrap="">
                                <table class="col-md-11 searchingConditionTable">
                                    <tbody>
                                    <tr style="height: 5px;"></tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.essCommandManagement.deviceNm"/></td>
                                        <td>
                                             <ax:pmsWeb-code tableName="PMS_BASE_DEVICE" code="DEVICE_CODE" codeNm="DEVICE_NAME" title="DEVICE_CODE 코드"
                                                            id="deviceCode" dataPath="deiceCode" equals="{\"ESS_CODE\":\"${loginUser.essCode}\"}" name="deviceCodeFIlter" clazz="form-control W180" defaultLabel="전체"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><ax:lang id="ax.admin.deviceConfig.configCodeName"/></td>
                                        <td>
                                            <ax:common-code groupCd="CONFIG_TYPE_CODE" dataPath="configTypeCode" clazz="form-control W180" id="configTypeCode" defaultLabel="선택"/>
                                        </td>
                                    </tr>
                                    <tr style="height: 5px;"></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ax>
                <div id="configDiv">
                </div>
                <ax style="width: 100%;" id="additionButton">
                    <div class="mt20" style="text-align: center;">
                        <button class="additionButton"  onclick="selectConfigList('add');"><img src="/assets/images/add.png" height="30" width="30"></button>
                    </div>
                </ax>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:mobileLayout>