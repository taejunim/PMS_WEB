package metis.app.pmsWeb.domain.dcConverterHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DcConverterDetailHistoryVO extends BaseVO {

    private String converterCode;               //컨버터 코드
    private String regDate;                     //등록 일시
    private String inverterNo;                  //인버터 번호
    private String modeStatus;                  //모드 상태
    private String inverterStatus;              //인버터 상태
    private String power;                       //전력
    private String current;                     //전류
    private String voltage;                     //전압
    private String dcPower;                     //직류 전력
    private String dcCurrent;                   //직류 전류
    private String activeCurrentContrast;       //유효 전류(정격대비)
    private String refActiveCurrentPercentage;  //지령 유효 전류(백분율)
    private String stackTemp;                   //인버터 스택 온도
    private String inductorTemp;                //필터 인덕터 온도
    private String capacitorTemp;               //필터 커패시터 온도
    private String warningId;                   //경고 ID
    private String faultId;                     //결함 ID
    private String warningFlag;                 //경고 여부
    private String faultFlag;                   //결함 여부

}