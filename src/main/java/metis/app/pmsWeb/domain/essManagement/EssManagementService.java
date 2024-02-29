package metis.app.pmsWeb.domain.essManagement;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Service
public class EssManagementService extends BaseService<EssManagementVO, String> {

    @Inject
    private EssManagementMapper essManagementMapper;

    /**
     * ESS 목록 조회
     * @param
     * @return
     */
    public Map<String, Object> selectEssManagement(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list",essManagementMapper.selectEssManagement(map));
        return resultMap;
    }

    /**
     * ESS 정보 등록
     * @param essManagementVO
     * @return
     */
    public int insert(EssManagementVO essManagementVO){

        return essManagementMapper.insert(essManagementVO);
    }

    /**
     * ESS 정보 수정
     * @return
     */
    public int update(EssManagementVO essManagementVO){

        return essManagementMapper.update(essManagementVO);
    }

}