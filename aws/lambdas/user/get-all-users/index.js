const AWS = require("aws-sdk");
const { getAllUsers } = require("/opt/db_connector")
const Response = require("/opt/response")

exports.handler = (event, context, callback) => {
    let response;

    getAllUsers(function(err, users) {
        if (err) {
            response = Response.serverError();
        } else {
            response = Response.success(users);
        }

        callback(null, response);
    });
};