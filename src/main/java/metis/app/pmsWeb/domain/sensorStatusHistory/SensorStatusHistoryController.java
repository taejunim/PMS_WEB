package metis.app.pmsWeb.domain.sensorStatusHistory;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.commandControlHistory.CommandControlHistoryVO;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;
/**
 * 센서 상태 이력 CONTROLLER
 */
@Controller
@RequestMapping(value = "/sensorStatusHistory")
public class SensorStatusHistoryController extends BaseController {

    @Inject
    private SensorStatusHistoryService sensorStatusHistoryService;

    /**
     * 센서 상태 이력 조회
     * @param sensorStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(Pageable pageable, SensorStatusHistoryVO sensorStatusHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("deviceCategorySub", sensorStatusHistoryVO.getDeviceCategorySub());      //센서구분
        params.put("deviceCode", sensorStatusHistoryVO.getDeviceCode());                    //센서
        params.put("searchDate", sensorStatusHistoryVO.getSearchDate());                    //일자선택_시작

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = sensorStatusHistoryService.select(params);
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", sensorStatusHistoryService.totalRowCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * PMS별 장비 코드 가져오기 (Ajax)
     * @param sensorStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/selectDeviceCodes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectDeviceCodes(SensorStatusHistoryVO sensorStatusHistoryVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",sensorStatusHistoryService.selectDeviceCodes(sensorStatusHistoryVO));
        return resultMap;
    }
}
