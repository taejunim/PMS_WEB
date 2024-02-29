package metis.app.pmsWeb.domain.chargeDischargeStatistic;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ChargeDischargeStatisticMapper extends MyBatisMapper {

    /**
     * 충방전 일간 통계 조회
     * @return
     */
    List<ChargeDischargeStatisticVO> selectChargeDischargeDailyStatisticList(Map<String, Object> map);

    /**
     * 충방전 월간 통계 조회
     * @return
     */
    List<ChargeDischargeStatisticVO> selectChargeDischargeMonthlyStatisticList(Map<String, Object> map);

    /**
     * 충방전 연간 통계 조회
     * @return
     */
    List<ChargeDischargeStatisticVO> selectChargeDischargeYearlyStatisticList(Map<String, Object> map);

    /**
     * 15분간 충방전 정보를 15분 주기로 select Insert 함.
     * @param map
     */
    void insertSummaryBattery15MinuteInfo(Map<String, Object> map);


    /**
     * 실시간 충방전 정보를 1시간 단위로 select Insert 함.
     * @param map
     */
    void insertSummaryBatteryTimeInfo(Map<String, Object> map);

    /**
     * 월간 충방전 정보를 1시간 단위로 select Insert 함.
     * @param map
     */
    void insertSummaryBatteryDayInfo(Map<String, Object> map);


    /**
     * 연간 충방전 정보를 1시간 단위로 select Insert 함.
     * @param map
     */
    void insertSummaryBatteryMonthInfo(Map<String, Object> map);

}