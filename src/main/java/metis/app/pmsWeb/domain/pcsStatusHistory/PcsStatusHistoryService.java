package metis.app.pmsWeb.domain.pcsStatusHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Service
public class PcsStatusHistoryService extends BaseService<PcsStatusHistoryVO, String> {

    @Inject
    private PcsStatusHistoryMapper pcsStatusHistoryMapper;

    /**
     * pcs 5분간 상태 서머리 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectPcsStatusHistory(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", pcsStatusHistoryMapper.selectPcsStatusHistory(map));
        resultMap.put("page", pcsStatusHistoryMapper.selectPcsStatusTotalCount(map));
        return resultMap;
    }

    /**
     * CPCM 5분간 상태 서머리 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectCpcmStatusHistory(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", pcsStatusHistoryMapper.selectCpcmStatusHistory(map));
        resultMap.put("page", pcsStatusHistoryMapper.selectCpcmStatusTotalCount(map));
        return resultMap;
    }

    /**
     * pcs 이력 개수 가져오기 (pcs 이력 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return pcsStatusHistoryMapper.selectTotalCount();
    }
}