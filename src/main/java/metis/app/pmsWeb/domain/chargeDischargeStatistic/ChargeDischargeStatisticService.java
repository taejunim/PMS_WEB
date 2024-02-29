package metis.app.pmsWeb.domain.chargeDischargeStatistic;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.common.CommonMapper;
import metis.app.pmsWeb.utils.DateUtil;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChargeDischargeStatisticService extends BaseService<ChargeDischargeStatisticVO, String> {

    @Inject
    private ChargeDischargeStatisticMapper chargeDischargeStatisticMapper;

    @Inject
    private CommonMapper commonMapper;

    /**
     * 실시간 충방전 정보 기준 15분당 summary 구하는 서비스
     */
    public void insertSummaryBattery15MinuteInfo() {
        Map<String, Object> queryMap = new HashMap<>();

        String query = "SELECT ESS_CODE AS essCode FROM BASE_ESS LIMIT 1";

        queryMap.put("query", query);

        List<Map<String, Object>> essList = commonMapper.selectQuery(queryMap);

        if(essList.size() > 0) {
            Map<String, Object> params = new HashMap<>();
            params.put("startRegDate", DateUtil.getCalcDateTime(Calendar.MINUTE, "yyyyMMddHHmm", -15) + "00");
            params.put("endRegDate", DateUtil.getCalcDateTime(Calendar.MINUTE, "yyyyMMddHHmm", 0) + "00");
            params.put("measureStartTime", DateUtil.getCalcDateTime(Calendar.MINUTE, "HHmm", -15));
            params.put("measureEndTime", DateUtil.getCalcDateTime(Calendar.MINUTE, "HHmm", 0));

            chargeDischargeStatisticMapper.insertSummaryBattery15MinuteInfo(params);
        }
    }

    /**
     * 실시간 충방전 정보 기준 1시간당 summary 구하는 서비스
     */
    public void insertSummaryBatteryTimeInfo() {

        Map<String, Object> queryMap = new HashMap<>();
        String query = "SELECT ESS_CODE AS essCode FROM BASE_ESS LIMIT 1";
        queryMap.put("query", query);

        List<Map<String, Object>> essList = commonMapper.selectQuery(queryMap);

        if(essList.size() > 0) {
            Map<String, Object> params = new HashMap<>();
            params.put("oneHourBeforeDate", DateUtil.getCalcDateTime2(Calendar.HOUR, "yyyyMMddHH", -1));
            params.put("oneHourDate", DateUtil.getCalcDateTime2(Calendar.HOUR, "yyyyMMddHH", 0));

            chargeDischargeStatisticMapper.insertSummaryBatteryTimeInfo(params);
        }
    }



    public void insertSummaryBatteryDayInfo() {



        Map<String, Object> queryMap = new HashMap<>();

        String query = "SELECT ESS_CODE AS essCode FROM BASE_ESS LIMIT 1";

        queryMap.put("query", query);

        List<Map<String, Object>> essList = commonMapper.selectQuery(queryMap);

        if(essList.size() > 0) {
            Map<String, Object> params = new HashMap<>();
            params.put("oneHourBeforeDate", DateUtil.getCalcDateTime(Calendar.HOUR, "yyyyMMdd", -1));

            chargeDischargeStatisticMapper.insertSummaryBatteryDayInfo(params);
        }

    }




    public void insertSummaryBatteryMonthInfo() {
        Map<String, Object> queryMap = new HashMap<>();
        String query = "SELECT ESS_CODE AS essCode FROM BASE_ESS LIMIT 1";
        queryMap.put("query", query);

        List<Map<String, Object>> essList = commonMapper.selectQuery(queryMap);

        if(essList.size() > 0) {
            Map<String, Object> params = new HashMap<>();
            params.put("oneHourBeforeDate", DateUtil.getCalcDateTime(Calendar.HOUR, "yyyyMM", -1));
            params.put("essCode", essList.get(0).get("essCode").toString());

            chargeDischargeStatisticMapper.insertSummaryBatteryMonthInfo(params);
        }
    }

    /**
     * 충방전 일간 통계 조회
     * @return
     */
    public Map<String, Object> selectChargeDischargeDailyStatisticList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeStatisticMapper.selectChargeDischargeDailyStatisticList(map));
        return resultMap;
    }

    /**
     * 충방전 월간 통계 조회
     * @return
     */
    public Map<String, Object> selectChargeDischargeMonthlyStatisticList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeStatisticMapper.selectChargeDischargeMonthlyStatisticList(map));
        return resultMap;
    }

    /**
     * 충방전 연간 통계 조회
     * @return
     */
    public Map<String, Object> selectChargeDischargeYearlyStatisticList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeStatisticMapper.selectChargeDischargeYearlyStatisticList(map));
        return resultMap;
    }

}