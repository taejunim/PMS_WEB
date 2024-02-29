package metis.app.pmsWeb.domain.main;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.domain.chargeDischargeHistory.ChargeDischargeHistoryVO;
import metis.app.pmsWeb.domain.deviceConfig.DeviceConfigVO;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryVO;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import metis.app.pmsWeb.domain.essManagement.EssManagementVO;
import metis.app.pmsWeb.domain.user.SessionUser;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.PropertyUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

import static metis.app.pmsWeb.utils.SessionUtils.sessionUser;

@Controller
@RequestMapping(value = "/monitoring")
public class MainController extends BaseController {

    @Inject
    private MainService mainService;

    /**
     * ESS 자동 제어 여부 가져오기
     * @return
     */
    @RequestMapping(value = "/selectAutoControlFlag",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectAutoControlFlag(String essCode) {

        Map<String, Object> resultMap = mainService.selectAutoControlFlag(essCode);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 제어명령어, 코드 목록 가져오기
     * @return
     */
    @RequestMapping(value = "/selectControlList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectControlList(EssManagementVO essManagementVO) {

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("controlList", mainService.selectControlList(essManagementVO));
        resultMap.put("codeList", mainService.selectCodeList());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 제어 설정
     * @param mainVO
     * @return
     */
    @RequestMapping(value = "/rollBackUpdate", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse rollBackUpdate(MainVO mainVO) throws Exception {

        mainService.rollBackUpdate(mainVO);

        return ok();
    }

    /**
     * ESS 운영 일정 목록 조회
     * @return
     */
    @RequestMapping(value = "/selectOperationSchedule",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectOperationSchedule() {

        Map<String, Object> resultMap = mainService.selectOperationSchedule();

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * webSocket 경로 properties에서 가져오기
     * @param
     * @return
     */
    @RequestMapping(value = "/getWebSocketHost", method = {RequestMethod.GET}, produces = APPLICATION_JSON)
    public Responses.MapResponse getWebSocketHost() {

        Map<String, Object> resultMap = new HashMap<>();

        PropertyUtil propertyUtil = new PropertyUtil();

        resultMap.put("webSocketHost", propertyUtil.getProperty("axboot.webSocket.host"));

        return Responses.MapResponse.of(resultMap);
    }


    /**
     * 장비 오류 이력 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/selectErrorList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectErrorList(DeviceErrorHistoryVO deviceErrorHistoryVO) {

        Map<String, Object> params = new HashMap<>();

        params.put("essType", deviceErrorHistoryVO.getEssType());
        params.put("processFlag", deviceErrorHistoryVO.getProcessFlag());

        Map<String, Object> resultMap = mainService.selectDeviceErrorHistoryList(params);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 운영 통계
     * @param
     * @return
     */
    @RequestMapping(value = "/selectOperatingStats",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectOperatingStats(String essCode) {

        Map<String, Object> resultMap = mainService.selectOperatingStats(essCode);

        return Responses.MapResponse.of(resultMap);
    }
}