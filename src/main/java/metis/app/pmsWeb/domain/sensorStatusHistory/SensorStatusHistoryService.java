package metis.app.pmsWeb.domain.sensorStatusHistory;

import metis.app.pmsWeb.domain.commandControlHistory.CommandControlHistoryVO;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SensorStatusHistoryService {

    @Inject
    private SensorStatusHistoryMapper sensorStatusHistoryMapper;

    /**
     * 센서 상태 이력 조회
     * @param map
     * @return
     */
    public Map<String, Object> select(Map<String,Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", sensorStatusHistoryMapper.select(map));
        resultMap.put("page", sensorStatusHistoryMapper.selectTotalCount(map));
        return resultMap;
    }

    /**
     * PMS별 장비 코드 가져오기 (Ajax)
     * @return
     */
    public List<SensorStatusHistoryVO> selectDeviceCodes(SensorStatusHistoryVO sensorStatusHistoryVO){

        return sensorStatusHistoryMapper.selectDeviceCodes(sensorStatusHistoryVO);
    }

    /**
     * 센서 상태 이력 개수 가져오기 (센서 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    public int totalRowCount(){

        return sensorStatusHistoryMapper.totalRowCount();
    }
}
