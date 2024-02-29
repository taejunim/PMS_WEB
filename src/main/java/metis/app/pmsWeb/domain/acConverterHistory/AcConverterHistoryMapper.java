package metis.app.pmsWeb.domain.acConverterHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.airConditionerHistory.AirConditionerHistoryVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface AcConverterHistoryMapper extends MyBatisMapper {

    /**
     * AC 컨버터 이력 조회
     * @param map
     * @return
     */
    List<AcConverterHistoryVO> select(Map<String, Object> map);

    /**
     * AC 컨버터 이력 조회 개수
     */
    int selectTotalCount(Map<String, Object> map);

    /**
     * AC 컨버터 상세정보 조회
     * @return List<AcConverterDetailHistoryVO>
     */
    List<AcConverterDetailHistoryVO> selectConverterDetail (Map<String, Object> map);
}