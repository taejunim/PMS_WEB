package metis.app.pmsWeb.domain.commandControlHistory;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/commandControlHistory")
public class CommandControlHistoryController extends BaseController {

    @Inject
    private CommandControlHistoryService commandControlHistoryService;

    /**
     * ESS 제어 명령어 이력 조회
     * @param
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(Pageable pageable, CommandControlHistoryVO commandControlHistoryVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("startDate", commandControlHistoryVO.getStartDate());
        params.put("endDate", commandControlHistoryVO.getEndDate());
        params.put("deviceCode", commandControlHistoryVO.getDeviceCode());
        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());
        Map<String, Object> resultMap = commandControlHistoryService.selectCommandControlHistoryList(params);
        // 페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", commandControlHistoryService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }

    /**
     * ESS 제어 명령어 이력 정보 등록
     * @param commandControlHistoryVO
     * @return
     */
    @RequestMapping(value = "/insert", method = {RequestMethod.POST}, produces = APPLICATION_JSON)
    public ApiResponse insert(@RequestBody CommandControlHistoryVO commandControlHistoryVO) {
        commandControlHistoryVO.setControlRequestId(SessionUtils.getCurrentLoginUserCd());
        commandControlHistoryService.insert(commandControlHistoryVO);
        return ok();
    }
}