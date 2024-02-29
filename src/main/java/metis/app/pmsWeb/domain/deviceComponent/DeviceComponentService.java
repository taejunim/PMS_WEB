package metis.app.pmsWeb.domain.deviceComponent;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementMapper;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeviceComponentService extends BaseService {

    @Inject
    public DeviceComponentMapper deviceComponentMapper;

    /**
     * 장비 구성요소 목록 조회
     *
     * @param map
     * @return
     */
    public Map<String, Object> selectDeviceComponentList(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();

        //목록 조회
        resultMap.put("list", deviceComponentMapper.selectDeviceComponentList(map));
        //목록 개수 조회
        resultMap.put("page", deviceComponentMapper.selectDeviceComponentTotalCount(map));

        return resultMap;
    }

    /**
     * 장비 구성요소 목록 등록
     *
     * @param list
     */
    public void insert(Map<String, Object> list) {
        deviceComponentMapper.insert(list);
    }

    /**
     * 장비 구성요소 목록 수정
     *
     * @param list
     */
    public void update(Map<String, Object> list) {
        deviceComponentMapper.update(list);
    }

    /**
     * 장비 구성요소 목록 삭제
     *
     * @param deviceComponentVO
     */
    public void delete(DeviceComponentVO deviceComponentVO) {

        deviceComponentMapper.delete(deviceComponentVO);
    }

    /**
     * 장비 구성요소 개수 가져오기 (장비 구성요소 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return deviceComponentMapper.selectTotalCount();
    }
}