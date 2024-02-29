package metis.app.pmsWeb.domain.deviceErrorCode;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class DeviceErrorCodeVO extends BaseVO{

    private String errorCode;                   //오류 코드
    private String errorCodeName;               //오류 코드 명
    private String deviceCategory;              //장비 분류 코드
    private String deviceCategorySub;           //장비 하위 분류 코드
    private String errorType;                   //오류 구분
    private String manufacturerCode;            //제조사 개별 코드
    private String referenceCode;               //참조 코드
    private String remarks;                     //비고
    private String useFlag;                     //사용 여부

    private String essCode;                     //ESS 코드
    private String deviceCategoryName;          //장비 분류 명
    private String deviceCategorySubName;       //장비 하위 분류 명
    private String errorTypeName;               //오류 구분 명
    private String data1;                       //essType

}