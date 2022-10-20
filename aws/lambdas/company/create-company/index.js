const AWS = require("aws-sdk");
const { addCompany, addUserToCompany } = require("/opt/db_connector")
const Response = require("/opt/response");

exports.handler = (event, context, callback) => {

    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The company attributes are missing in the request body."));
    }

    const name = event.queryStringParameters.company_name;
    const members = event.queryStringParameters.members;

    if (name == null) {
        callback(null, Response.badRequest("The company attributes are missing in the request body."));
    } else {
        let response;

        addCompany(name, function(err, companyID) {
            if (err) {
                response = Response.serverError();
            } else {
                // TODO: Allow to add members of the company at company creation
                const content = {companyID: companyID};
                response = Response.success(content);
            }

            callback(null, response);
        });

    }
}
