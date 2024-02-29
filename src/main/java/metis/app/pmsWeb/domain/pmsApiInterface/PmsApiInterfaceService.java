package metis.app.pmsWeb.domain.pmsApiInterface;

import metis.app.pmsWeb.code.GlobalConstants;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary.ChargeDischargeSummaryOutVO;
import metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary.ChargeDischargeSummaryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * PmsApiInterfaceService.java
 *
 * PMS API InterfaceService
 *
 * Created by You-Yeong Jo on 2022/04/12.
 */
@Service
public class PmsApiInterfaceService extends BaseService<ChargeDischargeSummaryVO, String> {

    @Inject
    private PmsApiInterfaceMapper pmsApiInterfaceMapper;

    @Autowired
    private RestTemplate restTemplate = new RestTemplate();

    @Value("${axboot.pmsInterface.host}")
    private String interfaceUrl;

    /**
     * 15분 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    public ChargeDischargeSummaryVO select15ChargeDischargeSummary() {
        return pmsApiInterfaceMapper.select15ChargeDischargeSummary();
    }

    /**
     * 60분 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    public ChargeDischargeSummaryVO select60ChargeDischargeSummary() {
        return pmsApiInterfaceMapper.select60ChargeDischargeSummary();
    }

    /**
     * 하루 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    public ChargeDischargeSummaryVO selectDayChargeDischargeSummary() {
        return pmsApiInterfaceMapper.selectDayChargeDischargeSummary();
    }

    /**
     * 충방전 데이터 SETTING
     * @param summaryResult, period
     * @return
     */
    public void sendSummaryDataToInterface(ChargeDischargeSummaryVO summaryResult, String periodType){
        ChargeDischargeSummaryOutVO summaryVO = new ChargeDischargeSummaryOutVO();
        summaryVO.setEssEquipId(summaryResult.getEssCode());
        summaryVO.setMeteringDt(summaryResult.getRegDate());
        summaryVO.setPeriodType(periodType);
        summaryVO.setPositionFixYn(summaryResult.getPositionFixYn());

        summaryVO.setChargeType("chg");
        summaryVO.setChargeDischargeAmount(summaryResult.getBatteryChargeAmount());
        summaryVO.setAccumulateAmount(summaryResult.getBatteryChargeAccumulateAmount());
        sendDataToInterface(summaryVO);

        summaryVO.setChargeType("dis");
        summaryVO.setChargeDischargeAmount(summaryResult.getBatteryDischargeAmount());
        summaryVO.setAccumulateAmount(summaryResult.getBatteryDischargeAccumulateAmount());
        sendDataToInterface(summaryVO);
    }

    /**
     * Interface로 데이터 전송
     * @param chargeDischargeSummaryOutVO
     * @return
     */
    public Map<String, Object> sendDataToInterface(ChargeDischargeSummaryOutVO chargeDischargeSummaryOutVO) {

        String url = interfaceUrl + GlobalConstants.interfaceChargeDischargeApiUrl;

        Map<String, Object> resultMap = new HashMap<>();
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        url = builder.build().toUri().toString();

        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<ChargeDischargeSummaryOutVO> entity = new HttpEntity<>(chargeDischargeSummaryOutVO, headers);

            ResponseEntity<Object> responseEntity = restTemplate.postForEntity(url, entity, Object.class);
            String result = responseEntity.getBody().toString();

            if(result.contains("FAIL")){
                System.out.println(result);
            }

        } catch (ResourceAccessException e) {
            System.out.println("PMS INTERFACE 통신 실패");
        } catch (HttpServerErrorException e) {
            System.out.println("PMS INTERFACE 에러 " + e.getMessage());
        }
        return resultMap;
    }
}
