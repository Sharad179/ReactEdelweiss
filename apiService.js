var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer'); // v1.0.5
var upload = multer();


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(3001,function(err){
    if(err){
        return console.log(err);
    }
    console.log('API Server is listening to http://localhost:3001');
})

