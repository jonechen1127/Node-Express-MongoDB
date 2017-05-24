var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema({
	userid: String,
	password: String
});
exports.user = mongoose.model('users', userSchema);