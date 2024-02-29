package metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

/**
 * ChargeDischargeSummaryVO.java
 *
 * PMS API Interface - ChargeDischargeSummaryService 충방전 summary VO (테이블 조회용)
 *
 * Created by You-Yeong Jo on 2022/04/12.
 */

@Data
public class ChargeDischargeSummaryVO extends BaseVO {

    private String essCode;                             // ESS ID
    private String regDate;                             // 등록 시간
    private String batteryChargeAmount;                 // 충전량
    private String batteryDischargeAmount;              // 방전량
    private String batteryChargeAccumulateAmount;       // 누적 충전량
    private String batteryDischargeAccumulateAmount;    // 누적 방전량
    private String positionFixYn;                       //이동형 고정형 여부.

}
