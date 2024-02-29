package metis.app.pmsWeb.domain.InterfaceWeather;

import lombok.Data;

/**
 * 실시간 날씨 DTO
 */
@Data
public class CurrentWeatherDTO {


    private Main main;
    private Wind wind;
    public Weather[] weather;
    private Coord coord;
    private String dt;

    @Data
    static class Main {

        public String temp;
        public String pressure;
        public String humidity;
    }

    @Data
    static class Wind {
        public String speed;
        public String deg;

    }

    @Data
    static class Weather {
        public String id;           // timestamp 형식 일시
        public String icon;         // 날씨 아이콘
    }

    @Data
    static class Coord {
        public String lon;
        public String lat;
    }
}
