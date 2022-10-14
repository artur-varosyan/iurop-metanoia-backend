var AWS = require("aws-sdk");
const { getUserPrefabID, addPrefabRecord, updatePrefabRecord } = require("/opt/db_connector")

var s3 = new AWS.S3({
    signatureVersion: 'v4',
});

exports.handler = (event, context) => {
    // Get current prefabID and userID
    const prefabID = event.Records[0].s3.object.key.replace('.prefab', '')
    
    // Get the metadata from the S3 bucket to identify owner of prefab
    s3.headObject({ Bucket: 'metanoia-prefabs', Key: prefabID + '.prefab'}, function(err, data) {
        if (err) {
            console.log("Error getting the head object: " + err)
        } else {
            const userID = data.Metadata.userid;
            
            // Check if a user already has a prefab
            getUserPrefabID(userID, null, function(err, exists) {
                if (err) {
                    console.log("Error checking if user has prefab.")
                } else if (exists) {
                    // If yes update the record
                    updatePrefabRecord(prefabID, userID)
                } else {
                    // If no create a new record
                    addPrefabRecord(prefabID, userID)
                }
            });
            
        }
    });
};