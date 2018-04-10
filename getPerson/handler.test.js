const handler = require('./handler');
const AWS = require('aws-sdk-mock');


AWS.mock('DynamoDB', 'getItem', (params, callback) => {

    const data = {Item: {id: '1', name: 'Ignacio', lastName: 'Suay'}}

    callback(null, data);
});

test('test getPeson should return a person', function () {

    const event = {pathParameters: {id: '1'}};

    handler.getPerson(event, null, (err, data) => {
        console.log(data);
        const body = JSON.parse(data.body)

        expect(body.id).toBe('2');
        expect(body.name).toBe('Ignacio');
        expect(body.lastName).toBe('Suay');
    });

});