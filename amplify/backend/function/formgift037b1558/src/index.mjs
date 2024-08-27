import awsServerlessExpress from 'aws-serverless-express';
import app from './app.mjs';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event, context) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;

  console.log(event.queryStringParameters);
  console.log('body: ', event.body);
};


