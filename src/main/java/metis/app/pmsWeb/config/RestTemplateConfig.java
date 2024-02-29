package metis.app.pmsWeb.config;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;

/**
 * RestTemplateConfig.java
 *
 * RestTemplate 설정 - 타임 아웃 및 커넥션, 사용 포트 수
 *
 * Created by Youyeong Jo 2022/07/05.
 */

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(){

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();

        HttpClient client = HttpClientBuilder.create()
                //최대 오픈되는 연결 수
                .setMaxConnTotal(10)
                // IP, 포트 번호 1쌍에 가능한 연결 수
                .setMaxConnPerRoute(10)
                .build();

        factory.setHttpClient(client);

        //Connection timeout
        factory.setConnectTimeout(5000);
        //Read timeout
        factory.setReadTimeout(5000);

        RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(factory));
        restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));

        return restTemplate;
    }
}

class RequestResponseLoggingInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(org.springframework.http.HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {

        ClientHttpResponse response = execution.execute(request, body);
        return response;
    }

}
