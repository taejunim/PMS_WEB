package metis.app.pmsWeb.domain.user.auth.menu;

import metis.app.pmsWeb.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
