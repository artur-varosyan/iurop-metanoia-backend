var AWS = require("aws-sdk");
const { checkIfUserExists, getUserFiles } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, missingUserID());
    } else {
        var response;
        
        // Check if the user exists in the database
        // TODO: Authenticate the user
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                callback(null, serverError());
            }
            else if (exists == true) {
                let response;

                getUserFiles(userID, function(err, files) {
                    if (err) {
                        response = serverError();
                    } else {
                        response = {
                            statusCode: 200,
                            body: JSON.stringify({
                                files: files
                            })
                        }
                    }
                    callback(null, response);
                });
            } else {
                callback(null, userDoesNotExist());
            }
            
            
        });
    }
};

function missingUserID() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The userID is missing in the request body.",
        })
    }

    return response;
}

function userDoesNotExist() {
    const response = {
        statusCode: 404,
        body: JSON.stringify({
            error: "The user does not exist.",
        })
    }

    return response;
}

function serverError() {
    const response = {
        statusCode: 500,
        body: JSON.stringify({
            error: "A server error occurred.",
        })
    }

    return response;
}