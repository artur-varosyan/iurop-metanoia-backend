const AWS = require("aws-sdk");
const { getUserCompanies } = require("/opt/db_connector");
const Response = require("/opt/response");

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID is missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;

    if (userID == null) {
        callback(null, Response.badRequest("The userID is missing in the request body."));
    } else {
        let response;
        
        getUserCompanies(userID, function(err, roles) {
            if (err) {
                response = Response.serverError();
            } else {
                const content = {company_memberships: roles}
                response = Response.success(content);
            }

            callback(null, response);
        });

    }
};