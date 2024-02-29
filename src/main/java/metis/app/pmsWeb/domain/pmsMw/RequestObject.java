package metis.app.pmsWeb.domain.pmsMw;

import lombok.Data;

@Data
public class RequestObject {

    public String id;
    public String eventType;
    public String deviceType;
    public String dataType;
    public ChargeDataObject data;
}

