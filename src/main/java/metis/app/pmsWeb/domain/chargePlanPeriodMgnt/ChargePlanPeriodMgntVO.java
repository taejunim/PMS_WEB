package metis.app.pmsWeb.domain.chargePlanPeriodMgnt;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class ChargePlanPeriodMgntVO extends BaseVO {

    private String pmsCode;                     // pms코드
    private String month;                       // 날짜선택_월

    private String planChargeDischargeDate;     // 일자
    private String planMonth;                   // 일자_월
    private String chargeDetailCnt;             // 충전계획
    private String dischargeDetailCnt;          // 방전계획

    private String chargeDisChargeGbn;          // 충방전 구분
    private String planStartTime;               // 시작시간
    private float chargeDischargeAmount;        // 충방전량
    private String batchApplyYn;                // 일괄 적용 여부
    private String useYn;                       // 사용 여부
    private String planSeq;                     // 일자별 계획 시퀀
    private String essCode;                     // ess 코드

}
