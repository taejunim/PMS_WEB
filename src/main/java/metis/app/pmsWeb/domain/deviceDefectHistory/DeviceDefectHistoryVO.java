package metis.app.pmsWeb.domain.deviceDefectHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class DeviceDefectHistoryVO extends BaseVO {

    private String pmsCode;                 //PMS 코드
    private String pmsName;                 //PMS 명
    private String deviceCode;              //장비 코드
    private String deviceName;              //장비 명
    private String deviceDefectDate;        //장비 고장 일자
    private String essCode;                 //장비 코드
    private String defectReason;            //장비 고장 원인
    private String repairContent;           //수리 내용
    private String repairCompleteYn;        //수리 완료 여부
    private String repairCompleteDt;        //수리 완료 일시
    private String createdBy;               //생성자
    private String updatedBy;               //수정자
    private String deviceGbnCode;           //장비 구분 코드
    private String startDate;               //조회 시작 일자
    private String endDate;                 //조회 종료 일자
    private String saleCompanyName;         //판매처 명
    private String saleCompanyManagerName;  //담당자 명
    private String saleCompanyTel;          //사무실 전화번호
}