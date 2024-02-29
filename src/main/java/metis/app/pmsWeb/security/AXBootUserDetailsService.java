package metis.app.pmsWeb.security;

import metis.app.pmsWeb.domain.common.CommonService;
import metis.app.pmsWeb.domain.user.SessionUser;
import metis.app.pmsWeb.domain.user.User;
import metis.app.pmsWeb.domain.user.UserService;
import metis.app.pmsWeb.domain.user.auth.UserAuth;
import metis.app.pmsWeb.domain.user.auth.UserAuthService;
import metis.app.pmsWeb.domain.user.role.UserRole;
import metis.app.pmsWeb.domain.user.role.UserRoleService;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.utils.DateTimeUtils;
import metis.app.pmsWeb.utils.PropertyUtil;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.*;

@Service
public class AXBootUserDetailsService implements UserDetailsService {

    @Inject
    private UserService userService;

    @Inject
    private UserRoleService userRoleService;

    @Inject
    private UserAuthService userAuthService;

    @Inject
    private CommonService commonService;


    @Override
    public final SessionUser loadUserByUsername(String userCd) throws UsernameNotFoundException {
        User user = userService.findOne(userCd);

        if (user == null) {
            throw new UsernameNotFoundException("사용자 정보를 확인하세요.");
        }

        if (user.getUseYn() == AXBootTypes.Used.NO) {
            throw new UsernameNotFoundException("존재하지 않는 사용자 입니다.");
        }

        if (user.getDelYn() == AXBootTypes.Deleted.YES) {
            throw new UsernameNotFoundException("존재하지 않는 사용자 입니다.");
        }

        List<UserRole> userRoleList = userRoleService.findByUserCd(userCd);

        List<UserAuth> userAuthList = userAuthService.findByUserCd(userCd);

        Map<String, Object> essInfo = commonService.selectEssInfo();

        SessionUser sessionUser = new SessionUser();
        sessionUser.setUserCd(user.getUserCd());
        sessionUser.setUserNm(user.getUserNm());
        sessionUser.setUserPs(user.getUserPs());
        sessionUser.setMenuGrpCd(user.getMenuGrpCd());

        userRoleList.forEach(r -> sessionUser.addAuthority(r.getRoleCd()));
        userAuthList.forEach(a -> sessionUser.addAuthGroup(a.getGrpAuthCd()));

        String[] localeString = user.getLocale().split("_");

        Locale locale = new Locale(localeString[0], localeString[1]);

        final Calendar cal = Calendar.getInstance();
        final TimeZone timeZone = cal.getTimeZone();

        sessionUser.setTimeZone(timeZone.getID());
        sessionUser.setDateFormat(DateTimeUtils.dateFormatFromLocale(locale));
        sessionUser.setTimeFormat(DateTimeUtils.timeFormatFromLocale(locale));
        sessionUser.setLocale(locale);

        if(essInfo != null) {
            sessionUser.setEssCode(essInfo.get("essCode").toString());
            sessionUser.setEssType(essInfo.get("essType").toString());
            sessionUser.setEssName(essInfo.get("essName").toString());
            if(essInfo.get("latitude") != null)
                sessionUser.setLatitude(essInfo.get("latitude").toString());
            if(essInfo.get("longitude") != null)
                sessionUser.setLongitude(essInfo.get("longitude").toString());

            sessionUser.setAutoControlFlag(essInfo.get("autoControlFlag").toString());
        }
        return sessionUser;
    }
}
