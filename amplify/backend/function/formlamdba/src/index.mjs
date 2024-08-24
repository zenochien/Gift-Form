import awsServerlessExpress from 'aws-serverless-express';
import app from './app.mjs';

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = (event, context, callback) => {
  console.log(event.queryStringParameters);
  console.log('body: ', event.body);
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
