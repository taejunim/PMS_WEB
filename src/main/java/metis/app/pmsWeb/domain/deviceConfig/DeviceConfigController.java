package metis.app.pmsWeb.domain.deviceConfig;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
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

/**
 * 환경 설정 CONTROLLER
 */
@Controller
@RequestMapping(value = "/deviceConfig")
public class DeviceConfigController extends BaseController {
    @Inject
    private DeviceConfigService deviceConfigService;

    /**
     * 환경설정 목록 조회
     * @param pageable
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectDeviceConfig(Pageable pageable, DeviceConfigVO deviceConfigVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("deviceCode", deviceConfigVO.getDeviceCode());                           //장비코드
        params.put("configType", deviceConfigVO.getConfigType());                           //설정구분
        params.put("deviceCategory", deviceConfigVO.getDeviceCategory());                   //장비분류코드
        params.put("deviceCategorySub", deviceConfigVO.getDeviceCategorySub());             //장비하위분류코드

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = deviceConfigService.selectDeviceConfig(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceConfigService.totalRowCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 환경설정 정보 등록
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody DeviceConfigVO deviceConfigVO) {
        deviceConfigVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceConfigVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        ApiResponse apiResponse = ok();
        if(deviceConfigService.insert(deviceConfigVO) == 0) apiResponse.setMessage("primaryKeyError");
        return apiResponse;
    }

    /**
     * 환경설정 정보 수정
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody DeviceConfigVO deviceConfigVO) {
        deviceConfigVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceConfigService.update(deviceConfigVO);
        return ok();
    }

    /**
     * 환경설정 정보 삭제
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody DeviceConfigVO deviceConfigVO) {
        ApiResponse apiResponse = ok();
        try {
            deviceConfigService.delete(deviceConfigVO);
        } catch (DataIntegrityViolationException e){
            if(e.getMessage().indexOf("foreign key") > -1)
                apiResponse.setMessage("foreignKeyError");
        }
        return apiResponse;
    }

    /**
     * 장비 코드 가져오기 (Ajax)
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/selectDeviceCodes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectDeviceCodes(DeviceConfigVO deviceConfigVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",deviceConfigService.selectDeviceCodes(deviceConfigVO));
        return resultMap;
    }

    /**
     * 환경설정 정보 RollBack
     * @param deviceConfigVO
     * @return
     */
    @RequestMapping(value = "/rollBackUpdate", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse rollBackUpdate(@RequestBody DeviceConfigVO deviceConfigVO) {
        deviceConfigService.rollBackUpdate(deviceConfigVO);
        return ok();
    }
}
