// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set Region from JSON file

AWS.config.loadFromPath('../credentials/config.json');
const { v4: uuidv4 } = require('uuid');
const data = require('../mocks/products.json');

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var productTable = 'Product';
var stockTable = 'Stock';

for (const product of data.products) {
    const id = uuidv4();
    var params = {
        TableName: productTable,
        Item: {'id' : {S: id}, 'title' : {S: product.title}, 'description': {S: product.description},
            'price': {S: product.price.toString()}
        }
    };
    post();

    var params = {
      TableName: stockTable,
      Item: {'product_id' : {S: id}, 'count' : {N: '10'}}
    };
    post();
}

function post () {
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}