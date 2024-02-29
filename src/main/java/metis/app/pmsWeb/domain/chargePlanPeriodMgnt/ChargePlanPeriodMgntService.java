package metis.app.pmsWeb.domain.chargePlanPeriodMgnt;

import com.chequer.axboot.core.api.response.ApiResponse;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.batteryRackStatusHistory.BatteryRackStatusHistoryVO;
import metis.app.pmsWeb.utils.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChargePlanPeriodMgntService extends BaseService<BatteryRackStatusHistoryVO, String> {
    @Inject
    private ChargePlanPeriodMgntMapper chargePlanPeriodMgntMapper;

    /**
     * 기간별 충방전 계획 목록 조회
     *
     * @param map
     * @return
     */
    public Map<String, Object> selectChargePlanPeriodMgnt(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargePlanPeriodMgntMapper.selectChargePlanPeriodMgnt(map));
        return resultMap;
    }

    /**
     * 충방전 계획 상세 목록 조회
     *
     * @param map
     * @return
     */
    public Map<String, Object> selectChargeDischargePlanDetail(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargePlanPeriodMgntMapper.selectChargeDischargePlanDetail(map));
        return resultMap;
    }

    /**
     * 충방전 계획 상세 정보 저장
     *
     * @param chargePlanPeriodMgntVO
     */
    @Transactional
    public ApiResponse insertChargeDischargePlanDetail(List<ChargePlanPeriodMgntVO> chargePlanPeriodMgntVO) {
        ApiResponse apiResponse = new ApiResponse();

        Map<String, Object> hashMap = new HashMap<>();

        if(!DateUtil.getNowMonthEqualsDate("yyyyMMdd", chargePlanPeriodMgntVO.get(0).getPlanChargeDischargeDate().replaceAll("-", ""))) {

            apiResponse.setStatus(-500);
            apiResponse.setMessage("과거의 충방전 계획 데이터를 수정, 삭제, 신규 등록을 할 수 없습니다.");

            return apiResponse;
        }

        for (int i = 0; i < chargePlanPeriodMgntVO.size(); i++) {

            String planChargeDischargeDate  = chargePlanPeriodMgntVO.get(i).getPlanChargeDischargeDate();   //일자
            String chargeDischargeGbn       = chargePlanPeriodMgntVO.get(i).getChargeDisChargeGbn();        //충방전 구분
            String planStartTime            = chargePlanPeriodMgntVO.get(i).getPlanStartTime();             //시작시간
            float  chargeDischargeAmount    = chargePlanPeriodMgntVO.get(i).getChargeDischargeAmount();     //충방전량
            String planSeq                  = chargePlanPeriodMgntVO.get(i).getPlanSeq();                   //일자별 계획 시퀀스
            String essCode                  = chargePlanPeriodMgntVO.get(i).getEssCode();                   //essCode

            boolean isDeleted = chargePlanPeriodMgntVO.get(i).isDeleted();

            // 삭제 데이터
            if (isDeleted) {

                Map<String, Object> params;


                params = new HashMap<>();

                params.put("planChargeDischargeDate", planChargeDischargeDate);     //일자
                params.put("essCode", essCode);                                     //essCode
                params.put("planSeq", planSeq);                                     //일자별 계획 시퀀스

                if (chargeDischargeGbn.equals("충전")) {
                    chargePlanPeriodMgntMapper.deleteChargePlanDetail(params);
                } else {
                    chargePlanPeriodMgntMapper.deleteDischargePlanDetail(params);
                }

                apiResponse.setStatus(200);
                apiResponse.setMessage("SUCCESS");

            }
            //수정 또는 삽입
            else {

                hashMap.put("planChargeDischargeDate", planChargeDischargeDate);    //일자
                hashMap.put("essCode", essCode);                                    //essCode
                hashMap.put("planStartTime", planStartTime);                        //시작시간

                //가존에 같은 정보가 있는 지 확인
                int sameDataCount = chargePlanPeriodMgntMapper.isExistSameDataYn(hashMap);

                if (sameDataCount > 0 && (planSeq == null || planSeq.equals(""))) {

                    apiResponse.setStatus(-500);
                    apiResponse.setMessage("같은 시간대에 충전 또는 방전 계획이 존재합니다.");

                } else {

                    Map<String, Object> dateMap;

                    List<Map<String, Object>> dataList = new ArrayList<>();

                    Map<String, Object> tempMap;

                    tempMap = new HashMap<>();


                    dateMap = new HashMap<>();

                    dateMap.put("planChargeDischargeDate", chargePlanPeriodMgntVO.get(i).getPlanChargeDischargeDate()); //일자
                    dateMap.put("chargeDischargeAmount", chargeDischargeAmount);                                        //충방전량
                    dateMap.put("essCode", essCode);                                                                    //essCode
                    dateMap.put("planSeq", planSeq);                                                                    //일자별 계획 시퀀스
                    dateMap.put("planStartTime", planStartTime);                                                        //시작시간
                    dateMap.put("useYn", chargePlanPeriodMgntVO.get(i).getUseYn());                                     //사용 여부

                    dataList.add(dateMap);

                    tempMap.put("dataList", dataList);

                    if (chargeDischargeGbn.equals("충전")) {
                        chargePlanPeriodMgntMapper.insertChargePlanDetail(tempMap);
                    } else {
                        chargePlanPeriodMgntMapper.insertDischargePlanDetail(tempMap);
                    }

                    apiResponse.setStatus(200);
                    apiResponse.setMessage("SUCCESS");
                }
            }
        }
        return apiResponse;
    }

    /**
     * 충방전 계획 개수 가져오기 (충방전 계획 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCountMgnt(){

        return chargePlanPeriodMgntMapper.selectTotalCountMgnt();
    }

    /**
     * 충방전 계획 상세 개수 가져오기 (충방전 계획 상세 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCountDetail(){

        return chargePlanPeriodMgntMapper.selectTotalCountDetail();
    }
}
