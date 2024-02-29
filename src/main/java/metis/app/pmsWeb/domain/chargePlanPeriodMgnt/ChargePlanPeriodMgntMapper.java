package metis.app.pmsWeb.domain.chargePlanPeriodMgnt;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.deviceConfig.DeviceConfigVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ChargePlanPeriodMgntMapper extends MyBatisMapper {
    /**
     * 기간별 충방전 계획 목록 조회
     *
     * @param map
     * @return
     */
    List<DeviceConfigVO> selectChargePlanPeriodMgnt(Map<String, Object> map);

    /**
     * 충방전 계획 상세 목록 조회
     *
     * @param map
     * @return
     */
    List<DeviceConfigVO> selectChargeDischargePlanDetail(Map<String, Object> map);

    /**
     * 상세 목록 존재 여부 확인
     *
     * @param dataList
     * @return
     */
    int isExistSameDataYn(Map<String, Object> dataList);

    /**
     * 충방전 계획 상세 목록 삽입
     *
     * @return
     */
    void insertChargePlanDetail(Map<String, Object> dataList);

    /**
     * 방전 계획 상세 데이터 삽입
     *
     * @return
     */
    void insertDischargePlanDetail(Map<String, Object> dataList);

    /**
     * 충전 계획 상세 데이터 삭제
     *
     * @return
     */
    void deleteChargePlanDetail(Map<String, Object> dataList);

    /**
     * 방전 계획 상세 데이터 삭제
     *
     * @param dataList
     */
    void deleteDischargePlanDetail(Map<String, Object> dataList);

    /**
     * 충방전 계획 개수 가져오기 (충방전 계획 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCountMgnt();

    /**
     * 충방전 계획 상세 개수 가져오기 (충방전 계획 상세 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCountDetail();
}
