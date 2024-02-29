package metis.app.pmsWeb.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

public class CommonUtil {

    private static final Logger logger = LoggerFactory.getLogger(PmsWebCodeUtils.class);

    public static Map ConvertObjectToMap(Object obj){
        try {
            //Field[] fields = obj.getClass().getFields(); //private field는 나오지 않음.
            Field[] fields = obj.getClass().getDeclaredFields();
            Map resultMap = new HashMap();
            for(int i=0; i<=fields.length-1;i++){
                fields[i].setAccessible(true);
                resultMap.put(fields[i].getName(), fields[i].get(obj));
            }
            return resultMap;
        } catch (IllegalArgumentException | IllegalAccessException e) {
            logger.debug("debug");
            System.out.println(e.getMessage());
            System.out.println(e.getLocalizedMessage());
        }
        return null;
    }



    public static Object convertMapToObject(Map map, Object objClass) {

        String keyAttribute = null;
        String setMethodString = "set";
        String methodString = null;
        Iterator itr = map.keySet().iterator();
        while (itr.hasNext()) {
            keyAttribute = (String) itr.next();
            methodString = setMethodString + keyAttribute.substring(0, 1).toUpperCase() + keyAttribute.substring(1);
            try {
                Method[] methods = objClass.getClass().getDeclaredMethods();
                for (int i = 0; i <= methods.length - 1; i++) {
                    if (methodString.equals(methods[i].getName())) {
                        methods[i].invoke(objClass, map.get(keyAttribute));
                    }
                }
            } catch (SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
                System.out.println(e.getMessage());
                System.out.println(e.getLocalizedMessage());
            }
        }
        return objClass;
    }


    /**
     * 아마존의 checkIp 서비스를 이용하여 외부 아이피 가져오기.
     * @return  외부 IP
     * @throws Exception    예외
     */
    public static String getServerIp() throws Exception {

        // 아마존의 checkIp 서비스 url.
        URL whatismyip = new URL("http://checkip.amazonaws.com");

        BufferedReader in = new BufferedReader(new InputStreamReader(whatismyip.openStream()));

        return in.readLine();
    }
}
