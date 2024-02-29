package metis.app.pmsWeb.domain.user.auth;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.Clock;
import java.time.Instant;
import java.util.List;

@Service
public class UserAuthService extends BaseService<UserAuth, UserAuthId> {

    private UserAuthRepository userAuthRepository;

    @Inject
    public UserAuthService(UserAuthRepository userAuthRepository) {
        super(userAuthRepository);
        this.userAuthRepository = userAuthRepository;
    }

    public List<UserAuth> get(RequestParams requestParams) {
        String userCd = requestParams.getString("userCd", "");
        String filter = requestParams.getString("filter", "");
        String authFlag = "Y";

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(userCd)) {
            builder.and(qUserAuth.userCd.eq(userCd)).and(qUserAuth.authFlag.eq(authFlag));
        }

        List<UserAuth> list = select().from(qUserAuth).where(builder).orderBy(qUserAuth.id.asc()).fetch();

        if (isNotEmpty(filter)) {
            list = filter(list, filter);
        }

        return list;
    }

//    public List<UserAuth> findByUserCd(String userCd) {
//        return userAuthRepository.findByUserCd(userCd);
//    }

    public List<UserAuth> findByUserCd(String userCd) {
        RequestParams requestParams = new RequestParams();
        requestParams.put("userCd", userCd);

        List<UserAuth> list = get(requestParams);
        return list;
    }

    /**
     * 권한여부 update
     * @param list
     */
    public void update(List<UserAuth> list) {

        for (int i=0;i<list.size();i++) {

            int cnt = select().from(qUserAuth).where(qUserAuth.userCd.eq(list.get(i).getUserCd())
                                                .and(qUserAuth.grpAuthCd.eq(list.get(i).getGrpAuthCd()))
                                                .and(qUserAuth.authFlag.eq(list.get(i).getAuthFlag()))).fetch().size();

            if (cnt < 1) {
                BooleanBuilder builder = new BooleanBuilder();
                builder.and(qUserAuth.userCd.eq(list.get(i).getUserCd())).and(qUserAuth.grpAuthCd.eq(list.get(i).getGrpAuthCd()));

                update(qUserAuth).set(qUserAuth.authFlag,list.get(i).getAuthFlag())
                        .set(qUserAuth.updatedAt, Instant.now(Clock.systemUTC()))
                        .set(qUserAuth.updatedBy, SessionUtils.getCurrentLoginUserCd()).where(builder).execute();
            }
        }
    }
}