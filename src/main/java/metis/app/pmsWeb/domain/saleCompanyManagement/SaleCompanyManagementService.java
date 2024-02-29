package metis.app.pmsWeb.domain.saleCompanyManagement;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.inject.Inject;

import java.util.HashMap;
import java.util.Map;

@Service
public class SaleCompanyManagementService extends BaseService {

    @Inject
    public SaleCompanyManagementMapper saleCompanyManagementMapper;

    /**
     * 판매처 관리 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object>selectSaleCompanyManagementList(Map<String, Object> map){
        Map<String, Object> resultMap = new HashMap<>();

        //목록 조회
        resultMap.put("list", saleCompanyManagementMapper.selectSaleCompanyManagementList(map));
        //목록 개수 조회
        resultMap.put("page", saleCompanyManagementMapper.selectSaleCompanyManagementTotalCount(map));

        return resultMap;
    }

    /**
     * 판매처 정보 저장
     * @param saleCompanyManagementVO
     */
    @Transactional
    public void insert(SaleCompanyManagementVO saleCompanyManagementVO){
        saleCompanyManagementMapper.insert(saleCompanyManagementVO);
    }

    /**
     * 판매처 정보 수정
     * @param saleCompanyManagementVO
     */
    public void update(SaleCompanyManagementVO saleCompanyManagementVO){
         saleCompanyManagementMapper.update(saleCompanyManagementVO);
    }

    /**
     * 판매처 정보 삭제
     * @param saleCompanyManagementVO
     */
    public void delete(SaleCompanyManagementVO saleCompanyManagementVO){
        saleCompanyManagementMapper.delete(saleCompanyManagementVO);
    }

    /**
     * 판매처 개수 가져오기 (판매처 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCount(){
        return saleCompanyManagementMapper.selectTotalCount();
    }
}