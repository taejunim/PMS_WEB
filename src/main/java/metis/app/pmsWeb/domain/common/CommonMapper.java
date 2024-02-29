package metis.app.pmsWeb.domain.common;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public interface CommonMapper extends MyBatisMapper {

    List<Map<String, Object>> selectQuery(Map<String, Object> map);

    HashMap<String, Object> selectEssInfo();

    int selectLoginUser(String userCd);

    void statusChangeLogout(String userCd);

    void updateLogoutAll();

    void insertLoginUser(String userCd);


    void updateLoginStatus(String userCd);

    DeviceManagementVO selectMwInfo();
}
