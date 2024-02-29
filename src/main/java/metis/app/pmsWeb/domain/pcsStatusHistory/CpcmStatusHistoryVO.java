package metis.app.pmsWeb.domain.pcsStatusHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class CpcmStatusHistoryVO extends BaseVO {

    private String positionFixYn;               //고정형 / 이동형 여부
    private String regDate;                     // 등록 시간
    private String systemLinkStatus;            // 운영 상태
    private String avgInverterOutUCurr;         // 평균 인버터 출력단 U상 전류
    private String avgInverterOutVCurr;         // 평균 인버터 출력단 V상 전류
    private String avgInverterOutWCurr;         // 평균 인버터 출력단 W상 전류
    private String maxInverterStackTemp;        // 최고 인버터 스택 온도
    private String minInverterStackTemp;        // 최저 인버터 스택 온도
    private String maxFilterITemp;              // 최고 필터 인버터 온도
    private String minFilterITemp;              // 최저 필터 인버터 온도
    private String maxFilterCTemp;              // 최고 필터 캐퍼시터 온도
    private String minFilterCTemp;              // 최저 필터 캐퍼시터 온도
    private String maxPcsInsideTemp;            // 최고 PCS 내부 온도
    private String minPcsInsideTemp;            // 최저 PCS 내부 온도
     private String avgRSVolt;                  // 평균 R-S 전압
    private String avgSTVolt;                   // 평균 S-T 전압
    private String avgTRVolt;                   // 평균 T-R 전압

    private String pmsCode;                     // pms 코드
    private String startDate;                   // 기간선택_시작
    private String endDate;                     // 기간선택_종료
}
