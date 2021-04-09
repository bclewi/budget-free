/*
======================================================
Backend Server
======================================================
*/

/*
------------------------
Dependencies
------------------------
*/

// Module dependencies
/*
cookie-parser longer needed as of express-session 1.5.0
https://www.npmjs.com/package/express-session
const cookieParser = require('cookie-parser');
*/
//const cors = require('cors'); // not needed for local proxy?
const express = require('express');
const flash = require('connect-flash');
//const methodOverride = require('method-override'); // replaced DELETE with POST
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Config dependencies
const { configurePassport } = require('./config/auth');

// Middleware dependencies
const flashMessageMiddleware = require('./middleware/flash-messages');

// Model dependencies
const db = require('./models/db');

// Route dependencies
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const permissionRouter = require('./routes/permission');
const budgetRouter = require('./routes/budget');
const budgetMonthRouter = require('./routes/budgetMonth');
const groupRouter = require('./routes/group');
const envelopeRouter = require('./routes/envelope');
const transactionRouter = require('./routes/transaction');

/*
------------------------
Server Setup
------------------------
*/
const app = express();
function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  };
}
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  table: 'sessions',
  checkExpirationInterval: process.env.SESSION_STORE_CLEANUP_INTERVAL, // 15 min
  expiration: process.env.SESSION_STORE_EXPIRATION, // 24 hrs
  extendDefaultFields: extendDefaultFields
});
configurePassport(passport);

/*
------------------------
Middleware Configuration
------------------------
*/
app.use(morgan('dev'));
/* When restricting Cross Origin Resources to a dynamic white list
const whitelist = [
  'http://localhost:'+process.env.PORT,
  'http://localhost:'+process.env.REACT_APP_PORT
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
*/
//app.use(cors(/*corsOptions*/));
// parse requests with content-type: application/json
app.use(express.json());
// parse requests with content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
  cookie: {
    httpOnly: false,
    maxAge: parseInt(process.env.SESSION_LIFETIME),
    path: '/',
    sameSite: true,
    secure: false
  },
  key: 'sid',
  //proxy: true, // if you do SSL outside of node
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: sessionStore, // Sequelize manages session table in database
  unset: 'destroy'
};
if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.httpOnly = true;
  sessionOptions.cookie.sameSite = true;
  sessionOptions.cookie.secure = true;
  app.disable('x-powered-by'); // hide this info from hackers
}
// If you have your node.js behind a proxy and are using secure: true,
// you need to set "trust proxy" in express.
// https://www.npmjs.com/package/express-session
//app.set('trust proxy', 1); // trust first proxy
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(methodOverride('_method')); // replaced DELETE with POST
app.use(flashMessageMiddleware.flashMessages);

/*
------------------------
Database Instantiation With Sample Data
------------------------
*/
const dbInit = require('./config/dbInit');
dbInit.withSampleData(db);

/*
------------------------
Route Configuration
------------------------
*/
// serve React static files
app.get('/', express.static(path.join(__dirname, '../client/build')));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/permissions', permissionRouter);
app.use('/api/v1/budgets', budgetRouter);
app.use('/api/v1/budget-months', budgetMonthRouter);
app.use('/api/v1/envelope-groups', groupRouter);
app.use('/api/v1/envelopes', envelopeRouter);
app.use('/api/v1/transactions', transactionRouter);


module.exports = app;