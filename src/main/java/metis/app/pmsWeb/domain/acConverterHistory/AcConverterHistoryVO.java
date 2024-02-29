package metis.app.pmsWeb.domain.acConverterHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AcConverterHistoryVO extends BaseVO {

    private String converterCode;               //컨버터 코드
    private String regDate;                     //등록 일시
    private String operationStatus;             //운전 상태
    private String operationModeStatus;         //운전 모드 상태
    private String totalActiveCurrent;          //총 계통 유효 전류
    private String totalVoltage;                //총 계통 전압
    private String totalPower;                  //총 계통 전력
    private String internalTemp;                //함체 내부 온도
    private String transformerTemp;             //교류 변압기 온도
    private String warningFlag;                 //경고 여부
    private String faultFlag;                   //결함 여부

    private String searchDate;                  //조회 일자
    private String operationStatusName;         //운전 상태명
    private String operationModeStatusName;     //운전 모드명


}