// Temporary endpoint for creating new users

var AWS = require("aws-sdk");
const { addUser } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const username = event.queryStringParameters.username;
    const firstName = event.queryStringParameters.first_name;
    const lastName = event.queryStringParameters.last_name;
    const company = event.queryStringParameters.company;
    const tokenCount = event.queryStringParameters.token_count;

    if (username == null || firstName == null || lastName == null) {
        callback(null, missingUserDetails());
    } else {
        var response;
        
        // Create the user
        addUser(username, firstName, lastName, company, tokenCount, function(err, userID) {
            if (err) {
                response = serverError();
            } else {
                response = successfulCreation(userID);
            }

            callback(null, response);
        });

    }
};

function missingUserDetails() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The user attributes are missing in the request body.",
        })
    }

    return response;
}

function serverError() {
    const response = {
        statusCode: 500,
        body: JSON.stringify({
            error: "A server error occurred.",
        })
    }

    return response;
}

function successfulCreation(userID) {
    const response = {
        statusCode: 201,
        body: JSON.stringify({
            userID: userID,
        })
    }
    return response;
}