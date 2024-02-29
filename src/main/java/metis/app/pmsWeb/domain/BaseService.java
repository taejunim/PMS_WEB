package metis.app.pmsWeb.domain;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import metis.app.pmsWeb.domain.code.QCommonCode;
import metis.app.pmsWeb.domain.log.QErrorLog;
import metis.app.pmsWeb.domain.program.QProgram;
import metis.app.pmsWeb.domain.program.menu.QMenu;
import metis.app.pmsWeb.domain.user.QUser;
import metis.app.pmsWeb.domain.user.auth.QUserAuth;
import metis.app.pmsWeb.domain.user.auth.menu.QAuthGroupMenu;
import metis.app.pmsWeb.domain.user.role.QUserRole;


import java.io.Serializable;

public class BaseService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

    protected QUserRole qUserRole = QUserRole.userRole;
    protected QAuthGroupMenu qAuthGroupMenu = QAuthGroupMenu.authGroupMenu;
    protected QCommonCode qCommonCode = QCommonCode.commonCode;
    protected QUser qUser = QUser.user;
    protected QProgram qProgram = QProgram.program;
    protected QUserAuth qUserAuth = QUserAuth.userAuth;
    protected QMenu qMenu = QMenu.menu;
    protected QErrorLog qErrorLog = QErrorLog.errorLog;

    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseService() {
        super();
    }

    public BaseService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }

/*    public boolean checkToken(SessionUser sessionUser) {

        if(sessionUser != null) {
            return !sessionUser.getToken().isEmpty();

        }
        return false;
    }*/
}
