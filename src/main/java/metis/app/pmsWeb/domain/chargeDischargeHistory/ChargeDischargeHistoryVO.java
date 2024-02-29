package metis.app.pmsWeb.domain.chargeDischargeHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class ChargeDischargeHistoryVO extends BaseVO {

    private String energyNo;                //이력번호
    private String operationMode;           //충방전 구분
    private String operationHistoryDate;    //운전 일시
    private float accumulatedEnergy;        //ess 충방전량
    private String operationHistoryType;    //이력
    private String operationType;           //일정 운영 여부
    private String scheduleNo;              //일정 번호

    // history_energy_detail
    private String startDay;                //시작 일
    private String endDay;                  //종료 일
    private String energySeq;               //번호
    private String regDate;                 //일시
}
