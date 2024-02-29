package metis.app.pmsWeb.domain.deviceErrorHistory;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryMapper;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeviceErrorHistoryService extends BaseService<DeviceErrorHistoryVO, String> {

    @Inject
    private DeviceErrorHistoryMapper deviceErrorHistoryMapper;

    /**
     * 장비 오류 이력 조회
     * @param
     * @return
     */
    public Map<String, Object> selectDeviceErrorHistoryList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", deviceErrorHistoryMapper.selectDeviceErrorHistoryList(map));
        resultMap.put("page", deviceErrorHistoryMapper.selectDeviceErrorHistoryTotalList(map));
        return resultMap;
    }

    /**
     * 장비 처리 완료 여부 수정
     *
     * @param deviceErrorHistoryVO
     */
    public void updateErrorHistory(DeviceErrorHistoryVO deviceErrorHistoryVO) {
        deviceErrorHistoryMapper.updateErrorHistory(deviceErrorHistoryVO);
    }

    /**
     * 장비 정보
     * @param DeviceErrorHistoryVO
     * @return
     */
    public List<DeviceErrorHistoryVO> selectDeviceCode(DeviceErrorHistoryVO DeviceErrorHistoryVO){

        return deviceErrorHistoryMapper.selectDeviceCode(DeviceErrorHistoryVO);
    }

    /**
     * 구성요소 정보
     * @param DeviceErrorHistoryVO
     * @return
     */
    public List<DeviceErrorHistoryVO> selectComponent(DeviceErrorHistoryVO DeviceErrorHistoryVO){

        return deviceErrorHistoryMapper.selectComponent(DeviceErrorHistoryVO);
    }

    /**
     * 장비 오류 이력 개수 가져오기 (장비 오류 이력 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return deviceErrorHistoryMapper.selectTotalCount();
    }
}