var AWS = require("aws-sdk");

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const fileID = event.queryStringParameters.fileID;

    var response
    if (fileID == null) {
        response = missingfileID();
    } else {
        // Check if the user exists in the database
        // Check whether the use already has a prefab
        response = generatePresignedURL(fileID)
    }
    
    callback(null, response)
};

function generatePresignedURL(fileID) {
    
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'metanoia-prefabs',
        Key: fileID,
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

function missingfileID() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The fileID is missing in the request body.",
        })
    }

    return response;
}