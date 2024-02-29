package metis.app.pmsWeb.domain.airConditionerHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AirConditionerHistoryVO extends BaseVO {
    private String regDate;                 //등록 일시
    private String airConditionerCode ;     //공조장치 코드
    private String deviceName;              //공조장치
    private String deviceCategorySub;       //장비 코드
    private String deviceCategorySubName;   //장비 이름
    private String operationStatus;         //FALUT 여부
    private String operationModeStatus;     //측정 값1
    private String indoorTemperature;       //내부 온도
    private String setTemperature;          //설정 온도
    private String faultExist;              //FALUT 여부

    private String searchDate;            //조회 일자

}