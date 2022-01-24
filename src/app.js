const express = require('express');
const errorMiddleware = require('./middlewares/error');
const app = express();

app.use(express.json());

//Route Imports
const product = require('./routes/product.routes');
const user = require('./routes/user.routes');

app.use('/api/v1', product);
app.use('/api/v1', user);

// Middleware
// error
app.use(errorMiddleware);

module.exports = app;
