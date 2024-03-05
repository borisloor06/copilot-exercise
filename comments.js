// create a web server 
const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./comments');

const app = express();
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Path: comments.test.js
const request = require('supertest');
const app = require('./comments');

describe('GET /comments', () => {
  it('respond with json containing a list of all comments', (done) => {
    request(app)
      .get('/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /comments', () => {
  it('respond with json', (done) => {
    request(app)
      .post('/comments')
      .send({ username: 'test', comment: 'test' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});