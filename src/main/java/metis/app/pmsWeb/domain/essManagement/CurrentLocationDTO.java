package metis.app.pmsWeb.domain.essManagement;

import lombok.Data;

/**
 * 실시간 위치 DTO
 */
@Data
public class CurrentLocationDTO {

    private String status;      //상태
    private String message;      //메시지
    private String essCode;
    private String lat;         //위도
    private String lon;         //경도


}
