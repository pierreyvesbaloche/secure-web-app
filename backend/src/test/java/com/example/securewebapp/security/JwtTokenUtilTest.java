
package com.example.securewebapp.security;

import com.example.securewebapp.security.JwtTokenUtil;
import com.example.securewebapp.config.JwtConfig;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collections;
// ...existing code...
// ...existing code...
import java.util.Date;
import static org.junit.jupiter.api.Assertions.*;

class JwtTokenUtilTest {

    private JwtTokenUtil jwtTokenUtil;
    private JwtConfig jwtConfig;

    @BeforeEach
    void setUp() {
        jwtConfig = new JwtConfig();
        jwtConfig.setSecret("dGVzdC1zZWNyZXQta2V5LWZvci1qd3QtdG9rZW4tdGVzdGluZy1wdXJwb3Nlcy1vbmx5");
        jwtConfig.setExpiration(3600000L);
        jwtTokenUtil = new JwtTokenUtil(jwtConfig);
    }

    @Test
    void shouldGenerateValidToken() {
        UserDetails userDetails = createUserDetails("testuser");
        String token = jwtTokenUtil.generateToken(userDetails.getUsername());

        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertEquals(userDetails.getUsername(), jwtTokenUtil.getUsernameFromToken(token));
    }

    @Test
    void shouldValidateValidToken() {
        UserDetails userDetails = createUserDetails("testuser");
        String token = jwtTokenUtil.generateToken(userDetails.getUsername());

        assertTrue(jwtTokenUtil.validateToken(token, userDetails.getUsername()));
    }

    @Test
    void shouldNotValidateExpiredToken() {
        UserDetails userDetails = createUserDetails("testuser");

        // Set expiration to 0 to create an instantly expired token
        jwtConfig.setExpiration(0L);
        jwtTokenUtil = new JwtTokenUtil(jwtConfig);
        String token = jwtTokenUtil.generateToken(userDetails.getUsername());

        assertFalse(jwtTokenUtil.validateToken(token, userDetails.getUsername()));

        // Restore normal expiration for other tests
        jwtConfig.setExpiration(3600000L);
        jwtTokenUtil = new JwtTokenUtil(jwtConfig);
    }

    @Test
    void shouldNotValidateTokenWithDifferentUsername() {
        UserDetails userDetails = createUserDetails("testuser");
        UserDetails differentUser = createUserDetails("otheruser");
        String token = jwtTokenUtil.generateToken(userDetails.getUsername());

        assertFalse(jwtTokenUtil.validateToken(token, differentUser.getUsername()));
    }

    private UserDetails createUserDetails(String username) {
        return new User(username, "password", Collections.emptyList());
    }
}