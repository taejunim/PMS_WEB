package metis.app.pmsWeb.domain.deviceDefectHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceDefectHistoryMapper extends MyBatisMapper {

    /**
     * 장비 고장 이력 목록 조회
     * @return
     */
    List<DeviceDefectHistoryVO> selectDeviceDefectHistoryList(Map<String, Object> map);

    /**
     * 장비 고장 이력 목록 개수
     * @return
     */
    int selectDeviceDefectHistoryListTotalCount(Map<String, Object> map);

    /**
     * 장비 고장 이력 등록
     * @return
     */
    int insert(DeviceDefectHistoryVO deviceDefectHistoryVO);

    /**
     * 장비 고장 이력 수정
     * @return
     */
    int update(DeviceDefectHistoryVO deviceDefectHistoryVO);

    /**
     * 수리 완료 처리 진행
     * @return
     */
    int repairCompleteProcess(DeviceDefectHistoryVO deviceDefectHistoryVO);

    /**
     * PMS 코드로 장비 목록 조회
     * @return
     */
    List<DeviceDefectHistoryVO> getDeviceInfo(String pmsCode);

    /**
     * 장비 고장 이력 개수 가져오기 (장비 고장 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}