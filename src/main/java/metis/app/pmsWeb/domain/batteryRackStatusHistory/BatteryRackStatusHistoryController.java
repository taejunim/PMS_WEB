package metis.app.pmsWeb.domain.batteryRackStatusHistory;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * 배터리 RACK 상태 이력 CONTROLLER
 */
@Controller
@RequestMapping(value = "/batteryRackStatusHistory")
public class BatteryRackStatusHistoryController extends BaseController {
    @Inject
    private BatteryRackStatusHistoryService batteryRackStatusHistoryService;

    /**
     * 배터리 RACK 상태 이력 조회
     * @param pageable
     * @param batteryRackStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(Pageable pageable, BatteryRackStatusHistoryVO batteryRackStatusHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("rackNo", batteryRackStatusHistoryVO.getRackNo());                     //rack 번호(장비 명)
        params.put("searchDate", batteryRackStatusHistoryVO.getSearchDate());             //검색 일
        params.put("operationStatus", batteryRackStatusHistoryVO.getOperationStatus());   //운영 상태
        params.put("operationModeStatus", batteryRackStatusHistoryVO.getOperationModeStatus()); //운영 상태

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = batteryRackStatusHistoryService.select(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", batteryRackStatusHistoryService.selectTotalCountRack());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 배터리 MODULE 상태 이력 조회
     * @param batteryRackStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/moduleList", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectMoldule(BatteryRackStatusHistoryVO batteryRackStatusHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("rackNo", batteryRackStatusHistoryVO.getRackNo());               //rack 번호(장비 명)
        params.put("regDate", batteryRackStatusHistoryVO.getRegDate());             //등록 일시

        Map<String, Object> resultMap = batteryRackStatusHistoryService.selectModule(params);
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", batteryRackStatusHistoryService.selectTotalCountModule(params));

        return Responses.MapResponse.of(resultMap);
    }
}
