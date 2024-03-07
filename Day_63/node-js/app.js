require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportGoogle = require("./passports/passport.google");
const passportGithub = require("./passports/passport.github");
const MongoDBStore = require("connect-mongodb-session")(session);

const responseStatus = require("./middlewares/response.status");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const { User, Provider } = require("./models/index");

const app = express();

app.use((req, res, next) => {
   res.set("Access-Control-Allow-Origin", "http://localhost:8080");
   res.set("Access-Control-Allow-Headers", "Authorization");
   next();
});

const { SESSION_SECRET, MONGODB_URI, MONGODB_COLLECTION } = process.env;

const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: MONGODB_COLLECTION,
});

const sess = {
   secret: SESSION_SECRET,
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
passport.use("google", passportGoogle);
passport.use("github", passportGithub);

passport.serializeUser(function (user, done) {
   const { id, providerId } = user;
   done(null, { id, providerId }); // Lưu user.id vào session
});

passport.deserializeUser(async ({ id, providerId }, done) => {
   const user = await User.findByPk(id, {
      include: {
         model: Provider,
         as: "providers",
         where: { id: providerId },
      },
   }); // truy vấn tới db để trả về thông tin user
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

// res.success / res.err
app.use(responseStatus);

app.use("/", indexRouter);
app.use("/api", apiRouter);

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
