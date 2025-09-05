const express = require('express');
const app = express();
// Requiring Body-Parser Package
const bodyParser = require('body-parser');
// Requiring CORS Package
const cors = require('cors');

module.exports = app;

// Add middleware for handling CORS requests from index.html
app.use(cors());


// Add middware for parsing request bodies here:
app.use(bodyParser.json());


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);


