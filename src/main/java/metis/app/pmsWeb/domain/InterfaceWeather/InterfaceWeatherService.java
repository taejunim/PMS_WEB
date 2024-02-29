package metis.app.pmsWeb.domain.InterfaceWeather;

import metis.app.pmsWeb.code.GlobalConstants;
import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.code.CommonCodeService;
import metis.app.pmsWeb.domain.common.CommonService;
import metis.app.pmsWeb.utils.DateUtil;
import metis.app.pmsWeb.utils.SessionUtils;
import org.apache.commons.io.output.FileWriterWithEncoding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.inject.Inject;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InterfaceWeatherService extends BaseService<InterfaceWeatherVO, String> {

    @Inject
    public InterfaceWeatherMapper interfaceWeatherMapper;

    @Inject
    public CommonService commonService;

    @Inject
    private CommonCodeService commonCodeService;

    @Autowired
    private RestTemplate restTemplate = new RestTemplate();


    /**
     * 지역별 날씨 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object> selectInterfaceWeatherList(Map<String, Object> map) {

        Map<String, Object> resultMap = new HashMap<>();

        //목록 조회
        resultMap.put("list", interfaceWeatherMapper.selectInterfaceWeatherList(map));
        //목록 개수 조회
        resultMap.put("page", interfaceWeatherMapper.selectInterfaceWeatherTotalCount(map));
        return resultMap;
    }

    /**
     * 현재 날씨 정보 조회
     * @param url
     * @return
     */
    public Map<String, Object> getCurrentWeather(String url) {

        Map<String, Object> resultMap = new HashMap<>();

        if(SessionUtils.getSessionUser().getLatitude() == null & SessionUtils.getSessionUser().getLongitude() == null) {
            url = GlobalConstants.weatherApiBaseUrl + GlobalConstants.weatherCurrentPath + "?q=Jeju City&appid=" + GlobalConstants.weatherApiKey;
        } else {
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                    .queryParam("lat", SessionUtils.getSessionUser().getLatitude())
                    .queryParam("lon", SessionUtils.getSessionUser().getLongitude());

            url = builder.build().toUri().toString();
        }

        CurrentWeatherDTO dto;

        final HttpEntity entity = new HttpEntity(new HttpHeaders());

        ResponseEntity<CurrentWeatherDTO> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, CurrentWeatherDTO.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {

            dto = responseEntity.getBody();

            resultMap.put("weather", dto);
        }

        return resultMap;
    }

    /**
     * 현재 날씨 테이블에 담기
     * @param url
     */
    public void getOneDayWeatherAndInsert(String url, Map<String, Object> map) throws IOException {
        //현재 시간 데이터 확인
        InterfaceWeatherVO interfaceWeatherVO = interfaceWeatherMapper.selectInterfaceWeather(map);

        try {
            if (interfaceWeatherVO == null) {
                if(SessionUtils.getSessionUser().getLatitude() == null || SessionUtils.getSessionUser().getLongitude() == null) {
                    //session값 없을 시 제주도 위경도
                    url = GlobalConstants.weatherApiBaseUrl + GlobalConstants.weatherCurrentPath + "?q=Jeju City&appid=" + GlobalConstants.weatherApiKey;
                } else {
                    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                            .queryParam("lat", SessionUtils.getSessionUser().getLatitude())
                            .queryParam("lon", SessionUtils.getSessionUser().getLongitude());

                    url = builder.build().toUri().toString();
                }

                CurrentWeatherDTO dto;

                final HttpEntity entity = new HttpEntity(new HttpHeaders());

                ResponseEntity<CurrentWeatherDTO> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, CurrentWeatherDTO.class);

                if (responseEntity.getStatusCode() == HttpStatus.OK) {

                    dto = responseEntity.getBody();

                    Map<String, Object> weatherTypeMap = new HashMap<>();
                    weatherTypeMap.put("groupCd", "WEATHER_TYPE");

                    List<Map<String, Object>> weatherTypeCodeList = commonCodeService.getCodeList(weatherTypeMap);

                    Map<String, Object> queryMap = new HashMap<>();
                    StringBuilder selectQuery = new StringBuilder();

                    selectQuery.append("SELECT CASE");

                    for (int j = 0; j < weatherTypeCodeList.size() - 1; j++) {

                        selectQuery.append(" WHEN ");
                        selectQuery.append(dto.weather[0].id);
                        selectQuery.append(" ");
                        selectQuery.append(weatherTypeCodeList.get(j).get("data1"));
                        selectQuery.append(" THEN ");
                        selectQuery.append("'");
                        selectQuery.append(weatherTypeCodeList.get(j).get("code"));
                        selectQuery.append("'");
                    }

                    selectQuery.append(" ELSE '흐림' END AS code ");

                    queryMap.put("query", selectQuery.toString());

                    List<Map<String, Object>> weatherTypeCode = commonService.selectQuery(queryMap);

                    Map<String, Object> insertMap = new HashMap<>();

                    double fahrenheit = Double.parseDouble(dto.getMain().temp);

                    if (fahrenheit >= 273) {
                        fahrenheit = fahrenheit - 273.15;
                    }

                    insertMap.put("weatherDate", map.get("weatherDate").toString());
                    insertMap.put("weatherTime", map.get("weatherTime").toString());
                    insertMap.put("weatherType", weatherTypeCode.get(0).get("code"));
                    insertMap.put("temperature", String.valueOf(fahrenheit));
                    insertMap.put("humidity", dto.getMain().humidity);
                    insertMap.put("atmosphericPressure", dto.getMain().pressure);
                    insertMap.put("windSpeed", dto.getWind().speed);
                    insertMap.put("windDirection", dto.getWind().deg);
                    insertMap.put("latitude", (SessionUtils.getSessionUser().getLatitude() == null ? dto.getCoord().getLat() : SessionUtils.getSessionUser().getLatitude()));
                    insertMap.put("longitude", (SessionUtils.getSessionUser().getLongitude() == null ? dto.getCoord().getLon() : SessionUtils.getSessionUser().getLongitude()));
                    insertMap.put("createdBy", SessionUtils.getCurrentLoginUserCd());

                    interfaceWeatherMapper.insertInterfaceWeather(insertMap);
                }
            }
        } catch (Exception e) {
            //이전 데이터 등록
            String weatherTime = map.get("weatherTime").toString();
            map.put("weatherTime", DateUtil.getTimestampToDate(Long.toString(Instant.now().minus(1, ChronoUnit.HOURS).getEpochSecond()), "HH"));

            interfaceWeatherVO = interfaceWeatherMapper.selectInterfaceWeather(map);

            if (interfaceWeatherVO != null) {
                Map<String, Object> insertMap = new HashMap<>();

                insertMap.put("weatherDate", map.get("weatherDate").toString());
                insertMap.put("weatherTime", weatherTime);
                insertMap.put("weatherType", interfaceWeatherVO.getWeatherType());
                insertMap.put("temperature", interfaceWeatherVO.getTemperature());
                insertMap.put("humidity", interfaceWeatherVO.getHumidity());
                insertMap.put("atmosphericPressure", interfaceWeatherVO.getAtmosphericPressure());
                insertMap.put("windSpeed", interfaceWeatherVO.getWindSpeed());
                insertMap.put("windDirection", interfaceWeatherVO.getWindDirection());
                insertMap.put("latitude", interfaceWeatherVO.getLatitude());
                insertMap.put("longitude", interfaceWeatherVO.getLongitude());
                insertMap.put("createdBy", SessionUtils.getCurrentLoginUserCd());

                interfaceWeatherMapper.insertInterfaceWeather(insertMap);
            }
        }
    }

    /**
     * 지역별 날씨 개수 가져오기 (지역별 날씨 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return interfaceWeatherMapper.selectTotalCount();
    }
}
