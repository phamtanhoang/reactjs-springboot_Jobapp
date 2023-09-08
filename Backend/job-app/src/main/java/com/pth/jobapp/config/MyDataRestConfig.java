package com.pth.jobapp.config;

import com.pth.jobapp.entity.Category;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://127.0.0.1:5173/";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration repositoryRestConfiguration,
                                                     CorsRegistry corsRegistry) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        repositoryRestConfiguration.exposeIdsFor(Job.class);
        repositoryRestConfiguration.exposeIdsFor(Employer.class);
        repositoryRestConfiguration.exposeIdsFor(Category.class);

        disableHttpMethods(Job.class, repositoryRestConfiguration, theUnsupportedActions);
        disableHttpMethods(Employer.class, repositoryRestConfiguration, theUnsupportedActions);
        disableHttpMethods(Category.class, repositoryRestConfiguration, theUnsupportedActions);

        /* Configure CORS Mapping */
        corsRegistry.addMapping(repositoryRestConfiguration.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration repositoryRestConfiguration,
                                    HttpMethod[] theUnsupportedActions) {
        repositoryRestConfiguration.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}
