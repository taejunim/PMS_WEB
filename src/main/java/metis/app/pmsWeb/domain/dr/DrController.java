package metis.app.pmsWeb.domain.dr;

import com.chequer.axboot.core.controllers.BaseController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.SneakyThrows;
import metis.app.pmsWeb.domain.chargeDischargePlanMgnt.ChargeDischargePlanMgntService;

import metis.app.pmsWeb.domain.chargeDischargePlanMgnt.ChargeDischargePlanMgntVO;
import metis.app.pmsWeb.domain.commandControlHistory.CommandControlHistoryService;
import metis.app.pmsWeb.domain.commandControlHistory.CommandControlHistoryVO;
import metis.app.pmsWeb.domain.common.CommonService;
import metis.app.pmsWeb.domain.deviceManagement.DeviceManagementVO;
import metis.app.pmsWeb.domain.essControlCommandManagement.EssControlCommandManagementService;
import metis.app.pmsWeb.utils.PropertyUtil;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DrController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(DrController.class);

    @Inject
    private ChargeDischargePlanMgntService chargeDischargeService;
    @Inject
    private CommonService commonService;
    @Inject
    private EssControlCommandManagementService essControlCommandManagementService;
    @Inject
    private CommandControlHistoryService commandControlHistoryService;

    WebSocketClient webSocketClient;
    PropertyUtil propertyUtil = new PropertyUtil();


    private final String dataResult   = "result";
    private final String dataMessage  = "message";
    private final String drUser       = "system";
    private final String drTargetUnit = "00";

    private final String controlCode  = "9001019002";

    CommandControlHistoryVO commandControlHistoryVO;
    Gson gson = new Gson();

    /**
     * DR 발령 수신 (interface -> pms web -> M/W )
     * @param
     * @return
     */
    @RequestMapping(value = "/api/v1/drOrder",method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ResponseEntity<Map<String,Object>> orderDr(@RequestBody DrVO drVO) {
        Map<String,Object> response = new HashMap<>();

        String result = "success";
        String message = "";

        ChargeDischargePlanMgntVO chargeDischargePlanMgntVO = new ChargeDischargePlanMgntVO();

        try {
            if(drVO.getData() != null) {
                String startDateTime = drVO.getData().getStartDate();
                String endDateTime   = drVO.getData().getEndDate();

                String startDate     = startDateTime.substring(0, startDateTime.indexOf(" ")).replaceAll("-","");
                String startTime     = startDateTime.substring(startDateTime.indexOf(" ") + 1).replaceAll(":","") + "00";
                String endDate       = endDateTime.substring(0, endDateTime.indexOf(" ")).replaceAll("-","");
                String endTime       = endDateTime.substring(endDateTime.indexOf(" ") + 1).replaceAll(":","") + "00";

                chargeDischargePlanMgntVO.setScheduleStartDate(startDate);
                chargeDischargePlanMgntVO.setScheduleEndDate(endDate);
                chargeDischargePlanMgntVO.setScheduleStartTime(startTime);
                chargeDischargePlanMgntVO.setScheduleEndTime(endTime);

                chargeDischargePlanMgntVO.setScheduleType(drVO.getData().getScheduleType());
                chargeDischargePlanMgntVO.setOperationMode(drVO.getData().getOperationModeType());

                chargeDischargePlanMgntVO.setTargetUnit(drTargetUnit);

                // 생성자, 수정자 setting (system)
                chargeDischargePlanMgntVO.setCreatedBy(drUser);
                chargeDischargePlanMgntVO.setUpdatedBy(drUser);

                // 해당 시간에 존재하는 일정 확인
                List<ChargeDischargePlanMgntVO> samePlan = chargeDischargeService.checkExistSamePlan(chargeDischargePlanMgntVO);

                // 선택한 기간에 동일한 일정이 존재하면 update 하지 않음
                if(samePlan.size() > 0 && chargeDischargeService.checkExistSamePlanDr(chargeDischargePlanMgntVO) > 0) {
                    message = "기존에 등록된 등록건 입니다.";
                } else {

                    // 취소 해야될 건이 있을때
                     if(chargeDischargeService.checkExistSamePlanDr(chargeDischargePlanMgntVO) == 0 && samePlan.size() > 0) {
                        chargeDischargeService.cancelPlans(samePlan, chargeDischargePlanMgntVO);
                        message = "기존 등록된 " + samePlan.size() + "건을 취소하였습니다.";
                     }

                     // 기존 같은 시간대 존재하는 일정을 취소하고 새로운 일정을 등록
                     chargeDischargeService.insert(chargeDischargePlanMgntVO);

                    DeviceManagementVO deviceManagementVO = commonService.selectMwInfo();
                    DrRequestObject drRequestObject = new DrRequestObject();

                    // M/W가 장비로 등록되어 있을 때 제어를 전송
                    if(deviceManagementVO != null) {

                        drRequestObject.setId(drVO.getEssCode());
                        drRequestObject.setEventType("req");
                        drRequestObject.setDeviceCategory(deviceManagementVO.getDeviceCategory());
                        drRequestObject.setDeviceCategorySub(deviceManagementVO.getDeviceCategorySub());
                        drRequestObject.setDeviceCode(deviceManagementVO.getDeviceCode());
                        drRequestObject.setDataType("control");

                        DrRequestObject.DrRequestObjectData data = new DrRequestObject.DrRequestObjectData();

                        data.targetId = drVO.getEssCode().replaceAll("E", "M/W");
                        data.controlCode = controlCode;
                        drRequestObject.setData(data);

                        // 데이터 전송 (PMS WEB -> WEB SOCKET SERVER
                        sendControlData(drRequestObject);

                    } else {
                        logger.info("장비 등록 필요(M/W).");
                        result = "fail";
                        message = "장비 등록이 필요합니다. (M/W)";
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
            message = e.getMessage();
        }

        response.put("type", "res");
        response.put("essCode", drVO.getEssCode());
        Map<String,Object> data = new HashMap<>();
        data.put(dataResult, result);
        data.put(dataMessage, message);
        response.put("data", data);

        return ResponseEntity.ok(response);
    }

    /**
     * PMS VIEW WEB SOCKET RUNNABLE
     *
     * @throws URISyntaxException
     */

    public void sendControlData(DrRequestObject drRequestObject) throws URISyntaxException {

        webSocketClient = new WebSocketClient(new URI(propertyUtil.getProperty("axboot.webSocket.localhost"))) {

            @Override
            public void onOpen(ServerHandshake serverHandshake) {

                /*접속용 JSON*/
                JsonObject object = new JsonObject();

                object.addProperty("id", drRequestObject.getId());
                object.addProperty("eventType", "req");
                object.addProperty("deviceType", "pms");
                object.addProperty("dataType", "connect");

                String jsonString = gson.toJson(object);
                logger.info("[ 웹소켓 접속 요청 : " + jsonString + " ]");
                commandControlHistoryVO = new CommandControlHistoryVO();

                this.send(jsonString);
            }

            @SneakyThrows
            @Override
            public void onMessage(String message) {

                logger.info("[ 웹소켓 메시지 수신 : " + message + " ]");

                JsonParser jsonParser = new JsonParser();
                JsonObject jsonObject = (JsonObject) jsonParser.parse(message);

                if (jsonObject != null) {
                    //응답 성공시(연결 성공)
                    if (jsonObject.get("eventType").getAsString().equals("res") && jsonObject.get("dataType").getAsString().equals("connect") && jsonObject.get("result").getAsString().equals("success")) {

                        String requestJson = gson.toJson(drRequestObject);

                        logger.info("[ 웹소켓 제어 전송 : " + requestJson + " ]");

                        //제어 전송 시간 set
                        commandControlHistoryVO.setControlDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

                        this.send(requestJson);
                    } else {

                        //제어 성공시
                        if (jsonObject.get("eventType").getAsString().equals("res") && jsonObject.get("dataType").getAsString().equals("control")
                                && jsonObject.get("result").getAsString().equals("success")) {
                            commandControlHistoryVO.setControlCompleteFlag("Y");
                            commandControlHistoryVO.setDeviceResponseDate(String.valueOf(System.currentTimeMillis()/1000));
                            logger.info("[ 웹소켓 제어 성공 응답 : " + jsonObject + " ]");
                        }

                        //제어 실패시
                        else if (jsonObject.get("eventType").getAsString().equals("connectionFail") || (jsonObject.get("eventType").getAsString().equals("res") && jsonObject.get("dataType").getAsString().equals("control")
                                && !jsonObject.get("result").getAsString().equals("success"))) {
                            commandControlHistoryVO.setControlCompleteFlag("N");
                            logger.info("[ 웹소켓 제어 실패 응답 : " + jsonObject + " ]");
                        }

                        Map<String, Object> map = new HashMap<>();
                        map.put("deviceCode", drRequestObject.getDeviceCode());
                        map.put("controlCode", drRequestObject.getData().controlCode);

                        // 제어 이력 등록을 위한 이력 데이터 set
                        if(essControlCommandManagementService.selectOne(map) != null) {
                            commandControlHistoryVO.setControlCode(drRequestObject.getData().controlCode);
                            commandControlHistoryVO.setControlRequestType("01");
                            commandControlHistoryVO.setControlRequestId(drUser);
                            commandControlHistoryService.insert(commandControlHistoryVO);
                            logger.info("[ 웹소켓 제어 이력 등록");
                        } else {
                            logger.info("[ 웹소켓 제어 이력 등록 불가 (제어 코드 미등록)");
                        }

                        // 이력 VO 초기화
                        commandControlHistoryVO = new CommandControlHistoryVO();

                        // Web socket 통신 close
                        webSocketClient.close();
                        logger.info("[ 웹소켓 접속 종료 ]");
                    }

                }
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {                                              //서버 연결 종료 후 동작 정의
                logger.info("[ PMW VIEW WEB SOCKET ON CLOSE-> CODE: " + code + " REASON: " + reason + " REMOTE: " + remote + " ]");
            }

            @Override
            public void onError(Exception ex) {                                                                         //예외 발생시 동작 정의
                ex.getLocalizedMessage();
            }
        };

        webSocketClient.connect();                                                                                      //앞서 정의한 WebSocket 서버에 연결
    }
}
