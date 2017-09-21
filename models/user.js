var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	sex: {
		type: String,
		require: true
	},
	age: {
		type: Number,
		require: true
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = function(callback, limit) {
	User.find(callback).limit(limit);
}

module.exports.getUserById = function(id,callback) {
	User.findById(id, callback);
}

module.exports.addUser = function(user,callback) {
	User.create(user, callback);
}

module.exports.updateUser = function(id, user, options, callback) {
	var query = {_id: id};
	var update = {
		firstName: user.firstName,
		lastName : user.lastName,
		title    : user.title,
		sex      : user.sex,
		age      : user.age
	}
	User.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeUser = function(id,callback) {
	var query = {_id: id};
	User.remove(query, callback);
}

