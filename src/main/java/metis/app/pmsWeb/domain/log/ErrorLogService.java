package metis.app.pmsWeb.domain.log;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.StackTraceElementProxy;
import ch.qos.logback.core.util.ContextUtil;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import metis.app.pmsWeb.domain.BaseService;
import com.chequer.axboot.core.config.AXBootContextConfig;
import com.chequer.axboot.core.domain.log.AXBootErrorLog;
import com.chequer.axboot.core.domain.log.AXBootErrorLogService;
import com.chequer.axboot.core.utils.MDCUtil;
import com.chequer.axboot.core.utils.ModelMapperUtils;
import com.chequer.axboot.core.utils.PhaseUtils;
import metis.app.pmsWeb.utils.PmsWebCodeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.Query;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.List;


@Service
public class ErrorLogService extends BaseService<ErrorLog, Long> implements AXBootErrorLogService {

    private ErrorLogRepository errorLogRepository;
    private static final Logger logger = LoggerFactory.getLogger(PmsWebCodeUtils.class);

    @Inject
    private AXBootContextConfig axBootContextConfig;

    @Inject
    public ErrorLogService(ErrorLogRepository errorLogRepository) {
        super(errorLogRepository);
        this.errorLogRepository = errorLogRepository;
    }

    @Override
    public void saveLog(AXBootErrorLog axBootErrorLog) {
        ErrorLog errorLog = ModelMapperUtils.map(axBootErrorLog, ErrorLog.class);
        save(errorLog);
    }

    @Transactional
    public void deleteAllLogs() {
        Query query = em.createNativeQuery("DELETE FROM SYSTEM_ERROR_LOG");
        query.executeUpdate();
    }

    @Override
    public void deleteLog(Long id) {
        delete(id);
    }

    @Override
    public AXBootErrorLog build(ILoggingEvent loggingEvent) {
        ErrorLog errorLog = new ErrorLog();
        errorLog.setPhase(PhaseUtils.phase());
        errorLog.setSystem(axBootContextConfig.getApplication().getName());
        errorLog.setLoggerName(loggingEvent.getLoggerName());
        errorLog.setServerName(axBootContextConfig.getServerName());
        errorLog.setHostName(getHostName());
        errorLog.setPath(MDCUtil.get(MDCUtil.REQUEST_URI_MDC));
        errorLog.setMessage(loggingEvent.getFormattedMessage());
        errorLog.setHeaderMap(MDCUtil.get(MDCUtil.HEADER_MAP_MDC));
        errorLog.setParameterMap(MDCUtil.get(MDCUtil.PARAMETER_BODY_MDC));
        errorLog.setUserInfo(MDCUtil.get(MDCUtil.USER_INFO_MDC));

        if (loggingEvent.getThrowableProxy() != null) {
            errorLog.setTrace(getStackTrace(loggingEvent.getThrowableProxy().getStackTraceElementProxyArray()));
        }

        return errorLog;
    }


    public String getHostName() {
        try {
            return ContextUtil.getLocalHostName();
        } catch (RuntimeException | UnknownHostException | SocketException e) {
            logger.debug("debug");
            System.out.println(e.getLocalizedMessage());
            // ignored
        }
        return null;
    }

    public String getStackTrace(StackTraceElementProxy[] stackTraceElements) {
        if (stackTraceElements == null || stackTraceElements.length == 0) {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        for (StackTraceElementProxy element : stackTraceElements) {
            sb.append(element.toString());
            sb.append("\n");
        }
        return sb.toString();
    }

    /**
     * errorLog 목록
     * @param requestParams
     * @return
     */
    public List<ErrorLog> get(RequestParams<ErrorLog> requestParams) {
        String filter = requestParams.getFilter();

        BooleanBuilder builder = new BooleanBuilder();

        List list = select().from(qErrorLog).where(builder).orderBy(qErrorLog.id.asc()).fetch();
        if (isNotEmpty(filter)) {
            list = filter(list, filter);
        }
        return list;
    }

    /**
     * errorLog 개수 가져오기 (errorLog 테이블 전체 Row 개수)
     * @return
     */
    public long selectTotalCount(){
        BooleanBuilder builder = new BooleanBuilder();

        long count = select().from(qErrorLog).where(builder).orderBy(qErrorLog.id.asc()).fetchCount();

        return count;
    }
}
