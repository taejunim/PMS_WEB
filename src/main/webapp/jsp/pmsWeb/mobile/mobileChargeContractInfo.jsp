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
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

    </jsp:attribute>
    <jsp:attribute name="script">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/pmsWeb/mobile/mobileChargeContractInfo.js' />"></script>
    </jsp:attribute>
    <jsp:body>
        <div class="period">
            <div class="input-group-btn" data-toggle="buttons">
                <label class="btn btn-primary active" style="width: 75px;">
                    <input type="radio" name="period" id="period1" autocomplete="off" value="today" checked>당 일
                </label>
                <label class="btn btn-primary" style="width: 75px;">
                    <input type="radio" name="period" id="period2" autocomplete="off" value="week">최근 7일
                </label>
                <label class="btn btn-primary" style="width: 75px;">
                    <input type="radio" name="period" id="period3" autocomplete="off" value="month">1 개월
                </label>
                <label class="btn btn-primary" style="width: 75px;">
                    <input type="radio" name="period" id="period4" autocomplete="off" value="quarter">3 개월
                </label>
            </div>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-bottom: 45px;" scroll="scroll">
                <ax style="width: 100%;">
                    <div style="width: 100%;" id="dataList">
                    </div>
                    <div data-ax-tbl="" class="ax-form-tbl alignC mt20" style="height: 40px; margin-bottom: 5px; display: none;">
                        <button type="button" class="moreButton" id="moreButton" onclick="moreButton()">더보기</button>
                    </div>
                    <div class="noData" id="noData">No Data</div>
                </ax>

            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:mobileLayout>