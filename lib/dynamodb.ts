import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  // Use local DynamoDB if endpoint is set
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
  }),
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    : process.env.DYNAMODB_ENDPOINT
    ? {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy',
      }
    : undefined, // Will use IAM role when deployed to Amplify
});

// Create document client for easier operations
export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

// Table names
export const TABLES = {
  NEWS_ARTICLES: process.env.DYNAMODB_TABLE_NEWS || 'nebbulon-news-articles',
  ADMINS: process.env.DYNAMODB_TABLE_ADMINS || 'nebbulon-admins',
};

// Helper functions
export const dynamoDB = {
  put: async (tableName: string, item: any) => {
    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    return docClient.send(command);
  },

  get: async (tableName: string, key: any) => {
    const command = new GetCommand({
      TableName: tableName,
      Key: key,
    });
    const response = await docClient.send(command);
    return response.Item;
  },

  query: async (tableName: string, params: any) => {
    const command = new QueryCommand({
      TableName: tableName,
      ...params,
    });
    const response = await docClient.send(command);
    return response.Items || [];
  },

  scan: async (tableName: string, params?: any) => {
    const command = new ScanCommand({
      TableName: tableName,
      ...params,
    });
    const response = await docClient.send(command);
    return response.Items || [];
  },

  update: async (tableName: string, key: any, updates: any) => {
    const updateExpression = Object.keys(updates)
      .map((key, index) => `#field${index} = :value${index}`)
      .join(', ');

    const expressionAttributeNames = Object.keys(updates).reduce(
      (acc, key, index) => ({
        ...acc,
        [`#field${index}`]: key,
      }),
      {}
    );

    const expressionAttributeValues = Object.keys(updates).reduce(
      (acc, key, index) => ({
        ...acc,
        [`:value${index}`]: updates[key],
      }),
      {}
    );

    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const response = await docClient.send(command);
    return response.Attributes;
  },

  delete: async (tableName: string, key: any) => {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key,
    });
    return docClient.send(command);
  },
};

export default dynamoDB;
