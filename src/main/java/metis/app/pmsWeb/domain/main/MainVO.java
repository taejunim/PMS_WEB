package metis.app.pmsWeb.domain.main;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MainVO extends BaseVO {
    private String essCode;                      //ESS 코드
    private String autoControlFlag;              //ESS 제어 자동 여부
}