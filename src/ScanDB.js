import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    QueryCommand,
    ScanCommand,
    UpdateCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import { email } from "@aws-amplify/data-schema/dist/esm/ModelField";

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "formtable";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "email";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/items";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
    switch (type) {
        case "N":
            return Number.parseInt(param);
        default:
            return param;
    }
}

/************************************
* HTTP Get method to list objects *
************************************/

app.get(path, async function (req, res) {
    var params = {
        TableName: tableName,
        FileterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': { S: email },
        },
        // Select: 'ALL_ATTRIBUTES',
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        res.json(data.Items);
    } catch (err) {
        res.statusCode = 500;
        res.json({ error: 'Could not load items: ' + err.message });
    }
});
