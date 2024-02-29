package metis.app.pmsWeb.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DateUtil {

    /**
     * 8자리의 yyyyMMdd 일자 를 만들기 위한 함수.
     * @param year      년도
     * @param position  일자 position.  ex) 0 => 0101, 1 => 0102, 50 => 0220
     * @return  yyyyMMdd
     */
    public static String getDate(String year, int position) {

        Calendar cal = Calendar.getInstance();
        DateFormat df = new SimpleDateFormat("yyyyMMdd");

        try {

            Date date = df.parse(year + "0101");

            cal.setTime(date);

            cal.add(Calendar.DATE, position);


        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }

        return df.format(cal.getTime());
    }


    /**
     * 기준 년도에 증감을 하여 원하는 년도 가져오는 함수.
     * @param year          ex) 2019
     * @param calcYear      ex) -5
     * @return              ex) 2014
     */
    public static String getCalcYear(String year, int calcYear) {

        Calendar cal = Calendar.getInstance();
        DateFormat df = new SimpleDateFormat("yyyy");

        try {

            Date date = df.parse(year);

            cal.setTime(date);

            cal.add(Calendar.YEAR, calcYear);


        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }

        return df.format(cal.getTime());
    }


    /**
     * 현재 년도에 증감 년도 계산값 구하기.
     * @param calcYear      ex ) 1
     * @return              ex) 2021년도 + 1 => 2022년도
     */
    public static String getCalcNowYear(int calcYear) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat("yyyy");


        cal.add(Calendar.YEAR, calcYear);


        return df.format(cal.getTime());
    }

    /**
     * 현재 날짜 구하기 yyyyMMdd
     * @return
     */
    public static String getNowDate() {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat("yyyyMMdd");


        return df.format(cal.getTime());
    }


    /**
     * 현재 yyyyMM 보다 파라미터로 넘어온 yyyyMM 값이 크면 true 다르면 false 리턴
     *
     * 다시말해 현재 날짜보다 파라미터로 넘겨받은 날짜가 현재 또는 미래인 경우(수정가능한 경우) true, 과거이면(수정 불가능한 경우) false
     * @param yearMonth
     * @return
     */
    public static boolean getNowMonthEqualsDate(String dateFormat, String yearMonth) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat(dateFormat);
        return Integer.parseInt(df.format(cal.getTime())) <= (Integer.parseInt(yearMonth));
    }


    /**
     * unix_timestamp To Date
     * @param timestampStr unix_timestamp 형식 문자열
     * @return  date 형식 문자열
     */
    public static String getTimestampToDate(String timestampStr, String dateFormat) {

        long timestamp = Long.parseLong(timestampStr);

        Date date = new java.util.Date(timestamp * 1000L);
//        SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        SimpleDateFormat sdf = new java.text.SimpleDateFormat("HH");
        SimpleDateFormat sdf = new java.text.SimpleDateFormat(dateFormat);


        sdf.setTimeZone(java.util.TimeZone.getTimeZone("GMT+9"));
        String formattedDate = sdf.format(date);

        return formattedDate;
    }

    public static List<String> getDayFromMonth(String yearMonth) {

        Calendar cal = Calendar.getInstance();

        cal.set(Integer.parseInt(yearMonth.substring(0,4)), Integer.parseInt(yearMonth.substring(4,6)) -1, 1 );

        List<String> dayList = new ArrayList<>();

        for(int i = 1; i <= cal.getActualMaximum(Calendar.DAY_OF_MONTH); i++) {

            dayList.add(yearMonth + String.format("%02d", i));
        }

        return dayList;
    }


    /**
     * 현재날짜 기준 계산된 시간 구하기
     * @param Calendar_DATE ex) Year, Month, Day, Hour, Minute, Second
     * @param dateFormat    ex) yyyyMMddHHiiss, HH, yyyyMMdd, yyyy
     * @param calc          ex) -1, 0, 1, 2 etc ...
     * @return  현재 날짜 기준 특정날짜 증감된 값 리턴.
     */
    public static String getCalcDateTime(int Calendar_DATE, String dateFormat, int calc) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat(dateFormat);

        cal.add(Calendar_DATE, calc);

        String returnDate = df.format(cal.getTime());

        if(dateFormat.equals("yyyyMMddHH")) {

            returnDate += "0000";
        }

        return returnDate;
    }


    public static String getCalcDateTime2(int Calendar_DATE, String dateFormat, int calc) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat(dateFormat);

        cal.add(Calendar_DATE, calc);

        return df.format(cal.getTime());
    }


    /**
     * 현재 시간 unixTimeStamp 로 출력
     * @return unixTimeStamp
     */
    public static long returnUnixTime() {

        Calendar c = Calendar.getInstance();

        return c.getTimeInMillis() / 1000;
    }


    /**
     * 서머
     * @return
     */
    public static long getSummaryStartUnixTime() {

        long time = returnUnixTime();

        time /= 60 * 5;         // 나누기 60 을 하여 unixtime 마지막 1의 자리수를 제거

        time *= 60 * 5;         // 곱하기 60을 하여 기존 초를 00초로 맞춤

        time -= 60 * 5;         // -60을 하여 1분전 unixtimestamp 값을 가짐.

        return time;
    }

    public static long getSummaryEndUnixTime() {

        long time = returnUnixTime();

        time /= 60 * 5;

        time *= 60 * 5;

        return time;
    }
}
