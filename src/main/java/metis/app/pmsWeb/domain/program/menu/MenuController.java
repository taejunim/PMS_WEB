package metis.app.pmsWeb.domain.program.menu;

import metis.app.pmsWeb.domain.program.Program;
import metis.app.pmsWeb.domain.user.auth.menu.AuthGroupMenu;
import metis.app.pmsWeb.domain.user.auth.menu.AuthGroupMenuService;
import metis.app.pmsWeb.domain.user.auth.menu.AuthGroupMenuVO;
import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.List;


@Controller
public class MenuController extends BaseController {

    @Inject
    private MenuService menuService;

    @Inject
    private AuthGroupMenuService authGroupMenuService;

    @RequestMapping(value = "/menu", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse menuList(RequestParams requestParams) {
        List<Menu> list = menuService.get(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(value = "/menu", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody MenuRequestVO menuVO) {
        menuService.processMenu(menuVO);
        return ok();
    }

    @RequestMapping(value = "/menu/{id}", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse update(@PathVariable Long id, @RequestBody Menu menu) {
        menuService.updateMenu(id, menu);
        return ok();
    }

    @RequestMapping(value = "/menu/{id}", method = {RequestMethod.GET}, produces = APPLICATION_JSON)
    public Menu update(@PathVariable Long id) {
        return menuService.findOne(id);
    }

    @RequestMapping(value = "/menu/auth", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public AuthGroupMenuVO authMapList(RequestParams requestParams) {
        return authGroupMenuService.get(requestParams);
    }

    @RequestMapping(value = "/menu/auth", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<AuthGroupMenu> authGroupMenuList) {
        authGroupMenuService.saveAuth(authGroupMenuList);
        return ok();
    }

    @RequestMapping(value = "/menu/auth/delete", method = {RequestMethod.GET}, produces = APPLICATION_JSON)
    public ApiResponse delete(RequestParams requestParams) {
        Long menuId = requestParams.getLong("menuId");
        menuService.deleteAuthGroup(menuId);
        return ok();
    }

    @RequestMapping(value = "/menu/programAuth", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Program programAuth(RequestParams requestParams) {
        return authGroupMenuService.getProgramAuth(requestParams);
    }
}
