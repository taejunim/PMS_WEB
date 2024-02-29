package metis.app.pmsWeb.domain.chargeDischargeHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ChargeDischargeHistoryMapper extends MyBatisMapper {

    /**
     * 충방전 이력 조회
     * @param map
     * @return
     */
    List<ChargeDischargeHistoryVO> selectChargeDischargeHistory(Map<String, Object> map);

    /**
     * 충방전 이력 목록 개수
     * @param map
     * @return
     */
    int selectChargeDischargeHistoryTotalCount (Map<String, Object> map);

    /**
     * 충방전 이력 개수 가져오기 (충방전 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();

    /**
     * 누적 전력량 상세 목록
     * @param map
     * @return
     */
    List<ChargeDischargeHistoryVO> selectDetailList(Map<String, Object> map);

    /**
     * 누적 전력량 상세 목록 개수 가져오기
     * @return
     */
    int selectDetailTotalCount();
}
