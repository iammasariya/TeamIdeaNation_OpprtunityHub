
var express = require('express')
  ,  app = express()
	, http = require('http').Server(app)
  , io = require('socket.io')(http) //socket Implementation
	, path = require('path');

var expressSession = require("express-session");
var bodyParser = require('body-parser');
var mongoStore = require("connect-mongo")(expressSession);
var mongoSessionConnectURL = "mongodb://localhost:27017/amazon_fresh";   //Change this if needed ................................//
var passport = require('passport');
var users=require('./routes/users');
//require('./routes/passport')(passport);
// var cron = require('cron');
// var discountCronJob = cron.job("*/10 * * * * *",cronRoute.processDiscount);
// discountCronJob.start();

app.use(expressSession({
	secret: 'fjklowjafnkvnap',
    resave: false,
    saveUninitialized: false,
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(passport.initialize());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//All GET methods...........................//
app.get('/', function(req, res){

	res.render('index', {title:"Talent Bridge"});
});
app.post('/', function(req, res){
	res.render('index', {});
});

app.post('/doUserSignup',users.doSignUp);

function isAuthenticated(req, res, next) {
  if(req.session.userId) {
    console.log(req.session.userId);
    return next();
  }
  res.redirect('/');
};

http.listen(app.get('port'), function(){
	console.log('OpportunityHub Node-Server listening on port ' + app.get('port'));
});
