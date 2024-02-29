package metis.app.pmsWeb.domain.deviceDefectHistory;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.SessionUtils;
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

@Controller
@RequestMapping(value = "/deviceDefectHistory")
public class DeviceDefectHistoryController extends BaseController {

    @Inject
    private DeviceDefectHistoryService deviceDefectHistoryService;

    /**
     * 장비 고장 이력 목록 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse deviceDefectHistoryList(Pageable pageable, DeviceDefectHistoryVO deviceDefectHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("pmsCode", deviceDefectHistoryVO.getPmsCode());
        params.put("deviceGbnCode", deviceDefectHistoryVO.getDeviceGbnCode());
        params.put("startDate", deviceDefectHistoryVO.getStartDate());
        params.put("endDate", deviceDefectHistoryVO.getEndDate());
        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());
        Map<String, Object> resultMap = deviceDefectHistoryService.selectDeviceDefectHistoryList(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", deviceDefectHistoryService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 장비 고장 이력 정보 등록
     * @param deviceDefectHistoryVO
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody DeviceDefectHistoryVO deviceDefectHistoryVO) {
        //createdBy 넣어줌 (로그인된 ID로)
        deviceDefectHistoryVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceDefectHistoryService.insert(deviceDefectHistoryVO);
        return ok();
    }

    /**
     * 장비 고장 이력 정보 수정
     * @param deviceDefectHistoryVO
     * @return
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody DeviceDefectHistoryVO deviceDefectHistoryVO) {
        //updatedBy 넣어줌 (로그인된 ID로)
        deviceDefectHistoryVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceDefectHistoryService.update(deviceDefectHistoryVO);
        return ok();
    }

    /**
     * 수리 완료 처리 진행
     * @return
     */
    @RequestMapping(value = "/repairCompleteProcess", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse repairCompleteProcess(@RequestBody DeviceDefectHistoryVO deviceDefectHistoryVO) {
        //updatedBy 넣어줌 (로그인된 ID로)
        deviceDefectHistoryVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceDefectHistoryService.repairCompleteProcess(deviceDefectHistoryVO);
        return ok();
    }

    /**
     * PMS 코드로 장비 목록 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/getDeviceInfo", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ResponseBody
    public Responses.ListResponse getDeviceInfo(String pmsCode) {
        List<DeviceDefectHistoryVO> list = deviceDefectHistoryService.getDeviceInfo(pmsCode);
        return Responses.ListResponse.of(list);
    }
}