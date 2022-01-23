const express = require('express');
const errorMiddleware = require('./middlewares/error');
const app = express();

app.use(express.json());

//Route Imports
const product = require('./routes/product.routes');

app.use('/api/v1', product);

// Middleware
// error
app.use(errorMiddleware);

module.exports = app;
