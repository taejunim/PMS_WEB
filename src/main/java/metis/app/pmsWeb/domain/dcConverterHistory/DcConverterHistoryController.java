package metis.app.pmsWeb.domain.dcConverterHistory;

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
@RequestMapping(value = "/dcConverter")
public class DcConverterHistoryController extends BaseController {

    @Inject
    private DcConverterHistoryService dcConverterHistoryService;

    /**
     * DC 컨버터 이력 조회
     * @param dcConverterHistoryVO
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse select(Pageable pageable, DcConverterHistoryVO dcConverterHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("operationStatus", dcConverterHistoryVO.getOperationStatus());         //운전 상태
        params.put("searchDate", dcConverterHistoryVO.getSearchDate());                   //일자선택_시작

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = dcConverterHistoryService.select(params);
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }


    /**
     * DC 컨버터 상세정보 조회
     * @return resultMap
     */
    @RequestMapping(value = "/selectConverterDetail", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Map<String, Object> selectConverterDetail(DcConverterHistoryVO dcConverterHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("regDate", dcConverterHistoryVO.getRegDate());
        params.put("converterCode", dcConverterHistoryVO.getConverterCode());

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",dcConverterHistoryService.selectConverterDetail(params));
        return resultMap;
    }

}