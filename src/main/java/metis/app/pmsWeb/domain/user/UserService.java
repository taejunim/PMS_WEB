package metis.app.pmsWeb.domain.user;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.user.auth.UserAuth;
import metis.app.pmsWeb.domain.user.auth.UserAuthService;
import metis.app.pmsWeb.domain.user.role.UserRole;
import metis.app.pmsWeb.domain.user.role.UserRoleService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.Map;


@Service
public class UserService extends BaseService<User, String> {

    private UserRepository userRepository;

    @Inject
    private UserAuthService userAuthService;

    @Inject
    private UserRoleService userRoleService;

    @Inject
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Inject
    private UserMapper userMapper;

    @Inject
    public UserService(UserRepository userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveUser(List<User> users) throws Exception {
        if (isNotEmpty(users)) {
            for (User user : users) {

                String password = bCryptPasswordEncoder.encode(user.getUserPs());
                User originalUser = userRepository.findOne(user.getUserCd());

                if (originalUser != null) {
                    if (isNotEmpty(user.getUserPs())) {
                        user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
                        user.setUserPs(password);
                    } else {
                        user.setUserPs(originalUser.getUserPs());
                    }
                } else {
                    user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
                    user.setUserPs(password);
                }

                save(user);

                for (UserAuth userAuth : user.getAuthList()) {
                    userAuth.setUserCd(user.getUserCd());
                }

                for (UserRole userRole : user.getRoleList()) {
                    userRole.setUserCd(user.getUserCd());
                }

                if (originalUser != null) {
                    userAuthService.update(user.getAuthList());
                    userRoleService.update(user.getRoleList());
                } else {
                    userAuthService.save(user.getAuthList());
                    userRoleService.save(user.getRoleList());
                }

            }
        }
    }

    public User getUser(RequestParams requestParams) {
        User user = get(requestParams).stream().findAny().orElse(null);

        if (user != null) {
            user.setAuthList(userAuthService.get(requestParams));
            user.setRoleList(userRoleService.get(requestParams));
        }

        return user;
    }


    public List<User> get(RequestParams requestParams) {
        String userCd = requestParams.getString("userCd");
        String filter = requestParams.getString("filter");

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(userCd)) {
            builder.and(qUser.userCd.eq(userCd));
        }

        List<User> list = select().from(qUser).where(builder).orderBy(qUser.userNm.asc()).fetch();

        if (isNotEmpty(filter)) {
            list = filter(list, filter);
        }


        List<Map<String, Object>> resultMap = userMapper.getUsers();

        for(int i = 0; i < list.size(); i++) {

            for(int j = 0; j < resultMap.size(); j++) {
                if(list.get(i).getUserCd().equals(resultMap.get(j).get("userCd"))) {
                    list.get(i).setLoginStatus(resultMap.get(j).get("loginStatus").toString());
                }
            }
        }

        return list;
    }

    public List<User> findAll(RequestParams requestParams) {

        String userCd = requestParams.getString("userCd");
        String filter = requestParams.getString("filter");

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(userCd)) {
            builder.and(qUser.userCd.eq(userCd));
        }

        List<User> list = this.userMapper.findAll();

        if (isNotEmpty(filter)) {
            list = filter(list, filter);
        }

        return list;
    }

    public User login(String userRole, User user) {

        String password = bCryptPasswordEncoder.encode(user.getUserPs());
        User originalUser = userRepository.findOne(user.getUserCd());

        if(originalUser != null) {
            if(isNotEmpty(user.getUserPs())) {
                if(bCryptPasswordEncoder.matches(user.getUserPs(), originalUser.getUserPs())) {

                    List<UserRole> userRoleList = userRoleService.findByUserCd(user.getUserCd());

                    boolean isExistUserRole = false;

                    for (UserRole userRole1 : userRoleList)
                        if (userRole1.getRoleCd().equals(userRole)) {
                            isExistUserRole = true;

                            user.setUserRoles(userRoleList);
                            break;
                        }
                    if(isExistUserRole) {

                        user.setLoginMessage("success");
                        user.setLoginCode("0000");
                    } else {
                        user.setLoginMessage("로그인 할 수 있는 권한이 없습니다.");
                        user.setLoginCode("9999");
                    }

                } else {
                    user.setLoginMessage("비밀번호가 일치하지 않습니다.");
                    user.setLoginCode("9999");
                }
            } else {
                user.setLoginMessage("비밀번호를 입력하여 주십시오.");
                user.setLoginCode("9999");
            }
        } else {

            if(user.getUserCd().equals("")) {
                user.setLoginMessage("아이디를 입력하여 주십시오.");
                user.setLoginCode("9999");
            } else if(user.getUserPs().equals("")) {
                user.setLoginMessage("비밀번호를 입력하여 주십시오.");
                user.setLoginCode("9999");
            } else {
                user.setLoginMessage("아이디 또는 패스워드가 일치하지 않습니다.");
                user.setLoginCode("9999");
            }
        }


        return user;
    }

    /**
     * user 개수 가져오기 (user 테이블 전체 Row 개수)
     * @return
     */
    public long selectTotalCount(){

        BooleanBuilder builder = new BooleanBuilder();

        long count = select().from(qUser).where(builder).orderBy(qUser.userNm.asc()).fetchCount();

        return count;
    }
}
