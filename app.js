const websiteRoutes = require('./routes/website-routes');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// uri string
const db = require('./config/keys').MongoUri;
// Passport Config
require('./config/auth')(passport);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(
	express.urlencoded({
		extended : true
	})
);

// Express session
app.use(
	session({
		secret            : 'secret',
		resave            : true,
		saveUninitialized : true
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect to MongoDB
mongoose
	.connect(db, {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((e) => console.log(e));


app.use(flash());
// set up routes
app.use('/', websiteRoutes);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,function(req,res){
  console.log("server has started successfully.");
});
