package metis.app.pmsWeb.domain.chargeDischargePlanMgnt;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.*;

@Controller
@RequestMapping(value = "/chargeDischargePlanMgnt")
public class ChargeDischargePlanMgntController extends BaseController {

    @Inject
    private ChargeDischargePlanMgntService chargeDischargeService;

    /**
     * ESS 일정 목록 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(ChargeDischargePlanMgntVO requestParams) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeService.list(requestParams));

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충전 계획 데이터 삽입
     * @param
     * @return
     */
    @RequestMapping(value = "/insert",method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse insertChargePlan(@RequestBody ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        ApiResponse apiResponse = ok();

        // - 치환
        chargeDischargePlanMgntVO.setScheduleStartDate(chargeDischargePlanMgntVO.getScheduleStartDate().replaceAll("-",""));
        chargeDischargePlanMgntVO.setScheduleEndDate(chargeDischargePlanMgntVO.getScheduleEndDate().replaceAll("-",""));

        // : 없는 HHMMSS 형태로 치환
        chargeDischargePlanMgntVO.setScheduleStartTime(chargeDischargePlanMgntVO.getScheduleStartTime().replaceAll(":","") + "00");
        chargeDischargePlanMgntVO.setScheduleEndTime(chargeDischargePlanMgntVO.getScheduleEndTime().replaceAll(":","") + "00");

        List<ChargeDischargePlanMgntVO> samePlan = chargeDischargeService.checkExistSamePlan(chargeDischargePlanMgntVO);
        // 선택한 기간에 일정이 존재하면 update 하지 않음
        if(samePlan.size() > 0) {
            apiResponse.setMessage("Duplicate");
        } else {
            // 생성자 setting
            chargeDischargePlanMgntVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
            chargeDischargeService.insert(chargeDischargePlanMgntVO);
            apiResponse.setMessage(chargeDischargePlanMgntVO.getScheduleNo());
        }

        return apiResponse;
    }

    /**
     * 충전 계획 데이터 수정
     * @param
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse updateChargePlan(@RequestBody ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {

        ApiResponse apiResponse = ok();

        // - 치환
        chargeDischargePlanMgntVO.setScheduleStartDate(chargeDischargePlanMgntVO.getScheduleStartDate().replaceAll("-",""));
        chargeDischargePlanMgntVO.setScheduleEndDate(chargeDischargePlanMgntVO.getScheduleEndDate().replaceAll("-",""));

        // : 없는 HHMMSS 형태로 치환
        chargeDischargePlanMgntVO.setScheduleStartTime(chargeDischargePlanMgntVO.getScheduleStartTime().replaceAll(":","") + "00");
        chargeDischargePlanMgntVO.setScheduleEndTime(chargeDischargePlanMgntVO.getScheduleEndTime().replaceAll(":","") + "00");

        List<ChargeDischargePlanMgntVO> samePlan = chargeDischargeService.checkExistSamePlan(chargeDischargePlanMgntVO);
        // 선택한 기간에 일정이 존재하면 update 하지 않음
        if(samePlan.size() > 0) {
            apiResponse.setMessage("Duplicate");
        } else {
            //수정자 setting
            chargeDischargePlanMgntVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
            chargeDischargeService.updatePlanDetail(chargeDischargePlanMgntVO);
            chargeDischargeService.updatePlan(chargeDischargePlanMgntVO);
        }

        return apiResponse;
    }

    /**
     * 예약 취소
     * @param
     * @return
     */
    @RequestMapping(value = "/cancel",method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse cancelChargePlan(@RequestBody ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {
        // - 치환
        chargeDischargePlanMgntVO.setScheduleStartDate(chargeDischargePlanMgntVO.getScheduleStartDate().replaceAll("-",""));
        //수정자 setting
        chargeDischargePlanMgntVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        chargeDischargeService.cancelPlan(chargeDischargePlanMgntVO);
        chargeDischargeService.updatePlan(chargeDischargePlanMgntVO);
        return ok();
    }

    /**
     * 예약 취소
     * @param
     * @return
     */
    @RequestMapping(value = "/rollBack",method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse rollBack(@RequestBody ChargeDischargePlanMgntVO chargeDischargePlanMgntVO) {
        // - 치환
        chargeDischargePlanMgntVO.setScheduleStartDate(chargeDischargePlanMgntVO.getScheduleStartDate().replaceAll("-",""));
        chargeDischargePlanMgntVO.setScheduleEndDate(chargeDischargePlanMgntVO.getScheduleEndDate().replaceAll("-",""));

        // : 없는 HHMMSS 형태로 치환
        chargeDischargePlanMgntVO.setScheduleStartTime(chargeDischargePlanMgntVO.getScheduleStartTime().replaceAll(":","") + "00");
        chargeDischargePlanMgntVO.setScheduleEndTime(chargeDischargePlanMgntVO.getScheduleEndTime().replaceAll(":","") + "00");

        if(chargeDischargePlanMgntVO.getRollBackType().equals("cancel")) {
            chargeDischargeService.rollBackCancelPlan(chargeDischargePlanMgntVO);
            chargeDischargeService.rollBackUpdatePlan(chargeDischargePlanMgntVO);

        } else if(chargeDischargePlanMgntVO.getRollBackType().equals("insert")) {
            chargeDischargeService.rollBackInsert(chargeDischargePlanMgntVO);

        } else if(chargeDischargePlanMgntVO.getRollBackType().equals("update")) {

            chargeDischargeService.rollBackUpdatePlanDetail(chargeDischargePlanMgntVO);
            chargeDischargeService.rollBackUpdatePlan(chargeDischargePlanMgntVO);
        }
        return ok();
    }
}
