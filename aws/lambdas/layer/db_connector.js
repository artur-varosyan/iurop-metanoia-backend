const mysql = require("mysql2")
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

exports.getUserPrefabID = (userID, callback) => {
    const connection = connect();

    let sql = 'SELECT BIN_TO_UUID(id) AS prefabID FROM Prefab WHERE BIN_TO_UUID(prefab_owner) = ?';

    return connection.query(sql, [userID], (err, results, fields) => {
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