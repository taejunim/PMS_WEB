package metis.app.pmsWeb.domain.pmsWebCode;

import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

@Service
public class PmsWebCodeService {

    @Inject
    private PmsWebCodeMapper pmsWebCodeMapper;

    public List<HashMap<String, Object>> get(HashMap<String, Object> param) {
        return pmsWebCodeMapper.get(param);
    }

    public List<HashMap<String, Object>> get2(HashMap<String, Object> param) {
        return pmsWebCodeMapper.get2(param);
    }

}