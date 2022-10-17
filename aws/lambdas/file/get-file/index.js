const AWS = require("aws-sdk");
const { getFile } = require("/opt/db_connector")
const Response = require("/opt/response")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    if (event.queryStringParameters == null) {
        callback(null, Response.badRequest("The fileID is missing in the request body."));
    }
    const fileID = event.queryStringParameters.fileID;

    if (fileID == null) {
        callback(null, Response.badRequest("The fileID is missing in the request body."));
    } else {
        let response;

        // Check if the file exists in the database
        getFile(fileID, function(err, file) {
            if (err) {
                response = Response.serverError();
            }
            else if (file) {
                response = generatePresignedURL(file);
            } else {
                response = Response.notFound("The file does not exist.");
            }
            
            callback(null, response);
        });
    }
};

function generatePresignedURL(file) {
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'metanoia-files',
        Key: file.fileID,
        Expires: 60,
    });

    const content = {
        file_descriptor: file,
        url: url
    }

    return Response.success(content);
}