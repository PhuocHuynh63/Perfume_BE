
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const helmet = require('helmet');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const { corsOptions } = require('./configs/config.cors');
const cookieParser = require('cookie-parser');
const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//config cors
app.use(cors(corsOptions));

//middlewares
app.use(morgan('dev'));
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//db
require('./dbs/init.mongodb');

//routes
app.use('/', require('./routes/index'));

//Middleware errors
app.use(errorHandler);

module.exports = app;