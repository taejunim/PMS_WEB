package metis.app.pmsWeb.domain.airConditionerHistory;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
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
@RequestMapping(value = "/airConditioner")
public class AirConditionerHistoryController extends BaseController {

    @Inject
    private AirConditionerHistoryService airConditionerHistoryService;

    /**
     * 센서 상태 이력 조회
     * @param airConditionerHistoryVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(Pageable pageable, AirConditionerHistoryVO airConditionerHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("deviceCategorySub", airConditionerHistoryVO.getDeviceCategorySub());      //센서구분
        params.put("deviceCode", airConditionerHistoryVO.getAirConditionerCode());            //센서
        params.put("searchDate", airConditionerHistoryVO.getSearchDate());                    //일자선택_시작

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = airConditionerHistoryService.select(params);
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * PMS별 장비 코드 가져오기 (Ajax)
     * @return resultMap
     */
    @RequestMapping(value = "/selectDeviceCodes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectDeviceCodes() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",airConditionerHistoryService.selectDeviceCodes());
        return resultMap;
    }

}