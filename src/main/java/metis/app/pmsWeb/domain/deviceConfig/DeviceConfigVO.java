package metis.app.pmsWeb.domain.deviceConfig;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

import java.time.Instant;

@Data
public class DeviceConfigVO extends BaseVO{

    private String configCode;             //설정 코드
    private String deviceCode;             //장비 코드
    private String configType;             //설정 구분
    private String configName;             //설정 명
    private String minSetValue;            //최소 설정값
    private String maxSetValue;            //최대 설정값
    private String configDescription;      //설정 설명

    private String essCode;                 //ESS 코드
    private String deviceName;              //장비 명
    private String configTypeName;          //설정 구분 명
    private String deviceCategory;          //장비 분류
    private String deviceCategorySub;       //장비 하위 분류
    private String deviceCategoryName;      //장비 분류 명
    private String deviceCategorySubName;   //장비 하위 분류 명
}
