package metis.app.pmsWeb.domain.pmsMw;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ChargeDataObject {
    public String requestTime;
    public String controlType;
    public ArrayList<ChargerObject> chargerList;
}

