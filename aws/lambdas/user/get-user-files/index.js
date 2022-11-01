const AWS = require("aws-sdk");
const jwt_decode = require('jwt-decode');
const { getUserFiles } = require("/opt/db_connector");
const Response = require("/opt/response");

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
};