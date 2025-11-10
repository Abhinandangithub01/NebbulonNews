// Lambda function for newsletter subscription
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();
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
    const { email } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Valid email address is required'
        })
      };
    }

    // Check if already subscribed
    const checkParams = {
      TableName: process.env.DYNAMODB_TABLE_SUBSCRIBERS,
      Key: { email }
    };

    const existing = await dynamodb.get(checkParams).promise();

    if (existing.Item) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'You are already subscribed to our newsletter',
          alreadySubscribed: true
        })
      };
    }

    // Add to subscribers table
    const subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      source: 'website',
      _id: uuidv4()
    };

    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE_SUBSCRIBERS,
      Item: subscriber
    }).promise();

    // Send welcome email via SES
    const emailParams = {
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: 'Welcome to Nebbulon News!'
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1 style="color: #8AB4F8;">Welcome to Nebbulon News!</h1>
                  <p>Thank you for subscribing to our newsletter.</p>
                  <p>You'll receive the latest news and updates directly in your inbox.</p>
                  <p style="margin-top: 30px;">
                    <a href="${process.env.WEBSITE_URL}" style="background-color: #8AB4F8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Visit Nebbulon News</a>
                  </p>
                  <p style="color: #9AA0A6; font-size: 12px; margin-top: 40px;">
                    If you didn't subscribe, you can safely ignore this email.
                  </p>
                </body>
              </html>
            `
          }
        }
      }
    };

    await ses.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.'
      })
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
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
