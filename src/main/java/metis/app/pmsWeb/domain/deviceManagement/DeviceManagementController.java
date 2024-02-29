package metis.app.pmsWeb.domain.deviceManagement;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.common.CommonService;
import metis.app.pmsWeb.domain.deviceComponent.DeviceComponentVO;
import metis.app.pmsWeb.domain.essControlCommandManagement.EssControlCommandManagementVO;
import metis.app.pmsWeb.domain.saleCompanyManagement.SaleCompanyManagementVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 장비 기초 정보 CONTROLLER
 */
@Controller
public class DeviceManagementController extends BaseController {

    @Inject
    private DeviceManagementService deviceManagementService;

    @Inject
    private CommonService commonService;

    /**
     * 장비 목록 조회
     * @param pageable
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/deviceManagement/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectDeviceManagementList(Pageable pageable,DeviceManagementVO requestParams) {

        Map<String, Object> params = new HashMap<>();
        params.put("essCode",requestParams.getEssCode());                               //ESS 코드
        params.put("deviceName",requestParams.getDeviceName());                         //장비명
        params.put("deviceCategory",requestParams.getDeviceCategory());                 //장비분류
        params.put("deviceCategorySub",requestParams.getDeviceCategorySub());           //장비하위분류
        params.put("useFlag",requestParams.getUseFlag());                               //사용여부
        params.put("startRow",pageable.getPageNumber()*pageable.getPageSize());
        params.put("pageSize",pageable.getPageSize());

        // 리스트 가져오기
        Map<String, Object> resultMap = deviceManagementService.selectDeviceManagementList(params);
        //페이징
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceManagementService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 장비 목록 등록
     * @param deviceManagementVO
     * @return
     */
    @RequestMapping(value = "/deviceManagement/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insert(@RequestBody DeviceManagementVO deviceManagementVO){

        deviceManagementService.insert(deviceManagementVO);

        return ok();
    }

    /**
     * 장비 목록 수정
     * @param deviceManagementVO
     * @return
     */
    @RequestMapping(value = "/deviceManagement/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody DeviceManagementVO deviceManagementVO){

        deviceManagementVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceManagementService.update(deviceManagementVO);

        return ok();
    }

    /**
     * 장비 목록 삭제
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/deviceManagement/delete", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody DeviceManagementVO requestParams){

        deviceManagementService.delete(requestParams);

        return ok();
    }

    /**
     * 미들웨어 정보
     * @param
     * @param
     * @return
     */
    @RequestMapping(value = "/deviceManagement/mwInfo", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectMwInfo() {

        // 리스트 가져오기
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("mwInfo", commonService.selectMwInfo());

        return Responses.MapResponse.of(resultMap);
    }
}