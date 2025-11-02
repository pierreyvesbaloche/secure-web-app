# Backend Service

## Overview

This is the Spring Boot backend for the Secure Web Application. It provides authentication, JWT token management, and REST APIs for the frontend.

## Running Tests

To run all backend tests, use the Maven wrapper and JDK 25:

```powershell
$env:JAVA_HOME='C:\Dev\Progs\jdk-25'
D:\Dev\Agent\workspace\secure-web-app\mvnw.cmd -f D:\Dev\Agent\workspace\secure-web-app\backend\pom.xml test
```

## Test User Setup

Integration and unit tests use an in-memory user store defined in `TestSecurityConfig` (test-only config):

- **admin / admin123** (role: ADMIN)
- **user / password** (role: USER)

These users are only available during tests and are not present in production.

## Security Configuration

- **Production:** `SecurityConfig` (main config) is used for real deployments. It does not define any in-memory users.
- **Tests:** `TestSecurityConfig` (test config) provides in-memory users and a password encoder for integration and unit tests. It is imported in test classes as needed.

## Notes

- Do not use the test credentials in production.
- If you need to add more test users, update `TestSecurityConfig` in `src/test/java/com/example/securewebapp/config/TestSecurityConfig.java`.

## Troubleshooting

- If you see bean or filter chain conflicts, ensure only one `SecurityFilterChain` is defined per context.
- For authentication failures in tests, verify the test credentials match those in `TestSecurityConfig`.

---

For more details, see the main project README in the root folder.
