var AWS = require("aws-sdk");

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const userID = event.userID;

    var response
    if (userID == null) {
        response = missingUserID();
    } else {
        // Check if the user and their prefab exist in the database
        response = generatePresignedURL(userID)
    }
    
    callback(null, response)
};

// TODO: Change file extension to .prefab
function generatePresignedURL(userID) {
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'metanoia-prefabs',
        Key: userID + ".txt",
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

function missingUserID() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The userID is missing in the request body.",
        })
    }

    return response;
}