var AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { checkIfUserExists, addFileRecord } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    // The unique id of the file owner
    const userID = event.queryStringParameters.userID;
    const filename = event.queryStringParameters.filename;
    const altText = event.queryStringParameters.alt_text;

    if (userID == null || filename == null) {
        callback(null, missingAttributes());
    } else {
        var response;
        
        // Check if the user exists in the database
        // TODO: Authenticate the user
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                response = serverError();
            }
            else if (exists == true) {
                let response;

                // TODO: Move this to outside of the lambda
                addFileRecord(filename, altText, userID, function(err, fileID) {
                    if (err) {
                        response = serverError();
                    } else {
                        response = generatePresignedURL(fileID, filename, userID);
                    }

                    callback(null, response);
                });
            } else {
                response = userDoesNotExist();
            }
            
            callback(null, response);
        });
    }
};

function generatePresignedURL(fileID, filename, userID) {
    
    const metadata = {
        'filename': filename,
        'userID': userID
    }
    
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'metanoia-files',
        Key: fileID,
        Expires: 600,  // longer expiration for upload
        Metadata: metadata
    })


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            fileID: fileID,
            url: url,
        })
    }

    return response;
}

function missingAttributes() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The userID or filename are missing in the request body.",
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