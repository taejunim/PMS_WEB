package metis.app.pmsWeb.domain.InterfaceWeather;

import lombok.Data;

/**
 * 하루 단위 시간별 일기 예보 DTO
 */
@Data
public class OneDayHourlyWeaterhDTO {


    private Current current;        // 현재 날씨
    private Hourly[] hourly;        // 시간별 날씨 예보


    @Data
    static class Current {

        public String temp;         // 온도
        public String pressure;     // 기압
        public String humidity;     // 습도
        public String wind_speed;   // 풍속
        public String wind_deg;     // 풍향
    }

    @Data
    static class Hourly {

        public String dt;           // timestamp 형식 일시
        public String temp;         // 온도
        public String pressure;     // 기압
        public String humidity;     // 습도
        public String wind_speed;   // 풍속
        public String wind_deg;     // 풍향

        public Weather[] weather;

    }


    @Data
    static class Weather {

        public String id;           // timestamp 형식 일시
        public String main;         // 날씨
        public String description;  // 날씨 설명
        public String icon;         // 날씨 아이콘
    }
}
