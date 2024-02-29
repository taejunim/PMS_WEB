package metis.app.pmsWeb.domain.deviceComponent;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceComponentMapper extends MyBatisMapper {
    /**
     * 장비 구성요소 목록 조회
     * @param map
     * @return
     */
    List<DeviceComponentVO>selectDeviceComponentList(Map<String, Object> map);

    /**
     * 장비 구성요소 목록 개수
     * @param map
     * @return
     */
    int selectDeviceComponentTotalCount(Map<String, Object> map);

    /**
     * 장비 구성요소 목록 등록
     * @param list
     * @return
     */
    int insert(Map<String, Object> list);

    /**
     * 장비 구성요소 수정
     * @param list
     * @return
     */
    int update(Map<String, Object> list);

    /**
     * 장비 구성요소 삭제
     * @param deviceComponentVO
     * @return
     */
    int delete(DeviceComponentVO deviceComponentVO);


    /**
     * 장비 개수 가져오기 (장비 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}