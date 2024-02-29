package metis.app.pmsWeb.domain.chargeDischargeHistory;

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
 * 충반전 이력 CONTROLLER
 */
@Controller
@RequestMapping(value = "/chargeDischargeHistory")
public class ChargeDischargeHistoryController extends BaseController {

    @Inject
    private ChargeDischargeHistoryService chargeDischargeHistoryService;

    /**
     * 충방전 이력 조회
     * @param pageable
     * @param chargeDischargeHistoryVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse deviceDefectHistoryList(Pageable pageable, ChargeDischargeHistoryVO chargeDischargeHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("startDay", chargeDischargeHistoryVO.getStartDay());                             //시작 일
        params.put("endDay", chargeDischargeHistoryVO.getEndDay());                                 //종료 일
        params.put("operationMode", chargeDischargeHistoryVO.getOperationMode());                   //충방전 구분

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        params.put("operationHistoryType", chargeDischargeHistoryVO.getOperationHistoryType());     //이력 상태
        params.put("operationType", chargeDischargeHistoryVO.getOperationType());                  //운영 구분

        Map<String, Object> resultMap = chargeDischargeHistoryService.selectChargeDischargeHistory(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", chargeDischargeHistoryService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 누적 전력량 상세목록
     * @param chargeDischargeHistoryVO
     * @return
     */
    @RequestMapping(value = "/selectDetailList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectDetailList(ChargeDischargeHistoryVO chargeDischargeHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("energyNo", chargeDischargeHistoryVO.getEnergyNo());                  //이력 번호

        Map<String, Object> resultMap = chargeDischargeHistoryService.selectDetailList(params);

        resultMap.put("totalRowCount", chargeDischargeHistoryService.selectDetailTotalCount());

        return Responses.MapResponse.of(resultMap);
    }
}
