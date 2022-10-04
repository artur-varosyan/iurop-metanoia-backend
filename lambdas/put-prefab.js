var AWS = require("aws-sdk");

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const userID = event.queryStringParameters.userID;

    var response
    if (userID == null) {
        response = missinguserID();
    } else {
        // Check if the user exists in the database
        // Check whether the user already has a prefab
        response = generatePresignedURL(userID)
    }
    
    callback(null, response)
};

function generatePresignedURL(userID) {
    
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'metanoia-prefabs',
        Key: userID,
        Expires: 600,  // longer expiration for upload
    })

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