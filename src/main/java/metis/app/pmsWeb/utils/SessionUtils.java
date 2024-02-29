package metis.app.pmsWeb.utils;

import metis.app.pmsWeb.domain.user.MDCLoginUser;
import metis.app.pmsWeb.domain.user.SessionUser;
import com.chequer.axboot.core.utils.AgentUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;

public class SessionUtils {

    public static HttpServletRequest request;
    public static SessionUser sessionUser;

    private static final Logger logger = LoggerFactory.getLogger(PmsWebCodeUtils.class);

    public static UserDetails getCurrentUserDetail() {
        try {
            return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
        } catch (RuntimeException e) {
            logger.debug("debug");
            System.out.println(e.getLocalizedMessage());
            // ignore
        }
        return null;
    }

    public static SessionUser getCurrentUser() {
        UserDetails userDetails = getCurrentUserDetail();

        if (userDetails != null) {
            if (userDetails instanceof SessionUser) {
                return (SessionUser) userDetails;
            }
        }

        return null;
    }

    public static void setSessionUser(SessionUser sessionUserInfo) {
        sessionUser = sessionUserInfo;
    }

    public static SessionUser getSessionUser() {
        return sessionUser;
    }

    public static void setHttpServletRequest(HttpServletRequest httpServletRequest) {

        request = httpServletRequest;
    }


    public static MDCLoginUser getCurrentMdcLoginUser(HttpServletRequest request) {
        UserDetails userDetails = getCurrentUserDetail();

        
        if (userDetails != null) {
            SessionUser sessionUser = (SessionUser) userDetails;
            sessionUser.setUserPs(null);
            MDCLoginUser mdcLoginUser = new MDCLoginUser();
            mdcLoginUser.setSessionUser(sessionUser);
            mdcLoginUser.setUserAgent(AgentUtils.getUserAgent(request));
            mdcLoginUser.setBrowserType(AgentUtils.getBrowserType(request));
            mdcLoginUser.setRenderingEngine(AgentUtils.getRenderingEngine(request));
            mdcLoginUser.setDeviceType(AgentUtils.getDeviceType(request));
            mdcLoginUser.setManufacturer(AgentUtils.getManufacturer(request));

            return mdcLoginUser;
        }

        return null;
    }

    /**
     * 모바일 여부
     * @param request   HttpServletRequest
     * @return 모바일 여부 리턴
     */
    public static boolean isMobile(HttpServletRequest request) {

        return request.getHeader("user-agent").contains("Android") || request.getHeader("user-agent").contains("iPhone");
    }

    public static boolean isLoggedIn() {
        return getCurrentUser() != null;
    }

    /**
     * 고정형 ESS 여부
     * @return
     */
    public static String isEssFix() {
        String isEssFix = "";

        // 이동형 고정형 여부 세팅
        if (getSessionUser().getEssType() == null)         isEssFix = "null";
        else if(getSessionUser().getEssType().equals("01")) isEssFix = "true";
        else if(getSessionUser().getEssType().equals("02")) isEssFix = "false";
        else                                                     isEssFix = "else";

        return isEssFix;
    }

    public static String getCurrentLoginUserCd() {
        UserDetails userDetails = getCurrentUserDetail();
        return userDetails == null ? "system" : userDetails.getUsername();
    }
}
