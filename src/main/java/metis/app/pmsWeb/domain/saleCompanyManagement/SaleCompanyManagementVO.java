package metis.app.pmsWeb.domain.saleCompanyManagement;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;

@Data
public class SaleCompanyManagementVO extends BaseVO{
    private String saleCompanyCode;
    private String saleCompanyName;
    private String saleCompanyManagerName;
    private String saleCompanyManagerTel;
    private String saleCompanyTel;
    private String saleCompanyAddr;
}