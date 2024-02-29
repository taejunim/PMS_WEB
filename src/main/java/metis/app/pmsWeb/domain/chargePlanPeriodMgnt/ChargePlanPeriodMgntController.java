package metis.app.pmsWeb.domain.chargePlanPeriodMgnt;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 충방전 계획 관리 CONTROLLER
 */
@Controller
@RequestMapping(value = "/chargePlanPeriodMgnt")
public class ChargePlanPeriodMgntController extends BaseController {
    @Inject
    private ChargePlanPeriodMgntService chargePlanPeriodMgntService;

    /**
     * 기간별 충방전 계획 목록 조회
     * @param chargePlanPeriodMgntVO
     * @return
     */
    @RequestMapping(value = "/selectChargePlanPeriodMgnt", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(ChargePlanPeriodMgntVO chargePlanPeriodMgntVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("pmsCode", chargePlanPeriodMgntVO.getPmsCode());      //pms 코드
        params.put("month", chargePlanPeriodMgntVO.getMonth());          //날짜선택_월

        Map<String, Object> resultMap = chargePlanPeriodMgntService.selectChargePlanPeriodMgnt(params);

        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", chargePlanPeriodMgntService.selectTotalCountMgnt());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충방전 계획 상세 목록 조회
     * @param chargePlanPeriodMgntVO
     * @return
     */
    @RequestMapping(value = "/selectChargeDischargePlanDetail", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectChargeDischargePlanDetail( ChargePlanPeriodMgntVO chargePlanPeriodMgntVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("planChargeDischargeDate", chargePlanPeriodMgntVO.getPlanChargeDischargeDate());          //일자

        Map<String, Object> resultMap = chargePlanPeriodMgntService.selectChargeDischargePlanDetail(params);

        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", chargePlanPeriodMgntService.selectTotalCountDetail());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     *
     * @param chargePlanPeriodMgntVO
     * @return
     */
    @RequestMapping(value = "/insertChargeDischargePlanDetail", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insertChargeDischargePlanDetail(@RequestBody List<ChargePlanPeriodMgntVO> chargePlanPeriodMgntVO) {

        return chargePlanPeriodMgntService.insertChargeDischargePlanDetail(chargePlanPeriodMgntVO);
    }

}
