package metis.app.pmsWeb.domain.deviceErrorCode;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * 장비 오류 코드 CONTROLLER
 */
@Controller
public class DeviceErrorCodeController extends BaseController {

    @Inject
    private DeviceErrorCodeService deviceErrorCodeService;

    /**
     * 장비 오류 코드 목록 조회
     * @param pageable
     * @param deviceErrorCodeVO
     * @return
     */
    @RequestMapping(value = "/deviceErrorCode/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectDeviceErrorCodeList(Pageable pageable, DeviceErrorCodeVO deviceErrorCodeVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("data1",deviceErrorCodeVO.getData1());                                               //고정형,이동형 구분코드
        params.put("deviceCategory",deviceErrorCodeVO.getDeviceCategory());                             //장비 분류
        params.put("deviceCategorySub",deviceErrorCodeVO.getDeviceCategorySub());                       //장비 하위 분류
        params.put("errorType",deviceErrorCodeVO.getErrorType());                                       //오류 구분

        // 리스트 가져오기
        Map<String, Object> resultMap = deviceErrorCodeService.selectDeviceErrorCodeList(params);

        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceErrorCodeService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 장비 오류 코드 등록
     * @param deviceErrorCodeVO
     * @return
     */
    @RequestMapping(value = "/deviceErrorCode/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insert(@RequestBody DeviceErrorCodeVO deviceErrorCodeVO){

        deviceErrorCodeService.insert(deviceErrorCodeVO);

        return ok();
    }

    /**
     * 장비 오류 코드 수정
     * @param deviceErrorCodeVO
     * @return
     */
    @RequestMapping(value = "/deviceErrorCode/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody DeviceErrorCodeVO deviceErrorCodeVO){

        deviceErrorCodeService.update(deviceErrorCodeVO);

        return ok();
    }
}