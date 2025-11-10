// Lambda function to upload images to S3
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
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
    const { image, fileName, contentType } = body;

    if (!image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Image data is required'
        })
      };
    }

    // Decode base64 image
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
    // Generate unique filename
    const fileExtension = contentType?.split('/')[1] || 'jpg';
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const key = `images/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${uniqueFileName}`;

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: imageBuffer,
      ContentType: contentType || 'image/jpeg',
      ACL: 'public-read',
      CacheControl: 'max-age=31536000', // 1 year
      Metadata: {
        originalName: fileName || 'upload',
        uploadedAt: new Date().toISOString()
      }
    };

    await s3.putObject(uploadParams).promise();

    // Generate CloudFront URL
    const imageUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: imageUrl,
        key: key,
        size: imageBuffer.length
      })
    };
  } catch (error) {
    console.error('Error uploading image:', error);
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
