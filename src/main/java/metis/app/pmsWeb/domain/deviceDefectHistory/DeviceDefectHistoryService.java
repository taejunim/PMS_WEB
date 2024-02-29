package metis.app.pmsWeb.domain.deviceDefectHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeviceDefectHistoryService extends BaseService<DeviceDefectHistoryVO, String> {

    @Inject
    private DeviceDefectHistoryMapper deviceDefectHistoryMapper;

    /**
     * 장비 고장 이력 목록 조회
     * @param
     * @return
     */
    public Map<String, Object> selectDeviceDefectHistoryList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", deviceDefectHistoryMapper.selectDeviceDefectHistoryList(map));
        resultMap.put("page", deviceDefectHistoryMapper.selectDeviceDefectHistoryListTotalCount(map));
        return resultMap;
    }

    /**
     * 장비 고장 이력 정보 등록
     * @param deviceDefectHistoryVO
     * @return
     */
    public int insert(DeviceDefectHistoryVO deviceDefectHistoryVO){

        return deviceDefectHistoryMapper.insert(deviceDefectHistoryVO);
    }

    /**
     * 장비 고장 이력 정보 수정
     * @return
     */
    public int update(DeviceDefectHistoryVO deviceDefectHistoryVO){

        return deviceDefectHistoryMapper.update(deviceDefectHistoryVO);
    }

    /**
     * 수리 완료 처리 진행
     * @return
     */
    public int repairCompleteProcess(DeviceDefectHistoryVO deviceDefectHistoryVO){

        return deviceDefectHistoryMapper.repairCompleteProcess(deviceDefectHistoryVO);
    }

    /**
     * PMS 코드로 장비 목록 조회
     * @return
     */
    public List<DeviceDefectHistoryVO> getDeviceInfo(String pmsCode) {

        return deviceDefectHistoryMapper.getDeviceInfo(pmsCode);
    }

    /**
     * 장비 고장 이력 개수 가져오기 (장비 고장 이력 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return deviceDefectHistoryMapper.selectTotalCount();
    }
}