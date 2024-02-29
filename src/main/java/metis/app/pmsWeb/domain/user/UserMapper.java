package metis.app.pmsWeb.domain.user;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserMapper extends MyBatisMapper {

    List<User> findAll();
    List<Map<String, Object>> getUsers();
}
