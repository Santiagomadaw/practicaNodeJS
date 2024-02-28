const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api/ads");

const app = express();
require("./lib/connectMogoose");

// view engine setup
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

// ruta de la API

app.use("/api/anuncio", apiRouter);

// ruta website

app.use("/", indexRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {

    next(createError(404));
});

// error handler



// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // Errores de validación
    if (err.array) {
        const errInfo = err.array({ })[0];
        err.message = `Not valid - ${errInfo.type} ${errInfo.path} in ${errInfo.location} ${errInfo.msg}`;
        err.status = 422;
    }
    // Si el fallo es de la API
    // La respuesta es en formato JSON
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    if(req.originalUrl.startsWith("/api/")){
        res.json({error: err.message});
        return;
    }
    
    res.render("error");
});

module.exports = app;
