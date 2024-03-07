require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("./passports/passport.local");
const passportGoogle = require("./passports/passport.google");
const MongoDBStore = require("connect-mongodb-session")(session);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const apiRouter = require("./routes/api");

// app.use((req, res, next) => {
//    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//    res.set("Access-Control-Allow-Headers", "Authorization");
//    next();
// });

const validateMiddleware = require("./middlewares/validate.middleware");
const loggedMiddleware = require("./middlewares/logged.middleware");

const { User } = require("./models/index");

const app = express();

const store = new MongoDBStore({
   uri: process.env.MONGODB_URI,
   collection: process.env.MONGODB_COLLECTION,
});

const sess = {
   secret: "f8",
   resave: false,
   saveUninitialized: true,
   cookie: {},
   store,
};

if (app.get("env") === "production") {
   app.set("trust proxy", 1); // trust first proxy
   sess.saveUninitialized = false;
   sess.cookie = {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Lax",
   };
}

app.use(session(sess));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);
passport.use("google", passportGoogle);

passport.serializeUser(function (user, done) {
   done(null, user.id); // Lưu user.id vào session
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findByPk(id); // truy vấn tới db để trả về thông tin user
   done(null, user);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var whitelist = ["http://127.0.0.1:5500", "http://localhost:3000"];
var corsOptions = {
   origin: function (origin, callback) {
      const mode = app.get("env") || "development";
      if (mode === "development") {
         return callback(null, true);
      }
      if (whitelist.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
};

app.use("/api", cors(corsOptions), apiRouter);
app.use(validateMiddleware);
app.use("/auth", authRouter);

// app.use(loggedMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

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
