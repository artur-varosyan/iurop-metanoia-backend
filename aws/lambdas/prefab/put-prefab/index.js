const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const jwt_decode = require('jwt-decode');
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    const authorization = event.headers.authorization;

    if (authorization == null) {
        callback(null, Response.badRequest("The token is missing in the Authorization header of the request."));
    }

    const token = authorization.split(' ')[1];
    let userID;
    try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        userID = decodedToken.sub;
    } catch (e) {
        console.log(e);
        callback(null, Response.badRequest("The JWT token provided is invalid."));
    }

    const newPrefabID = uuidv4();
    console.log(newPrefabID);
    const response = generatePresignedURL(newPrefabID, userID);
    callback(null, response);
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