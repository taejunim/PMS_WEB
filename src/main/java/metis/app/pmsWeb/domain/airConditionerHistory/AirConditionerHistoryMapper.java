package metis.app.pmsWeb.domain.airConditionerHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface AirConditionerHistoryMapper extends MyBatisMapper {

    /**
     * 공조장치 상태 이력 조회
     * @param map
     * @return
     */
    List<AirConditionerHistoryVO> select(Map<String, Object> map);

    /**
     * 공조장치 상태 이력 조회 개수
     */
    int selectTotalCount(Map<String, Object> map);

    /** 장비 코드 가져오기 (Ajax)
     * @return List<AirConditionerHistoryVO>
     */
    List<AirConditionerHistoryVO> selectDeviceCodes();

}