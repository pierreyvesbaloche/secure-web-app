CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (username, password) VALUES ('user', 'password');
INSERT INTO users (username, password) VALUES ('admin', 'adminpass');
