var AWS = require("aws-sdk");
const { getUser } = require("/opt/db_connector")

exports.handler = (event, context, callback) => {

    const username = event.queryStringParameters.username;
    const userID = event.queryStringParameters.userID;

    if (username == null && userID == null) {
        callback(null, missingUserDetails());
    } else {
        var response;
        
        getUser(userID, username, function(err, user) {
            if (err) {
                response = serverError();
            } else if (user == null) {
                response = userDoesNotExist();
            } else {
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        user: user,
                    })
                }
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

function userDoesNotExist() {
    const response = {
        statusCode: 404,
        body: JSON.stringify({
            error: "The user does not exist.",
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