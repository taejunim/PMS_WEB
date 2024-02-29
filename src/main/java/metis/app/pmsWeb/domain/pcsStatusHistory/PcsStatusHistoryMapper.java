package metis.app.pmsWeb.domain.pcsStatusHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface PcsStatusHistoryMapper extends MyBatisMapper {

    /**
     * pcs 5분간 상태 서머리 조회
     *
     * @return
     */

    List<PcsStatusHistoryVO> selectPcsStatusHistory(Map<String, Object> map);

    /**
     * CPCM 5분간 상태 서머리 조회
     *
     * @return
     */

    List<PcsStatusHistoryVO> selectCpcmStatusHistory(Map<String, Object> map);

    /**
     * pcs 5분간 상태 서머리 목록 조회
     * @param map
     * @return      5분간 CPCM 서머리 목록 개수
     */
    int selectPcsStatusTotalCount(Map<String, Object> map);

    /**
     * CPCM 5분간 상태 서머리 목록 조회
     * @param map
     * @return      5분간 CPCM 서머리 목록 개수
     */
    int selectCpcmStatusTotalCount(Map<String, Object> map);

    /**
     * pcs 이력 개수 가져오기 (pcs 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}
