package metis.app.pmsWeb.domain.acConverterHistory;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.airConditionerHistory.AirConditionerHistoryMapper;
import metis.app.pmsWeb.domain.airConditionerHistory.AirConditionerHistoryVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AcConverterHistoryService extends BaseService<AcConverterHistoryVO, String> {
    @Inject
    private AcConverterHistoryMapper acConverterHistoryMapper;

    /**
     * AC 컨버터 이력 조회
     * @param map
     * @return
     */
    public Map<String, Object> select(Map<String,Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", acConverterHistoryMapper.select(map));
        resultMap.put("page", acConverterHistoryMapper.selectTotalCount(map));
        return resultMap;
    }


    /**
     * AC 컨버터 상세정보 조회
     * @return acConverterHistoryMapper.selectConverterDetail()
     */
    public List<AcConverterDetailHistoryVO> selectConverterDetail(Map<String,Object> map) {

        return acConverterHistoryMapper.selectConverterDetail(map);
    }
}