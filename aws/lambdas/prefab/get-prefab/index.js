const AWS = require("aws-sdk");
const { getUserPrefabID } = require("/opt/db_connector")
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID/username is missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;
    const username = event.queryStringParameters.username;

    if (userID == null && username == null) {
        callback(null, Response.badRequest("The userID/username is missing in the request body."));
    } else {
        let response;

        // Check if the user and their prefab exist in the database
        getUserPrefabID(userID, username, function(err, prefabID) {
            if (err) {
                response = Response.serverError()
            }
            else if (prefabID) {
                response = generatePresignedURL(prefabID);
            } else {
                response = Response.notFound("The user does not exist.")
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

    const content = {url: url};
    return Response.success(content);
}