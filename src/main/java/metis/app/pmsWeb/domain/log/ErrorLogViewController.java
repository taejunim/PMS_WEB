package metis.app.pmsWeb.domain.log;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ErrorLogViewController extends BaseController {

    @Inject
    private ErrorLogService errorLogService;

    @RequestMapping(value = "/errorLogs", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(RequestParams<ErrorLog> requestParams) {
        //Page<ErrorLog> errorLogPage = errorLogService.findAll(pageable, searchParams);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", errorLogService.get(requestParams));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", errorLogService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    @RequestMapping(value = "/errorLogs/{id}", method = RequestMethod.DELETE, produces = APPLICATION_JSON)
    public ApiResponse delete(@PathVariable(value = "id") Long id) {
        errorLogService.delete(id);
        return ok();
    }

    @RequestMapping(value = "/errorLogs/events/all", method = RequestMethod.DELETE, produces = APPLICATION_JSON)
    public ApiResponse deleteAll() {
        errorLogService.deleteAllLogs();
        return ok();
    }
}
