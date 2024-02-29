package metis.app.pmsWeb.domain.chargeDischargePlanMgnt;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChargeDischargePlanMgntService extends BaseService {

    @Inject
    private ChargeDischargePlanMgntMapper chargeDischargePlanMgntMapper;

    /**
     *
     * @return
     */
    public List<Map<String, Object>> list(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {
        return chargeDischargePlanMgntMapper.list(chargeDischargePlanMgntVO);
    }

    /**
     * 일정 데이터 삽입
     * @return
     */
    public void insert(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        chargeDischargePlanMgntMapper.insertChargeDischargePlan(chargeDischargePlanMgntVO);
        chargeDischargePlanMgntMapper.insertChargeDischargePlanDetail(chargeDischargePlanMgntVO);
    }

    /**
     * 선택한 시간대에 등록된 일정이 있는지 확인
     * */
    public List<ChargeDischargePlanMgntVO> checkExistSamePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.checkExistSamePlan(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 수정 detail
     * */
    public int updatePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.updatePlanDetail(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 수정 master
     * */
    public int updatePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.updatePlan(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 취소
     * */
    public int cancelPlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.cancelPlan(chargeDischargePlanMgntVO) * chargeDischargePlanMgntMapper.updatePlan(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 취소(DR 발령용)
     * */
    public int cancelPlans(List<ChargeDischargePlanMgntVO> list, ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        Map<String, Object> map = new HashMap<>();
        map.put("updatedBy", chargeDischargePlanMgntVO.getUpdatedBy());
        map.put("list", list);
        return chargeDischargePlanMgntMapper.cancelPlans(map);
    }

    /**
     * 일정 데이터 삽입 ROLL BACK
     * @return
     */
    public void rollBackInsert(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {
        chargeDischargePlanMgntMapper.rollBackInsertChargeDischargePlanDetail(chargeDischargePlanMgntVO);

        if(chargeDischargePlanMgntMapper.selectScheduleCount(chargeDischargePlanMgntVO) == 0)
            chargeDischargePlanMgntMapper.rollBackInsertChargeDischargePlan(chargeDischargePlanMgntVO);
        
        else chargeDischargePlanMgntMapper.rollBackUpdatePlan(chargeDischargePlanMgntVO);
    }


    /**
     * 예약 수정 detail ROLL BACK
     * */
    public int rollBackUpdatePlanDetail(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.rollBackUpdatePlanDetail(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 수정 master ROLL BACK
     * */
    public int rollBackUpdatePlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.rollBackUpdatePlan(chargeDischargePlanMgntVO);
    }

    /**
     * 예약 취소 ROLL BACK
     * */
    public int rollBackCancelPlan(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.rollBackCancelPlan(chargeDischargePlanMgntVO);
    }

    /**
     * 똑같은 스케쥴 등록되어 있는지 확인 (DR 발령용)
     * */
    public int checkExistSamePlanDr(ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        return chargeDischargePlanMgntMapper.checkExistSamePlanDr(chargeDischargePlanMgntVO);
    }
}
