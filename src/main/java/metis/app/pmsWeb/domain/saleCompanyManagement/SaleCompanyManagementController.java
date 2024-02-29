package metis.app.pmsWeb.domain.saleCompanyManagement;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import metis.app.pmsWeb.domain.InterfaceWeather.InterfaceWeatherVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 판매처 관리 CONTROLLER
 */
@Controller
public class SaleCompanyManagementController extends BaseController {

    @Inject
    private SaleCompanyManagementService saleCompanyManagementService;

    /**
     * 판매처 목록 조회
     * @param pageable
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/saleCompanyManagement/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse saleCompanyManagementList(Pageable pageable, SaleCompanyManagementVO requestParams) {

        Map<String, Object> params = new HashMap<>();
        params.put("saleCompanyName",requestParams.getSaleCompanyName());
        params.put("startRow",pageable.getPageNumber()*pageable.getPageSize());
        params.put("pageSize",pageable.getPageSize());
        // 리스트 가져오기
        Map<String, Object> resultMap = saleCompanyManagementService.selectSaleCompanyManagementList(params);
        //페이징
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", saleCompanyManagementService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 판매처 목록 저장
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/saleCompanyManagement/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insert(@RequestBody SaleCompanyManagementVO requestParams){

        saleCompanyManagementService.insert(requestParams);

        return ok();
    }

    /**
     * 판매처 목록 수정
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/saleCompanyManagement/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody SaleCompanyManagementVO requestParams){

        saleCompanyManagementService.update(requestParams);

        return ok();
    }

    /**
     * 판매처 목록 삭제
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/saleCompanyManagement/delete", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody SaleCompanyManagementVO requestParams){

        saleCompanyManagementService.delete(requestParams);

        return ok();
    }
}