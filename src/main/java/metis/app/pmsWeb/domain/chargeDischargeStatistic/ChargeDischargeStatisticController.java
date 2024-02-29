package metis.app.pmsWeb.domain.chargeDischargeStatistic;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;

import metis.app.pmsWeb.domain.pmsApiInterface.PmsApiInterfaceService;
import metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary.ChargeDischargeSummaryVO;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.*;

@Controller
@RequestMapping(value = "/chargeDischargeStatistic")
public class ChargeDischargeStatisticController extends BaseController {

    @Inject
    private ChargeDischargeStatisticService chargeDischargeStatisticService;
    @Inject
    private PmsApiInterfaceService pmsApiInterfaceService;


    /**
     * 15분마다 15분간 배터리 충방전 정보를 저장 (매 15분 마다)
     */
    @Scheduled(cron = "7 0/15 * * * *")
    public void insertSummaryBattery15MinuteInfo() {

        chargeDischargeStatisticService.insertSummaryBattery15MinuteInfo();
        ChargeDischargeSummaryVO summaryResult = pmsApiInterfaceService.select15ChargeDischargeSummary();
        pmsApiInterfaceService.sendSummaryDataToInterface(summaryResult, "15");
    }



    /**
     * 매시간 1분 10초 마다 일간 배터리 충방전 정보를 저장
     */
    @Scheduled(cron = "10 1 * * * *")
    public void insertSummaryBatteryTimeInfo() {

        chargeDischargeStatisticService.insertSummaryBatteryTimeInfo();
        ChargeDischargeSummaryVO summaryResult = pmsApiInterfaceService.select60ChargeDischargeSummary();
        pmsApiInterfaceService.sendSummaryDataToInterface(summaryResult, "60");
    }


    /**
     * 매시간 2분 10초 마다 월간 배터리 충방정 정보를 저장
     */
    @Scheduled(cron = "10 2 * * * *")
    public void insertSummaryBatteryDayInfo() {

        chargeDischargeStatisticService.insertSummaryBatteryDayInfo();
        ChargeDischargeSummaryVO summaryResult = pmsApiInterfaceService.selectDayChargeDischargeSummary();
        pmsApiInterfaceService.sendSummaryDataToInterface(summaryResult, "24H");
    }



    /**
     * 매시간 3분 10초 마다 연간 배터리 충방정 정보를 저장
     */
    @Scheduled(cron = "10 3 * * * *")
    public void insertSummaryBatteryMonthInfo() {

        chargeDischargeStatisticService.insertSummaryBatteryMonthInfo();
    }


    /**
     * ESS 충방전 일간 통계
     * @param
     * @return
     */
    @RequestMapping(value = "/dailyList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse dailyList(ChargeDischargeStatisticVO chargeDischargeStatisticVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("searchDate", chargeDischargeStatisticVO.getSearchDate());
        Map<String, Object> resultMap = chargeDischargeStatisticService.selectChargeDischargeDailyStatisticList(params);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 충방전 월간 통계
     * @param
     * @return
     */
    @RequestMapping(value = "/monthlyList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse monthlyList(ChargeDischargeStatisticVO chargeDischargeStatisticVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("searchDate", chargeDischargeStatisticVO.getSearchDate());
        Map<String, Object> resultMap = chargeDischargeStatisticService.selectChargeDischargeMonthlyStatisticList(params);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 충방전 연간 통계
     * @param
     * @return
     */
    @RequestMapping(value = "/yearlyList",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse yearlyList(ChargeDischargeStatisticVO chargeDischargeStatisticVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("pmsCode", chargeDischargeStatisticVO.getPmsCode());
        params.put("searchDate", chargeDischargeStatisticVO.getSearchDate());
        Map<String, Object> resultMap = chargeDischargeStatisticService.selectChargeDischargeYearlyStatisticList(params);

        return Responses.MapResponse.of(resultMap);
    }


}
