package metis.app.pmsWeb.domain.essControlCommandManagement;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.code.CommonCode;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EssControlCommandManagementService extends BaseService<EssControlCommandManagementVO, String> {

    @Inject
    private EssControlCommandManagementMapper essControlCommandManagementMapper;

    /**
     * ESS 제어 명령어 목록 조회
     * @param
     * @return
     */
    public Map<String, Object> selectEssControlCommandManagementList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", essControlCommandManagementMapper.selectEssControlCommandManagementList(map));
        resultMap.put("page", essControlCommandManagementMapper.selectEssControlCommandManagementTotalList(map));
        return resultMap;
    }

    /**
     * ESS 제어 명령어 정보 등록
     * @param essControlCommandManagementVO
     * @return
     */
    public int insert(EssControlCommandManagementVO essControlCommandManagementVO) {

        return essControlCommandManagementMapper.insert(essControlCommandManagementVO);
    }

    /**
     * ESS 제어 명령어 정보 수정
     * @return
     */
    public int update(EssControlCommandManagementVO essControlCommandManagementVO){

        return essControlCommandManagementMapper.update(essControlCommandManagementVO);
    }

    /**
     * PMS별 장비 코드 가져오기 (Ajax)
     * @return
     */
    public List<EssControlCommandManagementVO> selectDeviceCodes(EssControlCommandManagementVO essControlCommandManagementVO){

        return essControlCommandManagementMapper.selectDeviceCodes(essControlCommandManagementVO);
    }

    /**
     *  PMS / 장비의 명령어 목록 가져오기 (Ajax)
     * @return
     */
    public List<CommonCode> selectCommandRequestTypes(EssControlCommandManagementVO essControlCommandManagementVO){

        return essControlCommandManagementMapper.selectCommandRequestTypes(essControlCommandManagementVO);
    }

    /**
     * ESS 제어 명령어 개수 가져오기 (ESS 제어 명령어 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return essControlCommandManagementMapper.selectTotalCount();
    }

    /**
     * ESS 제어 명령어 정보 RollBack
     * @return
     */
    public int rollBackUpdate(EssControlCommandManagementVO essControlCommandManagementVO){

        return essControlCommandManagementMapper.rollBackUpdate(essControlCommandManagementVO);
    }

    /**
     * ESS 제어 명령어 코드 가져오기 (단건)
     * @return
     */
    public String selectOne(Map<String, Object> map){

        return essControlCommandManagementMapper.selectOneCode(map);
    }
}