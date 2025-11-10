// Lambda function to track article views and analytics
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
    const body = JSON.parse(event.body);
    const { articleId, sessionId, referrer, userAgent } = body;

    if (!articleId || !sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Article ID and session ID are required'
        })
      };
    }

    // Track view in analytics table
    const analyticsEntry = {
      articleId,
      sessionId,
      timestamp: new Date().toISOString(),
      referrer: referrer || 'direct',
      userAgent: userAgent || 'unknown',
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE_ANALYTICS,
      Item: analyticsEntry
    }).promise();

    // Increment article view count
    await dynamodb.update({
      TableName: process.env.DYNAMODB_TABLE_NEWS,
      Key: { _id: articleId },
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
        message: 'View tracked successfully'
      })
    };
  } catch (error) {
    console.error('Error tracking view:', error);
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
