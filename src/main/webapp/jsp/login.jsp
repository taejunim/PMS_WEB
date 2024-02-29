<%@ page import="metis.app.pmsWeb.domain.init.DatabaseInitService" %>
<%@ page import="com.chequer.axboot.core.context.AppContextManager" %>
<%@ page import="metis.app.pmsWeb.utils.SessionUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%
    boolean initialized = AppContextManager.getBean(DatabaseInitService.class).initialized();

    String lastNavigatedPage = null;

    if (SessionUtils.isLoggedIn()) {

        // 모바일로 로그인 할경우(android, iphone)
        if(SessionUtils.isMobile(SessionUtils.request)) {
            lastNavigatedPage = "/jsp/mobileMain.jsp";
        } else {
            // pc로 로그인 할 경우(window, mac)
            lastNavigatedPage = "/jsp/main.jsp";
//            lastNavigatedPage = "/jsp/mobileMain.jsp";

        }
    }

    if (initialized) {
        request.setAttribute("redirect", lastNavigatedPage);
    } else {
        request.setAttribute("redirect", "/setup");
    }%>

<c:if test="${redirect!=null}">
    <c:redirect url="${redirect}"/>
</c:if>

<ax:set key="axbody_class" value="login"/>

<ax:layout name="empty">
    <jsp:attribute name="css">
        <style>
            .ax-body.login {
                background: url(${config.background.login}) center center;
                background-size: cover;
                color: #ccc;
            }

        </style>
    </jsp:attribute>
    <jsp:attribute name="js">
        <script>
            axboot.requireSession('${config.sessionCookie}');
        </script>
    </jsp:attribute>

    <jsp:attribute name="script">
        <script type="text/javascript">
          var count = 0;

            var fnObj = {
                pageStart: function () {

                },
                login: function () {
                    axboot.ajax({
                        method: "POST",
                        url: "/api/login",
                        data: JSON.stringify({
                            "userCd": $("#userCd").val(),
                            "userPs": $("#userPs").val()
                        }),
                        callback: function (res) {
                            if (res && res.error) {
                                if (res.error.message == "Unauthorized") {
                                    alert("로그인에 실패 하였습니다. 계정정보를 확인하세요");
                                }
                                else {
                                    alert(res.error.message);
                                }
                                return;
                            }
                            else {
                                location.reload();
                            }
                        },
                        options: {
                            nomask: false, apiType: "login"
                        }
                    });
                    return false;
                }
            };


        /**
         * 로그인된 계정 전체 로그아웃
         */
        function logoutAll() {
            count ++;

            if (count > 2) {

              axDialog.confirm({
                title: "로그아웃",
                msg: "전체 로그아웃 하시겠습니까?"
              }, function () {

                if (this.key === "ok") {
                  axboot.ajax({
                    method: "POST",
                    url: "/api/updateLogoutAll",
                    data: {},
                    callback: function (res) {
                      location.reload();
                    },
                    options: {
                      // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                      onError: function (err) {
                        console.log(err);
                      }, nomask: true
                    }
                  });
                } else {
                  count = 0;
                }
              });
            }
        }
        </script>

    </jsp:attribute>


    <jsp:body>

        <ax:flex-layout valign="middle" align="center" style="width:100%;height:100%;">
            <div onclick="logoutAll();">
                <img src="${pageContext.request.contextPath}${config.logo.login}" class="img-logo"/>
            </div>

            <div class="panel">
                <div class="panel-heading"><ax:lang id="ax.admin.login.guide.message"/></div>
                <div class="panel-body">
                    <form name="login-form" class="" method="post" action="/api/login" onsubmit="return fnObj.login();" autocomplete="off">


                        <div class="form-group">
                            <label for="userCd"><i class="cqc-new-message"></i> <ax:lang id="ax.admin.id"/></label>
                            <ax:input id="userCd" value="" clazz="ime-false" />
                        </div>

                        <div class="form-group">
                            <label for="userPs"><i class="cqc-key"></i> <ax:lang id="ax.admin.password"/></label>
                            <ax:input type="password" id="userPs" value="" clazz="ime-false" />
                        </div>

                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

                        <div class="ax-padding-box" style="text-align: right;">
                            <button type="submit" class="btn">&nbsp;&nbsp;<ax:lang id="ax.admin.login"/>&nbsp;&nbsp;</button>
                        </div>

                    </form>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <a href="#"><ax:lang id="ax.admin.find.id"/></a>
                        &nbsp;
                        &nbsp;
                        <a href="#"><ax:lang id="ax.admin.find.password"/></a>
                    </li>
                </ul>
            </div>

            <div class="txt-copyrights">
                ${config.copyrights}
            </div>

            </div>
        </ax:flex-layout>
    </jsp:body>

</ax:layout>