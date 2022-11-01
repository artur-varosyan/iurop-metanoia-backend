const AWS = require("aws-sdk");
const { addFileRecord } = require("/opt/db_connector")

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context) => {
    // Get current fileID
    const fileID = event.Records[0].s3.object.key.replace('.prefab', '')
    
    // Get the metadata from the S3 bucket
    s3.headObject({ Bucket: 'metanoia-files', Key: fileID}, function(err, data) {
        if (err) {
            console.log("Error getting the head object: " + err)
        } else {
            const userID = data.Metadata.userid;
            const filename = data.Metadata.filename;
            const altText = data.Metadata.alttext;

            addFileRecord(filename, altText, userID, function(err, fileID) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added file record");
                }
            });
        }
    });
};