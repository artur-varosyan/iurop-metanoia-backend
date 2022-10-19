const AWS = require("aws-sdk");
const { getAllCompanies } = require("/opt/db_connector")
const Response = require("/opt/response")

exports.handler = (event, context, callback) => {
    let response;

    getAllCompanies(function(err, companies) {
        if (err) {
            response = Response.serverError();
        } else {
            const content = {companies: companies};
            response = Response.success(companies);
        }

        callback(null, response);
    });
};