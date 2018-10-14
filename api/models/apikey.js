const mongoose = require('mongoose')

//contact name, company and emai
const ApiKeySchema = mongoose.Schema({   
 	contact_name: String,
 	company: String,
 	email: String
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);