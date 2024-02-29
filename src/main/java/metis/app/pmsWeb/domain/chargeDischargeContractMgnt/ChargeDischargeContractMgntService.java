package metis.app.pmsWeb.domain.chargeDischargeContractMgnt;

import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChargeDischargeContractMgntService {

    @Inject
    private ChargeDischargeContractMgntMapper chargeDischargeContractMgntMapper;

    /**
     * 충방전 계약 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectChargeContractInfo (Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeContractMgntMapper.selectChargeContractInfo(map));
        resultMap.put("page", chargeDischargeContractMgntMapper.selectContractInfoTotalCount(map));
        return resultMap;
    }

    /**
     * 충방전 계약 목록 삽입
     * @param chargeDischargeContractMgntVO
     * @return
     */
    public ApiResponse insertContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO, ApiResponse apiResponse) {

        try {

            chargeDischargeContractMgntMapper.insertContractInfo(chargeDischargeContractMgntVO);
        } catch (DataIntegrityViolationException e){

            if(e.getMessage().indexOf("Duplicate") > -1)
                apiResponse.setMessage("primaryKeyError");
        }

        return apiResponse;
    }

    /**
     * 충방전 계약 목록 수정
     * @param chargeDischargeContractMgntVO
     */
    public int updateContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO){
        return chargeDischargeContractMgntMapper.updateContractInfo(chargeDischargeContractMgntVO);
    }

    /**
     * 충방전 계약 목록 삭제
     * @param chargeDischargeContractMgntVO
     */
    public void deleteContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO){

        chargeDischargeContractMgntMapper.deleteContractInfo(chargeDischargeContractMgntVO);
    }

    /**
     * 충방전 대상 목록 조회_모달
     * @param map
     * @return
     */
    public Map<String, Object> selectChargeTargetInfoModal (Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeContractMgntMapper.selectChargeTargetInfoModal(map));
        resultMap.put("page", chargeDischargeContractMgntMapper.selectModalTotalCount(map));
        return resultMap;
    }

    /**
     * 충방전 대상 목록 삽입_모달
     * @param chargeDischargeContractMgntVO
     * @return
     */
    public int insertTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        return chargeDischargeContractMgntMapper.insertTargetInfoModal(chargeDischargeContractMgntVO);
    }

    /**
     * 충방전 대상 목록 수정_모달
     * @param chargeDischargeContractMgntVO
     */
    public int updateTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO){
        return chargeDischargeContractMgntMapper.updateTargetInfoModal(chargeDischargeContractMgntVO);
    }

    /**
     * 충방전 대상 목록 삭제_모달
     * @param chargeDischargeContractMgntVO
     */
    public void deleteTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO){

        chargeDischargeContractMgntMapper.deleteTargetInfoModal(chargeDischargeContractMgntVO);
    }

    /**
     * 모바일 충방전 계약 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectChargeContractInfoForMobile (Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", chargeDischargeContractMgntMapper.selectChargeContractInfoForMobile(map));
        resultMap.put("page", chargeDischargeContractMgntMapper.selectContractInfoTotalCountForMobile(map));
        return resultMap;
    }

    /**
     * 충방전 계약 상세 조회
     * @param chargeDischargeContractMgntVO
     * @return ChargeDischargeContractMgntVO
     */
    public Map<String, Object> selectChargeContractDetailInfoForMobile (ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("chargeDischargeContractMgntVO", chargeDischargeContractMgntMapper.selectChargeContractDetailInfoForMobile(chargeDischargeContractMgntVO));
        return resultMap;
    }

    /**
     * 충방전 계약 이행 여부 수정
     * @param chargeDischargeContractMgntVO
     */
    public int updateContractCompleteYn(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO){
        return chargeDischargeContractMgntMapper.updateContractCompleteYn(chargeDischargeContractMgntVO);
    }
}
