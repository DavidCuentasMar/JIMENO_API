const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({   
 	password: String,
 	email: String,
 	name: String,
 	lastname: String,
 	address: String,
});

module.exports = mongoose.model('User', UserSchema);