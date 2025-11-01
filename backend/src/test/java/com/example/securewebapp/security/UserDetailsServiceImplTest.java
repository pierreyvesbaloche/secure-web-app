package com.example.securewebapp.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        UserDetails user = service.loadUserByUsername("user");
        assertEquals("user", user.getUsername());
        assertTrue(encoder.matches("password", user.getPassword()));
        assertTrue(user.getAuthorities().isEmpty());

        UserDetails admin = service.loadUserByUsername("admin");
        assertEquals("admin", admin.getUsername());
        assertTrue(encoder.matches("adminpass", admin.getPassword()));
        assertTrue(admin.getAuthorities().isEmpty());
    }

    @Test
    void loadUserByUsername_throwsException_whenUserNotFound() {
        assertThrows(UsernameNotFoundException.class, () -> service.loadUserByUsername("unknown"));
    }
}
