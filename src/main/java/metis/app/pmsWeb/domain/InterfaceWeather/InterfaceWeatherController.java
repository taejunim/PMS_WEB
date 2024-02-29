package metis.app.pmsWeb.domain.InterfaceWeather;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import metis.app.pmsWeb.code.GlobalConstants;
import metis.app.pmsWeb.utils.CommonCodeUtils;
import metis.app.pmsWeb.utils.DateUtil;
import metis.app.pmsWeb.utils.SessionUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

/**
 * 날씨 정보 CONTROLLER
 */
@Controller
@RequestMapping(value = "/interfaceWeather")
public class InterfaceWeatherController extends BaseController {

    @Inject
    private InterfaceWeatherService interfaceWeatherService;

    final String url = GlobalConstants.weatherApiBaseUrl + GlobalConstants.weatherCurrentPath + "?units=metric&appid=" + GlobalConstants.weatherApiKey;

    /**
     * 날씨 정보 조회
     *
     * @param pageable
     * @param requestParams
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse interfaceWeatherList(Pageable pageable, InterfaceWeatherVO requestParams) {

        Map<String, Object> params = new HashMap<>();
        params.put("startDate", requestParams.getStartDate());
        params.put("endDate", requestParams.getEndDate());
        params.put("startRow", pageable.getPageNumber() * pageable.getPageSize());
        params.put("pageSize", pageable.getPageSize());

        // 리스트 가져오기
        Map<String, Object> resultMap = interfaceWeatherService.selectInterfaceWeatherList(params);
        //페이지 계산
        resultMap.put("page", CommonCodeUtils.setPage(pageable, Integer.parseInt(resultMap.get("page").toString())));
        //테이블에 데이터 있는지 여부 체크
        resultMap.put("totalRowCount", interfaceWeatherService.selectTotalCount());

        return Responses.MapResponse.of(resultMap);
    }


    /**
     * 현재 날씨 조회.
     * js 에서 1분마다 쓰레드로 해당 함수 호출
     *
     * @return
     */
    @RequestMapping(value = "/getCurrentWeather", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.MapResponse getCurrentWeather() {
        return Responses.MapResponse.of(interfaceWeatherService.getCurrentWeather(url));
    }


    /**
     * 한시간 주기로 날씨 데이터 등록
     */
    @Scheduled(cron = "59 0 0/1 * * *")
    public void insertWeather() throws IOException {
        long unixTime = Instant.now().getEpochSecond();

        Map<String, Object> map = new HashMap<>();

        map.put("weatherDate", DateUtil.getTimestampToDate(Long.toString(unixTime), "yyyyMMdd"));
        map.put("weatherTime", DateUtil.getTimestampToDate(Long.toString(unixTime), "HH"));

        interfaceWeatherService.getOneDayWeatherAndInsert(url,map);
    }
}
