package metis.app.pmsWeb.domain.deviceErrorCode;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeviceErrorCodeService extends BaseService {

    @Inject
    public DeviceErrorCodeMapper deviceErrorCodeMapper;

    /**
     * 장비 오류 코드 목록 조회
     *
     * @param map
     * @return
     */
    public Map<String, Object> selectDeviceErrorCodeList(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();

        //목록 조회
        resultMap.put("list", deviceErrorCodeMapper.selectDeviceErrorCodeList(map));
        //목록 개수 조회
        resultMap.put("page", deviceErrorCodeMapper.selectDeviceErrorCodeTotalCount(map));

        return resultMap;
    }

    /**
     * 장비 오류 코드 등록
     *
     * @param deviceErrorCodeVO
     */
    public void insert(DeviceErrorCodeVO deviceErrorCodeVO) {
        deviceErrorCodeVO.setCreatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceErrorCodeVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceErrorCodeMapper.insert(deviceErrorCodeVO);
    }

    /**
     * 장비 오류 코드 수정
     *
     * @param deviceErrorCodeVO
     */
    public void update(DeviceErrorCodeVO deviceErrorCodeVO) {
        deviceErrorCodeVO.setUpdatedBy(SessionUtils.getCurrentLoginUserCd());
        deviceErrorCodeMapper.update(deviceErrorCodeVO);
    }

    /**
     * 장비 오류 개수 가져오기 (장비 오류 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return deviceErrorCodeMapper.selectTotalCount();
    }
}