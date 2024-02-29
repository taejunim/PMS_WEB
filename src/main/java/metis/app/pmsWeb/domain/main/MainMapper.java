package metis.app.pmsWeb.domain.main;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.chargeDischargeHistory.ChargeDischargeHistoryVO;
import metis.app.pmsWeb.domain.deviceConfig.DeviceConfigVO;
import metis.app.pmsWeb.domain.deviceErrorHistory.DeviceErrorHistoryVO;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import metis.app.pmsWeb.domain.essManagement.EssManagementVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface MainMapper extends MyBatisMapper {

    /**
     * ESS 자동 제어 여부 가져오기
     * @return
     */
    Map<String, Object> selectAutoControlFlag(String essCode);

    /**
     * 명령어 목록 조회(모달 바인딩용)
     * @return
     */
    List<Map<String, Object>> selectControlList(EssManagementVO essManagementVO);

    /**
     * 코드 목록 조회(모달 바인딩용)
     * @return
     */
    List<Map<String, Object>> selectCodeList();

    /**
     * ESS 운영 일정 목록 조회
     * @return
     */
    Map<String, Object> selectOperationSchedule();

    /**
     * ESS 제어 설정
     * @return
     */
    int rollBackUpdate(MainVO mainVO);


    /**
     * 장비 오류 이력 조회
     * @return
     */
    List<DeviceErrorHistoryVO> selectDeviceErrorHistoryList(Map<String, Object> map);


    /**
     * ESS 운영 통계
     * @return
     */
    Map<String, Object> selectOperatingStats(String essCode);
}