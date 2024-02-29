package metis.app.pmsWeb;

import com.chequer.axboot.core.AXBootCoreConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling           // 스케쥴러 사용하기 위한 어노테이션
@PropertySource(value = {"classpath:axboot-common.properties", "classpath:axboot-${spring.profiles.active:production}.properties"})
@Import(AXBootCoreConfiguration.class)
public class AXBootApplication {
}
