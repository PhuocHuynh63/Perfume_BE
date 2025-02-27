
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { errorResponse } = require('./middlewares/http.response');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

//config cors
app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
require('./dbs/init.mongodb');

//routes
app.use('/', require('./routes/index'));

//Middleware errors
app.use(errorHandler);

module.exports = app;