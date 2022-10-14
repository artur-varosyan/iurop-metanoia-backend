var AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { checkIfUserExists } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) callback(null, missingUserID());

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, missingUserID());
    } else {
        var response;
        
        // Check if the user exists in the database
        // TODO: Authenticate the user
        // TODO: Check whether the user already has a prefab
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                response = serverError();
            }
            else if (exists == true) {
                const newPrefabID = uuidv4();
                console.log(newPrefabID);
                response = generatePresignedURL(newPrefabID, userID);
            } else {
                response = userDoesNotExist();
            }
            
            callback(null, response);
        });
    }
};

function generatePresignedURL(prefabID, userID) {
    
    const metadata = {
        'userID': userID
    }
    
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'metanoia-prefabs',
        Key: prefabID + '.prefab',
        Expires: 600,  // longer expiration for upload
        Metadata: metadata
    })


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            url: url,
        })
    }

    return response;
}

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