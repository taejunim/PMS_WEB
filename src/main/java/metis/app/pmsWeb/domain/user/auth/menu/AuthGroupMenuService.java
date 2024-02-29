package metis.app.pmsWeb.domain.user.auth.menu;

import metis.app.pmsWeb.domain.BaseService;
import metis.app.pmsWeb.domain.program.Program;
import metis.app.pmsWeb.domain.program.menu.Menu;
import metis.app.pmsWeb.domain.program.menu.MenuService;
import metis.app.pmsWeb.domain.user.SessionUser;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

@Service
public class AuthGroupMenuService extends BaseService<AuthGroupMenu, AuthGroupMenu.AuthGroupMenuId> {
    private AuthGroupMenuRepository authGroupMenuRepository;

    @Inject
    private AuthGroupMapper authGroupMapper;

    @Inject
    private MenuService menuService;

    @Inject
    public AuthGroupMenuService(AuthGroupMenuRepository authGroupMenuRepository) {
        super(authGroupMenuRepository);
        this.authGroupMenuRepository = authGroupMenuRepository;
    }

    public AuthGroupMenuVO get(RequestParams requestParams) {
        Long menuId = requestParams.getLong("menuId");

        Menu menu = menuService.findOne(menuId);
        AuthGroupMenuVO authGroupMenuV2VO = new AuthGroupMenuVO();

        List<AuthGroupMenu> list = authGroupMapper.findAll(menuId);
        authGroupMenuV2VO.setList(list);
        authGroupMenuV2VO.setProgram(menu.getProgram());

        return authGroupMenuV2VO;
    }

    public Program getProgramAuth(RequestParams requestParams) {
        String progCd = requestParams.getString("progCd");
        Program program = authGroupMapper.getProgramAuth(progCd);

        return program;
    }

    public AuthGroupMenu getCurrentAuthGroupMenu(Long menuId, SessionUser sessionUser) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qAuthGroupMenu.grpAuthCd.in(sessionUser.getAuthGroupList()));
        builder.and(qAuthGroupMenu.menuId.eq(menuId));

        List<AuthGroupMenu> authorizationList = select().from(qAuthGroupMenu).where(builder).fetch();

        AuthGroupMenu authorization = null;

        for (AuthGroupMenu authGroupMenu : authorizationList) {
            if (authorization == null) {
                authorization = authGroupMenu;
            } else {
                authorization.updateAuthorization(authGroupMenu);
            }
        }

        return authorization;
    }

    @Transactional
    public void saveAuth(List<AuthGroupMenu> authGroupMenuList) {
        for (AuthGroupMenu authGroupMenu : authGroupMenuList) {
            if (authGroupMenu.getUseYn() == AXBootTypes.Used.NO) {
                delete(authGroupMenu);
            } else {
                save(authGroupMenu);
            }
        }
    }
}
