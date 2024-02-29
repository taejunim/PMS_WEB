package metis.app.pmsWeb.domain.code;

import metis.app.pmsWeb.utils.CommonCodeUtils;
import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommonCodeController extends BaseController {

    @Inject
    private CommonCodeService basicCodeService;

    @RequestMapping(value = "/commonCodes", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "groupCd", value = "분류 코드", dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "useYn", value = "사용여부 (Y/N)", dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse list(RequestParams<CommonCode> requestParams) {
        List<CommonCode> basicCodes = basicCodeService.get(requestParams);
        return Responses.ListResponse.of(basicCodes);
    }

    @RequestMapping(value = "/commonCodes/save", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@Valid @NotNull @RequestBody List<CommonCode> basicCodes) {
        basicCodeService.saveCommonCode(basicCodes);
        return ok();
    }

    @RequestMapping(value = "/commonCodes/getAllByMap", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Map<String, List<CommonCode>> getAllByMap() {
        return CommonCodeUtils.getAllByMap();
    }

    /** 유저타입 가져오기
     * 기업, 사용자(관리자 X)
     */
    @RequestMapping(value = "/commonCodes/getUserType", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse getTokenUserCodeList(){

        return Responses.ListResponse.of(basicCodeService.getTokenUserCodeList());
    }

    /**
     * commonCode map
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/commonCodes/mapList", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse mapList(RequestParams<CommonCode> requestParams) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", basicCodeService.get(requestParams));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", basicCodeService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }
}
