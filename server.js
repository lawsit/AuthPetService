
const express = require('express');
const logger = require('morgan'); 
const pets = require('./routes/pets') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
var cors = require('cors')
const app = express();

 
app.set('secretKey', process.env.secret_key); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
 

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
 
app.use('/users', users);

// private route 
app.use('/pets', validateUser, pets);
 

function validateUser(req, res, next) { 
  var header = req.headers.authorization.split(' ');
  var token = header[1]; 
  jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      console.log("Token Verify error");
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}

 
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
