// Lambda function to add comments
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);
    const { articleId, content, author, email, parentId } = body;

    // Validate required fields
    if (!articleId || !content || !author || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Article ID, content, author name, and email are required'
        })
      };
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Valid email address is required'
        })
      };
    }

    // Create comment object
    const comment = {
      _id: uuidv4(),
      articleId,
      content: content.trim(),
      author: author.trim(),
      email,
      parentId: parentId || null,
      likes: 0,
      dislikes: 0,
      status: 'pending', // pending, approved, rejected
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to DynamoDB
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE_COMMENTS,
      Item: comment
    }).promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        comment,
        message: 'Comment submitted successfully and is pending approval'
      })
    };
  } catch (error) {
    console.error('Error adding comment:', error);
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
