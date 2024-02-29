package metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

/**
 * ChargeDischargeSummaryOutVO.java
 *
 * PMS API Interface - ChargeDischargeSummaryService 충방전 summary VO (데이터 전송용)
 *
 * Created by You-Yeong Jo on 2022/04/12.
 */

@Data
public class ChargeDischargeSummaryOutVO extends BaseVO {

    private String essEquipId;                          // ESS ID
    private String meteringDt;                          // 검침 일시
    private String chargeDischargeAmount;               // 충/방전량
    private String chargeType;                          // 충/방전 타입 chg / dis
    private String positionFixYn;                       // 고정형/이동형 구분 fix / mob
    private String periodType;                          // 기간(15분/60분) 구분 15 / 60
    private String accumulateAmount;                    // 누적 충/방전량
}
