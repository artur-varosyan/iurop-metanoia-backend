// Temporary endpoint for creating new users

const AWS = require("aws-sdk");
const { addUser } = require("/opt/db_connector")
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    }

    const username = event.queryStringParameters.username;
    const firstName = event.queryStringParameters.first_name;
    const lastName = event.queryStringParameters.last_name;
    const tokenCount = event.queryStringParameters.token_count;

    if (username == null || firstName == null || lastName == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    } else {
        let response;
        
        // Create the user
        addUser(username, firstName, lastName, tokenCount, function(err, userID) {
            if (err) {
                response = Response.serverError()
            } else {
                const content = {userID: userID}
                response = Response.created(content);
            }

            callback(null, response);
        });

    }
};