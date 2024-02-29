package metis.app.pmsWeb.domain.chargeDischargeHistory;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.deviceDefectHistory.DeviceDefectHistoryVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChargeDischargeHistoryService extends BaseService<DeviceDefectHistoryVO, String> {

    @Inject
    private ChargeDischargeHistoryMapper chargeDischargeHistoryMapper;

    /**
     * 충방전 이력 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectChargeDischargeHistory (Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeHistoryMapper.selectChargeDischargeHistory(map));
        resultMap.put("page", chargeDischargeHistoryMapper.selectChargeDischargeHistoryTotalCount(map));
        return resultMap;
    }

    /**
     * 충방전 이력 개수 가져오기 (충방전 이력 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return chargeDischargeHistoryMapper.selectTotalCount();
    }


    /**
     * 누적 전력량 상세 목록
     * @param map
     * @return
     */
    public Map<String, Object> selectDetailList (Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeHistoryMapper.selectDetailList(map));
        return resultMap;
    }

    /**
     * 누적 전력량 상세 목록 개수 가져오기
     * @return
     */
    public int selectDetailTotalCount(){

        return chargeDischargeHistoryMapper.selectDetailTotalCount();
    }
}
