package metis.app.pmsWeb.domain.code;

import metis.app.pmsWeb.domain.BaseService;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;

@Service
public class CommonCodeService extends BaseService<CommonCode, CommonCodeId> {

    @Inject
    private CommonCodeRepository commonCodeRepository;
    @Inject
    private CommonCodeMapper commonCodeMapper;

    @Inject
    public CommonCodeService(CommonCodeRepository commonCodeRepository) {
        super(commonCodeRepository);
        this.commonCodeRepository = commonCodeRepository;
    }

    public List<CommonCode> get(RequestParams requestParams) {
        String groupCd = requestParams.getString("groupCd", "");
        String useYn = requestParams.getString("useYn", "");

        String filter = requestParams.getString("filter");

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(groupCd)) {
            builder.and(qCommonCode.groupCd.eq(groupCd));
        }

        if (isNotEmpty(useYn)) {
            AXBootTypes.Used used = AXBootTypes.Used.get(useYn);
            builder.and(qCommonCode.useYn.eq(used));
        }

        List<CommonCode> commonCodeList = select().from(qCommonCode).where(builder).orderBy(qCommonCode.groupCd.asc(), qCommonCode.sort.asc()).fetch();

        if (isNotEmpty(filter)) {
            commonCodeList = filter(commonCodeList, filter);
        }

        return commonCodeList;

    }

    /**
     * 장비 가져오기
     */
    public List<Device> getDevice(){

        return commonCodeMapper.getDevice();
    }

    @Transactional
    public void saveCommonCode(List<CommonCode> basicCodes) {
        save(basicCodes);
    }


    /**
     * 공통 코드 조회
     * @param params
     * @return
     */
    public List<Map<String, Object>> getCodeList(Map<String, Object> params) {

        return commonCodeMapper.getCodeList(params);
    }

    /** 유저타입 가져오기
     * 기업, 사용자(관리자 X)
     */
    public List<CommonCode> getTokenUserCodeList(){

        return commonCodeMapper.getTokenUserCodeList();
    }

    /**
     * 공통 코드 개수 가져오기 (공통 코드 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){

        return commonCodeMapper.selectTotalCount();
    }
}
