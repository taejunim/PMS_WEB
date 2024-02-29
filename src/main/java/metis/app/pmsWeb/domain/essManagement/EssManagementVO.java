package metis.app.pmsWeb.domain.essManagement;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EssManagementVO extends BaseVO {

    private String essCode;                     //ESS 코드
    private String essName;                     //ESS 명
    private String essType;                     //ESS 유형
    private String contractPower;               //계약 전력(kWh)
    private String totalBatteryEnergy;          //총 배터리 용량(kWh)
    private String totalCharge;                 //총 누적 충전량(kWh)
    private String totalDischarge;              //총 누적 방전량(kWh)
    private String energyUpdatedDate;           //전력량 갱신 일시
    private String locationAddress;             //위치 주소
    private String latitude;                    //위도
    private String longitude;                   //경도
    private String autoControlFlag;             //자동 제어 여부
    private String updatedDate;                 //수정 일시

}