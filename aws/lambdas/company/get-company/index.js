const AWS = require("aws-sdk");
const { getCompany } = require("/opt/db_connector");
const Response = require("/opt/response");

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The companyID is missing in the request body."));
    }

    const companyID = event.queryStringParameters.companyID;

    if (companyID == null) {
        callback(null, Response.badRequest("The companyID is missing in the request body."));
    } else {
        let response;
        
        getCompany(companyID, function(err, company) {
            if (err) {
                response = Response.serverError();
            } else if (company == null) {
                response = Response.notFound("The company does not exist.");
            } else {
                response = Response.success(company);
            }

            callback(null, response);
        });

    }
};