package metis.app.pmsWeb.domain.dcConverterHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DcConverterHistoryVO extends BaseVO {

    private String converterCode;               //컨버터 코드
    private String regDate;                     //등록 일시
    private String operationStatus;             //운전 상태
    private String totalDcPower;                //총 직류 전류
    private String totalCurrent;                //총 전류
    private String convertDcPower;              //변환 직류 전력
    private String dcCurrent;                   //직류 전류
    private String internalTemp;                //함체 내부 온도
    private String warningFlag;                 //경고 여부
    private String faultFlag;                   //결함 여부

    private String searchDate;                  //조회 일자
    private String operationStatusName;         //운전 상태명
}