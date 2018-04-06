'use strict';
var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

function buildResponse(item) {
    var response = {
        "statusCode": 200,
        "body": JSON.stringify(item),
        "isBase64Encoded": false
    };
    return response;
}

module.exports.getPerson = (event, context, callback) => {

    console.log("running lambda");
    var ddb = new AWS.DynamoDB();

    var params = {
        TableName: 'Person',
        Key: {
            'id': {N: event.pathParameters.id}
        }
    };
    var item, error;
    console.log("getting the  item");
    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log(err)
            error = err;
        } else {
            console.log(data)
            item = data.Item
        }
        var response = buildResponse(item);
        callback(error, response);
    });

};
