package metis.app.pmsWeb.domain.program.menu;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuMapper extends MyBatisMapper {

    void deleteAuthGroup(Long menuId);

    void deleteAuthGroups(List<Menu> menus);
}
