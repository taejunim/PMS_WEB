package metis.app.pmsWeb.domain.acConverterHistory;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.airConditionerHistory.AirConditionerHistoryService;
import metis.app.pmsWeb.domain.airConditionerHistory.AirConditionerHistoryVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/acConverter")
public class AcConverterHistoryController extends BaseController {

    @Inject
    private AcConverterHistoryService acConverterHistoryService;

    /**
     * AC 컨버터 이력 조회
     * @param acConverterHistoryVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(Pageable pageable, AcConverterHistoryVO acConverterHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("operationStatus", acConverterHistoryVO.getOperationStatus());         //운전 상태
        params.put("operationModeStatus", acConverterHistoryVO.getOperationModeStatus()); //운전 모드
        params.put("searchDate", acConverterHistoryVO.getSearchDate());                   //일자선택_시작

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = acConverterHistoryService.select(params);
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }


    /**
     * AC 컨버터 상세정보 조회
     * @return resultMap
     */
    @RequestMapping(value = "/selectConverterDetail", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectConverterDetail(AcConverterHistoryVO acConverterHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("regDate", acConverterHistoryVO.getRegDate());
        params.put("converterCode", acConverterHistoryVO.getConverterCode());

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",acConverterHistoryService.selectConverterDetail(params));
        return resultMap;
    }

}