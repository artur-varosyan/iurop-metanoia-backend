var AWS = require("aws-sdk");
const mysql = require("mysql2")

let env = process.env

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const userID = event.queryStringParameters.userID;

    var response
    if (userID == null) {
        response = missinguserID();
    } else {
        // Check if the user and their prefab exist in the database
        console.log("Hello World");
        checkIfUserExists(userID);
        response = generatePresignedURL(userID)
    }
    
    callback(null, response)
};

function checkIfUserExists(userID) {
    // Connect to database
    console.log("Trying to connect");
    console.log(env);
    const connection = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    connection.connect(function(err) {
        if (err) {
            console.log("we have a problem: " + err);
            return console.error('error:' + err.message);
        }

        console.log('Connected successfully');
    });

    let sql = 'SELECT first_name FROM User WHERE BIN_TO_UUID(id) = ?'
    connection.query(sql, [userID], (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        
        console.log(results[0]['first_name']);
    });

    connection.end()
}

// TODO: Change file extension to .prefab
function generatePresignedURL(userID) {
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'metanoia-prefabs',
        Key: userID,
        Expires: 60,
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            url: url,
        })
    }

    return response;
}

function missinguserID() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The userID is missing in the request body.",
        })
    }

    return response;
}