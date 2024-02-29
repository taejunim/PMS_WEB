package metis.app.pmsWeb.domain.acConverterHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AcConverterDetailHistoryVO extends BaseVO {

    private String converterCode;               //컨버터 코드
    private String regDate;                     //등록 일시
    private String inverterNo;                  //인버터 번호
    private String modeStatus;                  //모드 상태
    private String inverterStatus;              //인버터 상태
    private String power;                       //전력
    private String totalCurrent;                //총 전류
    private String outputVoltage;               //출력 전압
    private String outputFrequency;             //출력 주파수
    private String gridVoltage;                 //계통 라인 전압
    private String gridFrequency;               //계통 라인 주파수
    private String gridPhaseDifference;         //계통 & 인버터 위상 차
    private String powerFactor;                 //역률
    private String acCurrent;                   //교류 전류
    private String dcVoltage;                   //직류 전압
    private String dcOffset;                    //직류 성분
    private String activeCurrent;               //유효 전류
    private String activeCurrentContrast;       //유효 전류(정격 대비)
    private String reactiveCurrentContrast;     //무효 전류(정격 대비)
    private String stackTemp;                   //인버터 스택 온도
    private String inductor1Temp;               //필터 인덕터 1 온도
    private String inductor2Temp;               //필터 인덕터 2 온도
    private String capacitorTemp;               //필터 커패시터 온도
    private String warningId;                   //경고 ID
    private String faultId;                     //결함 ID
    private String warningFlag;                 //경고 여부
    private String faultFlag;                   //결함 여부

}