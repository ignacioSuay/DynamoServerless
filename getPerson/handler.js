'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

function buildResponse(code, item) {
    return {
        "statusCode": code,
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

    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log(err);
            callback(error, buildResponse(500, err));
        }

        callback(error, buildResponse(200, data.Item));
    });

};
