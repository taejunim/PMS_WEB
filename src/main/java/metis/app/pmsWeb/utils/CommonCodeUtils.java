package metis.app.pmsWeb.utils;

import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.context.AppContextManager;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.JsonUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import metis.app.pmsWeb.domain.code.CommonCode;
import metis.app.pmsWeb.domain.code.CommonCodeService;
import metis.app.pmsWeb.domain.code.Device;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

public class CommonCodeUtils {

    public static List<CommonCode> get(String groupCd) {
        RequestParams<CommonCode> requestParams = new RequestParams<>(CommonCode.class);
        requestParams.put("groupCd", groupCd);
        requestParams.put("useYn", AXBootTypes.Used.YES.getLabel());
        return getService().get(requestParams);
    }

    public static Map<String, List<CommonCode>> getAllByMap() {
        RequestParams<CommonCode> requestParams = new RequestParams<>(CommonCode.class);
        requestParams.put("useYn", AXBootTypes.Used.YES.getLabel());
        List<CommonCode> commonCodes = getService().get(requestParams);

        Map<String, List<CommonCode>> commonCodeMap = commonCodes.stream().collect(groupingBy(CommonCode::getGroupCd));

        return commonCodeMap;
    }

    public static String getAllByJson() {
        return JsonUtils.toJson(getAllByMap());
    }

    /**
     * 상태 코드 - 웹소켓으로 받아온 데이터 변환용
     */
    public static JsonObject getCommonCodeMap() {
        RequestParams<CommonCode> requestParams = new RequestParams<>(CommonCode.class);
        requestParams.put("useYn", AXBootTypes.Used.YES.getLabel());

        List<CommonCode> commonCodes = getService().get(requestParams);

        HashMap<String,String> statusCodeList = new HashMap<>();

        for (CommonCode commonCode: commonCodes) {

            StringBuilder key = new StringBuilder(commonCode.getGroupCd());
            key.append("_").append(commonCode.getCode());

            String value = commonCode.getName().replaceAll("\\[", "\\\\[").replaceAll("\\]", "\\\\]").replaceAll("\\(", "\\\\(")
                    .replaceAll("\\)", "\\\\)");

            statusCodeList.put(String.valueOf(key), value);
        }


        JsonObject json = new Gson().toJsonTree(statusCodeList).getAsJsonObject();

        return json;
    }

    /**
     * 장비 가져오기
     */
    public static JsonObject getDeviceMap() {

        List<Device> deviceList = getService().getDevice();

        HashMap<String,String> deviceMap = new HashMap<>();

        for (Device device: deviceList) {

            StringBuilder key = new StringBuilder(device.getDeviceCode());

            String value = device.getDeviceName().replaceAll("\\[", "\\\\[").replaceAll("\\]", "\\\\]").replaceAll("\\(", "\\\\(")
                    .replaceAll("\\)", "\\\\)");

            deviceMap.put(String.valueOf(key), value);
        }

        JsonObject json = new Gson().toJsonTree(deviceMap).getAsJsonObject();

        return json;
    }

    public static CommonCodeService getService() {
        return AppContextManager.getBean(CommonCodeService.class);
    }

    /**
     * 페이징 정보 처리
     * @param pageable, totalCnt
     * @return
     */
    public static Map<String, Object> setPage(Pageable pageable, int totalCnt){

        double decimal;
        double totalPages = Math.abs(totalCnt/(double)pageable.getPageSize());
        decimal = totalPages - (int)totalPages;

        if (decimal != 0.0) {
            totalPages = totalPages + 1;
        }

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("currentPage",pageable.getPageNumber());
        resultMap.put("totalElements",totalCnt);
        resultMap.put("totalPages",Math.abs((int)totalPages));
        return resultMap;
    }

    /**
     * 모바일 페이징 정보 처리
     * @param pageNumber, pageSize, totalCnt
     * @return
     */
    public static Map<String, Object> setPage(int pageNumber, int pageSize, int totalCnt){

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("currentPage",pageNumber);
        resultMap.put("totalElements",totalCnt);
        resultMap.put("totalPages",Math.ceil(totalCnt/pageSize)+1);
        return resultMap;
    }
}
