const AWS = require("aws-sdk");
const { getUser } = require("/opt/db_connector")
const Response = require("/opt/response")

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    }

    const username = event.queryStringParameters.username;
    const userID = event.queryStringParameters.userID;

    if (username == null && userID == null) {
        callback(null, Response.badRequest("The user attributes are missing in the request body."));
    } else {
        let response;

        getUser(userID, username, function(err, user) {
            if (err) {
                response = Response.serverError();
            } else if (user == null) {
                response = Response.notFound("The user does not exist.");
            } else {
                response = Response.success(user);
            }

            callback(null, response);
        });

    }
};