package metis.app.pmsWeb.domain.deviceErrorCode;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceErrorCodeMapper extends MyBatisMapper {
    /**
     * 장비 오류 코드 목록 조회
     * @param map
     * @return
     */
    List<DeviceErrorCodeVO>selectDeviceErrorCodeList(Map<String, Object> map);

    /**
     * 장비 오류 코드 목록 개수
     * @param map
     * @return
     */
    int selectDeviceErrorCodeTotalCount(Map<String, Object> map);

    /**
     * 장비 오류 코드 등록 / 수정
     * @param deviceErrorCodeVO
     * @return
     */

    int insert(DeviceErrorCodeVO deviceErrorCodeVO);
    int update(DeviceErrorCodeVO deviceErrorCodeVO);

    /**
     * 장비 오류 개수 가져오기 (장비 오류 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}