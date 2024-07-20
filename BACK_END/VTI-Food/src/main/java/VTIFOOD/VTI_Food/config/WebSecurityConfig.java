package VTIFOOD.VTI_Food.config;

import VTIFOOD.VTI_Food.filter.JwtTokenFilter;
import VTIFOOD.VTI_Food.model.Role;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.DELETE;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableWebMvc
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception.accessDeniedPage("/access-denied"))
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(
                            String.format("%s/users/login", apiPrefix),
                            String.format("%s/users/register", apiPrefix))
                            .permitAll()
                            .requestMatchers(HttpMethod.GET, String.format("%s/categories", apiPrefix)).permitAll()
                            .requestMatchers(HttpMethod.GET, String.format("%s/categories/**", apiPrefix)).permitAll()
                            .requestMatchers(HttpMethod.POST, String.format("%s/categories/**", apiPrefix))
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, String.format("%s/categories/**", apiPrefix))
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, String.format("%s/categories/**", apiPrefix))
                            .hasRole("ADMIN")

                            .requestMatchers(HttpMethod.GET, String.format("%s/products/**", apiPrefix)).permitAll()
                            .requestMatchers(HttpMethod.GET, String.format("%s/products", apiPrefix)).permitAll()
                            .requestMatchers(HttpMethod.POST, String.format("%s/products/**", apiPrefix))
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, String.format("%s/products/**", apiPrefix))
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, String.format("%s/products/**", apiPrefix))
                            .hasRole("ADMIN")

                            .requestMatchers(HttpMethod.GET, String.format("%s/carts/**", apiPrefix))
                            .hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.GET, String.format("%s/carts", apiPrefix))
                            .hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.POST, String.format("%s/carts/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(HttpMethod.DELETE, String.format("%s/carts/**", apiPrefix))
                            .hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.PUT, String.format("%s/products/**", apiPrefix)).hasRole("USER")

                            .requestMatchers(HttpMethod.GET, String.format("%s/order_details/**", apiPrefix))
                            .hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.PUT, String.format("%s/orders/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, String.format("%s/orders/**", apiPrefix)).hasRole("USER")
                            .requestMatchers(HttpMethod.GET, String.format("%s/orders/**", apiPrefix))
                            .hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.DELETE, String.format("%s/orders/**", apiPrefix))
                            .hasRole("ADMIN")

                            .requestMatchers(HttpMethod.GET, String.format("%s/cart_details/**", apiPrefix))
                            .hasAnyRole("ADMIN", "USER")
                            .requestMatchers(HttpMethod.PUT, String.format("%s/cart_details/**", apiPrefix))
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, String.format("%s/cart_details/**", apiPrefix))
                            .hasRole("USER")
                            .requestMatchers(HttpMethod.GET, String.format("%s/cart_details/**", apiPrefix))
                            .hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.DELETE, String.format("%s/cart_details/**", apiPrefix))
                            .hasRole("ADMIN")
                            .anyRequest()
                            .authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("*"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"));
                configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
                configuration.setExposedHeaders(List.of("x-auth-token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });
        return httpSecurity.build();
    }
}
