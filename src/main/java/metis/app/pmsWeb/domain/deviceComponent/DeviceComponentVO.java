package metis.app.pmsWeb.domain.deviceComponent;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class DeviceComponentVO extends BaseVO{

    private String deviceCode;              //장비 코드
    private String componentNo;             //구성요소번호
    private String componentName;           //구성요소 명
}