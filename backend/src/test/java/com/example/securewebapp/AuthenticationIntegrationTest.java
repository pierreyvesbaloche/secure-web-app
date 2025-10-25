package com.example.securewebapp;

import com.example.securewebapp.security.JwtTokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.context.annotation.Import;
// ...existing code...
import com.example.securewebapp.config.TestSecurityConfig;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
@Import(TestSecurityConfig.class)
class AuthenticationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Test
    void shouldAuthenticateAndReceiveToken() throws Exception {
        // Given
        String requestBody = objectMapper.writeValueAsString(Map.of(
            "username", "admin",
            "password", "admin123"
        ));

        // When
        MvcResult result = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Then
        String response = result.getResponse().getContentAsString();
        @SuppressWarnings("unchecked")
        Map<String, String> responseMap = objectMapper.readValue(response, Map.class);
        
        assertNotNull(responseMap.get("token"));
        String token = responseMap.get("token");
        
        // Verify token is valid
    String username = jwtTokenUtil.getUsernameFromToken(token);
    assertEquals("admin", username);
    }

    @Test
    void shouldRejectInvalidCredentials() throws Exception {
        // Given
        String requestBody = objectMapper.writeValueAsString(Map.of(
            "username", "admin",
            "password", "wrongpassword"
        ));

        // When/Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
                .with(csrf()))
                .andExpect(status().isUnauthorized());
    }
}