package metis.app.pmsWeb.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.io.support.ResourcePropertySource;

import java.io.IOException;

/**
 *
 * PropertyUtil.java
 * 생성자 : 조유영
 * property 가져오기 위함.
 *
**/

@Slf4j
public class PropertyUtil {
    public String getProperty(String propertyName) {
        return getProperty(propertyName, null);
    }
    public String getProperty(String propertyName, String defaultValue) {
        String value = defaultValue;
        ConfigurableApplicationContext applicationContext = new GenericXmlApplicationContext();
        ConfigurableEnvironment configurableEnvironment = applicationContext.getEnvironment();
        MutablePropertySources mutablePropertySources = configurableEnvironment.getPropertySources();

        //프로퍼티 파일 설정
        try {
            mutablePropertySources.addLast(new ResourcePropertySource("classpath:axboot-production.properties"));
            value = configurableEnvironment.getProperty(propertyName);
        } catch (IOException e) {
            value = "properites 정보 로딩중 IOException 발생";
        } finally {
            applicationContext.close();
        }

        return value;
    }
}
