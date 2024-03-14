var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nunjucks = require("nunjucks");
var favicon = require("serve-favicon");
const cors = require('cors');

var indexRouter = require("./routes/index");
var webRouter = require("./routes/web");
var adminRouter = require("./routes/admin");

var auth  = require('./middlewares/auth')


var app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(cors()); // 允许所有源的请求
// 或者指定特定的源
// app.use(cors({ origin: 'http://yourdomain.com' }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(auth.authToken)

app.use("/", indexRouter);
app.use("/api/web", webRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
