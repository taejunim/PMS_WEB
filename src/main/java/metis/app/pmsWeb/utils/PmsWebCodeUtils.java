package metis.app.pmsWeb.utils;

import com.chequer.axboot.core.context.AppContextManager;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import metis.app.pmsWeb.domain.pmsWebCode.PmsWebCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PmsWebCodeUtils {

    private static final Logger logger = LoggerFactory.getLogger(PmsWebCodeUtils.class);

    public static List<HashMap<String, Object>> get(String tableNm, String code, String codeNm, String equals, String orderBy, String groupBy, String equals2) throws IOException {

        HashMap<String, Object> param = new HashMap<>();
        param.put("tableNm", tableNm);
        param.put("code", code);
        param.put("codeNm", codeNm);
        param.put("groupBy", groupBy);
        param.put("equals2", equals2);

        //logger.info(equals);

        if (equals != null) {
            HashMap<String, Object> eq;
            ObjectMapper mapper = new ObjectMapper();
            eq = mapper.readValue(equals, new TypeReference<Map<String, String>>() {
            });

            param.put("equals", eq);
        }

        if (orderBy != null) {
            HashMap<String, Object> ord;
            ObjectMapper mapper = new ObjectMapper();
            ord = mapper.readValue(orderBy, new TypeReference<Map<String, String>>() {
            });

            param.put("orderBy", ord);
        }

        List<HashMap<String, Object>> result = getService().get(param);

        return result;
    }

    public static PmsWebCodeService getService() {
        return AppContextManager.getBean(PmsWebCodeService.class);
    }

}
