package metis.app.pmsWeb.domain.pmsMw;

import lombok.Data;

@Data
public class ChargerObject {
    public String chargerId;
    public String chargerStatus;
    public String voltage;
    public String current;
    public String readyTime;
    public String cancelTime;
    public String startTime;
    public String endTime;
}

