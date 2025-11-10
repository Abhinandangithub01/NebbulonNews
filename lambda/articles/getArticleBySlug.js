// Lambda function to get single article by slug
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    const { slug } = event.pathParameters || {};

    if (!slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Slug parameter is required'
        })
      };
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NEWS,
      IndexName: 'slug-index',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: {
        ':slug': slug
      }
    };

    const result = await dynamodb.query(params).promise();

    if (result.Items.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Article not found'
        })
      };
    }

    const article = result.Items[0];

    // Increment view count
    await dynamodb.update({
      TableName: process.env.DYNAMODB_TABLE_NEWS,
      Key: { _id: article._id },
      UpdateExpression: 'SET #views = if_not_exists(#views, :zero) + :inc',
      ExpressionAttributeNames: {
        '#views': 'views'
      },
      ExpressionAttributeValues: {
        ':inc': 1,
        ':zero': 0
      }
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        article: {
          ...article,
          views: (article.views || 0) + 1
        }
      })
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
