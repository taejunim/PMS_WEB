package metis.app.pmsWeb.domain.dcConverterHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DcConverterHistoryService extends BaseService<DcConverterHistoryVO, String> {

    @Inject
    private DcConverterHistoryMapper dcConverterHistoryMapper;

    /**
     * DC 컨버터 이력 조회
     * @param map
     * @return
     */
    public Map<String, Object> select(Map<String,Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", dcConverterHistoryMapper.select(map));
        resultMap.put("page", dcConverterHistoryMapper.selectTotalCount(map));
        return resultMap;
    }


    /**
     * DC 컨버터 상세정보 조회
     * @return dcConverterHistoryMapper.selectConverterDetail()
     */
    public List<DcConverterDetailHistoryVO> selectConverterDetail(Map<String,Object> map) {

        return dcConverterHistoryMapper.selectConverterDetail(map);
    }
    
}