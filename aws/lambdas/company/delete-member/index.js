const AWS = require("aws-sdk");
const { checkIfUserExists, checkIfCompanyExists, deleteCompanyMember } = require("/opt/db_connector");
const Response = require("/opt/response");

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID and/or companyID are missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;
    const companyID = event.queryStringParameters.companyID;

    if (userID == null || companyID == null) {
        callback(null, Response.badRequest("The userID and/or are missing in the request body."));
    } else {
        checkPreconditions(userID, companyID, callback);
    }
};

function checkPreconditions(userID, companyID, callback) {
    checkIfUserExists(userID, function(err, exists) {
        if (err) {
            callback(null, Response.serverError());
        } else if (exists == false) {
            callback(null, Response.notFound("This user does not exist."));
        } else {
            checkIfCompanyExists(companyID, function(err2, company_exists) {
                if (err2) {
                    callback(null, Response.serverError());
                } else if (company_exists == false) {
                    callback(null, Response.notFound("This company does not exist."));
                } else {
                    proceed(userID, companyID, callback);
                }
            });
        }
    });
}

function proceed(userID, companyID, callback) {
    deleteCompanyMember(userID, companyID, function(err, success) {
        if (err) {
            callback(null, Response.serverError());
        } else {
            callback(null, Response.success("The user has been successfully removed from the company."));
        }
    });
}