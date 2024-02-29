package metis.app.pmsWeb.domain.chargeDischargeContractMgnt;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChargeDischargeContractMgntVO extends ChargeTargetInfoVO {

    private String essCode;                 //essCode 코드
    private String pmsCode;                 //pms 코드
    private String chargeGbn;               //충방전 구분 코드
    private String chargeGbnName;           //충방전 구분 이름
    private String chargeOption;            //충방전 옵션
    private String chargeAmount;            //충전량
    private String chargeAmountPercent;     //충전량 %
    private String chargeAmountKw;          //충전량 Kw
    private String contractStartDatetime;   //계약 시작 일시
    private String contractEndDatetime;     //계약 종요 일시
    private String realStartDatetime;       //실제 시작 일시
    private String realEndDatetime;         //실제 종료 일시
    private String targetAddress;           //충방전 지점 주소
    private String contractReasonCode;      //계약 사유 코드
    private String contractReasonName;      //계약 사유 이름
    private String contractCompleteYn;      //계약 이행 여부 코드
    private String contractCompleteYnName;  //계약 이행 여부 이름
    private String remark;                  //비고
    private String startDate;               //기간 선택_시작
    private String endDate;                 //기간 선택_종요

    //모바일용
    private int id;                         //ID 식별용 contractStartDatetime
    private String period;                  //기간
    private String contractStartDatetimeId; //시작 일시 ID
    private int chargeTargetSeq;
    private int pageNumber;
    private int pageSize;
    private int controlValue;               //제어 값
    private int rowId;               //목록 Row ID
}
