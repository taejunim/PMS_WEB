package metis.app.pmsWeb.domain.saleCompanyManagement;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface SaleCompanyManagementMapper extends MyBatisMapper {

    /**
     * 판매처 관리 목록 조회
     * @param map
     * @return
     */
    List<SaleCompanyManagementVO>selectSaleCompanyManagementList(Map<String, Object> map);

    /**
     * 판매처 관리 목록 개수
     * @param map
     * @return
     */
    int selectSaleCompanyManagementTotalCount(Map<String, Object> map);

    /**
     * 판매처 등록 / 수정 / 삭제
     * @param saleCompanyManagementVO
     * @return
     */
    int update(SaleCompanyManagementVO saleCompanyManagementVO);
    int insert(SaleCompanyManagementVO saleCompanyManagementVO);
    int delete(SaleCompanyManagementVO saleCompanyManagementVO);

    /**
     * 판매처 개수 가져오기 (판매처 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCount();
}
