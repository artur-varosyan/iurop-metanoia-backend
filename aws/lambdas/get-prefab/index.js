var AWS = require("aws-sdk");
const { getUserPrefabID } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, missinguserID());
    } else {
        var response;
        
        // Check if the user and their prefab exist in the database
        getUserPrefabID(userID, function(err, prefabID) {
            if (err) {
                response = serverError();
            }
            else if (prefabID) {
                response = generatePresignedURL(prefabID);
            } else {
                response = userDoesNotExist();
            }
            
            callback(null, response);
        });
    }
};

function generatePresignedURL(prefabID) {
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'metanoia-prefabs',
        Key: prefabID + '.prefab',
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