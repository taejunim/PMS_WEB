package metis.app.pmsWeb.domain.pcsStatusHistory;

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
 * pcs 5분간 상태 서머리
 */
@Controller
@RequestMapping(value = "/pcsStatusHistory")

public class PcsStatusHistoryController extends BaseController {
    @Inject
    private PcsStatusHistoryService pcsStatusHistoryService;

    /**
     * pcs 5분간 상태 서머리 조회
     * @param pageable
     * @param pcsStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/pcsHistoryList", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectPcsHistory(Pageable pageable, PcsStatusHistoryVO pcsStatusHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("searchDate", pcsStatusHistoryVO.getSearchDate());               //일자선택
        params.put("operationStatus", pcsStatusHistoryVO.getOperationStatus());          //운전 상태
        params.put("operationModeStatus", pcsStatusHistoryVO.getOperationModeStatus());      //운전 모드

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = pcsStatusHistoryService.selectPcsStatusHistory(params);

        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", pcsStatusHistoryService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * pcs 5분간 상태 서머리 조회
     * @param pageable
     * @param cpcmStatusHistoryVO
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectCpcmHistory(Pageable pageable, CpcmStatusHistoryVO cpcmStatusHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("startDate", cpcmStatusHistoryVO.getStartDate());         //기간선택_시작
        params.put("endDate", cpcmStatusHistoryVO.getEndDate());             //기간선택_종료

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = pcsStatusHistoryService.selectCpcmStatusHistory(params);

        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }
}
