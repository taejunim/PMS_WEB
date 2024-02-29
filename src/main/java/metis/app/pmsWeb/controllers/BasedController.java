package metis.app.pmsWeb.controllers;

import metis.app.pmsWeb.config.ResultVO;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class BasedController {

    public ResultVO ok(){
        return new ResultVO("0000","SUCCESS","성공","");
    }

    public ResultVO ok(String message, String alt) {
        return new ResultVO("0000","SUCCESS" , message, alt);
    }

    public ResultVO error() {
        return new ResultVO("9999","ERROR","오류 발생", "");
    }

    public ResultVO error(String message, String error) {
        return new ResultVO("9999","ERROR" , message, error);
    }

    public ResultVO result(String code, String name, String message, String error) {
        return new ResultVO(code, name , message, error);
    }
}

