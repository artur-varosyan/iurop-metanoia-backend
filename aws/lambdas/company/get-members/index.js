const AWS = require("aws-sdk");
const { checkIfCompanyExists, getCompanyMembers } = require("/opt/db_connector");
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
        
        checkIfCompanyExists(companyID, function(err, exists) {
            if (err) {
                callback(null, Response.serverError())
            } else if (exists == false) {
                callback(null, Response.notFound("The company does not exist."));
            } else {
                getCompanyMembers(companyID, function(err, members) {
                    if (err) {
                        console.log(err);
                        callback(null, Response.serverError())
                    } else {
                        callback(null, Response.success(members))
                    }
                })
            }
        });

    }
};