package metis.app.pmsWeb.domain.deviceManagement;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.saleCompanyManagement.SaleCompanyManagementVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceManagementMapper extends MyBatisMapper {
    /**
     * 장비 목록 조회
     * @param map
     * @return
     */
    List<DeviceManagementVO>selectDeviceManagementList(Map<String, Object> map);

    /**
     * 장비 목록 개수
     * @param map
     * @return
     */
    int selectDeviceManagementTotalCount(Map<String, Object> map);

    /**
     * 장비 목록 등록 / 수정 / 삭제
     * @param deviceManagementVO
     * @return
     */

    int insert(DeviceManagementVO deviceManagementVO);
    int update(DeviceManagementVO deviceManagementVO);
    int delete(DeviceManagementVO deviceManagementVO);


    /**
     * 장비 구성요소 목록 등록
     * @param list
     * @return
     */
    int insertComponent(Map<String, Object> list);

    /**
     * 장비 구성요소 목록 삭제
     * @param list
     * @return
     */
    int deleteComponent(List<Map<String, Object>> list);

    /**
     * 장비 개수 가져오기 (장비 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();

    String selectDeviceCode (DeviceManagementVO deviceManagementVO);

}