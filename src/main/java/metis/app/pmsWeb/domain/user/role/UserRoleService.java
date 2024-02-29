package metis.app.pmsWeb.domain.user.role;

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
public class UserRoleService extends BaseService<UserRole, Long> {
    private UserRoleRepository userRoleRepository;

    @Inject
    public UserRoleService(UserRoleRepository userRoleRepository) {
        super(userRoleRepository);
        this.userRoleRepository = userRoleRepository;
    }

//    public List<UserRole> findByUserCd(String userCd) {
//        return userRoleRepository.findByUserCd(userCd);
//    }

    public List<UserRole> get(RequestParams requestParams) {
        String userCd = requestParams.getString("userCd", "");
        String filter = requestParams.getString("filter", "");
        String roleFlag = "Y";

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(userCd)) {
            builder.and(qUserRole.userCd.eq(userCd)).and(qUserRole.roleFlag.eq(roleFlag));
        }

        List<UserRole> list = select().from(qUserRole).where(builder).orderBy(qUserRole.id.asc()).fetch();

        if (isNotEmpty(filter)) {
            list = filter(list, filter);
        }

        return list;
    }

    public List<UserRole> findByUserCd(String userCd) {
        RequestParams requestParams = new RequestParams();
        requestParams.put("userCd", userCd);

        List<UserRole> list = get(requestParams);
        return list;
    }

    /**
     * 역활권한 update
     * @param list
     */
    public void update(List<UserRole> list) {

        for (int i=0;i<list.size();i++) {

            int cnt = select().from(qUserRole).where(qUserRole.userCd.eq(list.get(i).getUserCd())
                                                .and(qUserRole.roleCd.eq(list.get(i).getRoleCd()))
                                                .and(qUserRole.roleFlag.eq(list.get(i).getRoleFlag()))).fetch().size();

            if (cnt < 1) {
                BooleanBuilder builder = new BooleanBuilder();
                builder.and(qUserRole.userCd.eq(list.get(i).getUserCd())).and(qUserRole.roleCd.eq(list.get(i).getRoleCd()));

                update(qUserRole).set(qUserRole.roleFlag,list.get(i).getRoleFlag())
                        .set(qUserRole.updatedAt, Instant.now(Clock.systemUTC()))
                        .set(qUserRole.updatedBy, SessionUtils.getCurrentLoginUserCd()).where(builder).execute();
            }
        }
    }
}
