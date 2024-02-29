package metis.app.pmsWeb.domain.deviceErrorHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeviceErrorHistoryVO extends BaseVO {
    private String errorDate;                    //오류 발생 일시
    private String deviceCode;                   //장비 코드
    private String errorCode;                    //오류 코드
    private String processFlag;                  //처리 여부

    private String essType;                      //ESS 타입
    private String errorType;                    //오류 구분

    private String componentNo;                   //구성요소 번호
    private String processingFlagName;           //배터리 module 번호
    private String deviceName;                   //장비 명
    private String errorCodeName;                //에러 코드 명
    private String errorTypeName;                //에러 타입 명
    private String startDate;                    //검색 시작 일시
    private String endDate;                      //검색 종료 일시
    private int startRow;
    private int pageSize;
}