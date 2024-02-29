package metis.app.pmsWeb.domain.essControlCommandManagement;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.code.CommonCode;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface EssControlCommandManagementMapper extends MyBatisMapper {

    /**
     * ESS 제어 명령어 목록 조회
     * @return
     */
    List<EssControlCommandManagementVO> selectEssControlCommandManagementList(Map<String, Object> map);

    /**
     * ESS 제어 명령어 목록 개수
     * @return
     */
    int selectEssControlCommandManagementTotalList(Map<String, Object> map);

    /**
     * ESS 제어 명령어 정보 수정
     * @return
     */
    int update(EssControlCommandManagementVO essControlCommandManagementVO);

    /**
     * ESS 제어 명령어 정보 등록
     * @return
     */
    int insert(EssControlCommandManagementVO essControlCommandManagementVO);

     /** PMS별 장비 코드 가져오기 (Ajax)
     * @return
     */
    List<EssControlCommandManagementVO> selectDeviceCodes(EssControlCommandManagementVO essControlCommandManagementVO);

     /** PMS / 장비의 명령어 목록 가져오기 (Ajax)
     * @return
     */
    List<CommonCode> selectCommandRequestTypes(EssControlCommandManagementVO essControlCommandManagementVO);

    /**
     * ESS 제어 명령어 개수 가져오기 (ESS 제어 명령어 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();

    /**
     * ESS 제어 명령어 정보 RollBack
     * @return
     */
    int rollBackUpdate(EssControlCommandManagementVO essControlCommandManagementVO);

    /**
     * ESS 제어 명령어 단건 조회
     * @return
     */
    String selectOneCode(Map<String, Object> map);
}