package metis.app.pmsWeb.domain.user;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import metis.app.pmsWeb.domain.common.CommonService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController extends BaseController {

    @Inject
    private UserService userService;

    @Inject
    private CommonService commonService;

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(RequestParams<User> requestParams) {
//        List<User> users = userService.get(requestParams);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", userService.get(requestParams));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", userService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }



    @RequestMapping(value="/users/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse getList(RequestParams<User> requestParams) {
        List<User> users = userService.findAll(requestParams);
        return Responses.ListResponse.of(users);
    }


    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = APPLICATION_JSON, params = "userCd")
    public User get(RequestParams requestParams) {
        return userService.getUser(requestParams);
    }

    @RequestMapping(value = "/users", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse save(@Valid @RequestBody List<User> users) throws Exception {
        userService.saveUser(users);
        return ok();
    }

    @RequestMapping(value = "/users/login/{userRole}", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public User login(@PathVariable String userRole, @RequestBody User user) throws Exception {
        User loginUser = userService.login(userRole, user);
        return loginUser;
    }


    /**
     * 중복 로그인 체크
     * @param userCd 사용자 아이디
     * @return
     */
    @RequestMapping(value="/isAlreadyLoginCheck", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public Responses.MapResponse isAlreadyLoginCheck(@RequestBody String userCd) {

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("result", commonService.selectLoginUser(userCd));

        return Responses.MapResponse.of(resultMap);
    }


    @RequestMapping(value="/statusChangeLogout", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public Responses.MapResponse statusChangeLogout(@RequestBody String userCd) {

        Map<String, Object> resultMap = new HashMap<>();

        commonService.statusChangeLogout(userCd);

        resultMap.put("resultCode", "0000");
        resultMap.put("resultMsg", "success");

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 전체 로그아웃
     * @return
     */
    @RequestMapping(value="/api/updateLogoutAll", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public Responses.MapResponse statusChangeLogout() {

        Map<String, Object> resultMap = new HashMap<>();

        commonService.updateLogoutAll();

        resultMap.put("resultCode", "0000");
        resultMap.put("resultMsg", "success");

        return Responses.MapResponse.of(resultMap);
    }
}
