DROP TABLE IF EXISTS ImageFile;
DROP TABLE IF EXISTS Prefab;
DROP TABLE IF EXISTS CompanyMember;
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

CREATE TABLE Alias (
    id BINARY(16) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (id, username),
    FOREIGN KEY(id) REFERENCES User(id)
)

CREATE TABLE CompanyMember (
    user_id BINARY(16) NOT NULL,
    company_id BINARY(16) NOT NULL,
    role VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY(company_id) REFERENCES Company(id),
    PRIMARY KEY (user_id, company_id)
);

CREATE TABLE Prefab (
    id BINARY(16) PRIMARY KEY NOT NULL,
    prefab_owner BINARY(16) NOT NULL,
    modification_date TIMESTAMP NOT NULL,
    FOREIGN KEY (prefab_owner) REFERENCES User(id)
);

CREATE TABLE File (
    id BINARY(16) PRIMARY KEY NOT NULL,
    filename VARCHAR(255),
    file_owner BINARY(16) NOT NULL,
    alt_text VARCHAR(255),
    FOREIGN KEY (file_owner) REFERENCES User(id)
);
