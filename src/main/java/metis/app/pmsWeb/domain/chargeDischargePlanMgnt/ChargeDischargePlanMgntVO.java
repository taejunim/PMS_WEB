package metis.app.pmsWeb.domain.chargeDischargePlanMgnt;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChargeDischargePlanMgntVO extends BaseVO {

    private String scheduleNo;           // 일정 번호
    private String scheduleStartDate;    // 일정 시작 일자
    private String scheduleEndDate;      // 일정 시작 일자
    private String scheduleType;         // 일정 구분
    private String operationMode;        // 충전 방전 대기
    private String scheduleStartTime;    // 일정 시작 시간
    private String scheduleEndTime;      // 일정 종료 시간
    private String targetUnit;           // 목표 단위
    private String targetAmount;         // 목표량
    private String remarks;              // 비고
    private String scheduleStatus;       // 일정 상태

    private String searchStart;          // 검색 조건 시작 날짜
    private String searchEnd;            // 검색 조건 끝 날짜

    private String rollBackType;         // 롤백 타입
    private String masterUpdatedBy;      // 마스터 테이블 roll back 용
    private String masterUpdatedAt;      // 마스터 테이블 roll back 용
}
