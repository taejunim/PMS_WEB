package metis.app.pmsWeb.security;

import metis.app.pmsWeb.code.GlobalConstants;
import metis.app.pmsWeb.domain.common.CommonService;
import metis.app.pmsWeb.domain.program.Program;
import metis.app.pmsWeb.domain.program.menu.Menu;
import metis.app.pmsWeb.domain.program.menu.MenuService;
import metis.app.pmsWeb.domain.user.SessionUser;
import metis.app.pmsWeb.domain.user.auth.menu.AuthGroupMenu;
import metis.app.pmsWeb.domain.user.auth.menu.AuthGroupMenuService;
import metis.app.pmsWeb.utils.JWTSessionHandler;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.utils.*;
import com.chequer.axboot.core.vo.ScriptSessionVO;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.util.List;

@Service
public class AXBootTokenAuthenticationService {

    private final JWTSessionHandler jwtSessionHandler;

    @Inject
    private AuthGroupMenuService authGroupMenuService;

    @Inject
    private MenuService menuService;

    @Inject
    private CommonService commonService;

    public AXBootTokenAuthenticationService() {
        jwtSessionHandler = new JWTSessionHandler(DatatypeConverter.parseBase64Binary("YXhib290"));
    }

    /**
     * 30분 마다 세션 만료 시켜 강제 로그아웃 처리됨.
     * 세션 타임아웃 변경 하고 싶을 시 return 숫자를 변경 하면됨.
     * @return 60초 * 30 = 30분 후에 로그인 토큰 만료
     */
    public int tokenExpiry() {
        if (PhaseUtils.isProduction()) {
            return 60 * 30;
        } else {
            //return 60 * 10 * 10 * 10 * 10;    // 기존
            return 60 * 30; // 60초 * 30 = 30분
        }
    }

    public void addAuthentication(HttpServletResponse response, AXBootUserAuthentication authentication) throws IOException {
        final SessionUser user = authentication.getDetails();
        setUserEnvironments(user, response);

        insertLoginUser(user.getUsername());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public void setUserEnvironments(SessionUser user, HttpServletResponse response) throws IOException {
        String token = jwtSessionHandler.createTokenForUser(user);
        CookieUtils.addCookie(response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY, token, tokenExpiry());
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws IOException {
        RequestUtils requestUtils = RequestUtils.of(request);
        final String token = CookieUtils.getCookieValue(request, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        final String progCd = FilenameUtils.getBaseName(request.getServletPath());
        final long menuId = requestUtils.getLong("menuId");
        final String requestUri = request.getRequestURI();
        final String language = requestUtils.getString(GlobalConstants.LANGUAGE_PARAMETER_KEY, "");

        if (StringUtils.isNotEmpty(language)) {
            CookieUtils.addCookie(response, GlobalConstants.LANGUAGE_PARAMETER_KEY, language);
        }

        if (token == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }

        SessionUser user = jwtSessionHandler.parseUserFromToken(token);

        if (user == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }
        if (!requestUri.startsWith(ContextUtil.getBaseApiPath())) {
            if (menuId > 0) {
                Menu menu = menuService.findOne(menuId);
                if (menu != null) {
                    Program program = menu.getProgram();

                    if (program != null) {
                        requestUtils.setAttribute("program", program);
                        requestUtils.setAttribute("pageName", menu.getLocalizedMenuName(request));
                        requestUtils.setAttribute("pageRemark", program.getRemark());
                        if (program.getAuthCheck().equals(AXBootTypes.Used.YES.getLabel())) {
                            AuthGroupMenu authGroupMenu = authGroupMenuService.getCurrentAuthGroupMenu(menuId, user);
                            if (requestUri.contains(".jsp") && authGroupMenu == null) {
                                throw new AccessDeniedException("Access is denied");
                            }
                            requestUtils.setAttribute("authGroupMenu", authGroupMenu);
                        }
                    }
                }
            } else if (menuId == 0){
                requestUtils.setAttribute("pageName", "메인");
            }

            ScriptSessionVO scriptSessionVO = ModelMapperUtils.map(user, ScriptSessionVO.class);
            scriptSessionVO.setDateFormat(scriptSessionVO.getDateFormat().toUpperCase());
            scriptSessionVO.getDetails().put("language", requestUtils.getLocale(request).getLanguage());
            requestUtils.setAttribute("loginUser", user);
            requestUtils.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));

            if (progCd.equals("main")) {
                List<Menu> menuList = menuService.getAuthorizedMenuList(user.getMenuGrpCd(), user.getAuthGroupList());
                requestUtils.setAttribute("menuJson", JsonUtils.toJson(menuList));
            }
        }

        setUserEnvironments(user, response);

        return new AXBootUserAuthentication(user);
    }

    private Authentication deleteCookieAndReturnNullAuthentication(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.deleteCookie(request, response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        ScriptSessionVO scriptSessionVO = ScriptSessionVO.noLoginSession();

        request.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));
        return null;
    }

    /**
     * 같은 계정으로 로그인된 사용자가 있는지 체크
     * 있으면 0보다 큰 숫자, 없으면 0
     * @param userCd 사용자 아이디
     * @return 로그인된 계정 수
     */
    public int selectLoginUser(String userCd) {

        return commonService.selectLoginUser(userCd);
    }

    /**
     * 로그인시 로그인 사용자 정보 테이블에 insert
     * @param userCd 사용자 아이디
     */
    public void insertLoginUser(String userCd) {
        commonService.insertLoginUser(userCd);
    }

    /**
     * 로그아웃시 로그인된 계정 상태 업데이트
     * LOGIN_STATUS [1 : 로그인 중, 2 : 로그아웃]
     * 로그아웃을 하지 않고 브라우저에서 종료시 mysql 스케쥴러에서 1분마다 로그인된(LOGIN_STATUS=1) 계정이 30분간 아무런 작업을 하지 않을 경우 강제로 LOGIN_STATUS=2로 변경.
     * @param userCd 사용자 아이디
     */
    public void updateLoginUser(String userCd) {
        commonService.updateLoginStatus(userCd);
    }
}
