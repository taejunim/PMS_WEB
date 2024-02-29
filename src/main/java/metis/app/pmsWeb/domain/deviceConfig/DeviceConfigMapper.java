package metis.app.pmsWeb.domain.deviceConfig;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.essControlCommandManagement.EssControlCommandManagementVO;
import metis.app.pmsWeb.domain.essManagement.EssManagementVO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface DeviceConfigMapper extends MyBatisMapper {

    /**
     * 환경설정 목록 조회
     * @param map
     * @return
     */
    List<DeviceConfigVO> selectDeviceConfig(Map<String, Object> map);

    /**
     * 환경설정 목록 개수
     * @param map
     * @return
     */
    int selectTotalCount(Map<String, Object> map);

    /**
     * 환경설정 정보 수정
     * @return
     */
    int update(DeviceConfigVO deviceConfigVO);

    /**
     * 환경설정 정보 등록
     * @return
     */
    int insert(DeviceConfigVO deviceConfigVO);

    /**
     * 환경설정 정보 삭제
     * @return
     */
    int delete(DeviceConfigVO deviceConfigVO);

    /** 장비 코드 가져오기 (Ajax)
     * @return
     */
    List<DeviceConfigVO> selectDeviceCodes(DeviceConfigVO deviceConfigVO);

    /**
     * 환경설정 개수 가져오기 (환경설정 테이블 전체 Row 개수)
     * @return
     */
    int totalRowCount();

    /**
     * 동일한 환경설정 존재 확인
     * @return
     */
    int selectConfigExist(DeviceConfigVO deviceConfigVO);

    /**
     * 환경설정 정보 RollBack
     * @return
     */
    int rollBackUpdate(DeviceConfigVO deviceConfigVO);
}
