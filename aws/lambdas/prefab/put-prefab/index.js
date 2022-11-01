const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { checkIfUserExists } = require("/opt/db_connector")
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID/username is missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, Response.badRequest("The userID/username is missing in the request body."));
    } else {
        let response;

        // Check if the user exists in the database
        // TODO: Authenticate the user
        // TODO: Check whether the user already has a prefab
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                response = Response.serverError();
                callback(null, response);
            }
            else if (exists == true) {
                const newPrefabID = uuidv4();
                console.log(newPrefabID);
                response = generatePresignedURL(newPrefabID, userID);
                callback(null, response);
            } else {
                response = Response.notFound("The user does not exist.");
                callback(null, response);
            }
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

    const content = {url: url}
    return Response.success(content);
}