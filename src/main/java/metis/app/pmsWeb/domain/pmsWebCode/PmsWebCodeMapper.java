package metis.app.pmsWeb.domain.pmsWebCode;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface PmsWebCodeMapper extends MyBatisMapper {

    List<HashMap<String, Object>> get(HashMap<String, Object> param);

    List<HashMap<String, Object>> get2(HashMap<String, Object> param);
}
