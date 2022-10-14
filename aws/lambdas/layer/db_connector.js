const mysql = require("mysql2")
const { v4: uuidv4 } = require('uuid');
let env = process.env

// Connect to the MySQL database
function connect() {
    const connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    connection.connect(function(err) {
        if (err) {
            console.error("Failed to connect to the database.")
            return console.error('error:' + err.message);
        }
    });

    return connection;
}

exports.checkIfUserExists = (userID, callback) => {
    const connection = connect();

    let sql = 'SELECT 1 FROM User WHERE BIN_TO_UUID(id) = ?';

    return connection.query(sql, [userID], (err, results, fields) => {
        if (err) {
            console.error("Failed to execute sql select query.");
            callback(err, null);
        }
        
        connection.end();

        console.log(results);
        console.log(results.length);
        if (results.length == 1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}

exports.getUserPrefabID = (userID, username, callback) => {
    const connection = connect();

    let identifier;
    let sql;
    if (userID != null) {
        identifier = userID;
        sql = 'SELECT BIN_TO_UUID(id) AS prefabID FROM Prefab WHERE BIN_TO_UUID(prefab_owner) = ?';
    } else {
        identifier = username;
        sql = 'SELECT BIN_TO_UUID(Prefab.id) AS prefabID FROM Prefab INNER JOIN User ON User.id = Prefab.prefab_owner WHERE User.username = ?';
    }
    

    return connection.query(sql, [identifier], (err, results, fields) => {
        if (err) {
            console.error("Failed to execute sql select query.");
            callback(err, null);
        }
        
        connection.end();

        console.log(results);
        console.log(results.length);
        if (results.length == 1) {
            callback(null, results[0].prefabID);
        } else {
            callback(null, null);
        }
    });
}

// TODO: Maybe add a callback call?
exports.addPrefabRecord = (prefabID, userID) => {
    const connection = connect();

    let sql = 'INSERT INTO Prefab (id, prefab_owner, modification_date) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), NOW())';

    return connection.query(sql, [prefabID, userID], (err, results) => {
        if (err) {
            console.error("Failed to execute sql insert query.");
            console.log(err);
        }
        
        console.log("Success inserting new prefab record.")
        connection.end();
    });
}

// TODO: Maybe add a callback call?
exports.updatePrefabRecord = (prefabID, userID) => {
    const connection = connect();

    let sql = 'UPDATE Prefab SET id = UUID_TO_BIN(?), modification_date = NOW() WHERE prefab_owner = UUID_TO_BIN(?)';

    return connection.query(sql, [prefabID, userID], (err, results) => {
        if (err) {
            console.error("Failed to execute sql update query.");
            console.log(err);
        }
        
        console.log("Success updating prefab record.")
        connection.end();
    });
}

exports.addUser = (username, firstName, lastName, company, tokenCount, callback) => {
    const connection = connect();

    if (tokenCount == null) {
        tokenCount = 0;
    }

    const userID = uuidv4();
    const sql = 'INSERT INTO User (id, username, first_name, last_name, company, token_count) VALUES (?, ?, ?, ?, ?, ?)';

    return connection.query(sql, [userID, username, firstName, lastName, company, tokenCount], (err, results) => {
        if (err) {
            console.error("Failed to execute sql update query.");
            console.log(err);
            callback(null, err);
        }
        
        console.log("Success adding new user.")
        connection.end();

        callback(null, userID)
    });
}

exports.getUser = (userID, username, callback) => {
    const connection = connect();

    let identifier;
    let sql;
    if (userID != null) {
        identifier = userID;
        sql = 'SELECT BIN_TO_UUID(id) AS userID, username, first_name, last_name, token_count, BIN_TO_UUID(company) AS companyID FROM User WHERE id = ?';
    } else {
        identifier = username;
        sql = 'SELECT BIN_TO_UUID(id) AS userID, username, first_name, last_name, token_count, BIN_TO_UUID(company) AS companyID FROM User WHERE username = ?';
    }

    return connection.query(sql, [identifier], (err, results) => {

        if (err) {
            console.error("Failed to execute sql update query.");
            console.log(err);
            callback(null, err);
        } else if (results.length == 1) {
            console.log("Success getting new user.");
            callback(null, results[0])
        } else {
            console.log("User cannot be found.");
            callback(null, results[0])
        }

        connection.end();
    });
}

exports.addCompany = (name, callback) => {
    const connection = connect();

    const companyID = uuidv4();
    const sql = 'INSERT INTO Company (id, company_name) VALUES (?, ?)';

    return connection.query(sql, [companyID, name], (err, results) => {
        if (err) {
            console.error("Failed to execute sql update query.");
            console.log(err);
            callback(null, err);
        }
        
        console.log("Success adding new company.")
        connection.end();

        callback(null, companyID)
    });
}

exports.getCompany = (companyID, callback) => {
    const connection = connect();

    const sql = 'SELECT BIN_TO_UUID(id) AS companyID, company_name FROM Company WHERE BIN_TO_UUID(id) = ?';

    return connection.query(sql, [companyID], (err, results) => {
        if (err) {
            console.error("Failed to execute sql select query.");
            console.log(err);
            callback(null, err);
        } else if (results.length == 1) {
            console.log("Success getting company.");
            callback(null, results[0])
        } else {
            console.log("Company cannot be found.");
            callback(null, null)
        }

        connection.end();
    });
}

exports.addUserToCompany = (userID, username, callback) => {
    const connection = connect();

    let identifier;
    let sql;
    if (userID != null) {
        identifier = userID;
        sql = 'UPDATE User SET company = UUID_TO_BIN(?) WHERE id = ?';
    } else {
        identifier = username;
        sql = 'UPDATE User SET company = UUID_TO_BIN(?) WHERE username = ?';
    }

    return connection.query(sql, [identifier], (err, results) => {
        if (err) {
            console.error("Failed to execute sql update query.");
            console.log(err);
            callback(null, err);
        } else if (results.affectedRows == 1) {
            console.log("Success adding user to company.");
            callback(null, true)
        } else {
            console.log("User cannot be found.");
            callback(null, false)
        }

        connection.end();
    });
}

exports.addFileRecord = (filename, altText, userID, callback) => {
    const connection = connect();
    const fileID = uuidv4();

    let sql = 'INSERT INTO File (id, filename, alt_text, file_owner) VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?))';

    return connection.query(sql, [fileID, filename, altText, userID], (err, results) => {
        if (err) {
            console.error("Failed to execute sql insert query.");
            console.log(err);
            callback(err, null);
        } 

        console.log("Success inserting new file record.")
        connection.end();

        callback(null, fileID);
    });
}

exports.getFile = (fileID, callback) => {
    const connection = connect();

    const sql = 'SELECT BIN_TO_UUID(id) AS fileID, filename, alt_text, BIN_TO_UUID(file_owner) AS userID FROM File WHERE BIN_TO_UUID(id) = ?'

    return connection.query(sql, [fileID], (err, results, fields) => {
        if (err) {
            console.error("Failed to execute sql select query.");
            callback(err, null);
        }
        
        connection.end();

        console.log(results);
        console.log(results.length);
        if (results.length == 1) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
    });
}

exports.getUserFiles = (userID, callback) => {
    const connection = connect();

    const sql = 'SELECT BIN_TO_UUID(id) AS fileID, filename, alt_text, BIN_TO_UUID(file_owner) AS userID FROM File WHERE BIN_TO_UUID(file_owner) = ?'

    return connection.query(sql, [userID], (err, results, fields) => {
        if (err) {
            console.error("Failed to execute sql select query.");
            callback(err, null);
        }
        
        connection.end();

        console.log(results);
        console.log(results.length);
        callback(null, results);
    });
}
