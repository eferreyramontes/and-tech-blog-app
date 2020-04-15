'use strict';

const dynamo = require('dynamodb');
const Joi = require('joi');
const uuid = require('uuid');

const Post = dynamo.define('Post', {
  hashKey: 'id',

  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,

  schema: {
    id: Joi.string().required(),
    title: Joi.string().min(2).max(70).required(),
    path: Joi.string().required(),
    icon: Joi.string().required(),
    status: Joi.string().min(2).max(10).required(),
    content: Joi.string().required()
  }
});

module.exports.createPost = async (event, context) => {
  console.log(`Request iniciated with event: ${JSON.stringify(event)}`);

  try {
    const post = new Post({
      id: uuid.v4(),
      title: 'Testing a new post with Serverless',
      path: 'testing-a-new-post-with-serverless',
      icon: 'java',
      status: 'CREATED',
      content: 'Today, we are excited to announce the limited preview...'
    });
    await post.save();
    console.log('created post in DynamoDB', post.get('title'))
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Post created successfully',
        post: post,
      }),
    };
  } catch (err) {
    console.log('error in saving account', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong!',
        error: err
      }),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
