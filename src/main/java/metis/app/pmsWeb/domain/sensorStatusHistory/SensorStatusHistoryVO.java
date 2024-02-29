package metis.app.pmsWeb.domain.sensorStatusHistory;

import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @NoArgsConstructor
    public class SensorStatusHistoryVO extends BaseVO {
        private String regDate;             //등록일시
        private String sensorStartDate;     //기간선택_시작
        private String sensorCloseDate;     //기간선택_종료
        private String essCode;             //essCode
        private String deviceCategorySub;   //장비 구분
        private String deviceCategorySubName;   //장비 구분 명
        private String deviceCode;          //장비 코드
        private String deviceName;          //장비 이름
        private String faultExist;          //FALUT 여부
        private String measure1;            //측정 값1
        private String measure2;            //측정 값2
        private String measure3;            //측정 값3

        private String searchDate;              //조회 일자
    }
