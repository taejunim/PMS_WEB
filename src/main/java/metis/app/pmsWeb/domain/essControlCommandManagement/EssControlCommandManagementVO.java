package metis.app.pmsWeb.domain.essControlCommandManagement;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EssControlCommandManagementVO extends BaseVO {

    private String essCode;             //ESS 코드
    private String controlCode;         //제어 코드
    private String deviceCode;          //장비 코드
    private String deviceCategorySub;   //장비 하위 분류
    private String deviceName;          //장비 명
    private String controlType;         //제어 구분
    private String controlTypeName;     //제어 구분명
    private String controlValue;        //제어 값
    private String useFlag;             //사용 여부
    private String useFlagName;         //사용 여부
    private String remarks;             //비고
}