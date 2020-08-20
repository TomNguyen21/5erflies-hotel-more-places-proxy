const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const PORT = 3000;

// create middleware
let logRequests = (req, res, next) => {
  console.log(`Request type: ${req.method} from path: ${req.path}`);
  next();
}

app.use(logRequests);
app.use(express.static(path.join(__dirname, '../public')))

// create routes
app.get('/listing', (req, res) => {
  axios.get(`http://localhost:3001/listing/?propertyId=${req.query.propertyId}`)
    .then( (results) => {
      res.status(200).send(results.data);
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
})
app.get('/reviews', (req, res) => {
  axios.get(`http://localhost:3002/reviews/?propertyId=${req.query.propertyId}`)
    .then( (results) => {
      res.status(200).send(results.data);
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
})
app.get('/test1', (req, res) => {
  axios.get(`http://localhost:3003/test1/?propertyId=${req.query.propertyId}`)
    .then( (results) => {
      res.status(200).send(results.data);
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
})

// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port: `, PORT)
  }
});