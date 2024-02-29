package metis.app.pmsWeb.domain.deviceErrorHistory;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryService;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/deviceErrorHistory")
public class DeviceErrorHistoryController extends BaseController {

    @Inject
    private DeviceErrorHistoryService deviceErrorHistoryService;

    /**
     * 장비 오류 이력 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(Pageable pageable, DeviceErrorHistoryVO deviceErrorHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("startDate", deviceErrorHistoryVO.getStartDate());
        params.put("endDate", deviceErrorHistoryVO.getEndDate());
        params.put("essType", deviceErrorHistoryVO.getEssType());
        params.put("deviceCode", deviceErrorHistoryVO.getDeviceCode());
        params.put("componentNo", deviceErrorHistoryVO.getComponentNo());
        params.put("errorType", deviceErrorHistoryVO.getErrorType());
        params.put("processFlag", deviceErrorHistoryVO.getProcessFlag());

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());
        Map<String, Object> resultMap = deviceErrorHistoryService.selectDeviceErrorHistoryList(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceErrorHistoryService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 장비 처리 완료 여부 수정 (장비별)
     * @param deviceErrorHistoryVO
     * @return
     */
    @RequestMapping(value = "/updateErrorHistory", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse updateErrorHistory(@RequestBody DeviceErrorHistoryVO deviceErrorHistoryVO){

        deviceErrorHistoryService.updateErrorHistory(deviceErrorHistoryVO);

        return ok();
    }

    /**
     * 장비 정보
     * @param deviceErrorHistoryVO
     * @return
     */
    @RequestMapping(value = "/selectDeviceCode", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectDeviceCode(DeviceErrorHistoryVO deviceErrorHistoryVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",deviceErrorHistoryService.selectDeviceCode(deviceErrorHistoryVO));
        return resultMap;
    }

    /**
     * 구성요소 정보
     * @param deviceErrorHistoryVO
     * @return
     */
    @RequestMapping(value = "/selectComponent", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectComponent(DeviceErrorHistoryVO deviceErrorHistoryVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",deviceErrorHistoryService.selectComponent(deviceErrorHistoryVO));
        return resultMap;
    }
}