const handler = require('./handler');
const AWS = require('aws-sdk-mock');

AWS.mock('DynamoDB', 'getItem', function (params, callback){

    const data = {Item: {id: '1', name: 'Ignacio', lastName: 'Suay'}}

  callback(null, data);
});

test('adds 1 + 2 to equal 3', () => {

    const event = {pathParameters: {id: '1'}}

  handler.getPerson(event, null, (err, data) => {
   console.log(data);
   const body = JSON.parse(data.body)

   expect(body.id).toBe('1');
   expect(body.name).toBe('Ignacio');
   expect(body.lastName).toBe('Suay');
  });

});