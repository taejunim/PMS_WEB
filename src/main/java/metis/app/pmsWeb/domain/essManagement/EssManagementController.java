package metis.app.pmsWeb.domain.essManagement;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.PropertyUtil;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

import static metis.app.pmsWeb.utils.SessionUtils.sessionUser;

@Controller
@RequestMapping(value = "/essManagement")
public class EssManagementController extends BaseController {

    @Inject
    private EssManagementService essManagementService;

    /**
     * ESS 목록 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(Pageable pageable, EssManagementVO essManagementVO) {

        Map<String, Object> params = new HashMap<>();

        params.put("essType", essManagementVO.getEssType());
        params.put("essCode", essManagementVO.getEssCode());
        Map<String, Object> resultMap = essManagementService.selectEssManagement(params);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 정보 등록
     * @param essManagementVO
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody EssManagementVO essManagementVO) {
        essManagementVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
        essManagementVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        essManagementService.insert(essManagementVO);

        //essCode 세션담기
        sessionUser.setEssCode(essManagementVO.getEssCode());

        return ok();
    }

    /**
     * ESS 정보 수정
     * @param essManagementVO
     * @return
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody EssManagementVO essManagementVO) {
        essManagementVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        essManagementService.update(essManagementVO);
        return ok();
    }
}

