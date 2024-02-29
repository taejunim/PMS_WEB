package metis.app.pmsWeb.domain.dcConverterHistory;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.dcConverterHistory.DcConverterDetailHistoryVO;
import metis.app.pmsWeb.domain.dcConverterHistory.DcConverterHistoryVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DcConverterHistoryMapper extends MyBatisMapper {

    /**
     * DC 컨버터 이력 조회
     * @param map
     * @return
     */
    List<DcConverterHistoryVO> select(Map<String, Object> map);

    /**
     * DC 컨버터 이력 조회 개수
     */
    int selectTotalCount(Map<String, Object> map);

    /**
     * DC 컨버터 상세정보 조회
     * @return List<DcConverterDetailHistoryVO>
     */
    List<DcConverterDetailHistoryVO> selectConverterDetail (Map<String, Object> map);

}