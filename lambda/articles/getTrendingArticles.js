// Lambda function to get trending articles
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
    const { limit = 10, days = 7 } = event.queryStringParameters || {};
    
    // Calculate date threshold (articles from last N days)
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - parseInt(days));

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NEWS,
      FilterExpression: 'published = :published AND createdAt >= :dateThreshold',
      ExpressionAttributeValues: {
        ':published': true,
        ':dateThreshold': dateThreshold.toISOString()
      }
    };

    const result = await dynamodb.scan(params).promise();

    // Sort by views (descending) and take top N
    const trending = result.Items
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, parseInt(limit));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        articles: trending,
        count: trending.length
      })
    };
  } catch (error) {
    console.error('Error fetching trending articles:', error);
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
