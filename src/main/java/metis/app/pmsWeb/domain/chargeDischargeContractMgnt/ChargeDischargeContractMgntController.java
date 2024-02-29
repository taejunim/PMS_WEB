package metis.app.pmsWeb.domain.chargeDischargeContractMgnt;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * 충반전 계약 관리 CONTROLLER
 */
@Controller
@RequestMapping(value = "/chargeDischargeContractMgnt")
public class ChargeDischargeContractMgntController extends BaseController {

    @Inject
    private ChargeDischargeContractMgntService chargeDischargeContractMgntService;

    /**
     * 충방전 계약 목록 조회
     *
     * @param pageable
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/selectChargeContractInfo", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectChargeContractInfo(Pageable pageable, ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("pmsCode", chargeDischargeContractMgntVO.getPmsCode());        //pms 코드
        params.put("chargeGbn", chargeDischargeContractMgntVO.getChargeGbn());    //충방전 구분
        params.put("startDate", chargeDischargeContractMgntVO.getStartDate());    //기간 선택_시작
        params.put("endDate", chargeDischargeContractMgntVO.getEndDate());        //기간 선택_종료

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = chargeDischargeContractMgntService.selectChargeContractInfo(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충방전 계약 목록 삽입
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/insertContractInfo", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insertContractInfo(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        ApiResponse apiResponse = ok();
        chargeDischargeContractMgntVO.setEssCode(SessionUtils.getSessionUser().getEssCode());
        chargeDischargeContractMgntVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());

        apiResponse = chargeDischargeContractMgntService.insertContractInfo(chargeDischargeContractMgntVO, apiResponse);

        return apiResponse;
    }

    /**
     * 충방전 계약 목록 수정
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/updateContractInfo", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse updateContractInfo(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        chargeDischargeContractMgntService.updateContractInfo(chargeDischargeContractMgntVO);

        return ok();
    }

    /**
     * 충방전 계 목록 삭제
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/deleteContractInfo", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse deleteContractInfo(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        chargeDischargeContractMgntService.deleteContractInfo(chargeDischargeContractMgntVO);

        return ok();
    }

    /**
     * 충방전 대상 목록 조회_모달
     *
     * @param pageable
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectChargeDischargeHistory(Pageable pageable, ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("targetName", chargeDischargeContractMgntVO.getTargetName());        //충방전 대상
        params.put("useYn", chargeDischargeContractMgntVO.getUseYn());                  //사용 여부

        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        Map<String, Object> resultMap = chargeDischargeContractMgntService.selectChargeTargetInfoModal(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충방전 대상 목록 삽입_모달
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/insertTargetInfoModal", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse insertTargetInfoModal(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        ApiResponse apiResponse = ok();
        try {
            chargeDischargeContractMgntService.insertTargetInfoModal(chargeDischargeContractMgntVO);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().indexOf("Duplicate") > -1)
                apiResponse.setMessage("primaryKeyError");
        }
        return apiResponse;
    }

    /**
     * 충방전 대상 목록 수정_모달
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/updateTargetInfoModal", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse updateTargetInfoModal(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        chargeDischargeContractMgntService.updateTargetInfoModal(chargeDischargeContractMgntVO);

        return ok();
    }

    /**
     * 충방전 대상 목록 삭제_모달
     *
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/deleteTargetInfoModal", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse deleteTargetInfoModal(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        chargeDischargeContractMgntService.deleteTargetInfoModal(chargeDischargeContractMgntVO);

        return ok();
    }

    /**
     * 충방전 계약 목록 조회
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/selectChargeContractInfoForMobile", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectChargeContractInfoForMobile(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("pmsCode", chargeDischargeContractMgntVO.getPmsCode());        //pms 코드
        params.put("period", chargeDischargeContractMgntVO.getPeriod());        //기간

        params.put("startRow", chargeDischargeContractMgntVO.getPageNumber() * chargeDischargeContractMgntVO.getPageSize());
        params.put("pageSize", chargeDischargeContractMgntVO.getPageSize());

        Map<String, Object> resultMap = chargeDischargeContractMgntService.selectChargeContractInfoForMobile(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(chargeDischargeContractMgntVO.getPageNumber(), chargeDischargeContractMgntVO.getPageSize() , Integer.parseInt(resultMap.get("page").toString())));

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충방전 계약 상세 조회
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/selectChargeContractDetailInfoForMobile", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse selectChargeContractDetailInfoForMobile(ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        Map<String, Object> resultMap = chargeDischargeContractMgntService.selectChargeContractDetailInfoForMobile(chargeDischargeContractMgntVO);

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * 충방전 계약 이행 여부 수정
     * @param chargeDischargeContractMgntVO
     * @return
     */
    @RequestMapping(value = "/updateContractCompleteYn", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse updateContractCompleteYn(@RequestBody ChargeDischargeContractMgntVO chargeDischargeContractMgntVO) {

        chargeDischargeContractMgntService.updateContractCompleteYn(chargeDischargeContractMgntVO);

        return ok();
    }
}
