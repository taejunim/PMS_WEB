package metis.app.pmsWeb.domain.dr;
import lombok.Data;

@Data
public class DrVO {

    private String essCode;
    private String type;
    private RequestData data;


    @Data
    public class RequestData {
        private String scheduleType;
        private String startDate;
        private String endDate;
        private String operationModeType;
    }
}
