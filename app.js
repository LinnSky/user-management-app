var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

User = require('./models/user');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/usermanage');
var db = mongoose.connection;

app.get('/', function(req, res) {
	res.send('please use /api/users');
});

app.get('/api/users', function(req, res) {
	User.getUsers(function(err, users) {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user) {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res) {
	var user = req.body;
	User.addUser(user, function(err, user) {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, function(err, user) {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	console.log(req.params);
	User.removeUser(id, function(err, user) {
		console.log(user);

		if(err){
			//throw err;
			res.json({"status" : 1, "message":"delete fail"});
		}else{
			res.json({"status" : 0, "message":"delete sucessfull"});
		}
		
		//res.json(user); 
	});
});
app.listen(5050);
console.log('Running on port 5050...');