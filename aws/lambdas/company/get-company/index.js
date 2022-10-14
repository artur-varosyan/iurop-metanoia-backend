var AWS = require("aws-sdk");
const { getCompany } = require("/opt/db_connector");

exports.handler = (event, context, callback) => {
    if (event.queryStringParameters == null) callback(null, missingCompanyDetails());

    const companyID = event.queryStringParameters.companyID;

    if (companyID == null) {
        callback(null, missingCompanyDetails());
    } else {
        var response;
        
        getCompany(companyID, function(err, company) {
            if (err) {
                response = serverError();
            } else if (company == null) {
                response = companyDoesNotExist();
            } else {
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        company: company,
                    })
                };
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

function companyDoesNotExist() {
    const response = {
        statusCode: 404,
        body: JSON.stringify({
            error: "The company does not exist.",
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