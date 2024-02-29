package metis.app.pmsWeb.domain.commandControlHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface CommandControlHistoryMapper extends MyBatisMapper {

    /**
     * ESS 제어 명령어 이력 조회
     * @return
     */
    List<CommandControlHistoryVO> selectCommandControlHistoryList(Map<String, Object> map);

    /**
     * ESS 제어 명령어 이력 개수
     * @return
     */
    int selectCommandControlHistoryTotalList(Map<String, Object> map);

    /**
     * ESS 제어 명령어 이력 등록
     * @return
     */
    int insert(CommandControlHistoryVO commandControlHistoryVO);

    /**
     * ESS 제어 명령어 개수 가져오기 (ESS 제어 명령어 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}