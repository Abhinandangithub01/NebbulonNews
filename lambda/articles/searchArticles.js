// Lambda function to search articles
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
    const { q, category, limit = 20 } = event.queryStringParameters || {};

    if (!q || q.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Search query is required'
        })
      };
    }

    const searchTerm = q.toLowerCase().trim();

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NEWS,
      FilterExpression: 'published = :published AND (contains(lower(title), :searchTerm) OR contains(lower(excerpt), :searchTerm) OR contains(lower(content), :searchTerm))',
      ExpressionAttributeValues: {
        ':published': true,
        ':searchTerm': searchTerm
      },
      Limit: parseInt(limit)
    };

    // Add category filter if provided
    if (category) {
      params.FilterExpression += ' AND category = :category';
      params.ExpressionAttributeValues[':category'] = category;
    }

    const result = await dynamodb.scan(params).promise();

    // Sort by relevance (title matches first, then excerpt, then content)
    const sortedResults = result.Items.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm) ? 3 : 0;
      const aExcerpt = a.excerpt.toLowerCase().includes(searchTerm) ? 2 : 0;
      const aContent = a.content.toLowerCase().includes(searchTerm) ? 1 : 0;
      const aScore = aTitle + aExcerpt + aContent;

      const bTitle = b.title.toLowerCase().includes(searchTerm) ? 3 : 0;
      const bExcerpt = b.excerpt.toLowerCase().includes(searchTerm) ? 2 : 0;
      const bContent = b.content.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bScore = bTitle + bExcerpt + bContent;

      return bScore - aScore;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        articles: sortedResults,
        count: sortedResults.length,
        query: q
      })
    };
  } catch (error) {
    console.error('Error searching articles:', error);
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
