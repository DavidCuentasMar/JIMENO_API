const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({   
 	CURRENT_ROOMS: Number,
 	SIZE: Number,
 	HOTEL_NAME: String,
 	ADDRESS: String,
 	STATE: String,
 	PHONE: String,
 	FAC: String,
 	EMAIL_ID: String,
 	WEBSITE: String,
 	TYPE: String,
 	LATITUDE: String,
 	LONGITUDE: String
});

module.exports = mongoose.model('Hotel', HotelSchema);