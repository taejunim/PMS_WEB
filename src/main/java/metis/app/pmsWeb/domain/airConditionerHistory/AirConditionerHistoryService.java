package metis.app.pmsWeb.domain.airConditionerHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AirConditionerHistoryService extends BaseService<AirConditionerHistoryVO, String> {

    @Inject
    private AirConditionerHistoryMapper airConditionerHistoryMapper;

    /**
     * 공조장치 이력 조회
     * @param map
     * @return
     */
    public Map<String, Object> select(Map<String,Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", airConditionerHistoryMapper.select(map));
        resultMap.put("page", airConditionerHistoryMapper.selectTotalCount(map));
        return resultMap;
    }

    /**
     * 장비 코드 가져오기 (Ajax)
     * @return airConditionerHistoryMapper.selectDeviceCodes()
     */
    public List<AirConditionerHistoryVO> selectDeviceCodes(){

        return airConditionerHistoryMapper.selectDeviceCodes();
    }
}