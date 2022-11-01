// Create user is now triggered by AWS Cognito

const AWS = require("aws-sdk");
const { addUser } = require("/opt/db_connector")

exports.handler = (event, context, callback) => {
    console.log(event);

    const userID = event.request.userAttributes.sub;
    console.log("userID at lambda: " + userID)
    const username = event.userName;
    const firstName = event.request.userAttributes.given_name;
    const lastName = event.request.userAttributes.family_name;

    // Create the user
    addUser(userID, username, firstName, lastName, null);

    callback(null, event);
};