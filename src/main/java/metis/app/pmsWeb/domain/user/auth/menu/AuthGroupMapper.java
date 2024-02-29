package metis.app.pmsWeb.domain.user.auth.menu;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import metis.app.pmsWeb.domain.program.Program;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * AUTH GROUP MAPPER (권한그룹)
 */
@Repository
public interface AuthGroupMapper extends MyBatisMapper {

    List<AuthGroupMenu> findAll(Long menuId);

    Program getProgramAuth(String progCd);
}
