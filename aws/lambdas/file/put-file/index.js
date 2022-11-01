const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { checkIfUserExists, addFileRecord } = require("/opt/db_connector");
const Response = require("/opt/response");

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID or filename are missing in the request body."));
    }

    // The unique id of the file owner
    const userID = event.queryStringParameters.userID;
    const filename = event.queryStringParameters.filename;
    const altText = event.queryStringParameters.alt_text;

    if (userID == null || filename == null) {
        callback(null, Response.badRequest("The userID or filename are missing in the request body."));
    } else {
        let response;

        // Check if the user exists in the database
        // TODO: Authenticate the user
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                response = Response.serverError();
                callback(null, response);
            }
            else if (exists == true) {
                let response;

                // TODO: Move this to outside of the lambda
                addFileRecord(filename, altText, userID, function(err, fileID) {
                    if (err) {
                        response = Response.serverError();
                    } else {
                        response = generatePresignedURL(fileID, filename, userID);
                    }

                    callback(null, generatePresignedURL(fileID, filename, userID));
                });
            } else {
                response = Response.notFound("The user does not exist.");
                callback(null, response);
            }
        });
    }
};

function generatePresignedURL(fileID, filename, userID) {
    console.log(fileID, filename, userID)

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


    const content = {
        fileID: fileID,
        url: url
    }

    return Response.success(content);
}