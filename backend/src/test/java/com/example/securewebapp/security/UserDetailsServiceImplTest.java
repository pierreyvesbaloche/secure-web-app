package com.example.securewebapp.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@JdbcTest
@SpringJUnitConfig(UserDetailsServiceImpl.class)
class UserDetailsServiceImplTest {
    @Autowired
    private UserDetailsServiceImpl service;

    @Test
    void loadUserByUsername_returnsUser_whenUserExists() {
        // Ensure test data is present
        UserDetails user = service.loadUserByUsername("user");
        assertEquals("user", user.getUsername());
        assertEquals("password", user.getPassword());
        assertTrue(user.getAuthorities().isEmpty());

        UserDetails admin = service.loadUserByUsername("admin");
        assertEquals("admin", admin.getUsername());
        assertEquals("adminpass", admin.getPassword());
        assertTrue(admin.getAuthorities().isEmpty());
    }

    @Test
    void loadUserByUsername_throwsException_whenUserNotFound() {
        assertThrows(UsernameNotFoundException.class, () -> service.loadUserByUsername("unknown"));
    }
}
