package metis.app.pmsWeb.config;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by ITNOTE on 2016-02-16.
 */
@Getter
@Setter
@ToString
public class ResultVO implements Serializable {
    private static final long serialVersionUID = 1L;
	
	String code = "";             // 9999   , 8888 , 0000      ,
    String name = "";
    String message = "";          // ERROR  , 중복 ,  SUCESS  ,
    String alt = "";

  //  HashMap<String, String> errCodeMap;

    
    public ResultVO() {
//    	errCodeMap = new HashMap<String, String>();
//    	errCodeMap.put("9999", "ERROR");
//    	errCodeMap.put("8888", "중복");
//    	errCodeMap.put("000", "SUCESS");
    }
    
    public ResultVO(String  code , String name ) {
        this.code = code;
        this.name = name;
    }

    public ResultVO( String code, String name, String message ,  String alt){
        this.code = code;
        this.name = name;
        this.message = message;
        this.alt = alt;
    }


    public ResultVO success(){
        return new ResultVO("0000", "SUCCESS");
    }
    
    public ResultVO success(String message, String alt){
        return new ResultVO("0000", "SUCCESS", message, alt);
    }

    public ResultVO error(){
        return new ResultVO("9999", "ERROR");
    }
    
    public ResultVO error(String message, String alt){
        return new ResultVO("9999","ERROR", message, alt);
    }
    
}
