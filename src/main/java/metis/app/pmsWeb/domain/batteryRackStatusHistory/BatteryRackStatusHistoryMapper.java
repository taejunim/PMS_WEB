package metis.app.pmsWeb.domain.batteryRackStatusHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.pcsStatusHistory.PcsStatusHistoryVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface BatteryRackStatusHistoryMapper extends MyBatisMapper {

    /**
     * 배터리 RACK 상태 이력 목록 조회
     * @param map
     * @return
     */
    List<BatteryRackStatusHistoryVO> select(Map<String, Object> map);

    /**
     * 배터리 RACK 상태 이력 목록 개수
     * @param map
     * @return
     */
    int selectTotalCount(Map<String, Object> map);


    /**
     * 배터리 MODULE 상태 이력 목록 조회
     * @param map
     * @return
     */
    List<BatteryModuleStatusHistoryVO> selectModule(Map<String, Object> map);

    /**
     * 배터리 RACK 상태 이력 개수 가져오기 (배터리 RACK 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCountRack();

    /**
     * 배터리 Module 상태 이력 개수 가져오기 (배터리 RACK 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCountModule(Map<String, Object> map);
}
