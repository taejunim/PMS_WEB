package metis.app.pmsWeb.code;

public class GlobalConstants {

    public static final String DOMAIN_PACKAGE                   = "metis.app.pmsWeb.domain";

    public static final String LAST_NAVIGATED_PAGE              = "a_x_b_l_n_p";

    public static final String ADMIN_AUTH_TOKEN_KEY             = "127d9fe6-6e6d-4598-9655-44a0b7335b18";

    public static final String LANGUAGE_COOKIE_KEY              = "a_x_lang";

    public static final String LANGUAGE_PARAMETER_KEY           = "language";

    public static final String interfaceChargeDischargeApiUrl   = "/chargeDischargeSummary/insert";

    public static String weatherApiKey                          = "d7ec432a1c6e10e7c8d7939f234681fd";              // 날씨 api 키
    public static String weatherApiBaseUrl                      = "https://api.openweathermap.org";                // 날씨 api 기초 url
    public static String weatherCurrentPath                     = "/data/2.5/weather";                             // 날씨 api 현재 날씨 경로
    public static String weather1DayPath                        = "/data/2.5/onecall";                             // 날씨 api 일간 시간 주기 경로
}
