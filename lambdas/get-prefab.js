var AWS = require("aws-sdk")
var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'metanoia-prefabs',
        Key: 'test.txt',
        Expires: 60,
    });

    callback(null, url);
};
