package metis.app.pmsWeb.domain.InterfaceWeather;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class InterfaceWeatherVO extends BaseVO {
    private String essCode;
    private String weatherDate;
    private String weatherTime;
    private String weatherType;
    private String temperature;
    private String humidity;
    private String atmosphericPressure;
    private String windSpeed;
    private String windDirection;
    private String latitude;
    private String longitude;

    private String startDate;
    private String endDate;

}
