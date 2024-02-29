package metis.app.pmsWeb.domain.commandControlHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Service
public class CommandControlHistoryService extends BaseService<CommandControlHistoryVO, String> {

    @Inject
    private CommandControlHistoryMapper commandControlHistoryMapper;

    /**
     * ESS 제어 명령어 이력 조회
     * @param
     * @return
     */
    public Map<String, Object> selectCommandControlHistoryList(Map<String,Object> map) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", commandControlHistoryMapper.selectCommandControlHistoryList(map));
        resultMap.put("page", commandControlHistoryMapper.selectCommandControlHistoryTotalList(map));
        return resultMap;
    }

    /**
     * ESS 제어 명령어 이력 정보 등록
     * @param commandControlHistoryVO
     * @return
     */
    public int insert(CommandControlHistoryVO commandControlHistoryVO){

        return commandControlHistoryMapper.insert(commandControlHistoryVO);
    }

    /**
     * ESS 제어 명령어 개수 가져오기 (ESS 제어 명령어 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return commandControlHistoryMapper.selectTotalCount();
    }
}