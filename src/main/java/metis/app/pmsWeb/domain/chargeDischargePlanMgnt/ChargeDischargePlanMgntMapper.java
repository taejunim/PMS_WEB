package metis.app.pmsWeb.domain.chargeDischargePlanMgnt;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ChargeDischargePlanMgntMapper extends MyBatisMapper {

    /**
     * 일정 목록 데이터 조회
     * @return
     */
    List<Map<String, Object>> list(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 일정 계획 데이터 삽입
     * @return
     */
    int insertChargeDischargePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 일정 계획 상세 데이터 삽입
     * @return
     */
    void insertChargeDischargePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 해당 시간대 일정 존재하는지 확인
     * @param chargeDischargePlanMgntVO
     * @return
     */
    List<ChargeDischargePlanMgntVO> checkExistSamePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 수정 (detail)
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int updatePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 수정 (master)
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int updatePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 취소
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int cancelPlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 취소 (DR 발령용)
     * @param map
     * @return
     */
    int cancelPlans(Map<String,Object> map);

    /**
     * 예약 취소 RollBack
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int rollBackCancelPlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 일정 계획 데이터 RollBack
     * @return
     */
    int rollBackInsertChargeDischargePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 일정 계획 상세 데이터 RollBack
     * @return
     */
    void rollBackInsertChargeDischargePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 수정 (detail) RollBack
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int rollBackUpdatePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 예약 수정 (master) RollBack
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int rollBackUpdatePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * RollBack 일자 삭제 여부 확인
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int selectScheduleCount(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);

    /**
     * 똑같은 스케쥴 등록되있는지 확인 (DR 발령용)
     * @param chargeDischargePlanMgntVO
     * @return
     */
    int checkExistSamePlanDr(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO);
}
