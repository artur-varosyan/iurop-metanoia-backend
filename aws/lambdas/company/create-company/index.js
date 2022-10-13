var AWS = require("aws-sdk");
const { addCompany, addUserToCompany } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const name = event.queryStringParameters.company_name;
    const members = event.queryStringParameters.members;

    if (name == null) {
        callback(null, missingCompanyDetails());
    } else {
        var response;
        
        addCompany(name, function(err, companyID) {
            if (err) {
                response = serverError();
            } else {
                // TODO: Allow to add members of the company at company creation

                response = successfulCreation(companyID);
            }

            callback(null, response);
        });

    }
};

function missingCompanyDetails() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The company attributes are missing in the request body.",
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

function successfulCreation(companyID) {
    const response = {
        statusCode: 201,
        body: JSON.stringify({
            companyID: companyID,
        })
    }
    return response;
}
