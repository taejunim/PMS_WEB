package metis.app.pmsWeb.security;

import metis.app.pmsWeb.AXBootSecurityConfig;
import metis.app.pmsWeb.code.GlobalConstants;
import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.code.ApiStatus;
import com.chequer.axboot.core.utils.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AXBootAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        CookieUtils.deleteCookie(request, response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        RequestUtils requestUtils = RequestUtils.of(request);

        ApiResponse apiResponse;
        if (authException instanceof BadCredentialsException) {

            if(request.getAttribute("userPs") == null) {
                apiResponse = ApiResponse.error(ApiStatus.SYSTEM_ERROR, "비밀번호가 일치하지 않습니다.");
            } else if(request.getAttribute("userPs").equals("--sameUserCdAlreadylogin--")) {
                apiResponse = ApiResponse.error(ApiStatus.SYSTEM_ERROR, "같은 계정으로 이미 로그인 되어있어 사용할 수 없습니다.\n기존 로그인된 계정을 로그아웃 하여 주시기 바랍니다.");
            } else {
                apiResponse = ApiResponse.error(ApiStatus.SYSTEM_ERROR, "문제가 발생하였습니다. 관리자에게 문의하여 주십시오.");
            }

        } else if (authException instanceof UsernameNotFoundException) {
            apiResponse = ApiResponse.error(ApiStatus.SYSTEM_ERROR, "존재하지 않는 사용자입니다.");
        } else {
            apiResponse = ApiResponse.error(ApiStatus.SYSTEM_ERROR, "세션이 만료되었습니다.");
        }

        if (requestUtils.isAjax()) {
            response.setContentType(HttpUtils.getJsonContentType(request));
            response.getWriter().write(JsonUtils.toJson(apiResponse));
            response.getWriter().flush();
        } else {
            response.sendRedirect(ContextUtil.getPagePath(AXBootSecurityConfig.LOGIN_PAGE));
        }
    }
}

