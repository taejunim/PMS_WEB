package metis.app.pmsWeb.domain.essControlCommandManagement;

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
@RequestMapping(value = "/essControlCommandManagement")
public class EssControlCommandManagementController extends BaseController {

    PropertyUtil propertyUtil = new PropertyUtil();

    @Inject
    private EssControlCommandManagementService essControlCommandManagementService;

    /**
     * ESS 제어 명령어 목록 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(Pageable pageable, EssControlCommandManagementVO essControlCommandManagementVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("essCode", essControlCommandManagementVO.getEssCode());
        params.put("deviceCode", essControlCommandManagementVO.getDeviceCode());
        params.put("controlType", essControlCommandManagementVO.getControlType());
        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());
        Map<String, Object> resultMap = essControlCommandManagementService.selectEssControlCommandManagementList(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", essControlCommandManagementService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 제어 명령어 정보 등록
     * @param essControlCommandManagementVO
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody EssControlCommandManagementVO essControlCommandManagementVO) {

        essControlCommandManagementVO.setEssCode(essControlCommandManagementVO.getEssCode());
        //createdBy 넣어줌 (로그인된 ID로)
        essControlCommandManagementVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());

        ApiResponse apiResponse = ok();
        try {
            essControlCommandManagementService.insert(essControlCommandManagementVO);
        } catch (DataIntegrityViolationException e){
            if(e.getMessage().contains("Duplicate")) apiResponse.setMessage("primaryKeyError");
        }
        return apiResponse;
    }

    /**
     * ESS 제어 명령어 정보 수정
     * @param essControlCommandManagementVO
     * @return
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody EssControlCommandManagementVO essControlCommandManagementVO) {
        essControlCommandManagementVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        essControlCommandManagementService.update(essControlCommandManagementVO);
        return ok();
    }

    /**
     * PMS별 장비 코드 가져오기 (Ajax)
     * @param
     * @return
     */
    @RequestMapping(value = "/selectDeviceCodes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectBuildPositionSeq() {
        Map<String, Object> resultMap = new HashMap<>();
        EssControlCommandManagementVO essControlCommandManagementVO = new EssControlCommandManagementVO();
        essControlCommandManagementVO.setEssCode(sessionUser.getEssCode());
        resultMap.put("list",essControlCommandManagementService.selectDeviceCodes(essControlCommandManagementVO));
        return resultMap;
    }

    /**
     *  PMS / 장비의 명령어 목록 가져오기 (Ajax)
     * @param essControlCommandManagementVO
     * @return
     */
    @RequestMapping(value = "/selectCommandRequestTypes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectCommandRequestTypes(EssControlCommandManagementVO essControlCommandManagementVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",essControlCommandManagementService.selectCommandRequestTypes(essControlCommandManagementVO));
        return resultMap;
    }

    /**
     * ESS 제어 명령어 정보 RollBack
     * @param essControlCommandManagementVO
     * @return
     */
    @RequestMapping(value = "/rollBackUpdate", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse rollBackUpdate(@RequestBody EssControlCommandManagementVO essControlCommandManagementVO) {
        essControlCommandManagementService.rollBackUpdate(essControlCommandManagementVO);
        return ok();
    }
}