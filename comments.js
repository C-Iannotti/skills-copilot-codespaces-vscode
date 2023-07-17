// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create Express App
const app = express();

// Configure Express App
app.use(bodyParser.json());
app.use(cors());

// In-memory data store
const commentsByPostId = {};

// Create Routes
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // Generate unique id for comment
  const commentId = randomBytes(4).toString('hex');

  // Get content from body
  const { content } = req.body;

  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment to comments
  comments.push({ id: commentId, content });

  // Store comments for post id
  commentsByPostId[req.params.id] = comments;

  // Send back comments
  res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on 4001');
});