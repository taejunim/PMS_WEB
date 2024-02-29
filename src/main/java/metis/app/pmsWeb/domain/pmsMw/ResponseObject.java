package metis.app.pmsWeb.domain.pmsMw;

import lombok.Data;

@Data
public class ResponseObject {
    public String id;
    public String eventType;
    public String dataType;
    public String result;
    public String message;
}

