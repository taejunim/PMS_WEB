package metis.app.pmsWeb.domain.commandControlHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommandControlHistoryVO extends BaseVO {
    private String startDate;                    //검색 시작 일시
    private String endDate;                      //검색 종료 일시
    private String deviceCode;                   //장비 코드
    private String deviceCodeName;               //장비 구분 코드명
    private String controlCode;                 //제어 코드
    private String controlDate;                 //제어 일시
    private String controlRequestType;          //제어 요청 구분
    private String controlRequestDetailType;    //제어 요청 상세 구분
    private String controlRequestValue;         //제어 요청 값
    private String referenceCode;               //참조 코드
    private String controlCompleteFlag;         //제어 성공 여부
    private String deviceResponseDate;          //장비 응답 일시
    private String controlRequestId;            //제어 요청자 ID
}