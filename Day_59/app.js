require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
var MongoDBStore = require("connect-mongodb-session")(session);

const validateMiddleware = require("./middlewares/validate.middleware");
const loggedMiddleware = require("./middlewares/logged.middleware");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const mailRouter = require("./routes/mail");

var app = express();

var store = new MongoDBStore({
   uri: process.env.MONGODB_URI,
   collection: "nodemailer",
});

app.use(
   session({
      secret: "f8",
      resave: true,
      saveUninitialized: false,
      cookie: {
         maxAge: 24 * 60 * 60 * 1000,
         secure: process.env.EXPRESS_SESSION_SECURE === "true",
      },
      store,
   })
);

app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(validateMiddleware);
app.use(authRouter);

app.use("/mail", mailRouter);
app.use("/user", loggedMiddleware, userRouter);
app.use("/", loggedMiddleware, indexRouter);

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
