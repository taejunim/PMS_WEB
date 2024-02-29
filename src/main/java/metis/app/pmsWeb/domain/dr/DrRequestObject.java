package metis.app.pmsWeb.domain.dr;

import lombok.Data;
import metis.app.pmsWeb.domain.pmsMw.RequestObject;

@Data
public class DrRequestObject {

    public String                id;
    public String                eventType;
    public String                deviceType;
    public String                dataType;
    public String                deviceCategory;
    public String                deviceCategorySub;
    public String                deviceCode;
    public DrRequestObjectData   data;

    @Data
    public static class DrRequestObjectData {
        public String targetId;
        public String controlCode;
    }
}
