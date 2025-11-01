package com.example.securewebapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
@SuppressWarnings("unchecked")
class HealthCheckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthcheckEndpointShouldReturn200AndUtcTime() throws Exception {
        mockMvc.perform(get("/api/healthcheck"))
            .andExpect(status().isOk())
            .andExpect(content().string((org.hamcrest.Matcher<? super String>) org.hamcrest.Matchers.endsWith("Z\"}")));
    }
}
