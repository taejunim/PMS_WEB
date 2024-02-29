package metis.app.pmsWeb.domain.sensorStatusHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.commandControlHistory.CommandControlHistoryVO;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface SensorStatusHistoryMapper extends MyBatisMapper {
    /**
     * 센서 상태 이력 조회
     * @param map
     * @return
     */
    List<SensorStatusHistoryVO> select(Map<String, Object> map);

    /**
     * 센서 상태 이력 조회 개수
     */
    int selectTotalCount(Map<String, Object> map);

    /** PMS별 장비 코드 가져오기 (Ajax)
     * @return
     */
    List<SensorStatusHistoryVO> selectDeviceCodes(SensorStatusHistoryVO sensorStatusHistoryVO);

    /**
     * 센서 상태 이력 개수 가져오기 (센서 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    int totalRowCount();
}
