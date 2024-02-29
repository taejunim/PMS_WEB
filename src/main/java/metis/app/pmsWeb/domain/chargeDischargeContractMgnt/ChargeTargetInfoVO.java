package metis.app.pmsWeb.domain.chargeDischargeContractMgnt;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChargeTargetInfoVO extends BaseVO {

    private int chargeTargetSeq;
    private String targetName;
    private String targetManagerName;
    private String targetManagerTel;
    private String address;
    private String useYn;
    private String remark;

}
