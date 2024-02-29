package metis.app.pmsWeb.domain.pcsStatusHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class PcsStatusHistoryVO extends BaseVO {

    private String pcsCode;                     //PCS 코드
    private String regDate;                     //등록 일시
    private String operationStatus;             //운전 상태
    private String operationModeStatus;         //운전 모드 상태
    private String outputPower;                 //출력 전력
    private String rsLineVoltage;               //계통 R-S 선간전압
    private String stLineVoltage;               //계통 S-T 선간전압
    private String trLineVoltage;               //계통 T-R 선간전압
    private String rPhaseCurrent;               //R상 전류
    private String sPhaseCurrent;               //S상 전류
    private String tPhaseCurrent;               //T상 전류
    private String frequency;                   //계통 주파수
    private String dcLinkVoltage;               //DC-LINK 전압
    private String batteryVoltage;              //배터리 전압
    private String batteryCurrent;              //배터리 전류
    private String igbtTemperature1;            //IGBT 온도 1
    private String igbtTemperature2;            //IGBT 온도 2
    private String igbtTemperature3;            //IGBT 온도 3
    private String acMainMcStatus;              //AC 메인 MC 상태
    private String dcMainMcStatus;              //DC 메인 MC 상태
    private String accumulatedChargeEnergy;     //누적 충전량
    private String accumulatedDischargeEnergy;  //누적 방전량
    private String referencePower;              //기준 전력 값
    private String emergencyStopFlag;           //비상정지 발생 여부
    private String warningFlag;                 //경고 여부
    private String faultFlag;                   //결함 여부
    private String errorFlag;                   //경고/결함 여부
    private String searchDate;                  //조회 일자
}
