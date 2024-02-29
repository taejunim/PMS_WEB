package metis.app.pmsWeb.domain.deviceComponent;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementService;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 장비 기초 정보 CONTROLLER
 */
@Controller
@RequestMapping(value = "/deviceComponent")
public class DeviceComponentController extends BaseController {

    @Inject
    private DeviceComponentService deviceComponentService;

    /**
     * 장비 구성요소 목록 조회
     * @param pageable
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectDeviceComponentList(Pageable pageable, DeviceComponentVO requestParams) {

        Map<String, Object> params = new HashMap<>();
        params.put("deviceCode",requestParams.getDeviceCode());                           //장비 코드
        params.put("startRow",pageable.getPageNumber()*pageable.getPageSize());
        params.put("pageSize",pageable.getPageSize());

        // 리스트 가져오기
        Map<String, Object> resultMap = deviceComponentService.selectDeviceComponentList(params);
        //페이징
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceComponentService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 장비 구성요소 목록 등록
     * @param list
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insert(@RequestBody Map<String, Object> list){

        deviceComponentService.insert(list);

        return ok();
    }

    /**
     * 장비 구성요소 목록 수정
     * @param list
     * @return
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody Map<String, Object> list){

        deviceComponentService.update(list);

        return ok();
    }

    /**
     * 장비 구성요소 목록 삭제
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/delete", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody DeviceComponentVO requestParams){

        deviceComponentService.delete(requestParams);

        return ok();
    }

}