CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

-- INSERT INTO users (username, password) VALUES ('user', 'password');
-- INSERT INTO users (username, password) VALUES ('admin', 'adminpass');
INSERT INTO users (username, password) VALUES ('user', '$2a$12$DVEFAjqrxthKBizQdwlOMun78JUHN5Tz5zXCjv3tUHZKr8uY5t31O');
INSERT INTO users (username, password) VALUES ('admin', '$2a$12$gdOL1EeDb0nXBIGjK9dqUeXo6ptKH4N/Lj6/VAsnhvZqyBO0x75a6');

