package metis.app.pmsWeb.security;

import metis.app.pmsWeb.domain.user.SessionUser;
import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.code.ApiStatus;
import com.chequer.axboot.core.utils.HttpUtils;
import com.chequer.axboot.core.utils.JsonUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AXBootLoginFilter extends AbstractAuthenticationProcessingFilter {

    private final AXBootTokenAuthenticationService adminTokenAuthenticationService;
    private final AXBootAuthenticationEntryPoint adminAuthenticationEntryPoint;

    private AXBootUserDetailsService userDetailsService;
    public AXBootLoginFilter(String urlMapping, AXBootTokenAuthenticationService adminTokenAuthenticationService, AXBootUserDetailsService userDetailsService, AuthenticationManager authenticationManager, AXBootAuthenticationEntryPoint adminAuthenticationEntryPoint) {
        super(new AntPathRequestMatcher(urlMapping));

        this.adminTokenAuthenticationService = adminTokenAuthenticationService;
        this.userDetailsService = userDetailsService;
        this.adminAuthenticationEntryPoint = adminAuthenticationEntryPoint;
        this.setAuthenticationFailureHandler(new LoginFailureHandler());
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        final SessionUser user = new ObjectMapper().readValue(request.getInputStream(), SessionUser.class);

        // 로그인 하려고 하는 계정으로 이미 로그인 되었는지 체크.
        int cnt = adminTokenAuthenticationService.selectLoginUser(user.getUsername());
        SessionUtils.setSessionUser(userDetailsService.loadUserByUsername(user.getUserCd()));
        UsernamePasswordAuthenticationToken loginToken;

        if(cnt == 0) {

            // 로그인 되어있지 않을 때.
            loginToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());

        } else {

            // 이미 로그인 되었을 때
            // 강제로 로그인 못하도록 막음.
            request.setAttribute("userPs","--sameUserCdAlreadylogin--");

            // 강제로 비밀번호 틀리게 오류 냄.
            loginToken = new UsernamePasswordAuthenticationToken(user.getUsername(), "--sameUserCdAlreadylogin--");
        }

        return getAuthenticationManager().authenticate(loginToken);
    }

    @Override
    @Transactional
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        final AXBootUserAuthentication userAuthentication = new AXBootUserAuthentication((SessionUser) authentication.getPrincipal());
        adminTokenAuthenticationService.addAuthentication(response, userAuthentication);

        response.setContentType(HttpUtils.getJsonContentType(request));
        response.getWriter().write(JsonUtils.toJson(ApiResponse.of(ApiStatus.SUCCESS, "Login Success")));
        response.getWriter().flush();
    }

    private class LoginFailureHandler implements AuthenticationFailureHandler {
        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
            adminAuthenticationEntryPoint.commence(request, response, exception);
        }
    }
}
