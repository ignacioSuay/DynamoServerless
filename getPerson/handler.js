'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

function buildResponse(item) {
    return {
        "statusCode": 200,
        "body": JSON.stringify(item),
        "isBase64Encoded": false
    };
}

module.exports.getPerson = (event, context, callback) => {

    console.log("running lambda");
    const ddb = new AWS.DynamoDB();

    const params = {
        TableName: 'Person',
        Key: {
            'id': {N: event.pathParameters.id}
        }
    };
    let item, error;
    console.log("getting the  item");
    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log(err);
            error = err;
        } else {
            console.log(data);
            item = data.Item
        }
        callback(error, buildResponse(item));
    });

};
