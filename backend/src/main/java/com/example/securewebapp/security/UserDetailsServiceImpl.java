package com.example.securewebapp.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<UserDetails> userMapper = (rs, rowNum) ->
        new User(
            rs.getString("username"),
            rs.getString("password"),
            Collections.emptyList()
        );

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return jdbcTemplate.queryForObject(
                "SELECT username, password FROM users WHERE username = ?",
                userMapper,
                username
            );
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }
}
