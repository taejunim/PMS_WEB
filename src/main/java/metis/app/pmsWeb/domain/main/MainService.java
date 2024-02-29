package metis.app.pmsWeb.domain.main;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.chargeDischargeHistory.ChargeDischargeHistoryVO;
import metis.app.pmsWeb.domain.chargeDischargeStatistic.ChargeDischargeStatisticVO;
import metis.app.pmsWeb.domain.deviceConfig.DeviceConfigVO;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import metis.app.pmsWeb.domain.essManagement.EssManagementVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MainService extends BaseService<ChargeDischargeStatisticVO, String> {

    @Inject
    private MainMapper mainMapper;

    /**
     * ESS 자동 제어 여부 가져오기
     * @return
     */
    public Map<String, Object> selectAutoControlFlag(String essCode) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("essStatus", mainMapper.selectAutoControlFlag(essCode));
        return resultMap;
    }

    /**
     * 명령어 목록 조회(모달 바인딩용)
     * @return
     */
    public Map<String, Object> selectControlList(EssManagementVO essManagementVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", mainMapper.selectControlList(essManagementVO));
        return resultMap;
    }

    /**
     * 코드 목록 조회(모달 바인딩용)
     * @return
     */
    public Map<String, Object> selectCodeList() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", mainMapper.selectCodeList());
        return resultMap;
    }

    /**
     * ESS 운영 일정 목록 조회
     * @return
     */
    public Map<String, Object> selectOperationSchedule() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", mainMapper.selectOperationSchedule());
        return resultMap;
    }

    /**
     * ESS 제어 설정
     * @return
     */
    public int rollBackUpdate(MainVO mainVO){

        return mainMapper.rollBackUpdate(mainVO);
    }

    /**
     * 장비 오류 이력 조회
     * @param
     * @return
     */
    public Map<String, Object> selectDeviceErrorHistoryList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", mainMapper.selectDeviceErrorHistoryList(map));
        return resultMap;
    }

    /**
     * ESS 운영 통계
     * @param essCode
     * @return
     */
    public Map<String, Object> selectOperatingStats(String essCode) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", mainMapper.selectOperatingStats(essCode));
        return resultMap;
    }
}