const AWS = require("aws-sdk");
const { checkIfUserExists, getUserFiles } = require("/opt/db_connector")
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    } else {
        let response;

        // Check if the user exists in the database
        // TODO: Authenticate the user
        checkIfUserExists(userID, function(err, exists) {
            if (err) {
                callback(null, Response.serverError());
            }
            else if (exists == true) {
                let response;

                getUserFiles(userID, function(err, files) {
                    if (err) {
                        response = Response.serverError();
                    } else {
                        const content = {files: files};
                        response = Response.success(content);
                    }
                    callback(null, response);
                });
            } else {
                callback(null, Response.notFound("The user does not exist."));
            }
            
            
        });
    }
};