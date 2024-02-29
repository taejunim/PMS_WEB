package metis.app.pmsWeb.domain.InterfaceWeather;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;


@Component
public interface InterfaceWeatherMapper extends MyBatisMapper {

    /**
     * 지역별 날씨 목록 조회
     * @param map
     * @return
     */
    List<InterfaceWeatherVO> selectInterfaceWeatherList(Map<String, Object> map);

    /**
     * 지역별 날씨 목록 개수
     * @param map
     * @return
     */
    int selectInterfaceWeatherTotalCount(Map<String, Object> map);

    /**
     * 날씨 데이터
     * @param map
     * @return
     */
    InterfaceWeatherVO selectInterfaceWeather(Map<String, Object> map);

    /**
     * 날씨 데이터 저장
     * @param map
     */
    void insertInterfaceWeather(Map<String, Object> map);

    /**
     * 지역별 날씨 개수 가져오기 (지역별 날씨 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();

}
