package metis.app.pmsWeb.domain.batteryRackStatusHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class BatteryRackStatusHistoryVO extends BaseVO {
    private String searchDate;                  // 날짜

    private String regDate;                     // 등록일시
    private String rackNo;                      // RACK 번호
    private String operationStatus;             // 운영 상태
    private String operationModeStatus;         // 충방전 상태
    private String userSoc;                     // 사용자 SoC
    private String realSoc;                     // 실제 SoC
    private String soh;                         // SoH
    private String voltage;                     // 렉 전압
    private String currentSensor1;              // 전류 센서1
    private String currentSensor2;              // 전류 센서2
    private String chargeCurrentLimit;          // 충전 전류 한계값
    private String chargePowerLimit;            // 충전 전력 한계값
    private String dischargeCurrentLimit;       // 방전 전류 한계값
    private String dischargePowerLimit;         // 방전 전력 한계값
    private String positiveVoltageResistance;   // 플러스 절연 저항
    private String negativeVoltageResistance;   // 마이너스 절연 저항
    private String positiveMainRelayAction;     // 플러스 메인 릴레이 동작
    private String positiveMainRelayContact;    // 플레스 메인 릴레이 접점
    private String negativeMainRelayAction;     // 마이너스 메인 릴레이 동작
    private String negativeMainRelayContact;    // 마이너스 메인 릴레이 접점
    private String emergencyRelayAction;        // 비상정지 릴레이 동작
    private String emergencyRelayContact;       // 비상정지 릴레이 잡잠
    private String prechargeRelayAction;        // 사전충전 릴레이 동작
    private String warningFault;                // 오류발생
}