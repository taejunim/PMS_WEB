package metis.app.pmsWeb.domain.code;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface CommonCodeMapper extends MyBatisMapper {

    List<Map<String, Object>> getCodeList(Map<String, Object> params);

    /**
     * 장비 가져오기
     */
    List<Device> getDevice();

    /** 유저타입 가져오기
     * 기업, 사용자(관리자 X)
     */
    List<CommonCode> getTokenUserCodeList();

    /**
     * 공통 코드 개수 가져오기 (공통 코드 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}
