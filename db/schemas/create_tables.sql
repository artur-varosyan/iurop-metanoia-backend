DROP TABLE IF EXISTS prefab;
DROP TABLE IF EXISTS user;

CREATE TABLE User (
    id BINARY(16) PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) NOT NULL
);

CREATE TABLE Prefab (
    id BINARY(16) PRIMARY KEY NOT NULL,
    prefab_owner BINARY(16) NOT NULL,
    modification_date TIMESTAMP NOT NULL,
    FOREIGN KEY (prefab_owner) REFERENCES User(id)
);
