package metis.app.pmsWeb.domain.chargeDischargeContractMgnt;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ChargeDischargeContractMgntMapper extends MyBatisMapper {

    /**
     * 충방전 계약 목록 조회
     * @param map
     * @return
     */
    List<ChargeDischargeContractMgntVO> selectChargeContractInfo(Map<String, Object> map);

    /**
     * 충방전 계약 목록 개수
     * @param map
     * @return
     */
    int selectContractInfoTotalCount(Map<String, Object> map);

    /**
     * 충방전 계약 목록 삽입 / 수정 / 삭제
     * @return
     */
    int insertContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);
    int updateContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);
    int deleteContractInfo(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);

    /**
     * 모달_충방전 대상 목록 조회
     * @param map
     * @return
     */
    List<ChargeDischargeContractMgntVO> selectChargeTargetInfoModal(Map<String, Object> map);

    /**
     * 모달_충방전 대상 목록 개수
     * @param map
     * @return
     */
    int selectModalTotalCount(Map<String, Object> map);

    /**
     * 모달_충방전 대상 목록 삽입 / 수정 / 삭제
     * @return
     */
    int insertTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);
    int updateTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);
    int deleteTargetInfoModal(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);

    /**
     * 모바일 충방전 계약 목록 조회
     * @param map
     * @return
     */
    List<ChargeDischargeContractMgntVO> selectChargeContractInfoForMobile(Map<String, Object> map);

    /**
     * 모바일 충방전 계약 목록 개수
     * @param map
     * @return
     */
    int selectContractInfoTotalCountForMobile(Map<String, Object> map);

    /**
     * 모바일 충방전 계약 상세 조회
     * @param chargeDischargeContractMgntVO
     * @return ChargeDischargeContractMgntVO
     */
    ChargeDischargeContractMgntVO selectChargeContractDetailInfoForMobile(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);

    /**
     * 충방전 계약 이행 여부 수정
     * @param chargeDischargeContractMgntVO
     * @return
     */
    int updateContractCompleteYn(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO);
}
