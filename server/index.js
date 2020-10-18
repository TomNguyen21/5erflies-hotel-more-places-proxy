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
  axios.get(`http://54.193.221.78:3001/listing/?propertyId=${req.query.propertyId}`)
    .then( (results) => {
      res.status(200).send(results.data);
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
})
app.get('/reviews', (req, res) => {
  axios.get(`http://54.219.11.204:3002/reviews/?propertyId=${req.query.propertyId}`)
    .then( (results) => {
      res.status(200).send(results.data);
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
})
app.get('/morePlaces', (req, res) => {
  axios.get(`http://54.219.218.34:3003/morePlaces/?propertyId=${req.query.propertyId}`)
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