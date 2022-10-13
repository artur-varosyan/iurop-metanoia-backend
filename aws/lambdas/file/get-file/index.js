var AWS = require("aws-sdk");
const { getFile } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {

    const fileID = event.queryStringParameters.fileID;

    if (fileID == null) {
        callback(null, missingFileID());
    } else {
        var response;
        
        // Check if the file exists in the database
        getFile(fileID, function(err, file) {
            if (err) {
                response = serverError();
            }
            else if (file) {
                response = generatePresignedURL(file);
            } else {
                response = fileDoesNotExist();
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

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            file_descriptor: file,
            url: url,
        })
    }

    return response;
}

function missingFileID() {
    const response = {
        statusCode: 400,
        body: JSON.stringify({
            error: "The fileID is missing in the request body.",
        })
    }

    return response;
}

function fileDoesNotExist() {
    const response = {
        statusCode: 404,
        body: JSON.stringify({
            error: "The file does not exist.",
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