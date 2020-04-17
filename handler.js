'use strict';

const dynamo = require('dynamodb');
const Joi = require('joi');
const uuid = require('uuid');

const Post = dynamo.define('Post', {
  hashKey: 'id',

  timestamps: true, // (updatedAt, createdAt)

  schema: {
    id: Joi.string(),
    title: Joi.string().min(2).max(70).required(),
    path: Joi.string().required(),
    icon: Joi.string().required(),
    status: Joi.string().min(2).max(10).required(),
    content: Joi.string().required()
  }
});

module.exports.createPost = async (event, context) => {
  try {
    const postObject = JSON.parse(event.body);
    postObject.id = uuid.v4();
    const post = new Post(postObject);
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
};

module.exports.listPosts = async (event, context) => {
  try {
    const posts = await Post.scan().loadAll().exec().promise();
    console.log(`Posts loaded: ${JSON.stringify(posts)}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Post listed successfully',
        posts: posts
      }),
    };
  } catch (err) {
    console.log('There was an error trying to list posts', err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong!',
        error: err
      }),
    };
  }
}