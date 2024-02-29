package metis.app.pmsWeb.domain.pmsMw;

import com.chequer.axboot.core.controllers.BaseController;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.SneakyThrows;
import metis.app.pmsWeb.utils.PropertyUtil;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URI;
import java.net.URISyntaxException;


@Controller
public class PmsMwController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(PmsMwController.class);

    PropertyUtil propertyUtil = new PropertyUtil();

    WebSocketClient webSocketClient;

    Gson gson = new Gson();

    @RequestMapping(value = "/api/v1/chargeData", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public @ResponseBody ResponseObject chargeData(@RequestBody RequestObject requestObject) throws URISyntaxException {

        logger.info("[ 충전 데이터 수신 ]");

        try {

            logger.info("requestJson : " + gson.toJson(requestObject));

            if (requestObject.id != null && !requestObject.id.equals("")
                    && requestObject.eventType != null && !requestObject.eventType.equals("")
                    && requestObject.deviceType != null && !requestObject.deviceType.equals("")
                    && requestObject.dataType != null && !requestObject.dataType.equals("")
                    && requestObject.data != null && !requestObject.data.equals("")
                    && requestObject.data.requestTime != null && !requestObject.data.requestTime.equals("")
                    && requestObject.data.controlType != null && !requestObject.data.controlType.equals("")
                    && requestObject.data.chargerList != null && requestObject.data.chargerList.size() > 0) {

                //sendChargeData(requestObject);
                logger.info("[ 충전 데이터 수신했으나 일시적으로 데이터 전송 안함 ]");

            } else {
                return sendErrorResponse(requestObject, "필수값 누락");
            }

        } catch (NullPointerException e) {
            return sendErrorResponse(requestObject, "데이터 오류");
        } catch (Exception e) {
            return sendErrorResponse(requestObject, "기타 오류");
        }

        ResponseObject responseObject = new ResponseObject();

        responseObject.id = requestObject.id;
        responseObject.eventType = "res";
        responseObject.dataType = requestObject.dataType;
        responseObject.result = "success";
        responseObject.message = "";

        return responseObject;
    }

    private @ResponseBody ResponseObject sendErrorResponse(RequestObject requestObject, String message) {

        logger.info("[ 필수값 누락으로 오류 Return ]");

        ResponseObject responseObject = new ResponseObject();

        responseObject.id = requestObject.id;
        responseObject.eventType = "res";
        responseObject.dataType = requestObject.dataType;
        responseObject.result = "fail";
        responseObject.message = message;

        return responseObject;
    }

    /**
     * PMS VIEW WEB SOCKET RUNABLE
     *
     * @throws URISyntaxException
     */

    public void sendChargeData(RequestObject requestObject) throws URISyntaxException {

        webSocketClient = new WebSocketClient(new URI(propertyUtil.getProperty("axboot.webSocket.localhost"))) {

            @Override
            public void onOpen(ServerHandshake serverHandshake) {

                /*접속용 JSON*/
                JsonObject object = new JsonObject();

                object.addProperty("id", requestObject.getId());
                object.addProperty("eventType", "req");
                object.addProperty("deviceType", "pms");
                object.addProperty("dataType", "connect");

                String jsonString = gson.toJson(object);
                logger.info("[ 웹소켓 접속 요청 : " + jsonString + " ]");

                this.send(jsonString);
            }

            @SneakyThrows
            @Override
            public void onMessage(String message) {

                logger.info("[ 웹소켓 메시지 수신 : " + message + " ]");

                JsonParser jsonParser = new JsonParser();
                JsonObject jsonObject = (JsonObject) jsonParser.parse(message);

                if (jsonObject != null) {

                    //응답 성공시
                    if (jsonObject.get("eventType").getAsString().equals("res") && jsonObject.get("dataType").getAsString().equals("connect") && jsonObject.get("result").getAsString().equals("success")) {

                        String requestJson = gson.toJson(requestObject);

                        logger.info("[ 웹소켓 제어 전송 : " + requestJson + " ]");

                        this.send(requestJson);
                    }

                    //제어 성공시
                    else if (jsonObject.get("eventType").getAsString().equals("res") && jsonObject.get("dataType").getAsString().equals("control")
                            && jsonObject.get("result").getAsString().equals("success")) {

                        logger.info("[ 웹소켓 제어 성공 응답 : " + jsonObject + " ]");
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
