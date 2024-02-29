package metis.app.pmsWeb.domain.deviceManagement;

import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.stereotype.Service;
import metis.app.pmsWeb.domain.BaseService;

import javax.inject.Inject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DeviceManagementService extends BaseService {

    @Inject
    public DeviceManagementMapper deviceManagementMapper;

    /**
     * 장비 목록 조회
     *
     * @param map
     * @return
     */
    public Map<String, Object> selectDeviceManagementList(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();

        //목록 조회
        resultMap.put("list", deviceManagementMapper.selectDeviceManagementList(map));
        //목록 개수 조회
        resultMap.put("page", deviceManagementMapper.selectDeviceManagementTotalCount(map));

        return resultMap;
    }

    /**
     * 장비 목록 등록
     *
     * @param deviceManagementVO
     */
    public void insert(DeviceManagementVO deviceManagementVO) {
        String deviceCode = deviceManagementMapper.selectDeviceCode(deviceManagementVO);
        deviceManagementVO.setDeviceCode(deviceCode);

        deviceManagementVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceManagementVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        int success = deviceManagementMapper.insert(deviceManagementVO);

        if (success == 1) {
            if("01".equals(deviceManagementVO.getDeviceCategory()) || "03".equals(deviceManagementVO.getDeviceCategory())) { //장비 등록 성공 후 component insert
                if (deviceManagementVO.getList() != null && deviceManagementVO.getList().size() > 0) {

                    Map<String, Object> resultMap = new HashMap<>();

                    resultMap.put("list", deviceManagementVO.getList());
                    resultMap.put("deviceCode", deviceCode);
                    resultMap.put("createdBy", SessionUtils.getCurrentLoginUserCd());
                    resultMap.put("updatedBy", SessionUtils.getCurrentLoginUserCd());

                    deviceManagementMapper.insertComponent(resultMap);
                }
            }
        }
    }

    /**
     * 장비 목록 수정
     *
     * @param deviceManagementVO
     */
    public void update(DeviceManagementVO deviceManagementVO) {
        deviceManagementMapper.update(deviceManagementVO);
    }

    /**
     * 장비 목록 삭제
     *
     * @param deviceManagementVO
     */
    public void delete(DeviceManagementVO deviceManagementVO) {
        int success = 1;

        if (deviceManagementVO.getList() != null && deviceManagementVO.getList().size() > 0) {
            if("01".equals(deviceManagementVO.getDeviceCategory()) || "03".equals(deviceManagementVO.getDeviceCategory())) { //장비 삭제 시 component delete
                success = deviceManagementMapper.deleteComponent(deviceManagementVO.getList());
            }
        }

        if (success == 1) {
            deviceManagementMapper.delete(deviceManagementVO);
        }
    }

    /**
     * 장비 개수 가져오기 (장비 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return deviceManagementMapper.selectTotalCount();
    }


}