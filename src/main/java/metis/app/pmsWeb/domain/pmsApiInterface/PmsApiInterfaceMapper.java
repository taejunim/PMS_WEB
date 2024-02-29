package metis.app.pmsWeb.domain.pmsApiInterface;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.pmsApiInterface.chargeDischargeSummary.ChargeDischargeSummaryVO;
import org.springframework.stereotype.Component;

/**
 * PmsApiInterfaceMapper.java
 *
 * PMS API PmsApiInterfaceMapper
 *
 * Created by You-Yeong Jo on 2022/04/12.
 */
@Component
public interface PmsApiInterfaceMapper extends MyBatisMapper {

    /**
     * 15분 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    ChargeDischargeSummaryVO select15ChargeDischargeSummary();

    /**
     * 60분 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    ChargeDischargeSummaryVO select60ChargeDischargeSummary();

    /**
     * 하루 단위 충방전 SUMMARY DATA
     *
     * @return
     */
    ChargeDischargeSummaryVO selectDayChargeDischargeSummary();
}
