package metis.app.pmsWeb.domain.deviceManagement;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DeviceManagementVO extends BaseVO{

    private String deviceCode;              //장비 코드
    private String essCode;                 //ESS 코드
    private String deviceNo;                //장비 번호
    private String deviceName;              //장비 명
    private String deviceCategory;          //장비 분류 코드
    private String deviceCategorySub;       //장비 하위 분류 코드
    private String deviceRoom;              //장비 위치 코드
    private String manufacturerName;        //제조사 명
    private String modelNo;                 //모델 번호
    private String modelName;               //모델 명
    private String serialNo;                //시리얼 번호
    private String deviceSpec;              //스펙
    private String remarks;                 //비고
    private String controlFlag;             //제어 가능 여부
    private String useFlag;                 //사용 여부


    private String deviceCategoryName;      //장비 분류 명
    private String deviceCategorySubName;   //장비 하위 분류 명
    private String deviceRoomName;          //장비 위치 명

    private String groupCd;                 //코드
    private String componentNo;             //구성요소번호
    private String componentName;           //구성요소명

    private List<Map<String,Object>> list;
}