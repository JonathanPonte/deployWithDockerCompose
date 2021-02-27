require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const proxy = require('express-http-proxy');
let cors = require('cors');

const {HOST_FRONT, HOST_BACK} = process.env;

const app = express();
app.use(logger('dev'));

app.use(cors());
app.use('/back', proxy(HOST_BACK, {parseReqBody: false})); // Passando buffer para o BACK (Caso nao tenha ele nao passa o back)
app.use('/', proxy(HOST_FRONT));

module.exports = app;
