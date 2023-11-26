const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_PRIVATEKEY
});
const dynamodb = new AWS.DynamoDB();
const db = new AWS.DynamoDB.DocumentClient()

const Table = 'users'
module.exports = { dynamodb, db, Table }