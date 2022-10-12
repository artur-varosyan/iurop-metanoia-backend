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
    if (userID != null) {
        identifier = userID;
        let sql = 'SELECT BIN_TO_UUID(id) AS prefabID FROM Prefab WHERE BIN_TO_UUID(prefab_owner) = ?';
    } else {
        identifier = username;
        let sql = 'SELECT BIN_TO_UUID(Prefab.id) AS prefabID FROM Prefab INNER JOIN User ON User.id = Prefab.prefab_owner WHERE User.username = ?';
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