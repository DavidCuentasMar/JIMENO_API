const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({   
 	CURRENT_ROOMS: Number,
 	MAX_ROOMS: Number,
 	HOTEL_NAME: String,
 	ADDRESS: String,
 	STATE: String,
 	PHONE: String,
 	FAC: String,
 	EMAIL_ID: String,
 	WEBSITE: String,
 	TYPE: String,
});

module.exports = mongoose.model('Hotel', HotelSchema);