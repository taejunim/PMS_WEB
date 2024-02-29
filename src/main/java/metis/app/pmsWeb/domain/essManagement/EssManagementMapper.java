package metis.app.pmsWeb.domain.essManagement;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface EssManagementMapper extends MyBatisMapper {

    /**
     * ESS 목록 조회
     * @return
     */
    EssManagementVO selectEssManagement(Map<String, Object> map);

    /**
     * ESS 정보 수정
     * @return
     */
    int update(EssManagementVO essManagementVO);

    /**
     * ESS 정보 등록
     * @return
     */
    int insert(EssManagementVO essManagementVO);

}