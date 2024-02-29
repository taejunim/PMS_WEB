package metis.app.pmsWeb.domain.chargeDischargeStatistic;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChargeDischargeStatisticVO extends BaseVO {

    private String searchDate;                   //검색 일시
    private String pmsCode;                      //검색 종료 일시
}