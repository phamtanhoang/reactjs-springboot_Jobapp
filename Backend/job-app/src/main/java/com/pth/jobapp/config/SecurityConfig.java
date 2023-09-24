package com.pth.jobapp.config;

import com.pth.jobapp.security.JwtAuthFilter;
import com.pth.jobapp.service.AccountInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter authFilter;

    // User Creation
    @Autowired
    private UserDetailsService userDetailsService;


    // Configuring HttpSecurity
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/auth/welcome"),
                        new AntPathRequestMatcher("/auth/addNewUser"),
                        new AntPathRequestMatcher("/auth/generateToken")
                ).permitAll()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/api/candidates/profile") // Thêm quyền truy cập cho /auth/candidates/**
                ).authenticated() // Yêu cầu xác thực cho /auth/candidates/**
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/auth/admin/**")
                ).authenticated()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/api/auth/logout")
                ).authenticated()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        new AntPathRequestMatcher("/api/candidates/**")
                ).authenticated()
                .and()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class) // Thêm authFilter
                .build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
