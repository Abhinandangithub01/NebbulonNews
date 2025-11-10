// Lambda function to get comments for an article
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
    const { articleId } = event.pathParameters || {};

    if (!articleId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Article ID is required'
        })
      };
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_COMMENTS,
      IndexName: 'articleId-index',
      KeyConditionExpression: 'articleId = :articleId',
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':articleId': articleId,
        ':status': 'approved'
      }
    };

    const result = await dynamodb.query(params).promise();

    // Organize comments into tree structure (parent-child)
    const commentsMap = {};
    const rootComments = [];

    result.Items.forEach(comment => {
      commentsMap[comment._id] = { ...comment, replies: [] };
    });

    result.Items.forEach(comment => {
      if (comment.parentId && commentsMap[comment.parentId]) {
        commentsMap[comment.parentId].replies.push(commentsMap[comment._id]);
      } else if (!comment.parentId) {
        rootComments.push(commentsMap[comment._id]);
      }
    });

    // Sort by date (newest first)
    rootComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        comments: rootComments,
        count: result.Items.length
      })
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
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
