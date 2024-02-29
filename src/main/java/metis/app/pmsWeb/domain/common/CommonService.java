package metis.app.pmsWeb.domain.common;

import metis.app.pmsWeb.code.GlobalConstants;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommonService extends BaseService {

    @Inject
    public CommonMapper commonMapper;

    public List<Map<String, Object>> selectQuery(Map<String, Object> map) {

        return commonMapper.selectQuery(map);
    }


    public Map<String, Object> selectEssInfo() {

        return commonMapper.selectEssInfo();
    }

    /**
     * 중복 로그인 체크
     * @param userCd 사용자 아이디
     * @return
     */
    public int selectLoginUser(String userCd) {

        return commonMapper.selectLoginUser(userCd);
    }

    /**
     * 로그인 계정 로그아웃 처리
     * @param userCd 사용자 아이디
     * @return
     */
    public void statusChangeLogout(String userCd) {

        commonMapper.statusChangeLogout(userCd);
    }

    /**
     * 전체 로그아웃
     * @return
     */
    public void updateLogoutAll() {

        commonMapper.updateLogoutAll();
    }

    /**
     * 로그인시 로그인 아이디 저장
     * @param userCd 사용자 아이디
     * @return
     */
    public void insertLoginUser(String userCd) {
        commonMapper.insertLoginUser(userCd);
    }


    /**
     * 로그인된 계정 일자 업데이트
     * @param userCd 사용자 아이디
     * @return
     */
    public void updateLoginStatus(String userCd) {
        commonMapper.updateLoginStatus(userCd);
    }

    /**
     * M/W 장비 코드, 구분 가져오기
     * */
    public DeviceManagementVO selectMwInfo() { return commonMapper.selectMwInfo(); }
}
