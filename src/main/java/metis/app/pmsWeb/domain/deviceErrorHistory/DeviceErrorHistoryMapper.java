package metis.app.pmsWeb.domain.deviceErrorHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.deviceErrorCode.DeviceErrorCodeVO;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceErrorHistoryMapper extends MyBatisMapper {

    /**
     * 장비 오류 이력 조회
     * @return
     */
    List<DeviceErrorHistoryVO> selectDeviceErrorHistoryList(Map<String, Object> map);

    /**
     * 장비 오류 이력 개수
     * @return
     */
    int selectDeviceErrorHistoryTotalList(Map<String, Object> map);

    /**
     * 장비 처리 완료 여부 수정
     * @param deviceErrorHistoryVO
     * @return
     */

    void updateErrorHistory(DeviceErrorHistoryVO deviceErrorHistoryVO);

    /**
     * 장비 정보
     * @param deviceErrorHistoryVO
     * @return
     */
    List<DeviceErrorHistoryVO> selectDeviceCode (DeviceErrorHistoryVO deviceErrorHistoryVO);

    /**
     * module 정보
     * @param deviceErrorHistoryVO
     * @return
     */
    List<DeviceErrorHistoryVO> selectComponent (DeviceErrorHistoryVO deviceErrorHistoryVO);

    /**
     * 장비 오류 이력 개수 가져오기 (장비 오류 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();

}