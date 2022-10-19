const AWS = require("aws-sdk");
const { checkIfUserExists, checkIfCompanyExists, addCompanyMember } = require("/opt/db_connector");
const Response = require("/opt/response");

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The userID and/or companyID are missing in the request body."));
    }

    const userID = event.queryStringParameters.userID;
    const companyID = event.queryStringParameters.companyID;
    const role = event.queryStringParameters.role;

    if (userID == null || companyID == null) {
        callback(null, Response.badRequest("The userID and/or are missing in the request body."));
    } else {
        checkPreconditions(userID, companyID, role, callback);
    }
};

function checkPreconditions(userID, companyID, role, callback) {
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
                    proceed(userID, companyID, role, callback);
                }
            });
        }
    });
}

function proceed(userID, companyID, role, callback) {
    addCompanyMember(userID, companyID, role, function(err, success) {
        if (err) {
            callback(null, Response.serverError());
        } else {
            callback(null, Response.success("The user has been successfully added as a member to the company."));
        }
    });
}