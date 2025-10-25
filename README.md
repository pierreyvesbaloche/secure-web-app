# Secure Web Application

A modern, secure web application built with Spring Boot 3 and Angular, featuring JWT authentication and comprehensive security measures.

## Project Structure

- `backend/`: Spring Boot application with security features
- `frontend/`: Angular application with secure routing and authentication

## Prerequisites

- Java 25
- Maven 3.9+
- Node.js 20.9.0+
- npm 10.2.3+
- Angular CLI 17+
- PostgreSQL 16+

## Backend Features

- Spring Boot 3.2.0
- Spring Security with JWT authentication
- JPA/Hibernate for data persistence
- PostgreSQL database
- RESTful API endpoints
- Input validation
- CORS configuration
- Role-based access control

## Frontend Features

- Angular 17
- JWT authentication
- Secure routing
- Interceptors for token management
- Responsive design
- Form validation
- HTTP interceptors for error handling

## Data Storage

The application uses PostgreSQL as the primary database, chosen for:
- Strong ACID compliance
- Rich feature set
- Excellent performance
- Strong community support
- Built-in security features

## Getting Started

### Backend Setup

1. Create a PostgreSQL database
2. Update `application.properties` with your database credentials
3. Run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend/src/main/angular
   npm install
   ```

2. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

## Security Implementation

### Backend Security
- JWT-based authentication
- Password encryption using BCrypt
- Role-based authorization
- CSRF protection
- XSS prevention
- Rate limiting
- Input validation
- Secure headers

### Frontend Security
- HttpOnly cookies
- XSS prevention
- CSRF tokens
- Secure routing
- Input sanitization
- Authentication guards
- Secure local storage handling

## API Documentation

The API documentation will be available at http://localhost:8080/swagger-ui.html once the backend is running.