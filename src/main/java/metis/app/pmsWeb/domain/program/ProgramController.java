package metis.app.pmsWeb.domain.program;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProgramController extends BaseController {

    @Inject
    private ProgramService programService;

    @RequestMapping(value="programs", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse list(RequestParams<Program> requestParams) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", programService.get(requestParams));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", programService.selectTotalCount());
        return Responses.MapResponse.of(resultMap);
    }

    @RequestMapping(value="programs", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse save(@Valid @RequestBody List<Program> request) {
        programService.saveProgram(request);
        return ok();
    }
}
