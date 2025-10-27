package edu.infosys.inventoryApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import edu.infosys.inventoryApplication.service.InventoryUserService;
import edu.infosys.inventoryApplication.service.ProductService;

@Configuration
@EnableMethodSecurity
public class SystemConfig {
	
	@Autowired
	private EncoderConfig encoderConfig;
	
	@Autowired
	private InventoryUserService service;
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
	
    }
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf().disable()
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/inventory/**").permitAll() // allow all under /inventory/
	            .anyRequest().authenticated()
	        )
	        .cors(); // keep CORS enabled

	    return http.build();
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://localhost:3838")
	                    .allowedMethods("GET", "POST", "PUT", "DELETE")
	                    .allowedHeaders("*")
	                    .allowCredentials(true);
	        }
	    };
	}

	
}
