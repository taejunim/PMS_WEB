package metis.app.pmsWeb.domain.deviceConfig;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.deviceDefectHistory.DeviceDefectHistoryVO;
import metis.app.pmsWeb.domain.essControlCommandManagement.EssControlCommandManagementVO;
import metis.app.pmsWeb.domain.essManagement.EssManagementVO;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DeviceConfigService extends BaseService<DeviceDefectHistoryVO, String> {

    @Inject
    private DeviceConfigMapper deviceConfigMapper;

    /**
     * 환경설정 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectDeviceConfig(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", deviceConfigMapper.selectDeviceConfig(map));
        resultMap.put("page", deviceConfigMapper.selectTotalCount(map));
        return resultMap;
    }

    /**
     * 환경설정 정보 등록
     * @param deviceConfigVO
     * @return
     */
    public int insert(DeviceConfigVO deviceConfigVO){
        int result = 0;
        if(deviceConfigMapper.selectConfigExist(deviceConfigVO) == 0)
            result = deviceConfigMapper.insert(deviceConfigVO);
        
        return result;
    }

    /**
     * 환경설정 정보 수정
     * @return
     */
    public int update(DeviceConfigVO deviceConfigVO){

        return deviceConfigMapper.update(deviceConfigVO);
    }

    /**
     * 환경설정 정보 삭제
     * @param deviceConfigVO
     */
    public void delete(DeviceConfigVO deviceConfigVO){

        deviceConfigMapper.delete(deviceConfigVO);
    }

    /**
     * 장비 코드 가져오기 (Ajax)
     * @return
     */
    public List<DeviceConfigVO> selectDeviceCodes(DeviceConfigVO deviceConfigVO){

        return deviceConfigMapper.selectDeviceCodes(deviceConfigVO);
    }

    /**
     * 환경설정 개수 가져오기 (환경설정 테이블 전체 Row 개수)
     * @return
     */
    public int totalRowCount(){

        return deviceConfigMapper.totalRowCount();
    }

    /**
     * 환경설정 정보 RollBack
     * @return
     */
    public int rollBackUpdate(DeviceConfigVO deviceConfigVO){

        return deviceConfigMapper.rollBackUpdate(deviceConfigVO);
    }

}
