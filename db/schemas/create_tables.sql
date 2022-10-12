DROP TABLE IF EXISTS ImageFile;
DROP TABLE IF EXISTS Prefab;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
    id BINARY(16) PRIMARY KEY NOT NULL,
    company_name VARCHAR(255) NOT NULL
);

CREATE TABLE User (
    id BINARY(16) NOT NULL,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    company BINARY(16) DEFAULT NULL,
    token_count INT DEFAULT 0,
    PRIMARY KEY (id, username),
    FOREIGN KEY (company) REFERENCES Company(id)
);

CREATE TABLE Prefab (
    id BINARY(16) PRIMARY KEY NOT NULL,
    prefab_owner BINARY(16) NOT NULL,
    modification_date TIMESTAMP NOT NULL,
    FOREIGN KEY (prefab_owner) REFERENCES User(id)
);

CREATE TABLE ImageFile (
    id BINARY(16) PRIMARY KEY NOT NULL,
    prefab_owner BINARY(16) NOT NULL,
    alt_text VARCHAR(255),
    FOREIGN KEY (prefab_owner) REFERENCES User(id)
);
