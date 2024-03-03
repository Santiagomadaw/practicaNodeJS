const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/ads');

const app = express();
require('./lib/connectMogoose');

// view engine setup
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

// ruta de la API

app.use('/api/anuncio', apiRouter);

// ruta website

app.use('/', indexRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {

    next(createError(404));
});

// error handler


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    /* This code snippet is checking if the error object has a property called `array`. If it does, it
    assumes that the error is related to validation. It then extracts information from the first
    element of the `array` property (assuming it's an array) and constructs a custom error message
    using details like the type, path, location, and message of the error. Finally, it sets the error
    status to 422, which typically represents a validation error. */
    if (err.array) {
        const errInfo = err.array({ })[0];
        err.message = `Not valid - ${errInfo.type} ${errInfo.path} in ${errInfo.location} ${errInfo.msg}`;
        err.status = 422;
    }
    
    // set locals, only providing error in development
    res.locals.message = err.message;
    /* `res.locals.error = req.app.get('env') === 'development' ? err : {};` is setting the `error`
    property in the response locals based on the environment mode of the application. */
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);

    /* This code snippet is checking if the original URL of the request starts with '/api/'. If it
    does, it means that the error occurred in the API route. In that case, it sends a JSON response
    containing an error message extracted from the `err` object. This is done to handle errors
    specifically for API requests by returning a JSON response with the error message instead of
    rendering an error page. */
    if(req.originalUrl.startsWith('/api/')){
        res.json({error: err.message});
        return;
    }
    
    res.render('error');
});

module.exports = app;
