const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const jwt_decode = require('jwt-decode');
const Response = require("/opt/response");

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    // User Authorization
    const authorization = event.headers.authorization;
    console.log(authorization);

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

    // File metadata
    const filename = event.queryStringParameters.filename;
    let altText = event.queryStringParameters.alt_text;
    if (altText == null) {
        altText = "";
    }

    if (filename == null) {
        callback(null, Response.badRequest("The filename is missing in the request body."));
    } else {
        const fileID = uuidv4();
        callback(null, generatePresignedURL(fileID, filename, userID, altText));
    }
};

function generatePresignedURL(fileID, filename, userID, altText) {
    console.log(fileID, filename, userID)

    const metadata = {
        'filename': filename,
        'userID': userID,
        'altText': altText
    }
    
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'metanoia-files',
        Key: fileID,
        Expires: 600,  // longer expiration for upload
        Metadata: metadata
    })


    const content = {
        fileID: fileID,
        url: url
    }

    return Response.success(content);
}